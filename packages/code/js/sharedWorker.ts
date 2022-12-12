import { CodeSession } from "session";
import type { Delta } from "textDiff";
const hashStore: { [hash: string]: CodeSession } = {};
export type {};
declare const self: SharedWorkerGlobalScope & {
  mod: Mod;
  counters: Counters;
  connections: MessagePort[];
  bc: BroadcastChannel;
};

type Mod = { [codeSpace: string]: WebSocket };
type Counters = { [codeSpace: string]: number };
type Data = {
  name: string;
  codeSpace: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer";
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
  if (sess && newHash) hashStore[newHash] = sess;
  if (!counters[codeSpace]) counters[codeSpace] = i;
  if (counters[codeSpace] >= i) return;
  counters[codeSpace] = i;
  if (codeSpace && name && (hashCode || newHash)) {
    if (!mod[codeSpace] || mod[codeSpace].readyState !== 1) {
      await reconnect(codeSpace, name, hashCode ? hashCode : newHash);
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
    mod[codeSpace].send(JSON.stringify(obj));
  }
}

self.onconnect = ({ ports }) => {
  ports[0].onmessage = ({ data }: { data: Data }) => onMessage(data);
  self.connections.push(ports[0]);
};

function isPromise(p: unknown | Promise<unknown>) {
  if (typeof p === "object" && p !== null && (typeof (p as unknown as Promise<unknown>).then) === "function") {
    return true;
  }

  return false;
}

function reconnect(codeSpace: string, name: string, hashCode: string) {
  return new Promise(async (resolve) => {
    if (isPromise(mod[codeSpace])) {
      return resolve(await mod[codeSpace]);
    }
    if (mod[codeSpace] && mod[codeSpace].readyState !== 1) delete mod[codeSpace];

    const ws = new WebSocket(
      `wss://${location.host}/live/` + codeSpace + "/websocket",
    );

    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ name, hashCode: hashCode }));

      ws.addEventListener(
        "message",
        (ev) => {
          const mess = { codeSpace, ...(JSON.parse(ev.data)) };
          const hash = mess.newHash || mess.hashCode;
          if (hash && hashStore[hash]) {
            Object.assign(mess, { sess: hashStore[hash] });
          }

          console.log({ mess });
          self.connections.map(conn => conn.postMessage(mess));
        },
      );
      mod[codeSpace] = ws;
      resolve(ws);
    });
  });
}
