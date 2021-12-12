import createDelta from "textdiff-create";
import applyPatch from "textdiff-patch";
import { formatter } from "./formatter.mjs";

import Hash from "ipfs-only-hash";

let currentWebSocket = null;

const mod = {};

function createPatch(oldCode, newCode) {
  return JSON.stringify(createDelta(oldCode, newCode));
}

const chCode = async (code) => {
  if (!code) return;
  try {
    if (
      window.sess && window.monaco && window.monaco.editor.getModels().length
    ) {
      const hashOfCode = await Hash.of(code);
      window.hashOfCode = hashOfCode;
      window[hashOfCode] = code;

      window.monaco.editor.getModels()[0].setValue(code);
    } else {
      if (location.href.endsWith("/public")) {
        await restartCode(code);
        return;
      }
      const { run } = await import("./reactLoader.mjs");

      // console.log({window: "window", code, room: roomName });
      run({ mode: "window", code, room: roomName });
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
let sendChannel;

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
          ws.send(
            JSON.stringify({ name: username, time: lastSeenTimestamp + diff }),
          );
        }
      }, 30_000);
    }
    console.log("connected");
    currentWebSocket = ws;
    const broad = async (
      { code, hashOfCode, starterCode, transpiled, html, css, i },
    ) => {
      if (i != window.sess.i) return;
      const formattedCode = await formatter(code);
      const hashOfFormattedCode = await Hash.of(formattedCode);

      if (
        code !== lastSeenCode && formattedCode !== lastSeenCode &&
        hashOfFormattedCode !== window.hashOfCode
      ) {
        lastSeenCode = code;
        let codeDiff;
        const prevHash = window.currentHashOfCode;
        if (hashOfCode === prevHash) return;
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

        const msgStr = JSON.stringify(message);

        if (sendChannel && sendChannel.readyState === "open") {
          sendChannel.send(msgStr);
        }

        try {
          currentWebSocket.send(msgStr);
        } catch {
          rejoin();
          setTimeout(() => currentWebSocket.send(msgStr), 50);
        }
      }
    };

    window.broad = broad;
    window.chCode = chCode;

    // Send user info message.
    ws.send(JSON.stringify({ name: username }));
  });

  ws.addEventListener("message", processWsMessage);

  ws.addEventListener("close", (event) => {
    console.log("WebSocket closed, reconnecting:", event.code, event.reason);
    rejoin();
  });
  ws.addEventListener("error", (event) => {
    console.log("WebSocket error, reconnecting:", event);
    rejoin();
  });
};

const restartCode = async (c) => {
  const { restart } = await import("./restartCode.mjs");
  restart(c, document.getElementById("zbody"));
};

export const run = async () => {
  const resp = await fetch(
    "./code",
  );
  const code = await resp.text();

  await restartCode(code);

  const user = Math.random() - "html";
  const room = location.pathname.slice(1).split("/")[2] || "code-main";

  console.log(user, room);

  join(user, room);
};

// Create the RTCPeerConnection which knows how to talk to our
// selected STUN/TURN server and then uses getUserMedia() to find
// our camera and microphone and add that stream to the connection for
// use in our video call. Then we configure event handlers to get
// needed notifications on the call.

var myHostname = window.location.hostname;
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

var targetUsername = null; // To store username of other peer
var myPeerConnection = null; // RTCPeerConnection
// var transceiver = null;         // RTCRtpTransceiver
// var webcamStream = null;        // MediaStream from webcam

// Output logging information to console.

function log(text) {
  var time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Output an error message to console.

function log_error(text) {
  var time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

async function createPeerConnection() {
  log("Setting up a connection...");

  // Create an RTCPeerConnection which knows to use our chosen
  // STUN server.

  const rcpOpts = {
    iceServers: ["stun3.l.google.com:19302"].map((url) => ({
      urls: `stun:${url}`,
    })),
  };
  rcpOpts.iceServers = [{ "urls": "stun:stun.stunprotocol.org:3478" }, {
    "urls": "stun:stun.l.google.com:19302",
  }];
  //   rcpOpts.iceServers.push( {
  //     url: 'turn:turn.anyfirewall.com:443?transport=tcp',
  //     credential: 'webrtc',
  //     username: 'webrtc'
  // });

  myPeerConnection = new RTCPeerConnection(rcpOpts);

  // Set up event handlers for the ICE negotiation process.

  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.oniceconnectionstatechange =
    handleICEConnectionStateChangeEvent;
  myPeerConnection.onicegatheringstatechange =
    handleICEGatheringStateChangeEvent;
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.ontrack = handleTrackEvent;

  myPeerConnection.addEventListener("datachannel", receiveChannelCallback);

  function receiveChannelCallback(event) {
    console.log("Receive Channel Callback");
    sendChannel = event.channel;
    sendChannel.binaryType = "arraybuffer";
    sendChannel.addEventListener("close", onReceiveChannelClosed);

    sendChannel.addEventListener("message", processWsMessage);
  }

  function onReceiveChannelClosed() {
    console.log("Receive channel is closed");
    myPeerConnection.close();
    myPeerConnection = null;
    console.log("Closed remote peer connection");
  }

  const dataChannelOptions = {
    ordered: true, // do not guarantee order
    reliable: true,
    maxPacketLifeTime: 3000, // in milliseconds
  };

  sendChannel = myPeerConnection.createDataChannel(
    "myLabel",
    dataChannelOptions,
  );

  sendChannel.binaryType = "arraybuffer";

  sendChannel.addEventListener("message", processWsMessage);

  sendChannel.onerror = (error) => {
    console.log("xxxxxx-  Data Channel Error:", error);
  };

  sendChannel.onmessage = processWsMessage;

  sendChannel.onopen = () => {
  };

  sendChannel.onclose = () => {
    console.log("xxxxxxxx- The Data Channel is Closed");
  };

  window.myPeerConnection = myPeerConnection;
  window.sendChannel = sendChannel;
}

// Called by the WebRTC layer to let us know when it's time to
// begin, resume, or restart ICE negotiation.

async function handleNegotiationNeededEvent() {
  log("*** Negotiation needed");

  try {
    log("---> Creating offer");
    const offer = await myPeerConnection.createOffer();

    // If the connection hasn't yet achieved the "stable" state,
    // return to the caller. Another negotiationneeded event
    // will be fired when the state stabilizes.

    if (myPeerConnection.signalingState != "stable") {
      log("     -- The connection isn't stable yet; postponing...");
      return;
    }

    // Establish the offer as the local peer's current
    // description.

    log("---> Setting local description to the offer");
    await myPeerConnection.setLocalDescription(offer);

    // Send the offer to the remote peer.

    log("---> Sending the offer to the remote peer");
    ws.send(JSON.stringify({
      target: targetUsername,
      type: "video-offer",
      sdp: myPeerConnection.localDescription,
    }));
  } catch (err) {
    log(
      "*** The following error occurred while handling the negotiationneeded event:",
    );
    // reportError(err);
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
  document.getElementById("received_video").srcObject = event.streams[0];
  document.getElementById("hangup-button").disabled = false;
}

// Handles |icecandidate| events by forwarding the specified
// ICE candidate (created by our local ICE agent) to the other
// peer through the signaling server.

function handleICECandidateEvent(event) {
  if (event.candidate) {
    log("*** Outgoing ICE candidate: " + event.candidate);

    ws.send(JSON.stringify({
      type: "new-ice-candidate",
      target: targetUsername,
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
      myPeerConnection.iceConnectionState,
  );

  switch (myPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
    case "disconnected":
      break;
  }
}

async function handleNewICECandidateMsg(msg) {
  log("*** Adding received ICE candidate: " + JSON.stringify(msg.candidate));
  var candidate = new RTCIceCandidate(msg.candidate);

  // log("*** Adding received ICE candidate: " + JSON.stringify(candidate));
  try {
    await myPeerConnection.addIceCandidate(candidate);
  } catch (err) {
    reportError(err);
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
    "*** myPeerConnection.signalingState  changed to: " +
      myPeerConnection.signalingState,
  );
  switch (myPeerConnection.signalingState) {
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
    "*** myPeerConnection.iceGatheringState changed to: " +
      myPeerConnection.iceGatheringState,
  );
}

function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}

async function handleChatOffer(msg) {
  targetUsername = msg.name;

  // If we're not already connected, create an RTCPeerConnection
  // to be linked to the caller.

  log("Received chat offer from " + targetUsername);
  if (!myPeerConnection) {
    createPeerConnection();
  }

  // We need to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.

  var desc = new RTCSessionDescription(msg.sdp);

  // If the connection isn't stable yet, wait for it...

  if (myPeerConnection.signalingState != "stable") {
    log("  - But the signaling state isn't stable, so triggering rollback");

    // Set the local and remove descriptions for rollback; don't proceed
    // until both return.
    await Promise.all([
      myPeerConnection.setLocalDescription({ type: "rollback" }),
      myPeerConnection.setRemoteDescription(desc),
    ]);
    return;
  } else {
    log("  - Setting remote description");
    await myPeerConnection.setRemoteDescription(desc);
  }

  // Get the webcam stream if we don't already have it

  log("---> Creating and sending answer to caller");

  await myPeerConnection.setLocalDescription(
    await myPeerConnection.createAnswer(),
  );

  ws.send(JSON.stringify({
    target: targetUsername,
    type: "video-answer",
    sdp: myPeerConnection.localDescription,
  }));
}

async function handleChatAnswerMsg(msg) {
  log("*** Call recipient has accepted our call");

  // Configure the remote description, which is the SDP payload
  // in our "video-answer" message.

  var desc = new RTCSessionDescription(msg.sdp);
  await myPeerConnection.setRemoteDescription(desc).catch(reportError);
}

const cids = {};

async function getCID(CID) {
  if (cids[CID] && typeof cids[CID] === "string") return cids[CID];
  if (cids[CID] && typeof cids[CID] === "function") return cids[CID]();

  const requestSrt = JSON.stringify({
    type: "get-cid",
    cid: CID,
  });
  if (sendChannel && sendChannel.readyState === "open") {
    sendChannel.send(requestSrt);
  } else {
    ws.send(requestSrt);
  }
  return new Promise((resolve) => {
    cids[CID] = resolve;
  });
}

async function processWsMessage(event) {
  const data = JSON.parse(event.data);

  if (
    data.name && data.hashOfCode && data.name !== username &&
    targetUsername == null
  ) {
    targetUsername = data.name;
    window.targetUsername = data.name;
    try {
      await createPeerConnection();
      // const sendChannel = myPeerConnection.createDataChannel(
      //   "sendDataChannel",
      // );
      // window.sendChannel = sendChannel;
      // sendChannel.onopen = function () {
      //   sendChannel.send("Hi you!");
      // };
      // sendChannel.onmessage = function (event) {
      //   console.log(event.data);
      // };
      // sendChannel.on§
      // const offer = await myPeerConnection.createOffer();
      // console.log({offer});
    } catch (e) {
      console.log({ e });
      log_error("Error with p2p");
    }
  }
  if (data.type === "new-ice-candidate") {
    await handleNewICECandidateMsg(data);
    return;
  }

  if (data.type === "video-offer") {
    targetUsername = data.name;
    window.targetUsername = data.name;
    await handleChatOffer(data);
    return;
  }

  if (data.type === "get-cid" && data.cid) {
    const CID = data.cid;
    const content = data[CID];

    if (content) {
      const dataCID = await Hash.of(content);

      if (dataCID !== CID) console.error("get-cid ERROR!!!! ???? !!!");

      if (cids[dataCID]) {
        if (typeof cids[dataCID] === "function") {
          cids[dataCID](content);
          cids[dataCID] = content;
        }
        return;
      }
    }

    if (window[CID]) {
      const hash = await Hash.of(window[CID]);
      if (hash === CID) {
        sendChannel.send(
          JSON.stringify({ type: "get-cid", cid: CID, [CID]: window[CID] }),
        );
      }
    }

    return;
  }

  if (window.sess && data.i <= window.sess.i) {
    return;
  }

  if (data.type === "video-answer") {
    await handleChatAnswerMsg(data);

    return;
  }

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
      window[data.hashOfCode] = await getCID(data.hashOfCode);
    }

    window.starterCode = window[data.hashOfCode];
    lastSeenCode = window[data.hashOfCode];
    chCode(lastSeenCode);
  }

  if (data.codeReq) {
    sendChannel.send(JSON.stringify({
      hashOfCode: window.hashOfCode,
      code: window[window.hashOfCode],
    }));
  }

  if (data.code && data.hashOfCode) {
    if (!window[data.hashOfCode]) {
      window.hashOfCode = data.hashOfCode;
      const code = data.code;
      const hashOfCode = await Hash.of(code);
      window[hashOfCode] = code;
      if (data.hashOfCode === hashOfCode) chCode(data.code);
    }
  }

  if (
    data.changes && data.i && data.hashOfCode && data.prevHash &&
    window[data.prevHash]
  ) {
    const prevCode = window[data.prevHash];
    const prevHash = await Hash.of(prevCode);
    if (data.prevHash !== prevHash) {
      sendChannel.send(JSON.stringify({
        type: "codeReq",
      }));
      return;
    }

    if (data.i <= window.sess.i) return;
    if (window.hashOfCode === data.prevHash) {
      let hashOfCode = "";
      if (window.monaco) {
        window.monaco.editor.getModels()[0].applyEdits(data.changes.changes);
        hashOfCode = await Hash.of(
          window.monaco.editor.getModels()[0].getValue(),
        );
      }
      if (hashOfCode === data.hashOfCode) {
        window.hashOfCode = hashOfCode;
      } else {
        const code = applyPatch(
          window[data.prevHash],
          JSON.parse(data.codeDiff),
        );

        const hashOfCode = await Hash.of(code);
        if (hashOfCode === data.hashOfCode) {
          chCode(code);
          window.hashOfCode = hashOfCode;
        } else {
          if (window[data.hashOfCode]) {
            const code = window[data.hashOfCode];
            chCode(code);
            //                window.monaco.editor.getModels()[0].setValue(code);
            window.hashOfCode = hashOfCode;
          }

          console.log(
            "What is the Content for CID: " + data.hashOfCode + "???",
          );
          const code = await getCID(data.hashOfCode);

          console.log({ code });

          window[data.hashOfCode] = code;
        }
        if (window[data.hashOfCode] && window.monaco && window.monaco.editor) {
          const code = window[data.hashOfCode];
          window.monaco.editor.getModels()[0].setValue(code);
          window.hashOfCode = hashOfCode;
        } else {
          sendChannel.send(JSON.stringify({
            type: "codeReq",
          }));
        }
      }
    }

    window.hashOfCode = data.hashOfCode;
  }
  // A regular chat message.

  if (
    data.codeDiff && data.hashOfCode && data.prevHash && window[data.prevHash]
  ) {
    if (
      data.hashOfCode &&
      data.codeDiff && data.hashOfCode !== window.hashOfCode
    ) {
      const hashOfCode = data.hashOfCode;

      // const dmp = new DiffMatchPatch();
      // const patches = dmp.patch_fromText(data.codeDiff);
      // const patched = dmp.patch_apply(patches, lastSeenCode);

      const codeCandidate = applyPatch(
        window[data.prevHash],
        JSON.parse(data.codeDiff),
      );
      const hashFromCodeDiff = await Hash.of(codeCandidate);
      if (hashFromCodeDiff === hashOfCode) {
        window[hashOfCode] = codeCandidate;
        window.hashOfCode = hashOfCode;

        chCode(codeCandidate);
      }
    } else {
      console.error("we are out of sync...");
      ws.close(1000, "out of sync");
      return;
    }
  }

  // addChatMessage(data.name, data.message);
  lastSeenTimestamp = data.timestamp;
}
