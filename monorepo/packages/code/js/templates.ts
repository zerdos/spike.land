import importmapJson from "./importmap.json" assert { type: "json" };

export function getCss(session: { html: string }) {
  const { html } = session;

  const bodyClass = String(
    document.querySelector("#zbody")?.getAttribute("class"),
  );

  let css = "";
  const cssRules = document.querySelector(
    "head > style[data-emotion=css]",
  );

  if (cssRules) {
    try {
      const sheet = (document.querySelector(
        "head > style[data-emotion=css]",
      )!).sheet;
      if (sheet) {
        css = Array.from(
          // Deno-lint-ignore ban-ts-comment
          // @ts-expect-error
          sheet.cssRules,
        ).map((x) => x.cssText).filter((cssText) => {
          const selector = cssText.slice(5, 10);
          const isSelectorBody = bodyClass.includes(selector);
          const isInGeneratedHtml = html.includes(selector);
          const isNotMui = !cssText.includes("Mui");

          const shouldInclude = isSelectorBody || isInGeneratedHtml;

          return shouldInclude;
        }).join("\n  ").replace("#zbody", "body");
      }
    } catch (error) {
      console.error({ e: error });
    }
  }

  const globalCssRules = document.querySelector(
    "head > style[data-emotion=css-global]",
  );

  if (globalCssRules) {
    try {
      const sheet = (document.querySelector(
        "head > style[data-emotion=css-global]",
      )!).sheet;
      if (sheet) {
        css += Array.from(
          sheet
            .cssRules,
        ).map((x) => x.cssText)
          .join("\n  ").replace("#zbody", "body");
      }
    } catch (error) {
      console.error({ e: error });
    }
  }

  session.css = css;
}

export function getHtml({ html, css }: { html: string; css: string }) {
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

  // const imports = globalThis.importMap;
  const titleStart = html.indexOf("<title>");
  const titleEnd = html.indexOf("</title>");
  const hasTitle = titleStart < titleEnd && titleStart >= -1;
  const title = hasTitle
    ? html.slice(titleStart, titleEnd)
    : "(code).spike.land :)";

  return `<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<title>${title}</title>
<link rel="icon" type="image/png" href="https://spike.land/assets/zed-icon-big.png" />
<link rel="stylesheet" href="https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css" />

<script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"></script>
<script type="esms-options">
{
  "shimMode": true,
  "polyfillEnable": ["css-modules", "json-modules"],
  "nonce": "n0nce"
}
</script>
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000000;
  color: white;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
${css}</style>
<script crossorigin src="https://unpkg.com/react@18.0.0-rc.0-next-13036bfbc-20220121/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-is@18.0.0-rc.0-next-13036bfbc-20220121/umd/react-is.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.0.0-rc.0-next-13036bfbc-20220121/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.umd.min.js"></script>
</head>
<body>
<a class="skip-link" href="#zbody">Jump to the page</a>
<main id="zbody">
  ${html}
</main>
<script>window.process = {env: {NODE_ENV:"production" }}</script>
<script type="importmap-shim">
${JSON.stringify({ imports: { ...importmapJson.imports, app: "./app.js" } })}
</script>
<script type="module-shim">
  import App from 'app';
  import {jsx} from "@emotion/react"
  import {createRoot} from "react

  const root = createRoot(document.getElementById('zbody'))
  root.render(jsx(App));
</script>
</body>
</html>
`;
}

/**
 * @param {string}} cid
 * @returns {string}
 */
export const getEditorHTML = () =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://spike.land/assets/zed-icon-big.png" />
  
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"></script>
<title>Instant React Editor</title>
</head>
<body>
<script>window.process = {env: {NODE_ENV:"production" }}</script>
<script crossorigin src="https://unpkg.com/react@18.0.0-rc.0-next-13036bfbc-20220121/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-is@18.0.0-rc.0-next-13036bfbc-20220121/umd/react-is.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.0.0-rc.0-next-13036bfbc-20220121/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.umd.min.js"></script>
<script type="importmap">
${
    JSON.stringify({
      imports: { ...importmapJson.imports, app: ["./app.js"] },
    })
  }
</script>
<script type="module">
import {edit} from "https://spike.land/data.mjs"
try{
  edit(location.pathname.slice(42, 52));
}catch(error){
  fetch("https://spike.land/error", {method: "POST",  body: JSON.stringify({error})})
}
</script>
</body>
</html>`;
