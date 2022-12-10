import type { Delta } from "textDiff";

export type {};

type Mod = { [codeSpace: string]: WebSocket };
type Counters = { [codeSpace: string]: number };
type PortMap = { [name: string]: MessagePort };
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
  answer?: string;
  offer?: string;
  newHash: string;
  oldHash?: string;
};

mod = {};
counters = {};
idToPortMap = {};
bc = new BroadcastChannel(location.origin);

async function onMessage(
  { name, codeSpace, target, type, patch, users, i, address, hashCode, newHash, oldHash, candidate, offer, answer }:
    Data,
) {
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
  console.log("connected");
  bc.onmessage = ({ data }) => onMessage(data);

  ports[0].onmessage = ({ data }: { data: Data }) => {
    idToPortMap[data.name] = ports[0];
    onMessage(data);
  };
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
          console.log({ mess });
          bc.postMessage(mess);
        },
      );
      mod[codeSpace] = ws;
      resolve(ws);
    });
  });
}
