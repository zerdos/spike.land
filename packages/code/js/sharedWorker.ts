import { str2sab } from "sab";
import { CodeSession } from "session";
import type { Delta } from "textDiff";
const hashStore: { [hash: string]: CodeSession } = {};
const names: { [codeSpace: string]: string } = {};
const blockedMessages: { [codeSpace: string]: string[] } = {};

export type {};
declare const self: SharedWorkerGlobalScope & {
  mod: Mod;
  counters: Counters;
  connections: { [codeSpaces: string]: MessagePort[] };
  names: {};
  // bc: BroadcastChannel;
};

type Mod = { [codeSpace: string]: WebSocket };
type Counters = { [codeSpace: string]: number };
type Data = {
  name: string;
  codeSpace: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer" | "handshake";
  patch?: Delta[];
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

const { mod, counters } = self;
// bc.onmessage = ({ data }) => onMessage(data);

async function onMessage(port: MessagePort, {
  name,
  codeSpace,
  target,
  type,
  patch,
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
  console.log("onMessage", { codeSpace, name, sess, oldHash, newHash, hashCode, patch });
  const hash = newHash || hashCode;
  if (sess && hash) hashStore[hash] = sess;
  if (sess && newHash) hashStore[newHash] = sess;
  if (sess && hashCode) hashStore[hashCode] = sess;

  if (i && !counters[codeSpace]) counters[codeSpace] = i;
  else if (i && counters[codeSpace] >= i) return;
  counters[codeSpace] = i;
  if (codeSpace && name && type === "handshake") {
    self.connections[codeSpace] = self.connections[codeSpace] = [];
    self.connections[codeSpace].push(port);

    console.log("onconnect", self.connections[codeSpace].length, Object.keys(self.connections));
    if (names[codeSpace]) return;
    names[codeSpace] = name;
    if (!mod[codeSpace] || mod[codeSpace].readyState !== mod[codeSpace].OPEN) {
      blockedMessages[codeSpace] = blockedMessages[codeSpace] || [];
      if (!mod[codeSpace] || mod[codeSpace].readyState !== mod[codeSpace].CONNECTING) {
        reconnect(codeSpace, name);
      }
    }
  }

  const obj: { [k: string]: unknown } = {
    name,
    target,
    type,
    patch,
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

  Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
  if (mod[codeSpace].readyState === mod[codeSpace].OPEN) {
    mod[codeSpace].send(JSON.stringify(obj));
  } else {
    blockedMessages[codeSpace].push(JSON.stringify(obj));
  }
}
let iii = 0;
self.onconnect = ({ ports }) => {
  ports[0].postMessage({ type: "onconnect", connections: ++iii });
  ports[0].onmessage = ({ data }: { data: Data }) => onMessage(ports[0], data);
};

function reconnect(codeSpace: string, name: string) {
  // return new Promise(async (resolve) => {
  // if (isPromise(mod[codeSpace])) {
  // return resolve(await mod[codeSpace]);
  // }
  if (mod[codeSpace]) return mod[codeSpace];
  // if (mod[codeSpace] && mod[codeSpace].readyState !== 1) delete mod[codeSpace];

  const websocket = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket",
  );
  mod[codeSpace] = websocket;
  websocket.addEventListener(
    "message",
    (ev) => {
      const patch = JSON.parse(ev.data);

      const mess = { codeSpace, ...patch };
      mess.name = names[codeSpace];
      const hash = patch.newHash || patch.hashCode;
      if (hash && hashStore[hash]) {
        mess.sess = hashStore[hash];

        // Object.assign(mess, { sess: hashStore[hash] });
      }
      const sab = str2sab(JSON.stringify(mess));
      console.log({ mess });
      self.connections[codeSpace] = self.connections[codeSpace].map(conn => {
        try {
          conn.postMessage(sab, [sab]);
          return conn;
        } catch (err) {
          console.error("can't post message connection");
          return null;
        }
      }).filter(x => x !== null) as MessagePort[];
    },
  );

  blockedMessages[codeSpace].push(JSON.stringify({ name }));
  websocket.onopen = () => {
    let i = 0;
    while (i <= blockedMessages[codeSpace].length) {
      websocket.send(blockedMessages[codeSpace][i++]);
    }
  };

  return mod[codeSpace];
}
