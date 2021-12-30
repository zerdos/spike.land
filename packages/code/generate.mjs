import { clearCache, Generator } from "@jspm/generator";

// import { clearCache } from '@jspm/generator';
clearCache();

const generator = new Generator({
  mapUrl: import.meta.url,
  defaultProvider: "jspm", // this is the default defaultProvider
  // Always ensure to defi  inputMap: {
  ignore: ["framer-motion", "ipfs-only-hash"],
  //]//ne your target environment to get a working map
  // it is advisable to pass the "module" condition as supported by Webpack
  env: ["production", "browser", "module"],
});

// Install a new package into the import map

// await generator.install("react-dom");

await generator.install("react-dom@18");
// await generator.install({
//   target: "ipfs-only-hash",
//   url: "https://unpkg.com/@spike.land/esm@0.2.86/dist/ipfs-only-hash.mjs",
// });

await generator.install("react@18");
// await generator.install("react@18/jsix-runtime"); // await generator.install("react");
await generator.install("react-dom@18/server");
// await generator.install("prop-types");
// await generator.install("react-is@18");
await generator.install("immutable");
// await generator.install("@spike.land/smart-monaco-editor");

// await generator.install("@emotion/server");
// await generator.install("@emotion/react");
// await generator.install("@emotion/cache");
// await generator.install("@emotion/styled");
// await generator.install("@emotion/styled");
// await generator.install("framer-motion");

await generator.install("comlink");
// await generator.install("tslib");
// await generator.install("workbox-window");
// await generator.install("@spike.land/ipfs");
// await generator.install("@spike.land/shadb");
// await generator.install("@spike.land/qrious");
// await generator.install("@spike.land/smart-monaco-editor");
// await generator.install("@mui/material/Fab");
// await generator.install("@mui/material/Button");
// await generator.install("@mui/material/ToggleButton");
// await generator.install("@mui/material/utils/createSvgIcon");

// await generator.install("@mui/material/ToggleButtonGroup");

await generator.install("react@18/jsx-runtime");
// await generator.install("react-transition-group");

const importMap = { ...generator.getMap() };
importMap.imports["framer-motion"] =
  "https://unpkg.com/@spike.land/esm@0.4.33/dist/framer-motion.mjs";

// importMap.imports["textdiff-create"] =
//   "https://unpkg.com/@spike.land/esm@0.4.33/dist/textdiff-create.mjs";

// importMap.imports["textdiff-patch"] =
//   "https://unpkg.com/@spike.land/esm@0.4.33/dist/textdiff-patch.mjs";

// importMap.imports["ipfs-only-hash"] =
//   "https://unpkg.com/@spike.land/esm@0.4.33/dist/ipfs-only-hash.mjs";
importMap.imports["react"] =
  "https://unpkg.com/@spike.land/esm@0.4.33/dist/react.mjs";
importMap.imports["react-dom"] =
  "https://unpkg.com/@spike.land/esm@0.4.33/dist/react-dom.mjs";
// importMap.imports["react-is"] =
//   "https://unpkg.com/@spike.land/esm@0.4.33/dist/react-is.mjs";

importMap.imports["@emotion/react"] =
  "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
// importMap.imports.tslib =
//   "https://cdnjs.cloudflare.com/ajax/libs/tslib/2.3.1/tslib.es6.min.js";

console.log(JSON.stringify(importMap, null, 2));
//console.log(JSON.stringify(generator.getMap(), null, 2));
