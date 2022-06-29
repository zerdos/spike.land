export const content = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
  <link rel="icon" type="image/png" href="./assets/zed-icon-big.png" />
  <link rel="stylesheet" href="https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css" />
  <link rel="stylesheet" href="https://spike.land/assets/app.css" />
  <link rel="stylesheet" href="https://spike.land/assets/roboto.css" />

  <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js"></script>
  <title>Instant React Editor</title>
  <script type="esms-options">
    {
      "shimMode": true,
      "polyfillEnable": ["css-modules", "json-modules"],
      "nonce": "n0nce"
    }
    </script>
</head>
<body>
  <script type="importmap-shim" src="https://spike.land/importmap.json"></script>
  <script type="module-shim" src="https://spike.land/starter.js"></script>
</body>
</html>`;
