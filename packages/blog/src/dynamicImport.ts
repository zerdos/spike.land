import { wait } from "axax/esnext/wait";
import importMap from "@spike.land/code/js/importmap.json";

// [{
//     defer: "true",
//     "type": "text/javascript",
//     src: "https://unpkg.com/es-module-shims@1.3.2/dist/es-module-shims.js",
//     async: "true",
//   }, {
//     type: "importmap-shim",
//     innerHTML: JSON.stringify(importMap),
//   }, {
//     type: "esms-options",
//     innerHTML: JSON.stringify(),
//   }]

//   document.body.appendChild(Object.assign(document.createElement('script'), {
//     type: 'importmap',
//     innerHTML: JSON.stringify({ imports: { x: './y.js' } }),
//   }));

const moduleCache = {
  shimAdded: 0,
};

export const dynamicImport = async (moduleName: string) => {
  if (!moduleCache.shimAdded) {
    moduleCache.shimAdded = 1;

    document.body.appendChild(Object.assign(document.createElement("script"), {
      type: "esms-options",
      innerHTML: JSON.stringify({
        "shimMode": true,
        "polyfillEnable": ["css-modules", "json-modules"],
        "nonce": "n0nce",
      }),
    }));
    document.body.appendChild(Object.assign(document.createElement("script"), {
      type: "importmap-shim",
      innerHTML: JSON.stringify(importMap),
    }));
    console.log({ importMap });
    document.body.appendChild(Object.assign(document.createElement("script"), {
      src: "https://unpkg.com/es-module-shims@1.3.2/dist/es-module-shims.js",
      async: "async",
    }));
  }

  if (moduleCache[moduleName]) return moduleCache[moduleName];
  let i = 0;
  while (i++ < 100) {
    if (window.importShim && window.importShim.getImportMap) {
      try {
        const importedModule = await window.importShim(moduleName);
        moduleCache[moduleName] = importedModule;
      } catch (e) {
        const importMap = importShim.getImportMap();
        console.error({ importMap, error: e });
      }

      if (moduleCache[moduleName]) {
        return moduleCache[moduleName];
      }
    }

    console.log(`lets delay ${i * 50} ms`);
    await wait(i * 50);
  }
};
