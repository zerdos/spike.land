import { stat, unlink, writeFile } from "./memfs";
import { build, transpile } from "./shared";
const codeSpace = getCodeSpace();
Object.assign(globalThis, {
  build: async () => {
    const file = await build({ codeSpace, origin: location.origin, format: "esm" });
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
``;
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
const runnerSession = {
  i: 0,
  codeSpace,
  counterMax: 0,
  transpiled: "",
  code: "",
};
export async function runner({ code, counter, signal }) {
  console.log({ counter });
  if (counter <= runnerSession.counterMax || signal.aborted) {
    return;
  }
  runnerSession.counterMax = counter;
  runnerSession.i = counter;
  runnerSession.code = code;
  try {
    if (signal.aborted) {
      return;
    }
    await cleanupFiles();
    const transpiled = await transpile({ code, originToUse: location.origin });
    await writeFile(`/live/${codeSpace}/index.js`, transpiled);
    console.log({ transpiled });
    if (!transpiled) {
      return;
    }
    if (signal.aborted) {
      return;
    }
    BC.postMessage({ ...cSess.session, code, transpiled, i: counter });
    document.querySelector("iframe")?.contentWindow?.postMessage({
      code,
      i: counter,
      type: "prerender",
      transpiled: transpiled,
    });
  } catch (error) {
    console.error("Error during runner execution:", error);
  }
}
function getCodeSpace() {
  return location.pathname.slice(1).split("/")[1];
}
async function cleanupFiles() {
  try {
    if (await stat(`/live/${codeSpace}/index.js`)) {
      await unlink(`/live/${codeSpace}/index.js`);
    }
    if (await stat(`/live/${codeSpace}/index.mjs`)) {
      await unlink(`/live/${codeSpace}/index.mjs`);
    }
    await fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": `origin`,
        "TR_BUNDLE": `true`,
      },
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}
