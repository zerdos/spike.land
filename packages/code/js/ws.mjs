// import DiffMatchPatch from "diff-match-patch";
import createDelta from "textdiff-create";
import applyPatch from "textdiff-patch";

import Hash from "ipfs-only-hash";

let currentWebSocket = null;

const mod = {};

function createPatch(oldCode, newCode) {
  return JSON.stringify(createDelta(oldCode, newCode));
}

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

let roomName = "code-main";
let username = "user" + Math.random();
let lastSeenTimestamp = 0;
let lastSeenNow = 0;
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

// function createPatch(from, to) {
//   const dmp = new DiffMatchPatch();

//   const patches = dmp.patch_make(from, to);
//   return dmp.patch_toText(patches);
// }

let intervalHandler = null;

export const join = (user, room) => {
  if (user) username = user;
  if (room) roomName = room;

  ws = new WebSocket(
    "wss://" + hostname + "/api/room/" + roomName + "/websocket",
  );
  rejoined = false;
  startTime = Date.now();

  ws.addEventListener("open", () => {
    if (!intervalHandler) {
      intervalHandler = setInterval(() => {
        const now = Date.now();
        const diff = now - lastSeenNow;
        if (now - lastSeenNow > 30_000) {
          ws.send(JSON.stringify({ name: username, time: lastSeenTimestamp+ diff }));
        }
      }, 30_000);
    }
    console.log("connected");
    currentWebSocket = ws;
    const broad = (
      { code, hashOfCode, starterCode, transpiled, html, css },
    ) => {
      if (code !== lastSeenCode) {
        lastSeenCode = code;
        let codeDiff;
        const prevHash = window.currentHashOfCode;
        if (code === window[prevHash]) return;

        if (window.starterCode) {
          try {
            codeDiff = prevHash && window[prevHash] &&
              createPatch(window[prevHash], code);
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
            message.htmlDiff = createPatch(mod[prevHash].html, html);
            message.cssDiff = createPatch(mod[prevHash].css, css);
            message.transpiledDiff = createPatch(
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

          if (!mod[hashOfCode]) {
            mod[hashOfCode] = {
              transpiled,
              css,
              html,
            };
          }
          // if (hashOfCode !== prevHash) delete mod[prevHash];

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

  ws.addEventListener("message", async (event) => {
    const data = JSON.parse(event.data);

    if (data.timestamp) {
      lastSeenNow = Date.now();
      lastSeenTimestamp = data.timestamp;
    }
    if (data.name === username) return;

    // if (data.hashOfCode) {
    //   window.wantedHashBase = data.hashOfCode;
    // }

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

        // const dmp = new DiffMatchPatch();
        // const patches = dmp.patch_fromText(data.codeDiff);
        // const patched = dmp.patch_apply(patches, lastSeenCode);

        lastSeenCode = applyPatch(lastSeenCode, JSON.parse(data.codeDiff));
        const hashFromCodeDiff = lastSeenCode &&
          await Hash.of(lastSeenCode);
        if (hashFromCodeDiff === hashOfCode) {
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

    // addChatMessage(data.name, data.message);
    lastSeenTimestamp = data.timestamp;
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
  const { restart } = await import(`../js/codeLoader.mjs`);
  await restart(code, target);

  window.restartCode = (c) => restart(c, document.getElementById("zbody"));
  const user = Math.random() - "html";
  const room = location.pathname.slice(1).split("/")[2] || "code-main";

  console.log(user, room);

  join(user, room);
};
