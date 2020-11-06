importScripts(
  "https://unpkg.com/@ampproject/worker-dom@0.26.0/dist/worker/worker.js",
);
importScripts("https://unpkg.com/react@16/umd/react.development.js");
importScripts("https://unpkg.com/react-dom@16/umd/react-dom.development.js");
importScripts("react-dom-server.browser.development.js");
importScripts("https://unpkg.com/@babel/standalone/babel.min.js");

const webRunner = {
  el: null,
  document: null,
  onHeaderClick: null,
  shaPort: null,
};

const events = [];

onmessage = (m) => {
  const { code, events, shaPort } = m.data;

  if (shaPort) {
    webRunner.shaPort = shaPort;
    return;
  }

  const babelCode = Babel.transform(code, {
    plugins: [],
    presets: ["react"],
  }).code;

  const Counter = new Function("props", `return (${babelCode})(props)`);

  postMessage({ code: babelCode });

  const window = (this.window = WorkerThread.workerDOM);
  const document = WorkerThread.workerDOM.document;

  const str = ReactDOMServer.renderToString(
    React.createElement(Counter, { events: events }),
  );

  postMessage({ domString: str });
};
