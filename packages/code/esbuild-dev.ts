import {
  buildMainBundle,
  buildMainScripts,
  buildServiceWorker,
  buildTailwind,
  buildWasm,
  buildWorkers,
} from "@/lib/esbuild-build-tasks";
import { stop } from "@/lib/esbuild-operations";

const getWasmFile = async (): Promise<string> => {
  const { promises } = await import("node:fs");
  const { readdir } = promises;

  console.log("Reading ./dist directory for WASM file...");
  const dir = await readdir("./dist");
  for await (const file of dir) {
    if (file.includes("esbuild") && file.includes(".wasm")) {
      console.log("WASM file found:", file);
      return file;
    }
  }
  console.error("WASM file not found in ./dist");
  throw new Error("WASM file not found");
};

async function main() {
  console.log("Building... " + process.env.NODE_ENV);
  try {
    console.log("Starting buildWorkers...");
    await buildWorkers();
    console.log("buildWorkers completed.");

    console.log("Starting buildMainScripts...");
    await buildMainScripts();
    console.log("buildMainScripts completed.");

    console.log("Starting buildWasm...");
    await buildWasm();
    console.log("buildWasm completed.");

    console.log("Starting buildTailwind...");
    await buildTailwind();
    console.log("buildTailwind completed.");

    console.log("Starting buildServiceWorker...");
    await buildServiceWorker();
    console.log("buildServiceWorker completed.");

    console.log("Fetching WASM file...");
    const wasmFile = await getWasmFile();
    console.log("WASM file retrieved:", wasmFile);

    console.log("Starting buildMainBundle with WASM file...");
    await buildMainBundle(wasmFile);
    console.log("buildMainBundle completed.");

    console.log("Stopping esbuild operations...");
    stop();
    console.log("Build process completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
  }
}

main();