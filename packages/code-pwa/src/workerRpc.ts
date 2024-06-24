import { RpcProvider } from "worker-rpc";

export const rpcFactory = (port: MessagePort) =>
  new RpcProvider(
    (message, transfer) => port.postMessage(message, transfer as StructuredSerializeOptions),
  );
