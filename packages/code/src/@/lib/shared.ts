import SharedWorker from "@/external/shared-worker";
import { ICodeSession } from "@/lib/interfaces";
import { Mutex } from "async-mutex";
import { getTransferables, hasTransferables } from "transferables";

import { RpcProvider } from "worker-rpc";

class WorkerWrapper {
  rpc: RpcProvider;
  workerPort: MessagePort;
  busy: boolean = false;

  constructor(port: MessagePort) {
    this.workerPort = port;
    this.rpc = new RpcProvider(
      (message) =>
        this.workerPort.postMessage(
          message,
          (hasTransferables(message as unknown)
            ? getTransferables(message as unknown)
            : undefined) as unknown as Transferable[],
        ),
      0,
    ) as unknown as RpcProvider;
    this.workerPort.onmessage = ({ data }) => this.rpc.dispatch(data);
  }
}

class WorkerPool {
  private workers: WorkerWrapper[] = [];
  private mutex = new Mutex();
  private minFreeWorkers: number;

  constructor(minFreeWorkers: number = 2) {
    this.minFreeWorkers = minFreeWorkers;
    this.initializeWorkers();
  }

  private initializeWorkers() {
    for (let i = 0; i < this.minFreeWorkers; i++) {
      this.addWorker();
    }
  }

  private async addWorker() {
    let worker: Worker | SharedWorker;
    let port: MessagePort;

    if (typeof process !== "undefined" && process.env.VI_TEST === "true") {
      const { Worker, MessageChannel } = require("worker_threads");
      worker = new Worker("/@/worker/ata-worker.worker.js");

      const channel = new MessageChannel();
      port = channel.port1;

      channel.port2.on("message", (message: any) => {
        worker.dispatchEvent(new MessageEvent("message", { data: message }));
      });

      worker.addEventListener("message", (message: any) => {
        channel.port1.postMessage(message);
      });

      // Start the port
      port.start();
      channel.port2.start();
    } else if (typeof SharedWorker !== "undefined") {
      worker = new SharedWorker("/@/workers/ata-worker.worker.js", { type: "classic" });
      port = worker.port;
    } else {
      worker = new Worker("/@/workers/ata-worker.worker.js");
      port = worker as unknown as MessagePort;
    }

    const workerWrapper = new WorkerWrapper(port);
    this.workers.push(workerWrapper);
  }

  async getWorker(): Promise<WorkerWrapper> {
    return this.mutex.runExclusive(async () => {
      let availableWorker = this.workers.find(worker => !worker.busy);

      if (!availableWorker) {
        await this.addWorker();
        availableWorker = this.workers[this.workers.length - 1];
      }

      availableWorker.busy = true;

      const freeWorkers = this.workers.filter(worker => !worker.busy).length;
      if (freeWorkers < this.minFreeWorkers) {
        this.addWorker().catch(console.error); // Non-blocking
      }

      return availableWorker;
    });
  }

  releaseWorker(worker: WorkerWrapper) {
    worker.busy = false;
  }
}

// Usage
const workerPool = new WorkerPool();

export async function init() {
  const worker = await workerPool.getWorker();
  return worker.rpc;
}

export const prettierToThrow = async (
  { code, toThrow }: { code: string; toThrow: boolean },
): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("prettierJs", { code, toThrow });
  } finally {
    workerPool.releaseWorker(worker);
  }
};

const prettierMemo = new Map<string, string>();
export const prettier = async (code: string): Promise<string> => {
  if (prettierMemo.has(code)) return prettierMemo.get(code)!;

  const worker = await workerPool.getWorker();
  try {
    const c = await worker.rpc.rpc("prettierJs", { code, toThrow: false }) as string;
    prettierMemo.set(code, c);
    return c;
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const ata = async (
  { code }: { code: string },
): Promise<{ content: string; filePath: string }[]> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("ata", { code });
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const prettierCss = async (code: string): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("prettierCss", code);
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const tsx = async (code: string): Promise<{ content: string; filePath: string }[]> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("tsc", code);
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const updateSearchReplace = async (
  instructions: string,
  code: string,
): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("updateSearchReplace", { code, instructions });
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const createWorkflow = async (q: string): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("createWorkflow", q);
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const transpile = async (
  { code, originToUse }: { code: string; originToUse: string },
): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("transpile", { code, originToUse });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      throw e;
    }
  } finally {
    workerPool.releaseWorker(worker);
  }
  return ""; // Add a return statement here
};

export const build = async (
  { codeSpace, origin, format = "esm", splitting = false, entryPoint = "", external = [] }: {
    codeSpace: string;
    splitting?: boolean;
    external?: string[];
    origin: string;
    entryPoint?: string;
    format: "esm" | "iife";
  },
): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("build", {
      codeSpace,
      origin,
      splitting,
      external,
      entryPoint,
      format,
    });
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const connect = async ({
  signal,
  sess,
}: {
  signal: string;
  sess: ICodeSession;
}): Promise<void> => {
  const worker = await workerPool.getWorker();
  try {
    await worker.rpc.signal("connect", { signal, sess });
  } finally {
    workerPool.releaseWorker(worker);
  }
};
