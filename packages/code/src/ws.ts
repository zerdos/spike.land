import { useCodeSpace } from "@/hooks/use-code-space";
import type { ICode, ICodeSession, IframeMessage, RenderedApp } from "@/lib/interfaces";

// import type { EmotionCache } from "@emotion/cache";
import { initializeApp, setupServiceWorker } from "./hydrate";
import { Code } from "./services/CodeSession";

import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";
import { renderApp } from "@/lib/render-app";
import { prettierCss } from "@/lib/shared";
import { wait } from "@/lib/wait";
import { get } from "http";
import { renderPreviewWindow } from "./renderPreviewWindow";
// import { mineFromCaches } from "./utils/mineCss";
// import { render } from "@testing-library/react";

const codeSpace = useCodeSpace();

declare global {
  interface Window {
    rendered: RenderedApp | null;
    renderedMd5: string;
  }
}

let { rendered, renderedMd5 } = window;

const handleScreenshot = async () => {
  try {
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(document.body);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob from canvas"));
        }
      }, "image/png");
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
  signal: AbortSignal,
): Promise<{ css: string; html: string } | false> => {
  const { extractStyles, cssCache, rootElement } = renderedNew;

  try {
    if (!rootElement) return false;
    if (!rootElement.innerHTML) await wait(100);
    if (!rootElement.innerHTML) await wait(200);
    if (!rootElement.innerHTML) await wait(400);

    const html = htmlDecode(rootElement.innerHTML);
    // const classNames = getClassNamesFromHTML(html);

    if (!html) return false;
    for (let attempts = 5; attempts > 0; attempts--) {
      if (signal.aborted) return false;

      const emotionStyles = extractStyles();

      const styleElement = document.querySelector("head > style:last-child");
      const tailWindClasses = styleElement
        ? Array.from((styleElement as HTMLStyleElement).sheet!.cssRules).filter(
          (x) => x.cssText.startsWith("."),
        ).map(
          (x) => x.cssText.split("\\").join(""),
        )
        : [];
      const htmlClasses = new Set(getClassNamesFromHTML(html).join(" ").split(" "));

      const criticalClasses = new Set(
        [
          ...tailWindClasses,
          ...emotionStyles,
        ].filter((line) => {
          if (line.startsWith("@")) return true;
          const rule = line.slice(1, line.indexOf("{")).trim();
          return htmlClasses.has(rule);
        }),
      );

      let cssStrings = [...criticalClasses].sort().join("\n");

      try {
        cssStrings = cssStrings ? await prettierCss(cssStrings) : "";
      } catch (error) {
        console.error("Error prettifying CSS:", error);
      }

      if (signal.aborted) return false;

      return {
        css: cssStrings.split(cssCache.key).join("x"),
        html: html.split(cssCache.key).join("x"),
      };
    }
    return false;
  } catch (error) {
    console.error("Error in handleRender:", error);
    return false;
  } finally {
    rootElement.remove();
  }
};

const mod = {
  controller: new AbortController(),
  runningOperations: new Map<string, Promise<RunAnswerType>>(),
};

type RunAnswerType = {
  html: string;
  css: string;
  requestId: string;
};
const handleDefaultPage = async (cSess: ICode) => {
  try {
    const updateRenderedApp = async (sess: ICodeSession) => {
      try {
        const { transpiled } = sess;

        renderedMd5 = md5(transpiled);
        if (renderedMd5 === window.renderedMd5) {
          console.log("Skipping update as md5 is the same");
          return;
        }
        window.renderedMd5 = renderedMd5;
        console.log("Updating rendered app...");

        const myEl = document.createElement("div");
        myEl.style.cssText =
          "isolation: isolate;  height: 100dvh; height: 100svh; font-family: 'Roboto Flex', sans-serif;";
        document.body.appendChild(myEl);

        // Clean up previous rendered app if any
        rendered?.cleanup();
        rendered = null;

        rendered = await renderApp({
          transpiled,
          codeSpace,
          rootElement: myEl,
        });

        document.getElementById("embed")?.remove();
        myEl.setAttribute("id", "embed");
      } catch (error) {
        rendered?.cleanup();
        console.error("Error updating rendered app:", error);
      }
    };

    cSess.sub(updateRenderedApp);

    window.onmessage = async ({ data }: { data: IframeMessage }) => {
      try {
        const { type, requestId } = data;
        if (!type) return;

        if (type === "screenShot") {
          await handleScreenshot();
        } else if (type === "run" && requestId) {
          const { transpiled } = data;
          const resp = await handleRunMessage({ transpiled, requestId });

          return window.parent.postMessage({
            type: "runResponse",
            ...resp,
          } as IframeMessage, "*");
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};

const handleRunMessage = async (
  { transpiled, requestId }: { transpiled: string; requestId: string },
) => {
  const { runningOperations } = mod;

  console.log("Handling run message:", { transpiled, requestId });

  if (runningOperations.has(requestId)) {
    const res = await runningOperations.get(requestId);
    if (res?.css && res?.html) return res;
  }

  const result: RunAnswerType = {
    html: "",
    css: "",
    requestId,
  };

  runningOperations.set(
    requestId,
    (async () => {
      try {
        mod.controller.abort();
        mod.controller = new AbortController();
        const { signal } = mod.controller;

        const parentElement = document.createElement("div");
        const myEl = document.createElement("div");
        parentElement.appendChild(myEl);

        myEl.style.cssText = "height: 100%; width: 100%; display: none;";
        // document.body.appendChild(myEl);

        const renderedNew = await renderApp({
          rootElement: myEl,
          transpiled,
          prerender: true,
        });

        if (!renderedNew || signal.aborted) {
          return result;
        }

        const res = await handleRender(renderedNew, signal);

        result.html = res && res.html ? res.html : "";
        result.css = res && res.css ? res.css : "";
        myEl.remove();
        renderedNew.cleanup();
        parentElement.remove();
      } catch (error) {
        console.error("Error running code:", error);
      }

      return result;
    })(),
  );

  const res = await runningOperations.get(requestId)!;

  return res;
};

export const main = async () => {
  const cSess = new Code(codeSpace);
  const waitForCSess = cSess.run();
  await waitForCSess;
  Object.assign(globalThis, { cSess });
  (() => {
    try {
      cSess.sub(
        (sess: ICodeSession) => {
          const { i, code, transpiled } = sess;
          console.table({ i, code, transpiled });
        },
      );
    } catch (error) {
      console.error("Error in cSess subscription:", error);
    }
  })();

  try {
    if (
      location.pathname === `/live/${codeSpace}`
      || location.pathname === `/live-cms/${codeSpace}`
    ) {
      console.log("Rendering preview window...");
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

const handleDehydratedPage = (cSess: ICode) => {
  try {
    cSess.sub(
      (sess: ICodeSession) => {
        const { html, css } = sess;
        const root = document.getElementById("embed");
        if (root && html && css) {
          root.innerHTML = `<style>${css}</style><div>${html}</div>`;
        }
      },
    );
  } catch (error) {
    console.error("Error handling dehydrated page:", error);
  }
};

function getClassNamesFromHTML(htmlString: string) {
  const classNames = new Set<string>();
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const elements = tempDiv.getElementsByTagName("*");
  for (const el of elements) {
    let className = "";
    if (typeof el.className === "string") {
      className = el.className;
    } else if (typeof el.className === "object" && "baseVal" in el.className) {
      // Handle SVGAnimatedString
      className = (el.className as SVGAnimatedString).baseVal;
    }
    if (className) {
      className
        .trim()
        .split(/\\s+/)
        .forEach((cls) => classNames.add(cls));
    }
  }
  tempDiv.childNodes.forEach((el) => {
    if (el instanceof HTMLElement) {
      const elementClassNames = getClassNamesFromHTML(el.innerHTML);
      elementClassNames.forEach((cls) => classNames.add(cls));
    }
  });
  return Array.from(classNames);
}

function htmlDecode(input: string): string {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.innerHTML
    .split("><").join(">\n<")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

setTimeout(async () => {
  await setupServiceWorker();
}, 0);
