import { RpcProvider } from "worker-rpc";

import { run } from "./ata";

const dispatcher: RpcProvider.Dispatcher = (m, t) => postMessage(m, t as StructuredSerializeOptions);

const rpcProvider = new RpcProvider(
  dispatcher,
);

onconnect = (e) => {
  const port = e.ports[0];

  port.addEventListener("message", (e) => rpcProvider.dispatch(e.data));

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};

rpcProvider.registerRpcHandler("ata", run);
