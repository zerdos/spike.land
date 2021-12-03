import DiffMatchPatch from "diff-match-patch";
import Hash from "ipfs-only-hash";

let currentWebSocket = null;
const messageQueue = {
  timestamps: [],
};
const mod = {};

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

let roomName = "main-room";
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

function getDiff(from, to) {
  const dmp = new DiffMatchPatch();

  const patches = dmp.patch_make(from, to);
  return dmp.patch_toText(patches);
}

export const join = (user, room) => {
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
      { code, hashOfCode, starterCode, transpiled, html, css },
    ) => {
      if (code !== lastSeenCode) {
        lastSeenCode = code;
        let codeDiff;
        const prevHash = window[window.wantedHashBase]
          ? window.wantedHashBase
          : window.currentHashOfCode;
        if (code === window[prevHash]) return;

        if (window.starterCode) {
          try {
            codeDiff = prevHash && window[prevHash] &&
              getDiff(window[prevHash], code);
            // console.log(codeDiff);
          } catch (e) {
            console.error({ e });
          }
        }

        const message = { hashOfCode };
        if (codeDiff) {
          message.name = username;

          message.codeDiff = codeDiff;
          message.hashOfCode = hashOfCode;
          message.hashOfStarterCode = prevHash;

          if (prevHash && mod[prevHash]) {
            message.htmlDiff = getDiff(mod[prevHash].html, html);
            message.cssDiff = getDiff(mod[prevHash].css, css);
            message.transpiledDiff = getDiff(
              mod[prevHash].transpiled,
              transpiled,
            );
          } else {
            message.html = html;
            message.css = css;
            message.transpiled = transpiled;
          }

          window.currentHashOfCode = hashOfCode;

          window[hashOfCode] = code;

          mod[hashOfCode] = {
            transpiled,
            css,
            html,
          };
          if (hashOfCode !== prevHash) delete mod[prevHash];

          window.starterCode = starterCode;
        } else {
          message.code = code;
          message.name = username;
          message.html = html;
          message.css = css;
          message.transpiled = transpiled;
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
        if (data.name === username) return;

        if (data.hashOfCode) {
          window.wantedHashBase = data.hashOfCode;
        }

        if (data.hashOfCode) {
          if (
            !window[data.hashOfCode] ||
            window[data.hashOfCode] !== data.hashOfCode
          ) {
            const resp = await fetch(
              `https://code.spike.land/api/room/${roomName}/code`,
            );
            const code = await resp.text();
            const hash = await Hash.of(code);
            if (hash === data.hashOfCode) window[hash] = code;
          }
          window.starterCode = window[data.hashOfCode];
          lastSeenCode = window[data.hashOfCode];
          chCode(lastSeenCode);
        }

        // A regular chat message.

        if (data.codeDiff) {
          if (
            data.hashOfCode &&
            data.codeDiff && data.hashOfCode !== window.hashOfCode
          ) {
            const hashOfCode = data.hashOfCode;

            const dmp = new DiffMatchPatch();
            const patches = dmp.patch_fromText(data.codeDiff);
            const patched = dmp.patch_apply(patches, lastSeenCode);

            if (patched[0]) {
              const lastSeenCode = patched[0];
              const hashFromcodeDiff = lastSeenCode &&
                await Hash.of(lastSeenCode);
              if (hashFromcodeDiff === hashOfCode) {
                window[hashOfCode] = lastSeenCode;
                window.hashOfCode = hashOfCode;
                chCode(lastSeenCode);
              }
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
};

export const run = async () => {
  const resp = await fetch(
    "./code",
  );
  const code = await resp.text();
  const target = document.getElementById("zbody");
  await restart(code, target);

  window.restartCode = (c) => restart(c, document.getElementById("zbody"));
  const user = Math.random() - "html";
  const room = location.pathname.slice(1).split("/")[2];

  console.log(user, room);

  join(user, room);
};
