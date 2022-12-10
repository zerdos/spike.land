"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // js/sharedWorker.ts
  var mod = {};
  var onMessage = /* @__PURE__ */ __name(async (data) => {
    if (data.codeSpace && data.name && data.hashCode) {
      const { name, codeSpace, target, type, patch, address, hashCode, newHash, oldHash, candidate, offer, answer } = data;
      const reconnect = /* @__PURE__ */ __name(async (codeSpace2, name2, hashCode2) => new Promise((_res) => {
        const ws = new WebSocket(
          `wss://${location.host}/live/` + codeSpace2 + "/websocket"
        );
        ws.addEventListener("open", () => {
          ws.send(JSON.stringify({ name: name2, hashCode: hashCode2 }));
          ws.addEventListener(
            "message",
            (ev) => {
              const mess = { codeSpace: codeSpace2, ...JSON.parse(ev.data) };
              console.log({ mess });
              bc.postMessage(mess);
            }
          );
          mod[codeSpace2] = ws;
          _res(ws);
        });
      }), "reconnect");
      if (!mod[codeSpace] || mod[codeSpace].readyState !== 1) {
        await reconnect(codeSpace, name, hashCode);
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
  var idToPortMap = {};
  var bc;
  self.addEventListener("connect", (e) => {
    console.log("connected");
    if (!bc) {
      bc = new BroadcastChannel(location.origin);
      bc.addEventListener("message", (ev) => onMessage(ev));
    }
    const port = e.ports[0];
    port.addEventListener("message", (ev) => {
      const data = ev.data;
      idToPortMap[data.name] = port;
      onMessage(data);
    });
  });
})();
