/** @jsxImportSource @emotion/react */

import "core-js/full";

import {
  hashCode,
  makePatch,
  makePatchFrom,
  mST,
  patch as applyPatch,
  startSession,
} from "./session";
import type { ICodeSession } from "./session";
import { appFactory, renderApp } from "./starter";
import debounce from "lodash/debounce";
import uidV4 from "./uidV4.mjs";

const webRtcArray: (RTCDataChannel & { target: string })[] = [];

export const { codeSpace } = self;
let { address } = self;

globalThis.codeSpace = codeSpace;
globalThis.address = address;

const user = ((self && self.crypto && self.crypto.randomUUID &&
  self.crypto.randomUUID()) || (uidV4())).slice(
    0,
    8,
  );

const connections: {
  [target: string]: RTCPeerConnection;
} = {}; // To st/ RTCPeerConnection

globalThis.connections = globalThis.connections || connections;

let wsLastHashCode = 0;
let webRTCLastSeenHashCode = 0;
let lastSeenTimestamp = 0;
let lastSeenNow = 0;
let ws: WebSocket | null = null;
let sendWS: (msg: string) => void;
let rejoined = false;
const sendChannel = {
  webRtcArray,
  connections: connections,
  send: ((data: { [key: string]: string | number }) => {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user,
    });
    webRtcArray.map((ch) => {
      try {
        console.log("WebRtc send", data, ch);

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

export const run = async () => {
  appFactory(window.startState.transpiled);

  if (location.href.endsWith("hydrated")) return;

  join();
};

startSession(codeSpace, {
  name: user,
  state: window.startState,
});

let intervalHandler: NodeJS.Timer | null = null;

// const w = window as unknown as {
//   sess: {
//     editor: typeof monaco.editor;

//     // eslint-disable-next-line no-unused-vars
//     update: (code: string) => void;
//   };\
// };

const chCode = async () => {
  if (connections !== globalThis.connections) return;
  const { code, transpiled, i } = mST();
  const { prettier } = await import("./prettierEsm");
  if (globalThis.editor) {
    const formatted = prettier(globalThis.editor.getModel()!.getValue());

    if (code === formatted) return;
  }

  if (globalThis.aceEditor) {
    const formatted = prettier(globalThis.aceEditor.getValue());

    if (code === formatted) return;
  }

  try {
    if (globalThis.transpiled === transpiled) return;

    await appFactory(transpiled);

    if (globalThis.editor.getModel() || globalThis.aceEditor) {
      console.log("MODEL SET FROM REMOTE.... SORRY");

      setTimeout(() => {
        const mst = mST();
        if (mst.i === i) {
          if (globalThis.editor.getModel()) {
            globalThis.editor.getModel()!.setValue(mst.code);
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
  if (event.data.ignoreUser && event.data.ignoreUser === user) return;
  console.log({ event });

  if (
    event.data.codeSpace === codeSpace && event.data.address && !address
  ) {
    ws?.send(JSON.stringify({ codeSpace, address: event.data.address }));
  }

  if (event.data.ignoreUser) {
    !ignoreUsers.includes(event.data.ignoreUser) &&
      ignoreUsers.push(event.data.ignoreUser);
  }

  if (
    event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code
  ) {
    const messageData = await makePatch(event.data.sess);
    await applyPatch(messageData);
    await chCode();
  }
};

export async function saveCode(sess: ICodeSession) {
  if (connections !== globalThis.connections) return;

  if (sess.i <= mST().i) return;

  const messageData = await makePatch(sess);
  await applyPatch(messageData);

  await chCode();

  (async () => {
    if (Object.keys(connections).length == 0) return;
    try {
      const message = webRTCLastSeenHashCode
        ? await makePatchFrom(
          webRTCLastSeenHashCode,
          sess,
        )
        : await makePatch(sess);
      if (message && message.patch !== "") {
        console.log("sendRTC");
        sendChannel.send(message);
      }
    } catch (e) {
      console.error("Error sending RTC...", { e });
    }
  })();

  if (ws) {
    console.log({ wsLastHashCode });
    const message = await makePatchFrom(
      wsLastHashCode,
      sess,
    );

    await applyPatch(message);
    if (message.newHash !== hashCode()) {
      console.error("NEW hash is not even hashCode", hashCode());
      return;
    }

    const messageString = JSON.stringify({ ...message, name: user });
    sendWS(messageString);
  } else {
    rejoined = false;
    await rejoin();
  }
}

export async function join() {
  if (ws !== null) return ws;

  if (connections !== globalThis.connections) return ws;
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
        ws && ws?.send && ws?.send(data);
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
    //     ws?.send(JSON.stringify({
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
  await quickStart();

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

  if (data.newHash === hashCode()) return;

  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash) return;

    h[data.oldHash] = data.newHash;
  }

  if (data.newHash === hashCode()) return;

  (async () => {
    try {
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }

      if (data.type === "offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }

      if (data.type === "answer") {
        await handleChatAnswerMessage(data.answer, data.name);

        return;
      }
      if (
        data.name && data.name !== user &&
        !connections[data.name as keyof typeof connections]
      ) {
        await createPeerConnection(data.name);
        return;
      }
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
    }
  })();

  if (data.patch && data.name !== user) {
    if (data.newHash === hashCode()) {
      return;
    }

    await applyPatch(data);

    if (data.newHash === hashCode()) {
      await chCode();

      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }

      return;
    } else {
      console.log("error -sending on sendChannel");
    }

    return;
  }

  if (data.name === user) {
    return;
  }

  function createPeerConnection(target: string) {
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

        ws?.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate.toJSON(),
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
          log("The connection isn't stable yet; postponing...");
          return;
        }

        // Establish the offer as the local peer's current
        // description.

        log("---> Setting local description to the offer");
        await connections[target].setLocalDescription(offer);

        // Send the offer to the remote peer.

        log("---> Sending the offer to the remote peer");
        ws?.send(JSON.stringify({
          target,
          name: user,
          type: "offer",
          offer: connections[target].localDescription,
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
    answer: RTCSessionDescriptionInit,
    target: string,
  ) {
    log("*** Call recipient has accepted our call");

    // Configure the remote description, which is the SDP payload
    // in our "answer" message.
    // const desc = new RTCSessionDescription(message);

    await connections[target].setRemoteDescription(
      new RTCSessionDescription(
        answer,
      ),
    ).catch(console.error);
  }

  async function handleChatOffer(
    offer: RTCSessionDescriptionInit,
    target: string,
  ) {
    if (!connections[target]) createPeerConnection(target);

    // const desc = new RTCSessionDescription(message);

    await connections[target].setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    // if (connections[target].signalingState != "stable") {
    //   log("  - But the signaling state isn't stable, so triggering rollback");

    //   await Promise.all([
    //     connections[target].setLocalDescription({ type: "rollback" }),
    //     connections[target].setRemoteDescription(new RTCSessionDescription(offer)),
    //   ]);
    //   return;
    // }

    // log("  - Setting remote description");
    // await connections[target].setRemoteDescription(desc);

    log("---> Creating and sending answer to caller");

    const answer = await connections[target].createAnswer();

    await connections[target].setLocalDescription(
      answer,
    );

    ws?.send(JSON.stringify({
      target,
      name: user,
      type: "answer",
      answer: answer,
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
  init: RTCIceCandidateInit,
  target: string,
) {
  log(
    "*** Adding received ICE candidate: " + JSON.stringify(init),
  );
  const candidate = new RTCIceCandidate(init);
  // const candidate = new RTCIceCandidate(message);

  console.log(connections[target]);
  await connections[target].addIceCandidate(candidate);
}

type RTCSdpType = "answer" | "offer";

interface RTCIceCandidateInit {
  sdp: string;
  type: RTCSdpType;
}
