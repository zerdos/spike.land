self.importScripts("https://unpkg.com/comlink@4.3.1/dist/umd/comlink.min.js");
self.importScripts(
  "https://unpkg.com/@babel/standalone@7.16.4/babel.min.js",
);


const { Comlink, Babel } = self;
const { transform } = Babel;
const { expose } = Comlink;


const babelTransform = (code) =>
transform(
  code,
  {
    compact: false,
    comments: false,
    presets: [
      "react",
      "es2017",
      ["typescript", { isTSX: true, allExtensions: true }],
    ],
  },
).code

addEventListener(
  "connect",
  (e) => expose(babelTransform, e.ports[0]),
);

addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    expose(babelTransform, event.data.port);
  }
});
