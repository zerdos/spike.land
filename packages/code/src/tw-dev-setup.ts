import { getCodeSpace } from "@/hooks/use-code-space";

const IFRAME_PATH = "/iframe";
const LIVE_PATH = "/live/";
const CSS_PATH = "/app/tw-global.css";
const JS_PATH = "/assets/tw-chunk-4a7018.js";

let initialized = false;
export const init = async (): Promise<true> => {
  if (initialized) {
    return true;
  }
  initialized = true;
  const codeSpace = getCodeSpace();
  const { pathname, origin } = window.location;

  if (
    !pathname.endsWith(IFRAME_PATH) &&
    !pathname.endsWith(`${LIVE_PATH}${codeSpace}`)
  ) {
    return true;
  }

  try {
    removeAllStyleBlocks();
    await Promise.all([
      loadCSS(`${origin}${CSS_PATH}`),
      loadScript(`${origin}${JS_PATH}`),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to load resources:", error);
    return true;
    // Optionally, you could throw the error here if you want calling code to handle it
  }
};

const loadCSS = (href: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = reject;
    document.head.appendChild(link);
  });
};

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const removeAllStyleBlocks = (): void => {
  const styleBlocks = document.querySelectorAll("head > style");
  styleBlocks.forEach((block) => block.remove());
};
