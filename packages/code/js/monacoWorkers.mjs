// import tsWorkerUrl from "./monaco-workers/language/typescript/ts.worker.js";
// import jsonWorkerUrl from "./monaco-workers/language/json/json.worker.js";
// import cssWorkerUrl from "./monaco-workers/language/css/css.worker.js";
// import htmlWorker from "./monaco-workers/language/html/html.worker.js";
// import editorWorkerUrl from "./monaco-workers/editor/editor.worker.js";


let tsWorker = null;
let editorWorker = null;
let htmlWorker = null;
let jsonWorker = null;
let cssWorker = null;


export default async (_moduleId, label) => {
  if (label === "json") {
    if (jsonWorker) return jsonWorker; 
  
    const jWorker = (await import("./monaco-workers/language/json/json.worker.js")).default;
    jsonWorker = jWorker();
  
    return jsonWorker//new URL(htmlWorker, location.origin).toString();

    return new URL(jsonWorkerUrl, location.origin).toString();
  }
  if (label === "css" || label === "scss" || label === "less") {
    if (cssWorker) return cssWorker; 
  
    const csWorker = (await import("./monaco-workers/language/css/css.worker.js")).default;
    cssWorker = csWorker();
  
    return cssWorker//new URL(htmlWorker, location.origin).toString();

   // return new URL(cssWorkerUrl, location.origin).toString();
  }
  if (label === "html" || label === "handlebars" || label === "razor") {
    if (htmlWorker) return htmlWorker; 
 
    const hWorker = (await import("./monaco-workers/language/html/html.worker.js")).default;
    htmlWorker = hWorker();
  
    return htmlWorker//new URL(htmlWorker, location.origin).toString();
  }
  if (label === "typescript" || label === "javascript") {
   if (tsWorker) return tsWorker; 
   const tWorker = (await import("./monaco-workers/language/typescript/ts.worker.js")).default;
    tsWorker = tWorker();
   return tsWorker;// new URL(tsWorkerUrl, location.origin).toString();
  }
  if (editorWorker) return editorWorker; 
  const eWorker = (await import("./monaco-workers/editor/editor.worker.js")).default;
  editorWorker  = eWorker();
  return editorWorker;////n new URL(editorWorkerUrl, location.origin).toString();
};
