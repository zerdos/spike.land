import { enhancedFetch } from "./enhancedFetch";
import { build, transpile } from "./shared";

const codeSpace = getCodeSpace();

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

   // await writeFile(`/live/${codeSpace}/index.mjs`, file);

    await fetch(`${origin}/live/${codeSpace}Bundled/index.mjs`, {
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
export const runner = async ({
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

  let transpiled = "";
  try {
    if (signal.aborted) return;

    transpiled = await transpile({ code, originToUse: location.origin });
    if (signal.aborted) return;

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
    throw error;
  }
};

/**
 * Get the code space from the current URL.
 */
function getCodeSpace(): string {
  return location.pathname.slice(1).split("/")[1];
}