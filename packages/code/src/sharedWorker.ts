import localForage from "localforage";
import { str2ab } from "./sab";
import { CodeSession } from "./session";
import type { Delta } from "./textDiff";
import { wait } from "./wait";

const hashStore: { [hash: string]: CodeSession } = {};
const names: { [codeSpace: string]: string } = {};

export type {};
declare const self: SharedWorkerGlobalScope & {
  mod: Mod;
  name: string;
  counters: Counters;
  dbs: { [codeSpaces: string]: LocalForage };
  connections: { [codeSpaces: string]: MessagePort[] };
  hashCodes: { [codeSpaces: string]: string };

  names: {};
  // bc: BroadcastChannel;
};

async function send(codeSpace: string, msg: object) {
  if (!mod[codeSpace]) {
    reconnect(codeSpace);
  }

  if (mod[codeSpace]) {
    mod[codeSpace].send(msg);
  }

  await wait(500);
  if (!mod[codeSpace] || !mod[codeSpace].isOpen()) reconnect(codeSpace);

  if (mod[codeSpace]) {
    mod[codeSpace].send();
  }
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
  hashCode?: string;
  candidate?: string;
  sess: CodeSession;
  answer?: string;
  offer?: string;
  newHash: string;
  oldHash?: string;
};

self.mod = self.mod || {};
self.counters = self.counters || {};
self.connections = self.connections || {};
self.hashCodes = self.hashCodes || {};

self.dbs = self.dbs || {};

const { mod, counters, hashCodes, connections, dbs } = self;
// bc.onmessage = ({ data }) => onMessage(data);

async function onMessage(port: MessagePort, {
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
  newHash,
  oldHash,
  candidate,
  offer,
  answer,
  sess,
}: Data) {
  // console.log("onMessage", {
  //   codeSpace,
  //   name,
  //   sess,
  //   oldHash,
  //   newHash,
  //   hashCode,
  //   patch,
  //   reversePatch,
  // });
  if (!self.name && name) self.name = name;

  const hash = newHash || hashCode;
  hashCodes[codeSpace] = hash || "";
  if (sess && hash) hashStore[hash] = sess;
  if (sess && newHash) hashStore[newHash] = sess;
  if (sess && hashCode) hashStore[hashCode] = sess;

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

    dbs[codeSpace] = dbs[codeSpace] || localForage.createInstance({
      name: location.origin + `/live/${codeSpace}`,
    });

    console.log(
      "onconnect",
      connections[codeSpace].length,
      Object.keys(connections),
    );
    if (!names[codeSpace]) {
      names[codeSpace] = name;
    }
    send(codeSpace, { type: "handshake", hashCode: hashCodes[codeSpace] || hashCode });
  }

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

  const db = dbs[codeSpace];
  if (db) {
    const hash = await db.getItem<string>("wsHash");
    if (hash && obj.oldHash && hash !== obj.oldHash) {
      const old = await db.getItem<
        {
          newHash: string;
          oldHash: string;
          patch: Delta[];
          reversePatch: Delta[];
        }
      >(hash);

      if (old) {
        const next = await db.getItem<
          {
            newHash: string;
            oldHash: string;
            patch: Delta[];
            reversePatch: Delta[];
          }
        >(
          old.newHash,
        );
        if (next) {
          return send(codeSpace, {
            oldHash: hash,
            newHash: old.newHash,
            patch: old.patch,
            reversePatch: next.reversePatch,
            name: names[codeSpace],
          });
        }
      }
    }
  }
}
let iii = 0;
self.onconnect = ({ ports }) => {
  console.log("ON CONNECT");
  ports[0].postMessage({ type: "onconnect", connections: ++iii });
  ports[0].onmessage = ({ data }: { data: Data }) => onMessage(ports[0], data);
};

function reconnect(codeSpace: string) {
  const { name } = self;

  // return new Promise(async (resolve) => {
  // if (isPromise(mod[codeSpace])) {
  // return resolve(await mod[codeSpace]);
  // }

  if (mod[codeSpace]) return mod[codeSpace];
  // if (mod[codeSpace] && mod[codeSpace].readyState !== 1) delete mod[codeSpace];

  let websocket = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket",
  );

  const fixit = () => {
    websocket = new WebSocket(
      `wss://${location.host}/live/` + codeSpace + "/websocket",
    );
    websocket.onopen = () => {
      mod[codeSpace].socket = websocket;
      mod[codeSpace].send();
    };
  };

  websocket.onopen = () => {
    const w: typeof mod[0] = mod[codeSpace] = {
      blockedMessages: [],
      socket: websocket,
      isOpen: () => w.socket.readyState === WebSocket.OPEN,
      send: (msg?: object) => {
        if (msg) w.blockedMessages.push(msg);
        const ctr = new AbortController();

        if (!w.isOpen()) {
          setTimeout(() => {
            if (ctr.signal.aborted) return;
            if (!w.isOpen()) fixit();
          }, 600);
        }

        while (
          w.isOpen()
          && w.blockedMessages.length
        ) {
          const mess = w.blockedMessages.shift();
          console.log({ mess });
          if (mess) w.socket.send(JSON.stringify({ ...mess, name }));
        }
      },
    };

    w.send();
  };

  websocket.onmessage = async (ev) => {
    connections[codeSpace] = connections[codeSpace].map(conn => {
      try {
        const ab = str2ab(ev.data);
        conn.postMessage(ab, [ab]);
        return conn;
      } catch (err) {
        console.error("can't post message connection");
        return null;
      }
    }).filter((x) => x !== null) as MessagePort[];

    const message = JSON.parse(ev.data);

    const mess = { codeSpace, ...message };
    mess.name = names[codeSpace];

    const db = dbs[codeSpace];
    const head = await db.getItem<string>("head");

    const hash = message.newHash || message.hashCode;
    if (hash && head && hash !== head) {
      await db.setItem("wsHash", hash);
      const old = await db.getItem<
        {
          newHash: string;
          oldHash: string;
          patch: Delta[];
          reversePatch: Delta[];
        }
      >("#" + hash);

      if (old) {
        const next = await db.getItem<
          {
            newHash: string;
            oldHash: string;
            patch: Delta[];
            reversePatch: Delta[];
          }
        >(
          "#" + old.newHash,
        );
        if (next) {
          return mod[codeSpace].send(
            {
              oldHash: hash,
              newHash: old.newHash,
              patch: old.patch,
              reversePatch: next.reversePatch,
              name: names[codeSpace],
            },
          );
        }
      }
    }
    if (hash && hashStore[hash]) {
      // mess.sess = hashStore[hash];

      // Object.assign(mess, { sess: hashStore[hash] });
    }

    // var bufView = new Uint16Array(str.length);
    // for (var i = 0, strLen = str.length; i < strLen; i++) {
    //   bufView[i] = str.charCodeAt(i);
    // }
    // const sab = new Uint16Array(str2ab(JSON.stringify(mess)));
    // var j = 0;
    // while (Atomics.load(bufView, j++) < str.length) {

    // }
  };

  return mod[codeSpace];
}
