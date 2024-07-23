export const unpkgPathPlugin = (origin) => ({
  name: "unpkg-path-plugin",
  setup(build) {
    build.onResolve({ filter: /^\.+\// }, (args) => {
      const url = new URL(args.path, location.origin).toString();
      return {
        path: url,
        namespace: "http-url",
      };
    });
    build.onResolve({ filter: /^\[a-z]+\// }, (args) => {
      if (args.path.indexOf(origin) !== -1) {
        return {
          namespace: "http-url",
          path: args.path,
        };
      }
      return {
        path: args.path,
        namespace: "http-url",
      };
    });
  },
});
