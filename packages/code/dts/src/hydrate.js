import { Workbox } from "workbox-window";
import { getPort, init } from "./shared";
import { getTransferables, hasTransferables } from "transferables";
import { mkdir } from "./memfs";
import { handleRender } from "./render";
const { swVersion } = self;
setTimeout(() => {
    import("./tw.mjs");
});
if (navigator.serviceWorker) {
    setTimeout(() => {
        try {
            const sw = new Workbox(`/sw.js`);
            init(swVersion, null);
            const port = getPort();
            sw.getSW().then((sw) => {
                const swPort = new MessageChannel();
                port.addEventListener("message", ({ data }) => swPort.port1.postMessage(data, (hasTransferables(data)
                    ? getTransferables(data)
                    : undefined)));
                swPort.port1.addEventListener("message", ({ data }) => swPort.port1.postMessage(data, (hasTransferables(data)
                    ? getTransferables(data)
                    : undefined)));
                sw.postMessage({ type: "sharedworker", sharedWorkerPort: swPort.port1 }, [
                    swPort.port1,
                ]);
            });
            if ("serviceWorker" in navigator) {
                sw.register().then(() => navigator.serviceWorker.register("/sw.js").then((sw) => {
                    navigator.serviceWorker.getRegistrations().then((workers) => Promise.all(workers.filter((x) => x !== sw).map((x) => x.unregister())));
                }));
            }
        }
        catch (e) {
            console.error(e);
        }
    });
}
const paths = location.pathname.split("/");
const codeSpace = paths[2];
(async () => {
    try {
        await mkdir("/live").then(() => mkdir(`/live/${codeSpace}`));
    }
    catch (e) {
        console.error("no local storage available");
    }
})();
if (location.pathname === `/live/${codeSpace}`) {
    import("./ws").then(({ run }) => run());
}
else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
    BC.onmessage = ({ data }) => {
        const { html, css } = data;
        debugger;
        document.getElementById("root").innerHTML = [
            `<div id="${codeSpace}-css" style="height:100%;">`,
            "<style>",
            css,
            "</style>",
            html,
            "</div>",
        ].join("");
    };
}
else {
    import(`/live/${codeSpace}/index.mjs`).then(({ renderApp }) => renderApp()).then(() => handleRender());
    const rerender = (t = 0) => import(`/live/${codeSpace}/index.js/${t}`).then(({ renderApp }) => renderApp()).then(() => handleRender());
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
    BC.onmessage = () => {
        const now = Date.now();
        rerender(now);
    };
    window.onmessage = () => {
        const now = Date.now();
        rerender(now);
    };
}
