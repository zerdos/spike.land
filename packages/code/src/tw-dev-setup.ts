import { useCodeSpace } from "@/hooks/use-code-space";

const codeSpace = useCodeSpace();

export const init = () =>
  setTimeout(() => {
    if (
      window.location.pathname.endsWith("/iframe")
      || window.location.pathname.endsWith(`/live/${codeSpace}`)
    ) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = location.origin + "/app/tw-global.css";
      link.onload = () => import(location.origin + "/assets/tw-chunk-4a7018.js");
      document.head.appendChild(link);
    }
  });
