importScripts("https://unpkg.com/comlink@4.3.1/dist/umd/comlink.min.js");
importScripts(
  "https://unpkg.com/@babel/standalone@7.16.4/babel.min.js",
);


addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    const { Comlink, Babel } = self;
    const {transform } = Babel;
    const {expose} = Comlink;
    
    expose((code) => transform(
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
    ).code, event.data.port);
  }
});
