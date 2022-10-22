import "es-module-shims";
import { runtime } from "./react-jsx-runtime.production.min.cjs";

let assets: Record<string, string>;
const assetsProm = fetch(`https://testing.spike.land/files.json`).then((r) =>
  r.json()
).then((x) => assets = x);

importShim.addImportMap(
  JSON.parse(document.querySelector("script[type=importmap]")?.innerHTML!),
);

importShim.prototype = {
  ...importShim.prototype,
  shimMode: true,
  fetch: async (target: string, options: RequestInit) => {
    const url = new URL(target);
    assets = assets || await assetsProm;
    let asset = "";
    if (asset = assets[url.href.slice(1)]) {
      return fetch(new URL("/" + asset, url.origin));
    }
    return fetch(url, options);
  },
  resolve: function (
    originalId: string,
    parentUrl: string,
    defaultResolve: (id: string, parentURL: string) => string,
  ) {
    let resolved;
    const id = (assets && assets[originalId]) || originalId;

    try {
      resolved = defaultResolve(id, parentUrl);
    } catch {
      resolved = new URL(
        "/npm:*" + id + "?bundle&external=@emotion/*,react*,react ",
        location.origin,
      ).toString();
    }
    // console.table(id, parentUrl, resolved);

    // Default resolve will handle the typical URL and import map resolution
    return resolved;
  },
};
const codeSpace = location.pathname.slice(1).split("/")[1];

runtime();

importShim.resolve.prototype = import(
  `${location.origin}/live/${codeSpace}/mST.mjs`
).then(({
  mST,
  codeSpace,
  address,
}) =>
  import(`${location.origin}/ws.mjs`).then(({ run }) =>
    run({
      mST,
      codeSpace,
      address,
    })
  )
);
