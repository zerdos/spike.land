self.importScripts(
  "https://cdn.jsdelivr.net/npm/@ampproject/worker-dom@0.27.3/dist/worker/worker.js",
);
import * as React from "react";
import ReactDOMServer from "react-dom/server";

export async function renderWorker(
  code: string,
  props: { [key: string]: unknown },
) {
  try {
    const componentFactory = new Function(
      "props",
      "React",
      `${code}; return Counter(props)`,
    );

    const Counter = (props: { [key: string]: unknown }) =>
      componentFactory(props, React);

    return ReactDOMServer.renderToString(React.createElement(Counter, props));
  } catch (error) {
    return { error };
  }
}
