import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
export { md5 } from "./md5";

export const hydrate = async (codeSpace: string, i: number) => {
  const App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;

  hydrateRoot(
    document.getElementById(codeSpace + `-css`)!,
    <StrictMode>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div role="alert">
            <div>Oh n o</div>
            <pre>{error.message}</pre>
          </div>
        )}
      >
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
};
