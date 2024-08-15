import { useCodeSpace } from "@src/hooks/useCodeSpace";
import { transpile } from "@src/shared";
import { cSess } from "@src/ws";

const getCssStr = (html: string) => html.split("\"css-").slice(1).map(x => x.slice(0, 7)).join("");

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
  ...cSess.session,
  css: cSess.session.css,
  controller: new AbortController(),
};

fetch("/live/" + codeSpace + "/index.css").then((res) => res.text()).then((css) => mod.css = css),
  BC.onmessage = ({ data }) => {
    // if (data.i > mod.i) {
    cSess.session.code = data.code;
    mod.i = data.i;
    mod.code = data.code;
    mod.controller.abort();
    mod.controller = new AbortController();
    mod.css = data.css;
    mod.html = data.html;
    mod.cssIds = getCssStr(data.html);
    // } else {
    // mod.i = data.i;
    // }
  };

export const runner = async (code: string, counter = 0) => {
  const formattedCode = code;
  if (code === cSess.session.code) return true;

  if (counter === 0) counter = mod.i + 3;
  if (counter <= mod.i) return false;
  mod.i = counter;
  console.log("Running code", counter);

  try {
    mod.controller.abort();
    mod.controller = new AbortController();
    const signal = mod.controller.signal;
    if (signal.aborted) return false;

    // console.log("Running code", i);

    const transpiled = await transpile({
      code: formattedCode,
      originToUse: location.origin,
    });

    let resolve: (v: {
      i: number;
      html: string;
      css: string;
    }) => void;
    const promise = new Promise<{ i: number; html: string; css: string }>((_resolve) => {
      resolve = _resolve;
    });

    window.onmessage = (ev) => {
      const data: { i: number; html: string; css: string } = ev.data;

      const { i, html, css } = data;
      if (i === counter) {
        resolve({ i, html, css });
      }
    };

    console.log("Sending message iframe first to calculate css", counter);
    document.querySelector("iframe")?.contentWindow?.postMessage({
      transpiled,
      i: counter,
      sender: "Runner / Editor",
    });

    const { i, html, css } = await promise;

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
    console.error("Error in runner:", error);
    return false;
  }
};
