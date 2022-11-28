import type * as esbuild from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});
export const fetchPlugin = () => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const data = await fetch(args.path).then(x => x.text());
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, "\\\"")
          .replace(/'/g, "\\'");

        const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.body.appendChild(style);
                `;
        const result: esbuild.OnLoadResult = {
          loader: "js",
          contents,
          resolveDir: location.origin + "/" + new URL("./", args.path).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path,
        );

        if (cachedResult) {
          return cachedResult;
        }

        const data = await fetch(args.path).then(x => x.text());

        const result: esbuild.OnLoadResult = {
          loader: "js",
          contents: data,
          resolveDir: location.origin + "/" + new URL("./", args.path).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
