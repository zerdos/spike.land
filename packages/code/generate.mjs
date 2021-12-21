import { Generator } from "@jspm/generator";

const generator = new Generator({
  mapUrl: import.meta.url,
  defaultProvider: "jspm", // this is the default defaultProvider
  // Always ensure to define your target environment to get a working map
  // it is advisable to pass the "module" condition as supported by Webpack
  env: ["production", "browser", "module"],
});

// Install a new package into the import map

await generator.install("react-dom");
await generator.install("react");
await generator.install("react-dom/server");
await generator.install("@emotion/server");
await generator.install("@emotion/react");
await generator.install("@emotion/styled");
await generator.install("framer-motion");

await generator.install("comlink");
// await generator.install("comlink");

await generator.install("workbox-window");
await generator.install("@spike.land/ipfs");
await generator.install("@spike.land/smart-monaco-editor");
await generator.install("@mui/material/Fab");
await generator.install("@mui/material/Button");
await generator.install("@mui/material/ToggleButton");
await generator.install("@mui/material/utils/createSvgIcon");

await generator.install("@mui/material/ToggleButtonGroup");

await generator.install("react/jsx-runtime");

const importMap = { ...generator.getMap() };
importMap.imports.dev = "./dist/starter.mjs";
console.log(JSON.stringify(importMap, null, 2));
//console.log(JSON.stringify(generator.getMap(), null, 2));
