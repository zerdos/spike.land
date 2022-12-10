import type { Delta } from "textDiff";

export type {};

declare const self: SharedWorkerGlobalScope;

const mod: { [codeSpace: string]: WebSocket } = {};

// Create a broadcast channel to notify about state changes
const bc = new BroadcastChannel(location.origin);

const onMessage = async (event: MessageEvent) => {
  if (event.data.codeSpace && event.data.name && event.data.hashCode) {
    const { name, codeSpace, target, type, patch, address, hashCode, newHash, oldHash, candidate, offer, answer } =
      event.data;

    const reconnect = async () =>
      mod[codeSpace] = await new Promise((_res) => {
        const ws = new WebSocket(
          `wss://${location.host}/live/` + codeSpace + "/websocket",
        );

        ws.addEventListener("open", () => {
          _res(ws);

          ws.send(JSON.stringify({ name, hashCode }));

          ws.addEventListener(
            "message",
            (ev) => {
              const mess = { codeSpace, ...(JSON.parse(ev.data)) };
              console.log({ mess });
              bc.postMessage(mess);
            },
          );
        });
      });

    if (!mod[codeSpace] || (mod[codeSpace].readyState !== 1)) {
      await reconnect();
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
bc.onmessage = (event) => onMessage(event);

const idToPortMap: { [name: string]: MessagePort } = {};

self.addEventListener("connect", (e) => {
  const port = e.ports[0];
  port.onmessage = (e) => {
    const data: Data = e.data;
    // Collect port information in the map
    idToPortMap[data.name] = port;

    // Forward this message to the ws connection.
    onMessage(e);
  };

  // We need this to notify the newly connected context to know
  // the current state of WS connection.
  // port.postMessage({ state: ws.readyState, type: "WSState"});
});
