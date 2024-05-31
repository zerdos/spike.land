import type { EmotionCache } from "@emotion/cache";
import { css } from "@emotion/react";
import type { FC } from "react";
import { md5 } from "./md5";
import { readFile, stat } from "./memfs";

// Ensure global objects for caching apps and Emotion caches
if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}

export const { apps, eCaches } = globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
};

const codeSpace = getCodeSpace();

/**
 * Factory function to create an application component from transpiled code.
 * @param {string} transpiled - The transpiled code to create the application from.
 * @returns {Promise<FC<{ width: number; height: number; top: number; left: number }>>} The application component.
 */
export async function appFactory(
  transpiled: string,
): Promise<FC<{ width: number; height: number; top: number; left: number }>> {
  const indexMjs = (await stat(`/live/${codeSpace}/index.mjs`))
    && (await readFile(`/live/${codeSpace}/index.mjs`) as string);
  const trp: string = indexMjs || transpiled;
  const hash = md5(transpiled);

  try {
    const blobUrl = createJsBlob(trp);
    const App = (await import(blobUrl)).default;
    URL.revokeObjectURL(blobUrl);
    return App;
  } catch (error) {
    return handleAppError(error as Error, hash);
  }
}

/**
 * Handle errors encountered during application creation.
 * @param {Error} error - The error encountered.
 * @param {string} hash - The hash of the transpiled code.
 * @returns {FC} The error component.
 */
function handleAppError(error: Error, hash: string): FC {
  const errorMessage = error instanceof SyntaxError
    ? `Syntax Error: ${error.message}`
    : `Error: ${error.message}`;

  console.error(errorMessage, { err: error });

  return () => (
    <div css={css`background-color: orange;`}>
      <h1>{errorMessage}</h1>
      <h2>{hash}</h2>
      <p>{JSON.stringify({ err: error })}</p>
    </div>
  );
}

/**
 * Get the code space from the current URL.
 * @returns {string} The code space.
 */
function getCodeSpace(): string {
  return location.pathname.slice(1).split("/")[1];
}

/**
 * Create a JavaScript Blob URL from the given code.
 * @param {string | Uint8Array} code - The code to create the Blob from.
 * @returns {string} The Blob URL.
 */
export function createJsBlob(code: string | Uint8Array): string {
  return URL.createObjectURL(
    new Blob([code], {
      type: "application/javascript",
    }),
  );
}

/**
 * Create an HTML Blob URL from the given code.
 * @param {string} code - The code to create the Blob from.
 * @returns {string} The Blob URL.
 */
export function createHTML(code: string): string {
  return URL.createObjectURL(
    new Blob([code], { type: "text/html" }),
  );
}

export { md5 };
