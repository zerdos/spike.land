import { CodeSession } from "session";
import type { Delta } from "textDiff";
const hashStore: { [hash: string]: CodeSession } = {};
const names: { [codeSpace: string]: string } = {};
const blockedMessages: { [codeSpace: string]: string[] } = {};

export type {};
declare const self: SharedWorkerGlobalScope & {
  mod: Mod;
  counters: Counters;
  connections: MessagePort[];
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
self.connections = self.connections || [];

const { mod, counters } = self;
// bc.onmessage = ({ data }) => onMessage(data);

async function onMessage(
  {
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
  }: Data,
) {
  console.log("onMessage", { codeSpace, name, sess, newHash, hashCode, patch });
  if (sess && newHash) hashStore[newHash] = sess;
  if (sess && hashCode) hashStore[hashCode] = sess;

  if (!counters[codeSpace]) counters[codeSpace] = i;
  if (counters[codeSpace] >= i) return;
  counters[codeSpace] = i;
  if (codeSpace && name && type === "handshake") {
    if (names[codeSpace]) return;
    names[codeSpace] = name;
    if (!mod[codeSpace] || mod[codeSpace].readyState !== mod[codeSpace].OPEN) {
      blockedMessages[codeSpace] = [];
      reconnect(codeSpace, name);
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
}

self.onconnect = ({ ports }) => {
  ports[0].postMessage({ type: "onconnect", connections: self.connections.length });
  ports[0].onmessage = ({ data }: { data: Data }) => onMessage(data);
  self.connections.push(ports[0]);
  console.log("onconnect", self.connections.length, Object.keys(mod));
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
      const mess = { codeSpace, ...(JSON.parse(ev.data)) };
      mess.name = names[codeSpace];
      const hash = mess.newHash || mess.hashCode;
      if (hash && hashStore[hash]) {
        Object.assign(mess, { sess: hashStore[hash] });
      }

      console.log({ mess });
      self.connections.map(conn => conn.postMessage(mess));
    },
  );
  websocket.onopen = () => {
    websocket.send(JSON.stringify({ name }));
    while (blockedMessages[codeSpace].length) {
      const message = blockedMessages[codeSpace].pop()!;
      websocket.send(message);
    }
  };

  return mod[codeSpace];
}
