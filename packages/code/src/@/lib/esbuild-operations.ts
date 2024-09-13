import { buildOptions } from "@/lib/esbuild-build-config";
import { makeEnv } from "@/lib/esbuild-make-env";
import * as esbuild from "esbuild";

export const stop = () => esbuild.stop();
export const build = (opts: esbuild.BuildOptions) =>
  esbuild.build({ ...buildOptions, define: makeEnv("development"), ...opts });
