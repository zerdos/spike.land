import createDelta from "textdiff-create";
import applyPatch from "textdiff-patch";
import { formatter } from "./formatter.mjs";

import Hash from "ipfs-only-hash";

let currentWebSocket = null;
let sess = false;
const mod = {};
let sanyiProcess = null;

function createPatch(oldCode, newCode) {
  return JSON.stringify(createDelta(oldCode, newCode));
}

const webrtcArray = [];
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
      await restartCode(code);
    }
  } catch (e) {
    console.error({ e });
  }
};

let hostname = "code.spike.land";

let roomName = "";
let username = "";
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

export const join = (room, user) => {
  roomName = room || "code-main";
  window.room = room;
  if (user) username = user;

  if (sess) return;
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
          message.i = i;
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
          message.i = i;

          message.hashOfCode = hashOfCode;
        }

        const msgStr = JSON.stringify(message);

        if (window.sendChannel) {
          window.sendChannel.send(msgStr);
        } else {
          currentWebSocket.send(msgStr);
          return;
        }

        setTimeout(() => currentWebSocket.send(msgStr), 500);
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

const connections = {}; // To st/ RTCPeerConnection
// var transceiver = null;         // RTCRtpTransceiver
// var webcamStream = null;        // MediaStream from webcam

// Output logging information to console.
globalThis.connections = connections;
function log(text) {
  var time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Output an error message to console.

function log_error(text) {
  var time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

async function createPeerConnection(target) {
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

  connections[target] = connections[target] || new RTCPeerConnection(
    rcpOpts,
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
    ordered: true, // do not guarantee order
    reliable: true,
    maxPacketLifeTime: 3000, // in milliseconds
  };

  const rtc = connections[target].createDataChannel(
    "myLabel",
    dataChannelOptions,
  );

  rtc.binaryType = "arraybuffer";

  rtc.addEventListener("message", processWsMessage);

  rtc.onerror = (error) => {
    console.log("xxxxxx-  Data Channel Error:", error);
  };

  rtc.onmessage = processWsMessage;

  rtc.onopen = () => {
    webrtcArray.push(rtc);
    connections[target].sendChannel = rtc;

    window.sendChannel = sendChannel = {
      send: (d) => {
        webrtcArray.map((ch) => ch.readyState === "open" && ch.send(d));
      },
    };
  };

  rtc.onclose = () => {
    rtc.readyState = "closed";
    console.log("xxxxxxxx- The Data Channel is Closed");
  };

  return connections[target];

  function receiveChannelCallback(event) {
    console.log("Receive Channel Callback");
    const rtc = event.channel;
    rtc.binaryType = "arraybuffer";
    rtc.addEventListener("close", onReceiveChannelClosed);

    rtc.addEventListener("message", processWsMessage);
    webrtcArray.push(rtc);
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
        target: target,
        name: username,
        type: "video-offer",
        sdp: connections[target].localDescription,
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
        target: target,
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

async function handleNewICECandidateMsg(msg, target) {
  log("*** Adding received ICE candidate: " + JSON.stringify(msg.candidate));
  var candidate = new RTCIceCandidate(msg.candidate);

  // lo
  console.log(connections[target]);
  await connections[target].addIceCandidate(candidate);
}

async function handleChatAnswerMsg(msg, target) {
  log("*** Call recipient has accepted our call");

  // Configure the remote description, which is the SDP payload
  // in our "video-answer" message.

  var desc = new RTCSessionDescription(msg.sdp);

  await connections[target].setRemoteDescription(desc).catch(console.error);
}

async function handleChatOffer(msg, target) {
  connections[target] || await createPeerConnection(target);

  // If we're not already connected, create an RTCPeerConnection
  // to be linked to the caller.

  // log("Received chat offer from " + target);
  //ed to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.

  var desc = new RTCSessionDescription(msg.sdp);

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
  } else {
    log("  - Setting remote description");
    await connections[target].setRemoteDescription(desc);
  }

  // Get the webcam stream if we don't already have it

  log("---> Creating and sending answer to caller");

  await connections[target].setLocalDescription(
    await connections[target].createAnswer(),
  );

  ws.send(JSON.stringify({
    target: target,
    user: username,
    type: "video-answer",
    sdp: connections[target].localDescription,
  }));
}

const cids = {};
async function getCID(CID, from) {
  
  if (cids[CID] && typeof cids[CID] === "string") return cids[CID];
  if (cids[CID] && typeof cids[CID] === "function") return cids[CID]();

  const requestSrt = JSON.stringify({
    type: "get-cid",
    target: from,
    cid: CID,
  });
  if (window.sendChannel) {
    window.sendChannel.send(requestSrt);
  } else {
    ws.send(requestSrt);
  }
  return new Promise((resolve) => {
    cids[CID] = resolve;
  });
}

// Called by the WebRTC layer to let us know when it's time to
// begin, resume, or restart ICE negotiation.

async function processWsMessage(event) {
  if (!sanyiProcess) {
    sanyiProcess =
      (await import(`https://code.spike.land/api/room/sanyi/js`)).processWs;
  }

  const data = JSON.parse(event.data);
  const sanyi = await sanyiProcess(
    data,
    window && !!window.sess ? window.sess : {},
    (obj) => ws.send(JSON.stringify(obj)),
  );

  if (sanyi) {
    console.log({ sanyi });
    return;
  }

  if (data.code && !window.sess && !window.location.href.endsWith("/public")) {
    const session = {
      code: data.code,
      errorText: "",
      changes: [],
      setChild: () => {},
      transpiled: data.transpiled,
      html: data.html,
      i: data.i,
      css: data.css,
    };
    const { quickStart } = await import("./quickStart.mjs");
    quickStart(session);
    return;
  }

  if (
    data.name && data.hashOfCode && data.name !== username &&
    !connections[data.name]
  ) {
    try {
      await createPeerConnection(data.name);
      // const sendChannel = connections[target].createDataChannel(
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
      // const offer = await connections[target].createOffer();
      // console.log({offer});
    } catch (e) {
      console.log({ e });
      log_error("Error with p2p");
    }
  }
  if (data.type === "new-ice-candidate") {
    await handleNewICECandidateMsg(data, data.name);
    return;
  }

  if (data.type === "video-offer") {
    await handleChatOffer(data, data.name);
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
          JSON.stringify({ type: "get-cid", target: data.name, cid: CID, [CID]: window[CID] }),
        );
      }
    }

    return;
  }

  if (window.sess && data.i && data.i <= window.sess.i) {
    return;
  }

  if (data.type === "video-answer") {
    await handleChatAnswerMsg(data, data.name);

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
