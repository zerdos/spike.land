import { RpcProvider } from "worker-rpc";

import { prettierJs, run } from "./ata";

declare const self: SharedWorkerGlobalScope;

self.onconnect = (e) => {
  const port = e.ports[0];

  port.addEventListener("message", (e) => rpcProvider.dispatch(e.data));

  const dispatcher: RpcProvider.Dispatcher = (m, t) => port.postMessage(m, t as StructuredSerializeOptions);

  const rpcProvider = new RpcProvider(
    dispatcher,
  );
  rpcProvider.registerRpcHandler("ata", run);
  rpcProvider.registerRpcHandler("prettierJs", prettierJs);

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};
