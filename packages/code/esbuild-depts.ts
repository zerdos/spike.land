
import * as esbuild from "https://deno.land/x/esbuild@v0.23.0/mod.js";
import type { Deno as IDeno } from "https://deno.land/std/node/module.ts";
export const { env, readDir, mkdir, copyFile, symlink, readTextFile } = (globalThis as unknown as {Deno: IDeno}).Deno;
export { esbuild };
