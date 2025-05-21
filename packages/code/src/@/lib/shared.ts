import type { ICodeSession } from "@/lib/interfaces";
import AlwaysSupportedSharedWorker from "@/lib/shared-w-polyfill";
import { getTransferables, hasTransferables } from "@/lib/transferables";
import type { MyBuildOptions } from "@/lib/transpile";
import { tryCatch } from "@/lib/try-catch";
import { Mutex } from "async-mutex";
import { RpcProvider } from "worker-rpc";

// Shared utilities and constants

export const SHARED_CONSTANT = "shared-value";

// Add shared utilities here
export function sharedUtility() {
  return "shared-functionality";
}

type WorkerPort = MessagePort | Worker;

class WorkerWrapper {
  tag = "default";
  rpc: RpcProvider;
  workerPort: WorkerPort;
  busy = false;

  constructor(port: WorkerPort) {
    this.workerPort = port;
    this.rpc = new RpcProvider((message) =>
      this.workerPort.postMessage(
        message,
        (hasTransferables(message as unknown)
          ? getTransferables(message as unknown)
          : undefined) as unknown as Transferable[],
      )
    );

    this.workerPort.onmessage = (event: MessageEvent) => {
      this.rpc.dispatch(event.data);
    };
  }
}

class WorkerPool {
  private workers: WorkerWrapper[] = [];
  private minFreeWorkers: number;

  constructor(minFreeWorkers = 0) {
    this.minFreeWorkers = minFreeWorkers;
  }

  private addWorker(tag: string) {
    const worker = new AlwaysSupportedSharedWorker(
      tag === "connect"
        ? `/@/workers/shared-worker-rpc-handler.worker.js?workerId=connect`
        : `/@/workers/shared-worker-rpc-handler.worker.js?workerId=${tag}-${this.workers.length}`,
    );

    const port = worker.port;

    const workerWrapper = new WorkerWrapper(port);
    workerWrapper.tag = tag;
    this.workers.push(workerWrapper);
    return workerWrapper;
  }

  getWorker(tag = "default") {
    if (tag === "connect") {
      const connectWorker = this.workers.find((worker) => worker.tag === tag);
      if (connectWorker) {
        return connectWorker;
      }
    }
    const availableWorker = this.workers.find((worker) => !worker.busy && worker.tag === tag) ||
      this.addWorker(tag);

    availableWorker.busy = true;

    const freeWorkers = this.workers.filter((worker) => !worker.busy && worker.tag === tag)
      .length;
    if (freeWorkers < this.minFreeWorkers) {
      this.addWorker(tag);
    }

    return availableWorker;
  }

  releaseWorker(worker: WorkerWrapper) {
    worker.busy = false;
  }
}

let workerPool: WorkerPool;

async function init() {
  workerPool = (globalThis as unknown as { workerPool: WorkerPool; }).workerPool ||
    new WorkerPool(0);
  Object.assign(globalThis, { workerPool });

  return workerPool;
}

export const prettierToThrow = async ({
  code,
  toThrow,
}: {
  code: string;
  toThrow: boolean;
}): Promise<string> => {
  const worker = (await init()).getWorker("prettier");
  try {
    const { data, error } = await tryCatch(
      worker.rpc.rpc("prettierJs", { code, toThrow }) as Promise<string>,
    );
    if (error) throw error;
    return data!;
  } finally {
    (await init()).releaseWorker(worker);
  }
};

export const format = async (code: string): Promise<string> => {
  const { data, error } = await tryCatch(
    prettierToThrow({ code, toThrow: false }),
  );
  if (error) throw error;
  return data!;
};

export const ata = async ({
  code,
  originToUse,
}: {
  code: string;
  originToUse: string;
}): Promise<Array<{ content: string; filePath: string; }>> => {
  const worker = (await init()).getWorker("ata");
  try {
    const { data, error } = await tryCatch(
      worker.rpc.rpc("ata", { code, originToUse }) as Promise<
        Array<{ content: string; filePath: string; }>
      >,
    );
    if (error) throw error;
    return data!;
  } finally {
    (await init()).releaseWorker(worker);
  }
};

export const prettierCss = async (code: string): Promise<string> => {
  const worker = (await init()).getWorker("prettier");
  try {
    const { data, error } = await tryCatch(
      worker.rpc.rpc("prettierCss", code) as Promise<string>,
    );
    if (error) throw error;
    return data!;
  } finally {
    (await init()).releaseWorker(worker);
  }
};

export const tsx = async (
  code: string,
): Promise<Array<{ content: string; filePath: string; }>> => {
  const worker = (await init()).getWorker("tsx");
  try {
    const { data, error } = await tryCatch(
      worker.rpc.rpc("tsc", code) as Promise<
        Array<{ content: string; filePath: string; }>
      >,
    );
    if (error) throw error;
    return data!;
  } finally {
    (await init()).releaseWorker(worker);
  }
};

export const createWorkflow = async (q: string): Promise<string> => {
  const worker = (await init()).getWorker("workflow");
  try {
    const { data, error } = await tryCatch(
      worker.rpc.rpc("createWorkflow", q) as Promise<string>,
    );
    if (error) throw error;
    return data!;
  } finally {
    (await init()).releaseWorker(worker);
  }
};

let mutex: Mutex;

export const transpile = async ({
  code,
  originToUse,
  wasmModule,
}: {
  code: string;
  originToUse: string;
  wasmModule?: WebAssembly.Module;
}): Promise<string> => {
  if (!mutex) {
    mutex = new Mutex();
  }
  return mutex.runExclusive(async () => {
    const tp = (globalThis as unknown as {
      transpile?: typeof transpile;
    }).transpile;

    if (tp) {
      return tp({ code, originToUse, wasmModule });
    }
    const worker = (await init()).getWorker("esbuild");
    try {
      const { data, error } = await tryCatch(
        worker.rpc.rpc("transpile", {
          code,
          originToUse,
          wasmModule,
        }) as Promise<string>,
      );
      if (error) {
        console.error(error);
        throw error;
      }
      return data!;
    } finally {
      (await init()).releaseWorker(worker);
    }
  });
};

export const build = async ({
  codeSpace,
  origin,
  format = "esm",
  splitting = false,
  entryPoints,
  external = [],
}: MyBuildOptions): Promise<string> => {
  const worker = (await init()).getWorker("esbuild");
  try {
    const { data, error } = await tryCatch(
      worker.rpc.rpc("build", {
        codeSpace,
        origin,
        splitting,
        external,
        entryPoints,
        format,
      }) as Promise<string>,
    );
    if (error) throw error;
    return data!;
  } finally {
    (await init()).releaseWorker(worker);
  }
};

export const connect = async ({
  signal,
  sess,
}: {
  signal: string;
  sess: ICodeSession;
}): Promise<() => void> => {
  const worker = (await init()).getWorker("connect");
  try {
    // rpc.signal does not return a promise, so tryCatch is not directly applicable here
    // If it could error, it would need a synchronous try/catch or a different pattern
    worker.rpc.signal("connect", { signal, sess });

    return async () => {
      (await init()).releaseWorker(worker);
    };
  } catch (e) {
    console.error(e);
    (await init()).releaseWorker(worker);
    throw e; // Re-throw after logging and releasing worker
  }
};
