import "./chunk-XHYF4LCB.mjs";

// js/quickStart.mjs
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
var formatter;
var transform;
var esbuildEsmTransform;
var getHtmlAndCss;
var initSess;
var initSession = async (room, initData) => {
  initSess = initSess || (await import("./session-4BDELS2C.mjs")).default;
  return initSess(room, initData);
};
async function startMonacoWithSession(session) {
  const monacoEditorDom = document.querySelector("#monacoEditor");
  const { startMonaco } = await import("./editor-AXUPKZXE.mjs");
  const throttle = (await import("https://ga.jspm.io/npm:lodash@4.17.21/throttle.js")).default;
  const onchangeCode = (ev) => runner(editor.getModel().getValue(), ev.changes, session, ++session.i);
  const { editor, monaco } = await startMonaco({
    language: "typescript",
    container: monacoEditorDom,
    code: session.code
  });
  editor.onDidChangeModelContent(throttle(onchangeCode, 100));
  window.monaco = monaco;
  session.editor = editor;
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
  formatter = formatter || (await import("./formatter-EV7BIPLP.mjs")).formatter;
  esbuildEsmTransform = esbuildEsmTransform || (await import("../esbuildEsm.mjs")).transform;
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
        getHtmlAndCss = getHtmlAndCss || (await import("./renderToString-BESVEMYE.mjs")).getHtmlAndCss;
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
  const { renderPreviewWindow } = await import("./renderPreviewWindow-WS55THAU.mjs");
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
          } catch (e) {
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
    } catch (e) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcXVpY2tTdGFydC5tanMiLCAiLi4vLi4vd3MubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxubGV0IGZvcm1hdHRlcjtcbmxldCB0cmFuc2Zvcm07XG5cbmxldCBlc2J1aWxkRXNtVHJhbnNmb3JtO1xuLy8gTGV0IGVzYnVpbGRUcmFuc2Zvcm07XG4vLyBsZXQgYmFiZWxUcmFuc2Zvcm07XG5sZXQgZ2V0SHRtbEFuZENzcztcbmxldCBpbml0U2VzcztcblxuZXhwb3J0IGNvbnN0IGluaXRTZXNzaW9uID0gYXN5bmMgKHJvb20sIGluaXREYXRhKSA9PiB7XG4gIGluaXRTZXNzID0gaW5pdFNlc3MgfHwgKGF3YWl0IGltcG9ydChcIi4vc2Vzc2lvbi50c3hcIikpLmRlZmF1bHQ7XG5cbiAgcmV0dXJuIGluaXRTZXNzKHJvb20sIGluaXREYXRhKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmV0dGllciA9IGFzeW5jIChjb2RlKSA9PiB7XG4gIGZvcm1hdHRlciA9IGZvcm1hdHRlciB8fCAoYXdhaXQgaW1wb3J0KFwiLi9mb3JtYXR0ZXIubWpzXCIpKS5mb3JtYXR0ZXI7XG4gIHJldHVybiBhd2FpdCBmb3JtYXR0ZXIoY29kZSk7XG59O1xuXG4vLyAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRNb25hY29XaXRoU2Vzc2lvbihzZXNzaW9uKSB7XG4gIGNvbnN0IG1vbmFjb0VkaXRvckRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9uYWNvRWRpdG9yXCIpO1xuXG4gIGNvbnN0IHsgc3RhcnRNb25hY28gfSA9IGF3YWl0IGltcG9ydChcIi4vZWRpdG9yLnRzXCIpO1xuICBjb25zdCB0aHJvdHRsZSA9IChhd2FpdCBpbXBvcnQoXCJsb2Rhc2gvdGhyb3R0bGVcIikpLmRlZmF1bHQ7XG4gIGNvbnN0IG9uY2hhbmdlQ29kZSA9IChldikgPT5cbiAgICBydW5uZXIoZWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWUoKSwgZXYuY2hhbmdlcywgc2Vzc2lvbiwgKytzZXNzaW9uLmkpO1xuICBjb25zdCB7IGVkaXRvciwgbW9uYWNvIH0gPSBhd2FpdCBzdGFydE1vbmFjbyhcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FueX0gY29kZVxuICAgICAqL1xuICAgIHtcbiAgICAgIGxhbmd1YWdlOiBcInR5cGVzY3JpcHRcIixcbiAgICAgIGNvbnRhaW5lcjogbW9uYWNvRWRpdG9yRG9tLFxuICAgICAgY29kZTogc2Vzc2lvbi5jb2RlLFxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgICAgICovXG4gICAgfSxcbiAgKTtcblxuICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQodGhyb3R0bGUob25jaGFuZ2VDb2RlLCAxMDApKTtcblxuICB3aW5kb3cubW9uYWNvID0gbW9uYWNvO1xuICBzZXNzaW9uLmVkaXRvciA9IGVkaXRvcjtcblxuICAvLyBtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyT25UeXBlRm9ybWF0dGluZ0VkaXRQcm92aWRlcihcInR5cGVzY3JpcHRcIiwge1xuICAvLyAgIGF1dG9Gb3JtYXRUcmlnZ2VyQ2hhcmFjdGVyczogW1wifVwiLCBcIntcIiwgXCIpXCIsIFwiKFwiLCBcIjtcIl0sXG5cbiAgLy8gICBhc3luYyBwcm92aWRlT25UeXBlRm9ybWF0dGluZ0VkaXRzKG1vZGVsKSB7XG4gIC8vICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgZm9ybWF0dGVyKG1vZGVsLmdldFZhbHVlKCkpO1xuXG4gIC8vICAgICByZXR1cm4gW1xuICAvLyAgICAgICB7XG4gIC8vICAgICAgICAgcmFuZ2U6IG1vZGVsLmdldEZ1bGxNb2RlbFJhbmdlKCksXG5cbiAgLy8gICAgICAgICB0ZXh0LFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgXTtcbiAgLy8gICB9LFxuICAvLyB9KTtcblxuICB3aW5kb3cuc2VzcyA9IHNlc3Npb247XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEVycm9ycyh7IG1vbmFjbywgZWRpdG9yIH0pIHtcbiAgaWYgKCFtb25hY28pIHtcbiAgICByZXR1cm4gW3sgbWVzc2FnZVRleHQ6IFwiRXJyb3Igd2l0aCB0aGUgZXJyb3IgY2hlY2tpbmcuIFRyeSB0byByZWxvYWQhXCIgfV07XG4gIH1cblxuICBjb25zdCBtb2RlbCA9IGVkaXRvci5nZXRNb2RlbCgpO1xuICBjb25zdCB3b3JrZXIgPSBhd2FpdCBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuZ2V0VHlwZVNjcmlwdFdvcmtlcigpO1xuICBjb25zdCBjbGllbnQgPSBhd2FpdCB3b3JrZXIobW9kZWwpO1xuXG4gIGNvbnN0IGZpbGVuYW1lID0gbW9kZWwudXJpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGRpYWcgPSBjbGllbnQuZ2V0U2VtYW50aWNEaWFnbm9zdGljcyhmaWxlbmFtZSk7XG4gIGNvbnN0IGNvbXAgPSBjbGllbnQuZ2V0Q29tcGlsZXJPcHRpb25zRGlhZ25vc3RpY3MoZmlsZW5hbWUpO1xuICBjb25zdCBzeW50YXggPSBjbGllbnQuZ2V0U3ludGFjdGljRGlhZ25vc3RpY3MoZmlsZW5hbWUpO1xuICBjb25zdCBmYXN0RXJyb3IgPSBhd2FpdCBQcm9taXNlLnJhY2UoW2RpYWcsIGNvbXAsIHN5bnRheF0pO1xuXG4gIC8vIE1vZGVsLmRpc3Bvc2UoKTtcbiAgY29uc29sZS5sb2coZmFzdEVycm9yKTtcbiAgcmV0dXJuIFtdO1xufVxuXG4vLyBMZXQgZ2V0SHRtbEFuZENzcztcblxuYXN5bmMgZnVuY3Rpb24gcnVubmVyKGMsIGNoYW5nZXMgPSBudWxsLCBzZXNzaW9uLCBjb3VudGVyKSB7XG4gIC8vIElmICghZXNidWlsZEVzbVRyYW5zZm9ybSB8fCAhZm9ybWF0dGVyICkgc2Vzc2lvbi5icm9hZCh7Li4uc2Vzc2lvbiwgY29kZTogYywgZXJyb3JUZXh0OiBcIlBSRVwiIH0pXG5cbiAgc2Vzc2lvbi5jaGFuZ2VzLnB1c2goY2hhbmdlcyk7XG4gIGZvcm1hdHRlciA9IGZvcm1hdHRlciB8fCAoYXdhaXQgaW1wb3J0KFwiLi9mb3JtYXR0ZXIubWpzXCIpKS5mb3JtYXR0ZXI7XG4gIGVzYnVpbGRFc21UcmFuc2Zvcm0gPSBlc2J1aWxkRXNtVHJhbnNmb3JtIHx8XG4gICAgKGF3YWl0IGltcG9ydChcIi4vZXNidWlsZEVzbS50c1wiKSkudHJhbnNmb3JtO1xuXG4gIHRyYW5zZm9ybSA9IGVzYnVpbGRFc21UcmFuc2Zvcm07XG5cbiAgc2Vzc2lvbi5lcnJvclRleHQgPSBcIlwiO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgY2QgPSBhd2FpdCBmb3JtYXR0ZXIoYyk7XG5cbiAgICBjb25zdCB0cmFuc3BpbGVkID0gYXdhaXQgdHJhbnNmb3JtKGNkKTtcblxuICAgIGxldCByZXN0YXJ0RXJyb3IgPSBmYWxzZTtcbiAgICAvLy8geWVsbG93XG4gICAgaWYgKHRyYW5zcGlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGNvdW50ZXIgPCBzZXNzaW9uLmkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBnZXRIdG1sQW5kQ3NzID0gZ2V0SHRtbEFuZENzcyB8fFxuICAgICAgICAgIChhd2FpdCBpbXBvcnQoXCIuL3JlbmRlclRvU3RyaW5nLnRzeFwiKSkuZ2V0SHRtbEFuZENzcztcblxuICAgICAgICBpZiAoY291bnRlciA8IHNlc3Npb24uaSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IEFwcCA9IGF3YWl0IGdldEFwcCh0cmFuc3BpbGVkKTtcbiAgICAgICAgY29uc3QgeyBodG1sLCBjc3MgfSA9IGdldEh0bWxBbmRDc3MoQXBwKTtcblxuICAgICAgICBzZXNzaW9uLnRyYW5zcGlsZWQgPSB0cmFuc3BpbGVkO1xuICAgICAgICBzZXNzaW9uLmh0bWwgPSBodG1sO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gYXdhaXQgZ2V0UmVhY3RDaGlsZCh0cmFuc3BpbGVkKTtcblxuICAgICAgICAvLyBTZXNzaW9uLmh0bWwgPSB6Ym9keS5pbm5lckhUTUw7XG5cbiAgICAgICAgc2Vzc2lvbi5zZXRDaGlsZCgoYykgPT4gWy4uLmMsIGNoaWxkcmVuXSk7XG4gICAgICAgIHNlc3Npb24uY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgcmVzdGFydEVycm9yID0gIWh0bWw7XG4gICAgICAgIHNlc3Npb24uY29kZSA9IGNkO1xuICAgICAgICBzZXNzaW9uLmNvZGVOb25Gb3JtYXR0ZWQgPSBjO1xuICAgICAgICAvLyBHZXRDc3MgPSBnZXRDc3MgfHwgKGF3YWl0IGltcG9ydChcIi4vdGVtcGxhdGVzLnRzXCIpKS5nZXRDc3M7XG4gICAgICAgIC8vIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyAgICAgc2Vzc2lvbi5odG1sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6Ym9keVwiKS5pbm5lckhUTUw7XG4gICAgICAgIC8vIGNvbnN0IGNzcyA9IGdldENzcyhzZXNzaW9uKTtcbiAgICAgICAgY29uc3QgY29kZSA9IGNkO1xuICAgICAgICBzZXNzaW9uLmNzcyA9IGNzcztcbiAgICAgICAgaWYgKHNlc3Npb24uaSAhPT0gY291bnRlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlc3Npb24uc2F2ZUNvZGUgJiZcbiAgICAgICAgICBhd2FpdCBzZXNzaW9uLnNhdmVDb2RlKHsgdHJhbnNwaWxlZCwgY29kZSwgaTogY291bnRlciwgY3NzLCBodG1sIH0pO1xuICAgICAgICAvLyB9LCAxMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFWENFUFRJT05cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHsgZTogZXJyb3IgfSk7XG4gICAgICAgIHJlc3RhcnRFcnJvciA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoeyByZXN0YXJ0RXJyb3IgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb24uaSA+IGNvdW50ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvciA9IGF3YWl0IGdldEVycm9ycyhzZXNzaW9uKTtcbiAgICBpZiAoc2Vzc2lvbi5pID4gY291bnRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZXN0YXJ0RXJyb3IpIHtcbiAgICAgIGVycm9yLnB1c2goXG4gICAgICAgIHsgbWVzc2FnZVRleHQ6IFwiRXJyb3Igd2hpbGUgc3RhcnRpbmcgdGhlIGFwcC4gQ2hlY2sgdGhlIGNvbnNvbGUhXCIgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZXJyOiBlcnJvciB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2Vzc2lvbi5lcnJvclRleHQgPSBlcnJvci5tZXNzYWdlO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0YXJ0RnJvbUNvZGUgPSBhc3luYyAoeyBjb2RlIH0pID0+IHtcbiAgY29uc3Qgc2Vzc2lvbiA9IHtcbiAgICBjb2RlLFxuICAgIGk6IDAsXG4gICAgY2hhbmdlczogW10sXG4gICAgc2F2ZUNvZGU6ICgpID0+IHt9LFxuICAgIHNldENoaWxkOiAoKSA9PiB7fSxcbiAgfTtcbiAgYXdhaXQgcnVubmVyKGNvZGUsIG51bGwsIHNlc3Npb24pO1xuICBhd2FpdCBxdWlja1N0YXJ0KHNlc3Npb24pO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHF1aWNrU3RhcnQoc2Vzc2lvbiwgcm9vbSwga2VlcEZ1bGxTY3JlZW4sIHNhdmVDb2RlKSB7XG4gIHNlc3Npb24uc2F2ZUNvZGUgPSBzYXZlQ29kZTtcbiAgLy8gU2Vzc2lvbi5jaGlsZHJlbiA9IGF3YWl0IGdldFJlYWN0Q2hpbGQoc2Vzc2lvbi50cmFuc3BpbGVkKTtcbiAgc2Vzc2lvbi5jaGlsZHJlbiA9IG51bGw7XG4gIGNvbnN0IHsgcmVuZGVyUHJldmlld1dpbmRvdyB9ID0gYXdhaXQgaW1wb3J0KFxuICAgIFwiLi9yZW5kZXJQcmV2aWV3V2luZG93LnRzeFwiXG4gICk7XG5cbiAgYXdhaXQgcmVuZGVyUHJldmlld1dpbmRvdyhzZXNzaW9uLCByb29tLCBrZWVwRnVsbFNjcmVlbik7XG5cbiAgLy8gSWYgKGxvY2FsU3RvcmFnZSAmJiBzZXNzaW9uKSB7XG4gIC8vICAgY29uc3QgeyBjb2RlLCB0cmFuc3BpbGVkLCBodG1sLCBjc3MsIGkgfSA9IHNlc3Npb247XG4gIC8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gIC8vICAgICBgc3RhdGUtJHtzZXNzaW9uLnJvb219YCxcbiAgLy8gICAgIEpTT04uc3RyaW5naWZ5KHsgY29kZSwgdHJhbnNwaWxlZCwgaHRtbCwgY3NzLCBpIH0pLFxuICAvLyAgICk7XG4gIC8vIH1cbiAgLy8gLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZSgpO1xuXG4gIGlmICgha2VlcEZ1bGxTY3JlZW4pIHtcbiAgICBhd2FpdCBzdGFydE1vbmFjb1dpdGhTZXNzaW9uKHNlc3Npb24pO1xuICB9XG5cbiAgc2Vzc2lvbi51cGRhdGUgPSAoYykgPT4gcnVubmVyKGMsIG51bGwsIHNlc3Npb24pO1xuICBydW5uZXIoc2Vzc2lvbi5jb2RlLCBudWxsLCBzZXNzaW9uLCAtMSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFJlYWN0Q2hpbGQodHJhbnNwaWxlZCwgbW9kZSA9IFwid2luZG93XCIpIHtcbiAgY29uc3QgY29kZVRvSHlkcmF0ZSA9IG1vZGUgPT09IFwid2luZG93XCJcbiAgICA/IHRyYW5zcGlsZWQucmVwbGFjZShcImJvZHl7XCIsIFwiI3pib2R5e1wiKVxuICAgIDogdHJhbnNwaWxlZDtcblxuICBjb25zdCBvYmplY3RVcmwgPSBjcmVhdGVKc0Jsb2IoXG4gICAgY29kZVRvSHlkcmF0ZSxcbiAgKTtcblxuICBjb25zdCBtb2QgPSAoYXdhaXQgaW1wb3J0KG9iamVjdFVybCkpO1xuICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG5cbiAgcmV0dXJuIGpzeChtb2QuZGVmYXVsdCk7XG59XG5cbi8vIEZ1bmN0aW9uIGNyZWF0ZVBhdGNoKG9sZENvZGUsIG5ld0NvZGUsIGNyZWF0ZURlbHRhKSB7XG4vLyAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjcmVhdGVEZWx0YShvbGRDb2RlLCBuZXdDb2RlKSk7XG4vLyB9XG5cbi8qKlxuICogQHBhcmFtIHtCbG9iUGFydH0gY29kZVxuICovXG5mdW5jdGlvbiBjcmVhdGVKc0Jsb2IoY29kZSkge1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvZGVdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiIH0pO1xuXG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBcHAodHJhbnNwaWxlZCwgbW9kZSA9IFwid2luZG93XCIpIHtcbiAgY29uc3QgY29kZVRvSHlkcmF0ZSA9IG1vZGUgPT09IFwid2luZG93XCJcbiAgICA/IHRyYW5zcGlsZWQucmVwbGFjZShcImJvZHl7XCIsIFwiI3pib2R5e1wiKVxuICAgIDogdHJhbnNwaWxlZDtcblxuICBjb25zdCBvYmplY3RVcmwgPSBjcmVhdGVKc0Jsb2IoXG4gICAgY29kZVRvSHlkcmF0ZSxcbiAgKTtcblxuICBjb25zdCBBcHAgPSAoYXdhaXQgaW1wb3J0KG9iamVjdFVybCkpLmRlZmF1bHQ7XG5cbiAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuXG4gIHJldHVybiBBcHA7XG59XG4iLCAiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8vIGltcG9ydCBpbml0U2Vzc2lvbiBmcm9tIFwiLi9kaXN0L3Nlc3Npb24ubWpzXCI7XG5cbmltcG9ydCB7IGluaXRTZXNzaW9uLCBxdWlja1N0YXJ0IH0gZnJvbSBcIi4vcXVpY2tTdGFydC5tanNcIjtcblxubGV0IGN1cnJlbnRXZWJTb2NrZXQgPSBudWxsO1xubGV0IHNlc3MgPSBmYWxzZTtcbi8vIExldCBzYW55aVByb2Nlc3MgPSBudWxsO1xuXG5jb25zdCB3ZWJSdGNBcnJheSA9IFtdO1xuY29uc3QgaG9zdG5hbWUgPSBcInNwaWtlLmxhbmRcIjtcbmNvbnN0IG1vZCA9IHt9O1xuXG5sZXQgd3NMYXN0SGFzaENvZGUgPSBcIlwiO1xubGV0IHdlYlJUQ0xhc3RTZWVuSGFzaENvZGUgPSBcIlwiO1xubGV0IHJvb21OYW1lID0gXCJcIjtcbmxldCB1c2VybmFtZSA9IFwiXCI7XG5sZXQgbGFzdFNlZW5UaW1lc3RhbXAgPSAwO1xubGV0IGxhc3RTZWVuTm93ID0gMDtcbmxldCB3cztcbmxldCBjaENvZGU7XG5sZXQgc3RhcnRUaW1lO1xubGV0IHJlam9pbmVkID0gZmFsc2U7XG5sZXQgc2VuZENoYW5uZWw7XG5sZXQgZGVsdGFTZW50ID0gXCJcIjtcbi8vIExldCBjcmVhdGVEZWx0YTtcbi8vIGxldCBhcHBseVBhdGNoO1xubGV0IG15U2Vzc2lvbiA9IG51bGw7XG5jb25zdCBtU1QgPSAoKSA9PiBteVNlc3Npb24uc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKTtcblxubGV0IGludGVydmFsSGFuZGxlciA9IG51bGw7XG5cbi8vIEZ1bmN0aW9uIGNyZWF0ZVBhdGNoKG9sZENvZGUsIG5ld0NvZGUpIHtcbi8vICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNyZWF0ZURlbHRhKG9sZENvZGUsIG5ld0NvZGUpKTtcbi8vIH1cblxuLy8gbGV0IGltcG9ydFRvb2xzID0gYXN5bmMgKCkgPT4ge1xuLy8gaWYgKHRvb2xzSW1wb3J0ZWQpIHJldHVybiB0b29sc0ltcG9ydGVkO1xuXG4vLyBpbXBvcnQoXCJ0ZXh0ZGlmZi1jcmVhdGVcIikudGhlbigobW9kKSA9PiBjcmVhdGVEZWx0YSA9IG1vZC5kZWZhdWx0KTtcbi8vIGltcG9ydChcInRleHRkaWZmLXBhdGNoXCIpLnRoZW4oKG1vZCkgPT4gYXBwbHlQYXRjaCA9IG1vZC5kZWZhdWx0KTtcblxuLy8gdG9vbHNJbXBvcnRlZCA9IHRydWU7XG4vLyByZXR1cm4gdG9vbHNJbXBvcnRlZDtcbi8vIH07XG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gIGlmIChEYXRlLm5vdygpIC0gbGFzdFNlZW5Ob3cgPiA0MF8wMDApIHtcbiAgICByZWpvaW4oKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vX25lZWRfdG9fcmVqb2luXCIpO1xuICB9XG59LCAzMF8wMDApO1xuXG5jaENvZGUgPSBnbG9iYWxUaGlzLmNoQ29kZSA9IGFzeW5jIChjb2RlLCBpKSA9PiB7XG4gIGlmICghY29kZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpIDwgd2luZG93LnNlc3MuaSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb2RlID09PSB3aW5kb3cuc2Vzcy5jb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAod2luZG93LnNlc3MgJiYgd2luZG93LnNlc3MuZWRpdG9yKSB7XG4gICAgICB3aW5kb3cuc2Vzcy5lZGl0b3IuZ2V0TW9kZWwoKS5zZXRWYWx1ZShjb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnNlc3MudXBkYXRlKGNvZGUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKHsgZTogZXJyb3IgfSk7XG4gIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHJlam9pbigpIHtcbiAgaWYgKCFyZWpvaW5lZCkge1xuICAgIHJlam9pbmVkID0gdHJ1ZTtcbiAgICBjdXJyZW50V2ViU29ja2V0ID0gbnVsbDtcbiAgICAvLyBNeVNlc3Npb24uYWRkRXZlbnQoe1xuICAgIC8vICAgdHlwZTogXCJqb2luZWRcIlxuICAgIC8vIH0pO1xuXG4gICAgLy8gQ2xlYXIgdGhlIHJvc3Rlci5cbiAgICAvLyAgd2hpbGUgKHJvc3Rlci5maXJzdENoaWxkKSB7XG4gICAgLy8gICByb3N0ZXIucmVtb3ZlQ2hpbGQocm9zdGVyLmZpcnN0Q2hpbGQpO1xuICAgIC8vICAgIH1cblxuICAgIC8vIERvbid0IHRyeSB0byByZWNvbm5lY3QgdG9vIHJhcGlkbHkuXG4gICAgY29uc3QgdGltZVNpbmNlTGFzdEpvaW4gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIGlmICh0aW1lU2luY2VMYXN0Sm9pbiA8IDEwXzAwMCkge1xuICAgICAgLy8gTGVzcyB0aGFuIDEwIHNlY29uZHMgZWxhcHNlZCBzaW5jZSBsYXN0IGpvaW4uIFBhdXNlIGEgYml0LlxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTBfMDAwIC0gdGltZVNpbmNlTGFzdEpvaW4pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIE9LLCByZWNvbm5lY3Qgbm93IVxuICAgIGpvaW4oKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBicm9hZChcbiAgeyBjb2RlLCB0cmFuc3BpbGVkLCBodG1sLCBjc3MsIGkgfSxcbikge1xuICBpZiAoc2VuZENoYW5uZWwpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIG1vZC5pID0gaTtcbiAgICBpZiAobW9kLmxhc3RSdGNVcGRhdGUpIHtcbiAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBtb2QubGFzdFVwZGF0ZTtcbiAgICAgIGlmIChkaWZmIDwgMTAwMCkge1xuICAgICAgICBhd2FpdCB3YWl0KDIwMCAtIGRpZmYpO1xuICAgICAgICBpZiAoaSAhPT0gbW9kLmkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtb2QubGFzdFJ0Y1VwZGF0ZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgdXBkYXRlZFN0YXRlID0gbVNUKCkudG9KU09OKCk7XG5cbiAgICB1cGRhdGVkU3RhdGUuaHRtbCA9IGh0bWw7XG4gICAgdXBkYXRlZFN0YXRlLmNzcyA9IGNzcztcbiAgICB1cGRhdGVkU3RhdGUudHJhbnNwaWxlZCA9IHRyYW5zcGlsZWQ7XG4gICAgdXBkYXRlZFN0YXRlLmNvZGUgPSBjb2RlO1xuICAgIHVwZGF0ZWRTdGF0ZS5pID0gaTtcbiAgICBjb25zdCBtZXNzYWdlID0gd2ViUlRDTGFzdFNlZW5IYXNoQ29kZVxuICAgICAgPyBteVNlc3Npb24uY3JlYXRlUGF0Y2hGcm9tSGFzaENvZGUod2ViUlRDTGFzdFNlZW5IYXNoQ29kZSwgdXBkYXRlZFN0YXRlKVxuICAgICAgOiBteVNlc3Npb24uY3JlYXRlUGF0Y2godXBkYXRlZFN0YXRlKTtcbiAgICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLnBhdGNoICE9PSBcIlwiKSB7XG4gICAgICBzZW5kQ2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjdXJyZW50V2ViU29ja2V0KSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBtb2QuaSA9IGk7XG4gICAgaWYgKG1vZC5sYXN0VXBkYXRlKSB7XG4gICAgICBjb25zdCBkaWZmID0gbm93IC0gbW9kLmxhc3RVcGRhdGU7XG4gICAgICBpZiAoZGlmZiA8IDEwMDApIHtcbiAgICAgICAgYXdhaXQgd2FpdCgxMDAwIC0gZGlmZik7XG4gICAgICAgIGlmIChpICE9PSBtb2QuaSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1vZC5sYXN0VXBkYXRlID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB1cGRhdGVkU3RhdGUgPSBtU1QoKS50b0pTT04oKTtcblxuICAgIHVwZGF0ZWRTdGF0ZS5odG1sID0gaHRtbDtcbiAgICB1cGRhdGVkU3RhdGUuY3NzID0gY3NzO1xuICAgIHVwZGF0ZWRTdGF0ZS50cmFuc3BpbGVkID0gdHJhbnNwaWxlZDtcbiAgICB1cGRhdGVkU3RhdGUuY29kZSA9IGNvZGU7XG4gICAgdXBkYXRlZFN0YXRlLmkgPSBpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB3c0xhc3RIYXNoQ29kZVxuICAgICAgPyBteVNlc3Npb24uY3JlYXRlUGF0Y2hGcm9tSGFzaENvZGUod3NMYXN0SGFzaENvZGUsIHVwZGF0ZWRTdGF0ZSlcbiAgICAgIDogbXlTZXNzaW9uLmNyZWF0ZVBhdGNoKHVwZGF0ZWRTdGF0ZSk7XG5cbiAgICAvLyBDb25zb2xlLmxvZyhcIkFQUExZXCIpO1xuICAgIC8vIG15U2Vzc2lvbi5hcHBseVBhdGNoKG1lc3NhZ2UpO1xuICAgIC8vIGNvbnNvbGUubG9nKG15U2Vzc2lvbi5oYXNoQ29kZSgpKTtcblxuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh7IC4uLm1lc3NhZ2UsIG5hbWU6IHVzZXJuYW1lIH0pO1xuICAgIGlmIChtZXNzYWdlLnBhdGNoICE9PSBcIlwiKSB7XG4gICAgICBjdXJyZW50V2ViU29ja2V0LnNlbmQobWVzc2FnZVN0cmluZyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBqb2luID0gYXN5bmMgKHJvb20sIHVzZXIsIGRlbHRhKSA9PiB7XG4gIHJvb21OYW1lID0gcm9vbU5hbWUgfHwgcm9vbSB8fCBcImNvZGUtbWFpblwiO1xuICB3aW5kb3cucm9vbSA9IHJvb207XG4gIGlmICh1c2VyKSB7XG4gICAgdXNlcm5hbWUgPSB1c2VyO1xuICB9XG5cbiAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL3NwaWtlLmxhbmQvYXBpL3Jvb20vJHtyb29tTmFtZX0vc2Vzc2lvbmAsXG4gICk7XG4gIGNvbnN0IHN0YXRlID0gYXdhaXQgcmVzcC5qc29uKCk7XG5cbiAgbXlTZXNzaW9uID0gbXlTZXNzaW9uIHx8IGF3YWl0IGluaXRTZXNzaW9uKHJvb21OYW1lLCB7XG4gICAgbmFtZTogdXNlcm5hbWUsXG4gICAgcm9vbTogcm9vbU5hbWUsXG4gICAgc3RhdGUsXG4gICAgZXZlbnRzOiBbXSxcbiAgfSk7XG5cbiAgd2luZG93Lm15U2Vzc2lvbiA9IG15U2Vzc2lvbjtcbiAgaWYgKCFkZWx0YSkge1xuICAgIGlmICghd2luZG93LnNlc3MpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgIC4uLm1TVCgpLnRvSlNPTigpLFxuICAgICAgICBzZXRDaGlsZDogKCkgPT4ge30sXG4gICAgICAgIGNoYW5nZXM6IFtdLFxuXG4gICAgICAgIGNoaWxkcmVuOiBbbnVsbF0sXG4gICAgICAgIGVycm9yVGV4dDogXCJcIixcbiAgICAgIH07XG4gICAgICBjb25zdCB0aHJvdHRsZSA9IChhd2FpdCBpbXBvcnQoXCJsb2Rhc2gvdGhyb3R0bGVcIikpLmRlZmF1bHQ7XG5cbiAgICAgIGNvbnN0IHN0YXlGdWxsc2NyZWVuID0gbG9jYXRpb24ucGF0aG5hbWUuZW5kc1dpdGgoXCJwdWJsaWNcIik7XG4gICAgICBxdWlja1N0YXJ0KFxuICAgICAgICBzZXNzaW9uLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgc3RheUZ1bGxzY3JlZW4sXG4gICAgICAgIHRocm90dGxlKGJyb2FkLCAxMDApLFxuICAgICAgKTtcbiAgICAgIHdpbmRvdy5zZXNzID0gc2Vzc2lvbjtcbiAgICB9XG4gIH1cblxuICBpZiAoc2Vzcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNlc3MgPSB0cnVlO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNlc3MgPSBmYWxzZTtcbiAgfSwgMTBfMDAwKTtcblxuICB3cyA9IG5ldyBXZWJTb2NrZXQoXG4gICAgXCJ3c3M6Ly9cIiArIGhvc3RuYW1lICsgXCIvYXBpL3Jvb20vXCIgKyByb29tTmFtZSArIFwiL3dlYnNvY2tldFwiLFxuICApO1xuICByZWpvaW5lZCA9IGZhbHNlO1xuICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsICgpID0+IHtcbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGlmIChkZWx0YSAhPT0gZGVsdGFTZW50KSB7XG4gICAgICAgIGRlbHRhU2VudCA9IGRlbHRhO1xuICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICB0eXBlOiBcImRlbHRhXCIsXG4gICAgICAgICAgZGVsdGEsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGludGVydmFsSGFuZGxlcikge1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcnZhbEhhbmRsZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0U2Vlbk5vdztcblxuICAgICAgICBpZiAobm93IC0gbGFzdFNlZW5Ob3cgPiAzMF8wMDApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgd3Muc2VuZChcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHRpbWU6IGxhc3RTZWVuVGltZXN0YW1wICsgZGlmZixcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmVqb2luKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAzMF8wMDApO1xuICAgIH1cblxuICAgIGN1cnJlbnRXZWJTb2NrZXQgPSB3cztcblxuICAgIGdsb2JhbFRoaXMuYnJvYWQgPSBicm9hZDtcbiAgICBnbG9iYWxUaGlzLmNoQ29kZSA9IGNoQ29kZTtcblxuICAgIC8vIFNlbmQgdXNlciBpbmZvIG1lc3NhZ2UuXG4gICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7IG5hbWU6IHVzZXJuYW1lIH0pKTtcbiAgfSk7XG5cbiAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IHByb2Nlc3NXc01lc3NhZ2UobWVzc2FnZSwgXCJ3c1wiKSk7XG5cbiAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IGNsb3NlZCwgcmVjb25uZWN0aW5nOlwiLCBldmVudC5jb2RlLCBldmVudC5yZWFzb24pO1xuICAgIHJlam9pbigpO1xuICB9KTtcbiAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IGVycm9yLCByZWNvbm5lY3Rpbmc6XCIsIGV2ZW50KTtcbiAgICByZWpvaW4oKTtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGUgdGhlIFJUQ1BlZXJDb25uZWN0aW9uIHdoaWNoIGtub3dzIGhvdyB0byB0YWxrIHRvIG91clxuLy8gc2VsZWN0ZWQgU1RVTi9UVVJOIHNlcnZlciBhbmQgdGhlbiB1c2VzIGdldFVzZXJNZWRpYSgpIHRvIGZpbmRcbi8vIG91ciBjYW1lcmEgYW5kIG1pY3JvcGhvbmUgYW5kIGFkZCB0aGF0IHN0cmVhbSB0byB0aGUgY29ubmVjdGlvbiBmb3Jcbi8vIHVzZSBpbiBvdXIgdmlkZW8gY2FsbC4gVGhlbiB3ZSBjb25maWd1cmUgZXZlbnQgaGFuZGxlcnMgdG8gZ2V0XG4vLyBuZWVkZWQgbm90aWZpY2F0aW9ucyBvbiB0aGUgY2FsbC5cblxubGV0IG15SG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5pZiAoIW15SG9zdG5hbWUpIHtcbiAgbXlIb3N0bmFtZSA9IFwibG9jYWxob3N0XCI7XG59XG5cbmxvZyhcIkhvc3RuYW1lOiBcIiArIG15SG9zdG5hbWUpO1xuXG4vLyBXZWJTb2NrZXQgY2hhdC9zaWduYWxpbmcgY2hhbm5lbCB2YXJpYWJsZXMuXG5cbi8vIFRoZSBtZWRpYSBjb25zdHJhaW50cyBvYmplY3QgZGVzY3JpYmVzIHdoYXQgc29ydCBvZiBzdHJlYW0gd2Ugd2FudFxuLy8gdG8gcmVxdWVzdCBmcm9tIHRoZSBsb2NhbCBBL1YgaGFyZHdhcmUgKHR5cGljYWxseSBhIHdlYmNhbSBhbmRcbi8vIG1pY3JvcGhvbmUpLiBIZXJlLCB3ZSBzcGVjaWZ5IG9ubHkgdGhhdCB3ZSB3YW50IGJvdGggYXVkaW8gYW5kXG4vLyB2aWRlbzsgaG93ZXZlciwgeW91IGNhbiBiZSBtb3JlIHNwZWNpZmljLiBJdCdzIHBvc3NpYmxlIHRvIHN0YXRlXG4vLyB0aGF0IHlvdSB3b3VsZCBwcmVmZXIgKG9yIHJlcXVpcmUpIHNwZWNpZmljIHJlc29sdXRpb25zIG9mIHZpZGVvLFxuLy8gd2hldGhlciB0byBwcmVmZXIgdGhlIHVzZXItZmFjaW5nIG9yIHJlYXItZmFjaW5nIGNhbWVyYSAoaWYgYXZhaWxhYmxlKSxcbi8vIGFuZCBzbyBvbi5cbi8vXG4vLyBTZWUgYWxzbzpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NZWRpYVN0cmVhbUNvbnN0cmFpbnRzXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTWVkaWFEZXZpY2VzL2dldFVzZXJNZWRpYVxuLy9cblxuY29uc3QgY29ubmVjdGlvbnMgPSB7fTsgLy8gVG8gc3QvIFJUQ1BlZXJDb25uZWN0aW9uXG4vLyB2YXIgdHJhbnNjZWl2ZXIgPSBudWxsOyAgICAgICAgIC8vIFJUQ1J0cFRyYW5zY2VpdmVyXG4vLyB2YXIgd2ViY2FtU3RyZWFtID0gbnVsbDsgICAgICAgIC8vIE1lZGlhU3RyZWFtIGZyb20gd2ViY2FtXG5cbi8vIE91dHB1dCBsb2dnaW5nIGluZm9ybWF0aW9uIHRvIGNvbnNvbGUuXG5nbG9iYWxUaGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvbnM7XG5mdW5jdGlvbiBsb2codGV4dCkge1xuICBjb25zdCB0aW1lID0gbmV3IERhdGUoKTtcblxuICBjb25zb2xlLmxvZyhcIltcIiArIHRpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKCkgKyBcIl0gXCIgKyB0ZXh0KTtcbn1cblxuLy8gT3V0cHV0IGFuIGVycm9yIG1lc3NhZ2UgdG8gY29uc29sZS5cblxuZnVuY3Rpb24gbG9nX2Vycm9yKHRleHQpIHtcbiAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc29sZS50cmFjZShcIltcIiArIHRpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKCkgKyBcIl0gXCIgKyB0ZXh0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVlckNvbm5lY3Rpb24odGFyZ2V0KSB7XG4gIGxvZyhcIlNldHRpbmcgdXAgYSBjb25uZWN0aW9uLi4uXCIpO1xuXG4gIC8vIENyZWF0ZSBhbiBSVENQZWVyQ29ubmVjdGlvbiB3aGljaCBrbm93cyB0byB1c2Ugb3VyIGNob3NlblxuICAvLyBTVFVOIHNlcnZlci5cblxuICBjb25zdCByY3BPcHRpb25zID0ge1xuICAgIGljZVNlcnZlcnM6IFtcInN0dW4zLmwuZ29vZ2xlLmNvbToxOTMwMlwiXS5tYXAoKHVybCkgPT4gKHtcbiAgICAgIHVybHM6IGBzdHVuOiR7dXJsfWAsXG4gICAgfSkpLFxuICB9O1xuXG4gIHJjcE9wdGlvbnMuaWNlU2VydmVycyA9IFt7IHVybHM6IFwic3R1bjpzdHVuLnN0dW5wcm90b2NvbC5vcmc6MzQ3OFwiIH0sIHtcbiAgICB1cmxzOiBcInN0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDJcIixcbiAgfV07XG5cbiAgY29ubmVjdGlvbnNbdGFyZ2V0XSA9IGNvbm5lY3Rpb25zW3RhcmdldF0gfHwgbmV3IFJUQ1BlZXJDb25uZWN0aW9uKFxuICAgIHJjcE9wdGlvbnMsXG4gICk7XG5cbiAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgSUNFIG5lZ290aWF0aW9uIHByb2Nlc3MuXG5cbiAgY29ubmVjdGlvbnNbdGFyZ2V0XS5vbmljZWNhbmRpZGF0ZSA9IGhhbmRsZUlDRUNhbmRpZGF0ZUV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID1cbiAgICBoYW5kbGVJQ0VDb25uZWN0aW9uU3RhdGVDaGFuZ2VFdmVudDtcbiAgY29ubmVjdGlvbnNbdGFyZ2V0XS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID1cbiAgICBoYW5kbGVJQ0VHYXRoZXJpbmdTdGF0ZUNoYW5nZUV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBoYW5kbGVTaWduYWxpbmdTdGF0ZUNoYW5nZUV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBoYW5kbGVOZWdvdGlhdGlvbk5lZWRlZEV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9udHJhY2sgPSBoYW5kbGVUcmFja0V2ZW50O1xuXG4gIGNvbm5lY3Rpb25zW3RhcmdldF0uYWRkRXZlbnRMaXN0ZW5lcihcImRhdGFjaGFubmVsXCIsIHJlY2VpdmVDaGFubmVsQ2FsbGJhY2spO1xuXG4gIGNvbnN0IGRhdGFDaGFubmVsT3B0aW9ucyA9IHtcbiAgICBvcmRlcmVkOiB0cnVlLCAvLyBEbyBub3QgZ3VhcmFudGVlIG9yZGVyXG4gICAgcmVsaWFibGU6IHRydWUsXG4gICAgbWF4UGFja2V0TGlmZVRpbWU6IDMwMDAsIC8vIEluIG1pbGxpc2Vjb25kc1xuICB9O1xuXG4gIGNvbnN0IHJ0YyA9IGNvbm5lY3Rpb25zW3RhcmdldF0uY3JlYXRlRGF0YUNoYW5uZWwoXG4gICAgdGFyZ2V0LFxuICAgIGRhdGFDaGFubmVsT3B0aW9ucyxcbiAgKTtcblxuICBydGMuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblxuICBydGMuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKioqUlRDKioqXCIsIHsgbXNnOiBtZXNzYWdlIH0pO1xuXG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmhhc2hDb2RlKSB7XG4gICAgICB3ZWJSVENMYXN0U2Vlbkhhc2hDb2RlID0gZGF0YS5oYXNoQ29kZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLm5ld0hhc2gpIHtcbiAgICAgIHdlYlJUQ0xhc3RTZWVuSGFzaENvZGUgPSBkYXRhLm5ld0hhc2g7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2Nlc3NXc01lc3NhZ2UobWVzc2FnZSwgXCJydGNcIik7XG4gIH0pO1xuXG4gIHJ0Yy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ4eHh4eHgtICBEYXRhIENoYW5uZWwgRXJyb3I6XCIsIGVycm9yKTtcbiAgfSk7XG5cbiAgLy8gUnRjLm9ubWVzc2FnZSA9IChtc2cpID0+IHByb2Nlc3NXc01lc3NhZ2UobXNnLCBcInJ0Y1wiKTtcblxuICBydGMuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQEBAQEBAQEBSVEMgSVMgT1BFTiYmJiYmJiYmXCIpO1xuICAgIHJ0Yy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgd2ViUnRjQXJyYXkucHVzaChydGMpO1xuICAgIGNvbm5lY3Rpb25zW3RhcmdldF0uc2VuZENoYW5uZWwgPSBydGM7XG5cbiAgICB3aW5kb3cuc2VuZENoYW5uZWwgPSBzZW5kQ2hhbm5lbCA9IHtcbiAgICAgIHNlbmQ6ICgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkYXRhLnRhcmdldDtcbiAgICAgICAgZGF0YS5uYW1lID0gZGF0YS5uYW1lIHx8IHVzZXJuYW1lO1xuICAgICAgICBjb25zdCBtZXNzYWdlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHdlYlJ0Y0FycmF5Lm1hcCgoY2gpID0+XG4gICAgICAgICAgY2gucmVhZHlTdGF0ZSA9PT0gXCJvcGVuXCIgJiZcbiAgICAgICAgICAoIXRhcmdldCB8fCB0YXJnZXQgJiYgY2gudGFyZ2V0ID09PSB0YXJnZXQpICYmIGNoLnNlbmQobWVzc2FnZVN0cmluZylcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH0pO1xuXG4gIHJ0Yy5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwieHh4eHh4eHgtIFRoZSBEYXRhIENoYW5uZWwgaXMgQ2xvc2VkXCIpO1xuICB9KTtcblxuICByZXR1cm4gY29ubmVjdGlvbnNbdGFyZ2V0XTtcblxuICBmdW5jdGlvbiByZWNlaXZlQ2hhbm5lbENhbGxiYWNrKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJSZWNlaXZlIENoYW5uZWwgQ2FsbGJhY2tcIik7XG4gICAgY29uc3QgcnRjID0gZXZlbnQuY2hhbm5lbDtcbiAgICBydGMuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICBydGMuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIG9uUmVjZWl2ZUNoYW5uZWxDbG9zZWQpO1xuXG4gICAgcnRjLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcIm1lc3NhZ2VcIixcbiAgICAgIChtZXNzYWdlKSA9PiBwcm9jZXNzV3NNZXNzYWdlKG1lc3NhZ2UsIFwicnRjXCIpLFxuICAgICk7XG4gICAgd2ViUnRjQXJyYXkucHVzaChydGMpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25SZWNlaXZlQ2hhbm5lbENsb3NlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmUgY2hhbm5lbCBpcyBjbG9zZWRcIik7XG4gICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5jbG9zZSgpO1xuICAgIGNvbm5lY3Rpb25zW3RhcmdldF0gPSBudWxsO1xuICAgIGNvbnNvbGUubG9nKFwiQ2xvc2VkIHJlbW90ZSBwZWVyIGNvbm5lY3Rpb25cIik7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVOZWdvdGlhdGlvbk5lZWRlZEV2ZW50KCkge1xuICAgIGxvZyhcIioqKiBOZWdvdGlhdGlvbiBuZWVkZWRcIik7XG5cbiAgICB0cnkge1xuICAgICAgbG9nKFwiLS0tPiBDcmVhdGluZyBvZmZlclwiKTtcbiAgICAgIGNvbnN0IG9mZmVyID0gYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5jcmVhdGVPZmZlcigpO1xuXG4gICAgICAvLyBJZiB0aGUgY29ubmVjdGlvbiBoYXNuJ3QgeWV0IGFjaGlldmVkIHRoZSBcInN0YWJsZVwiIHN0YXRlLFxuICAgICAgLy8gcmV0dXJuIHRvIHRoZSBjYWxsZXIuIEFub3RoZXIgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnRcbiAgICAgIC8vIHdpbGwgYmUgZmlyZWQgd2hlbiB0aGUgc3RhdGUgc3RhYmlsaXplcy5cblxuICAgICAgaWYgKGNvbm5lY3Rpb25zW3RhcmdldF0uc2lnbmFsaW5nU3RhdGUgIT0gXCJzdGFibGVcIikge1xuICAgICAgICBsb2coXCIgICAgIC0tIFRoZSBjb25uZWN0aW9uIGlzbid0IHN0YWJsZSB5ZXQ7IHBvc3Rwb25pbmcuLi5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRXN0YWJsaXNoIHRoZSBvZmZlciBhcyB0aGUgbG9jYWwgcGVlcidzIGN1cnJlbnRcbiAgICAgIC8vIGRlc2NyaXB0aW9uLlxuXG4gICAgICBsb2coXCItLS0+IFNldHRpbmcgbG9jYWwgZGVzY3JpcHRpb24gdG8gdGhlIG9mZmVyXCIpO1xuICAgICAgYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcblxuICAgICAgLy8gU2VuZCB0aGUgb2ZmZXIgdG8gdGhlIHJlbW90ZSBwZWVyLlxuXG4gICAgICBsb2coXCItLS0+IFNlbmRpbmcgdGhlIG9mZmVyIHRvIHRoZSByZW1vdGUgcGVlclwiKTtcbiAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0YXJnZXQsXG4gICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICB0eXBlOiBcInZpZGVvLW9mZmVyXCIsXG4gICAgICAgIHNkcDogY29ubmVjdGlvbnNbdGFyZ2V0XS5sb2NhbERlc2NyaXB0aW9uLFxuICAgICAgfSkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgbG9nKFxuICAgICAgICBcIioqKiBUaGUgZm9sbG93aW5nIGVycm9yIG9jY3VycmVkIHdoaWxlIGhhbmRsaW5nIHRoZSBuZWdvdGlhdGlvbm5lZWRlZCBldmVudDpcIixcbiAgICAgICk7XG4gICAgICAvLyBSZXBvcnRFcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGxlZCBieSB0aGUgV2ViUlRDIGxheWVyIHdoZW4gZXZlbnRzIG9jY3VyIG9uIHRoZSBtZWRpYSB0cmFja3NcbiAgLy8gb24gb3VyIFdlYlJUQyBjYWxsLiBUaGlzIGluY2x1ZGVzIHdoZW4gc3RyZWFtcyBhcmUgYWRkZWQgdG8gYW5kXG4gIC8vIHJlbW92ZWQgZnJvbSB0aGUgY2FsbC5cbiAgLy9cbiAgLy8gdHJhY2sgZXZlbnRzIGluY2x1ZGUgdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4gIC8vXG4gIC8vIFJUQ1J0cFJlY2VpdmVyICAgICAgIHJlY2VpdmVyXG4gIC8vIE1lZGlhU3RyZWFtVHJhY2sgICAgIHRyYWNrXG4gIC8vIE1lZGlhU3RyZWFtW10gICAgICAgIHN0cmVhbXNcbiAgLy8gUlRDUnRwVHJhbnNjZWl2ZXIgICAgdHJhbnNjZWl2ZXJcbiAgLy9cbiAgLy8gSW4gb3VyIGNhc2UsIHdlJ3JlIGp1c3QgdGFraW5nIHRoZSBmaXJzdCBzdHJlYW0gZm91bmQgYW5kIGF0dGFjaGluZ1xuICAvLyBpdCB0byB0aGUgPHZpZGVvPiBlbGVtZW50IGZvciBpbmNvbWluZyBtZWRpYS5cblxuICBmdW5jdGlvbiBoYW5kbGVUcmFja0V2ZW50KGV2ZW50KSB7XG4gICAgbG9nKFwiKioqIFRyYWNrIGV2ZW50XCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVjZWl2ZWRfdmlkZW9cIikuc3JjT2JqZWN0ID0gZXZlbnQuc3RyZWFtc1swXTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hhbmd1cC1idXR0b25cIikuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEhhbmRsZXMgfGljZWNhbmRpZGF0ZXwgZXZlbnRzIGJ5IGZvcndhcmRpbmcgdGhlIHNwZWNpZmllZFxuICAvLyBJQ0UgY2FuZGlkYXRlIChjcmVhdGVkIGJ5IG91ciBsb2NhbCBJQ0UgYWdlbnQpIHRvIHRoZSBvdGhlclxuICAvLyBwZWVyIHRocm91Z2ggdGhlIHNpZ25hbGluZyBzZXJ2ZXIuXG5cbiAgZnVuY3Rpb24gaGFuZGxlSUNFQ2FuZGlkYXRlRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICBsb2coXCIqKiogT3V0Z29pbmcgSUNFIGNhbmRpZGF0ZTogXCIgKyBldmVudC5jYW5kaWRhdGUpO1xuXG4gICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdHlwZTogXCJuZXctaWNlLWNhbmRpZGF0ZVwiLFxuICAgICAgICB0YXJnZXQsXG4gICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgfGljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZXwgZXZlbnRzLiBUaGlzIHdpbGwgZGV0ZWN0XG4gIC8vIHdoZW4gdGhlIElDRSBjb25uZWN0aW9uIGlzIGNsb3NlZCwgZmFpbGVkLCBvciBkaXNjb25uZWN0ZWQuXG4gIC8vXG4gIC8vIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBJQ0UgYWdlbnQgY2hhbmdlcy5cblxuICBmdW5jdGlvbiBoYW5kbGVJQ0VDb25uZWN0aW9uU3RhdGVDaGFuZ2VFdmVudCgpIHtcbiAgICBsb2coXG4gICAgICBcIioqKiBJQ0UgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VkIHRvIFwiICtcbiAgICAgICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5pY2VDb25uZWN0aW9uU3RhdGUsXG4gICAgKTtcblxuICAgIHN3aXRjaCAoY29ubmVjdGlvbnNbdGFyZ2V0XS5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIGNhc2UgXCJjbG9zZWRcIjpcbiAgICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGNhc2UgXCJkaXNjb25uZWN0ZWRcIjpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHVwIGEgfHNpZ25hbGluZ3N0YXRlY2hhbmdlfCBldmVudCBoYW5kbGVyLiBUaGlzIHdpbGwgZGV0ZWN0IHdoZW5cbiAgLy8gdGhlIHNpZ25hbGluZyBjb25uZWN0aW9uIGlzIGNsb3NlZC5cbiAgLy9cbiAgLy8gTk9URTogVGhpcyB3aWxsIGFjdHVhbGx5IG1vdmUgdG8gdGhlIG5ldyBSVENQZWVyQ29ubmVjdGlvblN0YXRlIGVudW1cbiAgLy8gcmV0dXJuZWQgaW4gdGhlIHByb3BlcnR5IFJUQ1BlZXJDb25uZWN0aW9uLmNvbm5lY3Rpb25TdGF0ZSB3aGVuXG4gIC8vIGJyb3dzZXJzIGNhdGNoIHVwIHdpdGggdGhlIGxhdGVzdCB2ZXJzaW9uIG9mIHRoZSBzcGVjaWZpY2F0aW9uIVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNpZ25hbGluZ1N0YXRlQ2hhbmdlRXZlbnQoKSB7XG4gICAgbG9nKFxuICAgICAgXCIqKiogY29ubmVjdGlvbnNbdGFyZ2V0XS5zaWduYWxpbmdTdGF0ZSAgY2hhbmdlZCB0bzogXCIgK1xuICAgICAgICBjb25uZWN0aW9uc1t0YXJnZXRdLnNpZ25hbGluZ1N0YXRlLFxuICAgICk7XG4gICAgc3dpdGNoIChjb25uZWN0aW9uc1t0YXJnZXRdLnNpZ25hbGluZ1N0YXRlKSB7XG4gICAgICBjYXNlIFwiY2xvc2VkXCI6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhhbmRsZSB0aGUgfGljZWdhdGhlcmluZ3N0YXRlY2hhbmdlfCBldmVudC4gVGhpcyBsZXRzIHVzIGtub3cgd2hhdCB0aGVcbiAgLy8gSUNFIGVuZ2luZSBpcyBjdXJyZW50bHkgd29ya2luZyBvbjogXCJuZXdcIiBtZWFucyBubyBuZXR3b3JraW5nIGhhcyBoYXBwZW5lZFxuICAvLyB5ZXQsIFwiZ2F0aGVyaW5nXCIgbWVhbnMgdGhlIElDRSBlbmdpbmUgaXMgY3VycmVudGx5IGdhdGhlcmluZyBjYW5kaWRhdGVzLFxuICAvLyBhbmQgXCJjb21wbGV0ZVwiIG1lYW5zIGdhdGhlcmluZyBpcyBjb21wbGV0ZS4gTm90ZSB0aGF0IHRoZSBlbmdpbmUgY2FuXG4gIC8vIGFsdGVybmF0ZSBiZXR3ZWVuIFwiZ2F0aGVyaW5nXCIgYW5kIFwiY29tcGxldGVcIiByZXBlYXRlZGx5IGFzIG5lZWRzIGFuZFxuICAvLyBjaXJjdW1zdGFuY2VzIGNoYW5nZS5cbiAgLy9cbiAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZyB3aGVuIHRoaXMgaGFwcGVucywgYnV0IHdlIGxvZyBpdCB0byB0aGVcbiAgLy8gY29uc29sZSBzbyB5b3UgY2FuIHNlZSB3aGF0J3MgZ29pbmcgb24gd2hlbiBwbGF5aW5nIHdpdGggdGhlIHNhbXBsZS5cblxuICBmdW5jdGlvbiBoYW5kbGVJQ0VHYXRoZXJpbmdTdGF0ZUNoYW5nZUV2ZW50KCkge1xuICAgIGxvZyhcbiAgICAgIFwiKioqIGNvbm5lY3Rpb25zW3RhcmdldF0uaWNlR2F0aGVyaW5nU3RhdGUgY2hhbmdlZCB0bzogXCIgK1xuICAgICAgICBjb25uZWN0aW9uc1t0YXJnZXRdLmljZUdhdGhlcmluZ1N0YXRlLFxuICAgICk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTmV3SUNFQ2FuZGlkYXRlTWVzc2FnZShtZXNzYWdlLCB0YXJnZXQpIHtcbiAgbG9nKFxuICAgIFwiKioqIEFkZGluZyByZWNlaXZlZCBJQ0UgY2FuZGlkYXRlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UuY2FuZGlkYXRlKSxcbiAgKTtcbiAgY29uc3QgY2FuZGlkYXRlID0gbmV3IFJUQ0ljZUNhbmRpZGF0ZShtZXNzYWdlLmNhbmRpZGF0ZSk7XG5cbiAgLy8gTG9cbiAgY29uc29sZS5sb2coY29ubmVjdGlvbnNbdGFyZ2V0XSk7XG4gIGF3YWl0IGNvbm5lY3Rpb25zW3RhcmdldF0uYWRkSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNoYXRBbnN3ZXJNZXNzYWdlKG1lc3NhZ2UsIHRhcmdldCkge1xuICBsb2coXCIqKiogQ2FsbCByZWNpcGllbnQgaGFzIGFjY2VwdGVkIG91ciBjYWxsXCIpO1xuXG4gIC8vIENvbmZpZ3VyZSB0aGUgcmVtb3RlIGRlc2NyaXB0aW9uLCB3aGljaCBpcyB0aGUgU0RQIHBheWxvYWRcbiAgLy8gaW4gb3VyIFwidmlkZW8tYW5zd2VyXCIgbWVzc2FnZS5cblxuICBjb25zdCBkZXNjID0gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCk7XG5cbiAgYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ2hhdE9mZmVyKG1lc3NhZ2UsIHRhcmdldCkge1xuICBjb25uZWN0aW9uc1t0YXJnZXRdIHx8IGF3YWl0IGNyZWF0ZVBlZXJDb25uZWN0aW9uKHRhcmdldCk7XG5cbiAgLy8gSWYgd2UncmUgbm90IGFscmVhZHkgY29ubmVjdGVkLCBjcmVhdGUgYW4gUlRDUGVlckNvbm5lY3Rpb25cbiAgLy8gdG8gYmUgbGlua2VkIHRvIHRoZSBjYWxsZXIuXG5cbiAgLy8gbG9nKFwiUmVjZWl2ZWQgY2hhdCBvZmZlciBmcm9tIFwiICsgdGFyZ2V0KTtcbiAgLy8gZWQgdG8gc2V0IHRoZSByZW1vdGUgZGVzY3JpcHRpb24gdG8gdGhlIHJlY2VpdmVkIFNEUCBvZmZlclxuICAvLyBzbyB0aGF0IG91ciBsb2NhbCBXZWJSVEMgbGF5ZXIga25vd3MgaG93IHRvIHRhbGsgdG8gdGhlIGNhbGxlci5cblxuICBjb25zdCBkZXNjID0gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCk7XG5cbiAgLy8gSWYgdGhlIGNvbm5lY3Rpb24gaXNuJ3Qgc3RhYmxlIHlldCwgd2FpdCBmb3IgaXQuLi5cblxuICBpZiAoY29ubmVjdGlvbnNbdGFyZ2V0XS5zaWduYWxpbmdTdGF0ZSAhPSBcInN0YWJsZVwiKSB7XG4gICAgbG9nKFwiICAtIEJ1dCB0aGUgc2lnbmFsaW5nIHN0YXRlIGlzbid0IHN0YWJsZSwgc28gdHJpZ2dlcmluZyByb2xsYmFja1wiKTtcblxuICAgIC8vIFNldCB0aGUgbG9jYWwgYW5kIHJlbW92ZSBkZXNjcmlwdGlvbnMgZm9yIHJvbGxiYWNrOyBkb24ndCBwcm9jZWVkXG4gICAgLy8gdW50aWwgYm90aCByZXR1cm4uXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRMb2NhbERlc2NyaXB0aW9uKHsgdHlwZTogXCJyb2xsYmFja1wiIH0pLFxuICAgICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjKSxcbiAgICBdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2coXCIgIC0gU2V0dGluZyByZW1vdGUgZGVzY3JpcHRpb25cIik7XG4gIGF3YWl0IGNvbm5lY3Rpb25zW3RhcmdldF0uc2V0UmVtb3RlRGVzY3JpcHRpb24oZGVzYyk7XG5cbiAgLy8gR2V0IHRoZSB3ZWJjYW0gc3RyZWFtIGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBpdFxuXG4gIGxvZyhcIi0tLT4gQ3JlYXRpbmcgYW5kIHNlbmRpbmcgYW5zd2VyIHRvIGNhbGxlclwiKTtcblxuICBhd2FpdCBjb25uZWN0aW9uc1t0YXJnZXRdLnNldExvY2FsRGVzY3JpcHRpb24oXG4gICAgYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5jcmVhdGVBbnN3ZXIoKSxcbiAgKTtcblxuICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICB0YXJnZXQsXG4gICAgbmFtZTogdXNlcm5hbWUsXG4gICAgdHlwZTogXCJ2aWRlby1hbnN3ZXJcIixcbiAgICBzZHA6IGNvbm5lY3Rpb25zW3RhcmdldF0ubG9jYWxEZXNjcmlwdGlvbixcbiAgfSkpO1xufVxuXG4vLyBDYWxsZWQgYnkgdGhlIFdlYlJUQyBsYXllciB0byBsZXQgdXMga25vdyB3aGVuIGl0J3MgdGltZSB0b1xuLy8gYmVnaW4sIHJlc3VtZSwgb3IgcmVzdGFydCBJQ0UgbmVnb3RpYXRpb24uXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV3NNZXNzYWdlKGV2ZW50LCBzb3VyY2UpIHtcbiAgbGFzdFNlZW5Ob3cgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuXG4gIC8vIE15U2Vzc2lvbi5hZGRFdmVudChkYXRhKTtcblxuICBpZiAoXG4gICAgZGF0YS5uYW1lICYmIGRhdGEubmFtZSAhPT0gdXNlcm5hbWUgJiYgIWNvbm5lY3Rpb25zW2RhdGEubmFtZV1cbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNyZWF0ZVBlZXJDb25uZWN0aW9uKGRhdGEubmFtZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZTogZXJyb3IgfSk7XG4gICAgICBsb2dfZXJyb3IoXCJFcnJvciB3aXRoIHAycFwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zb2xlLmxvZyhzb3VyY2UsIGRhdGEubmFtZSk7XG5cbiAgaWYgKGRhdGEudHlwZSA9PT0gXCJuZXctaWNlLWNhbmRpZGF0ZVwiKSB7XG4gICAgYXdhaXQgaGFuZGxlTmV3SUNFQ2FuZGlkYXRlTWVzc2FnZShkYXRhLCBkYXRhLm5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhLnR5cGUgPT09IFwidmlkZW8tb2ZmZXJcIikge1xuICAgIGF3YWl0IGhhbmRsZUNoYXRPZmZlcihkYXRhLCBkYXRhLm5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhLnR5cGUgPT09IFwidmlkZW8tYW5zd2VyXCIpIHtcbiAgICBhd2FpdCBoYW5kbGVDaGF0QW5zd2VyTWVzc2FnZShkYXRhLCBkYXRhLm5hbWUpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNvdXJjZSA9PT0gd3MgJiYgZGF0YS5oYXNoQ29kZSkge1xuICAgIHdzTGFzdEhhc2hDb2RlID0gZGF0YS5oYXNoQ29kZTtcbiAgfVxuXG4gIGlmIChkYXRhLnBhdGNoICYmIHNvdXJjZSA9PT0gXCJ3c1wiIHx8IGRhdGEubmFtZSAhPT0gdXNlcm5hbWUpIHtcbiAgICBpZiAoZGF0YS5uZXdIYXNoID09PSBteVNlc3Npb24uaGFzaENvZGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLm9sZEhhc2ggPT09IG15U2Vzc2lvbi5oYXNoQ29kZSgpKSB7XG4gICAgICAvLyBDb25zb2xlLmxvZyhcIioqKioqKioqIEFQUExZIFBBVENIICoqKioqKlwiKTtcbiAgICAgIG15U2Vzc2lvbi5hcHBseVBhdGNoKGRhdGEpO1xuICAgICAgY2hDb2RlKFxuICAgICAgICBteVNlc3Npb24uc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5jb2RlLFxuICAgICAgICBteVNlc3Npb24uc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5pLFxuICAgICAgKTtcbiAgICAgIGlmIChzZW5kQ2hhbm5lbCkge1xuICAgICAgICBzZW5kQ2hhbm5lbC5zZW5kKHsgaGFzaENvZGU6IGRhdGEubmV3SGFzaCB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLm5ld0hhc2ggPT09IG15U2Vzc2lvbi5oYXNoQ29kZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuY29kZSAmJiBkYXRhLnRyYW5zcGlsZWQpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gbXlTZXNzaW9uLmNyZWF0ZVBhdGNoKGRhdGEpO1xuICAgICAgbXlTZXNzaW9uLmFwcGx5UGF0Y2gobWVzc2FnZURhdGEpO1xuICAgICAgY2hDb2RlKGRhdGEuY29kZSk7XG4gICAgICBpZiAoc2VuZENoYW5uZWwpIHtcbiAgICAgICAgc2VuZENoYW5uZWwuc2VuZCh7IGhhc2hDb2RlOiBtZXNzYWdlRGF0YS5uZXdIYXNoIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGRhdGEudGltZXN0YW1wKSB7XG4gICAgbGFzdFNlZW5Ob3cgPSBEYXRlLm5vdygpO1xuICAgIGxhc3RTZWVuVGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXA7XG4gIH1cblxuICBpZiAoZGF0YS5uYW1lID09PSB1c2VybmFtZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxhc3RTZWVuVGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXA7XG59XG5cbmZ1bmN0aW9uIHdhaXQoZGVsYXkpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSwgZGVsYXkpO1xuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUFBO0FBRUEsSUFBSTtBQUNKLElBQUk7QUFFSixJQUFJO0FBR0osSUFBSTtBQUNKLElBQUk7QUFFRyxJQUFNLGNBQWMsT0FBTyxNQUFNLGFBQWE7QUFDbkQsYUFBVyxZQUFhLE9BQU0sT0FBTywyQkFBa0I7QUFFdkQsU0FBTyxTQUFTLE1BQU07QUFBQTtBQVV4QixzQ0FBNkMsU0FBUztBQUNwRCxRQUFNLGtCQUFrQixTQUFTLGNBQWM7QUFFL0MsUUFBTSxFQUFFLGdCQUFnQixNQUFNLE9BQU87QUFDckMsUUFBTSxXQUFZLE9BQU0sT0FBTyxzREFBb0I7QUFDbkQsUUFBTSxlQUFlLENB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
