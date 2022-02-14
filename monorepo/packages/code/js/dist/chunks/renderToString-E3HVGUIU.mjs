import"./chunk-AH6KKUH7.mjs";import{CacheProvider as m,jsx as o}from"https://spike.land/dist/emotion.mjs";import{createCache as h}from"https://spike.land/dist/emotion.mjs";import{renderToString as a}from"https://spike.land/dist/react.mjs";var p=s=>{let t=h({key:"css"}),e="";t.sheet.insert=c=>{e+=c};let r=a(o(m,{value:t},o(s,null))),n=`
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
