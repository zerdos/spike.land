import { useCodeSpace } from "./hooks/useCodeSpace";

if (location.pathname.endsWith("iframe") === false) import("./hydrate");

const codeSpace = useCodeSpace();

if (location.pathname !== `/live/${codeSpace}` && location.pathname.endsWith("dehydrated") === false) {
  const rootElement = document.getElementById("root")! as HTMLDivElement;
  const { renderApp } = await import("./Wrapper");
  renderApp({ codeSpace, rootElement });
}
