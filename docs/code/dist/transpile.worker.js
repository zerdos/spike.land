importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("https://unpkg.com/@babel/standalone@7.12.11/babel.min.js");

const transform = (code) =>
  Babel.transform(`/** @jsx jsx */ Object.assign(window, React); ${code}`, {
    plugins: [],
    presets: [
      "react",
      ["typescript", { isTSX: true, allExtensions: true }],
    ],
  }).code;

Comlink.expose(transform);
