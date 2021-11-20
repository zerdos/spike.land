import diff_match_patch from "diff-match-patch"
let currentWebSocket = null;

const chCode = (code) => {
  try {
    window.starterCode = code;
    const { monaco } = window;
    if (!monaco || !monaco.Uri) return;
    const modelUri = monaco.Uri.parse(`file:///main.tsx`);
    const model = monaco.editor.getModel(modelUri);
    const oldCode = model.getValue();

    if (oldCode !== code) {
      console.log({ oldCode });

      model.setValue(code);
    }
  } catch (e) {
    console.error({ e });
  }
};

let hostname = "code.spike.land";

let roomName = "ROOMagain";
let username = "Pisti" + Math.random();
let lastSeenTimestamp = 0;
let lastSeenCode = "";
let ws;
let startTime;
let rejoined = false;

let rejoin = async () => {
  if (!rejoined) {
    rejoined = true;
    currentWebSocket = null;

    // Clear the roster.
    //  while (roster.firstChild) {
    //   roster.removeChild(roster.firstChild);
    //    }

    // Don't try to reconnect too rapidly.
    let timeSinceLastJoin = Date.now() - startTime;
    if (timeSinceLastJoin < 10000) {
      // Less than 10 seconds elapsed since last join. Pause a bit.
      await new Promise((resolve) =>
        setTimeout(resolve, 10000 - timeSinceLastJoin)
      );
    }

    // OK, reconnect now!
    join();
  }
};

export const broad = (
  { code, hashOfCode, starterCode, hashOfStarterCode },
) => {
  if (code !== lastSeenCode) {
    let difference;

    if (window.starterCode) {
      if (window.starterCode !== starterCode) {
        throw new Error(
          "window.starterCode !== starterCode",
          starterCode,
          window.starterCode,
        );
      }
      try {
        const dmp = new diff_match_patch();

        const patches = dmp.patch_make(window.starterCode, code);
        difference = dmp.patch_toText(patches);
        console.log(difference);
      } catch (e) {
        console.error({ e });
      }
    }

    const message = { hashOfCode };
    if (difference) {
      message.difference = difference;
      message.hashOfCode = hashOfCode,
        message.hashOfStarterCode = hashOfStarterCode;
      window[hashOfCode] = code;

      window.starterCode = starterCode;
    }
    if (!window.starterCode || !lastSeenCode) {
      console.error("NO STARTER-CODE");
      throw new Error("NO STARTER CODE");
    }

    currentWebSocket.send(JSON.stringify(message));
  }
};

window.broad = broad;

export function join() {
  ws = new WebSocket(
    "wss://" + hostname + "/api/room/" + roomName + "/websocket",
  );
  rejoined = false;
  startTime = Date.now();

  ws.addEventListener("open", () => {
    console.log("connected");
    currentWebSocket = ws;
    window.chCode = chCode;

    // Send user info message.
    ws.send(JSON.stringify({ name: username }));
  });

  ws.addEventListener("message", (event) => {
    try {
      let data = JSON.parse(event.data);
      if (data.code && data.hashOfCode) {
        lastSeenCode = data.code;
        window[data.hashOfCode] = data.code;
        if (!window.starterCode) window.starterCode = data.code;
        window.hashOfCode = data.hashOfCode;
        window.starterCode = lastSeenCode;
      }
      if (data.hashOfCode && !data.code) {
        if (window[data.hashOfCode]) {
          window.starterCode = window[data.hashOfCode];
          lastSeenCode = window.starterCode;
        }
      }

      // A regular chat message.
      if (data.timestamp > lastSeenTimestamp) {
        if (data.code && data.hashOfCode) {
          lastSeenCode = data.code;
          window.hashOfCode = data.hashOfCode;
          window.starterCode = lastSeenCode;
        } else if (
          (data.message === "undefined" || !data.message) &&
          data.message !== lastSeenCode && data.name !== username
        ) {
          if (
            data.difference
          ) {
            if (window[data.hashOfCode]) {
              if (window[data.hashOfCode] !== window.starterCode) {
                lastSeenCode = window[data.hashOfCode];
              }
            } else {
              const dmp = new diff_match_patch();
              const patches = dmp.patch_fromText(data.difference);
              const patched = dmp.patch_apply(patches, lastSeenCode);

              if (patched[0]) lastSeenCode = patched[0];
            }

            // const newLastSeen = window.assemble(lastSeenCode, JSON.stringify(data.difference.c));
            // console.log("AASSEMBLED", newLastSeen);
          }
        }

        if (lastSeenCode && lastSeenCode !== window.starterCode) {
          window.starterCode = lastSeenCode;
          window.hashOfCode = data.hashOfCode;
          if (data.username !== username) chCode(lastSeenCode);
        }
      }
      // addChatMessage(data.name, data.message);
      lastSeenTimestamp = data.timestamp;
    } catch (e) {
      console.error({ e });
    }
  });

  ws.addEventListener("close", (event) => {
    console.log("WebSocket closed, reconnecting:", event.code, event.reason);
    rejoin();
  });
  ws.addEventListener("error", (event) => {
    console.log("WebSocket error, reconnecting:", event);
    rejoin();
  });
}
