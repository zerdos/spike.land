self.importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
self.importScripts(
  "https://unpkg.com/@babel/standalone@7.14.1/babel.min.js",
);

const { Comlink, Babel } = self;

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    if (
      Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
    ) {
      return this.replace(str, newStr);
    }

    return this.replace(new RegExp(str, "g"), newStr);
  };
}

// const searchRegExp2 = /import.*from '/gi;
// const replace2 = "import Fab from 'https://cdn.skypack.dev/";

// const searchRegExp = /import.*react';/gi;
// const searchRegExpMotion = /import.*framer-motion';/gi;

// const replaceWith = "\n\n";

const transform = (code) => {
  const safeCode = code;
  // .replaceAll(
  //   searchRegExp,
  //   replaceWith,
  // ).replaceAll(
  //   searchRegExpMotion,
  //   replaceWith,
  // ).replaceAll(searchRegExp2, replace2);

  // let rendererSrc = `https://spike.land/modules/renderer.mjs`;

  // if (self.location.hostname.indexOf("0.0") !== -1) {
  //   const cid = self.location.pathname.slice(6, 52);
  //   rendererSrc = `http://127.0.0.1:8080/ipfs/${cid}/modules/renderer.mjs`;xxxxx`
  // }

  const transformed = Babel.transform(
    `/** @jsx jsx */
      import {render, jsx} from 'renderer';

      export {render}
      
      ` + safeCode + `
            
      `,
    {
      compact: false,
      comments: false,
      presets: [
        "react",
        "es2017",
        ["typescript", { isTSX: true, allExtensions: true }],
      ],
    },
  ).code;

  return transformed;
};

self.addEventListener(
  "connect",
  (e) => Comlink.expose(transform, e.ports[0]),
);

self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    Comlink.expose(transform, event.data.port);
    return;
  }
});
