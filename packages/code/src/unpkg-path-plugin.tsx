import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = (origin: string) => ({
  name: "unpkg-path-plugin",
  setup(build: esbuild.PluginBuild) {
    // handle rel paths in module :  includes ./ || ../
    build.onResolve({ filter: /^\.+\// }, (args: { path: string }) => {
      const url = new URL(args.path, location.origin).toString();

      return {
        path: url,
        namespace: "http-url",
      };
    });

    build.onResolve({ filter: /^\[a-z]+\// }, (args: { path: string }) => {
      if (args.path.indexOf(origin) !== -1) {
        return {
          namespace: "http-url",
          path: args.path,
        };
      }

      return {
        path: `${origin}/*${args.path}?bundle?target=es2022&format=esm`,
        namespace: "http-url",
      };
    });
  },
});
