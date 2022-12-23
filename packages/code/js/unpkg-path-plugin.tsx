import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = {
  name: "unpkg-path-plugin",
  setup(build: esbuild.PluginBuild) {
    // handle rel paths in module :  includes ./ || ../
    build.onResolve({ filter: /^\.+\// }, (args: any) => {
      const url = new URL(args.path, location.origin).toString();

      return {
        path: url,
        namespace: "http-url",
      };
    });

    build.onResolve({ filter: /^\[a-z]+\// }, (args: any) => {
      if (args.path.indexOf(location.origin) !== -1) {
        return {
          namespace: "http-url",
          path: args.path,
        };
      }

      return {
        path: `${location.origin}/*${args.path}`,
        namespace: "http-url",
      };
    });
  },
};
