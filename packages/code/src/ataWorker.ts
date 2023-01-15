globalThis.isSharedWorker = true;

importScripts("/workerScripts/superFetch.js");

import type * as RPC from "worker-rpc";

import type { ata as Ata } from "./ata";
import type { prettierJs as Prettier } from "./prettierEsm";
import type { transpile as Transpile } from "./transpile";

declare var self: SharedWorkerGlobalScope & { RpcProvider: typeof RPC.RpcProvider } & { ata: typeof Ata } & {
  prettierJs: typeof Prettier;
} & { transpile: typeof Transpile };

Object.assign(self, { fetch: globalThis.superFetch });

importScripts("/workerScripts/workerRpc.js");
importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/ata.js");
importScripts("/workerScripts/transpile.js");

const { RpcProvider, ata, prettierJs, transpile } = self;

self.onconnect = ({ ports }) => {
  const p = ports[0];

  const rpcProvider = new RpcProvider(
    (message, transfer) => p.postMessage(message, transfer as StructuredSerializeOptions),
  );

  p.onmessage = (e) => rpcProvider.dispatch(e.data);
  globalThis.isSharedWorker = true;

  rpcProvider.registerRpcHandler(
    "prettierJs",
    (code: string) => prettierJs(code),
  );

  rpcProvider.registerRpcHandler(
    "ata",
    ({ code, originToUse }: { code: string; originToUse: string }) => ata({ code, originToUse, prettierJs }),
  );

  rpcProvider.registerRpcHandler("transpile", (code: string) => transpile(code));

  p.start();
};
