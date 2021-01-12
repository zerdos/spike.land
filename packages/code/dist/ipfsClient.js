import { importScript } from "./importScript.js";
//@ts-ignore
let ipfs;
export const getIpfs = async () => {
    //@ts-ignore
    if (ipfs)
        return ipfs;
    // @ts-ignore
    const { IpfsMessagePortClient } = await importScript("https://unpkg.com/ipfs-message-port-client@0.4.3/dist/index.min.js");
    const workerSrc = window.location.hostname === "blog.zed.vision"
        ? `https://blog.zed.vision/code/src/ipfsWorker.js`
        : window.location.hostname === "[::1]"
            ? `${location.href}src/ipfsWorker.js`
            : `${location.origin}/src/ipfsWorker.js`;
    if (typeof SharedWorker !== "undefined") {
        const worker = new SharedWorker(workerSrc);
        ipfs = IpfsMessagePortClient.from(worker.port);
    }
    else {
        const worker = new Worker(workerSrc);
        const { port1, port2 } = new MessageChannel();
        port1.onmessage = function (e) {
            worker.postMessage(e.data, [e.data]);
        };
        worker.onmessage = function (e) {
            port1.postMessage(e.data, [e.data]);
        };
        ipfs = IpfsMessagePortClient.from(port2);
    }
    return ipfs;
};
