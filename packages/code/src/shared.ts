import SharedWorker from "@okikio/sharedworker";
import { getTransferables, hasTransferables } from "transferables";
import { RpcProvider } from "worker-rpc";

let rpc: RpcProvider | null = null;
let workerPort: MessagePort;
export const getPort = () => workerPort;
export const init = (swVersion: string, port: MessagePort | null = null) => {
  if (rpc !== null) return rpc;

  workerPort = port || (new SharedWorker("/workerScripts/ataWorker.js?v=" + swVersion)).port;
  rpc = new RpcProvider(
    (message) =>
      workerPort.postMessage(
        message,
        (hasTransferables(message as unknown)
          ? getTransferables(message as unknown)
          : undefined) as unknown as Transferable[],
      ),
    0,
  ) as unknown as RpcProvider;
  workerPort.onmessage = ({ data }) => rpc!.dispatch(data);
  return rpc;
};
const { swVersion } = self;
export const prettier = (code: string) => init(swVersion).rpc("prettierJs", code) as unknown as string;
export const ata = (
  { code, originToUse }: { code: string; originToUse: string },
) =>
  init(swVersion).rpc("ata", { code, originToUse }) as Promise<{
    content: string;
    filePath?: string;
  }[]>;

export const transpile = (
  { code, originToUse }: { code: string; originToUse: string },
) => init(swVersion).rpc("transpile", { code, originToUse }) as Promise<string>;

export const connect = (codeSpace: string) => init(swVersion).signal("connect", codeSpace);
