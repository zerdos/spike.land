import type { ICodeSession } from "@/lib/interfaces";
import { lazyLoadScript as loadSC } from "@/lib/lazy-load-scripts";
import { RpcProvider } from "worker-rpc";

importScripts("/swVersion.js");

interface SharedWorkerGlobalScope {
  swVersion: string;
  files: Record<string, string>;
  fileCacheName: string;
}

const lazyLoadScript = (scriptName: string): void => {
  const file = (globalThis as unknown as SharedWorkerGlobalScope).files["@/workers/" + scriptName + ".worker.js"];
  const fileParts = file.split(".").slice(-2);
  fileParts.pop();
  const hash = fileParts[0];
  return loadSC(scriptName, hash);
};

type WorkerFunctions = {
  ata: (params: { code: string; originToUse: string }) => Promise<unknown>;
  prettierCss: (code: string) => Promise<string>;
  prettierJs: ({ code, toThrow }: { code: string; toThrow: boolean }) => Promise<string>;
  createWorkflow: (q: string) => Promise<unknown>;
  transpile: (code: string, originToUse: string) => Promise<string>;
  build: (params: BuildParams) => Promise<unknown>;
  tsx: (code: string) => Promise<string[]>;
  handleSendMessage: (
    { codeSpace, prompt, images }: { codeSpace: string; prompt: string; images: ImageData[] },
  ) => Promise<string>;
  setConnections: (signal: string, sess: ICodeSession) => void;
};

const self: SharedWorkerGlobalScope & { onconnect?: (e: MessageEvent) => void } & WorkerFunctions =
  globalThis as unknown as SharedWorkerGlobalScope & { onconnect?: (e: MessageEvent) => void } & WorkerFunctions;

interface BuildParams {
  codeSpace: string;
  splitting?: boolean;
  entryPoint?: string;
  origin: string;
  format: "esm" | "iife";
  external?: string[];
}

const rpcFactory = (port: MessagePort): RpcProvider =>
  new RpcProvider((message, transfer) => port.postMessage(message, transfer as StructuredSerializeOptions));

const workerFiles: Record<keyof WorkerFunctions, string[]> = {
  prettierJs: ["prettier-esm"],
  createWorkflow: ["lang-chain"],
  prettierCss: ["prettier-esm"],
  ata: ["ata", "dts"],
  transpile: ["transpile"],
  handleSendMessage: ["chat-utils", "transpile", "prettier-esm"],
  build: ["transpile"],
  tsx: ["dts"],
  setConnections: ["socket"],
};

const handleRpcError = async (
  name: keyof WorkerFunctions,
  args: unknown[],
): Promise<ReturnType<WorkerFunctions[typeof name]>> => {
  try {
    workerFiles[name].forEach((script) => {
      lazyLoadScript(script);
    });

    const func = self[name];

    if (typeof self[name] !== "function") {
      throw new Error(`Function ${name} is not defined on self after loading scripts.`);
    }

    return await (func as (...args: unknown[]) => Promise<unknown>)(...args);
  } catch (error) {
    console.error(`RPC handler error for ${name}:`, error);
    throw error;
  }
};

const registerRpcHandlers = (rpcProvider: RpcProvider): void => {
  (Object.keys(workerFiles) as (keyof WorkerFunctions)[]).forEach((name) => {
    rpcProvider.registerRpcHandler(name, (...args) => handleRpcError(name, args));
  });

  rpcProvider.registerSignalHandler(
    "connect",
    async ({ signal, sess }: { signal: string; sess: ICodeSession }) => {
      console.log("Connecting to signal", signal, sess);

      lazyLoadScript("socket");
      await (globalThis as unknown as typeof self).setConnections(signal, sess);
    },
  );
};

const start = (port: MessagePort): void => {
  const rpcProvider = rpcFactory(port);
  port.onmessage = ({ data }) => rpcProvider.dispatch(data);
  registerRpcHandlers(rpcProvider);
};

self.onconnect = (e: MessageEvent) => start(e.ports[0]);

if (!("SharedWorkerGlobalScope" in self)) {
  start(self as unknown as MessagePort);
}
