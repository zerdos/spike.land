/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
import { h } from "@builder.io/qwik";
import { QwikLoader, renderToString } from "@builder.io/qwik/server";
import { ToDoApp } from "./components";
/**
 * Entry point for server-side pre-rendering.
 *
 * @returns a promise when all of the rendering is completed.
 */
export function renderApp(opts) {
  const todos = {
    filter: "all",
    items: [
      { completed: false, title: "Read Qwik docs" },
      { completed: false, title: "Build HelloWorld" },
      { completed: false, title: "Profit" },
    ],
  };
  return renderToString(
    h(
      "html",
      null,
      h(
        "head",
        null,
        h("title", null, "Qwik Demo: ToDo"),
        h("link", { rel: "stylesheet", href: "/base.css" }),
        h("link", { rel: "stylesheet", href: "/index.css" }),
      ),
      h(
        "body",
        { "q:base": "/build/" },
        h(ToDoApp, { todos: todos }),
        h(QwikLoader, { debug: opts.debug }),
      ),
    ),
    opts,
  );
}
//# sourceMappingURL=index.server.js.map
