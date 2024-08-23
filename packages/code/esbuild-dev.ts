// esbuild-dev.mjs
import {
  buildMainBundle,
  buildMainScripts,
  buildServiceWorker,
  buildTranspileScript,
  buildWasm,
  buildWorkers,
} from "./build-tasks.ts";
import { stop } from "./buildOperations.ts";

const getWasmFile = async (): Promise<string> => {
  const { promises } = await import("node:fs");
  const { readdir } = promises;

  const dir = await readdir("./dist");
  for await (const file of dir) {
    if (file.includes("esbuild") && file.includes(".wasm")) {
      return file;
    }
  }
  throw new Error("WASM file not found");
};

async function main() {
  console.log("Building... " + process.env.NODE_ENV);
  try {
    await buildWorkers();
    await buildMainScripts();
    await buildWasm();
    await buildTranspileScript();

    await buildServiceWorker();

    const wasmFile = await getWasmFile();
    await buildMainBundle(wasmFile);

    stop();
  } catch (error) {
    console.error("Build failed:", error);
    // Instead of process.exit(1), we'll just log the error
  }
}

main();
