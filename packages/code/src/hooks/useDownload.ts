import { build } from "../shared";
import { wait } from "../wait";

export const useDownload = (codeSpace: string) => {
  return async () => {
    //     import TW from "../tw.js?text";
    // import resetCSS from "../assets/g.css?text";

    const TW = await ((await fetch("/assets/tw.js")).text());

    const appCss = await ((await fetch("/assets/app.css")).text());

    const resetCSS = await ((await fetch("/assets/g.css")).text());
    let indexMjs: string;

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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content">

  <base href="/">
  <title>Instant React Editor</title>
  <style>
  ${appCss}
  ${resetCSS}
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    ${TW}
    ${indexMjs}
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
