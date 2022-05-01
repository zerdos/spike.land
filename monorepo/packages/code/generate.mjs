import { clearCache, Generator } from "@jspm/generator";
clearCache();

const env = process.env.NODE_ENV === "production"
  ? "production"
  : "development";
const isDev = env === "development";

const generator = new Generator({
  mapUrl: import.meta.url,
  defaultProvider: "jspm",
  //]//ne your target environment to get a working map
  // it is advisable to pass the "module" condition as supported by Webpack
  env: [
    env,
    "browser",
    "module",
  ],
});

// Install a new package into the import map

await generator.install("react");
await generator.install("tslib");

// await generator.install("preact-render-to-string");
// await generator.install("preact");

// await generator.install("preact/compat");
// await generator.install("preact/jsx-runtime");
// await generator.install("preact/jsx-dev-runtime");

// await generator.install("react@18/jsx-runtime"); // await generator.install("react");
//await generator.install("react-dom@18/server");
// await generator.install("prop-types");
// await generator.install("react-is@18");
// await generator.install("immutable");

// await generator.install("async-mutex");
// await generator.install("@spike.land/smart-monaco-editor");

// await generator.install("@emotion/server");
await generator.install("@emotion/react");
await generator.install("@emotion/react/jsx-runtime");
await generator.install("@emotion/cache");
// await generator.install("lodash/throttle");
// await generator.install("simple-text-compress");
// await generator.install("@emotion/styled");
await generator.install("framer-motion");

//await generator.install("comlink");
// await generator.install("tslib");
//await generator.install("workbox-window");
// await generator.install("@spike.land/ipfs");
// await generator.install("@spike.land/shadb");
//await generator.install("@spike.land/qrious");
// await generator.install("@spike.land/smart-monaco-editor");
// await generator.install("@mui/material/Fab");
// await generator.install("@mui/material/Button");
// await generator.install("@mui/material/ToggleButton");
// await generator.install("@mui/material/utils/createSvgIcon");

// await generator.install("@mui/material/ToggleButtonGroup");

// await generator.install("react@18/jsx-runtime");
// await generator.install("react-transition-group");

const importMap = { ...generator.getMap() };

// importMap.imports["textdiff-create"] =
//   `https://unpkg.com/@spike.land/esm@${version}/public/textdiff-create.mjs`;

// importMap.imports["textdiff-patch"] =
//  `https://unpkg.com/@spike.land/esm@${version}/public/textdiff-patch.mjs`;
importMap.imports["react/jsx-runtime"] = isDev ? 
"https://localhost:8000/monorepo/packages/code/js/public/react.mjs"
  : "https://spike.land/react.mjs";
importMap.imports["react-dom"] = importMap.imports["react"];

importMap.imports["react-dom"] = importMap.imports["react"];

// importMap.imports["framer-motion"] = isDev
//   ? "https://localhost:8000/monorepo/packages/code/js/public/framer-motion.mjs"
//   : "https://spike.land/public/framer-motion.mjs";
// importMap.imports["preact"] = isDev?"https://localhost:8000/monorepo/packages/code/js/public/preact.mjs":"https://spike.land/public/preact.mjs" ;
// importMap.imports["preact/compat"] = importMap.imports["preact"];
// importMap.imports["react-is"] =
// `https://unpkg.com/@spike.land/esm@${version}/public/react-is.mjs`;

// importMap.imports["react-is"] =
//   "https://unpkg.com/@spike.land/esm@0.4.33/public/react-is.mjs";

importMap.imports["@emotion/react"] = isDev
  ? "https://localhost:8000/monorepo/packages/code/js/public/emotion.mjs"
  : "https://spike.land/emotion.mjs";

  
  importMap.imports["@emotion/cache"] = isDev
  ? "https://localhost:8000/monorepo/packages/code/js/public/emotion.mjs"
  : "https://spike.land/emotion.mjs";
//importMap.imports.tslib =
//   "https://cdnjs.cloudflare.com/ajax/libs/tslib/2.3.1/tslib.es6.min.js";

importMap.imports = {
  ...importMap.imports,
  // "preact": "https://unpkg.com/preact@10.6.6/public/preact.mjs",
  // "preact-render-to-string":
    // "https://unpkg.com/preact-render-to-string@5.1.19/public/index.mjs",
  // "preact/compat": "https://unpkg.com/preact@10.6.6/compat/public/compat.mjs",
  // "preact/hooks": "https://unpkg.com/preact@10.6.6/hooks/public/hooks.mjs",
};
console.log(JSON.stringify(importMap, null, 2));
//console.log(JSON.stringify(generator.getMap(), null, 2));
