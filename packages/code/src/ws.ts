import { useCodeSpace } from "@/hooks/use-code-space";
import type { ICode, ICodeSession, IframeMessage, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";
import { renderApp } from "@/lib/render-app";
import { prettierCss } from "@/lib/shared";
import { wait } from "@/lib/wait";
import { Mutex } from "async-mutex";
import { initializeApp, setupServiceWorker } from "./hydrate";
import { renderPreviewWindow } from "./renderPreviewWindow";
import { Code } from "./services/CodeSession";
import { init as twUp } from "./tw-dev-setup";

Object.assign(globalThis, { twUp });

// Global variables and types
const codeSpace = useCodeSpace();
let rendered: RenderedApp | null = null;
let renderedMd5 = "";

const htmlDecode = (input: string): string => {
  return input
    .split("><").join(">\n<")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
};

const getClassNamesFromHTML = (htmlString: string): string[] => {
  const classNames = new Set<string>();
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const processElement = (el: Element) => {
    const className = el.className;
    if (typeof className === "string") {
      className.trim().split(/\s+/).forEach((cls) => classNames.add(cls));
    } else if (typeof className === "object" && "baseVal" in className) {
      (className as SVGAnimatedString).baseVal.trim().split(/\s+/).forEach(
        (cls) => classNames.add(cls),
      );
    }
    el.childNodes.forEach((child) => {
      if (child instanceof Element) {
        processElement(child);
      }
    });
  };

  processElement(tempDiv);
  return Array.from(classNames);
};

// Main functions
const handleScreenshot = async () => {
  try {
    const html2canvas = (await import("html2canvas")).default;
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
  renderedNew: RenderedApp,
): Promise<{ css: string; html: string } | false> => {
  // confirm
  const { extractStyles, cssCache, rootElement } = renderedNew;

  for (let attempts = 5; attempts > 0; attempts--) {
    if (!rootElement.innerHTML) {
      await wait(50);
      if (!rootElement?.innerHTML) continue;
    }

    const html = htmlDecode(rootElement.innerHTML);

    const emotionStyles = extractStyles();
    console.log("Emotion styles:", emotionStyles);

    const tailWindClassesX = [
      ...(document.querySelector<HTMLStyleElement>(
        "head > style:last-child",
      )?.sheet?.cssRules || []) as CSSRuleList,
    ].map((x) => x.cssText.split("\\")).join("");

    const htmlClasses = new Set(
      getClassNamesFromHTML(html).join(" ").split(" "),
    );

    console.log("HTML classes:", htmlClasses);

    const criticalClasses = new Set(
      emotionStyles.filter((line) => line.startsWith("@") || htmlClasses.has(line.slice(1, line.indexOf("{")).trim())),
    );

    let cssStrings = [...criticalClasses].join("\n");

    try {
      cssStrings = cssStrings ? await prettierCss(cssStrings) : "";
    } catch (error) {
      console.error("Error prettifying CSS:", error);
    }

    const cssStyled = cssStrings.split(cssCache.key).join("x");
    console.log("CSS styled:", cssStyled);
    return {
      css: tailWindClassesX + "\n" + cssStyled,
      html: html.split(cssCache.key).join("x"),
    };
  }
  return false;
};

const updateRenderedApp = async ({ transpiled }: { transpiled: string }) => {
  const hashed = md5(transpiled);
  if (hashed === renderedMd5) {
    console.log("Skipping update as md5 is the same");
    return;
  }
  renderedMd5 = hashed;
  console.log("Updating rendered app...");

  const myEl = document.createElement("div");
  myEl.style.cssText = "isolation: isolate; height: 100dvh; height: 100svh; font-family: 'Roboto Flex', sans-serif;";
  document.body.appendChild(myEl);

  rendered?.cleanup();
  rendered = null;

  rendered = await renderApp({ transpiled, codeSpace, rootElement: myEl });

  document.getElementById("embed")?.remove();
  myEl.setAttribute("id", "embed");
  return rendered;
};

const handleRunMessage = (transpiled: string) => updateRenderedApp({ transpiled }).then((r) => handleRender(r!));

const handleDefaultPage = async (cSess: ICode) => {
  try {
    cSess.sub(updateRenderedApp);
    const mutex = new Mutex();
    let counter = 0;

    window.onmessage = async ({ data }: { data: IframeMessage }) => {
      try {
        await twUp();
        const { type, requestId } = data;
        if (!type) return;

        if (type === "screenShot") {
          await handleScreenshot();
        } else if (type === "run" && requestId) {
          const { transpiled, i } = data;
          if (i <= counter) return;
          counter = i;

          return await mutex.runExclusive(async () => {
            if (data.i !== counter) return;
            const resp = await handleRunMessage(transpiled);
            console.log("Sending run response:", { resp });
            return window.parent.postMessage(
              { type: "runResponse", requestId, ...resp } as IframeMessage,
              "*",
            );
          });
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};

const handleDehydratedPage = (cSess: ICode) => {
  try {
    cSess.sub((sess: ICodeSession) => {
      const { html, css } = sess;
      const root = document.getElementById("embed");
      if (root && html && css) {
        root.innerHTML = `<style>${css}</style><div>${html}</div>`;
      }
    });
  } catch (error) {
    console.error("Error handling dehydrated page:", error);
  }
};

export const main = async () => {
  const cSess = new Code(codeSpace);
  await cSess.run();
  Object.assign(globalThis, { cSess });

  cSess.sub((sess: ICodeSession) => {
    const { i, code, transpiled } = sess;
    console.table({ i, code, transpiled });
  });

  try {
    if (
      location.pathname === `/live/${codeSpace}`
      || location.pathname === `/live-cms/${codeSpace}`
    ) {
      console.log("Rendering preview window...");
      await twUp();
      await initializeApp();
      await renderPreviewWindow({ codeSpace, cSess });
    } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
      handleDehydratedPage(cSess);
    } else {
      await handleDefaultPage(cSess);
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

// Initialize service worker
setTimeout(async () => {
  await setupServiceWorker();
}, 0);
