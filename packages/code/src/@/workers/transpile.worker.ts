import { build, transpile } from "@/lib/transpile";
import wasmFile from "esbuild-wasm/esbuild.wasm";

Object.assign(globalThis, { transpile, build, wasmFile });
