import { stat, unlink, writeFile } from "./memfs";
import { build, transpile } from "./shared";

// import { wait } from "./wait";
// import { sess as oldSess } from "./ws";

Object.assign(globalThis, { build, transpile });

const codeSpace = location.pathname.slice(1).split("/")[1];

const runnerSession = {
  i: 0,
  codeSpace,
  counterMax: 0,
  transpiled: "",
  code: "",
};
export async function runner({ code, counter, signal }: {
  code: string;
  codeSpace: string;
  counter: number;
  signal: AbortSignal;
}) {
  console.log({ counter });
  if (counter <= runnerSession.counterMax) return;
  if (signal.aborted) return;

  runnerSession.counterMax = counter;
  runnerSession.i = runnerSession.counterMax;
  runnerSession.code = code;

  try {
    if (signal.aborted) return;

    // const data = await sw.messageSW({
    //   i: counter,
    //   code,
    //   type: "prerender",
    //   codeSpace,
    // });
    await stat(`/live/${codeSpace}/index.js`)
      && await unlink(`/live/${codeSpace}/index.js`);

    const bundle = await stat(`/live/${codeSpace}/index.mjs`);
    const transpiled = await transpile({ code, originToUse: location.origin });

    if (bundle) {
      try {
        await writeFile(`/live/${codeSpace}/index.js`, transpiled);
        await build({ codeSpace, origin: location.origin });
      } catch {
        await stat(`/live/${codeSpace}/index.js`)
          && await unlink(`/live/${codeSpace}/index.js`);
        unlink(`/live/${codeSpace}/index.mjs`);
      }
    }

    if (signal.aborted) return;

    document.querySelector("iframe")?.contentWindow?.postMessage({
      code,
      i: counter,
      type: "prerender",
      transpiled: transpiled,
    });
  } catch (error) {
    console.error({ error });
  } finally {
  }
}
