/**
 * @param {{html: string, css: string}} opts
 * @returns  {string}
 */
export function getHtml({ html, css }) {
  //
  // For some reason, pre-rendering doesn't care about global styles, the site flickers without this patch
  //
  // let bodyStylesFix = "";

  // const start = js.indexOf("body{");
  // if (start !== -1) {
  //   const firstBit = js.slice(start);
  //   const last = firstBit.indexOf("}");
  //   bodyStylesFix = firstBit.slice(0, last + 1);
  // }

  const titleStart = html.indexOf("<title>");
  const titleEnd = html.indexOf("</title>");
  const hasTitle = titleStart < titleEnd && titleStart >= -1;
  const title = hasTitle
    ? html.slice(titleStart, titleEnd)
    : "(code).spike.land :)";

  return `<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<title>${title}</title>
<link rel="modulepreload" href="./app.js">  
<link rel="modulepreload" href="https://spike.land/modules/renderer.mjs">
<link rel="modulepreload" href="https://spike.land/js/codeLoader.mjs">
<link rel="icon" type="image/png" href="https://spike.land/zed-icon-big.png" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<style>
    ${css}
</style>
</head>
<body>
<div id="zbody">
  ${html}
</div>
<script async src="https://unpkg.com/es-module-shims@0.10.4/dist/es-module-shims.js"></script>
<script type="importmap-shim">
{
  "imports": {
    "react": "https://esm.sh/react",
    "react/": "https://esm.sh/react/", 
    "renderer": "https://blog.spike.land/packages/code/modules/renderer.mjs",
    "monaco-editor": "https://unpkg.com/monaco-editor@0.23.0/esm/vs/editor/editor.main.js",
    "@emotion/react": "https://unpkg.com/@emotion/react@11.4.0/dist/emotion-react.browser.esm.js",
    "@emotion/utils": "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
    "@emotion/cache": "https://unpkg.com/@emotion/cache@11.4.0/dist/emotion-cache.browser.esm.js",
    "@emotion/styled": "https://unpkg.com/@emotion/styled@11.3.0/dist/emotion-styled.browser.esm.js",
    "@emotion/serialize": "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
    "@emotion/weak-memoize": "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
    "@emotion/memoize": "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
    "@emotion/unitless": "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
    "@emotion/hash": "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
    "@emotion/is-prop-valid": "https://unpkg.com/@emotion/is-prop-valid@1.1.0/dist/emotion-is-prop-valid.browser.esm.js",
    "@emotion/sheet": "https://unpkg.com/@emotion/sheet@1.0.1/dist/emotion-sheet.browser.esm.js",
    "@babel/runtime/helpers/": "https://unpkg.com/@babel/runtime@7.14.0/helpers/",
    "@babel/runtime/helpers/extends": "https://unpkg.com/@babel/runtime@7.14.0/helpers/esm/extends.js",
    "framer-motion": "https://unpkg.com/framer-motion@4.1.14/dist/es/index.js",
    "hey-listen": "https://unpkg.com/@zedvision/hey-listen@1.1.2/dist/hey-listen.es.js",
    "framesync": "https://unpkg.com/framesync@5.3.0/dist/es/index.js",
    "popmotion": "https://unpkg.com/popmotion@9.3.5/dist/es/index.js",
    "style-value-types": "https://unpkg.com/style-value-types@4.1.4/dist/es/index.js",
    "stylis": "https://unpkg.com/stylis@4.0.10/dist/stylis.mjs",
    "react-dom": "https://esm.sh/react-dom",
    "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
    "tslib": "https://blog.spike.land/packages/code/js/tslib.mjs"
  }
}
</script>
<script>
window.process = {env: {NODE_ENV:"production" }}
</script>
<script type="module-shim" src="./loader.js">
</script>
</body>
</html>
`;
}

/**
 * 
 * @param {string}} cid 
 * @returns {string}
 */
export const getEditorHTML = () =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://spike.land/zed-icon-big.png" />
<title>Instant React Editor</title>
</head>
<body>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react",
    "react/": "https://esm.sh/react/", 
    "renderer": "https://blog.spike.land/packages/code/modules/renderer.mjs",
    "monaco-editor": "https://unpkg.com/monaco-editor@0.23.0/esm/vs/editor/editor.main.js",
    "@emotion/react": "https://unpkg.com/@emotion/react@11.4.0/dist/emotion-react.browser.esm.js",
    "@emotion/utils": "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
    "@emotion/cache": "https://unpkg.com/@emotion/cache@11.4.0/dist/emotion-cache.browser.esm.js",
    "@emotion/styled": "https://unpkg.com/@emotion/styled@11.3.0/dist/emotion-styled.browser.esm.js",
    "@emotion/serialize": "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
    "@emotion/weak-memoize": "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
    "@emotion/memoize": "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
    "@emotion/unitless": "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
    "@emotion/hash": "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
    "@emotion/is-prop-valid": "https://unpkg.com/@emotion/is-prop-valid@1.1.0/dist/emotion-is-prop-valid.browser.esm.js",
    "@emotion/sheet": "https://unpkg.com/@emotion/sheet@1.0.1/dist/emotion-sheet.browser.esm.js",
    "@babel/runtime/helpers/": "https://unpkg.com/@babel/runtime@7.14.0/helpers/",
    "@babel/runtime/helpers/extends": "https://unpkg.com/@babel/runtime@7.14.0/helpers/esm/extends.js",
    "framer-motion": "https://unpkg.com/framer-motion@4.1.14/dist/es/index.js",
    "hey-listen": "https://unpkg.com/@zedvision/hey-listen@1.1.2/dist/hey-listen.es.js",
    "framesync": "https://unpkg.com/framesync@5.3.0/dist/es/index.js",
    "popmotion": "https://unpkg.com/popmotion@9.3.5/dist/es/index.js",
    "style-value-types": "https://unpkg.com/style-value-types@4.1.4/dist/es/index.js",
    "stylis": "https://unpkg.com/stylis@4.0.10/dist/stylis.mjs",
    "react-dom": "https://esm.sh/react-dom",
    "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
    "tslib": "https://blog.spike.land/packages/code/js/tslib.mjs"
  }
}
</script>
<script>
window.process = {env: {NODE_ENV:"production" }}
</script>
<script type="module">
    import {edit} from "https://spike.land/js/data.mjs"
    try{
      edit("${location.pathname.slice(42, 52)}");
    }catch(error){
      fetch("https://spike.land/error", {method: "POST",  body: JSON.stringify({error})})
    }
  </script>
</body>
</html>`;
