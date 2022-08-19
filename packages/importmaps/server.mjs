// import https from  'https';
import fs from "fs"


// const options = {
//   key: fs.readFileSync('.certs/localhost-key.pem'),
//   cert: fs.readFileSync('.certs/localhost.pem'),
// };


import { Generator } from '@jspm/generator';
import packg from "./package.json" assert {type: "json"}
import esbuild from "esbuild"

import * as importMap from "esbuild-plugin-import-map";


// const conf = await getPackageConfig(packg)
const generator = new Generator({
  // ...conf,
  // Set the map URL for relative normalization when installing local packages
  mapUrl: import.meta.url,
  
  defaultProvider: 'jspm', // this is the default defaultProvider
  // Always ensure to define your target environment to get a working map
  // it is advisable to always pass the "module" condition as supported by Webpack
  env: ['development', 'browser', 'module'],
});
await generator.install(Object.keys(packg.dependencies).map(x=>`${x}@${packg.dependencies[x]}`))


// Install a new package into the import map

// Install a

await generator.install("@emotion/react/jsx-runtime");

const imap =generator.getMap();

const imapJson = JSON.parse(JSON.stringify(imap));


importMap.load({
  imports: {
    ...imapJson.imports

  }
});

const outHtml = await generator.htmlInject(`
  <!doctype html>

  <html>
  <head>
  </head>
  <body>
  <div id="root"></div>
<script>window.process={
  env: {
    NODE_ENV: "development"
  }
}
</script>
  <script type="module" src="/index.js">
  </script>
  </body>
  </html>
`, {  esModuleShims: true});


await esbuild.build({
  format: "esm",
  entryPoints: ["./src/index.tsx"],
  bundle: true,
  define: {
    "process.env.NODE_ENV": JSON.stringify("development")
  },
  target: "es2021",
  platform: "browser",
  outdir: "./dist",
  plugins: [importMap.plugin()]
});

fs.writeFileSync("./dist/index.html", outHtml)

// console.log(`https://localhost:8443`)
// https
//   .createServer(options, function (req, res) {
//       const url = new URL(req.url)
//       const path=url.pathname;

//       const str = fs.readFileSync(`./public/${path}`);

//       res.
//     // server code
//   })
//   .listen(8443);