export function getHtml({ html, css }: {
    html: string;
    css: string;
}): `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
<title>${string}</title>
<link rel="preload" href="./app.js" type="application/javascript" as="script" crossorigin>
<link rel="icon" type="image/png" href="https://zed.vision/zed-icon-big.png" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with zed.vision">
<style>
    ${string}
</style>
</head>
<body>
<div id="zbody">
  ${string}
</div>
<script type="module">
import { renderEmotion } from "${string}"
import App from "./app.js"

renderEmotion(App(), document.body.children[0]);
</script>
</body>
</html>
`;
export function getEditorHTML(codeLoaderVersion: string): `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://blog.zed.vision/zed-icon-big.png" />
<title>Instant React Editor</title>
</head>
<body>
  <script type="module">
    import {run} from "https://unpkg.com/@zedvision/code@${string}/src/codeLoader.js"
    try{
      run("window", window);
    }catch(error){
      fetch("https://zed.vision/error", {method: "POST",  body: JSON.stringify({error})})
    }
  </script>
</body>
</html>`;
