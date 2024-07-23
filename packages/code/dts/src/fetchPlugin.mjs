export const fetchPlugin = {
  name: "http",
  setup(build) {
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: "http-url",
    }));
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url",
    }));
    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      const url = new URL(args.path);
      if (url.pathname.indexOf("/live/") !== -1 && url.pathname.endsWith(".js")) {
        const { stat, readFile } = await import("./memfs");
        if (await stat(url.pathname)) {
          return {
            contents: await readFile(url.pathname),
          };
        }
      }
      let contents = await fetch(args.path, { redirect: "follow" }).then((res) => res.text());
      return { contents };
    });
  },
};
