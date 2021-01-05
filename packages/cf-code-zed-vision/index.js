(() => {
  // ../code/package.json
  var version = "11.3.5";

  // src/index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    const {searchParams, pathname} = url;
    return text(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="icon" type="image/png" href="https://blog.zed.vision/zed-icon-big.png" />
  <title>Instant React Editor</title>
  </head>
  <body>
    <script type="module">
      import {run} from "https://unpkg.com/@zedvision/code@${version}/dist/codeLoader.js"
      try{
        run("window", window);
      }catch(error){
        fetch("https://zed.vision/error", {method: "POST",  body: JSON.stringify({error})})
      }
    </script>
  </body>
  </html>
`);
  }
  function text(resp) {
    return new Response(resp, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "text/html;charset=UTF-8"
      }
    });
  }
})();
