import { useCodeSpace } from "@/hooks/use-code-space";

const codeSpace = useCodeSpace();

export const init = () => {
  if (
    window.location.pathname.endsWith("/iframe")
    || window.location.pathname.endsWith(`/live/${codeSpace}`)
  ) {
    return new Promise((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = location.origin + "/app/tw-global.css";
      link.onload = () => import(location.origin + "/assets/tw-chunk-4a7018.js").then(resolve);
      document.head.appendChild(link);
    });
  }
  return Promise.resolve();
};
