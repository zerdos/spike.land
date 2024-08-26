import SharedWorker from "@okikio/sharedworker";
import { Mutex } from "async-mutex";
import { getTransferables, hasTransferables } from "transferables";
import { RpcProvider } from "worker-rpc";
import { ICodeSession } from "./makeSess";

const mutex = new Mutex();

let rpc: RpcProvider | null = null;
let workerPort: MessagePort;
export const getPort = () => workerPort;
export const init = (port: MessagePort | null = null) => {
  if (rpc !== null) return rpc;

  workerPort = port
    || (new SharedWorker(`/workerScripts/ataWorker.js`)).port;
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

export const prettierToThrow = async (
  { code, toThrow }: { code: string; toThrow: boolean },
) => init().rpc("prettierJs", { code, toThrow }) as Promise<string>;

const prettierMemo = new Map<string, string>();
export const prettier = async (code: string) => {
  if (prettierMemo.has(code)) return prettierMemo.get(code)!;

  return mutex.runExclusive(async () => {
    const c = await prettierToThrow({ code, toThrow: false });
    prettierMemo.set(code, c);
    return c;
  });
};

export const ata = (
  { code, originToUse }: { code: string; originToUse: string },
) =>
  init().rpc("ata", { code, originToUse }) as Promise<{
    content: string;
    filePath: string;
  }[]>;

export const prettierCss = (
  code: string,
) => init().rpc("prettierCss", code) as Promise<string>;

export const tsx = (
  code: string,
) =>
  init().rpc("tsc", code) as Promise<{
    content: string;
    filePath: string;
  }[]>;

export const createWorkflow = (
  q: string,
) => init().rpc("createWorkflow", q) as Promise<string>;

const transpileID = (
  { code, originToUse }: { code: string; originToUse: string },
) => init().rpc("transpile", { code, originToUse }) as Promise<string>;

export const transpile = async (
  { code, originToUse }: { code: string; originToUse: string },
) => {
  try {
    return await mutex.runExclusive(async () => {
      const transpiled = await transpileID({ code, originToUse });
      if (transpiled === "/** js.spike.land */\n[object Object]") {
        throw new Error("transpile error", { cause: transpiled });
      }
      if (typeof transpiled !== "string") {
        throw new Error("transpile error", { cause: transpiled });
      }
      return transpiled;
    });
  } catch (e) {
    console.error(e);
    throw new Error("transpile error", { cause: e });
  }
};

export const build = (
  { codeSpace, origin, format = "esm", splitting = false, entryPoint = "", external = [] }: {
    codeSpace: string;
    splitting?: boolean;
    external?: string[];
    origin: string;
    entryPoint?: string;
    format: "esm" | "iife";
  },
) =>
  init().rpc("build", {
    codeSpace,
    origin,
    splitting,
    external,
    entryPoint,
    format,
  }) as Promise<string>;

export const connect = ({
  signal,
  sess,
}: {
  signal: string;
  sess: ICodeSession;
}) => init().signal("connect", { signal, sess });
