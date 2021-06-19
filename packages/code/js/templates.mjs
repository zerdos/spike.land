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
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
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
<script src="https://spike.land/js/importmap.js"></script>
<script type="module" src="./starter.js"></script>
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
<script src="https://spike.land/js/importmap.js"></script>
<script type="module" src="./edit.js"></script>
</body>
</html>`;
