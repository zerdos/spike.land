/** @jsxImportSource @emotion/react */

import type { ICodeSession } from "./session";
import debounce from "lodash/debounce";
import uidV4 from "./uidV4.mjs";

const webRtcArray: (RTCDataChannel & { target: string })[] = [];

export const { codeSpace } = self;

const user = ((self && self.crypto && self.crypto.randomUUID &&
  self.crypto.randomUUID()) || (uidV4())).slice(
    0,
    8,
  );

const connections: {
  [target: string]: RTCPeerConnection;
} = {}; // To st/ RTCPeerConnection

let wsLastHashCode = 0;
let webRTCLastSeenHashCode = 0;
let lastSeenTimestamp = 0;
let lastSeenNow = 0;
let ws: WebSocket | null = null;
let sendWS: (msg: string) => void;
let rejoined = false;
const sendChannel = {
  webRtcArray,
  connections,
  send: ((data: { [key: string]: string | number }) => {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user,
    });
    webRtcArray.map((ch) => {
      try {
        if (ch.readyState !== "open") return;

        if (
          !target || ch.target === target && !ignoreUsers.includes(ch.target)
        ) {
          ch.send(messageString);
        }
      } catch (e) {
        console.error("Error in broadcasting event", { e });
      }
    });
  }),
};

// Let createDelta;
// let applyPatch;

const startState = window.startState || await fetch(
  `https://spike.land/live/${codeSpace}/session`,
).then((resp) => resp.json());

export const run = async () => {
  // renderApp();

  if (location.href.endsWith("hydrated")) return;

  join();
};

const { startSession } = await import("./session");

export const mySession = startSession(codeSpace, {
  name: user,
  state: startState,
});

export const mST = () => mySession.json().state;

let intervalHandler: NodeJS.Timer | null = null;

// const w = window as unknown as {
//   sess: {
//     editor: typeof monaco.editor;

//     // eslint-disable-next-line no-unused-vars
//     update: (code: string) => void;
//   };
// };

const chCode = async () => {
  const { code, transpiled, i } = mST();
  const { prettier } = await import("prettierEsm");
  if (globalThis.model) {
    const formatted = prettier(globalThis.model.getValue());

    if (code === formatted) return;
  }

  if (globalThis.aceEditor) {
    const formatted = prettier(globalThis.aceEditor.getValue());

    if (code === formatted) return;
  }

  try {
    if (globalThis.transpiled === transpiled) return;

    await globalThis.appFactory(transpiled);

    if (globalThis.model || globalThis.aceEditor) {
      console.log("MODEL SET FROM REMOTE.... SORRY");

      setTimeout(() => {
        const mst = mST();
        if (mst.i === i) {
          if (globalThis.model) {
            globalThis.model.setValue(mst.code);
          }
          if (globalThis.aceEditor) {
            globalThis.aceEditor.setValue(mst.code);
          }
        }
      }, 200);

      return;
    }
  } catch (error) {
    console.error({ e: error });
  }
};

async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;

    const newWs = await join();

    return newWs;
  }
  return ws;
}

const ignoreUsers: string[] = [];

const bc = new BroadcastChannel("spike.land");
bc.onmessage = async (event) => {
  console.log({ event });

  if (event.data.ignoreUser) {
    !ignoreUsers.includes(event.data.ignoreUser) &&
      ignoreUsers.push(event.data.ignoreUser);
  }

  if (
    event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code
  ) {
    const messageData = mySession.createPatch(event.data.sess);
    await mySession.applyPatch(messageData);
    await chCode();
  }
};

const sendRTC = debounce(sendChannel.send, 100);

export async function saveCode(sess: ICodeSession) {
  if (sess.i <= mST().i) return;

  const messageData = mySession.createPatch(sess);
  await mySession.applyPatch(messageData);

  bc.postMessage({
    codeSpace,
    ignoreUser: user,
    sess: mST(),
    messageData,
    hashCode: mySession.hashCode(),
  });

  await chCode();

  (async () => {
    try {
      const message = webRTCLastSeenHashCode
        ? await mySession.createPatchFromHashCode(
          webRTCLastSeenHashCode,
          sess,
        )
        : mySession.createPatch(sess);
      if (message && message.patch !== "") {
        sendRTC(message);
      }
    } catch (e) {
      console.error("Error sending RTC...", { e });
    }
  })();

  if (ws) {
    console.log({ wsLastHashCode });
    const message = await mySession.createPatchFromHashCode(
      wsLastHashCode,
      sess,
    );

    if (!message) {
      return;
    }

    const messageString = JSON.stringify({ ...message, name: user });
    if (message.patch !== "") {
      sendWS(messageString);
    }
  } else {
    rejoined = false;
    await rejoin();
  }
}


export async function join() {
  if (ws !== null) return ws;

  rejoined = true;

  console.log("WS connect!");

  const wsConnection = new WebSocket(
    "wss://spike.land/live/" + codeSpace + "/websocket",
  );
  rejoined = false;

  wsConnection.addEventListener("open", () => {
    console.log("NEW WS CONNECTION");
    ws = wsConnection;
    const mess = (data: string) => {
      try {
        ws && ws.send && ws.send(data);
      } catch (e) {
        ws = null;
        rejoin();
      }
    };
    sendWS = debounce(mess, 500);
    ws.addEventListener(
      "message",
      (message) => processWsMessage(message, "ws"),
    );
    // if (delta) {
    //   if (delta !== deltaSent) {
    //     deltaSent = delta;
    //     ws.send(JSON.stringify({
    //       type: "delta",
    //     }));
    //   }
    //   return;
    // }
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }

    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff = now - lastSeenNow;

      if (diff > 40_000) {
        try {
          wsConnection.send(
            JSON.stringify({
              name: user,
              timestamp: lastSeenTimestamp + diff,
            }),
          );
        } catch {
          rejoined = false;
          rejoin();
        }
      }
    }, 30_000);

    // Send user info message.
    wsConnection.send(JSON.stringify({ name: user }));
    return wsConnection;
  });

  // if (!globalThis.session) {

  // Object.assign(session, { ...mST() });
  // globalThis.session = session;

  if (location.pathname.endsWith("public") || globalThis.model) return;
  const { quickStart } = await import("./quickStart");
  quickStart();

  return wsConnection;
}

const h: { [key: number]: number } = {};

async function processWsMessage(
  event: { data: string },
  source: "ws" | "rtc",
) {
  if (ws == null) return;

  lastSeenNow = Date.now();

  const data = JSON.parse(event.data);

  console.log("ws", data.name, data.oldHash, data.newHash);

  // MySession.addEvent(data);

  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }

  if (source === "ws" && (data.hashCode || data.newHash)) {
    wsLastHashCode = data.hashCode || data.newHash;
  }
  if (source === "rtc" && data.hashCode || data.newHash) {
    webRTCLastSeenHashCode = data.hashCode || data.newHash;
  }

  if (ignoreUsers.includes(data.name)) return;

  if (data.newHash === mySession.hashCode()) return;

  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash) return;

    h[data.oldHash] = data.newHash;
  }

  if (data.newHash === mySession.hashCode()) return;

  (async () => {
    try {
      if (
        data.name && data.name !== user &&
        !connections[data.name as keyof typeof connections]
      ) {
        await createPeerConnection(data.name);
        return;
      }

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
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
    }
  })();

  if (data.patch && data.name !== user) {
    if (data.newHash === mySession.hashCode()) {
      return;
    }

    await mySession.applyPatch({
      oldHash: data.oldHash,
      newHash: data.newHash,
      patch: data.patch,
    });

    if (data.newHash === mySession.hashCode()) {
      await chCode();

      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }

      return;
    } else {
      console.log("error -sending on sendChannel");
    }

    if (wsLastHashCode !== mySession.hashCode()) {
      console.log("there is an error. fetch tje state....");

      const resp = await fetch(
        `https://spike.land/live/${codeSpace}/session`,
      );
      const data = await resp.json();

      const messageData = mySession.createPatch(data);
      console.log("APPLYING PATCH AGAIN");
      await mySession.applyPatch(messageData);
      await chCode();
      if (sendChannel) {
        sendChannel.send({ hashCode: messageData.newHash });
      }
    }

    if (data.code && data.transpiled) {
      const messageData = mySession.createPatch(data);
      console.log("APPLYING PATCH AGAIN");
      await mySession.applyPatch(messageData);
      await chCode();
      if (sendChannel) {
        sendChannel.send({ hashCode: messageData.newHash });
      }

      return;
    }

    return;
  }

  if (data.name === user) {
    return;
  }

  async function createPeerConnection(target: string) {
    log(`Setting up a connection with ${target}`);
    if (connections[target]) {
      log(`Aborting, since we have connection with this ${target}`);
      return;
    }

    // Create an RTCPeerConnection which knows to use our chosen
    // STUN server.

    connections[target] = new RTCPeerConnection(
      rcpOptions,
    );

    // Set up event handlers for the ICE negotiation process.

    connections[target].onicecandidate = (event) => {
      if (event.candidate) {
        log("*** Outgoing ICE candidate: " + event.candidate);

        ws!.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate,
        }));
      }
    };
    connections[target].oniceconnectionstatechange =
      handleICEConnectionStateChangeEvent;
    connections[target].onicegatheringstatechange =
      handleICEGatheringStateChangeEvent;
    connections[target].onsignalingstatechange = () => {
      log(
        "*** connections[target].signalingState  changed to: " +
          connections[target].signalingState,
      );
      switch (connections[target].signalingState) {
        case "closed":
          break;
      }
    };
    connections[target].onnegotiationneeded = handleNegotiationNeededEvent;
    connections[target].ontrack = (ev) => console.log(ev);

    connections[target].ondatachannel = (event) => {
      console.log("Receive Channel Callback");
      const rtc = event.channel;
      rtc.binaryType = "arraybuffer";
      rtc.addEventListener("close", onReceiveChannelClosed);

      rtc.addEventListener(
        "message",
        (message) => processWsMessage(message, "rtc"),
      );
      const rtcWithTarget = Object.assign(rtc, { target });
      webRtcArray.push(rtcWithTarget);
    };

    const dataChannelOptions = {
      ordered: true, // Do not guarantee order
      reliable: true,
      maxPacketLifeTime: 3000, // In milliseconds
    };

    const rtc = Object.assign(
      connections[target].createDataChannel(
        target,
        dataChannelOptions,
      ),
      { target },
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
      webRtcArray.push(rtc);
      // connections[target].sendChannel = rtc;
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

        // Establish the offer as the local peer's current
        // description.

        log("---> Setting local description to the offer");
        await connections[target].setLocalDescription(offer);

        // Send the offer to the remote peer.

        log("---> Sending the offer to the remote peer");
        ws!.send(JSON.stringify({
          target,
          name: user,
          type: "offer",
          sdp: connections[target].localDescription,
        }));
      } catch {
        log(
          "*** The following error occurred while handling the negotiationneeded event:",
        );
      }
    }

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

    function handleICEGatheringStateChangeEvent() {
      log(
        "*** connections[target].iceGatheringState changed to: " +
          connections[target].iceGatheringState,
      );
    }
  }

  async function handleChatAnswerMessage(
    message: { sdp: RTCSessionDescriptionInit },
    target: string,
  ) {
    log("*** Call recipient has accepted our call");

    // Configure the remote description, which is the SDP payload
    // in our "answer" message.

    const desc = new RTCSessionDescription(
      message.sdp,
    );
    // const desc = new RTCSessionDescription(message);

    await connections[target].setRemoteDescription(desc).catch(console.error);
  }

  async function handleChatOffer(
    message: { sdp: RTCSessionDescriptionInit },
    target: string,
  ) {
    if (!connections[target]) await createPeerConnection(target);

    if (!message.sdp) return;

    const desc = new RTCSessionDescription(message.sdp);
    // const desc = new RTCSessionDescription(message);

    if (connections[target].signalingState != "stable") {
      log("  - But the signaling state isn't stable, so triggering rollback");

      await Promise.all([
        connections[target].setLocalDescription({ type: "rollback" }),
        connections[target].setRemoteDescription(desc),
      ]);
      return;
    }

    log("  - Setting remote description");
    await connections[target].setRemoteDescription(desc);

    log("---> Creating and sending answer to caller");

    await connections[target].setLocalDescription(
      await connections[target].createAnswer(),
    );

    ws!.send(JSON.stringify({
      target,
      name: user,
      type: "answer",
      sdp: connections[target].localDescription,
    }));
  }
}

// Create the RTCPeerConnection which knows how to talk to our
// selected STUN/TURN server and then uses getUserMedia() to find
// our camera and microphone and add that stream to the connection for
// use in our video call. Then we configure event handlers to get
// needed notifications on the call.

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

// var transceiver = null;         // RTCRtpTransceiver
// var webcamStream = null;        // MediaStream from webcam

// Output logging information to console.
function log(text: string) {
  const time = new Date();

  console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Output an error message to console.

function log_error(text: string) {
  const time = new Date();

  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}

const rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`,
  })),
};

rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302",
}];

interface RTCIceCandidateInit {
  candidate?: string;
  sdpMLineIndex?: number | null;
  sdpMid?: string | null;
  usernameFragment?: string | null;
}

async function handleNewICECandidateMessage(
  message: {
    candidate: RTCIceCandidateInit;
  },
  target: string,
) {
  log(
    "*** Adding received ICE candidate: " + JSON.stringify(message.candidate),
  );
  const candidate = new RTCIceCandidate(message.candidate);
  // const candidate = new RTCIceCandidate(message);

  console.log(connections[target]);
  await connections[target].addIceCandidate(candidate);
}

type RTCSdpType = "answer" | "offer" | "pranswer" | "rollback";

interface RTCSessionDescriptionInit {
  sdp?: string;
  type: RTCSdpType;
}
