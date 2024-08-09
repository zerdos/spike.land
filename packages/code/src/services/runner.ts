import { createJsBlob } from "@src/components/AppRenderer";
import { transpile } from "@src/shared";

const getCssStr = (html: string) => html.split("\"css-").slice(1).map(x => x.slice(0, 7)).join("");

const codeSpace = location.pathname.split("/")[2];

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
  css: '',
  cssIds: getCssStr(cSess.session.html),
  controller: new AbortController(),
};

fetch("/live/" + codeSpace + "/index.css").then((res) => res.text()).then((css) => mod.css = css),

BC.onmessage = ({ data }) => {
  if (data.i > mod.i) {
    mod.i = data.i;
    mod.code = data.code;
    mod.controller.abort();
    mod.controller = new AbortController();
    mod.css = data.css;
    mod.html = data.html;
    mod.cssIds = getCssStr(data.html);
  }
};

export const runner = async (code: string, i = 0) => {
  if (i === 0) i = mod.i + 3;
  if (i < mod.i) return;

  try {
    mod.controller.abort();
    mod.controller = new AbortController();
    const signal = mod.controller.signal;
    if (signal.aborted) return;

    console.log("Running code", i);

    const transpiled = await transpile({
      code,
      originToUse: location.origin,
    });

    const App = (await import(createJsBlob(transpiled))).default;

    const html = toString(App);
    if (!html) {
      console.error("Error in runner: no html");

      return;
    }

    if (cSess.session.css === "" || mod.cssIds !== getCssStr(html)) {
    console.log("Sending message iframe first to calculate css");
      document.querySelector("iframe")?.contentWindow?.postMessage({
        code,
        transpiled,
        i,
        sender: "Runner / Editor",
      });
    } else {
        console.log("Sending message to BC", i);
        
      mod.html = html;
      mod.cssIds = getCssStr(html);

      BC.postMessage({
        code,
        transpiled,
        html,
        css: await fetch("/live/" + codeSpace + "/index.css").then((res) => res.text()),
        i,
        sender: "Editor",
      });
    }

    mod.controller.abort();

    console.log("Runner succeeded");
  } catch (error) {
    console.error("Error in runner:", error);
  }
};
