import { oo } from "./importMap";
export const fetchPlugin = (origin) => ({
    name: "http",
    setup(build) {
        build.onResolve({ filter: /^https?:\/\// }, (args) => ({
            path: args.path,
            namespace: "http-url",
        }));
        build.onResolve({ filter: /^\.\/|^\.\.\//, namespace: "http-url" }, (args) => ({
            path: new URL(args.path, args.importer).toString(),
            namespace: "http-url",
        }));
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
            let contents = await fetch(args.path, { redirect: "follow" }).then((res) => res.text());
            Object.entries(oo).forEach(([k, v]) => {
                contents = contents.split(`${origin}${v}`).join(k);
            });
            return { contents };
        });
    },
});
