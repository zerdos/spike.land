import { sw } from "./hydrate";
import { syncWS } from "./ws";

import { unlink, writeFile } from "./fs";
import { appFactory } from "./starter";
import { wait } from "./wait";
import { sess as oldSess } from "./ws";

Object.assign(globalThis, {
  build: (codeSpace: string, opts: any) => () =>
    import("./esbuildEsm").then(eb =>
      (({ buildT }) => buildT(codeSpace, location.origin, (new AbortController()).signal, { bundle: true, ...opts }))(
        eb,
      )
    ),
});

const codeSpace = location.pathname.slice(1).split("/")[1];

let counterMax = 0;
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

let processed = 0;
let s: AbortSignal;
BC.onmessage = async ({ data }) => {
  const signal = s;

  if (counterMax !== data.i) return;

  const { html, css, i } = data;
  if (html) {
    if (signal.aborted) return;
    const newSession = {
      ...oldSess,
      html,
      css,
      code: sess.code,
      i,
    };

    const jsonStr = JSON.stringify(newSession);
    await wait(200);

    const file = `/live/${codeSpace}/session.json`;
    if (signal.aborted) return;

    await Promise.all([
      syncWS(newSession, signal),
      writeFile(file, jsonStr).catch(() => unlink(file).then(() => writeFile(file, jsonStr))),
    ]);
  }
};
const sess = {
  i: counterMax,
  codeSpace,
  transpiled: "",
  code: "",
};
export async function runner({ code, counter, codeSpace, signal }: {
  code: string;
  codeSpace: string;
  counter: number;
  signal: AbortSignal;
}) {
  s = signal;
  console.log({ counter });
  if (counter <= counterMax) return;

  counterMax = counter;
  sess.i = counterMax;
  sess.code = code;

  try {
    if (signal.aborted) return;

    const data = await sw.messageSW({
      i: counter,
      code,
      type: "prerender",
      codeSpace,
    });

    BC.postMessage(data);
  } catch (error) {
    console.error({ error });
  } finally {
  }
}
