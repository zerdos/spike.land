// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// Object.assign(globalThis, { require });

import { useCodeSpace } from "@/hooks/use-code-space";
import { renderApp } from "@/lib/render-app";
import { main } from "./ws";

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

const codeSpace = useCodeSpace();

(async () => {
  if (
    location.pathname !== `/live/${codeSpace}`
    && location.pathname !== `/live-cms/${codeSpace}`
    && location.pathname.endsWith("dehydrated") === false
  ) {
    const rootElement = (document.getElementById("root")
      || document.getElementById("embed")) as HTMLDivElement;

    const rendered = await renderApp({ codeSpace, rootElement });
    Object.assign(window, { rendered });
  }
  // if (location.pathname.startsWith("/my-cms")) {
  //   window.renderedApp.cleanup();
  //   main();
  // }
})();

if (
  location.pathname.startsWith("/live")
  || location.pathname.startsWith("/live-cms")
) {
  main();
}
