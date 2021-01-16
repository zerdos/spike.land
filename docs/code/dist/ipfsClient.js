import { v } from "./versions.js";
const workerSrc = `${v.workerPrefix}/ipfsWorker.js`;
/** @type {MessagePort} */
let port;
if (typeof SharedWorker !== "undefined") {
    // deno-lint-ignore ban-ts-comment
    //@ts-ignore
    const ipfsWorker = new SharedWorker(workerSrc, { name: "ipfs shared worker", type: "module" });
    port = ipfsWorker.port;
}
else {
    const worker = new Worker(workerSrc, { type: "module" });
    const { port1, port2 } = new MessageChannel();
    const msg = {
        clientInit: true,
        port: port1,
    };
    worker.postMessage(msg, [port1]);
    port = port2;
}
/** @type {any} */
let exp;
export const getClient = async () => {
    if (exp)
        return exp;
    const { CID, IpfsClient, } = await import(v.ipfsClient);
    exp = { ipfsClient: IpfsClient.from(port), CID };
    return exp;
};
