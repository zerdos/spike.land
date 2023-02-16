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

let counterMax = 0;

const sess = {
  i: 0,
  codeSpace,
  transpiled: "",
  code: "",
};
export async function runner({ code, counter }: {
  code: string;
  codeSpace: string;
  counter: number;
  // signal: AbortSignal;
}) {
  console.log({ counter });
  if (counter <= counterMax) return;

  counterMax = counter;
  sess.i = counterMax;
  sess.code = code;

  try {
    // if (signal.aborted) return;

    // const data = await sw.messageSW({
    //   i: counter,
    //   code,
    //   type: "prerender",
    //   codeSpace,
    // });
    const transpiled = importMapReplace(await transpile({ code, originToUse: location.origin }), location.origin);

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
