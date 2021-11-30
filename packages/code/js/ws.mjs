import DiffMatchPatch from "diff-match-patch";
import Hash from "ipfs-only-hash";

let currentWebSocket = null;
const messageQueue = {
  timestamps: [],
};

const chCode = (code) => {
  try {
    window.starterCode = code;
    if (window.restartCode) window.restartCode(code);

    const { monaco } = window;
    if (!monaco || !monaco.Uri) {
      return;
    }

    const modelUri = monaco.Uri.parse(`file:///main.tsx`);
    const model = monaco.editor.getModel(modelUri);
    const oldCode = model && model.getValue();

    if (oldCode !== code && model && model.setValue) {
      console.log({ oldCode });

      model.setValue(code);
    }
  } catch (e) {
    console.error({ e });
  }
};

let hostname = "code.spike.land";

let roomName = "roomie";
let username = "user" + Math.random();
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
  return dmp.patch_toText(patches);
}

export  const  join = (user, room)=> {
  if (user) username = user;
  if (room) roomName = room;

  ws = new WebSocket(
    "wss://" + hostname + "/api/room/" + roomName + "/websocket",
  );
  rejoined = false;
  startTime = Date.now();

  ws.addEventListener("open", () => {
    console.log("connected");
    currentWebSocket = ws;
    const broad = (
      { code, hashOfCode, starterCode, transpiled, html },
    ) => {
      if (code !== lastSeenCode) {
        let difference;
        const prevHash = window[window.wantedHashBase]
          ? window.wantedHashBase
          : window.currentHashOfCode;
        if (code === window[prevHash]) return;

        if (window.starterCode) {
          try {
            difference = prevHash && window[prevHash] &&
              getDiff(window[prevHash], code);

            // console.log(difference);
          } catch (e) {
            console.error({ e });
          }
        }

        const message = { hashOfCode };
        if (difference) {
          message.name = username;
          message.transpiled = transpiled;
          message.difference = difference;
          message.hashOfCode = hashOfCode;
          message.hashOfStarterCode = prevHash;

          if (prevHash && mod[prevHash]) {
            message.htmlDiff = getDiff(mod[prevHash].html, html);
            message.transpiledDiff = getDiff(
              mod[prevHash].transpiled,
              transpiled,
            );
          }

          window.currentHashOfCode = hashOfCode;
          window[hashOfCode] = code;
          mod[hashOfCode] = {
            transpiled,
            html,
          };

          window.starterCode = starterCode;
        } else {
          message.code = code;
          message.name = username;
          message.hashOfCode = hashOfCode;
        }

        currentWebSocket.send(JSON.stringify(message));
      }
    };

    window.broad = broad;
    window.chCode = chCode;

    // Send user info message.
    ws.send(JSON.stringify({ name: username }));
  });

  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.timestamp) {
      let timestamp = data.timestamp;
      while (messageQueue[timestamp]) timestamp++;

      messageQueue[timestamp] = data;
      messageQueue.timestamps.push(timestamp);
      messageQueue.timestamps.sort(function (a, b) {
        return a - b;
      });

      setTimeout(() => {
        const timestamp = messageQueue.timestamps.shift();
        const event = { ...messageQueue[timestamp] };
        messageQueue[timestamp] = null;
        process(event);
      }, 100);
    } else {
      process(data);
    }

    async function process(data) {
      try {
        if (data.timestamp && !lastSeenTimestamp) {
          lastSeenTimestamp = data.timestamp;
        }

        if (data.hashOfCode) {
          window.wantedHashBase = data.hashOfCode;
        }
        if (data.name === username) return;
        if (data.code && data.hashOfCode) {
          lastSeenCode = data.code;
          window[data.hashOfCode] = data.code;
          if (!window.starterCode) window.starterCode = data.code;
          window.hashOfCode = data.hashOfCode;
          window.starterCode = lastSeenCode;
          try {
            chCode(data.code);
          } catch (e) {
            console.error("error in chCode");
          }
        }

        if (data.hashOfCode && window[data.hashOfCode]) {
          window.starterCode = window[data.hashOfCode];
          lastSeenCode = window[data.hashOfCode];
          chCode(lastSeenCode);
        }

        // A regular chat message.

        if (data.code && data.hashOfCode) {
          lastSeenCode = data.code;

          window.hashOfCode = data.hashOfCode;
          window.starterCode = lastSeenCode;
          window[data.hashOfCode] = data.code;
        } else if (data.difference) {
          if (data.hashOfPreviousCode) {
            if (window[data.hashOfPreviousCode]) {
              lastSeenCode = window[data.hashOfPreviousCode];
            } else {
              const resp = await fetch(
                `https://code.spike.land/api/room/${roomName}/code`,
              );
              const code = await resp.text();
              const hashOfCode = await Hash.of(code);
              window[hashOfCode] = code;
              chCode(code);
            }
          }

          if (
            data.hashOfCode &&
            data.difference && data.hashOfCode !== window.hashOfCode
          ) {
            const hashOfCode = data.hashOfCode;

            const dmp = new DiffMatchPatch();
            const patches = dmp.patch_fromText(data.difference);
            const patched = dmp.patch_apply(patches, lastSeenCode);

            if (patched[0]) {
              const lastSeenCode = patched[0];
              const hashFromDiffCode = lastSeenCode &&
                await Hash.of(lastSeenCode);
              if (hashFromDiffCode === hashOfCode) {
                window[hashOfCode] = lastSeenCode;
                window.hashOfCode = hashOfCode;
                chCode(lastSeenCode);
              }

              // const newLastSeen = window.assemble(lastSeenCode, JSON.stringify(data.difference.c));
              // console.log("AASSEMBLED", newLastSeen);
            } else {
              console.error("we are out of sync...");
              ws.close(1000, "out of sync");
              return;
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
