importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("https://unpkg.com/@babel/standalone@7.12.11/babel.min.js");
importScripts("https://unpkg.com/react@17.0.1/umd/react.production.min.js");

const transform = (code) => {
  try {
    return Babel.transform(
      `/** @jsx jsx */ 
  Object.assign(window, React); 
  ${code}`,
      {
        plugins: [],
        presets: [
          "react",
          ["typescript", { isTSX: true, allExtensions: true }],
        ],
      },
    ).code;
  } catch (e) {
    console.error(e);
    return "";
  }
};

Comlink.expose(transform);
