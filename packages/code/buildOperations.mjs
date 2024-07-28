import { buildOptions } from "./build-config.mjs";
import { esbuild } from "./esbuild-depts.mjs";
import { makeEnv } from "./helpers.mjs";

export const stop = () => esbuild.stop();
export const build = (opts) => esbuild.build({ ...buildOptions, define: makeEnv("development"), ...opts });
