import type { ICodeSession } from "@/lib/interfaces";
import { lazyLoadScript } from "@/lib/lazy-load-scripts";
import { RpcProvider } from "worker-rpc";

interface ExtendedSharedWorkerGlobalScope extends SharedWorkerGlobalScope {
  ata: (params: { code: string; originToUse: string; tsx: any }) => Promise<any>;
  prettierCss: (code: string) => Promise<string>;
  prettierJs: (code: string, toThrow: boolean) => Promise<string>;
  createWorkflow: (q: string) => Promise<any>;
  transpile: (code: string, originToUse: string) => Promise<string>;
  build: (params: BuildParams) => Promise<any>;
  tsx: any;
  updateSearchReplace: (instructions: string, code: string) => Promise<string>;
  setConnections: (signal: string, sess: ICodeSession) => void;
  generateCSS: (classNames: string[]) => Promise<string>;
}

const self = globalThis as unknown as ExtendedSharedWorkerGlobalScope;

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

const loadedScripts = new Set<string>();

const safelyLoadScript = async (scriptName: string): Promise<void> => {
  if (!loadedScripts.has(scriptName)) {
    await lazyLoadScript(scriptName);
    loadedScripts.add(scriptName);
  }
};

const handleRpcError = async (handler: () => Promise<any>): Promise<any> => {
  try {
    return await handler();
  } catch (error) {
    console.error("RPC handler error:", error);
    throw new Error("An error occurred while processing the request");
  }
};

const registerRpcHandlers = (rpcProvider: RpcProvider): void => {
  const handlers: [string, (...args: any[]) => Promise<any>][] = [
    ["prettierJs", async ({ code, toThrow }: { code: string; toThrow: boolean }) => {
      await safelyLoadScript("prettier-esm");
      return self.prettierJs(code, toThrow);
    }],
    ["createWorkflow", async (q: string) => {
      await safelyLoadScript("lang-chain");
      return self.createWorkflow(q);
    }],
    ["prettierCss", async (code: string) => {
      await safelyLoadScript("prettier-esm");
      return self.prettierCss(code);
    }],
    ["ata", async ({ code, originToUse }: { code: string; originToUse: string }) => {
      await Promise.all([safelyLoadScript("ata"), safelyLoadScript("dts")]);
      return self.ata({ code, originToUse, tsx: self.tsx });
    }],
    ["transpile", async ({ code, originToUse }: { code: string; originToUse: string }) => {
      await safelyLoadScript("transpile");
      return self.transpile(code, originToUse);
    }],
    ["updateSearchReplace", async ({ code, instructions }: { code: string; instructions: string }) => {
      await safelyLoadScript("chat-utils");
      return self.updateSearchReplace(instructions, code);
    }],
    ["build", async (params: BuildParams) => {
      await safelyLoadScript("transpile");
      return self.build(params);
    }],
    ["generateCSS", async (classNames: string[]) => {
      await safelyLoadScript("generate-css");
      return self.generateCSS(classNames);
    }],
  ];

  handlers.forEach(([name, handler]) => {
    rpcProvider.registerRpcHandler(name, (...args) => handleRpcError(() => handler(...args)));
  });

  rpcProvider.registerSignalHandler(
    "connect",
    async ({ signal, sess }: { signal: string; sess: ICodeSession }) => {
      console.log("Connecting to signal", signal, sess);

      await safelyLoadScript("socket");
      self.setConnections(signal, sess);
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

export {};
