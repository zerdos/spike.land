import type { BuildOptions } from "esbuild-wasm";
import { buildOptions } from "./build-config.ts";
import { esbuild } from "./esbuild-depts.ts";
import { makeEnv } from "./helpers.ts";

export const stop = () => esbuild.stop();
export const build = (opts: BuildOptions) => esbuild.build({ ...buildOptions, define: makeEnv("development"), ...opts });
