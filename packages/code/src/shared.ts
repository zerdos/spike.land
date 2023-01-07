import { RpcProvider } from "worker-rpc";

let worker: SharedWorker | null = null;
const init = () => {
  worker = globalThis.shworker = globalThis.shworker || new SharedWorker("/ataWorker.js?" + globalThis.assetHash);
  const rpcProvider = () =>
    new RpcProvider(
      (message, transfer) => worker!.port.postMessage(message, transfer as any),
    );

  worker.port.onmessage = (e) => rpcProvider().dispatch(e.data);
  return rpcProvider();
};

export const prettier = async (code: string) => await init().rpc("prettierJs", code) as unknown as string;
export const ata = async ({ code, originToUse }: { code: string; originToUse: string }) =>
  (await init().rpc("ata", { code, originToUse })) as {
    content: string;
    filePath?: string;
  }[];
