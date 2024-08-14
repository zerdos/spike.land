import * as esbuild from "esbuild";
import { buildOptions } from "./build-config";
import { Environment } from "./build-tasks.ts";
import { makeEnv } from "./helpers.ts";

export const stop = () => esbuild.stop();
export const build = (opts: esbuild.BuildOptions) =>
  esbuild.build({ ...buildOptions, define: makeEnv("development"), ...opts });
