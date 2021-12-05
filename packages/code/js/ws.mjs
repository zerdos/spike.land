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
          ws.send(
            JSON.stringify({ name: username, time: lastSeenTimestamp + diff }),
          );
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
    if (data.name && data.name !== username && targetUsername ==null){
      targetUsername = data.name;
      try{
        await createPeerConnection();
        // const offer = await myPeerConnection.createOffer();
        // console.log({offer});
      } catch(e){
        console.log({e});
        log_error("Error with p2p");
      }
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
  const { restart } = await import(`../dist/dev.mjs`);
  await restart(code, target);

  window.restartCode = (c) => restart(c, document.getElementById("zbody"));
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

var connection = null;
var clientID = 0;

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

var mediaConstraints = {
  audio: true,            // We want an audio track
  video: {
    aspectRatio: {
      ideal: 1.333333     // 3:2 aspect is preferred
    }
  }
};

var targetUsername = null;      // To store username of other peer
var myPeerConnection = null;    // RTCPeerConnection
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

myPeerConnection = new RTCPeerConnection({
  iceServers: ['stun.l.google.com:19302',
    'stun.linea7.net:3478',
    'stun.linphone.org:3478',
    'stun.lowratevoip.com'].map((url)=>({urls: `stun:${url}`}))
});

// Set up event handlers for the ICE negotiation process.

myPeerConnection.onicecandidate = handleICECandidateEvent;
myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
myPeerConnection.ontrack = handleTrackEvent;
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
    log("     -- The connection isn't stable yet; postponing...")
    return;
  }

  // Establish the offer as the local peer's current
  // description.

  log("---> Setting local description to the offer");
  await myPeerConnection.setLocalDescription(offer);

  // Send the offer to the remote peer.

  log("---> Sending the offer to the remote peer");
  sendToServer({
    name: username,
    target: targetUsername,
    type: "video-offer",
    sdp: myPeerConnection.localDescription
  });
} catch(err) {
  log("*** The following error occurred while handling the negotiationneeded event:");
  reportError(err);
};
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
  log("*** Outgoing ICE candidate: " + event.candidate.candidate);

  ws.send(JSON.stringify({
    type: "new-ice-candidate",
    target: targetUsername,
    candidate: event.candidate
  }));
}
}

// Handle |iceconnectionstatechange| events. This will detect
// when the ICE connection is closed, failed, or disconnected.
//
// This is called when the state of the ICE agent changes.

function handleICEConnectionStateChangeEvent(event) {
log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);

switch(myPeerConnection.iceConnectionState) {
  case "closed":
  case "failed":
  case "disconnected":
    closeVideoCall();
    break;
}
}

// Set up a |signalingstatechange| event handler. This will detect when
// the signaling connection is closed.
//
// NOTE: This will actually move to the new RTCPeerConnectionState enum
// returned in the property RTCPeerConnection.connectionState when
// browsers catch up with the latest version of the specification!

function handleSignalingStateChangeEvent(event) {
log("*** WebRTC signaling state changed to: " + myPeerConnection.signalingState);
switch(myPeerConnection.signalingState) {
  case "closed":
    closeVideoCall();
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

function handleICEGatheringStateChangeEvent(event) {
log("*** ICE gathering state changed to: " + myPeerConnection.iceGatheringState);
}
