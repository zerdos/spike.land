"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // js/sharedWorker.ts
  var mod = {};
  var reconnect = /* @__PURE__ */ __name((codeSpace, name, hashCode) => new Promise(async (resolve) => {
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
  }), "reconnect");
  var onMessage = /* @__PURE__ */ __name(async ({ name, codeSpace, target, type, patch, users, address, hashCode, newHash, oldHash, candidate, offer, answer }) => {
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
  }, "onMessage");
  var idToPortMap = {};
  var bc;
  self.addEventListener("connect", (e) => {
    console.log("connected");
    if (!bc) {
      bc = new BroadcastChannel(location.origin);
      bc.addEventListener("message", (ev) => onMessage(ev.data));
    }
    const port = e.ports[0];
    port.onmessage = ({ data }) => {
      idToPortMap[data.name] = port;
      onMessage(data);
    };
  });
  function isPromise(p) {
    if (typeof p === "object" && p !== null && typeof p.then === "function") {
      return true;
    }
    return false;
  }
  __name(isPromise, "isPromise");
})();
