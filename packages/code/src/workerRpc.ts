import { RpcProvider } from "worker-rpc";

const rpcFactory = (port: MessagePort) =>
  new RpcProvider(
    (message, transfer) => port.postMessage(message, transfer as StructuredSerializeOptions),
  );
Object.assign(self, { rpcFactory });

export type RpcFactory = typeof rpcFactory;
