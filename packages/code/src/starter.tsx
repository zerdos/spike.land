import type { FC } from "react";

// import { upgradeElement } from "@ampproject/worker-dom/dist/main.mjs";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import createCache from "./emotionCache";
// import { buildT } from "./esbuildEsm";
import { md5 } from "./md5";

Object.assign(globalThis, { md5 });
// const myApps: { [key: string]: FC } = {};
// const myAppCounters: { [key: string]: number } = {};

export { md5 };

if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}

export const { apps, eCaches } = globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
};

export async function appFactory(
  transpiled: string,
): Promise<FC<{ width: number; height: number; top: number; left: number }>> {
  // }

  const trp: string = transpiled;

  const hash = md5(transpiled);

  // if (!apps[hash] || !eCaches[hash]) {
  try {
    // eCaches[hash] = eCaches[hash] ||
    const cache = createCache({
      key: "css",
      speedy: false,
    });

    cache.compat = undefined;

    // if (terminal && terminal.clear) {r
    //   terminal.clear();
    // }

    const App = (await import(createJsBlob(trp)))
      .default;

    return ({ width, height, top, left }) => (
      <CacheProvider key={hash} value={cache}>
        <App
          {...(width ? { width } : { width: window.innerWidth })}
          {...(height ? { height } : { height: window.innerHeight })}
          {...(top ? { top } : { top: 0 })}
          {...(left ? { left } : { left: 0 })}
        />
      </CacheProvider>
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      const name = error.name;
      const message = error.message;
      return () => (
        <div css={css`background-color: orange;`}>
          <h1>Syntax Error</h1>

          <h2>{hash}</h2>
          <h2>{name}: {message}</h2>
          <p>{JSON.stringify({ err: error })}</p>
        </div>
      );
    } else if (error instanceof Error) {
      const name = error.name;
      const message = error.message;

      return () => (
        <div css={css`background-color: orange;`}>
          <h1>Syntax Error</h1>
          <h2>{name}: {message}</h2>
          <p>{JSON.stringify({ err: error })}</p>
        </div>
      );
    }
  }
  return () => (
    <div css={css`background-color: orange;`}>
      <h1>Unknown Error: ${hash}</h1>
    </div>
  );

  // if (transpiled !== "") return apps[hash];
  // }

  // return apps[hash];
}

export function createJsBlob(code: string | Uint8Array) {
  return URL.createObjectURL(
    new Blob([code], {
      type: "application/javascript",
    }),
  );
}

export function createHTML(code: string) {
  return URL.createObjectURL(
    new Blob([code], { type: "text/html" }),
  );
}
