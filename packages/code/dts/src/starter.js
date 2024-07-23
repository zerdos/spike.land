import { css } from "@emotion/react";
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { md5 } from "./md5";
import { readFile, stat } from "./memfs";
if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}
export const { apps, eCaches } = globalThis;
const codeSpace = getCodeSpace();
export async function appFactory(transpiled) {
  const indexMjs = (await stat(`/live/${codeSpace}/index.mjs`))
    && await readFile(`/live/${codeSpace}/index.mjs`);
  const trp = indexMjs || transpiled;
  const hash = md5(transpiled);
  try {
    const blobUrl = createJsBlob(trp);
    const App = (await import(blobUrl)).default;
    URL.revokeObjectURL(blobUrl);
    return App;
  } catch (error) {
    return handleAppError(error, hash);
  }
}
function handleAppError(error, hash) {
  const errorMessage = error instanceof SyntaxError
    ? `Syntax Error: ${error.message}`
    : `Error: ${error.message}`;
  console.error(errorMessage, { err: error });
  return () => (_jsxs("div", {
    css: css`background-color: orange;`,
    children: [
      _jsx("h1", { children: errorMessage }),
      _jsx("h2", { children: hash }),
      _jsx("p", { children: JSON.stringify({ err: error }) }),
    ],
  }));
}
function getCodeSpace() {
  return location.pathname.slice(1).split("/")[1];
}
export function createJsBlob(code) {
  return URL.createObjectURL(
    new Blob([code], {
      type: "application/javascript",
    }),
  );
}
export function createHTML(code) {
  return URL.createObjectURL(new Blob([code], { type: "text/html" }));
}
export { md5 };
