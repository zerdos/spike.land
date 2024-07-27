import { enhancedFetch } from "./enhancedFetch";
import { stat, unlink, writeFile } from "./memfs";
import { build, transpile } from "./shared";

const codeSpace = getCodeSpace();

// Throttle function
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

Object.assign(globalThis, {
  enhancedFetch,
  myATA: async () => {
    const { myATA } = await import("./my-ata");
    return myATA(cSess.session.code);
  },
  build: async () => {
    const file = await build({
      codeSpace,
      origin: location.origin,
      format: "esm",
    });

    await writeFile(`/live/${codeSpace}/index.mjs`, file);
    await fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": origin,
        "TR_BUNDLE": "true",
      },
    });
  },
  transpile,
});

const runnerSession = {
  i: 0,
  codeSpace,
  counterMax: 0,
  transpiled: "",
  code: "",
};

/**
 * Compiles and builds the code and handles the session state.
 */
export const runner = throttle(async ({
  code,
  counter,
  signal,
}: {
  code: string;
  codeSpace: string;
  counter: number;
  signal: AbortSignal;
}) => {
  console.log({ counter });

  if (counter <= runnerSession.counterMax || signal.aborted) return;

  runnerSession.counterMax = counter;
  runnerSession.i = counter;
  runnerSession.code = code;

  try {
    if (signal.aborted) return;

    await cleanupFiles();

    const transpiled = await transpile({ code, originToUse: location.origin });
    if (signal.aborted) return;

    await writeFile(`/live/${codeSpace}/index.js`, transpiled);

    console.log({ transpiled });
    if (!transpiled) return;

    if (signal.aborted) return;

    document.querySelector("iframe")?.contentWindow?.postMessage({
      code,
      transpiled,
      i: counter,
      sender: "Runner",
    });
  } catch (error) {
    console.error("Error during runner execution:", error);
  }
}, 333); // 333ms delay to allow max 3 calls per second

/**
 * Get the code space from the current URL.
 */
function getCodeSpace(): string {
  return location.pathname.slice(1).split("/")[1];
}

/**
 * Remove index.js and index.mjs files if they exist.
 */
async function cleanupFiles() {
  try {
    const files = [`/live/${codeSpace}/index.js`, `/live/${codeSpace}/index.mjs`];

    for (const file of files) {
      if (await stat(file)) {
        await unlink(file);
      }
    }

    await fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": origin,
        "TR_BUNDLE": "true",
      },
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}
