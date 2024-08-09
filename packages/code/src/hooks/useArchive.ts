import { md5 } from "@src/md5";
import { build } from "../shared";
import { wait } from "../wait";

export const useArchive = async(codeSpace: string) => {

   
    const buildWithRetry = async () => {
      try {
        return await build({
          codeSpace,
          origin: location.origin,
          format: "iife",
        });
      } catch (e) {
        console.error("Build failed, retrying after 1 second:", e);
        await wait(1000);
        return await build({
          codeSpace,
          origin: location.origin,
          format: "iife",
        });
      }
    };

  const indexMjs = await buildWithRetry();


const gJunk = await fetch(`/assets/g-chunk-72a597.css`).then((res) => res.text());
const css = await fetch (`/live/${codeSpace}/index.css`).then((res) => res.text()); 
const twJS = await fetch(`/assets/tw-chunk-be5bad.js`).then((res) => res.text());
const htm   = await fetch(`/live/${codeSpace}/htm`).then((res) => res.text());


const html = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, interactive-widget=resizes-content">
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
  <base href="/">
  <title>CodeSpace archive for ${codeSpace} </title>
  <style>
    ${gJunk}
    ${css}
  </style>
</head>
<body>
  <div id="root">${htm}</div>
  <script>
  ${indexMjs}
  ${twJS}
  </script>
</body>
</html>`

const md = md5(html);

await fetch(`/my-cms/${md}/${codeSpace}.html`, {
    method: "PUT",
    headers: {
        "Content-Type": 'text/html',
        
    },
    body: html
});

location.href = `${window.location.origin}/my-cms/${md}/${codeSpace}.html`;
}
