// Object.assign(globalThis, require("buffer/"));
// Object.assign(globalThis, require("stream-browserify"));

// import 'css-paint-polyfill
import AVLTree from "avl";
// import P2PCF from "p2pcf";
import adapter from "webrtc-adapter";
import {
  applyPatch,
  type CodePatch,
  type Delta,
  // type Delta,
  // CodeSession,
  hashKEY,
  makePatch,
  // makePatch,
  // makePatchFrom,
  mST,
  //  onSessionUpdate,
  startSession,
  syncStorage,
} from "./session";

import { Mutex } from "async-mutex";

import localForage from "localforage";

// Import * as FS from '@isomorphic/-git/lightning-fs';

// import { renderPreviewWindow } from "./renderPreviewWindow";

// import { esmTransform } from "runner";
import { mkdir, readdir, unlink, writeFile } from "./fs";
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

// const shHash = md5((await (await fetch(`${origin}/files.json`)).json())["sharedWorker.js"]);

// const sharedWorker = new SharedWorker(
//   "/sharedWorker.js?ree=" + shHash,
// );

const messageChannel = new MessageChannel();

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
let wsLastHashCode = 0;
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
  name: `/live/${codeSpace}`,
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
// console.log("Yo 0");

// });

type MessageProps = Partial<{
  oldHash?: number;
  newHash?: number;
  name?: string;
  codeSpace: string;
  i?: number;
  code?: string;
  transpiled?: string;
  session: ICodeSession;
  sess?: ICodeSession;
  type?: string;
  target?: string;
  candidate?: RTCIceCandidateInit;
  answer?: RTCSessionDescriptionInit;
  offer?: RTCSessionDescription;
  reversePatch?: Delta[];
  patch?: Delta[];
}>;

const ws = {
  blockedMessages: [] as MessageProps[],
  send: (
    mess: MessageProps,
  ) => {
    ws.blockedMessages.push(mess);
  },
};

export const run = async () => {
  // const { readdir, mkdir, writeFile } = fs.promises;
  const hash = Number(await (await fetch(`${origin}/live/${codeSpace}/session/head`)).text());
  const head = await codeHistory.getItem<number>("head");

  const savedSess = await codeHistory.getItem<ICodeSession>("#" + String(head));
  let _mst: ICodeSession | null;
  if (savedSess && head === hash) {
    _mst = savedSess;
  } else {
    _mst = await fetch(`/live/${codeSpace}/session.json`).then(r => r.json());
  }
  const mst = _mst!;
  startSession(codeSpace, {
    name: user,
    state: mst,
  });

  navigator.serviceWorker.controller!.postMessage({
    type: "INIT_PORT",
  }, [messageChannel.port2]);

  messageChannel.port1.onmessage = async (ev) => {
    console.log("ONMESSAGE", { data: ev.data });
    if (ev.data.type === "onconnect") {
      console.log("POST ONCONNECT", { codeSpace, name: user, hashCode: mST(codeSpace) });
      // messagePort = this;
      // const sess = mST(codeSpace);
      ws.send = (
        message: MessageProps,
      ) => {
        const messageData = { name: user, ...message, codeSpace, i: mST(codeSpace).i, hashCode: hashKEY(codeSpace) };
        console.log("POST MESSAGE", { messageData });
        if (
          messageData.oldHash && messageData.oldHash === messageData.newHash
        ) return;
        messageChannel.port1.postMessage(messageData);
      };
      ws.send({ type: "handshake", session: mST(codeSpace) });

      while (ws.blockedMessages.length) ws.send(ws.blockedMessages!.shift()!);
    } else {
      let data;
      try {
        data = JSON.parse(ab2str(ev.data));
      } catch (err) {
        console.error("not a buff", { err, data: ev.data });
      }
      try {
        await processData(data, "ws");
        console.log("its a buffer", { data });
      } catch (err) {
        console.error("process error", { err, data: ev.data });
      }
      // }
    }
  };

  const root = (await readdir("/"));

  if (!root.includes("live")) await mkdir("/live");
  const live = await readdir("/live");
  if (!live.includes(codeSpace)) await mkdir("/live/" + codeSpace);

  // if (!liveStat.isDirectory())
  // else console.log("dir already )(exists")
  const cs = await readdir(`/live/${codeSpace}`);
  // const code = await fs.promises.readFile(`/live/${codeSpace}/index.tsx`)

  // let hST: ICodeSession | null = null;

  // if (hST && hST.i > mst.i) mst = hST!;

  if (cs.includes("index.js")) {
    unlink(`/live/${codeSpace}/index.js`);
  }

  if (!cs.includes("index.tsx")) {
    await writeFile(
      `/live/${codeSpace}/index.tsx`,
      mst.code,
    );
  } else {
    await unlink(
      `/live/${codeSpace}/index.tsx`,
    );
    await writeFile(
      `/live/${codeSpace}/index.tsx`,
      mst.code,
    );
  }

  if (!cs.includes("index.tsx")) {
    await writeFile(
      `/live/${codeSpace}/index.tsx`,
      mst.code,
    );
  } else {
    await unlink(
      `/live/${codeSpace}/index.tsx`,
    );
    await writeFile(
      `/live/${codeSpace}/index.tsx`,
      mst.code,
    );
  }

  // const codeHistory = localForage.createInstance({
  //   name: location.origin + `/live/${codeSpace}`,
  // });
  // const db = self.dbs[codeSpace];

  // codeSpace = startState.codeSpace;
  // requestAnimationFrame(() => {

  // setTimeout(() => {
  // });
  // wsLastHashCode = md5(mst.transpiled);
  // globalThis.sharedWorker.port.postMessage({ name: user, codeSpace, hashCode: md5(mst.transpiled), sess: mst });

  // sharedWorker.port.postMessage({ codeSpace, type: "handshake", i: mST(codeSpace).i, name: user, hashCode: hashKEY(codeSpace) });

  // }, location.origin);
  if (location.pathname === `/live/${codeSpace}`) {
    renderPreviewWindow({ codeSpace, dry: false });
  }

  // ws.send({ type: "handshake" });

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
  //     processData(event.data, "ws", { hashCode: hashKEY() });
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
  // setTimeout(() => {

  // onSessionUpdate(
  //   () => {
  //     syncWS();

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
  // }, timeout);

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

const { getItem, setItem } = codeHistory;
const syncDb = async (
  oldSession: ICodeSession,
  newSession: ICodeSession,
  message: CodePatch,
) =>
  await syncStorage(
    setItem,
    getItem,
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
// let controller = new AbortController();

const mutex = new Mutex();
export async function syncWS(newSession: ICodeSession, signal: AbortSignal) {
  try {
    // console.log("SYNC!!");
    // console.log("SYNC!!");
    // console.log("SYNC!!");

    console.log({ newSession });
    // controller.abort();
    // controller = new AbortController();

    // console.log("alive1");
    if (ws) {
      // if (wsLastHashCode === hashKEY()) {
      //   console.log("WS is up to date with us.");
      //   return;
      // }

      // const sess = mST();
      // console.//log({ wsLastHashCode });
      console.log("alive3");
      const message = makePatch(
        newSession,
        codeSpace,
      );

      console.log("alive4");

      if (!message) {
        return;
      }

      // if (message.newHash !== md5() {
      // console.error("NEW hash is not even hashCode", hashKEY());
      // return;
      // }

      console.log("alive5");
      // console.log("SYNC!!");
      // console.log({ ...message, name: user, i: sess.i });
      // wsLastHashCode = message.newHash;

      if (message.oldHash === message.newHash) return;
      if (signal.aborted) return;

      const oldSession = mST(codeSpace);

      await mutex.waitForUnlock();
      mutex.acquire();

      applyPatch(message, codeSpace);

      // const newSS = mST(codeSpace);

      ws.send(message);

      await syncDb(oldSession, newSession, message);

      mutex.release();
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
//       if (webRTCLastSeenHashCode === hashKEY()) {
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
  console.table(data);
  console.log(
    `source; ${source}, newHash: ${data.newHash || data.hashCode}, i: ${data.i} ---current:   ${mST(codeSpace).i}`,
  );

  if (source === "ws" && data.i && data.i <= mST(codeSpace).i && data.newHash) {
    wsLastHashCode = data.newHash || data.hashCode;
    return;
  }
  if (source === "ws" && data.i && data.i <= mST(codeSpace).i && data.newHash) {
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

  if (data.newHash === hashKEY(codeSpace)) {
    return;
  }

  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash) {
      return;
    }

    h[data.oldHash] = data.newHash;
  }

  if (data.newHash === hashKEY(codeSpace)) {
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

  if (data.patch && data.name !== user && data.oldHash == hashKEY(codeSpace)) {
    if (data.newHash === hashKEY(codeSpace)) {
      return;
    }

    const oldSession = mST(codeSpace);
    applyPatch(data, codeSpace);
    const newSession = mST(codeSpace);

    await syncDb(oldSession, newSession, data);
    //  X writeFile(`/live/${codeSpace}/index.tsx`. newSession.code);
    await writeFile("/live/" + codeSpace + "/index.tsx", newSession.code);

    await writeFile("/live/" + codeSpace + "/index.js", newSession.transpiled);

    // if (data.newHash === hashKEY(codeSpace)) {
    // if (sendChannel) {
    //   sendChannel.send({ hashCode: data.newHash });
    // }

    // return;
    // }

    // console.//log("error -sending on sendChannel");

    return;
  }

  if (data.name === user) {
    return;
  }

  if (wsLastHashCode !== hashKEY(codeSpace)) {
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
            // Object.assign(rtc, { hashCode: hashKEY() }),
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
    // const extendedRTC = Object.assign(rtc, {hashCode: hashKEY()})
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
