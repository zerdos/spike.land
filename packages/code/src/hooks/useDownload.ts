import { build } from "../shared";
import { wait } from "../wait";
import { resetCSS } from "../getResetCss";

export const useDownload = (codeSpace: string) => {
  return async () => {
    let indexMjs: string;

    const buildWithRetry = async () => {
      try {
        return await build({
          codeSpace,
          origin: location.origin,
          format: 'iife'
        });
      } catch (e) {
        console.error("Build failed, retrying after 1 second:", e);
        await wait(1000);
        return await build({
          codeSpace,
          origin: location.origin,
          format: 'iife'
        });
      }
    };

    indexMjs = await buildWithRetry();

    if (!indexMjs) {
      console.error("Failed to build index.mjs");
      return;
    }

    const content = `
<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="/">
  <title>Instant React Editor</title>
  <style>
    html, body {
      overflow: hidden;
      margin: 0;
      height: 100%;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: none;
    }

    q { display: none; }

    @media screen and (prefers-color-scheme: dark) {
      body {
        background-color: #121212;
        color: hsl(210, 10%, 62%);
        --text-color-normal: hsl(210, 10%, 62%);
        --text-color-light: hsl(210, 15%, 35%);
        --text-color-richer: hsl(210, 50%, 72%);
        --text-color-highlight: hsl(25, 70%, 45%);
      }
    }

    @media screen and (prefers-color-scheme: light) {
      body {
        background-color: white;
        color: black;
        --text-color-normal: #0a244d;
        --text-color-light: #8cabd9;
      }
    }

    ${resetCSS}
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    ${indexMjs}
    globalThis.module.renderApp();
  </script>
</body>
</html>`;

    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${codeSpace}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
};