import * as Comlink from "https://cdn.skypack.dev/comlink/dist/esm/comlink.mjs";
import React from "https://cdn.skypack.dev/react";
import Babel from "https://cdn.skypack.dev/@babel/standalone";

const searchRegExp = /import/gi;
const searchRegExpExport = /export /gi;
const replaceWith = "///";

const transform = (code, hasToReport) => {
  try {
    const safeCode = `/** @jsx jsx */ 
    Object.assign(window, React);
    if (window.Motion) {
        Object.assign(window, window.Motion);
    }
    if (window.emotionStyled){
      window.styled= window.emotionStyled;
    }` + code.replaceAll(
      searchRegExp,
      replaceWith,
    ).replace("export default", "DefaultElement = ")
      .replaceAll(searchRegExpExport, "");

    return Babel.transform(
      safeCode,
      {
        compact: true,
        comments: false,
        plugins: [],
        presets: [
          "react",
          ["typescript", { isTSX: true, allExtensions: true }],
        ],
      },
    ).code;
  } catch (e) {
    hasToReport && console.error(e);
    return "";
  }
};

Comlink.expose(transform);
