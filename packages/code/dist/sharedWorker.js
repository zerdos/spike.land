var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// js/sharedWorker.ts
globalThis.mod = globalThis.mod || {};
globalThis.counters = globalThis.counters || {};
globalThis.idToPortMap = globalThis.idToPortMap || {};
globalThis.bc = globalThis.bc || new BroadcastChannel(location.origin);
var { mod, counters, idToPortMap, bc } = globalThis;
bc.onmessage = ({ data }) => onMessage(data);
async function onMessage({ name, codeSpace, target, type, patch, users, i, address, hashCode, newHash, oldHash, candidate, offer, answer }) {
  if (!counters[codeSpace])
    counters[codeSpace] = i;
  if (counters[codeSpace] >= i)
    return;
  counters[codeSpace] = i;
  if (codeSpace && name && (hashCode || newHash)) {
    if (!mod[codeSpace] || mod[codeSpace].readyState !== 1) {
      await reconnect(codeSpace, name, hashCode ? hashCode : newHash);
    }
    const obj = {
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
      answer
    };
    Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);
    mod[codeSpace].send(JSON.stringify(obj));
  }
}
__name(onMessage, "onMessage");
self.onconnect = ({ ports }) => {
  console.log("connected");
  ports[0].onmessage = ({ data }) => {
    idToPortMap[data.name] = ports[0];
    onMessage(data);
  };
};
function isPromise(p) {
  if (typeof p === "object" && p !== null && typeof p.then === "function") {
    return true;
  }
  return false;
}
__name(isPromise, "isPromise");
function reconnect(codeSpace, name, hashCode) {
  return new Promise(async (resolve) => {
    if (isPromise(mod[codeSpace])) {
      return resolve(await mod[codeSpace]);
    }
    if (mod[codeSpace] && mod[codeSpace].readyState !== 1)
      delete mod[codeSpace];
    const ws = new WebSocket(
      `wss://${location.host}/live/` + codeSpace + "/websocket"
    );
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ name, hashCode }));
      ws.addEventListener(
        "message",
        (ev) => {
          const mess = { codeSpace, ...JSON.parse(ev.data) };
          console.log({ mess });
          bc.postMessage(mess);
        }
      );
      mod[codeSpace] = ws;
      resolve(ws);
    });
  });
}
__name(reconnect, "reconnect");
