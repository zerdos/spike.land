globalThis.isSharedWorker = true;

importScripts("/workerScripts/superFetch.js");
globalThis.originalFetch = self.fetch;
self.fetch = globalThis.superFetch;

importScripts("/workerScripts/workerRpc.js");
importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/ata.js");
importScripts("/workerScripts/transpile.js");

const { RpcProvider, ata, prettierJs, esmTransform } = self;

self.onconnect = ({ ports }) => {
  const p = ports[0];

  const rpcProvider = new RpcProvider(
    (message, transfer) => p.postMessage(message, transfer),
  );

  p.onmessage = e => rpcProvider.dispatch(e.data);

  rpcProvider.registerRpcHandler("prettierJs", (code: string) => prettierJs(code));

  rpcProvider.registerRpcHandler(
    "ata",
    ({ code, originToUse }: { code: string; originToUse: string }) => ata({ code, originToUse, prettierJs }),
  );

  rpcProvider.registerRpcHandler("transpile"),
    ({ code, origin }: { code: string; origin: string }) => esmTransform(code, origin);

  p.start();
};
