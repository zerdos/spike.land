import type { Delta } from "textDiff";

export type {};

declare const self: SharedWorkerGlobalScope;

const mod: { [codeSpace: string]: WebSocket } = {};

type Data = {
  name: string;
  codeSpace: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer";
  patch?: Delta[];
  address?: string;
  users?: string[];
  hashCode?: string;
  candidate?: string;
  answer?: string;
  offer?: string;
  newHash?: string;
  oldHash?: string;
};

// Create a broadcast channel to notify about state changes

const reconnect = (codeSpace: string, name: string, hashCode: string) =>
  new Promise(async (resolve) => {
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

const onMessage = async (
  { name, codeSpace, target, type, patch, users, address, hashCode, newHash, oldHash, candidate, offer, answer }: Data,
) => {
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
};

const idToPortMap: { [name: string]: MessagePort } = {};

let bc: BroadcastChannel;
self.addEventListener("connect", (e) => {
  console.log("connected");
  if (!bc) {
    bc = new BroadcastChannel(location.origin);
    bc.addEventListener("message", (ev) => onMessage(ev.data));
  }
  const port = e.ports[0];
  port.onmessage = ({ data }: { data: Data }) => {
    idToPortMap[data.name] = port;
    onMessage(data);
  };
});

function isPromise(p: unknown | Promise<unknown>) {
  if (typeof p === "object" && p !== null && (typeof (p as unknown as Promise<unknown>).then) === "function") {
    return true;
  }

  return false;
}
