importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("https://unpkg.com/@babel/standalone@7.12.11/babel.min.js");

const searchRegExp = /import/gi;
const from = / from '/gi;
const replaceWith = " from 'https://cdn.skypack.dev/";

const transform = (code, hasToReport) => {
  try {
    const safeCode = `
    ` + code.replaceAll(
      from,
      replaceWith,
    );

    const transformed = Babel.transform(
      "/** @jsx jsx */" + safeCode,
      {
        compact: false,
        comments: false,
        plugins: [],
        presets: [
          "react",
          ["typescript", { isTSX: true, allExtensions: true }],
        ],
      },
    ).code;
    return transformed;
  } catch (e) {
    hasToReport && console.error(e);
    return "";
  }
};

Comlink.expose(transform);
