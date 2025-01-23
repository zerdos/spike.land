// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// Object.assign(globalThis, { require });
// import "./tw-dev-setup";

import { getCodeSpace } from "@/hooks/use-code-space";

import "./index.css";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.getRegistrations().then((registrations) => {
//     for (const registration of registrations) {
//       registration.unregister();
//     }
//   });
// }

if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

const codeSpace = getCodeSpace(location.pathname);

(async () => {
  if (
    location.pathname !== `/live/${codeSpace}` &&
    location.pathname !== `/live-cms/${codeSpace}` &&
    location.pathname.endsWith("dehydrated") === false
  ) {
    const renderAppUrl = `/@/workers/render-app.worker.js`;
    const { renderApp } = await import(/* @vite-ignore */ renderAppUrl);

    const rendered = await renderApp({ codeSpace });
    Object.assign(window, { rendered });
  }
  // if (location.pathname.startsWith("/my-cms")) {
  //   window.renderedApp.cleanup();
  //   main();
  // }
})();

if (
  (location.pathname.startsWith("/live") ||
    location.pathname.startsWith("/live-cms")) &&
  location.pathname.endsWith("dehydrated") === false &&
  location.pathname.endsWith("/") === false
) {
  import("./ws").then(({ main }) => main());
}
