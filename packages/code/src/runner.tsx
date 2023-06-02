// import { syncWS } from "./ws";

import type { BuildOptions } from "esbuild-wasm";
import { importMapReplace } from "./importMapReplace";
import { transpile } from "./shared";

// import { wait } from "./wait";
// import { sess as oldSess } from "./ws";

Object.assign(globalThis, {
  build: (codeSpace: string, opts: BuildOptions) => () =>
    import("./esbuildEsmBuild").then((eb) =>
      (({ buildT }) =>
        buildT(codeSpace, location.origin, (new AbortController()).signal, {
          bundle: true,
          splitting: false,
          ...opts,
        }))(
          eb,
        )
    ),
});

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
    const transpiled = importMapReplace(
      await transpile({ code, originToUse: location.origin }),
      location.origin,
      swVersion,
    );

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
