// Import "core-js/full";
// Object.assign(globalThis, require("buffer/"));
// Object.assign(globalThis, require("stream-browserify"));

// import 'css-paint-polyfill
import AVLTree from "avl";
import debounce from "lodash.debounce";
import adapter from "webrtc-adapter";
import { applyPatch, hashCode, makePatch, makePatchFrom, mST, onSessionUpdate, startSession } from "./session";

// Import * as FS from '@isomorphic-git/lightning-fs';

// import { renderPreviewWindow } from "./renderPreviewWindow";

import { renderPreviewWindow } from "renderPreviewWindow";
import { md5 } from "./md5"; // import { wait } from "wait";
import type { ICodeSession } from "./session";
import uidV4 from "./uidV4.mjs";
import { wait } from "./wait.js";

// Import PubSubRoom from 'ipfs-pubsub-room'

const users = new AVLTree(
  (a: string, b: string) => a === b ? 0 : a < b ? 1 : -1,
  true,
);

const webRtcArray: Array<RTCDataChannel & { target: string }> = [];

const user = md5(((self && self.crypto && self.crypto.randomUUID
  && self.crypto.randomUUID()) || (uidV4())).slice(
    0,
    8,
  ));

users.insert(user);
const rtcConns: Record<string, RTCPeerConnection> = {}; // To st/ RTCPeerConnection
let bc: BroadcastChannel;

let codeSpace: string;
let _hash = "";

// let address: string;
let wsLastHashCode = "";
let webRTCLastSeenHashCode = "";
let lastSeenTimestamp = 0;
let lastSeenNow = 0;
let ws: WebSocket | null = null;
let rejoined = false;
const tracks: {
  [key: string]: {
    track: MediaStreamTrack;
    streams: readonly MediaStream[];
    vidElement: HTMLVideoElement;
  };
} = {};
const wsConns: {
  [key: string]: {
    send: (data: string) => boolean;
  };
} = {};
let pingHandler: NodeJS.Timeout;
export const sendChannel = {
  localStream: null as MediaStream | null,
  webRtcArray,
  tracks,
  user,
  i: 0,
  users,
  vidElement: document.createElement("video"),
  stopVideo,
  startVideo,
  rtcConns,
  wsConns,
  send(d: any) {
    if (pingHandler) clearTimeout(pingHandler);
    pingHandler = setTimeout(() => {
      sendChannel.send({ name: user, hashCode: hashCode(), type: "ping" });
    }, Math.random() * 20_000);

    console.log(d);

    const me = users.find(user);

    const left = me?.left;
    const right = me?.right;
    const parent = me?.parent;

    // const target = data.target;
    const data = JSON.stringify({
      i: d.i || (sendChannel.i + 1),
      ...d,
      name: d.name || user,
    });

    const sendToUser = (u: string) => {
      webRtcArray.find(t => t.target === u)?.send(data) || wsConns[u]?.send(data) && users.remove(u);
    };
    const target = d.target;
    if (target) {
      if (target === user) {
        return;
      }
      if (target === left?.data) return sendToUser(left?.key!);
      if (target === right?.data) return sendToUser(right?.key!);
      if (parent === left?.data) return sendToUser(parent?.key!);

      if (target < user) {
        sendToUser(left?.key!);

        if (parent! < user!) sendToUser(parent?.key!);
      }

      if (target > user) {
        sendToUser(right?.key!);

        if (parent! > user!) sendToUser(parent?.key!);
      }
    }

    [...Object.keys(wsConns), ...(webRtcArray.map(x => x.target))].map((u) => {
      try {
        // console.//log("WebRtc send", data, ch);
        if (u in [left!.key!, right!.key, parent!.key]) {
          sendToUser(u);
        }
      } catch (error) {
        // console.error("Error in broadcasting event", { e: error });
      }
    });
  },
};
sendChannel.vidElement.playsInline = true;
sendChannel.vidElement.autoplay = true;

Object.assign(globalThis, { sendChannel, mST, users });

sendChannel.users = users;
// Let createDelta;

// export const work = async (startState: {
// mST: ICodeSession, codeSpace:string, address: string, assets: {[key: string]: string}
// }) => {
// codeSpace = startState.codeSpace;
// address = startState.address;
// const {assets}= startState;
// const session = startSession(codeSpace, {
// name: user,
// state: startState.mST,
// });

// join()

// }

export const run = async (startState: {
  mST: ICodeSession;
  codeSpace: string;
  dry: boolean;
  address: string;
}) => {
  const { mST: mst, dry, address } = startState;
  codeSpace = startState.codeSpace;

  startSession(codeSpace, {
    name: user,
    state: mst,
  }, location.origin);
  if (location.pathname === `/live/${codeSpace}`) {
    renderPreviewWindow({ codeSpace, dry: !!dry });
  }

  // await appFactory(mst.transpiled, codeSpace, dry);

  // Const {join} = await import("./rtc");

  // const conn = join(codeSpace, user, (message)=>{

  // processData(message, "rtc")
  // })

  // sendChannel.send = (message: object)=> conn.broadcast(message);

  await join();
  console.log("broadcastChannel");
  bc = new BroadcastChannel(location.origin);
  bc.postMessage({ user, type: "suggestNeighborsRequest" });
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user) {
      return;
    }

    if (
      event.data.codeSpace === codeSpace && event.data.i > sendChannel.i
    ) {
      sendChannel.i = event.data.i;
      // processData(event.data, "bc",  );
      // sendChannel.send(JSON.stringify());
    }

    if (event.data.ignoreUser) {
      !ignoreUsers.includes(event.data.ignoreUser)
        && ignoreUsers.push(event.data.ignoreUser);
    }

    if (
      event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code
    ) {
      const messageData = makePatch(event.data.sess);
      if (messageData) {
        await applyPatch(messageData);
      }
    }
  };

  onSessionUpdate(
    () => {
      debouncedSyncWs();
      // debouncedSyncRTC();

      const sess = mST();

      const hash = md5(JSON.stringify(sess));
      if (hash === _hash) return;
      _hash = hash;

      bc.postMessage({
        ignoreUser: user,
        sess,
        codeSpace,

        address,
      });
    },
    "broadcast",
  );

  // const { startIpfs } = await import("./startIpfs");
  // await startIpfs(codeSpace);
};

let intervalHandler: NodeJS.Timer;

async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;

    const newWs = await join();

    return newWs;
  }

  return ws;
}

const ignoreUsers: string[] = [];

// const debouncedSyncRTC = debounce(syncRTC, 100, {
//   trailing: true,
//   leading: true,
//   maxWait: 500,
// });

const debouncedSyncWs = debounce(syncWS, 1200, {
  trailing: true,
  leading: true,
  maxWait: 1000,
});

async function syncWS() {
  try {
    if (ws) {
      if (wsLastHashCode === hashCode()) {
        return;
      }

      const sess = mST();
      // console.//log({ wsLastHashCode });

      const message = await makePatchFrom(
        wsLastHashCode,
        sess,
      );

      if (!message) {
        return;
      }

      if (message.newHash !== hashCode()) {
        // console.error("NEW hash is not even hashCode", hashCode());
        return;
      }

      const messageString = JSON.stringify({ ...message, name: user });
      sendChannel.send(messageString);
    } else {
      rejoined = false;
      await rejoin();
    }
  } catch (error) {
    // console.error("error 2", { e: error });
  }
}
async function stopVideo() {
  if (!sendChannel.localStream) return;
}

async function startVideo() {
  console.log({ adapter });

  const supported = await navigator.mediaDevices.getSupportedConstraints();
  console.log({ supported });

  const mediaConstraints = {
    audio: false, // We want an audio track
    video: true, // {
    //  .. aspectRatio?: ConstrainDouble;
    // autoGainControl?: ConstrainBoolean;
    // channelCount?: ConstrainULong;
    //  deviceId?: ConstrainDOMString;
    //  echoCancellation?: ConstrainBoolean;
    //  facingMode?: ConstrainDOMString;
    // frameRate?: ConstrainDouble;
    // groupId?: ConstrainDOMString;
    // height?: ConstrainULong;
    // latency?: ConstrainDouble;
    // noiseSuppression?: ConstrainBoolean;
    // sampleRate?: ConstrainULong;
    // sampleSize?: ConstrainULong;
    // suppressLocalAudioPlayback?: ConstrainBoolean;
    // width?: ConstrainULong;
    // }, // And we want a video track
  };

  // document.body.appendChild(sendChannel.vidElement);

  const localStream = await navigator.mediaDevices.getUserMedia(
    mediaConstraints,
  );

  handleSuccess(localStream);
  function handleSuccess(localStream: MediaStream) {
    const video = sendChannel.vidElement;
    const videoTracks = localStream.getVideoTracks();
    console.log("Got stream with constraints:", mediaConstraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    sendChannel.localStream = localStream; // make variable available to browser console
    video.srcObject = localStream;
  }

  localStream.getVideoTracks().forEach((track) =>
    Object.keys(sendChannel.rtcConns).map((k) => {
      const peerConnection = sendChannel.rtcConns[k];

      peerConnection.addTrack(track);
    })
  );
}

async function syncRTC() {
  try {
    if (Object.keys(rtcConns).length > 0) {
      if (webRTCLastSeenHashCode === hashCode()) {
        return;
      }

      const sess = mST();
      // console.//log({ wsLastHashCode });

      const message = webRTCLastSeenHashCode
        ? makePatchFrom(
          webRTCLastSeenHashCode,
          sess,
        )
        : makePatch(sess);
      if (message !== null && message.patch) {
        // console.//log("sendRTC");
        sendChannel.send(message);
      }
    }
  } catch (error) {
    // console.error("Error sending RTC...", { e: error });
  }
}

export async function join() {
  if (ws !== null) {
    return ws;
  }

  rejoined = true;

  // console.//log("WS connect!");
  if (location.origin.includes("localhost")) {
    return;
  }

  const wsConnection = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket",
  );
  rejoined = false;

  wsConnection.addEventListener("open", () => {
    // console.//log("NEW WS CONNECTION");
    ws = wsConnection;
    wsConnection.onclose = () => rejoin();
    const mess = (data: string) => {
      try {
        if (ws?.readyState === ws?.OPEN) ws && ws?.send && ws?.send(data);
        else {
          rejoin();
        }
      } catch {
        ws = null;
        rejoined = false;

        rejoin();
      }
    };

    const extendedWS = {
      send: (data: string) => {
        mess(data);
        return true;
      },
      hashCode: undefined,
      lastSeen: Date.now(),
      target: "",
    };
    ws.addEventListener(
      "message",
      (message) => processWsMessage(message, "ws", extendedWS),
    );
    // If (delta) {
    // if (delta !== deltaSent) {
    // deltaSent = delta;
    // ws?.send(JSON.stringify({
    // type: "delta",
    // }));
    // }
    // return;
    // }
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }

    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff = now - lastSeenNow;

      if (diff > 40_000) {
        try {
          if (wsConnection.readyState === wsConnection.OPEN) {
            wsConnection?.send(
              JSON.stringify({
                name: user,
                timestamp: lastSeenTimestamp + diff,
              }),
            );
            return;
          }

          rejoined = false;
          rejoin();
        } catch {
          rejoined = false;
          rejoin();
        }
      }
    }, 30_000);

    // Send user info message.
    wsConnection.send(JSON.stringify({ name: user, hashCode: hashCode(), i: ++sendChannel.i }));
    return wsConnection;
  });

  return wsConnection;
}

const h: Record<number, number> = {};

async function processWsMessage(
  event: { data: string },
  source: "ws" | "rtc",
  conn: { send: (obj: string) => boolean; hashCode: string; target: string; lastSeen: number },
) {
  conn.lastSeen = Date.now();
  console.log({ event });
  lastSeenNow = Date.now();

  console.log(typeof event.data);

  const data = JSON.parse(event.data);
  console.log("WSWSWS", { data });
  if (!data.i) return;
  if (sendChannel.i >= data.i) return;
  sendChannel.i = data.i;
  sendChannel.send(event.data);

  if (!conn.target && data.name && data.hashCode) {
    conn.target = data.name;
    conn.hashCode = data.hashCode;
    users.insert(conn.target);
  }
  if (data.name) users.insert(data.name);

  processData(data, source, conn);
}

async function processData(
  data: any,
  source: "ws" | "rtc",
  conn: { hashCode: string },
) {
  // console.//log("ws", data.name, data.oldHash, data.newHash);

  // MySession.addEvent(data);

  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (data.hashCode || data.newHash && conn) {
    conn.hashCode = data.hashCode || data.newHash;
  }

  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }

  if (source === "ws" && (data.hashCode)) {
    wsLastHashCode = data.hashCode;
  }

  if (source === "rtc" && data.hashCode || data.newHash) {
    webRTCLastSeenHashCode = data.hashCode || data.newHash;
  }

  if (ignoreUsers.includes(data.name)) {
    return;
  }

  if (data.newHash === hashCode()) {
    return;
  }

  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash) {
      return;
    }

    h[data.oldHash] = data.newHash;
  }

  if (data.newHash === hashCode()) {
    return;
  }

  (async () => {
    try {
      if (data.type === "new-ice-candidate" && data.target === user) {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }

      if (data.type === "video-offer" && data.target === user) {
        await handleChatOffer(data.offer, data.name);
        return;
      }

      if (data.type === "video-answer" && data.target === user) {
        await handleChatAnswerMessage(data.answer, data.name);

        return;
      }

      if (
        data.name && data.name !== user
        && !rtcConns[data.name] && !ignoreUsers.includes(data.name)
      ) {
        await createPeerConnection(data.name);
        const users = data.users as string[];
        const p2pUsers = users.filter((u) => u !== user && !ignoreUsers.includes(u));
        while (p2pUsers.length) {
          const nextToConnect = p2pUsers.pop();
          if (nextToConnect && !sendChannel.rtcConns[nextToConnect]) {
            createPeerConnection(nextToConnect);
          }
          await wait(500);
        }

        return;
      }
    } catch (error) {
      // console.//log({ e: error });
      //      log_error("Error with p2p");
    }
  })();

  if (data.patch && data.name !== user) {
    if (data.newHash === hashCode()) {
      return;
    }

    await applyPatch(data);

    if (data.newHash === hashCode()) {
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }

      return;
    }

    // console.//log("error -sending on sendChannel");

    return;
  }

  if (data.patch && data.name === user) {
    wsLastHashCode = data.newHash;

    return;
  }

  if (data.name === user) {
    return;
  }

  if (wsLastHashCode !== hashCode()) {
    // Const resp = await fetch(`https://spike.land/live/${codeSpace}/mST`);
    // const state = await resp.json();

    // const codePatch = await makePatch(state.mST);
    // if (codePatch.newHash === wsLastHashCode) await applyPatch(codePatch);
  }

  function createPeerConnection(target: string) {
    // log(`Setting up a connection with ${target}`);
    if (rtcConns[target]) {
      // log(`Aborting, since we have connection with this ${target}`);
      return;
    }

    // Create an RTCPeerConnection which knows to use our chosen
    // STUN server.

    rtcConns[target] = new RTCPeerConnection(
      rcpOptions,
    );

    // Set up event handlers for the ICE negotiation process.

    rtcConns[target].onicecandidate = (event) => {
      if (event.candidate) {
        // log("*** Outgoing ICE candidate: " + event.candidate);

        sendChannel.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate.toJSON(),
        }));
      }
    };

    rtcConns[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    rtcConns[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    rtcConns[target].onsignalingstatechange = () => {
      // log(
      //   "*** rtcConns[target].signalingState  changed to: " +
      //     rtcConns[target].signalingState,
      // );
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };

    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;

    rtcConns[target].ontrack = function(ev) {
      console.log("OnTack event ", ev);
      const vidElement = document.createElement("video");
      vidElement.autoplay = true;
      vidElement.playsInline = true;
      let stream;
      if (ev.streams && ev.streams[0]) {
        vidElement.srcObject = ev.streams[0];
        stream = ev.streams[0];
      } else {
        let inboundStream = new MediaStream();
        inboundStream.addTrack(ev.track);

        vidElement.srcObject = inboundStream;
        stream = inboundStream;
      }
      ev.track.onended = () => vidElement.srcObject = null;

      //  sendChannel.localStream?.addTrack(ev.track);

      sendChannel.tracks[target] = {
        track: ev.track,
        streams: [stream],
        vidElement,
      };
    };

    rtcConns[target].ondatachannel = async (event) => {
      // const cont = new AbortController();
      // const js = await build(codeSpace, mST().i, cont.signal);
      // const arrBuff = js.valueOf();

      // console.log({ js });
      users.insert(target);
      rtcConns[target];
      // event.channel.send(arrBuff as ArrayBuffer);

      // console.//log("Receive Channel Callback");
      const rtcChannel = event.channel;
      rtcChannel.binaryType = "arraybuffer";
      rtcChannel.addEventListener("close", onReceiveChannelClosed);

      if (
        sendChannel && sendChannel.localStream && sendChannel.localStream.active
      ) {
        // const src = await js;
        // sendChannel.send(JSON.stringify({ mST: mST, bundle: src }));

        sendChannel.localStream.getTracks().forEach((track) => {
          const datachannel = rtcConns[target];
          datachannel.addTrack(track);
        });
      }

      const conn = {
        send: (data: string) => {
          rtcChannel.readyState == "open";
          rtcChannel.send(data);
          return true;
        },
        hashCode: undefined,
        lastSeen: Date.now(),
        target,
      };
      rtcChannel.addEventListener(
        "message",
        async (message) =>
          processWsMessage(
            message,
            "rtc",
            conn,
            // respond: (msg)=>{},
            // broadcast: ()=>{}
          ),
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
      rtcConns[target].createDataChannel(
        target,
        dataChannelOptions,
      ),
      { target },
    );

    rtc.binaryType = "arraybuffer";

    // rtc.addEventListener("message", async (message) => {
    // console.//log("***********RTC***", { msg: message });

    // const data = JSON.parse(message.data);
    // if (data && data.hashCode) {
    // webRTCLastSeenHashCode = data.hashCode;
    // }

    // if (data && data.newHash) {
    // webRTCLastSeenHashCode = data.newHash;
    // }
    // const extendedRTC = Object.assign(rtc, {hashCode: hashCode()})
    // return processWsMessage(message, "rtc", extendedRTC);
    // });

    rtc.addEventListener("error", (error) => {
      console.log("xxxxxx-  Data Channel Error:", error);
    });

    // Rtc.onmessage = (msg) => processWsMessage(msg, "rtc");

    rtc.addEventListener("open", () => {
      // console.//log("@@@@@@@@RTC IS OPEN&&&&&&&&");
      webRtcArray.push(rtc);
      // RtcConns[target].sendChannel = rtc;
    });

    rtc.addEventListener("close", () => {
      // console.//log("xxxxxxxx- The Data Channel is Closed");
    });

    return rtcConns[target];

    function onReceiveChannelClosed() {
      // console.//log("Receive channel is closed");
      rtcConns[target].close();
      delete rtcConns[target];
      users.remove(target);
      // console.//log("Closed remote peer connection");
    }

    async function handleNegotiationNeededEvent() {
      // log("*** Negotiation needed");

      try {
        // log("---> Creating offer");
        const offer = await rtcConns[target].createOffer();

        if (rtcConns[target].signalingState != "stable") {
          // log("The connection isn't stable yet; postponing...");
          return;
        }

        // Establish the offer as the local peer's current
        // description.

        // log("---> Setting local description to the offer");
        await rtcConns[target].setLocalDescription(offer);

        // Send the offer to the remote peer.

        // log("---> Sending the offer to the remote peer");
        sendChannel.send(JSON.stringify({
          target,
          name: user,
          type: "video-offer",
          offer: rtcConns[target].localDescription,
        }));
      } catch {
        // log(
        //   "*** The following error occurred while handling the negotiationneeded event:",
        // );
      }
    }

    function handleICEConnectionStateChangeEvent() {
      // log(
      //   "*** ICE connection state changed to " +
      //     rtcConns[target].iceConnectionState,
      // );

      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }

    function handleICEGatheringStateChangeEvent() {
      // log(
      //   "*** rtcConns[target].iceGatheringState changed to: " +
      //     rtcConns[target].iceGatheringState,
      // );
    }
  }

  async function handleChatAnswerMessage(
    answer: RTCSessionDescriptionInit,
    target: string,
  ) {
    // log("*** Call recipient has accepted our call");

    // Configure the remote description, which is the SDP payload
    // in our "video-answer" message.
    // const desc = new RTCSessionDescription(message);
    if (rtcConns[target].signalingState === "stable") return;
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(
        answer,
      ),
    ).catch(console.error);
  }

  async function handleChatOffer(
    offer: RTCSessionDescriptionInit,
    target: string,
  ) {
    if (!rtcConns[target]) {
      createPeerConnection(target);
    }

    // Const desc = new RTCSessionDescription(message);

    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    // If (rtcConns[target].signalingState != "stable") {
    //// log("  - But the signaling state isn't stable, so triggering rollback");

    // await Promise.all([
    // rtcConns[target].setLocalDescription({ type: "rollback" }),
    // rtcConns[target].setRemoteDescription(new RTCSessionDescription(offer)),
    // ]);
    // return;
    // }

    //// log("  - Setting remote description");
    // await rtcConns[target].setRemoteDescription(desc);

    // log("---> Creating and sending answer to caller");

    const answer = await rtcConns[target].createAnswer();

    await rtcConns[target].setLocalDescription(
      answer,
    );

    sendChannel.send(JSON.stringify({
      target,
      name: user,
      type: "video-answer",
      answer,
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

// var transceiver = null;         //RTCRtpTransceiver
// var webcamStream = null;        //MediaStream from webcam

const rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`,
  })),
};

rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302",
}];

async function handleNewICECandidateMessage(
  init: RTCIceCandidateInit,
  target: string,
) {
  const candidate = new RTCIceCandidate(init);
  // Const candidate = new RTCIceCandidate(message);

  // console.//log(rtcConns[target]);
  await rtcConns[target].addIceCandidate(candidate);
}

// export async function sw() {
//   try {
//     navigator.serviceWorker.onmessage = async (event) => {
//       /** @type {null|ServiceWorker} */
//       const serviceWorker = event.source;
//       if (serviceWorker == null) {
//         return;
//       }

//       switch (event.data.method) {
//         case "ipfs-message-port":
//           // console.//log("Message port request");
//           // Const { connect } = await import("./ipfs.mjs");

//           // console.//log("can connect trough", { connect });
//           // await ipfsWorker();
//           //
//           //          const channel = new MessageChannel();
//           // Await connect(channel);
//           // console.//log({ channel });

//           // {
//           //   serviceWorker.postMessage({
//           //     method: "ipfs-message-port",
//           //     id: event.data.id,
//           //     port: channel.port2,
//           //   }, { transfer: [channel.port2] });
//           // }

//           // Receives request from service worker, creates a new shared worker and
//           // responds back with the message port.
//           // Note: MessagePort can be transferred only once which is why we need to
//           // create a SharedWorker each time. However a ServiceWorker is only created
//           // once (in main function) all other creations just create port to it.
//       }
//     };

//     // This is just for testing, lets us know when SW is ready.

//     // are loaded from service worker. However it could be that such a URL is loaded
//     // before the service worker was registered in which case our server just loads a blank
//     if (document.documentElement.dataset.viewer) {
//       const load = async (path: string) => {
//         const paths = path && path.split("/") || [];
//         const protocol = paths[0] || "";
//         switch (protocol) {
//           case "ipfs":
//           case "ipns": {
//             document.body.innerHTML =
//               `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
//           }
//         }
//       };

//       await load(location.pathname);
//       return;
//     }
//   } catch {
//     // console.//log("ipfs load error");
//   }
// }
