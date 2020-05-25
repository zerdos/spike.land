#!/usr/bin/env deno run --allow-net --allow-read --allow-run --allow-env  --unstable --importmap=import_map.json 

import { createApp } from "app";
import { serveJsx } from "serve_jsx";

const app = createApp();
// .jsx/.tsx files in ./pages directory will be dynamically imported
// and rendered component served as html
app.use(serveJsx("./pages", (f) => import(`./${f}`)));
app.listen({ port: 8899 });
