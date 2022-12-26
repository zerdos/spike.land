importScripts("/prettierEsm.js");

import { RpcProvider } from "worker-rpc";

const rpcProvider = new RpcProvider(
  (message, transfer) => postMessage(message, transfer),
);

onmessage = (e) => rpcProvider.dispatch(e.data);

rpcProvider.registerRpcHandler("prettierJs", (code: string) => prettierJs(code));
