var h={"@spike.land/ipfs":"https://ga.jspm.io/npm:@spike.land/ipfs@0.3.61/dist/ipfs.client.mjs","@spike.land/qrious":"https://ga.jspm.io/npm:@spike.land/qrious@0.4.15/dist/QRious.mjs","@spike.land/shadb":"https://ga.jspm.io/npm:@spike.land/shadb@0.4.15/dist/shaDB.mjs",comlink:"https://ga.jspm.io/npm:comlink@4.3.1/dist/umd/comlink.js",immutable:"https://ga.jspm.io/npm:immutable@4.0.0/dist/immutable.es.js",react:"https://unpkg.com/@spike.land/esm@0.3.75/dist/react.mjs","react-dom":"https://unpkg.com/@spike.land/esm@0.3.75/dist/react-dom.mjs","react-dom/server":"https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-f2a59df48-20211208/server.browser.js","react-is":"https://unpkg.com/@spike.land/esm@0.3.75/dist/react-is.mjs","react-transition-group":"https://ga.jspm.io/npm:react-transition-group@4.4.2/esm/index.js","react/jsx-runtime":"https://ga.jspm.io/npm:react@18.0.0-rc.0-next-f2a59df48-20211208/jsx-runtime.js","framer-motion":"https://unpkg.com/@spike.land/esm@0.3.75/dist/framer-motion.mjs","textdiff-create":"https://unpkg.com/@spike.land/esm@0.3.75/dist/textdiff-create.mjs","textdiff-patch":"https://unpkg.com/@spike.land/esm@0.3.75/dist/textdiff-patch.mjs","ipfs-only-hash":"https://unpkg.com/@spike.land/esm@0.3.75/dist/ipfs-only-hash.mjs","@emotion/react":"https://unpkg.com/@spike.land/esm@0.3.75/dist/emotion-react.mjs"},u={"https://ga.jspm.io/":{"@babel/runtime/helpers/esm/assertThisInitialized":"https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/assertThisInitialized.js","@babel/runtime/helpers/esm/extends":"https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/extends.js","@babel/runtime/helpers/esm/inheritsLoose":"https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/inheritsLoose.js","@babel/runtime/helpers/esm/objectWithoutPropertiesLoose":"https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/objectWithoutPropertiesLoose.js","dom-helpers/addClass":"https://ga.jspm.io/npm:dom-helpers@5.2.0/esm/addClass.js","dom-helpers/removeClass":"https://ga.jspm.io/npm:dom-helpers@5.2.0/esm/removeClass.js","object-assign":"https://ga.jspm.io/npm:object-assign@4.1.1/index.js",process:"https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.13/nodelibs/browser/process-production.js","prop-types":"https://ga.jspm.io/npm:prop-types@15.8.0/index.js",scheduler:"https://ga.jspm.io/npm:scheduler@0.21.0-rc.0-next-f2a59df48-20211208/index.js"}},n={imports:h,scopes:u};function b(s){let{html:r}=s,o=String(document.getElementById("zbody")?.getAttribute("class")),e="";if(document.querySelector("head > style[data-emotion=css]"))try{let t=document.querySelector("head > style[data-emotion=css]").sheet;t&&(e=Array.from(t.cssRules).map(i=>i.cssText).filter(i=>{let c=i.substring(5,10),d=o.indexOf(c)!==-1,l=r.indexOf(c)!==-1,g=i.indexOf("Mui")===-1;return d||l}).join(`
  `).replace("#zbody","body"))}catch(t){console.error({e:t})}if(document.querySelector("head > style[data-emotion=css-global]"))try{let t=document.querySelector("head > style[data-emotion=css-global]").sheet;t&&(e+=Array.from(t.cssRules).map(i=>i.cssText).join(`
  `).replace("#zbody","body"))}catch(t){console.error({e:t})}s.css=e}function k({html:s,css:r}){let o=s.indexOf("<title>"),e=s.indexOf("</title>");return`<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<title>${o<e&&o>=-1?s.slice(o,e):"(code).spike.land :)"}</title>
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
${r}</style>
<script crossorigin src="https://unpkg.com/react@18.0.0-rc.0-next-f2a59df48-20211208/umd/react.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-is@18.0.0-rc.0-next-f2a59df48-20211208/umd/react-is.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18.0.0-rc.0-next-f2a59df48-20211208/umd/react-dom.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.umd.min.js"><\/script>
</head>
<body>
<a class="skip-link" href="#zbody">Jump to the page</a>
<main id="zbody">
  ${s}
</main>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap-shim">
${JSON.stringify({imports:{...n.imports,app:"./app.js"}})}
<\/script>
<script type="module-shim">
  import App from 'app';
  import {jsx} from "@emotion/react"
  import {createRoot} from "react-dom"

  const root = createRoot(document.getElementById('zbody'))
  root.render(jsx(App));
<\/script>
</body>
</html>
`}var x=()=>`<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://code.spike.land/assets/zed-icon-big.png" />
  
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"><\/script>
<title>Instant React Editor</title>
</head>
<body>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script crossorigin src="https://unpkg.com/react@18.0.0-rc.0-next-f2a59df48-20211208/umd/react.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-is@18.0.0-rc.0-next-f2a59df48-20211208/umd/react-is.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18.0.0-rc.0-next-f2a59df48-20211208/umd/react-dom.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.umd.min.js"><\/script>
<script type="importmap">
${JSON.stringify({imports:{...n.imports,app:["./app.js"]}})}
<\/script>
<script type="module">
import {edit} from "https://code.spike.land/data.mjs"
try{
  edit(location.pathname.slice(42, 52));
}catch(error){
  fetch("https://code.spike.land/error", {method: "POST",  body: JSON.stringify({error})})
}
<\/script>
</body>
</html>`;export{b as getCss,x as getEditorHTML,k as getHtml};
//# sourceMappingURL=templates-HYAMC23Y.mjs.map
