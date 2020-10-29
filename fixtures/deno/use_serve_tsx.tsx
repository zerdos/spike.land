#!/usr/bin/env deno run --allow-net --allow-read --allow-run --allow-env  --unstable --importmap=import_map.json 

import { createApp } from "app";
import { serveJsx } from "serve_jsx";
import React from "react";
import ReactDOMServer from "react-dom/server"

const app = createApp();
// .jsx/.tsx files in ./pages directory will be dynamically imported
// and rendered component served as html
app.handle("/", async (req) => {
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(
        <html>
          <head>
            <meta charSet="utf-8" />
            <title>servest</title>
          </head>
          <body>Hello Servest!</body>
        </html>,
      ),
    });
  });
app.use(serveJsx("./pages", (f) => import(`./${f}`)));
app.listen({ port: 8899 });
