import {
  require_debounce
} from "./chunk-GNRJA6OC.mjs";
import "./chunk-Q4IHOIE6.mjs";
import "./chunk-LKRMJMRW.mjs";
import {
  Uri
} from "./chunk-M5EKOKYD.mjs";
import {
  __toESM
} from "./chunk-BZTAI3VG.mjs";

// js/ws.tsx
var import_debounce = __toESM(require_debounce());

// js/uidV4.mjs
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function stringify(array) {
  const offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const uuid = (byteToHex[array[offset + 0]] + byteToHex[array[offset + 1]] + byteToHex[array[offset + 2]] + byteToHex[array[offset + 3]] + "-" + byteToHex[array[offset + 4]] + byteToHex[array[offset + 5]] + "-" + byteToHex[array[offset + 6]] + byteToHex[array[offset + 7]] + "-" + byteToHex[array[offset + 8]] + byteToHex[array[offset + 9]] + "-" + byteToHex[array[offset + 10]] + byteToHex[array[offset + 11]] + byteToHex[array[offset + 12]] + byteToHex[array[offset + 13]] + byteToHex[array[offset + 14]] + byteToHex[array[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}

// js/ws.tsx
import { jsx } from "https://spike.land/dist/emotion.mjs";
import { Fragment } from "https://spike.land/dist/react.mjs";
var webRtcArray = [];
var hostname = window.location.hostname || "spike.land";
var path = location.pathname.split("/");
var room = (path[1] === "api" && path[2] === "room" ? path[3] : (path.pop() || path.pop()).slice(-12)) || "code-main";
var user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || v4()).slice(0, 8);
var wsLastHashCode = 0;
var webRTCLastSeenHashCode = 0;
var roomName = "";
var username = "";
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws = null;
var rejoined = false;
var sendChannel = {
  send: (data) => {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || username
    });
    webRtcArray.map((ch) => {
      try {
        if (ch.readyState !== "open")
          return;
        if (ch.target === target) {
          ch.send(messageString);
        }
      } catch (e) {
        console.error("Error in broadcasting event", { e });
      }
    });
  }
};
var resp = await fetch(`https://spike.land/api/room/${room}/session`);
var state = await resp.json();
var { startSession } = await import("./session-3F4BDDFW.mjs");
var mySession = startSession(room, {
  name: username,
  state
});
var mST = () => mySession.json().state;
var intervalHandler = null;
setInterval(() => {
  if (Date.now() - lastSeenNow > 4e4) {
    rejoined = false;
    rejoin();
  } else {
    console.log("no_need_to_rejoin");
  }
}, 3e4);
var w = window;
var chCode = async (code, i) => {
  if (!code) {
    return;
  }
  const sess = mST();
  if (i < sess.i) {
    return;
  }
  if (code === sess.code) {
    return;
  }
  try {
    const modelUri = Uri.parse("file:///app/index.tsx");
    if (w.sess && w.sess.editor && w.sess.editor.getModel && w.sess.editor.getModel(modelUri)) {
      const model = w.sess.editor.getModel(modelUri);
      if (model) {
        model.setValue(code);
      }
    } else {
      w.sess && w.sess.update && w.sess.update(code);
    }
  } catch (error) {
    console.error({ e: error });
  }
};
async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;
    if (ws)
      return ws;
    ws = await join(jsx(Fragment));
    return ws;
  }
  return ws;
}
var saveCode = (0, import_debounce.default)(broadcastCodeChange, 500);
async function broadcastCodeChange(sess) {
  (async () => {
    try {
      if (sendChannel) {
        const message = webRTCLastSeenHashCode ? mySession.createPatchFromHashCode(webRTCLastSeenHashCode, sess) : mySession.createPatch(sess);
        if (message && message.patch !== "") {
          sendChannel.send(message);
        }
      }
    } catch (e) {
      console.error("Error sending RTC...", { e });
    }
  })();
  if (ws) {
    const message = wsLastHashCode ? mySession.createPatchFromHashCode(wsLastHashCode, sess) : mySession.createPatch(sess);
    if (!message) {
      return;
    }
    const messageString = JSON.stringify({ ...message, name: username });
    if (message.patch !== "") {
      ws.send(messageString);
    }
  } else {
    rejoined = false;
    await rejoin();
  }
}
async function join(App) {
  roomName = roomName || room || "code-main";
  if (user) {
    username = user;
  }
  if (ws !== null)
    return ws;
  rejoined = true;
  const wsConnection = new WebSocket("wss://" + hostname + "/api/room/" + roomName + "/websocket");
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    ws = wsConnection;
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff = now - lastSeenNow;
      if (now - lastSeenNow > 3e4) {
        try {
          wsConnection.send(JSON.stringify({
            name: username,
            time: lastSeenTimestamp + diff
          }));
        } catch {
          rejoined = false;
          rejoin();
        }
      }
    }, 3e4);
    wsConnection.send(JSON.stringify({ name: username }));
    return wsConnection;
  });
  if (!w.sess) {
    const session = {
      ...mST(),
      setChild: () => {
      },
      changes: [],
      children: [App],
      errorText: ""
    };
    const stayFullscreen = location.pathname.endsWith("public");
    const { quickStart } = await import("./quickStart-GJDZGTAS.mjs");
    quickStart(session, roomName, stayFullscreen);
  }
  wsConnection.addEventListener("message", (message) => processWsMessage(message, "ws"));
  wsConnection.addEventListener("close", (event) => {
    console.log("WebSocket closed, reconnecting:", event.code, event.reason);
    rejoined = false;
    rejoin();
  });
  wsConnection.addEventListener("error", (event) => {
    console.log("WebSocket error, reconnecting:", event);
    rejoined = false;
    rejoin();
  });
  return wsConnection;
}
var myHostname = window.location.hostname;
if (!myHostname) {
  myHostname = "localhost";
}
log("Hostname: " + myHostname);
var connections = {};
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
var rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`
  }))
};
rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302"
}];
async function createPeerConnection(target) {
  log(`Setting up a connection with ${target}`);
  if (connections[target]) {
    log(`Aborting, since we have connection with this ${target}`);
    return;
  }
  connections[target] = new RTCPeerConnection(rcpOptions);
  connections[target].onicecandidate = (event) => {
    if (event.candidate) {
      log("*** Outgoing ICE candidate: " + event.candidate);
      ws.send(JSON.stringify({
        type: "new-ice-candidate",
        target,
        name: username,
        candidate: event.candidate
      }));
    }
  };
  connections[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  connections[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  connections[target].onsignalingstatechange = () => {
    log("*** connections[target].signalingState  changed to: " + connections[target].signalingState);
    switch (connections[target].signalingState) {
      case "closed":
        break;
    }
  };
  connections[target].onnegotiationneeded = handleNegotiationNeededEvent;
  connections[target].ontrack = (ev) => console.log(ev);
  connections[target].ondatachannel = (event) => {
    console.log("Receive Channel Callback");
    const rtc2 = event.channel;
    rtc2.binaryType = "arraybuffer";
    rtc2.addEventListener("close", onReceiveChannelClosed);
    rtc2.addEventListener("message", (message) => processWsMessage(message, "rtc"));
    const rtcWithTarget = Object.assign(rtc2, { target });
    webRtcArray.push(rtcWithTarget);
  };
  const dataChannelOptions = {
    ordered: true,
    reliable: true,
    maxPacketLifeTime: 3e3
  };
  const rtc = Object.assign(connections[target].createDataChannel(target, dataChannelOptions), { target });
  rtc.binaryType = "arraybuffer";
  rtc.addEventListener("message", (message) => {
    console.log("***********RTC***", { msg: message });
    const data = JSON.parse(message.data);
    if (data && data.hashCode) {
      webRTCLastSeenHashCode = data.hashCode;
    }
    if (data && data.newHash) {
      webRTCLastSeenHashCode = data.newHash;
    }
    return processWsMessage(message, "rtc");
  });
  rtc.addEventListener("error", (error) => {
    console.log("xxxxxx-  Data Channel Error:", error);
  });
  rtc.addEventListener("open", () => {
    console.log("@@@@@@@@RTC IS OPEN&&&&&&&&");
    webRtcArray.push(rtc);
  });
  rtc.addEventListener("close", () => {
    console.log("xxxxxxxx- The Data Channel is Closed");
  });
  return connections[target];
  function onReceiveChannelClosed() {
    console.log("Receive channel is closed");
    connections[target].close();
    delete connections[target];
    console.log("Closed remote peer connection");
  }
  async function handleNegotiationNeededEvent() {
    log("*** Negotiation needed");
    try {
      log("---> Creating offer");
      const offer = await connections[target].createOffer();
      if (connections[target].signalingState != "stable") {
        log("     -- The connection isn't stable yet; postponing...");
        return;
      }
      log("---> Setting local description to the offer");
      await connections[target].setLocalDescription(offer);
      log("---> Sending the offer to the remote peer");
      ws && ws.send(JSON.stringify({
        target,
        name: username,
        type: "offer",
        sdp: connections[target].localDescription
      }));
    } catch {
      log("*** The following error occurred while handling the negotiationneeded event:");
    }
  }
  function handleICEConnectionStateChangeEvent() {
    log("*** ICE connection state changed to " + connections[target].iceConnectionState);
    switch (connections[target].iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        break;
    }
  }
  function handleICEGatheringStateChangeEvent() {
    log("*** connections[target].iceGatheringState changed to: " + connections[target].iceGatheringState);
  }
}
async function handleNewICECandidateMessage(message, target) {
  log("*** Adding received ICE candidate: " + JSON.stringify(message.candidate));
  const candidate = new RTCIceCandidate(message.candidate);
  console.log(connections[target]);
  await connections[target].addIceCandidate(candidate);
}
async function handleChatAnswerMessage(message, target) {
  log("*** Call recipient has accepted our call");
  const desc = new RTCSessionDescription(message.sdp);
  await connections[target].setRemoteDescription(desc).catch(console.error);
}
async function handleChatOffer(message, target) {
  if (!connections[target])
    await createPeerConnection(target);
  if (!message.sdp)
    return;
  const desc = new RTCSessionDescription(message.sdp);
  if (connections[target].signalingState != "stable") {
    log("  - But the signaling state isn't stable, so triggering rollback");
    await Promise.all([
      connections[target].setLocalDescription({ type: "rollback" }),
      connections[target].setRemoteDescription(desc)
    ]);
    return;
  }
  log("  - Setting remote description");
  await connections[target].setRemoteDescription(desc);
  log("---> Creating and sending answer to caller");
  await connections[target].setLocalDescription(await connections[target].createAnswer());
  const webSocket = ws || await rejoin();
  if (webSocket === null)
    return;
  webSocket.send(JSON.stringify({
    target,
    name: username,
    type: "answer",
    sdp: connections[target].localDescription
  }));
}
async function processWsMessage(event, source) {
  console.log(source, { event });
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  if (data.name && data.name !== username && !connections[data.name]) {
    try {
      await createPeerConnection(data.name);
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
    }
  }
  console.log(source, data.name);
  if (data.type === "new-ice-candidate") {
    await handleNewICECandidateMessage(data, data.name);
    return;
  }
  if (data.type === "offer") {
    await handleChatOffer(data, data.name);
    return;
  }
  if (data.type === "answer") {
    await handleChatAnswerMessage(data, data.name);
    return;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (data.patch && source === "ws" || data.name !== username) {
    if (data.newHash === mySession.hashCode()) {
      return;
    }
    if (data.oldHash === mySession.hashCode()) {
      console.log("******** APPLY PATCH ******");
      mySession.applyPatch(data);
      chCode(mST().code, mST().i);
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }
      return;
    }
    if (data.newHash === mySession.hashCode()) {
      return;
    }
    if (data.code && data.transpiled) {
      const messageData = mySession.createPatch(data);
      console.log("APPLYING PATCH AGAIN");
      mySession.applyPatch(messageData);
      chCode(data.code, data.i);
      if (sendChannel) {
        sendChannel.send({ hashCode: messageData.newHash });
      }
      return;
    }
    return;
  }
  if (data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (data.name === username) {
    return;
  }
  lastSeenTimestamp = data.timestamp;
}
export {
  join,
  saveCode
};
