importScripts("/workersScripts/prettierEsm.js");
importScripts("/workersScripts/ata.js");

import "./superFetch";
import { RpcProvider } from "worker-rpc";

const { prettierJs, ata } = self;

const run = (opts) => ata({ ...opts, prettierJs });

declare const self: SharedWorkerGlobalScope;

self.onconnect = (e) => {
  console.log("onConnected...");
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
