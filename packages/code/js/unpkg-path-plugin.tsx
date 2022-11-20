import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // handle root entry file
      build.onResolve({ filter: /(^index\.js$)/ }, (args: any) => {
        return { path: "index.js", namespace: "a" };
      });
      // handle rel paths in module :  includes ./ || ../
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        const url = new URL(args.path, `https://unpkg.com${args.resolveDir}/`);

        return {
          path: url.href,
          namespace: "a",
        };
      });
      // handle main file
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
