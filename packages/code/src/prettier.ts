import { RpcProvider } from "worker-rpc";

const worker = new SharedWorker("/ataWorker.js?" + globalThis.assetHash);
rpcProvider = new RpcProvider(
  (message, transfer) => worker.port.postMessage(message, transfer as any),
);

worker.port.onmessage = (e) => rpcProvider.dispatch(e.data);

export const prettier = async (code: string) => (await rpcProvider.rpc("prettierJs", code)) as unknown as string;
