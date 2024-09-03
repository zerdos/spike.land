import { useCodeSpace } from "./hooks/useCodeSpace";

if (location.pathname.endsWith("embed") === false) {
  setTimeout(() => {
    import("./ws");
  }, 0);
}

const codeSpace = useCodeSpace();

if (
  location.pathname !== `/live/${codeSpace}`
  && location.pathname.endsWith("dehydrated") === false
) {
  setTimeout(() => {
    (async () => {
      const rootElement = (document.getElementById("root") || document.getElementById("embed")) as HTMLDivElement;
      const { renderApp } = await import("@/components/app/wrapper");
      renderApp({ codeSpace, rootElement });
    })();
  }, 0);
}
