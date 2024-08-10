import type { Deno as IDeno } from "https://deno.land/std/node/module.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.23.0/mod.js";
export const { env, readDir, mkdir, symlink, readTextFile } = (globalThis as unknown as { Deno: IDeno }).Deno;
export { esbuild };
