import * as esbuild from "esbuild";
import { buildOptions } from "./esbuild-build-config.ts";
import { makeEnv } from "./esbuild-make-env.ts";

export const stop = () => esbuild.stop();
export const build = (opts: esbuild.BuildOptions) =>
  esbuild.build({ ...buildOptions, define: makeEnv("development"), ...opts });
