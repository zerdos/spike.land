importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/ata.js");

import "./superFetch";
import { RpcProvider } from "worker-rpc";

const { prettierJs, ata } = self;

const run = (opts) => ata({ ...opts, prettierJs });

declare const self: SharedWorkerGlobalScope;

self.onconnect = ({ ports }) => {
  // const port = e.ports[0];

  const {postMessage} = ports[0];
  const rpcProvider = new RpcProvider(
    postMessage
  );
  ports[0].onmessage = ({ data }) => rpcProvider.dispatch(data);

  rpcProvider.registerRpcHandler("ata", run);
  rpcProvider.registerRpcHandler("prettierJs", prettierJs);

  ports[0].start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};
