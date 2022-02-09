import"./chunk-UT4UBVWW.mjs";import{CacheProvider as c,jsx as o}from"https://ga.jspm.io/npm:@emotion/react@11.7.1/dist/emotion-react.browser.esm.js";import{createCache as h}from"https://ga.jspm.io/npm:@emotion/react@11.7.1/dist/emotion-react.browser.esm.js";import{renderToString as m}from"https://spike.land/dist/react.mjs";var g=s=>{let t=h({key:"css"}),e="";t.sheet.insert=l=>{e+=l},globalThis.renderToString=!0;let r=m(o(c,{value:t},o(s,null)));globalThis.renderToString=!1;let a=`
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${e}</style>
    </head>
    <body>
        <div>${r}</div>
    </body>
  </html>
`;return{html:r,css:e}};export{g as getHtmlAndCss};
