import { CacheProvider } from "https://testing.spike.land/emotion.mjs";
import createCache from "https://testing.spike.land/emotionCache.mjs";
import App from "https://testing.spike.land/live/coder/index.js/15960";
import { createRoot } from "https://testing.spike.land/reactDomClient.mjs";
import { ErrorBoundary } from "https://testing.spike.land/reactMod.mjs";

document.body.innerHTML = `<div id="root"><style>.kbkfnfjz-1kgckqf-FutureIsHere{margin:10px;height:calc(100vh - 20px);}
.kbkfnfjz-1oexq7z-FutureIsHere{white-space:pre;font-size:20pt;color:red;height:100%;font-family:"enhanced_dot_digital-7",monospace;}
@font-face{font-family:"enhanced_dot_digital-7";src:url("https://testing.spike.land/enhanced_dot_digital-7.ttf") format("truetype");}
.kbkfnfjz-1oexq7z-FutureIsHere:hover{color:yellow;}
.kbkfnfjz-e0kgzx-FutureIsHere{white-space:pre;line-height:10px;font-size:14px;color:green;height:100%;font-family:"monospace",monospace;}
.kbkfnfjz-e0kgzx-FutureIsHere:.kbkfnfjz-e0kgzx-FutureIsHerehover{color:yellow;}</style><div id="root-coder" data-i="15960" style="height: 100%;"><div id="coder-kbkfnfjz" style="height: 100%;"><section class="kbkfnfjz-1kgckqf-FutureIsHere"><code class="kbkfnfjz-1oexq7z-FutureIsHere"></code><code class="kbkfnfjz-e0kgzx-FutureIsHere"><br>▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ ██ ▄ ▄█ ▄▄▄▄▄ █
█ █   █ █▀ ▀▀██ █   █ █
█ █▄▄▄█ █▄█ ▄ █ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀ ▀ █▄▄▄▄▄▄▄█
█ ▄█▀▀ ▄ █▄▀█ █▀█ ▄▀███
█ █▄▀█ ▄ ▀█▀▄█▄██ ▀▀ ██
█▄▄▄▄▄█▄▄▀▄█▀▀▀ ▀█▄▀▄ █
█ ▄▄▄▄▄ █   ▀ ▀▄ ▀▄▀▄▀█
█ █   █ ██▀▀█ ██▄██▀▄██
█ █▄▄▄█ █▀ ████▄█▀▄ ▄▄█
█▄▄▄▄▄▄▄█▄██▄█▄██▄█▄▄██
</code></section></div></div>`;

let parent = document.getElementById("root");
let rootEl = document.getElementById("root-coder");

// if (!parent) {
//   parent = document.createElement("div");
//   parent.setAttribute("id", "coder-15960");
//   document.body.appendChild(parent);
// }
// parent.style.height="100%";
// parent.innerHTML=`<div id="coder-kbkfnfjz"></div>`;
// const div = document.getElementById("root-coder");
// div.style.height="100%";
const root = createRoot(rootEl);

const cache = createCache({
  key: "kbkfnfjz",
  container: parent,
  speedy: false,
});

cache.compat = undefined;

root.render(
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <div role="alert">
        <div>Oh no</div>
        <pre>{error.message}</pre>
      </div>
    )}
  >
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </ErrorBoundary>,
);
