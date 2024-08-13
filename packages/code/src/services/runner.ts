import { prettierToThrow, transpile } from "@src/shared";
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
  css: "",
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

export const runner = async (code: string, counter = 0) => {
  let formattedCode = "";
  try {
    formattedCode = await prettierToThrow({ code, toThrow: true });

    if (formattedCode === mod.code) return;
  } catch (error) {
    console.error("Error in runner:", error);
  }

  if (counter === 0) counter = mod.i + 3;
  if (counter < mod.i) return;

  try {
    mod.controller.abort();
    mod.controller = new AbortController();
    const signal = mod.controller.signal;
    if (signal.aborted) return;

    // console.log("Running code", i);

    const transpiled = await transpile({
      code: formattedCode,
      originToUse: location.origin,
    });

    // const App = (await import(createJsBlob(transpiled))).default;

    // let html = '';
    // let htmlConsole = ''
    // const originalConsole = window.console;

    // try{
    //   window.console = {
    //     ...window.console,
    //     log: (...args) => {
    //       // originalConsole.log(...args);
    //       htmlConsole +=  args.join(" ") + "\n";
    //     },
    //     error: (...args) => {
    //       // originalConsole.error(...args);
    //       htmlConsole += args.join(" ") + "\n";
    //     },
    //     warn: (...args) => {
    //       // originalConsole.warn(...args);
    //       htmlConsole += args.join(" ") + "\n";
    //     },
    //     info: (...args) => {
    //       // originalConsole.info(...args);
    //       htmlConsole += args.join(" ") + "\n";
    //     }
    //   };

    //   html = toString(App);
    // } catch (error) {
    //   console.error("Error in runner:", error);
    // }
    // finally {
    //   window.console = originalConsole;
    //   // console.table(htmlConsole);
    //   if (signal.aborted) return;

    // }

    // if (!html || html.includes("ops! Something went wrong")) {
    //   console.error("Error in runner: no html");

    //   return;
    // }

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

    console.log("Sending message iframe first to calculate css");
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

    BC.postMessage(toPost);

    mod.controller.abort();

    console.log("Runner succeeded");
  } catch (error) {
    console.error("Error in runner:", error);
  }
};
