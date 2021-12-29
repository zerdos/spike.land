import{jsx as r}from"https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";import s from"https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js";import{CacheProvider as h}from"https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";import{renderToStaticMarkup as a}from"https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-f2a59df48-20211208/server.browser.js";var f=o=>{let e=s({key:"foo"}),t="";e.sheet.insert=c=>{t+=c};let m=a(r(h,{value:e},r(o,null)));return{html:`
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${t}</style>
    </head>
    <body>
        <div>${m}</div>
    </body>
  </html>
`,css:t}};export{f as getHtmlAndCss};
//# sourceMappingURL=renderToString.mjs.map
