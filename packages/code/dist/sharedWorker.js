"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // js/sharedWorker.ts
  var mod = {};
  var bc = new BroadcastChannel(location.origin);
  var onMessage = /* @__PURE__ */ __name(async (event) => {
    if (event.data.codeSpace && event.data.name && event.data.hashCode) {
      const { name, codeSpace, target, type, patch, address, hashCode, newHash, oldHash, candidate, offer, answer } = event.data;
      const reconnect = /* @__PURE__ */ __name(async () => mod[codeSpace] = await new Promise((_res) => {
        const ws = new WebSocket(
          `wss://${location.host}/live/` + codeSpace + "/websocket"
        );
        ws.addEventListener("open", () => {
          _res(ws);
          ws.send(JSON.stringify({ name, hashCode }));
          ws.addEventListener(
            "message",
            (ev) => {
              const mess = { codeSpace, ...JSON.parse(ev.data) };
              console.log({ mess });
              bc.postMessage(mess);
            }
          );
        });
      }), "reconnect");
      if (!mod[codeSpace] || mod[codeSpace].readyState !== 1) {
        await reconnect();
      }
      const obj = {
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
        answer
      };
      Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]);
      mod[codeSpace].send(JSON.stringify(obj));
    }
  }, "onMessage");
  bc.onmessage = (event) => onMessage(event);
  var idToPortMap = {};
  self.addEventListener("connect", (e) => {
    const port = e.ports[0];
    port.onmessage = (e2) => {
      const data = e2.data;
      idToPortMap[data.name] = port;
      onMessage(e2);
    };
  });
})();
