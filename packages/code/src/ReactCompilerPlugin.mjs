/* global console, performance */
import { readTextFile } from "../esbuild-depts.ts";

import * as babel from "@babel/core";
import BabelPluginReactCompiler from "babel-plugin-react-compiler";

import QuickLRU from "quick-lru";

export function ReactCompilerEsbuildPlugin({
  filter,
  sourceMaps,
  runtimeModulePath,
}) {
  return {
    name: "esbuild-react-compiler-plugin",
    setup(build) {
      // Cache previous outputs for incremental rebuilds
      const buildCache = new QuickLRU({ maxSize: 1000 });

      let timings = [];

      build.onEnd(() => {
        if (timings.length < 1) return;

        const totalTime = timings.reduce((sum, x) => sum + x, 0).toFixed(0);
        // eslint-disable-next-line no-console
        console.log(`[⚛️  React Compiler] ${timings.length} files changed`);
        // eslint-disable-next-line no-console
        console.log(`[⚛️  React Compiler] Used ${totalTime} ms`);

        timings = [];
      });

      build.onLoad({ filter, namespace: "" }, async (args) => {
        const contents = await readTextFile(args.path, "utf8");

        const t0 = performance.now();

        if (buildCache.has(contents)) {
          return {
            contents: buildCache.get(contents),
            loader: "js",
          };
        }

        const output = await build.esbuild.transform(contents, {
          loader: "tsx",
          jsx: "automatic",
          define: build.initialOptions.define,
          target: build.initialOptions.target,
        });

        const transformResult = await babel.transform(output.code, {
          plugins: [
            // Warning: using string config here (ie 'babel-plugin-react-compiler') instead of the directly
            // imported object is much slower than directly passing the plugin object because
            // Babel has to resolve the plugin file from node_modules
            [
              BabelPluginReactCompiler,
              {
                runtimeModule: runtimeModulePath,
              },
            ],
          ],
          filename: args.path,
          caller: {
            name: "esbuild-react-compiler-plugin",
            supportsStaticESM: true,
          },
          // TODO: figure out sourcemap setting and chaining
          sourceMaps,
        });

        timings.push(performance.now() - t0);

        if (transformResult?.code) {
          buildCache.set(contents, transformResult?.code);
        }

        return {
          contents: transformResult?.code ?? undefined,
          loader: "js",
        };
      });
    },
  };
}
