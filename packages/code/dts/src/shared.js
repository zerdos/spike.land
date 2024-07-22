import SharedWorker from "@okikio/sharedworker";
import { getTransferables, hasTransferables } from "transferables";
import { RpcProvider } from "worker-rpc";
const swVersion = self.swVersion || Math.random().toString();
let rpc = null;
let workerPort;
export const getPort = () => workerPort;
export const init = (swVersion, port = null) => {
    if (rpc !== null)
        return rpc;
    workerPort = port
        || (new SharedWorker(`/workerScripts/ataWorker.js?v=${swVersion}`)).port;
    rpc = new RpcProvider((message) => workerPort.postMessage(message, (hasTransferables(message)
        ? getTransferables(message)
        : undefined)), 0);
    workerPort.onmessage = ({ data }) => rpc.dispatch(data);
    return rpc;
};
export const prettier = (code) => init(swVersion).rpc("prettierJs", code);
export const ata = ({ code, originToUse }) => init(swVersion).rpc("ata", { code, originToUse });
export const tsx = (code) => init(swVersion).rpc("tsc", code);
export const transpile = ({ code, originToUse }) => init(swVersion).rpc("transpile", { code, originToUse });
export const build = ({ codeSpace, origin, format = "esm" }) => init(swVersion).rpc("build", {
    codeSpace,
    origin,
    format,
});
export const connect = (codeSpace) => init(swVersion).signal("connect", codeSpace);
