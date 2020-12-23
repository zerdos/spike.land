importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("https://unpkg.com/@babel/standalone@7.12.11/babel.min.js");

// const searchRegExp = /import {([\[a-zA-Z0-9 ,]+])} from '([\w+])';/gi;
// const from = / from '/gi;

// const replaceWith = `const { $1 } = await import('$2');`;

const transform = (code, hasToReport) => {
  try {
//     const safeCode = `
//     ` + code.replaceAll(
//       from,
//       replaceWith,
//     );

    console.log(safeCode);
      
      const transformed = Babel.transform(
      `/** @jsx zsx */
      ` + code,
      {
        compact: false,
        comments: false,
        plugins: [],
        presets: [
          "react",
          "es"
          ["typescript", { isTSX: true, allExtensions: true }],
        ],
      },
    ).code;
    console.log(transformed);
    return transformed;
  } catch (e) {
    hasToReport && console.error(e);
    return "";
  }
};

Comlink.expose(transform);
