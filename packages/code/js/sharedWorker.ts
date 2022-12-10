import type { Delta } from "textDiff";

export type {};

declare const self: SharedWorkerGlobalScope;

const mod: { [codeSpace: string]: WebSocket } = {};

type Data = {
  name: string;
  codeSpace?: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer";
  patch?: Delta[];
  address?: string;
  hashCode?: string;
  candidate?: string;
  answer?: string;
  offer?: string;
  newHash?: string;
  oldHash?: string;
};

// Create a broadcast channel to notify about state changes

const onMessage = async (data: Data) => {
  if (data.codeSpace && data.name && data.hashCode) {
    const { name, codeSpace, target, type, patch, address, hashCode, newHash, oldHash, candidate, offer, answer } =
      data;

    const reconnect = async (codeSpace: string, name: string, hashCode: string) =>
      new Promise((_res) => {
        const ws = new WebSocket(
          `wss://${location.host}/live/` + codeSpace + "/websocket",
        );

        ws.addEventListener("open", () => {
          ws.send(JSON.stringify({ name, hashCode }));

          ws.addEventListener(
            "message",
            (ev) => {
              const mess = { codeSpace, ...(JSON.parse(ev.data)) };
              console.log({ mess });
              bc.postMessage(mess);
            },
          );
          mod[codeSpace] = ws;
          _res(ws);
        });
      });

    if (!mod[codeSpace] || (mod[codeSpace].readyState !== 1)) {
      await reconnect(codeSpace, name, hashCode);
    }

    const obj: { [k: string]: unknown } = {
      name,
      target,
      type,
      patch,
      address,
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
  port.addEventListener("message", (ev) => {
    const data: Data = ev.data;
    // Collect port information in the map
    idToPortMap[data.name] = port;

    onMessage(data);
  });
});
