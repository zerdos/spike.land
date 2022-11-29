import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = {
  name: "unpkg-path-plugin",
  setup(build: esbuild.PluginBuild) {
    // handle rel paths in module :  includes ./ || ../
    build.onResolve({ filter: /^\.+\// }, (args: any) => {
      const url = new URL(args.path, `${location.origin}/${args.resolveDir}`).toString();

      return {
        path: url,
        namespace: "http-url",
      };
    });
    // handle main file
    build.onResolve({ filter: /.*/ }, async (args: any) => {
      if (args.path.indexOf(location.origin) !== -1) {
        return {
          namespace: "http-url",
          path: args.path,
        };
      }
      return {
        namespace: "http-url",
        path: `${location.origin}/npm:/${args.path}`,
      };
    });
  },
};
