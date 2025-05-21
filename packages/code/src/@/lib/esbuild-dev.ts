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

  console.warn("Reading ./dist directory for WASM file...");
  const { data: dir, error: readdirError } = await tryCatch(readdir("./dist"));

  if (readdirError || !dir) {
    console.error(
      "Error reading ./dist directory or directory is null:",
      readdirError,
    );
    throw new Error("Failed to read ./dist directory for WASM file");
  }

  for await (const file of dir) {
    if (file.includes("esbuild") && file.includes(".wasm")) {
      console.warn("WASM file found:", file);
      return file;
    }
  }

  console.error("WASM file not found in ./dist");
  throw new Error("WASM file not found");
};

async function main() {
  console.warn("Building... " + process.env.NODE_ENV);
  try {
    console.warn("Starting buildWorkers...");
    await buildWorkers();
    console.warn("buildWorkers completed.");

    console.warn("Starting buildMainScripts...");
    await buildMainScripts();
    console.warn("buildMainScripts completed.");

    console.warn("Starting buildWasm...");
    await buildWasm();
    console.warn("buildWasm completed.");

    // console.warn("Starting buildServiceWorker...");
    await buildServiceWorker();
    console.warn("buildServiceWorker completed.");

    console.warn("Fetching WASM file...");
    const wasmFile = await getWasmFile();
    console.warn("WASM file retrieved:", wasmFile);

    console.warn("Starting buildMainBundle with WASM file...");
    await buildMainBundle(wasmFile);
    console.warn("buildMainBundle completed.");

    console.warn("Stopping esbuild operations...");
    stop();
    console.warn("Build process completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
  }
}

main();
