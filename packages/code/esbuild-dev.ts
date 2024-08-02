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
import { copyFiles } from "./copyFiles.ts";
import { getWasmFile } from "./helpers.ts";

async function main() {
  try {
    await copyFiles();
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
