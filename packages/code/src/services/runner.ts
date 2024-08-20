import { useCodeSpace } from "@src/hooks/useCodeSpace";
import { transpile } from "@src/shared";

// const getCssStr = (html: string) => html.split("\"css-").slice(1).map((x) => x.slice(0, 7)).join("");

const codeSpace = useCodeSpace();

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

const mod: {
  i: number;
  code: string;
  html: string;
  css: string;
  cssIds: string;
  controller: AbortController;
} = {
  ...(globalThis.cSess || { session: {} }).session,
  i: (globalThis.cSess || { session: {} }).session.i,
  code: (globalThis.cSess || { session: {} }).session.code,
  html: (globalThis.cSess || { session: {} }).session.html,
  css: (globalThis.cSess || { session: {} }).session.css,
  controller: new AbortController(),
};

BC.onmessage = ({ data }) => {
  // if (data.i > mod.i) {
  cSess.session.code = data.code;
  cSess.session.i = data.i;
  mod.i = data.i;
  mod.code = data.code;
  mod.controller.abort();
  mod.controller = new AbortController();
  mod.css = data.css;
  mod.html = data.html;
  // mod.cssIds = getCssStr(data.html);
  // } else {
  // mod.i = data.i;
  // }
};

export const runner = async (code: string, counter = 0, ediSignal = (new AbortController()).signal) => {
  console.log("Running code", counter);

  const formattedCode = code;
  if (code === cSess.session.code) {
    console.log("Code is same as last run");
    return true;
  }
  console.log("Running code", counter);

  if (counter === 0) counter = globalThis.cSess.i + 3;
  if (counter <= mod.i) return false;
  mod.i = counter;
  console.log("Running code", counter);

  mod.controller.abort();
  mod.controller = new AbortController();
  const signal = mod.controller.signal;
  if (signal.aborted) return false;

  try {
    // console.log("Prettier succeeded");
    // console.log("Running code", i);

    if (ediSignal.aborted) return false;
    const transpiled = await transpile({
      code: formattedCode,
      originToUse: location.origin,
    });

    let resolve: (v: {
      i: number;
      html: string;
      css: string;
    }) => void;
    const promise = new Promise<{ i: number; html: string; css: string }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        setTimeout(() => {
          if (signal.aborted || ediSignal.aborted) return resolve({ i: counter, html: "", css: "" });
        }, 3000);
      },
    );

    window.onmessage = (ev) => {
      const data: { i: number; html: string; css: string } = ev.data;

      const { i, html, css } = data;
      if (i === counter) {
        resolve({ i, html, css });
      }
    };

    console.log("Sending message iframe first to calculate css", counter);
    if (signal.aborted) return false;
    if (ediSignal.aborted) return false;
    document.querySelector("iframe")?.contentWindow?.postMessage({
      transpiled,
      i: counter,
      sender: "Runner / Editor",
    });

    const res = await promise;
    if (signal.aborted) return false;
    if (ediSignal.aborted) return false;
    const { i, html, css } = res;

    if (html.includes("Oops! Something went wrong")) {
      console.error("Error in runner: no html");

      return false;
    }

    console.log("Sending message to BC", i);

    mod.html = html;
    const toPost = {
      code: formattedCode,
      transpiled,
      html,
      css,
      i,
      sender: "Editor",
    };
    console.log("Sending message to BC", toPost);

    cSess.session.code = formattedCode;
    BC.postMessage(toPost);

    mod.controller.abort();
    console.log("Runner succeeded");
    return true;
  } catch (error) {
    if (ediSignal.aborted) return false;
    if (signal.aborted) return false;
    console.error("Error in runner:", error);

    return false;
  }
};
