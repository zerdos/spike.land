importScripts("/workerScripts/superFetch.js");
self.originalFetch = self.fetch;
self.fetch = self.superFetch;

import { Mutex } from "async-mutex";
import { Record } from "immutable";
import { ldb } from "./createDb";
// import { m } from "framer-motion";
// import { S } from "memfs/lib/constants";
// import { SEP } from "memfs/lib/node";
import { str2ab } from "./sab";
import { aPatch, CodePatch, ICodeSession, string_ } from "./session";
// import { CodeSession } from "./session";
import type { Delta } from "./textDiff";

// const hashStore: { [hash: string]: CodeSession } = {};
const names: { [codeSpace: string]: string } = {};

export type {};
declare const self: SharedWorkerGlobalScope & {
  mod: Mod;
  name: string;
  counters: Counters;
  dbs: { [codeSpaces: string]: LocalForage };
  sessions: { [codeSpaces: string]: Record<ICodeSession> };
  connections: { [codeSpaces: string]: MessagePort[] };
  hashCodes: { [codeSpaces: string]: number };

  names: {};
  // bc: BroadcastChannel;
};

function hashCode(sess: ICodeSession) {
  return Record<ICodeSession>(sess)().hashCode();
}

function mST(codeSpace: string, p?: Delta[]) {
  if (p && p.length) {
    const sessAsJs = sessions[codeSpace];

    const { i, code, html, css }: ICodeSession = p
      ? JSON.parse(
        aPatch(
          string_(
            sessAsJs,
          ),
          p,
        ),
      )
      : sessAsJs;
    return sessions[codeSpace].merge({
      i,
      code,
      html,
      css,
    });
  }
  return sessions[codeSpace];
}

async function send(codeSpace: string, msg: object) {
  let conn = self.mod[codeSpace];
  if (!conn) {
    conn = await reconnect(codeSpace);
  }
  conn.send(msg);

  // await wait(500);
  // if (!mod[codeSpace] || !mod[codeSpace].isOpen()) await reconnect(codeSpace);

  // if (mod[codeSpace]) {
  // mod[codeSpace].send({});
  // }
}

// async function ata(code: string, baseUrl: string) {
//   const window = self;

// (function(){

//   if ("performance" in window == false) {
//       window.performance = {};
//   }

//   Date.now = (Date.now || function () {  // thanks IE8
// 	  return new Date().getTime();
//   });

//   if ("now" in window.performance == false){

//     var nowOffset = Date.now();

//     if (performance.timing && performance.timing.navigationStart){
//       nowOffset = performance.timing.navigationStart
//     }

//     window.performance.now = function now(){
//       return Date.now() - nowOffset;
//     }
//   }

// })();
//   const detective =  (await import("../vendor/ts-detective.mjs")).default

//   const res= detective(code)
//   return resizeBy;
// }

type Mod = {
  [codeSpace: string]: {
    socket: WebSocket;
    counterMax: number;
    blockedMessages: object[];
    isOpen: () => boolean;
    send: (message?: object) => void;
  };
};
type Counters = { [codeSpace: string]: number };
type Data = {
  name: string;
  codeSpace: string;
  target?: string;
  code: string;
  baseUrl: string;
  type?:
    | "new-ice-candidate"
    | "video-offer"
    | "video-answer"
    | "handshake"
    | "ata";
  patch?: Delta[];
  reversePatch?: Delta[];
  address?: string;
  users?: string[];
  i: number;
  session: ICodeSession;
  hashCode?: number;
  candidate?: string;
  // sess: CodeSession;
  answer?: string;
  offer?: string;
  newHash: number;
  oldHash?: number;
};

self.mod = self.mod || {};
self.sessions = self.sessions || {};
self.counters = self.counters || {};
self.connections = self.connections || {};
self.hashCodes = self.hashCodes || {};

self.dbs = self.dbs || {};

const { mod, counters, hashCodes, connections, sessions } = self;
// bc.onmessage = ({ data }) => onMessage(data);

async function onMessage(port: MessagePort, data: Data) {
  console.log("oMessage", {
    data,
    //   sess,
    //   oldHash,
    //   newHash,
    //   hashCode,
    //   patch,
    //   reversePatch,
  });

  if (!self.name && data.name) self.name = data.name;

  const {
    name,
    codeSpace,
    target,
    type,
    patch,
    reversePatch,
    users,
    i,
    address,
    hashCode,
    session,
    newHash,
    oldHash,
    candidate,
    offer,
    answer,
    // sess,
  } = data;

  const hash = newHash || hashCode;
  hashCodes[codeSpace] = hash || 0;
  // if (sess && hash) hashStore[hash] = sess;
  // if (sess && newHash) hashStore[newHash] = sess;
  // if (sess && hashCode) hashStore[hashCode] = sess;

  if (i && !counters[codeSpace]) counters[codeSpace] = i;
  else if (i && counters[codeSpace] >= i) return;
  counters[codeSpace] = i;
  // if (type === "ata" && code && baseUrl) {
  //   return import("./ata").then(({ run }) => run(code, baseUrl)).then(
  //     (extraLibs) => port.postMessage({ type: "ata", extraLibs }),
  //   );
  // }
  if (codeSpace && name && type === "handshake") {
    connections[codeSpace] = connections[codeSpace] || [];
    connections[codeSpace].push(port);

    if (!names[codeSpace]) {
      names[codeSpace] = name;
    }

    sessions[codeSpace] = Record<ICodeSession>(session)();

    console.log(
      "onconnect",
      connections[codeSpace].length,
      Object.keys(connections),
    );

    // send(codeSpace, { type: "handshake", hashCode: hashCodes[codeSpace] || hashCode, i, name: names[codeSpace] });
  }
  send(codeSpace, { ...data, name: names[codeSpace] });
  const obj: { [k: string]: unknown } = {
    name,
    target,
    type,
    patch,
    reversePatch,
    address,
    i,
    users,
    hashCode,
    newHash,
    oldHash,
    candidate,
    offer,
    answer,
  };

  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);

  // if (db) {
  //   const hash = await db.getItem<string>("wsHash");
  //   if (hash && obj.oldHash && hash !== obj.oldHash) {
  //     const old = await db.getItem<
  //       {
  //         newHash: string;
  //         oldHash: string;
  //         patch: Delta[];
  //         reversePatch: Delta[];
  //       }
  //     >(hash);

  //     if (old) {
  //       const next = await db.getItem<
  //         {
  //           newHash: string;
  //           oldHash: string;
  //           patch: Delta[];
  //           reversePatch: Delta[];
  //         }
  //       >(
  //         old.newHash,
  //       );
  //       if (next) {
  //         return send(codeSpace, {
  //           oldHash: hash,
  //           newHash: old.newHash,
  //           patch: old.patch,
  //           reversePatch: next.reversePatch,
  //           name: names[codeSpace],
  //         });
  //       }
  //     }
  //   }
  // }
}
let iii = 0;
const BC = new BroadcastChannel(location.origin + "/ws.js");

export const onConnectToClients = () => {
  // me.addEventListener("message", (event) => {
  //   if (event.data && event.data.type === "INIT_PORT") {
  //     const port = event.ports[0];

  BC.onmessage = (e) => {
    if (e.type !== "onconnect") return;
    const ports = new MessageChannel();

    const port = ports.port1;

    port.onmessage = ({ data }) => onMessage(port, data);

    port.postMessage({ type: "onconnect", connections: ++iii });
    port.start();
  };
};

const mutex = new Mutex();

async function reconnect(codeSpace: string) {
  await mutex.waitForUnlock();
  if (mod[codeSpace] && mod[codeSpace].isOpen()) return mod[codeSpace];
  mutex.acquire();

  setTimeout(() => {
    if (mutex.isLocked()) mutex.release();
  }, 2000);

  // return new Promise(async (resolve) => {
  // if (isPromise(mod[codeSpace])) {
  // return resolve(await mod[codeSpace]);
  // }

  if (mod[codeSpace] && mod[codeSpace].isOpen()) return mod[codeSpace];
  // if (mod[codeSpace] && mod[codeSpace].readyState !== 1) delete mod[codeSpace];

  const prom = new Promise<typeof mod[0]>((res) => fixWebsocket(codeSpace, res));

  await prom;

  return mod[codeSpace];
}

function fixWebsocket(codeSpace: string, res: (m: typeof mod[0]) => void) {
  let websocket = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket",
  );
  const w: typeof mod[0] = mod[codeSpace] = mod[codeSpace] || {
    blockedMessages: [],
    socket: websocket,
    isOpen: () => w.socket.readyState === WebSocket.OPEN,
    send: async (msg?: object) => {
      if (msg) w.blockedMessages.push(msg);
      // const ctr = new AbortController();

      // if (!w.isOpen()) {
      // setTimeout(() => {
      // if (ctr.signal.aborted) return;
      // if (!w.isOpen()) fixWebsocket();
      // }, 600);
      // }

      while (
        w.isOpen() && w.blockedMessages.length
      ) {
        const mess:
          | Partial<CodePatch & ICodeSession & { session: ICodeSession }>
          | undefined = w.blockedMessages
            .shift();
        console.log({ mess });
        if (mess) {
          if (!mess.patch || (mess.patch && mess.i && mess.i > w.counterMax)) {
            if (mess.i) {
              w.counterMax = mess.i;

              const reversePatch: Delta[] = mess.reversePatch || [];
              const patch: Delta[] = mess.patch || [];
              const oldState = mST(codeSpace);
              const newState = mST(codeSpace, patch);
              const oldHash = hashCode(oldState);
              const newHash = hashCode(newState);
              if (oldHash !== mess.oldHash || newHash !== mess.newHash) {
                console.error({ msg, calculated: { oldHash, newHash } });
                throw ("Error - we messed up the hashStores");
              }
              const newRec = sessions[codeSpace].merge(
                newState,
              );
              sessions[codeSpace] = sessions[codeSpace].merge(newRec);
              await ldb(codeSpace).syncDb(oldState, newState, {
                oldHash,
                newHash,
                patch,
                reversePatch,
              });
            }
            const name = names[codeSpace];
            (() => {
              const { session, ...rest } = mess;

              websocket.send(JSON.stringify({ ...rest, name }));
            })();
          }
        }
        res(w);
      }
    },
  };

  websocket.onmessage = async ({ data }: { data: string }) => {
    const mess:
      | Partial<CodePatch & ICodeSession & { hashCode: number }>
      | undefined = JSON.parse(data);
    if (!mess) return;
    if (!mess.patch || (mess.patch && mess.i && mess.i > w.counterMax)) {
      const wsHash = mess.hashCode || mess.newHash;
      if (wsHash) await ldb(codeSpace).setItem("wsHash", wsHash);

      if (mess.i) {
        {
          w.counterMax = mess.i;

          const reversePatch: Delta[] = mess.reversePatch || [];
          const patch: Delta[] = mess.patch || [];
          const oldState = mST(codeSpace);
          const newState = mST(codeSpace, patch);
          const oldHash = hashCode(oldState);
          const newHash = hashCode(newState);
          if (
            newHash !== wsHash || (mess.oldHash && oldHash !== mess.oldHash)
          ) {
            console.error({ mess, calculated: { oldHash, newHash } });
            throw ("Error - we messed up the hashStores");
          }
          const newRec = sessions[codeSpace].merge(
            newState,
          );
          sessions[codeSpace] = sessions[codeSpace].merge(
            newRec,
          );
          await ldb(codeSpace).syncDb(oldState, newState, {
            oldHash,
            newHash,
            patch,
            reversePatch,
          });
        }

        // const {oldHash, newHash, patch, reversePatch } = mess;
        // if (oldHash && newHash && reversePatch && patch) await syncDb();
      }

      connections[codeSpace].map((x) => ((ab) => x.postMessage(ab, [ab]))(str2ab(data)));
    }
    if (mutex.isLocked()) {
      mutex.release();
      websocket.send(JSON.stringify({ name, hashCode: hashCodes[codeSpace] }));
    }
  };

  websocket.onopen = () => {
    w.socket = websocket;
  };
  // w.socket = websocket;

  // websocket.addEventListener("message", async (ev) => {
  //   connections[codeSpace] = connections[codeSpace].map(conn => {
  //     try {
  //       const ab = str2ab(ev.data);
  //       conn.postMessage(ab, [ab]);
  //       return conn;
  //     } catch (err) {
  //       console.error("can't post message connection");
  //       return null;
  //     }
  //   }).filter((x) => x !== null) as MessagePort[];

  //   const message = JSON.parse(ev.data);

  //   const mess = { codeSpace, ...message };
  //   mess.name = names[codeSpace];

  //   const db = dbs[codeSpace];
  //   const head = await db.getItem<string>("head");

  //   const hash = message.newHash || message.hashCode;
  //   if (hash && head && hash !== head) {
  //     await db.setItem("wsHash", hash);
  //     const old = await db.getItem<
  //       {
  //         newHash: string;
  //         oldHash: string;
  //         patch: Delta[];
  //         i: number;
  //         reversePatch: Delta[];
  //       }
  //     >(hash);

  //     if (old) {
  //       const next = await db.getItem<
  //         {
  //           newHash: string;
  //           oldHash: string;
  //           i: number;
  //           patch: Delta[];
  //           reversePatch: Delta[];
  //         }
  //       >(
  //         old.newHash,
  //       );
  //       if (next) {
  //         return mod[codeSpace].send(
  //           {
  //             oldHash: hash,
  //             newHash: old.newHash,
  //             patch: old.patch,
  //             i: next.i,
  //             reversePatch: next.reversePatch,
  //             name: names[codeSpace],
  //           },
  //         );
  //       }
  //     }
  //   }
  //   if (hash && hashStore[hash]) {
  //     // mess.sess = hashStore[hash];

  //     // Object.assign(mess, { sess: hashStore[hash] });
  //   }

  //   // var bufView = new Uint16Array(str.length);
  //   // for (var i = 0, strLen = str.length; i < strLen; i++) {
  //   //   bufView[i] = str.charCodeAt(i);
  //   // }
  //   // const sab = new Uint16Array(str2ab(JSON.stringify(mess)));
  //   // var j = 0;
  //   // while (Atomics.load(bufView, j++) < str.length) {

  //   // }
  // });
}
