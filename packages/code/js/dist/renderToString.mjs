import{jsx as o}from"https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";import s from"https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js";import{CacheProvider as a}from"https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";import{renderToStaticMarkup as h}from"https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-f2a59df48-20211208/server.browser.js";var f=m=>{let e=s({key:"foo"}),t="";e.sheet.insert=c=>{t+=c};let r=h(o(a,{value:e},o(m,null))),d=`
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${t}</style>
    </head>
    <body>
        <div>${r}</div>
    </body>
  </html>
`;return{html:r,css:t}};export{f as getHtmlAndCss};
//# sourceMappingURL=renderToString.mjs.map
