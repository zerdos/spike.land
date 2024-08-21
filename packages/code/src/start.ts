import { useCodeSpace } from "./hooks/useCodeSpace";

if (location.pathname.endsWith("embed") === false) {
  setTimeout(() => {
    import("./hydrate");
  }, 0);
}

const codeSpace = useCodeSpace();

if (
  location.pathname !== `/live/${codeSpace}`
  && location.pathname.endsWith("dehydrated") === false
) {
  setTimeout(() => {
    (async () => {
      const rootElement = document.getElementById("root")! as HTMLDivElement;
      const { renderApp } = await import("./Wrapper");
      renderApp({ codeSpace, rootElement });
    })();
  }, 0);
}

setTimeout(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${location.origin}/assets/g-chunk-72a597.css`;

  link.onload = () => {
    import(`${location.origin}/assets/g-chunk-72a597.js`);
  };
  document.head.appendChild(link);
});
