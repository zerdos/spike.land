"use strict";
(() => {
  var s = {},
    i = async () => {
      let e = o();
      window.worker = e,
        navigator.serviceWorker.onmessage = n,
        await navigator.serviceWorker.register(
          new URL("https:/spike.land/service.js", s.url),
          {
            scope: "/",
          },
        ),
        await navigator.serviceWorker.ready;
      let r = document.getElementById("debug");
      if (r) r.textContent = "SW is ready", r.style.display = "none";

      document.documentElement.dataset.viewer == null && a(location.pathname);
    },
    a = async (e) => {
      let [, r] = e.split("/");
      switch (r) {
        case "ipfs":
        case "ipns":
          document.body.innerHTML =
            `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${e}"></iframe>`;
      }
    },
    n = (e) => {
      let r = e.source;
      if (r != null) {
        switch (e.data.method) {
          case "ipfs-message-port": {
            let t = o();
            return r.postMessage({
              method: "ipfs-message-port",
              id: e.data.id,
              port: t.port,
            }, [t.port]);
          }
        }
      }
    },
    o = () =>
      new SharedWorker(new URL("https:/spike.land/worker.js", s.url), "IPFS");
  i();
})();
