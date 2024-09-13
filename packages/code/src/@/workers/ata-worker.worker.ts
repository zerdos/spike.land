import { ICodeSession } from "@/lib/interfaces";
import { lazyLoadScript } from "@/lib/lazy-load-scripts";
import { RpcProvider } from "worker-rpc";

export const rpcFactory = (port: MessagePort) =>
  new RpcProvider(
    (message, transfer) => port.postMessage(message, transfer as StructuredSerializeOptions),
  );

declare var self: SharedWorkerGlobalScope & {
  ata: any;
  prettierCss: any;
  prettierJs: any;
  createWorkflow: any;
  transpile: any;
  build: any;
  tsx: any;
  updateSearchReplace: any;
  setConnections: any;
};

function start(port: MessagePort) {
  const rpcProvider = rpcFactory(port);
  port.onmessage = ({ data }) => rpcProvider.dispatch(data);

  registerRpcHandlers(rpcProvider);
}

function registerRpcHandlers(rpcProvider: ReturnType<typeof rpcFactory>) {
  rpcProvider.registerRpcHandler("prettierJs", async ({ code, toThrow }: { code: string; toThrow: boolean }) => {
    await lazyLoadScript("prettier-esm");
    return self.prettierJs(code, toThrow);
  });

  rpcProvider.registerRpcHandler("createWorkflow", async (q: string) => {
    await lazyLoadScript("lang-chain");
    return self.createWorkflow(q);
  });

  rpcProvider.registerRpcHandler("prettierCss", async (code: string) => {
    await lazyLoadScript("prettier-esm");
    return self.prettierCss(code);
  });

  rpcProvider.registerRpcHandler("ata", async ({ code }: { code: string }) => {
    await Promise.all([lazyLoadScript("ata"), lazyLoadScript("dts")]);
    return self.ata({ code, tsx: self.tsx });
  });

  rpcProvider.registerRpcHandler("transpile", async ({ code, originToUse }: { code: string; originToUse: string }) => {
    await lazyLoadScript("transpile");
    return self.transpile(code, originToUse);
  });

  rpcProvider.registerRpcHandler(
    "updateSearchReplace",
    async ({ code, instructions }: { code: string; instructions: string }) => {
      await lazyLoadScript("chat-utils");
      return self.updateSearchReplace(instructions, code);
    },
  );

  rpcProvider.registerRpcHandler("build", async (params: {
    codeSpace: string;
    splitting?: boolean;
    entryPoint?: string;
    origin: string;
    format: "esm" | "iife";
    external?: string[];
  }) => {
    await lazyLoadScript("transpile");
    return self.build(params);
  });

  rpcProvider.registerSignalHandler(
    "connect",
    async ({ signal, sess }: { signal: string; sess: ICodeSession }) => {
      await lazyLoadScript("socket");
      self.setConnections(signal, sess);
    },
  );
}

self.onconnect = (e) => start(e.ports[0]);

if (!("SharedWorkerGlobalScope" in self)) {
  start(self as typeof self & MessagePort);
}

export {};
