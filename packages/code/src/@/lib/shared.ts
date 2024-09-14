import SharedWorkerPolyfill from "@/external/shared-worker";
import { ICodeSession } from "@/lib/interfaces";
import { Mutex } from "async-mutex";
import { getTransferables, hasTransferables } from "transferables";
import { RpcProvider } from "worker-rpc";

type WorkerPort = MessagePort | Worker;

class WorkerWrapper {
  rpc: RpcProvider;
  workerPort: WorkerPort;
  busy: boolean = false;

  constructor(port: WorkerPort) {
    this.workerPort = port;
    this.rpc = new RpcProvider((message: any) =>
      this.workerPort.postMessage(
        message,
        hasTransferables(message) ? getTransferables(message) : undefined,
      )
    );

    this.workerPort.onmessage = (event: MessageEvent) => {
      this.rpc.dispatch(event.data);
    };
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

  private addWorker() {
    const worker = new SharedWorkerPolyfill("/@/workers/ata-worker.worker.js", {
      type: "classic",
    });
    const port = worker.port;

    const workerWrapper = new WorkerWrapper(port);
    this.workers.push(workerWrapper);
  }

  async getWorker(): Promise<WorkerWrapper> {
    return this.mutex.runExclusive(async () => {
      let availableWorker = this.workers.find((worker) => !worker.busy);

      if (!availableWorker) {
        this.addWorker();
        availableWorker = this.workers[this.workers.length - 1];
      }

      availableWorker.busy = true;

      const freeWorkers = this.workers.filter((worker) => !worker.busy).length;
      if (freeWorkers < this.minFreeWorkers) {
        this.addWorker(); // Now synchronous
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

export const prettierToThrow = async ({
  code,
  toThrow,
}: {
  code: string;
  toThrow: boolean;
}): Promise<string> => {
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
    const formattedCode = (await worker.rpc.rpc("prettierJs", {
      code,
      toThrow: false,
    })) as string;
    prettierMemo.set(code, formattedCode);
    return formattedCode;
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const ata = async ({
  code,
}: {
  code: string;
}): Promise<{ content: string; filePath: string }[]> => {
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

export const transpile = async ({
  code,
  originToUse,
}: {
  code: string;
  originToUse: string;
}): Promise<string> => {
  const worker = await workerPool.getWorker();
  try {
    return await worker.rpc.rpc("transpile", { code, originToUse });
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    workerPool.releaseWorker(worker);
  }
};

export const build = async ({
  codeSpace,
  origin,
  format = "esm",
  splitting = false,
  entryPoint = "",
  external = [],
}: {
  codeSpace: string;
  splitting?: boolean;
  external?: string[];
  origin: string;
  entryPoint?: string;
  format: "esm" | "iife";
}): Promise<string> => {
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
}): Promise<() => void> => {
  const worker = await workerPool.getWorker();
  try {
    await worker.rpc.rpc("connect", { signal, sess });
    return () => {
      workerPool.releaseWorker(worker);
    };
  } catch (e) {
    console.error(e);
    workerPool.releaseWorker(worker);
    throw e;
  }
};
