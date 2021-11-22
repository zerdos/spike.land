import DiffMatchPatch from "diff-match-patch";
let currentWebSocket = null;
const messageQueue = {
  timestamps: [],
};

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

const mod = {};

function getDiff(from, to) {
  const dmp = new DiffMatchPatch();

  const patches = dmp.patch_make(from, to);
  console.log({ patches });
  return dmp.patch_toText(patches);
}

export const broad = (
  { code, hashOfCode, starterCode, hashOfStarterCode, transpiled, html },
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
        difference = getDiff(window.starterCode, code);

        console.log(difference);
      } catch (e) {
        console.error({ e });
      }
    }

    const message = { hashOfCode };
    if (difference) {
      const prevHash = window.currentHashOfCode;
      message.transpiled = transpiled;
      message.difference = difference;
      message.hashOfCode = hashOfCode;
      message.hashOfStarterCode = hashOfStarterCode;
      if (prevHash && mod[prevHash]) {
        message.htmlDiff = getDiff(mod[prevHash].html, html);
        message.transpiledDiff = getDiff(mod[prevHash].transpiled, transpiled);
      }
      window.currentHashOfCode = hashOfCode;
      window[hashOfCode] = code;
      mod[hashOfCode] = {
        transpiled,
        html,
      };

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
    let data = JSON.parse(event.data);
    if (data.timestamp) {
      messageQueue[data.timestamp] = event;
      messageQueue.timestamps.push(data.timestamp);
      messageQueue.timestamps.sort();

      setTimeout(() => {
        const timestamp = messageQueue.timestamps.shift();
        const event = messageQueue[timestamp];
        messageQueue[timestamp] = null;
        process(event);
      }, 100);
    } else {
      process(event);
    }

    async function process(event) {
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
            window[data.hashOfCode] = data.code;
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
                const Hash = (await import("ipfs-only-hash")).default;

                const dmp = new DiffMatchPatch();
                const patches = dmp.patch_fromText(data.difference);
                const patched = dmp.patch_apply(patches, lastSeenCode);

                if (patched[0]) {
                  const fromDiffCode = patched[0];
                  const hashFromDiffCode = await Hash.of(fromDiffCode);
                  if (hashFromDiffCode === data.hashOfCode) {
                    lastSeenCode = patched[0];
                    window.starterCode = lastSeenCode;
                    window.hashOfCode = data.hashOfCode;
                    if (data.username !== username) chCode(lastSeenCode);
                  } else {
                    console.error("we are out of sync...");
                    username = "OutOfSync..." + Math.random();
                    rejoin();
                    return;
                  }
                }
              }

              // const newLastSeen = window.assemble(lastSeenCode, JSON.stringify(data.difference.c));
              // console.log("AASSEMBLED", newLastSeen);
            }
          }
        }
        // addChatMessage(data.name, data.message);
        lastSeenTimestamp = data.timestamp;
      } catch (e) {
        console.error({ e });
      }
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
