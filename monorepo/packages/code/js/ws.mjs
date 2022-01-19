/*eslint-disable */

/* eslint-enable */

// import initSession from "./dist/session.mjs";

import { initSession, quickStart } from "./dist/quickStart.mjs";

let currentWebSocket = null;
let sess = false;
// Let sanyiProcess = null;

const webRtcArray = [];
const hostname = "spike.land";
const mod = {};

let wsLastHashCode = "";
let webRTCLastSeenHashCode = "";
let roomName = "";
let username = "";
let lastSeenTimestamp = 0;
let lastSeenNow = 0;
let ws;
let chCode;
let startTime;
let rejoined = false;
let sendChannel;
let deltaSent = "";
// Let createDelta;
// let applyPatch;
let mySession = null;
const mST = () => mySession.session.get("state");

let intervalHandler = null;

// Function createPatch(oldCode, newCode) {
//   return JSON.stringify(createDelta(oldCode, newCode));
// }

// let importTools = async () => {
// if (toolsImported) return toolsImported;

// import("textdiff-create").then((mod) => createDelta = mod.default);
// import("textdiff-patch").then((mod) => applyPatch = mod.default);

// toolsImported = true;
// return toolsImported;
// };
setInterval(() => {
  if (Date.now() - lastSeenNow > 40_000) {
    rejoin();
  } else {
    console.log("no_need_to_rejoin");
  }
}, 30_000);

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
    // MySession.addEvent({
    //   type: "joined"
    // });

    // Clear the roster.
    //  while (roster.firstChild) {
    //   roster.removeChild(roster.firstChild);
    //    }

    // Don't try to reconnect too rapidly.
    const timeSinceLastJoin = Date.now() - startTime;
    if (timeSinceLastJoin < 10_000) {
      // Less than 10 seconds elapsed since last join. Pause a bit.
      await new Promise((resolve) =>
        setTimeout(resolve, 10_000 - timeSinceLastJoin)
      );
    }

    // OK, reconnect now!
    join();
  }
}

async function broad(
  { code, transpiled, html, css, i },
) {
  if (sendChannel) {
    const now = Date.now();
    mod.i = i;
    if (mod.lastRtcUpdate) {
      const diff = now - mod.lastUpdate;
      if (diff < 1000) {
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
    const message = webRTCLastSeenHashCode
      ? mySession.createPatchFromHashCode(webRTCLastSeenHashCode, updatedState)
      : mySession.createPatch(updatedState);
    if (message && message.patch !== "") {
      sendChannel.send(message);
    }
  }

  if (currentWebSocket) {
    const now = Date.now();
    mod.i = i;
    if (mod.lastUpdate) {
      const diff = now - mod.lastUpdate;
      if (diff < 1000) {
        await wait(1000 - diff);
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
    const message = wsLastHashCode
      ? mySession.createPatchFromHashCode(wsLastHashCode, updatedState)
      : mySession.createPatch(updatedState);

    // Console.log("APPLY");
    // mySession.applyPatch(message);
    // console.log(mySession.hashCode());

    if (!message) {
      return;
    }

    const messageString = JSON.stringify({ ...message, name: username });
    if (message.patch !== "") {
      currentWebSocket.send(messageString);
    }
  }
}

export const join = async (room, user, delta) => {
  roomName = roomName || room || "code-main";
  window.room = room;
  if (user) {
    username = user;
  }

  const resp = await fetch(
    `https://spike.land/api/room/${roomName}/session`,
  );
  const state = await resp.json();

  mySession = mySession || await initSession(roomName, {
    name: username,
    room: roomName,
    state,
    events: [],
  });

  window.mySession = mySession;
  if (!delta) {
    if (!window.sess) {
      const session = {
        ...mST().toJSON(),
        setChild: () => {},
        changes: [],

        children: [null],
        errorText: "",
      };
      const throttle = (await import("lodash/throttle")).default;

      const stayFullscreen = location.pathname.endsWith("public");
      quickStart(
        session,
        roomName,
        stayFullscreen,
        throttle(broad, 100),
      );
      window.sess = session;
    }
  }

  if (sess) {
    return;
  }

  sess = true;

  setTimeout(() => {
    sess = false;
  }, 10_000);

  ws = new WebSocket(
    "wss://" + hostname + "/api/room/" + roomName + "/websocket",
  );
  rejoined = false;
  startTime = Date.now();

  ws.addEventListener("open", () => {
    if (delta) {
      if (delta !== deltaSent) {
        deltaSent = delta;
        ws.send(JSON.stringify({
          type: "delta",
          delta,
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

        if (now - lastSeenNow > 30_000) {
          try {
            ws.send(
              JSON.stringify({
                name: username,
                time: lastSeenTimestamp + diff,
              }),
            );
          } catch {
            rejoin();
          }
        }
      }, 30_000);
    }

    currentWebSocket = ws;

    globalThis.broad = broad;
    globalThis.chCode = chCode;

    // Send user info message.
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

// Create the RTCPeerConnection which knows how to talk to our
// selected STUN/TURN server and then uses getUserMedia() to find
// our camera and microphone and add that stream to the connection for
// use in our video call. Then we configure event handlers to get
// needed notifications on the call.

let myHostname = window.location.hostname;
if (!myHostname) {
  myHostname = "localhost";
}

log("Hostname: " + myHostname);

// WebSocket chat/signaling channel variables.

// The media constraints object describes what sort of stream we want
// to request from the local A/V hardware (typically a webcam and
// microphone). Here, we specify only that we want both audio and
// video; however, you can be more specific. It's possible to state
// that you would prefer (or require) specific resolutions of video,
// whether to prefer the user-facing or rear-facing camera (if available),
// and so on.
//
// See also:
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
//

const connections = {}; // To st/ RTCPeerConnection
// var transceiver = null;         // RTCRtpTransceiver
// var webcamStream = null;        // MediaStream from webcam

// Output logging information to console.
globalThis.connections = connections;
function log(text) {
  const time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Output an error message to console.

function log_error(text) {
  const time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

async function createPeerConnection(target) {
  log("Setting up a connection...");

  // Create an RTCPeerConnection which knows to use our chosen
  // STUN server.

  const rcpOptions = {
    iceServers: ["stun3.l.google.com:19302"].map((url) => ({
      urls: `stun:${url}`,
    })),
  };

  rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
    urls: "stun:stun.l.google.com:19302",
  }];

  connections[target] = connections[target] || new RTCPeerConnection(
    rcpOptions,
  );

  // Set up event handlers for the ICE negotiation process.

  connections[target].onicecandidate = handleICECandidateEvent;
  connections[target].oniceconnectionstatechange =
    handleICEConnectionStateChangeEvent;
  connections[target].onicegatheringstatechange =
    handleICEGatheringStateChangeEvent;
  connections[target].onsignalingstatechange = handleSignalingStateChangeEvent;
  connections[target].onnegotiationneeded = handleNegotiationNeededEvent;
  connections[target].ontrack = handleTrackEvent;

  connections[target].addEventListener("datachannel", receiveChannelCallback);

  const dataChannelOptions = {
    ordered: true, // Do not guarantee order
    reliable: true,
    maxPacketLifeTime: 3000, // In milliseconds
  };

  const rtc = connections[target].createDataChannel(
    target,
    dataChannelOptions,
  );

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

  // Rtc.onmessage = (msg) => processWsMessage(msg, "rtc");

  rtc.addEventListener("open", () => {
    console.log("@@@@@@@@RTC IS OPEN&&&&&&&&");
    rtc.target = target;
    webRtcArray.push(rtc);
    connections[target].sendChannel = rtc;

    window.sendChannel = sendChannel = {
      send: ((data) => {
        const target = data.target;
        data.name = data.name || username;
        const messageString = JSON.stringify(data);
        webRtcArray.map((ch) =>
          ch.readyState === "open" &&
          (!target || target && ch.target === target) && ch.send(messageString)
        );
      }),
    };
  });

  rtc.addEventListener("close", () => {
    console.log("xxxxxxxx- The Data Channel is Closed");
  });

  return connections[target];

  function receiveChannelCallback(event) {
    console.log("Receive Channel Callback");
    const rtc = event.channel;
    rtc.binaryType = "arraybuffer";
    rtc.addEventListener("close", onReceiveChannelClosed);

    rtc.addEventListener(
      "message",
      (message) => processWsMessage(message, "rtc"),
    );
    webRtcArray.push(rtc);
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

      // If the connection hasn't yet achieved the "stable" state,
      // return to the caller. Another negotiationneeded event
      // will be fired when the state stabilizes.

      if (connections[target].signalingState != "stable") {
        log("     -- The connection isn't stable yet; postponing...");
        return;
      }

      // Establish the offer as the local peer's current
      // description.

      log("---> Setting local description to the offer");
      await connections[target].setLocalDescription(offer);

      // Send the offer to the remote peer.

      log("---> Sending the offer to the remote peer");
      ws.send(JSON.stringify({
        target,
        name: username,
        type: "video-offer",
        sdp: connections[target].localDescription,
      }));
    } catch {
      log(
        "*** The following error occurred while handling the negotiationneeded event:",
      );
      // ReportError(err);
    }
  }

  // Called by the WebRTC layer when events occur on the media tracks
  // on our WebRTC call. This includes when streams are added to and
  // removed from the call.
  //
  // track events include the following fields:
  //
  // RTCRtpReceiver       receiver
  // MediaStreamTrack     track
  // MediaStream[]        streams
  // RTCRtpTransceiver    transceiver
  //
  // In our case, we're just taking the first stream found and attaching
  // it to the <video> element for incoming media.

  function handleTrackEvent(event) {
    log("*** Track event");
    document.querySelector("#received_video").srcObject = event.streams[0];
    document.querySelector("#hangup-button").disabled = false;
  }

  // Handles |icecandidate| events by forwarding the specified
  // ICE candidate (created by our local ICE agent) to the other
  // peer through the signaling server.

  function handleICECandidateEvent(event) {
    if (event.candidate) {
      log("*** Outgoing ICE candidate: " + event.candidate);

      ws.send(JSON.stringify({
        type: "new-ice-candidate",
        target,
        name: username,
        candidate: event.candidate,
      }));
    }
  }

  // Handle |iceconnectionstatechange| events. This will detect
  // when the ICE connection is closed, failed, or disconnected.
  //
  // This is called when the state of the ICE agent changes.

  function handleICEConnectionStateChangeEvent() {
    log(
      "*** ICE connection state changed to " +
        connections[target].iceConnectionState,
    );

    switch (connections[target].iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        break;
    }
  }

  // Set up a |signalingstatechange| event handler. This will detect when
  // the signaling connection is closed.
  //
  // NOTE: This will actually move to the new RTCPeerConnectionState enum
  // returned in the property RTCPeerConnection.connectionState when
  // browsers catch up with the latest version of the specification!

  function handleSignalingStateChangeEvent() {
    log(
      "*** connections[target].signalingState  changed to: " +
        connections[target].signalingState,
    );
    switch (connections[target].signalingState) {
      case "closed":
        break;
    }
  }

  // Handle the |icegatheringstatechange| event. This lets us know what the
  // ICE engine is currently working on: "new" means no networking has happened
  // yet, "gathering" means the ICE engine is currently gathering candidates,
  // and "complete" means gathering is complete. Note that the engine can
  // alternate between "gathering" and "complete" repeatedly as needs and
  // circumstances change.
  //
  // We don't need to do anything when this happens, but we log it to the
  // console so you can see what's going on when playing with the sample.

  function handleICEGatheringStateChangeEvent() {
    log(
      "*** connections[target].iceGatheringState changed to: " +
        connections[target].iceGatheringState,
    );
  }
}

async function handleNewICECandidateMessage(message, target) {
  log(
    "*** Adding received ICE candidate: " + JSON.stringify(message.candidate),
  );
  const candidate = new RTCIceCandidate(message.candidate);

  // Lo
  console.log(connections[target]);
  await connections[target].addIceCandidate(candidate);
}

async function handleChatAnswerMessage(message, target) {
  log("*** Call recipient has accepted our call");

  // Configure the remote description, which is the SDP payload
  // in our "video-answer" message.

  const desc = new RTCSessionDescription(message.sdp);

  await connections[target].setRemoteDescription(desc).catch(console.error);
}

async function handleChatOffer(message, target) {
  connections[target] || await createPeerConnection(target);

  // If we're not already connected, create an RTCPeerConnection
  // to be linked to the caller.

  // log("Received chat offer from " + target);
  // ed to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.

  const desc = new RTCSessionDescription(message.sdp);

  // If the connection isn't stable yet, wait for it...

  if (connections[target].signalingState != "stable") {
    log("  - But the signaling state isn't stable, so triggering rollback");

    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      connections[target].setLocalDescription({ type: "rollback" }),
      connections[target].setRemoteDescription(desc),
    ]);
    return;
  }

  log("  - Setting remote description");
  await connections[target].setRemoteDescription(desc);

  // Get the webcam stream if we don't already have it

  log("---> Creating and sending answer to caller");

  await connections[target].setLocalDescription(
    await connections[target].createAnswer(),
  );

  ws.send(JSON.stringify({
    target,
    name: username,
    type: "video-answer",
    sdp: connections[target].localDescription,
  }));
}

// Called by the WebRTC layer to let us know when it's time to
// begin, resume, or restart ICE negotiation.
async function processWsMessage(event, source) {
  lastSeenNow = Date.now();

  const data = JSON.parse(event.data);

  // MySession.addEvent(data);

  if (
    data.name && data.name !== username && !connections[data.name]
  ) {
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
      // Console.log("******** APPLY PATCH ******");
      mySession.applyPatch(data);
      chCode(
        mySession.session.get("state").code,
        mySession.session.get("state").i,
      );
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
