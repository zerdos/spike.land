import {
  buildMainBundle,
  buildMainScripts,
  buildServiceWorker,
  buildWasm,
  buildWorkers,
} from "./esbuild-build-tasks.ts";

import { stop } from "./esbuild-operations.ts";
import { tryCatch } from "./try-catch.ts"; // Added import

const getWasmFile = async () => {
  const { promises } = await import("node:fs");
  const { readdir } = promises;

  console.log("Reading ./dist directory for WASM file...");
  const { data: dir, error: readdirError } = await tryCatch(readdir("./dist"));

  if (readdirError || !dir) {
    console.error("Error reading ./dist directory or directory is null:", readdirError);
    throw new Error("Failed to read ./dist directory for WASM file");
  }

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

    // console.log("Starting buildServiceWorker...");
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
