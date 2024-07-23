// esbuild-dev.mjs
import { stop } from "./buildOperations.mjs";
import { copyFiles } from "./copyFiles.mjs";
import { getWasmFile } from "./helpers.mjs";
import {
  buildWorkers,
  buildMainScripts,
  buildTranspileScript,
  buildServiceWorker,
  buildMainBundle,
} from "./build-tasks.mjs";

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