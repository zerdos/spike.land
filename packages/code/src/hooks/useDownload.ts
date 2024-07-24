import { resetCSS } from "../getResetCss";
import { HTML, TW } from "../modules";
import { build } from "../shared";
import { wait } from "../wait";

export const useDownload = (codeSpace: string) => {
  return async () => {
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

    const content = HTML.replace(
      "/**reset*/",
      resetCSS + cSess.session.css,
    ).replace(
      "<script src=\"/swVersion.js\"></script>",
      "",
    )
      .replace(
        `<div id="root"></div>`,
        `<div id="root" style="height: 100%;">
                <div id="${codeSpace}-css" data-i="${cSess.session.i}" style="height: 100%;">
                  ${cSess.session.html}
                </div>
        </div>
          <script>${TW}</script>
  <script type="module">
    ${indexMjs}
    globalThis.module.renderApp();
  </script>              
      `,
      );

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
