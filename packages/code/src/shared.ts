import { RpcProvider } from "worker-rpc";
let rpc: RpcProvider | null = null;
const init = () => {
  if (rpc) return rpc;
  const worker = globalThis.sharedWorker = globalThis.sharedWorker
    || new SharedWorker("/ataWorker.js?" + globalThis.assetHash);

  worker.port.onmessage = (e) => rpcProvider().dispatch(e.data);
  const rpcProvider = () =>
    new RpcProvider(
      (message, transfer) => worker!.port.postMessage(message, transfer as any),
    );
  return rpc = rpcProvider();
};

export const prettier = async (code: string) => await init().rpc("prettierJs", code) as unknown as string;
export const ata = async ({ code, originToUse }: { code: string; originToUse: string }) =>
  (await init().rpc("ata", { code, originToUse })) as {
    content: string;
    filePath?: string;
  }[];
