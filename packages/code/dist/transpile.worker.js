importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("https://unpkg.com/@babel/standalone@7.12.11/babel.min.js");
importScripts("https://unpkg.com/react@17.0.1/umd/react.production.min.js");

const transform = (code) => {
  try {
    const transPiled = Babel.transform(
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

    const searchRegExp = /import/gi;
    const searchRegExpExport = /export /gi;
    const replaceWith = "///";

    const safeCode = `
    Object.assign(window, React);
    if (window.Motion) {
        Object.assign(window, window.Motion);
    }
    if (window.emotionStyled){
      window.styled= window.emotionStyled;
    }
    
    ` + transPiled.replaceAll(
      searchRegExp,
      replaceWith,
    ).replace("export default", "DefaultElement = ")
      .replaceAll(searchRegExpExport, "");

    return safeCode;
  } catch (e) {
    console.error(e);
    return "";
  }
};

Comlink.expose(transform);
