import "./chunk-XHYF4LCB.mjs";

// js/quickStart.mjs
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
var formatter;
var transform;
var esbuildEsmTransform;
var initSess;
var initSession = async (room, initData) => {
  initSess = initSess || (await import("./session-XKOGNBH4.mjs")).default;
  return initSess(room, initData);
};
async function startMonacoWithSession(session) {
  const monacoEditorDom = document.querySelector("#monacoEditor");
  const { startMonaco } = await import("./editor-6JSMK2AN.mjs");
  const throttle = (await import("./throttle-HOUORDS3.mjs")).default;
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
  formatter = formatter || (await import("./formatter-PRWJYYCN.mjs")).formatter;
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
        const { getHtmlAndCss } = await import("./renderToString-2INJV77K.mjs");
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
  const { renderPreviewWindow } = await import("./renderPreviewWindow-I5HPQ3DT.mjs");
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
      const throttle = (await import("./throttle-HOUORDS3.mjs")).default;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcXVpY2tTdGFydC5tanMiLCAiLi4vLi4vd3MubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcblxubGV0IGZvcm1hdHRlcjtcbmxldCB0cmFuc2Zvcm07XG5cbmxldCBlc2J1aWxkRXNtVHJhbnNmb3JtO1xuLy8gTGV0IGVzYnVpbGRUcmFuc2Zvcm07XG4vLyBsZXQgYmFiZWxUcmFuc2Zvcm07XG5sZXQgZ2V0SHRtbEFuZENzcztcbmxldCBpbml0U2VzcztcblxuZXhwb3J0IGNvbnN0IGluaXRTZXNzaW9uID0gYXN5bmMgKHJvb20sIGluaXREYXRhKSA9PiB7XG4gIGluaXRTZXNzID0gaW5pdFNlc3MgfHwgKGF3YWl0IGltcG9ydChcIi4vc2Vzc2lvbi50c3hcIikpLmRlZmF1bHQ7XG5cbiAgcmV0dXJuIGluaXRTZXNzKHJvb20sIGluaXREYXRhKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmV0dGllciA9IGFzeW5jIChjb2RlKSA9PiB7XG4gIGZvcm1hdHRlciA9IGZvcm1hdHRlciB8fCAoYXdhaXQgaW1wb3J0KFwiLi9mb3JtYXR0ZXIubWpzXCIpKS5mb3JtYXR0ZXI7XG4gIHJldHVybiBhd2FpdCBmb3JtYXR0ZXIoY29kZSk7XG59O1xuXG4vLyAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRNb25hY29XaXRoU2Vzc2lvbihzZXNzaW9uKSB7XG4gIGNvbnN0IG1vbmFjb0VkaXRvckRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9uYWNvRWRpdG9yXCIpO1xuXG4gIGNvbnN0IHsgc3RhcnRNb25hY28gfSA9IGF3YWl0IGltcG9ydChcIi4vZWRpdG9yLnRzXCIpO1xuICBjb25zdCB0aHJvdHRsZSA9IChhd2FpdCBpbXBvcnQoXCJsb2Rhc2gvdGhyb3R0bGVcIikpLmRlZmF1bHQ7XG4gIGNvbnN0IG9uY2hhbmdlQ29kZSA9IChldikgPT5cbiAgICBydW5uZXIoZWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWUoKSwgZXYuY2hhbmdlcywgc2Vzc2lvbiwgKytzZXNzaW9uLmkpO1xuICBjb25zdCB7IGVkaXRvciwgbW9uYWNvIH0gPSBhd2FpdCBzdGFydE1vbmFjbyhcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FueX0gY29kZVxuICAgICAqL1xuICAgIHtcbiAgICAgIGxhbmd1YWdlOiBcInR5cGVzY3JpcHRcIixcbiAgICAgIGNvbnRhaW5lcjogbW9uYWNvRWRpdG9yRG9tLFxuICAgICAgY29kZTogc2Vzc2lvbi5jb2RlLFxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgICAgICovXG4gICAgfSxcbiAgKTtcblxuICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQodGhyb3R0bGUob25jaGFuZ2VDb2RlLCAxMDApKTtcblxuICB3aW5kb3cubW9uYWNvID0gbW9uYWNvO1xuICBzZXNzaW9uLmVkaXRvciA9IGVkaXRvcjtcblxuICAvLyBtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyT25UeXBlRm9ybWF0dGluZ0VkaXRQcm92aWRlcihcInR5cGVzY3JpcHRcIiwge1xuICAvLyAgIGF1dG9Gb3JtYXRUcmlnZ2VyQ2hhcmFjdGVyczogW1wifVwiLCBcIntcIiwgXCIpXCIsIFwiKFwiLCBcIjtcIl0sXG5cbiAgLy8gICBhc3luYyBwcm92aWRlT25UeXBlRm9ybWF0dGluZ0VkaXRzKG1vZGVsKSB7XG4gIC8vICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgZm9ybWF0dGVyKG1vZGVsLmdldFZhbHVlKCkpO1xuXG4gIC8vICAgICByZXR1cm4gW1xuICAvLyAgICAgICB7XG4gIC8vICAgICAgICAgcmFuZ2U6IG1vZGVsLmdldEZ1bGxNb2RlbFJhbmdlKCksXG5cbiAgLy8gICAgICAgICB0ZXh0LFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgXTtcbiAgLy8gICB9LFxuICAvLyB9KTtcblxuICB3aW5kb3cuc2VzcyA9IHNlc3Npb247XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEVycm9ycyh7IG1vbmFjbywgZWRpdG9yIH0pIHtcbiAgaWYgKCFtb25hY28pIHtcbiAgICByZXR1cm4gW3sgbWVzc2FnZVRleHQ6IFwiRXJyb3Igd2l0aCB0aGUgZXJyb3IgY2hlY2tpbmcuIFRyeSB0byByZWxvYWQhXCIgfV07XG4gIH1cblxuICBjb25zdCBtb2RlbCA9IGVkaXRvci5nZXRNb2RlbCgpO1xuICBjb25zdCB3b3JrZXIgPSBhd2FpdCBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuZ2V0VHlwZVNjcmlwdFdvcmtlcigpO1xuICBjb25zdCBjbGllbnQgPSBhd2FpdCB3b3JrZXIobW9kZWwpO1xuXG4gIGNvbnN0IGZpbGVuYW1lID0gbW9kZWwudXJpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGRpYWcgPSBjbGllbnQuZ2V0U2VtYW50aWNEaWFnbm9zdGljcyhmaWxlbmFtZSk7XG4gIGNvbnN0IGNvbXAgPSBjbGllbnQuZ2V0Q29tcGlsZXJPcHRpb25zRGlhZ25vc3RpY3MoZmlsZW5hbWUpO1xuICBjb25zdCBzeW50YXggPSBjbGllbnQuZ2V0U3ludGFjdGljRGlhZ25vc3RpY3MoZmlsZW5hbWUpO1xuICBjb25zdCBmYXN0RXJyb3IgPSBhd2FpdCBQcm9taXNlLnJhY2UoW2RpYWcsIGNvbXAsIHN5bnRheF0pO1xuXG4gIC8vIE1vZGVsLmRpc3Bvc2UoKTtcbiAgY29uc29sZS5sb2coZmFzdEVycm9yKTtcbiAgcmV0dXJuIFtdO1xufVxuXG4vLyBMZXQgZ2V0SHRtbEFuZENzcztcblxuYXN5bmMgZnVuY3Rpb24gcnVubmVyKGMsIGNoYW5nZXMgPSBudWxsLCBzZXNzaW9uLCBjb3VudGVyKSB7XG4gIC8vIElmICghZXNidWlsZEVzbVRyYW5zZm9ybSB8fCAhZm9ybWF0dGVyICkgc2Vzc2lvbi5icm9hZCh7Li4uc2Vzc2lvbiwgY29kZTogYywgZXJyb3JUZXh0OiBcIlBSRVwiIH0pXG5cbiAgc2Vzc2lvbi5jaGFuZ2VzLnB1c2goY2hhbmdlcyk7XG4gIGZvcm1hdHRlciA9IGZvcm1hdHRlciB8fCAoYXdhaXQgaW1wb3J0KFwiLi9mb3JtYXR0ZXIubWpzXCIpKS5mb3JtYXR0ZXI7XG4gIGVzYnVpbGRFc21UcmFuc2Zvcm0gPSBlc2J1aWxkRXNtVHJhbnNmb3JtIHx8XG4gICAgKGF3YWl0IGltcG9ydChcIi4vZXNidWlsZEVzbS50c1wiKSkudHJhbnNmb3JtO1xuXG4gIHRyYW5zZm9ybSA9IGVzYnVpbGRFc21UcmFuc2Zvcm07XG5cbiAgc2Vzc2lvbi5lcnJvclRleHQgPSBcIlwiO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgY2QgPSBhd2FpdCBmb3JtYXR0ZXIoYyk7XG5cbiAgICBjb25zdCB0cmFuc3BpbGVkID0gYXdhaXQgdHJhbnNmb3JtKGNkKTtcblxuICAgIGxldCByZXN0YXJ0RXJyb3IgPSBmYWxzZTtcbiAgICAvLy8geWVsbG93XG4gICAgaWYgKHRyYW5zcGlsZWQubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGNvdW50ZXIgPCBzZXNzaW9uLmkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGdldEh0bWxBbmRDc3MgfSA9IGF3YWl0IGltcG9ydChcIi4vdmVuZG9yL3JlbmRlclRvU3RyaW5nLm1qc1wiKTtcblxuICAgICAgICBpZiAoY291bnRlciA8IHNlc3Npb24uaSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IEFwcCA9IGF3YWl0IGdldEFwcCh0cmFuc3BpbGVkKTtcbiAgICAgICAgY29uc3QgeyBodG1sLCBjc3MgfSA9IGdldEh0bWxBbmRDc3MoQXBwKTtcblxuICAgICAgICBzZXNzaW9uLnRyYW5zcGlsZWQgPSB0cmFuc3BpbGVkO1xuICAgICAgICBzZXNzaW9uLmh0bWwgPSBodG1sO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gYXdhaXQgZ2V0UmVhY3RDaGlsZCh0cmFuc3BpbGVkKTtcblxuICAgICAgICAvLyBTZXNzaW9uLmh0bWwgPSB6Ym9keS5pbm5lckhUTUw7XG5cbiAgICAgICAgc2Vzc2lvbi5zZXRDaGlsZCgoYykgPT4gWy4uLmMsIGNoaWxkcmVuXSk7XG4gICAgICAgIHNlc3Npb24uY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgcmVzdGFydEVycm9yID0gIWh0bWw7XG4gICAgICAgIHNlc3Npb24uY29kZSA9IGNkO1xuICAgICAgICBzZXNzaW9uLmNvZGVOb25Gb3JtYXR0ZWQgPSBjO1xuICAgICAgICAvLyBHZXRDc3MgPSBnZXRDc3MgfHwgKGF3YWl0IGltcG9ydChcIi4vdGVtcGxhdGVzLnRzXCIpKS5nZXRDc3M7XG4gICAgICAgIC8vIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyAgICAgc2Vzc2lvbi5odG1sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6Ym9keVwiKS5pbm5lckhUTUw7XG4gICAgICAgIC8vIGNvbnN0IGNzcyA9IGdldENzcyhzZXNzaW9uKTtcbiAgICAgICAgY29uc3QgY29kZSA9IGNkO1xuICAgICAgICBzZXNzaW9uLmNzcyA9IGNzcztcbiAgICAgICAgaWYgKHNlc3Npb24uaSAhPT0gY291bnRlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlc3Npb24uc2F2ZUNvZGUgJiZcbiAgICAgICAgICBhd2FpdCBzZXNzaW9uLnNhdmVDb2RlKHsgdHJhbnNwaWxlZCwgY29kZSwgaTogY291bnRlciwgY3NzLCBodG1sIH0pO1xuICAgICAgICAvLyB9LCAxMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFWENFUFRJT05cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHsgZTogZXJyb3IgfSk7XG4gICAgICAgIHJlc3RhcnRFcnJvciA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoeyByZXN0YXJ0RXJyb3IgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb24uaSA+IGNvdW50ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvciA9IGF3YWl0IGdldEVycm9ycyhzZXNzaW9uKTtcbiAgICBpZiAoc2Vzc2lvbi5pID4gY291bnRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZXN0YXJ0RXJyb3IpIHtcbiAgICAgIGVycm9yLnB1c2goXG4gICAgICAgIHsgbWVzc2FnZVRleHQ6IFwiRXJyb3Igd2hpbGUgc3RhcnRpbmcgdGhlIGFwcC4gQ2hlY2sgdGhlIGNvbnNvbGUhXCIgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZXJyOiBlcnJvciB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2Vzc2lvbi5lcnJvclRleHQgPSBlcnJvci5tZXNzYWdlO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0YXJ0RnJvbUNvZGUgPSBhc3luYyAoeyBjb2RlIH0pID0+IHtcbiAgY29uc3Qgc2Vzc2lvbiA9IHtcbiAgICBjb2RlLFxuICAgIGk6IDAsXG4gICAgY2hhbmdlczogW10sXG4gICAgc2F2ZUNvZGU6ICgpID0+IHt9LFxuICAgIHNldENoaWxkOiAoKSA9PiB7fSxcbiAgfTtcbiAgYXdhaXQgcnVubmVyKGNvZGUsIG51bGwsIHNlc3Npb24pO1xuICBhd2FpdCBxdWlja1N0YXJ0KHNlc3Npb24pO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHF1aWNrU3RhcnQoc2Vzc2lvbiwgcm9vbSwga2VlcEZ1bGxTY3JlZW4sIHNhdmVDb2RlKSB7XG4gIHNlc3Npb24uc2F2ZUNvZGUgPSBzYXZlQ29kZTtcbiAgLy8gU2Vzc2lvbi5jaGlsZHJlbiA9IGF3YWl0IGdldFJlYWN0Q2hpbGQoc2Vzc2lvbi50cmFuc3BpbGVkKTtcbiAgc2Vzc2lvbi5jaGlsZHJlbiA9IG51bGw7XG4gIGNvbnN0IHsgcmVuZGVyUHJldmlld1dpbmRvdyB9ID0gYXdhaXQgaW1wb3J0KFxuICAgIFwiLi9yZW5kZXJQcmV2aWV3V2luZG93LnRzeFwiXG4gICk7XG5cbiAgYXdhaXQgcmVuZGVyUHJldmlld1dpbmRvdyhzZXNzaW9uLCByb29tLCBrZWVwRnVsbFNjcmVlbik7XG5cbiAgLy8gSWYgKGxvY2FsU3RvcmFnZSAmJiBzZXNzaW9uKSB7XG4gIC8vICAgY29uc3QgeyBjb2RlLCB0cmFuc3BpbGVkLCBodG1sLCBjc3MsIGkgfSA9IHNlc3Npb247XG4gIC8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gIC8vICAgICBgc3RhdGUtJHtzZXNzaW9uLnJvb219YCxcbiAgLy8gICAgIEpTT04uc3RyaW5naWZ5KHsgY29kZSwgdHJhbnNwaWxlZCwgaHRtbCwgY3NzLCBpIH0pLFxuICAvLyAgICk7XG4gIC8vIH1cbiAgLy8gLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZSgpO1xuXG4gIGlmICgha2VlcEZ1bGxTY3JlZW4pIHtcbiAgICBhd2FpdCBzdGFydE1vbmFjb1dpdGhTZXNzaW9uKHNlc3Npb24pO1xuICB9XG5cbiAgc2Vzc2lvbi51cGRhdGUgPSAoYykgPT4gcnVubmVyKGMsIG51bGwsIHNlc3Npb24pO1xuICBydW5uZXIoc2Vzc2lvbi5jb2RlLCBudWxsLCBzZXNzaW9uLCAtMSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFJlYWN0Q2hpbGQodHJhbnNwaWxlZCwgbW9kZSA9IFwid2luZG93XCIpIHtcbiAgY29uc3QgY29kZVRvSHlkcmF0ZSA9IG1vZGUgPT09IFwid2luZG93XCJcbiAgICA/IHRyYW5zcGlsZWQucmVwbGFjZShcImJvZHl7XCIsIFwiI3pib2R5e1wiKVxuICAgIDogdHJhbnNwaWxlZDtcblxuICBjb25zdCBvYmplY3RVcmwgPSBjcmVhdGVKc0Jsb2IoXG4gICAgY29kZVRvSHlkcmF0ZSxcbiAgKTtcblxuICBjb25zdCBtb2QgPSAoYXdhaXQgaW1wb3J0KG9iamVjdFVybCkpO1xuICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG5cbiAgcmV0dXJuIGpzeChtb2QuZGVmYXVsdCk7XG59XG5cbi8vIEZ1bmN0aW9uIGNyZWF0ZVBhdGNoKG9sZENvZGUsIG5ld0NvZGUsIGNyZWF0ZURlbHRhKSB7XG4vLyAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjcmVhdGVEZWx0YShvbGRDb2RlLCBuZXdDb2RlKSk7XG4vLyB9XG5cbi8qKlxuICogQHBhcmFtIHtCbG9iUGFydH0gY29kZVxuICovXG5mdW5jdGlvbiBjcmVhdGVKc0Jsb2IoY29kZSkge1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvZGVdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiIH0pO1xuXG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBcHAodHJhbnNwaWxlZCwgbW9kZSA9IFwid2luZG93XCIpIHtcbiAgY29uc3QgY29kZVRvSHlkcmF0ZSA9IG1vZGUgPT09IFwid2luZG93XCJcbiAgICA/IHRyYW5zcGlsZWQucmVwbGFjZShcImJvZHl7XCIsIFwiI3pib2R5e1wiKVxuICAgIDogdHJhbnNwaWxlZDtcblxuICBjb25zdCBvYmplY3RVcmwgPSBjcmVhdGVKc0Jsb2IoXG4gICAgY29kZVRvSHlkcmF0ZSxcbiAgKTtcblxuICBjb25zdCBBcHAgPSAoYXdhaXQgaW1wb3J0KG9iamVjdFVybCkpLmRlZmF1bHQ7XG5cbiAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuXG4gIHJldHVybiBBcHA7XG59XG4iLCAiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbi8vIGltcG9ydCBpbml0U2Vzc2lvbiBmcm9tIFwiLi9kaXN0L3Nlc3Npb24ubWpzXCI7XG5cbmltcG9ydCB7IGluaXRTZXNzaW9uLCBxdWlja1N0YXJ0IH0gZnJvbSBcIi4vcXVpY2tTdGFydC5tanNcIjtcblxubGV0IGN1cnJlbnRXZWJTb2NrZXQgPSBudWxsO1xubGV0IHNlc3MgPSBmYWxzZTtcbi8vIExldCBzYW55aVByb2Nlc3MgPSBudWxsO1xuXG5jb25zdCB3ZWJSdGNBcnJheSA9IFtdO1xuY29uc3QgaG9zdG5hbWUgPSBcInNwaWtlLmxhbmRcIjtcbmNvbnN0IG1vZCA9IHt9O1xuXG5sZXQgd3NMYXN0SGFzaENvZGUgPSBcIlwiO1xubGV0IHdlYlJUQ0xhc3RTZWVuSGFzaENvZGUgPSBcIlwiO1xubGV0IHJvb21OYW1lID0gXCJcIjtcbmxldCB1c2VybmFtZSA9IFwiXCI7XG5sZXQgbGFzdFNlZW5UaW1lc3RhbXAgPSAwO1xubGV0IGxhc3RTZWVuTm93ID0gMDtcbmxldCB3cztcbmxldCBjaENvZGU7XG5sZXQgc3RhcnRUaW1lO1xubGV0IHJlam9pbmVkID0gZmFsc2U7XG5sZXQgc2VuZENoYW5uZWw7XG5sZXQgZGVsdGFTZW50ID0gXCJcIjtcbi8vIExldCBjcmVhdGVEZWx0YTtcbi8vIGxldCBhcHBseVBhdGNoO1xubGV0IG15U2Vzc2lvbiA9IG51bGw7XG5jb25zdCBtU1QgPSAoKSA9PiBteVNlc3Npb24uc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKTtcblxubGV0IGludGVydmFsSGFuZGxlciA9IG51bGw7XG5cbi8vIEZ1bmN0aW9uIGNyZWF0ZVBhdGNoKG9sZENvZGUsIG5ld0NvZGUpIHtcbi8vICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNyZWF0ZURlbHRhKG9sZENvZGUsIG5ld0NvZGUpKTtcbi8vIH1cblxuLy8gbGV0IGltcG9ydFRvb2xzID0gYXN5bmMgKCkgPT4ge1xuLy8gaWYgKHRvb2xzSW1wb3J0ZWQpIHJldHVybiB0b29sc0ltcG9ydGVkO1xuXG4vLyBpbXBvcnQoXCJ0ZXh0ZGlmZi1jcmVhdGVcIikudGhlbigobW9kKSA9PiBjcmVhdGVEZWx0YSA9IG1vZC5kZWZhdWx0KTtcbi8vIGltcG9ydChcInRleHRkaWZmLXBhdGNoXCIpLnRoZW4oKG1vZCkgPT4gYXBwbHlQYXRjaCA9IG1vZC5kZWZhdWx0KTtcblxuLy8gdG9vbHNJbXBvcnRlZCA9IHRydWU7XG4vLyByZXR1cm4gdG9vbHNJbXBvcnRlZDtcbi8vIH07XG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gIGlmIChEYXRlLm5vdygpIC0gbGFzdFNlZW5Ob3cgPiA0MF8wMDApIHtcbiAgICByZWpvaW4oKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vX25lZWRfdG9fcmVqb2luXCIpO1xuICB9XG59LCAzMF8wMDApO1xuXG5jaENvZGUgPSBnbG9iYWxUaGlzLmNoQ29kZSA9IGFzeW5jIChjb2RlLCBpKSA9PiB7XG4gIGlmICghY29kZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpIDwgd2luZG93LnNlc3MuaSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjb2RlID09PSB3aW5kb3cuc2Vzcy5jb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAod2luZG93LnNlc3MgJiYgd2luZG93LnNlc3MuZWRpdG9yKSB7XG4gICAgICB3aW5kb3cuc2Vzcy5lZGl0b3IuZ2V0TW9kZWwoKS5zZXRWYWx1ZShjb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnNlc3MudXBkYXRlKGNvZGUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKHsgZTogZXJyb3IgfSk7XG4gIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHJlam9pbigpIHtcbiAgaWYgKCFyZWpvaW5lZCkge1xuICAgIHJlam9pbmVkID0gdHJ1ZTtcbiAgICBjdXJyZW50V2ViU29ja2V0ID0gbnVsbDtcbiAgICAvLyBNeVNlc3Npb24uYWRkRXZlbnQoe1xuICAgIC8vICAgdHlwZTogXCJqb2luZWRcIlxuICAgIC8vIH0pO1xuXG4gICAgLy8gQ2xlYXIgdGhlIHJvc3Rlci5cbiAgICAvLyAgd2hpbGUgKHJvc3Rlci5maXJzdENoaWxkKSB7XG4gICAgLy8gICByb3N0ZXIucmVtb3ZlQ2hpbGQocm9zdGVyLmZpcnN0Q2hpbGQpO1xuICAgIC8vICAgIH1cblxuICAgIC8vIERvbid0IHRyeSB0byByZWNvbm5lY3QgdG9vIHJhcGlkbHkuXG4gICAgY29uc3QgdGltZVNpbmNlTGFzdEpvaW4gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIGlmICh0aW1lU2luY2VMYXN0Sm9pbiA8IDEwXzAwMCkge1xuICAgICAgLy8gTGVzcyB0aGFuIDEwIHNlY29uZHMgZWxhcHNlZCBzaW5jZSBsYXN0IGpvaW4uIFBhdXNlIGEgYml0LlxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTBfMDAwIC0gdGltZVNpbmNlTGFzdEpvaW4pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIE9LLCByZWNvbm5lY3Qgbm93IVxuICAgIGpvaW4oKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBicm9hZChcbiAgeyBjb2RlLCB0cmFuc3BpbGVkLCBodG1sLCBjc3MsIGkgfSxcbikge1xuICBpZiAoc2VuZENoYW5uZWwpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIG1vZC5pID0gaTtcbiAgICBpZiAobW9kLmxhc3RSdGNVcGRhdGUpIHtcbiAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBtb2QubGFzdFVwZGF0ZTtcbiAgICAgIGlmIChkaWZmIDwgMTAwMCkge1xuICAgICAgICBhd2FpdCB3YWl0KDIwMCAtIGRpZmYpO1xuICAgICAgICBpZiAoaSAhPT0gbW9kLmkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtb2QubGFzdFJ0Y1VwZGF0ZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgdXBkYXRlZFN0YXRlID0gbVNUKCkudG9KU09OKCk7XG5cbiAgICB1cGRhdGVkU3RhdGUuaHRtbCA9IGh0bWw7XG4gICAgdXBkYXRlZFN0YXRlLmNzcyA9IGNzcztcbiAgICB1cGRhdGVkU3RhdGUudHJhbnNwaWxlZCA9IHRyYW5zcGlsZWQ7XG4gICAgdXBkYXRlZFN0YXRlLmNvZGUgPSBjb2RlO1xuICAgIHVwZGF0ZWRTdGF0ZS5pID0gaTtcbiAgICBjb25zdCBtZXNzYWdlID0gd2ViUlRDTGFzdFNlZW5IYXNoQ29kZVxuICAgICAgPyBteVNlc3Npb24uY3JlYXRlUGF0Y2hGcm9tSGFzaENvZGUod2ViUlRDTGFzdFNlZW5IYXNoQ29kZSwgdXBkYXRlZFN0YXRlKVxuICAgICAgOiBteVNlc3Npb24uY3JlYXRlUGF0Y2godXBkYXRlZFN0YXRlKTtcbiAgICBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLnBhdGNoICE9PSBcIlwiKSB7XG4gICAgICBzZW5kQ2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjdXJyZW50V2ViU29ja2V0KSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBtb2QuaSA9IGk7XG4gICAgaWYgKG1vZC5sYXN0VXBkYXRlKSB7XG4gICAgICBjb25zdCBkaWZmID0gbm93IC0gbW9kLmxhc3RVcGRhdGU7XG4gICAgICBpZiAoZGlmZiA8IDEwMDApIHtcbiAgICAgICAgYXdhaXQgd2FpdCgxMDAwIC0gZGlmZik7XG4gICAgICAgIGlmIChpICE9PSBtb2QuaSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1vZC5sYXN0VXBkYXRlID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB1cGRhdGVkU3RhdGUgPSBtU1QoKS50b0pTT04oKTtcblxuICAgIHVwZGF0ZWRTdGF0ZS5odG1sID0gaHRtbDtcbiAgICB1cGRhdGVkU3RhdGUuY3NzID0gY3NzO1xuICAgIHVwZGF0ZWRTdGF0ZS50cmFuc3BpbGVkID0gdHJhbnNwaWxlZDtcbiAgICB1cGRhdGVkU3RhdGUuY29kZSA9IGNvZGU7XG4gICAgdXBkYXRlZFN0YXRlLmkgPSBpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB3c0xhc3RIYXNoQ29kZVxuICAgICAgPyBteVNlc3Npb24uY3JlYXRlUGF0Y2hGcm9tSGFzaENvZGUod3NMYXN0SGFzaENvZGUsIHVwZGF0ZWRTdGF0ZSlcbiAgICAgIDogbXlTZXNzaW9uLmNyZWF0ZVBhdGNoKHVwZGF0ZWRTdGF0ZSk7XG5cbiAgICAvLyBDb25zb2xlLmxvZyhcIkFQUExZXCIpO1xuICAgIC8vIG15U2Vzc2lvbi5hcHBseVBhdGNoKG1lc3NhZ2UpO1xuICAgIC8vIGNvbnNvbGUubG9nKG15U2Vzc2lvbi5oYXNoQ29kZSgpKTtcblxuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh7IC4uLm1lc3NhZ2UsIG5hbWU6IHVzZXJuYW1lIH0pO1xuICAgIGlmIChtZXNzYWdlLnBhdGNoICE9PSBcIlwiKSB7XG4gICAgICBjdXJyZW50V2ViU29ja2V0LnNlbmQobWVzc2FnZVN0cmluZyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBqb2luID0gYXN5bmMgKHJvb20sIHVzZXIsIGRlbHRhKSA9PiB7XG4gIHJvb21OYW1lID0gcm9vbU5hbWUgfHwgcm9vbSB8fCBcImNvZGUtbWFpblwiO1xuICB3aW5kb3cucm9vbSA9IHJvb207XG4gIGlmICh1c2VyKSB7XG4gICAgdXNlcm5hbWUgPSB1c2VyO1xuICB9XG5cbiAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL3NwaWtlLmxhbmQvYXBpL3Jvb20vJHtyb29tTmFtZX0vc2Vzc2lvbmAsXG4gICk7XG4gIGNvbnN0IHN0YXRlID0gYXdhaXQgcmVzcC5qc29uKCk7XG5cbiAgbXlTZXNzaW9uID0gbXlTZXNzaW9uIHx8IGF3YWl0IGluaXRTZXNzaW9uKHJvb21OYW1lLCB7XG4gICAgbmFtZTogdXNlcm5hbWUsXG4gICAgcm9vbTogcm9vbU5hbWUsXG4gICAgc3RhdGUsXG4gICAgZXZlbnRzOiBbXSxcbiAgfSk7XG5cbiAgd2luZG93Lm15U2Vzc2lvbiA9IG15U2Vzc2lvbjtcbiAgaWYgKCFkZWx0YSkge1xuICAgIGlmICghd2luZG93LnNlc3MpIHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgIC4uLm1TVCgpLnRvSlNPTigpLFxuICAgICAgICBzZXRDaGlsZDogKCkgPT4ge30sXG4gICAgICAgIGNoYW5nZXM6IFtdLFxuXG4gICAgICAgIGNoaWxkcmVuOiBbbnVsbF0sXG4gICAgICAgIGVycm9yVGV4dDogXCJcIixcbiAgICAgIH07XG4gICAgICBjb25zdCB0aHJvdHRsZSA9IChhd2FpdCBpbXBvcnQoXCJsb2Rhc2gvdGhyb3R0bGVcIikpLmRlZmF1bHQ7XG5cbiAgICAgIGNvbnN0IHN0YXlGdWxsc2NyZWVuID0gbG9jYXRpb24ucGF0aG5hbWUuZW5kc1dpdGgoXCJwdWJsaWNcIik7XG4gICAgICBxdWlja1N0YXJ0KFxuICAgICAgICBzZXNzaW9uLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgc3RheUZ1bGxzY3JlZW4sXG4gICAgICAgIHRocm90dGxlKGJyb2FkLCAxMDApLFxuICAgICAgKTtcbiAgICAgIHdpbmRvdy5zZXNzID0gc2Vzc2lvbjtcbiAgICB9XG4gIH1cblxuICBpZiAoc2Vzcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNlc3MgPSB0cnVlO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNlc3MgPSBmYWxzZTtcbiAgfSwgMTBfMDAwKTtcblxuICB3cyA9IG5ldyBXZWJTb2NrZXQoXG4gICAgXCJ3c3M6Ly9cIiArIGhvc3RuYW1lICsgXCIvYXBpL3Jvb20vXCIgKyByb29tTmFtZSArIFwiL3dlYnNvY2tldFwiLFxuICApO1xuICByZWpvaW5lZCA9IGZhbHNlO1xuICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsICgpID0+IHtcbiAgICBpZiAoZGVsdGEpIHtcbiAgICAgIGlmIChkZWx0YSAhPT0gZGVsdGFTZW50KSB7XG4gICAgICAgIGRlbHRhU2VudCA9IGRlbHRhO1xuICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICB0eXBlOiBcImRlbHRhXCIsXG4gICAgICAgICAgZGVsdGEsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGludGVydmFsSGFuZGxlcikge1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcnZhbEhhbmRsZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0U2Vlbk5vdztcblxuICAgICAgICBpZiAobm93IC0gbGFzdFNlZW5Ob3cgPiAzMF8wMDApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgd3Muc2VuZChcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHRpbWU6IGxhc3RTZWVuVGltZXN0YW1wICsgZGlmZixcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmVqb2luKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAzMF8wMDApO1xuICAgIH1cblxuICAgIGN1cnJlbnRXZWJTb2NrZXQgPSB3cztcblxuICAgIGdsb2JhbFRoaXMuYnJvYWQgPSBicm9hZDtcbiAgICBnbG9iYWxUaGlzLmNoQ29kZSA9IGNoQ29kZTtcblxuICAgIC8vIFNlbmQgdXNlciBpbmZvIG1lc3NhZ2UuXG4gICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7IG5hbWU6IHVzZXJuYW1lIH0pKTtcbiAgfSk7XG5cbiAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IHByb2Nlc3NXc01lc3NhZ2UobWVzc2FnZSwgXCJ3c1wiKSk7XG5cbiAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IGNsb3NlZCwgcmVjb25uZWN0aW5nOlwiLCBldmVudC5jb2RlLCBldmVudC5yZWFzb24pO1xuICAgIHJlam9pbigpO1xuICB9KTtcbiAgd3MuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IGVycm9yLCByZWNvbm5lY3Rpbmc6XCIsIGV2ZW50KTtcbiAgICByZWpvaW4oKTtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGUgdGhlIFJUQ1BlZXJDb25uZWN0aW9uIHdoaWNoIGtub3dzIGhvdyB0byB0YWxrIHRvIG91clxuLy8gc2VsZWN0ZWQgU1RVTi9UVVJOIHNlcnZlciBhbmQgdGhlbiB1c2VzIGdldFVzZXJNZWRpYSgpIHRvIGZpbmRcbi8vIG91ciBjYW1lcmEgYW5kIG1pY3JvcGhvbmUgYW5kIGFkZCB0aGF0IHN0cmVhbSB0byB0aGUgY29ubmVjdGlvbiBmb3Jcbi8vIHVzZSBpbiBvdXIgdmlkZW8gY2FsbC4gVGhlbiB3ZSBjb25maWd1cmUgZXZlbnQgaGFuZGxlcnMgdG8gZ2V0XG4vLyBuZWVkZWQgbm90aWZpY2F0aW9ucyBvbiB0aGUgY2FsbC5cblxubGV0IG15SG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5pZiAoIW15SG9zdG5hbWUpIHtcbiAgbXlIb3N0bmFtZSA9IFwibG9jYWxob3N0XCI7XG59XG5cbmxvZyhcIkhvc3RuYW1lOiBcIiArIG15SG9zdG5hbWUpO1xuXG4vLyBXZWJTb2NrZXQgY2hhdC9zaWduYWxpbmcgY2hhbm5lbCB2YXJpYWJsZXMuXG5cbi8vIFRoZSBtZWRpYSBjb25zdHJhaW50cyBvYmplY3QgZGVzY3JpYmVzIHdoYXQgc29ydCBvZiBzdHJlYW0gd2Ugd2FudFxuLy8gdG8gcmVxdWVzdCBmcm9tIHRoZSBsb2NhbCBBL1YgaGFyZHdhcmUgKHR5cGljYWxseSBhIHdlYmNhbSBhbmRcbi8vIG1pY3JvcGhvbmUpLiBIZXJlLCB3ZSBzcGVjaWZ5IG9ubHkgdGhhdCB3ZSB3YW50IGJvdGggYXVkaW8gYW5kXG4vLyB2aWRlbzsgaG93ZXZlciwgeW91IGNhbiBiZSBtb3JlIHNwZWNpZmljLiBJdCdzIHBvc3NpYmxlIHRvIHN0YXRlXG4vLyB0aGF0IHlvdSB3b3VsZCBwcmVmZXIgKG9yIHJlcXVpcmUpIHNwZWNpZmljIHJlc29sdXRpb25zIG9mIHZpZGVvLFxuLy8gd2hldGhlciB0byBwcmVmZXIgdGhlIHVzZXItZmFjaW5nIG9yIHJlYXItZmFjaW5nIGNhbWVyYSAoaWYgYXZhaWxhYmxlKSxcbi8vIGFuZCBzbyBvbi5cbi8vXG4vLyBTZWUgYWxzbzpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NZWRpYVN0cmVhbUNvbnN0cmFpbnRzXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTWVkaWFEZXZpY2VzL2dldFVzZXJNZWRpYVxuLy9cblxuY29uc3QgY29ubmVjdGlvbnMgPSB7fTsgLy8gVG8gc3QvIFJUQ1BlZXJDb25uZWN0aW9uXG4vLyB2YXIgdHJhbnNjZWl2ZXIgPSBudWxsOyAgICAgICAgIC8vIFJUQ1J0cFRyYW5zY2VpdmVyXG4vLyB2YXIgd2ViY2FtU3RyZWFtID0gbnVsbDsgICAgICAgIC8vIE1lZGlhU3RyZWFtIGZyb20gd2ViY2FtXG5cbi8vIE91dHB1dCBsb2dnaW5nIGluZm9ybWF0aW9uIHRvIGNvbnNvbGUuXG5nbG9iYWxUaGlzLmNvbm5lY3Rpb25zID0gY29ubmVjdGlvbnM7XG5mdW5jdGlvbiBsb2codGV4dCkge1xuICBjb25zdCB0aW1lID0gbmV3IERhdGUoKTtcblxuICBjb25zb2xlLmxvZyhcIltcIiArIHRpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKCkgKyBcIl0gXCIgKyB0ZXh0KTtcbn1cblxuLy8gT3V0cHV0IGFuIGVycm9yIG1lc3NhZ2UgdG8gY29uc29sZS5cblxuZnVuY3Rpb24gbG9nX2Vycm9yKHRleHQpIHtcbiAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc29sZS50cmFjZShcIltcIiArIHRpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKCkgKyBcIl0gXCIgKyB0ZXh0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUGVlckNvbm5lY3Rpb24odGFyZ2V0KSB7XG4gIGxvZyhcIlNldHRpbmcgdXAgYSBjb25uZWN0aW9uLi4uXCIpO1xuXG4gIC8vIENyZWF0ZSBhbiBSVENQZWVyQ29ubmVjdGlvbiB3aGljaCBrbm93cyB0byB1c2Ugb3VyIGNob3NlblxuICAvLyBTVFVOIHNlcnZlci5cblxuICBjb25zdCByY3BPcHRpb25zID0ge1xuICAgIGljZVNlcnZlcnM6IFtcInN0dW4zLmwuZ29vZ2xlLmNvbToxOTMwMlwiXS5tYXAoKHVybCkgPT4gKHtcbiAgICAgIHVybHM6IGBzdHVuOiR7dXJsfWAsXG4gICAgfSkpLFxuICB9O1xuXG4gIHJjcE9wdGlvbnMuaWNlU2VydmVycyA9IFt7IHVybHM6IFwic3R1bjpzdHVuLnN0dW5wcm90b2NvbC5vcmc6MzQ3OFwiIH0sIHtcbiAgICB1cmxzOiBcInN0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDJcIixcbiAgfV07XG5cbiAgY29ubmVjdGlvbnNbdGFyZ2V0XSA9IGNvbm5lY3Rpb25zW3RhcmdldF0gfHwgbmV3IFJUQ1BlZXJDb25uZWN0aW9uKFxuICAgIHJjcE9wdGlvbnMsXG4gICk7XG5cbiAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgSUNFIG5lZ290aWF0aW9uIHByb2Nlc3MuXG5cbiAgY29ubmVjdGlvbnNbdGFyZ2V0XS5vbmljZWNhbmRpZGF0ZSA9IGhhbmRsZUlDRUNhbmRpZGF0ZUV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID1cbiAgICBoYW5kbGVJQ0VDb25uZWN0aW9uU3RhdGVDaGFuZ2VFdmVudDtcbiAgY29ubmVjdGlvbnNbdGFyZ2V0XS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID1cbiAgICBoYW5kbGVJQ0VHYXRoZXJpbmdTdGF0ZUNoYW5nZUV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBoYW5kbGVTaWduYWxpbmdTdGF0ZUNoYW5nZUV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBoYW5kbGVOZWdvdGlhdGlvbk5lZWRlZEV2ZW50O1xuICBjb25uZWN0aW9uc1t0YXJnZXRdLm9udHJhY2sgPSBoYW5kbGVUcmFja0V2ZW50O1xuXG4gIGNvbm5lY3Rpb25zW3RhcmdldF0uYWRkRXZlbnRMaXN0ZW5lcihcImRhdGFjaGFubmVsXCIsIHJlY2VpdmVDaGFubmVsQ2FsbGJhY2spO1xuXG4gIGNvbnN0IGRhdGFDaGFubmVsT3B0aW9ucyA9IHtcbiAgICBvcmRlcmVkOiB0cnVlLCAvLyBEbyBub3QgZ3VhcmFudGVlIG9yZGVyXG4gICAgcmVsaWFibGU6IHRydWUsXG4gICAgbWF4UGFja2V0TGlmZVRpbWU6IDMwMDAsIC8vIEluIG1pbGxpc2Vjb25kc1xuICB9O1xuXG4gIGNvbnN0IHJ0YyA9IGNvbm5lY3Rpb25zW3RhcmdldF0uY3JlYXRlRGF0YUNoYW5uZWwoXG4gICAgdGFyZ2V0LFxuICAgIGRhdGFDaGFubmVsT3B0aW9ucyxcbiAgKTtcblxuICBydGMuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblxuICBydGMuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKioqUlRDKioqXCIsIHsgbXNnOiBtZXNzYWdlIH0pO1xuXG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmhhc2hDb2RlKSB7XG4gICAgICB3ZWJSVENMYXN0U2Vlbkhhc2hDb2RlID0gZGF0YS5oYXNoQ29kZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiBkYXRhLm5ld0hhc2gpIHtcbiAgICAgIHdlYlJUQ0xhc3RTZWVuSGFzaENvZGUgPSBkYXRhLm5ld0hhc2g7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2Nlc3NXc01lc3NhZ2UobWVzc2FnZSwgXCJydGNcIik7XG4gIH0pO1xuXG4gIHJ0Yy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ4eHh4eHgtICBEYXRhIENoYW5uZWwgRXJyb3I6XCIsIGVycm9yKTtcbiAgfSk7XG5cbiAgLy8gUnRjLm9ubWVzc2FnZSA9IChtc2cpID0+IHByb2Nlc3NXc01lc3NhZ2UobXNnLCBcInJ0Y1wiKTtcblxuICBydGMuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQEBAQEBAQEBSVEMgSVMgT1BFTiYmJiYmJiYmXCIpO1xuICAgIHJ0Yy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgd2ViUnRjQXJyYXkucHVzaChydGMpO1xuICAgIGNvbm5lY3Rpb25zW3RhcmdldF0uc2VuZENoYW5uZWwgPSBydGM7XG5cbiAgICB3aW5kb3cuc2VuZENoYW5uZWwgPSBzZW5kQ2hhbm5lbCA9IHtcbiAgICAgIHNlbmQ6ICgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBkYXRhLnRhcmdldDtcbiAgICAgICAgZGF0YS5uYW1lID0gZGF0YS5uYW1lIHx8IHVzZXJuYW1lO1xuICAgICAgICBjb25zdCBtZXNzYWdlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHdlYlJ0Y0FycmF5Lm1hcCgoY2gpID0+XG4gICAgICAgICAgY2gucmVhZHlTdGF0ZSA9PT0gXCJvcGVuXCIgJiZcbiAgICAgICAgICAoIXRhcmdldCB8fCB0YXJnZXQgJiYgY2gudGFyZ2V0ID09PSB0YXJnZXQpICYmIGNoLnNlbmQobWVzc2FnZVN0cmluZylcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH0pO1xuXG4gIHJ0Yy5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwieHh4eHh4eHgtIFRoZSBEYXRhIENoYW5uZWwgaXMgQ2xvc2VkXCIpO1xuICB9KTtcblxuICByZXR1cm4gY29ubmVjdGlvbnNbdGFyZ2V0XTtcblxuICBmdW5jdGlvbiByZWNlaXZlQ2hhbm5lbENhbGxiYWNrKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJSZWNlaXZlIENoYW5uZWwgQ2FsbGJhY2tcIik7XG4gICAgY29uc3QgcnRjID0gZXZlbnQuY2hhbm5lbDtcbiAgICBydGMuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICBydGMuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIG9uUmVjZWl2ZUNoYW5uZWxDbG9zZWQpO1xuXG4gICAgcnRjLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcIm1lc3NhZ2VcIixcbiAgICAgIChtZXNzYWdlKSA9PiBwcm9jZXNzV3NNZXNzYWdlKG1lc3NhZ2UsIFwicnRjXCIpLFxuICAgICk7XG4gICAgd2ViUnRjQXJyYXkucHVzaChydGMpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25SZWNlaXZlQ2hhbm5lbENsb3NlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmUgY2hhbm5lbCBpcyBjbG9zZWRcIik7XG4gICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5jbG9zZSgpO1xuICAgIGNvbm5lY3Rpb25zW3RhcmdldF0gPSBudWxsO1xuICAgIGNvbnNvbGUubG9nKFwiQ2xvc2VkIHJlbW90ZSBwZWVyIGNvbm5lY3Rpb25cIik7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVOZWdvdGlhdGlvbk5lZWRlZEV2ZW50KCkge1xuICAgIGxvZyhcIioqKiBOZWdvdGlhdGlvbiBuZWVkZWRcIik7XG5cbiAgICB0cnkge1xuICAgICAgbG9nKFwiLS0tPiBDcmVhdGluZyBvZmZlclwiKTtcbiAgICAgIGNvbnN0IG9mZmVyID0gYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5jcmVhdGVPZmZlcigpO1xuXG4gICAgICAvLyBJZiB0aGUgY29ubmVjdGlvbiBoYXNuJ3QgeWV0IGFjaGlldmVkIHRoZSBcInN0YWJsZVwiIHN0YXRlLFxuICAgICAgLy8gcmV0dXJuIHRvIHRoZSBjYWxsZXIuIEFub3RoZXIgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnRcbiAgICAgIC8vIHdpbGwgYmUgZmlyZWQgd2hlbiB0aGUgc3RhdGUgc3RhYmlsaXplcy5cblxuICAgICAgaWYgKGNvbm5lY3Rpb25zW3RhcmdldF0uc2lnbmFsaW5nU3RhdGUgIT0gXCJzdGFibGVcIikge1xuICAgICAgICBsb2coXCIgICAgIC0tIFRoZSBjb25uZWN0aW9uIGlzbid0IHN0YWJsZSB5ZXQ7IHBvc3Rwb25pbmcuLi5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRXN0YWJsaXNoIHRoZSBvZmZlciBhcyB0aGUgbG9jYWwgcGVlcidzIGN1cnJlbnRcbiAgICAgIC8vIGRlc2NyaXB0aW9uLlxuXG4gICAgICBsb2coXCItLS0+IFNldHRpbmcgbG9jYWwgZGVzY3JpcHRpb24gdG8gdGhlIG9mZmVyXCIpO1xuICAgICAgYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcblxuICAgICAgLy8gU2VuZCB0aGUgb2ZmZXIgdG8gdGhlIHJlbW90ZSBwZWVyLlxuXG4gICAgICBsb2coXCItLS0+IFNlbmRpbmcgdGhlIG9mZmVyIHRvIHRoZSByZW1vdGUgcGVlclwiKTtcbiAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0YXJnZXQsXG4gICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICB0eXBlOiBcInZpZGVvLW9mZmVyXCIsXG4gICAgICAgIHNkcDogY29ubmVjdGlvbnNbdGFyZ2V0XS5sb2NhbERlc2NyaXB0aW9uLFxuICAgICAgfSkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgbG9nKFxuICAgICAgICBcIioqKiBUaGUgZm9sbG93aW5nIGVycm9yIG9jY3VycmVkIHdoaWxlIGhhbmRsaW5nIHRoZSBuZWdvdGlhdGlvbm5lZWRlZCBldmVudDpcIixcbiAgICAgICk7XG4gICAgICAvLyBSZXBvcnRFcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGxlZCBieSB0aGUgV2ViUlRDIGxheWVyIHdoZW4gZXZlbnRzIG9jY3VyIG9uIHRoZSBtZWRpYSB0cmFja3NcbiAgLy8gb24gb3VyIFdlYlJUQyBjYWxsLiBUaGlzIGluY2x1ZGVzIHdoZW4gc3RyZWFtcyBhcmUgYWRkZWQgdG8gYW5kXG4gIC8vIHJlbW92ZWQgZnJvbSB0aGUgY2FsbC5cbiAgLy9cbiAgLy8gdHJhY2sgZXZlbnRzIGluY2x1ZGUgdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4gIC8vXG4gIC8vIFJUQ1J0cFJlY2VpdmVyICAgICAgIHJlY2VpdmVyXG4gIC8vIE1lZGlhU3RyZWFtVHJhY2sgICAgIHRyYWNrXG4gIC8vIE1lZGlhU3RyZWFtW10gICAgICAgIHN0cmVhbXNcbiAgLy8gUlRDUnRwVHJhbnNjZWl2ZXIgICAgdHJhbnNjZWl2ZXJcbiAgLy9cbiAgLy8gSW4gb3VyIGNhc2UsIHdlJ3JlIGp1c3QgdGFraW5nIHRoZSBmaXJzdCBzdHJlYW0gZm91bmQgYW5kIGF0dGFjaGluZ1xuICAvLyBpdCB0byB0aGUgPHZpZGVvPiBlbGVtZW50IGZvciBpbmNvbWluZyBtZWRpYS5cblxuICBmdW5jdGlvbiBoYW5kbGVUcmFja0V2ZW50KGV2ZW50KSB7XG4gICAgbG9nKFwiKioqIFRyYWNrIGV2ZW50XCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVjZWl2ZWRfdmlkZW9cIikuc3JjT2JqZWN0ID0gZXZlbnQuc3RyZWFtc1swXTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hhbmd1cC1idXR0b25cIikuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEhhbmRsZXMgfGljZWNhbmRpZGF0ZXwgZXZlbnRzIGJ5IGZvcndhcmRpbmcgdGhlIHNwZWNpZmllZFxuICAvLyBJQ0UgY2FuZGlkYXRlIChjcmVhdGVkIGJ5IG91ciBsb2NhbCBJQ0UgYWdlbnQpIHRvIHRoZSBvdGhlclxuICAvLyBwZWVyIHRocm91Z2ggdGhlIHNpZ25hbGluZyBzZXJ2ZXIuXG5cbiAgZnVuY3Rpb24gaGFuZGxlSUNFQ2FuZGlkYXRlRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICBsb2coXCIqKiogT3V0Z29pbmcgSUNFIGNhbmRpZGF0ZTogXCIgKyBldmVudC5jYW5kaWRhdGUpO1xuXG4gICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdHlwZTogXCJuZXctaWNlLWNhbmRpZGF0ZVwiLFxuICAgICAgICB0YXJnZXQsXG4gICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgfGljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZXwgZXZlbnRzLiBUaGlzIHdpbGwgZGV0ZWN0XG4gIC8vIHdoZW4gdGhlIElDRSBjb25uZWN0aW9uIGlzIGNsb3NlZCwgZmFpbGVkLCBvciBkaXNjb25uZWN0ZWQuXG4gIC8vXG4gIC8vIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBJQ0UgYWdlbnQgY2hhbmdlcy5cblxuICBmdW5jdGlvbiBoYW5kbGVJQ0VDb25uZWN0aW9uU3RhdGVDaGFuZ2VFdmVudCgpIHtcbiAgICBsb2coXG4gICAgICBcIioqKiBJQ0UgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VkIHRvIFwiICtcbiAgICAgICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5pY2VDb25uZWN0aW9uU3RhdGUsXG4gICAgKTtcblxuICAgIHN3aXRjaCAoY29ubmVjdGlvbnNbdGFyZ2V0XS5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIGNhc2UgXCJjbG9zZWRcIjpcbiAgICAgIGNhc2UgXCJmYWlsZWRcIjpcbiAgICAgIGNhc2UgXCJkaXNjb25uZWN0ZWRcIjpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHVwIGEgfHNpZ25hbGluZ3N0YXRlY2hhbmdlfCBldmVudCBoYW5kbGVyLiBUaGlzIHdpbGwgZGV0ZWN0IHdoZW5cbiAgLy8gdGhlIHNpZ25hbGluZyBjb25uZWN0aW9uIGlzIGNsb3NlZC5cbiAgLy9cbiAgLy8gTk9URTogVGhpcyB3aWxsIGFjdHVhbGx5IG1vdmUgdG8gdGhlIG5ldyBSVENQZWVyQ29ubmVjdGlvblN0YXRlIGVudW1cbiAgLy8gcmV0dXJuZWQgaW4gdGhlIHByb3BlcnR5IFJUQ1BlZXJDb25uZWN0aW9uLmNvbm5lY3Rpb25TdGF0ZSB3aGVuXG4gIC8vIGJyb3dzZXJzIGNhdGNoIHVwIHdpdGggdGhlIGxhdGVzdCB2ZXJzaW9uIG9mIHRoZSBzcGVjaWZpY2F0aW9uIVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNpZ25hbGluZ1N0YXRlQ2hhbmdlRXZlbnQoKSB7XG4gICAgbG9nKFxuICAgICAgXCIqKiogY29ubmVjdGlvbnNbdGFyZ2V0XS5zaWduYWxpbmdTdGF0ZSAgY2hhbmdlZCB0bzogXCIgK1xuICAgICAgICBjb25uZWN0aW9uc1t0YXJnZXRdLnNpZ25hbGluZ1N0YXRlLFxuICAgICk7XG4gICAgc3dpdGNoIChjb25uZWN0aW9uc1t0YXJnZXRdLnNpZ25hbGluZ1N0YXRlKSB7XG4gICAgICBjYXNlIFwiY2xvc2VkXCI6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhhbmRsZSB0aGUgfGljZWdhdGhlcmluZ3N0YXRlY2hhbmdlfCBldmVudC4gVGhpcyBsZXRzIHVzIGtub3cgd2hhdCB0aGVcbiAgLy8gSUNFIGVuZ2luZSBpcyBjdXJyZW50bHkgd29ya2luZyBvbjogXCJuZXdcIiBtZWFucyBubyBuZXR3b3JraW5nIGhhcyBoYXBwZW5lZFxuICAvLyB5ZXQsIFwiZ2F0aGVyaW5nXCIgbWVhbnMgdGhlIElDRSBlbmdpbmUgaXMgY3VycmVudGx5IGdhdGhlcmluZyBjYW5kaWRhdGVzLFxuICAvLyBhbmQgXCJjb21wbGV0ZVwiIG1lYW5zIGdhdGhlcmluZyBpcyBjb21wbGV0ZS4gTm90ZSB0aGF0IHRoZSBlbmdpbmUgY2FuXG4gIC8vIGFsdGVybmF0ZSBiZXR3ZWVuIFwiZ2F0aGVyaW5nXCIgYW5kIFwiY29tcGxldGVcIiByZXBlYXRlZGx5IGFzIG5lZWRzIGFuZFxuICAvLyBjaXJjdW1zdGFuY2VzIGNoYW5nZS5cbiAgLy9cbiAgLy8gV2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZyB3aGVuIHRoaXMgaGFwcGVucywgYnV0IHdlIGxvZyBpdCB0byB0aGVcbiAgLy8gY29uc29sZSBzbyB5b3UgY2FuIHNlZSB3aGF0J3MgZ29pbmcgb24gd2hlbiBwbGF5aW5nIHdpdGggdGhlIHNhbXBsZS5cblxuICBmdW5jdGlvbiBoYW5kbGVJQ0VHYXRoZXJpbmdTdGF0ZUNoYW5nZUV2ZW50KCkge1xuICAgIGxvZyhcbiAgICAgIFwiKioqIGNvbm5lY3Rpb25zW3RhcmdldF0uaWNlR2F0aGVyaW5nU3RhdGUgY2hhbmdlZCB0bzogXCIgK1xuICAgICAgICBjb25uZWN0aW9uc1t0YXJnZXRdLmljZUdhdGhlcmluZ1N0YXRlLFxuICAgICk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTmV3SUNFQ2FuZGlkYXRlTWVzc2FnZShtZXNzYWdlLCB0YXJnZXQpIHtcbiAgbG9nKFxuICAgIFwiKioqIEFkZGluZyByZWNlaXZlZCBJQ0UgY2FuZGlkYXRlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UuY2FuZGlkYXRlKSxcbiAgKTtcbiAgY29uc3QgY2FuZGlkYXRlID0gbmV3IFJUQ0ljZUNhbmRpZGF0ZShtZXNzYWdlLmNhbmRpZGF0ZSk7XG5cbiAgLy8gTG9cbiAgY29uc29sZS5sb2coY29ubmVjdGlvbnNbdGFyZ2V0XSk7XG4gIGF3YWl0IGNvbm5lY3Rpb25zW3RhcmdldF0uYWRkSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNoYXRBbnN3ZXJNZXNzYWdlKG1lc3NhZ2UsIHRhcmdldCkge1xuICBsb2coXCIqKiogQ2FsbCByZWNpcGllbnQgaGFzIGFjY2VwdGVkIG91ciBjYWxsXCIpO1xuXG4gIC8vIENvbmZpZ3VyZSB0aGUgcmVtb3RlIGRlc2NyaXB0aW9uLCB3aGljaCBpcyB0aGUgU0RQIHBheWxvYWRcbiAgLy8gaW4gb3VyIFwidmlkZW8tYW5zd2VyXCIgbWVzc2FnZS5cblxuICBjb25zdCBkZXNjID0gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCk7XG5cbiAgYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjKS5jYXRjaChjb25zb2xlLmVycm9yKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ2hhdE9mZmVyKG1lc3NhZ2UsIHRhcmdldCkge1xuICBjb25uZWN0aW9uc1t0YXJnZXRdIHx8IGF3YWl0IGNyZWF0ZVBlZXJDb25uZWN0aW9uKHRhcmdldCk7XG5cbiAgLy8gSWYgd2UncmUgbm90IGFscmVhZHkgY29ubmVjdGVkLCBjcmVhdGUgYW4gUlRDUGVlckNvbm5lY3Rpb25cbiAgLy8gdG8gYmUgbGlua2VkIHRvIHRoZSBjYWxsZXIuXG5cbiAgLy8gbG9nKFwiUmVjZWl2ZWQgY2hhdCBvZmZlciBmcm9tIFwiICsgdGFyZ2V0KTtcbiAgLy8gZWQgdG8gc2V0IHRoZSByZW1vdGUgZGVzY3JpcHRpb24gdG8gdGhlIHJlY2VpdmVkIFNEUCBvZmZlclxuICAvLyBzbyB0aGF0IG91ciBsb2NhbCBXZWJSVEMgbGF5ZXIga25vd3MgaG93IHRvIHRhbGsgdG8gdGhlIGNhbGxlci5cblxuICBjb25zdCBkZXNjID0gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCk7XG5cbiAgLy8gSWYgdGhlIGNvbm5lY3Rpb24gaXNuJ3Qgc3RhYmxlIHlldCwgd2FpdCBmb3IgaXQuLi5cblxuICBpZiAoY29ubmVjdGlvbnNbdGFyZ2V0XS5zaWduYWxpbmdTdGF0ZSAhPSBcInN0YWJsZVwiKSB7XG4gICAgbG9nKFwiICAtIEJ1dCB0aGUgc2lnbmFsaW5nIHN0YXRlIGlzbid0IHN0YWJsZSwgc28gdHJpZ2dlcmluZyByb2xsYmFja1wiKTtcblxuICAgIC8vIFNldCB0aGUgbG9jYWwgYW5kIHJlbW92ZSBkZXNjcmlwdGlvbnMgZm9yIHJvbGxiYWNrOyBkb24ndCBwcm9jZWVkXG4gICAgLy8gdW50aWwgYm90aCByZXR1cm4uXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRMb2NhbERlc2NyaXB0aW9uKHsgdHlwZTogXCJyb2xsYmFja1wiIH0pLFxuICAgICAgY29ubmVjdGlvbnNbdGFyZ2V0XS5zZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjKSxcbiAgICBdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2coXCIgIC0gU2V0dGluZyByZW1vdGUgZGVzY3JpcHRpb25cIik7XG4gIGF3YWl0IGNvbm5lY3Rpb25zW3RhcmdldF0uc2V0UmVtb3RlRGVzY3JpcHRpb24oZGVzYyk7XG5cbiAgLy8gR2V0IHRoZSB3ZWJjYW0gc3RyZWFtIGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBpdFxuXG4gIGxvZyhcIi0tLT4gQ3JlYXRpbmcgYW5kIHNlbmRpbmcgYW5zd2VyIHRvIGNhbGxlclwiKTtcblxuICBhd2FpdCBjb25uZWN0aW9uc1t0YXJnZXRdLnNldExvY2FsRGVzY3JpcHRpb24oXG4gICAgYXdhaXQgY29ubmVjdGlvbnNbdGFyZ2V0XS5jcmVhdGVBbnN3ZXIoKSxcbiAgKTtcblxuICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICB0YXJnZXQsXG4gICAgbmFtZTogdXNlcm5hbWUsXG4gICAgdHlwZTogXCJ2aWRlby1hbnN3ZXJcIixcbiAgICBzZHA6IGNvbm5lY3Rpb25zW3RhcmdldF0ubG9jYWxEZXNjcmlwdGlvbixcbiAgfSkpO1xufVxuXG4vLyBDYWxsZWQgYnkgdGhlIFdlYlJUQyBsYXllciB0byBsZXQgdXMga25vdyB3aGVuIGl0J3MgdGltZSB0b1xuLy8gYmVnaW4sIHJlc3VtZSwgb3IgcmVzdGFydCBJQ0UgbmVnb3RpYXRpb24uXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV3NNZXNzYWdlKGV2ZW50LCBzb3VyY2UpIHtcbiAgbGFzdFNlZW5Ob3cgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuXG4gIC8vIE15U2Vzc2lvbi5hZGRFdmVudChkYXRhKTtcblxuICBpZiAoXG4gICAgZGF0YS5uYW1lICYmIGRhdGEubmFtZSAhPT0gdXNlcm5hbWUgJiYgIWNvbm5lY3Rpb25zW2RhdGEubmFtZV1cbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNyZWF0ZVBlZXJDb25uZWN0aW9uKGRhdGEubmFtZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZTogZXJyb3IgfSk7XG4gICAgICBsb2dfZXJyb3IoXCJFcnJvciB3aXRoIHAycFwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zb2xlLmxvZyhzb3VyY2UsIGRhdGEubmFtZSk7XG5cbiAgaWYgKGRhdGEudHlwZSA9PT0gXCJuZXctaWNlLWNhbmRpZGF0ZVwiKSB7XG4gICAgYXdhaXQgaGFuZGxlTmV3SUNFQ2FuZGlkYXRlTWVzc2FnZShkYXRhLCBkYXRhLm5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhLnR5cGUgPT09IFwidmlkZW8tb2ZmZXJcIikge1xuICAgIGF3YWl0IGhhbmRsZUNoYXRPZmZlcihkYXRhLCBkYXRhLm5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhLnR5cGUgPT09IFwidmlkZW8tYW5zd2VyXCIpIHtcbiAgICBhd2FpdCBoYW5kbGVDaGF0QW5zd2VyTWVzc2FnZShkYXRhLCBkYXRhLm5hbWUpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNvdXJjZSA9PT0gd3MgJiYgZGF0YS5oYXNoQ29kZSkge1xuICAgIHdzTGFzdEhhc2hDb2RlID0gZGF0YS5oYXNoQ29kZTtcbiAgfVxuXG4gIGlmIChkYXRhLnBhdGNoICYmIHNvdXJjZSA9PT0gXCJ3c1wiIHx8IGRhdGEubmFtZSAhPT0gdXNlcm5hbWUpIHtcbiAgICBpZiAoZGF0YS5uZXdIYXNoID09PSBteVNlc3Npb24uaGFzaENvZGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLm9sZEhhc2ggPT09IG15U2Vzc2lvbi5oYXNoQ29kZSgpKSB7XG4gICAgICAvLyBDb25zb2xlLmxvZyhcIioqKioqKioqIEFQUExZIFBBVENIICoqKioqKlwiKTtcbiAgICAgIG15U2Vzc2lvbi5hcHBseVBhdGNoKGRhdGEpO1xuICAgICAgY2hDb2RlKFxuICAgICAgICBteVNlc3Npb24uc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5jb2RlLFxuICAgICAgICBteVNlc3Npb24uc2Vzc2lvbi5nZXQoXCJzdGF0ZVwiKS5pLFxuICAgICAgKTtcbiAgICAgIGlmIChzZW5kQ2hhbm5lbCkge1xuICAgICAgICBzZW5kQ2hhbm5lbC5zZW5kKHsgaGFzaENvZGU6IGRhdGEubmV3SGFzaCB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhLm5ld0hhc2ggPT09IG15U2Vzc2lvbi5oYXNoQ29kZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuY29kZSAmJiBkYXRhLnRyYW5zcGlsZWQpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0gbXlTZXNzaW9uLmNyZWF0ZVBhdGNoKGRhdGEpO1xuICAgICAgbXlTZXNzaW9uLmFwcGx5UGF0Y2gobWVzc2FnZURhdGEpO1xuICAgICAgY2hDb2RlKGRhdGEuY29kZSk7XG4gICAgICBpZiAoc2VuZENoYW5uZWwpIHtcbiAgICAgICAgc2VuZENoYW5uZWwuc2VuZCh7IGhhc2hDb2RlOiBtZXNzYWdlRGF0YS5uZXdIYXNoIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGRhdGEudGltZXN0YW1wKSB7XG4gICAgbGFzdFNlZW5Ob3cgPSBEYXRlLm5vdygpO1xuICAgIGxhc3RTZWVuVGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXA7XG4gIH1cblxuICBpZiAoZGF0YS5uYW1lID09PSB1c2VybmFtZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxhc3RTZWVuVGltZXN0YW1wID0gZGF0YS50aW1lc3RhbXA7XG59XG5cbmZ1bmN0aW9uIHdhaXQoZGVsYXkpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSwgZGVsYXkpO1xuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUFBO0FBRUEsSUFBSTtBQUNKLElBQUk7QUFFSixJQUFJO0FBSUosSUFBSTtBQUVHLElBQU0sY0FBYyxPQUFPLE1BQU0sYUFBYTtBQUNuRCxhQUFXLFlBQWEsT0FBTSxPQUFPLDJCQUFrQjtBQUV2RCxTQUFPLFNBQVMsTUFBTTtBQUFBO0FBVXhCLHNDQUE2QyxTQUFTO0FBQ3BELFFBQU0sa0JBQWtCLFNBQVMsY0FBYztBQUUvQyxRQUFNLEVBQUUsZ0JBQWdCLE1BQU0sT0FBTztBQUNyQyxRQUFNLFdBQVksT0FBTSxPQUFPLDRCQUFvQjtBQUNuRCxRQUFNLGVBQWUsQ0FBQyxPQUNwQixPQUFPLE9BQU8sV0FBVyxZQUFZLEdBQUcsU0FB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
