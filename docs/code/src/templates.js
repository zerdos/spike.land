export const getHtml = ({ HTML, css, js }) => {
  //
  // For some reason, pre-rendering doesn't care about global styles, the site flickers without this patch
  //
  let bodyStylesFix = "";

  const start = js.indexOf("body{");
  if (start !== -1) {
    const firstBit = js.slice(start);
    const last = firstBit.indexOf("}");
    bodyStylesFix = firstBit.slice(0, last + 1);
  }

  const titleStart = HTML.indexOf("<title>");
  const titleEnd = HTML.indexOf("</title>");
  const hasTitle = titleStart < titleEnd && titleStart >= -1;
  const title = hasTitle
    ? HTML.slice(titleStart, titleEnd)
    : "(code).zed.vision :)";

  return `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
<title>${title}</title>
<link rel="icon" type="image/png" href="https://zed.vision/zed-icon-big.png" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with code.zed.vision">
<style>
    ${bodyStylesFix}
    ${css}
</style>
</head>
<body>
<div id="zbody">
    ${HTML}
</div>
<script type="module">
    ${js}
</script>
</body>
</html>
`;
};

export function getDepts(code) {
  const debts = [
    "https://unpkg.com/react@17.0.1/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.production.min.js",
    "https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js",
    "https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js",
  ];

  if (code.indexOf("framer-motion") !== -1) {
    debts.push(
      "https://unpkg.com/framer-motion@3.1.1/dist/framer-motion.js",
    );
  }
  if (code.indexOf("qrious") !== -1) {
    debts.push(
      "https://unpkg.com/@zedvision/qrious@8.5.7/dist/qrious.min.js",
    );
  }

  return debts;
}

export const getCodeForImport = (code) => {
  const debStr = JSON.stringify(getDepts(code));

  return `async function(){
const {importScript} = await import("https://unpkg.com/@zedvision/code@8.6.0/dist/importScript.js");

    const debts = ${debStr};

for (let i = 0; i < debts.length; i++) {
    await importScript(debts[i]);
}


    Object.assign(window, emotionReact);
    let styled = window["emotionStyled"];
    let DefaultElement;
    ${code}
    document.body.children[0].innerHTML = ReactDOMServer.renderToString(jsx(DefaultElement));


    await importScript("https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js")
    ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);
}`;
};
