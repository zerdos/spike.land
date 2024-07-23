import { RpcProvider } from "worker-rpc";
export const rpcFactory = (port) => new RpcProvider((message, transfer) => port.postMessage(message, transfer));
