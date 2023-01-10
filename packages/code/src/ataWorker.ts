importScripts("/workerScripts/superFetch.js");
self.originalFetch = self.fetch;
self.fetch = self.superFetch;

importScripts("/workerScripts/workerRpc.js");
importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/ata.js");

const { RpcProvider, ata, prettierJs } = self;

self.onconnect = ({ ports }) => {
  const p = ports[0];

  const rpcProvider = new RpcProvider(
    (message, transfer) => p.postMessage(message, transfer),
  );

  p.onmessage = e => rpcProvider.dispatch(e.data);

  rpcProvider.registerRpcHandler("prettierJs", (code: string) => prettierJs(code));

  rpcProvider.registerRpcHandler("ata", ({ code, originToUse }) => ata({ code, originToUse, prettierJs }));

  p.start();
};
