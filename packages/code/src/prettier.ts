import { RpcProvider } from "worker-rpc";

const worker = new Worker("/prettierWorker.js"),
  rpcProvider = new RpcProvider(
    (message, transfer) => worker.postMessage(message, transfer as any),
  );

worker.onmessage = (e) => rpcProvider.dispatch(e.data);

export const prettier = async (code: string) => (await rpcProvider.rpc("prettierJs", code)) as unknown as string;
