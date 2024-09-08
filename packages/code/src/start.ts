import { useCodeSpace } from "@/hooks/use-code-space";
import { renderApp } from "@/lib/render-app";

if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

if (location.pathname.endsWith("embed") === false) {
  import("./ws");
}

const codeSpace = useCodeSpace();

if (
  location.pathname !== `/live/${codeSpace}`
  && location.pathname.endsWith("dehydrated") === false
) {
  const rootElement = (document.getElementById("root") || document.getElementById("embed")) as HTMLDivElement;

  let rendered = await renderApp({ codeSpace, rootElement });
  Object.assign(globalThis, { rendered });
}
