import"./chunk-AH6KKUH7.mjs";import{CacheProvider as m,jsx as o}from"https://spike.land/dist/emotion.mjs";import h from"https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js";import{renderToString as a}from"https://ga.jspm.io/npm:preact-render-to-string@5.1.19/dist/index.mjs";var p=s=>{let t=h({key:"css"}),e="";t.sheet.insert=c=>{e+=c};let r=a(o(m,{value:t},o(s,null))),n=`
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
`;return{html:r,css:e}};export{p as getHtmlAndCss};
