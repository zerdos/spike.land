import { renderApp } from "@/lib/render-app";
import { useCodeSpace } from "./hooks/useCodeSpace";

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

  renderApp({ codeSpace, rootElement });
}
