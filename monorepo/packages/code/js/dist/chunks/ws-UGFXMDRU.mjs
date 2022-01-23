import "./chunk-4IQSHU34.mjs";

// js/quickStart.mjs
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.70/dist/emotion-react.mjs";
var formatter;
var transform;
var esbuildEsmTransform;
var getHtmlAndCss;
var initSess;
var initSession = async (room, initData) => {
  initSess = initSess || (await import("./session-OLIV6AHN.mjs")).default;
  return initSess(room, initData);
};
async function startMonacoWithSession(session) {
  const shadDom = document.querySelector("#shadowEditor");
  const { startMonaco } = await import("./editor-7URA35TK.mjs");
  const throttle = (await import("https://ga.jspm.io/npm:lodash@4.17.21/throttle.js")).default;
  const onchangeCode = (ev) => runner(editor.getModel().getValue(), ev.changes, session, ++session.i);
  const { editor, monaco } = await startMonaco({
    language: "typescript",
    container: shadDom,
    code: session.code
  });
  editor.onDidChangeModelContent(throttle(onchangeCode, 100));
  window.monaco = monaco;
  session.editor = editor;
  monaco.languages.registerOnTypeFormattingEditProvider("typescript", {
    autoFormatTriggerCharacters: ["}", "{", ")", "(", ";"],
    async provideOnTypeFormattingEdits(model) {
      const text = await formatter(model.getValue());
      return [
        {
          range: model.getFullModelRange(),
          text
        }
      ];
    }
  });
  window.sess = session;
}
async function getErrors({ monaco, editor }) {
  if (!monaco) {
    return [{ messageText: "Error with the error checking. Try to reload!" }];
  }
  const model = editor.getModel();
  const worker = await monaco.languages.typescript.getTypeScriptWorker();
  const client = await worker(model);
  const filename = model.uri.toString();
  const diag = client.getSemanticDiagnostics(filename);
  const comp = client.getCompilerOptionsDiagnostics(filename);
  const syntax = client.getSyntacticDiagnostics(filename);
  const fastError = await Promise.race([diag, comp, syntax]);
  console.log(fastError);
  return [];
}
async function runner(c, changes = null, session, counter) {
  session.changes.push(changes);
  formatter = formatter || (await import("./formatter-MPIDKEWK.mjs")).formatter;
  esbuildEsmTransform = esbuildEsmTransform || (await import("./esbuildEsm-UR6FVQYS.mjs")).transform;
  transform = esbuildEsmTransform;
  session.errorText = "";
  try {
    const cd = await formatter(c);
    const transpiled = await transform(cd);
    let restartError = false;
    if (transpiled.length > 0) {
      if (counter < session.i) {
        return;
      }
      try {
        getHtmlAndCss = getHtmlAndCss || (await import("./renderToString-NIIZBZY6.mjs")).getHtmlAndCss;
        if (counter < session.i) {
          return;
        }
        const App = await getApp(transpiled);
        const { html, css } = getHtmlAndCss(App);
        session.transpiled = transpiled;
        session.html = html;
        const children = await getReactChild(transpiled);
        session.setChild((c2) => [...c2, children]);
        session.children = children;
        restartError = !html;
        session.code = cd;
        session.codeNonFormatted = c;
        const code = cd;
        session.css = css;
        if (session.i !== counter) {
          return;
        }
        session.saveCode && await session.saveCode({ transpiled, code, i: counter, css, html });
        return;
      } catch (error2) {
        console.error("EXCEPTION");
        console.log({ e: error2 });
        restartError = true;
        console.error({ restartError });
      }
    }
    if (session.i > counter) {
      return;
    }
    const error = await getErrors(session);
    if (session.i > counter) {
      return;
    }
    if (restartError) {
      error.push({ messageText: "Error while starting the app. Check the console!" });
    }
    if (error.length > 0) {
      console.log({ err: error });
    }
  } catch (error) {
    session.errorText = error.message;
    console.error(error.message);
  }
}
async function quickStart(session, room, keepFullScreen, saveCode) {
  session.saveCode = saveCode;
  session.children = null;
  const { renderPreviewWindow } = await import("./renderPreviewWindow-VKLQAA2X.mjs");
  await renderPreviewWindow(session, room, keepFullScreen);
  if (!keepFullScreen) {
    await startMonacoWithSession(session);
  }
  session.update = (c) => runner(c, null, session);
  runner(session.code, null, session, -1);
}
async function getReactChild(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objectUrl = createJsBlob(codeToHydrate);
  const mod2 = await import(objectUrl);
  URL.revokeObjectURL(objectUrl);
  return jsx(mod2.default);
}
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
async function getApp(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objectUrl = createJsBlob(codeToHydrate);
  const App = (await import(objectUrl)).default;
  URL.revokeObjectURL(objectUrl);
  return App;
}

// js/ws.mjs
var currentWebSocket = null;
var sess = false;
var webRtcArray = [];
var hostname = "spike.land";
var mod = {};
var wsLastHashCode = "";
var webRTCLastSeenHashCode = "";
var roomName = "";
var username = "";
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws;
var chCode;
var startTime;
var rejoined = false;
var sendChannel;
var deltaSent = "";
var mySession = null;
var mST = () => mySession.session.get("state");
var intervalHandler = null;
setInterval(() => {
  if (Date.now() - lastSeenNow > 4e4) {
    rejoin();
  } else {
    console.log("no_need_to_rejoin");
  }
}, 3e4);
chCode = globalThis.chCode = async (code, i) => {
  if (!code) {
    return;
  }
  if (i < window.sess.i) {
    return;
  }
  if (code === window.sess.code) {
    return;
  }
  try {
    if (window.sess && window.sess.editor) {
      window.sess.editor.getModel().setValue(code);
    } else {
      window.sess.update(code);
    }
  } catch (error) {
    console.error({ e: error });
  }
};
async function rejoin() {
  if (!rejoined) {
    rejoined = true;
    currentWebSocket = null;
    const timeSinceLastJoin = Date.now() - startTime;
    if (timeSinceLastJoin < 1e4) {
      await new Promise((resolve) => setTimeout(resolve, 1e4 - timeSinceLastJoin));
    }
    join();
  }
}
async function broad({ code, transpiled, html, css, i }) {
  if (sendChannel) {
    const now = Date.now();
    mod.i = i;
    if (mod.lastRtcUpdate) {
      const diff = now - mod.lastUpdate;
      if (diff < 1e3) {
        await wait(200 - diff);
        if (i !== mod.i) {
          return;
        }
      }
    }
    mod.lastRtcUpdate = Date.now();
    const updatedState = mST().toJSON();
    updatedState.html = html;
    updatedState.css = css;
    updatedState.transpiled = transpiled;
    updatedState.code = code;
    updatedState.i = i;
    const message = webRTCLastSeenHashCode ? mySession.createPatchFromHashCode(webRTCLastSeenHashCode, updatedState) : mySession.createPatch(updatedState);
    if (message && message.patch !== "") {
      sendChannel.send(message);
    }
  }
  if (currentWebSocket) {
    const now = Date.now();
    mod.i = i;
    if (mod.lastUpdate) {
      const diff = now - mod.lastUpdate;
      if (diff < 1e3) {
        await wait(1e3 - diff);
        if (i !== mod.i) {
          return;
        }
      }
    }
    mod.lastUpdate = Date.now();
    const updatedState = mST().toJSON();
    updatedState.html = html;
    updatedState.css = css;
    updatedState.transpiled = transpiled;
    updatedState.code = code;
    updatedState.i = i;
    const message = wsLastHashCode ? mySession.createPatchFromHashCode(wsLastHashCode, updatedState) : mySession.createPatch(updatedState);
    if (!message) {
      return;
    }
    const messageString = JSON.stringify({ ...message, name: username });
    if (message.patch !== "") {
      currentWebSocket.send(messageString);
    }
  }
}
var join = async (room, user, delta) => {
  roomName = roomName || room || "code-main";
  window.room = room;
  if (user) {
    username = user;
  }
  const resp = await fetch(`https://spike.land/api/room/${roomName}/session`);
  const state = await resp.json();
  mySession = mySession || await initSession(roomName, {
    name: username,
    room: roomName,
    state,
    events: []
  });
  window.mySession = mySession;
  if (!delta) {
    if (!window.sess) {
      const session = {
        ...mST().toJSON(),
        setChild: () => {
        },
        changes: [],
        children: [null],
        errorText: ""
      };
      const throttle = (await import("https://ga.jspm.io/npm:lodash@4.17.21/throttle.js")).default;
      const stayFullscreen = location.pathname.endsWith("public");
      quickStart(session, roomName, stayFullscreen, throttle(broad, 100));
      window.sess = session;
    }
  }
  if (sess) {
    return;
  }
  sess = true;
  setTimeout(() => {
    sess = false;
  }, 1e4);
  ws = new WebSocket("wss://" + hostname + "/api/room/" + roomName + "/websocket");
  rejoined = false;
  startTime = Date.now();
  ws.addEventListener("open", () => {
    if (delta) {
      if (delta !== deltaSent) {
        deltaSent = delta;
        ws.send(JSON.stringify({
          type: "delta",
          delta
        }));
      }
      return;
    }
    if (intervalHandler) {
      clearInterval(intervalHandler);
    } else {
      intervalHandler = setInterval(() => {
        const now = Date.now();
        const diff = now - lastSeenNow;
        if (now - lastSeenNow > 3e4) {
          try {
            ws.send(JSON.stringify({
              name: username,
              time: lastSeenTimestamp + diff
            }));
          } catch {
            rejoin();
          }
        }
      }, 3e4);
    }
    currentWebSocket = ws;
    globalThis.broad = broad;
    globalThis.chCode = chCode;
    ws.send(JSON.stringify({ name: username }));
  });
  ws.addEventListener("message", (message) => processWsMessage(message, "ws"));
  ws.addEventListener("close", (event) => {
    console.log("WebSocket closed, reconnecting:", event.code, event.reason);
    rejoin();
  });
  ws.addEventListener("error", (event) => {
    console.log("WebSocket error, reconnecting:", event);
    rejoin();
  });
};
var myHostname = window.location.hostname;
if (!myHostname) {
  myHostname = "localhost";
}
log("Hostname: " + myHostname);
var connections = {};
globalThis.connections = connections;
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
async function createPeerConnection(target) {
  log("Setting up a connection...");
  const rcpOptions = {
    iceServers: ["stun3.l.google.com:19302"].map((url) => ({
      urls: `stun:${url}`
    }))
  };
  rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
    urls: "stun:stun.l.google.com:19302"
  }];
  connections[target] = connections[target] || new RTCPeerConnection(rcpOptions);
  connections[target].onicecandidate = handleICECandidateEvent;
  connections[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  connections[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  connections[target].onsignalingstatechange = handleSignalingStateChangeEvent;
  connections[target].onnegotiationneeded = handleNegotiationNeededEvent;
  connections[target].ontrack = handleTrackEvent;
  connections[target].addEventListener("datachannel", receiveChannelCallback);
  const dataChannelOptions = {
    ordered: true,
    reliable: true,
    maxPacketLifeTime: 3e3
  };
  const rtc = connections[target].createDataChannel(target, dataChannelOptions);
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
    rtc.target = target;
    webRtcArray.push(rtc);
    connections[target].sendChannel = rtc;
    window.sendChannel = sendChannel = {
      send: (data) => {
        const target2 = data.target;
        data.name = data.name || username;
        const messageString = JSON.stringify(data);
        webRtcArray.map((ch) => ch.readyState === "open" && (!target2 || target2 && ch.target === target2) && ch.send(messageString));
      }
    };
  });
  rtc.addEventListener("close", () => {
    console.log("xxxxxxxx- The Data Channel is Closed");
  });
  return connections[target];
  function receiveChannelCallback(event) {
    console.log("Receive Channel Callback");
    const rtc2 = event.channel;
    rtc2.binaryType = "arraybuffer";
    rtc2.addEventListener("close", onReceiveChannelClosed);
    rtc2.addEventListener("message", (message) => processWsMessage(message, "rtc"));
    webRtcArray.push(rtc2);
  }
  function onReceiveChannelClosed() {
    console.log("Receive channel is closed");
    connections[target].close();
    connections[target] = null;
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
      ws.send(JSON.stringify({
        target,
        name: username,
        type: "video-offer",
        sdp: connections[target].localDescription
      }));
    } catch {
      log("*** The following error occurred while handling the negotiationneeded event:");
    }
  }
  function handleTrackEvent(event) {
    log("*** Track event");
    document.querySelector("#received_video").srcObject = event.streams[0];
    document.querySelector("#hangup-button").disabled = false;
  }
  function handleICECandidateEvent(event) {
    if (event.candidate) {
      log("*** Outgoing ICE candidate: " + event.candidate);
      ws.send(JSON.stringify({
        type: "new-ice-candidate",
        target,
        name: username,
        candidate: event.candidate
      }));
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
  function handleSignalingStateChangeEvent() {
    log("*** connections[target].signalingState  changed to: " + connections[target].signalingState);
    switch (connections[target].signalingState) {
      case "closed":
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
  connections[target] || await createPeerConnection(target);
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
  ws.send(JSON.stringify({
    target,
    name: username,
    type: "video-answer",
    sdp: connections[target].localDescription
  }));
}
async function processWsMessage(event, source) {
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
  if (data.type === "video-offer") {
    await handleChatOffer(data, data.name);
    return;
  }
  if (data.type === "video-answer") {
    await handleChatAnswerMessage(data, data.name);
    return;
  }
  if (source === ws && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (data.patch && source === "ws" || data.name !== username) {
    if (data.newHash === mySession.hashCode()) {
      return;
    }
    if (data.oldHash === mySession.hashCode()) {
      mySession.applyPatch(data);
      chCode(mySession.session.get("state").code, mySession.session.get("state").i);
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
      mySession.applyPatch(messageData);
      chCode(data.code);
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
function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
export {
  join
};
//# sourceMappingURL=ws-UGFXMDRU.mjs.map
