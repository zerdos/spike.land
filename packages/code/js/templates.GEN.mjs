var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import importmapJson from "../importmap.json";
export function getCss({ html }) {
  var _a;
  const bodyClass = String((_a = window.document.getElementById("zbody")) == null ? void 0 : _a.getAttribute("class"));
  let css = "";
  const cssRules = window.document.querySelector("head > style[data-emotion=css]");
  if (cssRules) {
    try {
      const sheet = window.document.querySelector("head > style[data-emotion=css]").sheet;
      if (sheet) {
        css = Array.from(sheet.cssRules).map((x) => x.cssText).filter((cssRule) => {
          const selector = cssRule.substring(5, 10);
          const isSelectorBody = bodyClass.indexOf(selector) !== -1;
          const isInGeneratedHtml = html.indexOf(selector) !== -1;
          const shouldInclude = isSelectorBody || isInGeneratedHtml;
          return shouldInclude;
        }).join("\n  ").replace(`#zbody`, "body");
      }
    } catch (e) {
      console.error({ e });
    }
  }
  const globalCssRules = window.document.querySelector("head > style[data-emotion=css-global]");
  if (globalCssRules) {
    try {
      const sheet = window.document.querySelector("head > style[data-emotion=css-global]").sheet;
      if (sheet) {
        css += Array.from(sheet.cssRules).map((x) => x.cssText).join("\n  ").replace(`#zbody`, "body");
      }
    } catch (e) {
      console.error({ e });
    }
  }
  return css;
}
export function getHtml({ html, css }) {
  const titleStart = html.indexOf("<title>");
  const titleEnd = html.indexOf("</title>");
  const hasTitle = titleStart < titleEnd && titleStart >= -1;
  const title = hasTitle ? html.slice(titleStart, titleEnd) : "(code).spike.land :)";
  return `<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<title>${title}</title>
<link rel="icon" type="image/png" href="https://code.spike.land/assets/zed-icon-big.png" />
<link rel="stylesheet" href="https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css" />

<script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"><\/script>
<script type="esms-options">
{
  "shimMode": true,
  "polyfillEnable": ["css-modules", "json-modules"],
  "nonce": "n0nce"
}
<\/script>
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
</head>
<body>
<a class="skip-link" href="#zbody">Jump to the page</a>
<main id="zbody">
  ${html}
</main>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap-shim">
${JSON.stringify({ imports: __spreadProps(__spreadValues({}, importmapJson.imports), { "app": "./app.js" }) })}
<\/script>
<script type="module-shim">
  import App from 'app';
  import {jsx} from "@emotion/react"
  import ReactDOM from "react-dom"

  ReactDOM.render(jsx(App),document.getElementById('zbody'));
<\/script>
</body>
</html>
`;
}
export const getEditorHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://code.spike.land/assets/zed-icon-big.png" />
  
  <script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"><\/script>
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"><\/script>
<title>Instant React Editor</title>
</head>
<body>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap">
${JSON.stringify({
  imports: __spreadProps(__spreadValues({}, importmapJson.imports), { "app": ["./app.js"] })
})}
<\/script>
<script type="module">
import {edit} from "https://code.spike.land/js/data.mjs"
try{
  edit(location.pathname.slice(42, 52));
}catch(error){
  fetch("https://code.spike.land/error", {method: "POST",  body: JSON.stringify({error})})
}
<\/script>
</body>
</html>`;
