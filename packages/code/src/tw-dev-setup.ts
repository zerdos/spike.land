import { useCodeSpace } from "@/hooks/use-code-space";

const IFRAME_PATH = "/iframe";
const LIVE_PATH = "/live/";
const CSS_PATH = "/app/tw-global.css";
const JS_PATH = "/assets/tw-chunk-4a7018.js";

let initialized = false;
export const init = async (): Promise<void> => {
  if (initialized) {
    return;
  }
  initialized = true;
  const codeSpace = useCodeSpace();
  const { pathname, origin } = window.location;

  if (
    !pathname.endsWith(IFRAME_PATH)
    && !pathname.endsWith(`${LIVE_PATH}${codeSpace}`)
  ) {
    return;
  }

  try {
    await Promise.all([
      // loadCSS(`${origin}${CSS_PATH}`),
      loadScript(`${origin}${JS_PATH}`),
    ]);
  } catch (error) {
    console.error("Failed to load resources:", error);
    // Optionally, you could throw the error here if you want calling code to handle it
  }
};

const loadCSS = (href: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // document.querySelector('[]')
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
