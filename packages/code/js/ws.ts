// Object.assign(globalThis, require("buffer/"));
// Object.assign(globalThis, require("stream-browserify"));

// import 'css-paint-polyfill
import AVLTree from "avl";
// import debounce from "lodash.debounce";
// import P2PCF from "p2pcf";
import adapter from "webrtc-adapter";
import {
  applyPatch,
  type CodePatch,
  type Delta,
  // type Delta,
  // CodeSession,
  hashCode,
  makePatch,
  // makePatch,
  // makePatchFrom,
  mST,
  // onSessionUpdate,
  startSession,
  syncStorage,
} from "./session";

import localForage from "localforage";

// Import * as FS from '@isomorphic/-git/lightning-fs';

// import { renderPreviewWindow } from "./renderPreviewWindow";

// import { esmTransform } from "runner";
import * as fs from "./fs";
import { md5 } from "./md5"; // import { wait } from "wait";
// import { prettierJs } from "./prettierEsm";
import { renderPreviewWindow } from "./renderPreviewWindow";
import { ab2str } from "./sab";
import type { ICodeSession } from "./session";
import uidV4 from "./uidV4.mjs";
import { wait } from "./wait";

// import { isBuffer } from "util";

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
// let bc: BroadcastChannel;

// let _hash = "";

// let address: string;
let wsLastHashCode = "";
// let webRTCLastSeenHashCode = "";
// let lastSeenTimestamp = 0;
// let lastSeenNow = 0;

// let sendWS: (message: string) => void;
// let rejoined = false;
const tracks: {
  [key: string]: {
    track: MediaStreamTrack;
    streams: readonly MediaStream[];
    vidElement: HTMLVideoElement;
  };
} = {};
export const sendChannel = {
  localStream: null as MediaStream | null,
  webRtcArray,
  tracks,
  user,
  vidElement: document.createElement("video"),
  stopVideo,
  startVideo,
  rtcConns,
  send(data: any) {
    // const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user,
    });
    webRtcArray.map((ch) => {
      try {
        // console.//log("WebRtc send", data, ch);

        if (ch.readyState !== "open") {
          return;
        }

        if (
          !data.target
          || ch.target === data.target && !ignoreUsers.includes(ch.target)
        ) {
          ch.send(messageString);
        }
      } catch (error) {
        // console.error("Error in broadcasting event", { e: error });
      }
    });
  },
};
sendChannel.vidElement.playsInline = true;
sendChannel.vidElement.autoplay = true;

Object.assign(globalThis, { sendChannel, mST });

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
const codeSpace = location.pathname.slice(1).split("/")[1];

// const client_id = user;
// const room_id = codeSpace + "_" + md5(location.origin).slice(0, 4);

const codeHistory = localForage.createInstance({
  name: location.origin + `/live/${codeSpace}`,
});

// const p2pcf = new P2PCF(client_id, room_id, {
// Worker URL (optional) - if left out, will use a public worker
// workerUrl: "https://signal.spike.land",

// STUN ICE servers (optional)
// If left out, will use public STUN from Google + Twilio
// stunIceServers: { ... },

// TURN ICE servers (optional)
// If left out, will use openrelay public TURN servers from metered.ca
// turnIceServers: { ... },

// Network change poll interval (milliseconds, optional, default: 15000, 15 seconds)
// Interval to poll STUN for network changes + reconnect
// networkChangePollIntervalMs: ...,

// State expiration interval (milliseconds, optional, default: 120000, 2 minutes)
// Timeout interval for peers during polling
// stateExpirationIntervalMs: ...,

// State heartbeat interval (milliseconds, optional, default: 30000, 30 seconds)
// Time before expiration to heartbeat
// stateHeartbeatWindowMs: ...,

// Fast polling rate (milliseconds, optional, default: 750)
// Polling rate during state transitions
// fastPollingRateMs: ...,

// Slow polling rate (milliseconds, optional, default: 1500, 1.5 seconds)
// Polling rate when state is idle
// slowPollingRateMs: ...,

// Options to pass to RTCPeerConnection constructor (optional)
// rtcPeerConnectionOptions: {},

// Proprietary constraints to pass to RTCPeerConnection constructor (optional)
// rtcPeerConnectionProprietaryConstraints: {},

// SDP transform function (optional)
// sdpTransform: (sdp) => sdp,
// });

// p2pcf.start();

// p2pcf.on("peerconnect", (peer) => {
// New peer connected

// Peer is an instance of simple-peer (https://github.com/feross/simple-peer)
//
// The peer has two custom fields:
// - id (a per session unique id)
// - client_id (which was passed to their P2PCF constructor)

// console.log("New peer:", peer.id, peer.client_id);

// peer.on("track", (track, stream) => {
//   console.log("TRck");
//   console.log(track, stream);
//   // New media track + stream from peer
// });

// Add a media stream to the peer to start sending it
// peer.addStream(new MediaStream(...))
// });

// p2pcf.on("peerclose", (peer) => {
//   console.log("peerclose", peer);
//   // Peer has isconnected
// });

// p2pcf.on("msg", (peer, data) => {
//   const msg = new TextDecoder().decode(data);
//   console.log(peer.id, msg);

//   // Received data from peer (data is an ArrayBuffer)
// });

// Broadcast a message via data channel to all peers
// globalThis.broadcast = (msg: string) => {
// var enc = new TextEncoder("utf-8");

// p2pcf.broadcast(enc.encode(msg));
// };

// To send a message via data channel to just one peer:
// p2pcf.send(peer, new ArrayBuffer(...))
// bc = new BroadcastChannel(location.origin);
let messagePort: MessagePort;
// console.log("Yo 0");

// });

const ws = {
  send: (
    mess: {
      oldHash?: string;
      newHash?: string;
      name?: string;
      i?: number;
      code?: string;
      transpiled?: string;
      sess?: ICodeSession;
      type?: string;
      target?: string;
      candidate?: RTCIceCandidateInit;
      answer?: RTCSessionDescriptionInit;
      offer?: RTCSessionDescription;
      reversePatch?: Delta[];
      patch?: Delta[];
    },
  ) => console.log("JUST A STUB", { mess }),
};

export const run = async () => {
  // const { readdir, mkdir, writeFile } = fs.promises;
  const root = await fs.readdir("/");
  console.log("******************");

  console.log("******************");
  console.log("******************");
  console.log("******************");
  console.log({ root });
  console.log("******************");
  console.log("******************");
  console.log("******************");

  if (!root.includes("live")) await fs.mkdir("/live");
  const live = await fs.readdir("/live");
  if (!live.includes(codeSpace)) await fs.mkdir("/live/" + codeSpace);

  // if (!liveStat.isDirectory())
  // else console.log("dir already )(exists")
  const cs = await fs.readdir(`/live/${codeSpace}`);
  // const code = await fs.promises.readFile(`/live/${codeSpace}/index.tsx`)
  const mst = await import(`/live/${codeSpace}/mST.mjs`).then(({ mST }) => mST);
  if (!cs.includes("index.tsx")) {
    await fs.writeFile(
      `/live/${codeSpace}/index.tsx`,
      mst.code,
    );
  }
  mst.code = await fs.readFile(
    `/live/${codeSpace}/index.tsx`,
  );
  if (cs.includes("render.tsx")) {
    await fs.unlink(`/live/${codeSpace}/render.tsx`);
  }

  await fs.writeFile(
    `/live/${codeSpace}/render.tsx`,
    `
import { createRoot } from "react-dom/client";
import App from "/live/${codeSpace}/index.js";

export default App;

export const render = async (rootEl: HTMLDivElement) => {
	const root = createRoot(rootEl);


	return root.render(<App />);
};
  `,
  );

  console.log({ fs });
  const codeHistory = localForage.createInstance({
    name: location.origin + `/live/${codeSpace}`,
  });
  // const db = self.dbs[codeSpace];
  const head = await codeHistory.getItem<string>("head");
  let hST: ICodeSession | null = null;
  if (head) {
    hST = await codeHistory.getItem<ICodeSession>(head);
  }
  // const mst = ({ ...x, mST: { ...startState.mST, ...(hST ? hST : {}) } }).mSTπhy

  // codeSpace = startState.codeSpace;
  // requestAnimationFrame(() => {
  const sharedWorker = new SharedWorker(
    "/sharedWorker.js?" + globalThis.assetHash,
  );

  sharedWorker.port.onmessage = async (ev) => {
    console.log("ONMESSAGE", { data: ev.data });
    if (ev.data.type === "onconnect") {
      messagePort = sharedWorker.port;
      console.log("POST ONCONNECT", { codeSpace, name: user });
      // messagePort = this;
      ws.send = (
        message: {
          oldHash?: string;
          newHash?: string;
          reversePatch?: Delta[];
          patch?: Delta[];
        },
      ) => {
        const messageData = { codeSpace, name: user, ...message, sess: mST() };
        console.log("POST MESSAGE", { messageData });
        if (
          messageData.oldHash && messageData.oldHash === messageData.newHash
        ) return;
        messagePort.postMessage(messageData);
      }, messagePort.postMessage({ codeSpace, type: "handshake", name: user });
    } else {
      try {
        await processData(JSON.parse(ab2str(ev.data)), "ws");
        console.log("its a buffer");
      } catch (err) {
        console.error("not a buff", { err, data: ev.data });
      }
      // }
    }
  };
  sharedWorker.port.start();

  // setTimeout(() => {
  // });
  wsLastHashCode = md5(mst.transpiled);
  // globalThis.sharedWorker.port.postMessage({ name: user, codeSpace, hashCode: md5(mst.transpiled), sess: mst });

  startSession(codeSpace, {
    name: user,
    state: mst,
  });
  // }, location.origin);
  if (location.pathname === `/live/${codeSpace}`) {
    renderPreviewWindow({ codeSpace, dry: false });
  }

  // await appFactory(mst.transpiled, codeSpace, dry);

  // Const {join} = await import("./rtc");

  // const conn = join(codeSpace, user, (message)=>{

  // processData(message, "rtc")
  // })

  // sendChannel.send = (message: object)=> conn.broadcast(message);

  // await join();
  // console.log("broadcastChannel");
  // bc.postMessage({ user, type: "suggestNeighborsRequest" });
  // bc.onmessage = async (event) => {
  //   if (event.data.ignoreUser && event.data.ignoreUser === user) {
  //     return;
  //   }
  //   if (
  //     event.data.codeSpace === codeSpace && event.data.name
  //   ) {
  //     processData(event.data, "ws", { hashCode: hashCode() });
  //   }

  //   if (
  //     event.data.user !== user
  //     && event.data.type === "suggestNeighborsRequest"
  //   ) {
  //   }

  //   if (
  //     event.data.codeSpace === codeSpace && event.data.address && !address
  //   ) {
  //     ws.send({ codeSpace, address: event.data.address });
  //   }

  //   if (event.data.ignoreUser) {
  //     !ignoreUsers.includes(event.data.ignoreUser)
  //       && ignoreUsers.push(event.data.ignoreUser);
  //   }

  //   if (
  //     event.data.codeSpace === codeSpace && event.data.sess && event.data.sess.code !== mST().code
  //   ) {
  //     const messageData = makePatch(event.data.sess);
  //     if (messageData) {
  //       applyPatch(messageData);
  //     }
  //   }
  // };

  // onSessionUpdate(
  //   () => {
  //     syncWS();
  //     debouncedSyncRTC();

  //     const sess = mST();

  //     const hash = md5(JSON.stringify(sess));
  //     if (hash === _hash) return;
  //     _hash = hash;

  //     // bc.postMessage({
  //     //   ignoreUser: user,
  //     //   sess,
  //     //   codeSpace,

  //     //   address,
  //     // });
  //   },
  //   "broadcast",
  // );

  // const { startIpfs } = await import("./startIpfs");
  // await startIpfs(codeSpace);
};

// let intervalHandler: NodeJS.Timer;

// async function rejoin() {
//   if (!rejoined || ws === null) {
//     ws = null;

//     const newWs = await join();

//     return newWs;
//   }

//   return ws;
// }

const ignoreUsers: string[] = [];

// const debouncedSyncRTC = debounce(syncRTC, 100, {
//   trailing: true,
//   leading: true,
//   maxWait: 500,
// });

const syncDb = async (
  oldSession: ICodeSession,
  newSession: ICodeSession,
  message: CodePatch,
) =>
  await syncStorage(
    async (key: string, value: unknown) => await codeHistory.setItem(key, value),
    async (key: string) => await codeHistory.getItem(key),
    oldSession,
    newSession,
    message,
  );
// const hashOfOldSession = md5(oldSession.transpiled);
// let historyHead = await codeHistory.getItem("head");
// if (!historyHead) {
//   await codeHistory.setItem(hashOfOldSession, oldSession);
//   await codeHistory.setItem("head", hashOfOldSession);
//   historyHead = hashOfOldSession;
// }

// await codeHistory.setItem(message.newHash, {
//   ...newSession,
//   oldHash: message.oldHash,
//   reversePatch: message.reversePatch,
// });
// const oldNode = await codeHistory.getItem<{ oldHash: string; reversePatch?: typeof message.reversePatch }>(
//   message.oldHash,
// );
// if (!oldNode) throw Error("corrupt storage");
// await codeHistory.setItem(message.oldHash, {
//   oldHash: oldNode.oldHash ? oldNode.oldHash : null,
//   reversePatch: oldNode.reversePatch ? oldNode.reversePatch : null,
//   newHash: message.newHash,
//   patch: message.patch,
// });
// await codeHistory.setItem("head", message.newHash);
// console.log("alive6");
// };
let controller = new AbortController();

export async function syncWS(newSession: ICodeSession) {
  try {
    controller.abort();
    controller = new AbortController();
    const oldSession = mST();

    console.log("alive1");
    if (ws) {
      // if (wsLastHashCode === hashCode()) {
      //   console.log("WS is up to date with us.");
      //   return;
      // }

      // const sess = mST();
      // console.//log({ wsLastHashCode });
      console.log("alive3");
      const message = makePatch(
        newSession,
      );

      const nnn = mST(message?.patch);

      if (md5(nnn.transpiled) !== message?.newHash) {
        console.log("SESS IS NOT OK");
        return;
      }

      console.log("alive4");

      if (!message) {
        return;
      }

      if (message.newHash !== md5(newSession.transpiled)) {
        // console.error("NEW hash is not even hashCode", hashCode());
        return;
      }

      console.log("alive5");
      // console.log("SYNC!!");
      // console.log({ ...message, name: user, i: sess.i });
      // wsLastHashCode = message.newHash;
      await wait(120);

      if (message.oldHash === message.newHash) return;
      if (controller.signal.aborted) return;
      applyPatch(message);
      if (md5(mST(message.reversePatch).transpiled) !== message.oldHash) {
        console.log("SESS IS NOT OK at all");
        return;
      }
      ws.send({
        newHash: message.newHash,
        oldHash: message.oldHash,
        patch: message.patch,
        reversePatch: message.reversePatch,
        name: user,
        i: newSession.i,
        sess: newSession,
      });

      await syncDb(oldSession, newSession, message);
    }
  } catch (error) {
    console.error("error 2", { e: error });
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

// async function syncRTC() {
//   try {
//     if (Object.keys(rtcConns).length > 0) {
//       if (webRTCLastSeenHashCode === hashCode()) {
//         return;
//       }

//       const sess = mST();
//       // console.//log({ wsLastHashCode });

//       const message = webRTCLastSeenHashCode
//         ? makePatchFrom(
//           webRTCLastSeenHashCode,
//           sess,
//         )
//         : makePatch(sess);
//       if (message !== null && message.patch) {
//         // console.//log("sendRTC");
//         sendChannel.send(message);
//       }
//     }
//   } catch (error) {
//     // console.error("Error sending RTC...", { e: error });
//   }
// }

const h: Record<number, number> = {};

async function processWsMessage(
  event: { data: string },
  source: "ws" | "rtc",
  // conn: { hashCode: string },
) {
  // lastSeenNow = Date.now();

  const data = JSON.parse(event.data);

  processData(data, source);
}

async function processData(
  data: any,
  source: "ws" | "rtc",
) {
  console.log(
    `source; ${source}, newHash: ${data.newHash || data.hashCode}, i: ${data.i} ---current:   ${mST().i}`,
  );

  if (source === "ws" && data.i && data.i <= mST().i && data.newHash) {
    wsLastHashCode = data.newHash || data.hashCode;
    return;
  }
  if (source === "ws" && data.i && data.i <= mST().i && data.newHash) {
    wsLastHashCode = data.newHash || data.hashCode;
    return;
  }
  // MySession.addEvent(data);

  // if (source === "ws") {
  //   lastSeenNow = Date.now();
  //   lastSeenTimestamp = data.timestamp;
  // }
  if (data.hashCode || data.newHash) {
    wsLastHashCode = data.hashCode || data.newHash;
  }

  if (source === "ws" && (data.hashCode || data.newHash)) {
    wsLastHashCode = data.hashCode || data.newHash;
  }

  if (source === "rtc" && data.hashCode || data.newHash) {
    // webRTCLastSeenHashCode = data.hashCode || data.newHash;
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
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }

      if (data.type === "video-offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }

      if (data.type === "video-answer") {
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

    const oldSession = mST();
    applyPatch(data);
    const newSession = mST();
    await syncDb(oldSession, newSession, data);

    if (data.newHash === hashCode()) {
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }

      return;
    }

    // console.//log("error -sending on sendChannel");

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

        ws.send({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate.toJSON(),
        });
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
      let stream = null;
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

    rtcConns[target].ondatachannel = (event) => {
      users.insert(target);
      // console.//log("Receive Channel Callback");
      const rtcChannel = event.channel;
      rtcChannel.binaryType = "arraybuffer";
      rtcChannel.addEventListener("close", onReceiveChannelClosed);

      if (
        sendChannel && sendChannel.localStream && sendChannel.localStream.active
      ) {
        sendChannel.localStream.getTracks().forEach((track) => {
          const datachannel = rtcConns[target];
          datachannel.addTrack(track);
        });
      }

      rtcChannel.addEventListener(
        "message",
        async (message) =>
          processWsMessage(
            message,
            "rtc",
            // Object.assign(rtc, { hashCode: hashCode() }),
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
        ws.send({
          target,
          name: user,
          type: "video-offer",
          offer: rtcConns[target].localDescription!,
        });
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

    ws.send({
      target,
      name: user,
      type: "video-answer",
      answer: answer!,
    });
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
