// import { md5 } from "./md5";
// import { createJsBlob } from "starter";
import { unmountComponentAtNode } from "react-dom";
import { hydrate } from "./hydrate";
import load from "./load";

const paths = location.pathname.split("/");
const codeSpace = paths[2];

const rootEl = document.getElementById(`root`)!;

if (location.pathname !== `/live/${codeSpace}`) {
  const bc = new BroadcastChannel(location.origin);
  hydrate(codeSpace, 1);
  bc.onmessage = async (event) => {
    if (event.data.codeSpace === codeSpace) {
      const { html, css, i } = event.data.sess;
      rootEl.setAttribute("data-i", i);
      unmountComponentAtNode(document.getElementById("root")!);
      rootEl.innerHTML = `<style>${css}</style>${html}`;
      await hydrate(codeSpace, event.data.sess.i);
    }
  };
} else {
  load();
}
