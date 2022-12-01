import { CacheProvider } from "https://testing.spike.land/emotion.mjs";
import createCache from "https://testing.spike.land/emotionCache.mjs";
import App from "https://testing.spike.land/live/rca/index.js/7767";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

let parent = document.getElementById("rca-7767");

if (!parent) {
  parent = document.createElement("div");
  parent.setAttribute("id", "rca-7767");
  document.body.appendChild(parent);
}
parent.style.height = "100%";
parent.innerHTML = `<div id="rca-bbxnnjbo"></div>`;
const div = document.getElementById("rca-bbxnnjbo");
div.style.height = "100%";
const root = createRoot(div);

const cache = createCache({
  key: "bbxnnjbo",
  container: parent,
  speedy: false,
});

cache.compat = undefined;

root.render(
  <div>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </div>,
);
