import"./chunk-AH6KKUH7.mjs";import{CacheProvider as s,jsx as e}from"https://spike.land/dist/emotion.mjs";import{createCache as d}from"https://spike.land/dist/emotion.mjs";import{renderToString as h}from"https://spike.land/dist/react.mjs";var y=c=>{let r=d({key:"css"}),t="";r.sheet.insert=m=>{t+=m};let o=h(e("div",null,e(s,{value:r},e("div",null,e(c,null))))),a=`
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${t}</style>
    </head>
    <body>
        <div>${o}</div>
    </body>
  </html>
`;return{html:o,css:t}};export{y as getHtmlAndCss};
