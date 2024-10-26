import { getCodeSpace } from "@/hooks/use-code-space";
import type { ICodeSession, IframeMessage, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";
import { renderApp } from "@/lib/render-app";
import { prettierCss } from "@/lib/shared";
import { wait } from "@/lib/wait";

import { initializeApp, setupServiceWorker } from "./hydrate";
import { renderPreviewWindow } from "./renderPreviewWindow";
import { Code } from "./services/CodeSession";
import { CodeSessionBC } from "./services/CodeSessionBc";
import { init as twUp } from "./tw-dev-setup";

// Global variables and types
const codeSpace = getCodeSpace();
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
    const canvas = await html2canvas(document.body);
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

  for (let attempts = 5; attempts > 0; attempts--) {
    if (!rootElement.innerHTML) {
      await wait(50);
      if (!rootElement?.innerHTML) continue;
    }

    const html = htmlDecode(rootElement.innerHTML);

    const emotionStyles = [...cssCache.sheet.tags].map((
      tag: HTMLStyleElement,
    ) => ([...tag.sheet!.cssRules!].map((x) => x.cssText))).flat().join("\n")
      .split(cssCache.key).join("x");

    console.log("Emotion styles:", emotionStyles);

    const tailWindClassesX = [
      ...document.querySelectorAll<HTMLStyleElement>("head > style"),
    ].map(
      (z) => ([...(z.sheet?.cssRules || [])].map((x) => x.cssText)),
    ).flat().join("\n");

    // const htmlClasses = new Set(
    //   getClassNamesFromHTML(html).join(" ").split(" ").filter((x) => x),
    // );

    // console.log("HTML classes:", htmlClasses);

    // const criticalClasses = new Set(
    //   emotionStyles.filter((line) => line.startsWith("@") || htmlClasses.has(line.slice(1, line.indexOf("{")).trim())),
    // );

    // let cssStrings = [...criticalClasses]

    let cssStrings = [emotionStyles, tailWindClassesX].join("\n");

    try {
      cssStrings = cssStrings ? await prettierCss(cssStrings) : "";
    } catch (error) {
      console.error("Error prettifying CSS:", error);
    }

    // const cssStyled = cssStrings.split(cssCache.key).join("x");
    // console.log("CSS styled:", cssStyled);
    return {
      css: cssStrings,
      html: html.split(cssCache.key).join("x"),
    };
  }
  return false;
};

const updateRenderedApp = async ({ transpiled }: { transpiled: string; }) => {
  if (!renderedMd5) await twUp();

  const hashed = md5(transpiled);
  if (hashed === renderedMd5) {
    console.log("Skipping update as md5 is the same");

    return rendered;
  }
  renderedMd5 = hashed;
  console.log("Updating rendered app...");

  const myEl = document.createElement("div");
  myEl.setAttribute("id", "root");
  document.body.appendChild(myEl);

  rendered?.cleanup();
  rendered = null;

  rendered = await renderApp({ transpiled, codeSpace, rootElement: myEl });

  document.getElementById("embed")?.remove();
  myEl.setAttribute("id", "embed");
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
        const { i, code, transpiled } = sess;
        console.table({ i, code, transpiled });
      });

      console.log("Rendering preview window...");
      if (location.hostname !== "localhost") await twUp();
      await initializeApp();
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

  await setupServiceWorker();
}, 0);

Object.assign(globalThis, {
  twUp,
  handleRunMessage,
  handleScreenshot,
  updateRenderedApp,
});
