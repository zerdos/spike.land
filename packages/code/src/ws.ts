import { getCodeSpace } from "@/hooks/use-code-space";
import type { ICodeSession, IframeMessage, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";

import { Mutex } from "async-mutex";
import { Code } from "./services/CodeSession";
import { CodeSessionBC } from "./services/CodeSessionBc";
import { init } from "./tw-dev-setup";

// Global variables and types
const codeSpace = getCodeSpace(location.pathname);
let rendered: RenderedApp | null = null;
let renderedMd5 = "";

const htmlDecode = (input: string): string => {
  return input
    .split("><").join(">\n<")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
};

// Main functions
const handleScreenshot = async () => {
  try {
    const html2canvas = (await import("@/external/html2canvas")).default;
    const canvas = await html2canvas(document.body, { imageTimeout: 100 });
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error("Failed to create blob from canvas")),
        "image/png",
      );
    });
    const file = new File([blob], `screenshot-${codeSpace}.png`, {
      type: "image/png",
    });
    const imageData = await processImage(file);
    window.parent.postMessage(
      { type: "screenShot", imageData } as IframeMessage,
      "*",
    );
  } catch (error) {
    console.error("Error taking screenshot:", error);
  }
};

const handleRender = async (
  renderedNew: RenderedApp | null,
): Promise<{ css: string; html: string; } | false> => {
  // confirm
  if (renderedNew === null) {
    return {
      css: "",
      html: "",
    };
  }

  const { cssCache, rootElement } = renderedNew;

  const html = htmlDecode(rootElement.innerHTML).split(cssCache.key).join("x");
  const emotionGlobalStyles = [
    ...document.querySelectorAll<HTMLStyleElement>(
      `style[data-emotion='${cssCache.key}-global']`,
    )
      .values(),
  ].map((x) => (Array.from(x.sheet!.cssRules).map((x) => x.cssText)).join("\n"));

  const emotionStyles = [
    ...emotionGlobalStyles,
    ...[...cssCache.sheet.tags].map((
      tag: HTMLStyleElement,
    ) => ([...tag.sheet!.cssRules!].map((x) => x.cssText))).flat(),
  ].join("\n")
    .split(cssCache.key).join("x");

  console.log("Emotion styles:", emotionStyles);

  const tailWindClasses = [
    ...document.querySelectorAll<HTMLStyleElement>("head > style"),
  ].map(
    (z) => z.innerHTML,
  ).join("\n");

  // remove comments
  const tailWindClassesXWithoutComments = tailWindClasses.replace(
    /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,
    "",
  );
  const tailWindClassesX = tailWindClassesXWithoutComments.split(`\\\\[`).join(`\\[`).split(
    `\\\\]`,
  ).join(`\\]`);

  // const htmlClasses = new Set(
  //   getClassNamesFromHTML(html).join(" ").split(" ").filter((x) => x),
  // );

  // console.log("HTML classes:", htmlClasses);

  // const criticalClasses = new Set(
  //   emotionStyles.filter((line) => line.startsWith("@") || htmlClasses.has(line.slice(1, line.indexOf("{")).trim())),
  // );

  // let cssStrings = [...criticalClasses]

  const cssStrings = [emotionStyles, tailWindClassesX].join("\n");

  // try {
  //   cssStrings = cssStrings ? await prettierCss(cssStrings) : "";
  // } catch (error) {
  //   console.error("Error prettifying CSS:", error);
  // }

  // const cssStyled = cssStrings.split(cssCache.key).join("x");
  // console.log("CSS styled:", cssStyled);
  try {
    // Object.assign(globalThis, {
    //   process: {
    //     cwd: () => "/",
    //     emitWarning: () => {},
    //     env: { NODE_ENV: "development" },
    //     platform: "browser",
    //   },
    // });

    // const Beasties = (await import("./beasties")).default;

    // const htmlToProcess = `<style>${cssStrings}</style>${html}`;

    // const beasties = new Beasties({
    //   external: false,
    //   inlineThreshold: 0,
    // });

    // const beastiesProcessed = await beasties.process(htmlToProcess);
    // const parts = beastiesProcessed.split("</style>");
    // const css = parts[0].replace("<style>", "");

    // import { PurgeCSS } from "purgecss";
    // const { PurgeCSS } = await import("purgecss");

    // const purged = await new PurgeCSS().purge({
    //   content: [
    //     {
    //       raw: parts[1],
    //       extension: "html",
    //     },
    //   ],
    //   css: [
    //     {
    //       raw: css,
    //     },
    //   ],
    // });

    // console.log("Purged:", {
    //   // purged,
    //   html: parts[1],
    //   css,
    // });

    return {
      css: cssStrings,
      html,
    };
  } catch (error) {
    console.error("Error processing CSS:", error);
  }

  return {
    css: cssStrings,
    html,
  };
};

const mutex = new Mutex();

const updateRenderedApp = async ({ transpiled }: { transpiled: string; }) => {
  const hashed = md5(transpiled);
  if (hashed === renderedMd5 && !transpiled.includes(`cn("`)) {
    console.log("Skipping update as md5 is the same");

    return rendered;
  } else if (transpiled.includes(`cn("`)) {
    const cnArr = transpiled.split(`cn("`);
    cnArr[0] = cnArr[1].split(" ").join("  ");
    transpiled = cnArr.join(`cn ("`);
  }

  renderedMd5 = hashed;
  console.log("Updating rendered app...");

  await mutex.runExclusive(async () => {
    const myEl = document.createElement("div");
    myEl.setAttribute("id", "root");
    document.body.appendChild(myEl);

    rendered?.cleanup();
    rendered = null;
    // import { renderApp } from "@/lib/render-app";

    const { renderApp } = await import("@/lib/render-app");

    rendered = await renderApp({ transpiled, codeSpace, rootElement: myEl });

    document.getElementById("embed")?.replaceWith(myEl);
  });
  return rendered;
};

const handleRunMessage = (transpiled: string) =>
  updateRenderedApp({ transpiled }).then(handleRender);
const handleDefaultPage = async () => {
  try {
    window.onmessage = async ({ data }: { data: IframeMessage; }) => {
      try {
        const { type } = data;
        if (!type) return;

        if (type === "screenShot") {
          await handleScreenshot();
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};

export const main = async () => {
  await init();

  const cSessBr = new CodeSessionBC(codeSpace);
  const session = await cSessBr.init();

  try {
    if (
      location.pathname === `/live/${codeSpace}` ||
      location.pathname === `/live-cms/${codeSpace}`
    ) {
      const cSess = new Code(codeSpace);
      await cSess.init(session);
      Object.assign(globalThis, { cSess });

      cSessBr.sub((sess: ICodeSession) => {
        const { code, transpiled } = sess;
        console.table({ code, transpiled });
      });

      const { initializeApp } = await import("./hydrate");

      await initializeApp();
      // import { renderPreviewWindow } from "./renderPreviewWindow";
      const { renderPreviewWindow } = await import("./renderPreviewWindow");

      await renderPreviewWindow({ codeSpace, cSess });
    } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
      const handleDehydratedPage = ({ html, css }: ICodeSession) =>
        document.getElementById("embed")!.innerHTML =
          `<style type="text/css">${css}</style><div>${html}</div>`;

      cSessBr.sub((sess: ICodeSession) => handleDehydratedPage(sess));
    } else {
      cSessBr.sub((s) => updateRenderedApp(s));
      await handleDefaultPage();
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

// Initialize service worker
setTimeout(async () => {
  if (window.parent !== window) return;
  // import { setupServiceWorker } from "./hydrate";
  const { setupServiceWorker } = await import("./hydrate");
  await setupServiceWorker();
}, 0);

Object.assign(globalThis, {
  handleRunMessage,
  handleScreenshot,
  updateRenderedApp,
});
