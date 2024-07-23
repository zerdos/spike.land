// esbuild-dev.mjs
import {
  buildMainBundle,
  buildMainScripts,
  buildServiceWorker,
  buildTranspileScript,
  buildWorkers,
} from "./build-tasks.mjs";
import { stop } from "./buildOperations.mjs";
import { copyFiles } from "./copyFiles.mjs";
import { getWasmFile } from "./helpers.mjs";

async function main() {
  try {
    await copyFiles();
    await buildWorkers();
    await buildMainScripts();
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
