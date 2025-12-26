import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";
import { createRoot, type Root } from "react-dom/client";

import { AIBuildingOverlay } from "@/components/app/ai-building-overlay";
import ErrorBoundary from "@/components/app/error-boundary";
import { ThemeProvider as CustomThemeProvider } from "@/components/ui/theme-provider";
import { getCodeSpace } from "@/hooks/use-code-space";
import useWindowSize from "@/hooks/use-window-size";
import { importMapReplace } from "@/lib/importmap-utils";
import type { FlexibleComponentType, IRenderApp, RenderedApp } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { transpile } from "@/lib/shared";
import { tryCatch } from "@/lib/try-catch";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const htmlDecode = (input: string) => {
  return input
    .split("><").join(">\n<")
    .replace(/&/g, "&")
    .replace(/>/g, ">")
    .replace(/</g, "<")
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/&nbsp;/g, " ");
};

const toHtmlAndCss = async (
  renderedNew: RenderedApp | null,
): Promise<{ css: string; html: string }> => {
  {
    if (renderedNew === null) {
      return {
        css: "",
        html: "",
      };
    }

    const { cssCache, rootElement } = renderedNew;

    const html = rootElement
      ? htmlDecode(rootElement.innerHTML).split(cssCache.key)
        .join("x")
      : "";

    const { data: emotionGlobalStylesData, error: emotionGlobalStylesError } = await tryCatch(
      Promise.resolve(
        Array.from(document.querySelectorAll<HTMLStyleElement>(
          `style[data-emotion='${cssCache.key}-global']`,
        )),
      ),
    );

    if (emotionGlobalStylesError) {
      console.error(
        "Error getting emotion global styles:",
        emotionGlobalStylesError,
      );
      return { css: "", html };
    }

    const emotionGlobalStyles = emotionGlobalStylesData.map(
      (x) =>
        (Array.from(x.sheet!.cssRules).map((rule: CSSRule) => rule.cssText))
          .join("\n"),
    );

    const emotionStyles = [
      ...emotionGlobalStyles,
      ...[...cssCache.sheet.tags].map((
        tag: HTMLStyleElement,
      ) => (Array.from(tag.sheet!.cssRules!).map((rule: CSSRule) => rule.cssText))).flat(),
    ].join("\n")
      .split(cssCache.key).join("x");

    const { data: tailwindStyles, error: tailwindStylesError } = await tryCatch(
      Promise.resolve(
        Array.from(document.querySelectorAll<HTMLStyleElement>("head > style")),
      ),
    );

    if (tailwindStylesError) {
      console.error("Error getting tailwind styles:", tailwindStylesError);
      return { css: emotionStyles, html };
    }

    const tailWindClasses = tailwindStyles.map(
      (z) => z.innerHTML,
    ).join("\n");

    const tailWindClassesXWithoutComments = tailWindClasses.replace(
      /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,
      "",
    );
    const tailWindClassesX = tailWindClassesXWithoutComments.split(`\\\\[`)
      .join(`\\[`).split(
        `\\\\]`,
      ).join(`\\]`);

    const cssStrings = [emotionStyles, tailWindClassesX].join("\n");

    return {
      css: cssStrings,
      html,
    };
  }
};

type GlobalWithRenderedApps = typeof globalThis & {
  renderedApps: WeakMap<HTMLElement, RenderedApp>;
};

const renderedApps = (globalThis as GlobalWithRenderedApps).renderedApps =
  (globalThis as GlobalWithRenderedApps).renderedApps ||
  new WeakMap<HTMLElement, RenderedApp>();

let firstRender = true;
const origin = typeof location !== "undefined" ? location.origin : "";

export function AppWithScreenSize(
  { AppToRender }: { AppToRender: FlexibleComponentType },
) {
  const { width = 0, height = 0 } = useWindowSize();

  if (!AppToRender) {
    console.error("AppToRender is undefined in AppWithScreenSize");
    return <div>Error: Component could not be loaded</div>;
  }

  return <AppToRender width={width} height={height} />;
}

export const importFromString = async (code: string) => {
  const codeSpace = getCodeSpace(
    typeof location !== "undefined" ? location.pathname : "",
  );

  const isBrowser = typeof window !== "undefined" &&
    typeof URL !== "undefined" &&
    typeof Blob !== "undefined";

  if (isBrowser) {
    const createJsBlob = async (code: string): Promise<string> =>
      await URL.createObjectURL(
        new Blob([
          importMapReplace(code.split("importMapReplace").join("")).split(
            `from "/`,
          ).join(
            `from "${origin}/`,
          ),
        ], { type: "application/javascript" }),
      );

    const { data: blobUrl, error: blobError } = await tryCatch(
      createJsBlob(code),
    );

    if (blobUrl) {
      const { data: module, error: importError } = await tryCatch(
        import(/* @vite-ignore */ blobUrl),
      );

      if (module) {
        return module.default as FlexibleComponentType;
      } else if (importError) {
        // Blob URL import failed, will try file-based approach
      }
    } else if (blobError) {
      // Failed to create blob URL, will try file-based approach
    }
  }

  // For Node.js test environment, return a mock component directly
  if (!isBrowser) {
    return (() =>
      React.createElement(
        "div",
        null,
        "Mock Component for Testing",
      )) as FlexibleComponentType;
  }

  // File-based approach (only for browser environment)
  const filePath = `/live-cms/${codeSpace || "test-space"}-${md5(code)}.mjs`;

  const { error: fetchError } = await tryCatch(
    fetch(filePath, {
      method: "PUT",
      headers: {
        "Content-Type": "text/javascript",
      },
      body: importMapReplace(code),
    }),
  );

  if (fetchError) {
    console.error("Failed to write file", fetchError);
    return (() =>
      React.createElement(
        "div",
        null,
        "Import Error: Failed to write component file",
      )) as FlexibleComponentType;
  }

  const { data: module, error: importError } = await tryCatch(
    import(
      /* @vite-ignore */ filePath
    ),
  );

  if (module) {
    return module.default as FlexibleComponentType;
  } else {
    console.error("All import methods failed", importError);
    return (() =>
      React.createElement(
        "div",
        null,
        "Import Error: Component could not be loaded",
      )) as FlexibleComponentType;
  }
};

function _determineEnvironment(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

async function _handleTestEnvironment(
  { App, transpiled, code }: Pick<IRenderApp, "App" | "transpiled" | "code">,
): Promise<RenderedApp> {
  const mockElement = {} as unknown as HTMLDivElement;

  if (App) {
    return {
      rootElement: mockElement,
      toHtmlAndCss,
      rRoot: { unmount: () => {} } as Root,
      App,
      cssCache: { sheet: { flush: () => {} } } as ReturnType<
        typeof createCache
      >,
      cleanup: () => {},
    };
  }

  let AppToRender: FlexibleComponentType | undefined;
  let importError: Error | undefined;
  try {
    const result = await tryCatch(
      importFromString(
        transpiled || code ||
          "export default ()=><div>Mock App for Testing</div>",
      ),
    );
    AppToRender = result.data as FlexibleComponentType | undefined;
    importError = result.error ?? undefined;
  } catch (e) {
    importError = e instanceof Error ? e : new Error(String(e));
    console.error(
      "Exception during importFromString in test env:",
      importError,
    );
  }

  if (importError || !AppToRender) {
    console.error(
      "Error importing component in test environment, using fallback.",
      importError ? `Error: ${importError.message}` : "No component returned.",
    );
    AppToRender = (() =>
      React.createElement(
        "div",
        null,
        "Test Fallback Error Component",
      )) as FlexibleComponentType;
  }

  return {
    rootElement: mockElement,
    toHtmlAndCss,
    rRoot: { unmount: () => {} } as Root,
    App: AppToRender,
    cssCache: { sheet: { flush: () => {} } } as ReturnType<typeof createCache>,
    cleanup: () => {},
  };
}

function _setupBrowserDOM(rootElementProp?: HTMLDivElement): HTMLDivElement {
  const rootEl = rootElementProp ||
    document.getElementById("embed") as HTMLDivElement ||
    document.createElement("div");
  if (!document.body.contains(rootEl)) {
    document.body.appendChild(rootEl);
  }
  return rootEl;
}

function FallbackErrorComponent() {
  return <div>Error: Component could not be loaded</div>;
}

async function _loadAppComponent(
  { codeSpace, transpiled, App, code }: IRenderApp,
  currentOrigin: string,
): Promise<{ AppToRender: FlexibleComponentType; emptyApp: boolean }> {
  let AppToRender: FlexibleComponentType | undefined;
  let emptyApp = false;

  if (App) {
    AppToRender = App;
  } else if (codeSpace && !transpiled && !code) {
    AppToRender = (await import(
      /* @vite-ignore */
      `${currentOrigin}/live/${codeSpace}/index.js`
    ))
      .default as FlexibleComponentType;
  } else if (transpiled || code) {
    if (
      transpiled?.indexOf("stdin_default") === -1 &&
      code?.indexOf("as default") === -1
    ) {
      emptyApp = true;
      const { data: emptyAppComponent, error: importError } = await tryCatch(
        importFromString("export default ()=><div>Empty App</div>"),
      );
      AppToRender = importError || !emptyAppComponent
        ? FallbackErrorComponent
        : emptyAppComponent;
    } else {
      let codeToUse = transpiled;
      if (!codeToUse && code) {
        const { data: transpiledCode, error: transpileError } = await tryCatch(
          transpile({ code, originToUse: currentOrigin }),
        );
        codeToUse = transpileError
          ? "export default ()=><div>Error: Failed to transpile code</div>"
          : transpiledCode;
      } else if (!codeToUse) {
        codeToUse = "export default ()=><div>Error: No code provided</div>";
      }
      const { data: appComponent, error: importError } = await tryCatch(
        importFromString(codeToUse!),
      );
      AppToRender = importError || !appComponent
        ? FallbackErrorComponent
        : appComponent;
    }
  } else if (codeSpace) {
    const indexJs = `${currentOrigin}/live/${codeSpace}/index.js`;
    const { data: response, error: fetchError } = await tryCatch(
      fetch(indexJs),
    );
    if (fetchError || !response || !response.ok) {
      const { data: mockApp } = await tryCatch(
        importFromString(
          "export default ()=><div>Mock App (fetch error)</div>",
        ),
      );
      AppToRender = mockApp || FallbackErrorComponent;
    } else {
      const { data: codeToUse, error: textError } = await tryCatch(
        response.text(),
      );
      if (textError || !codeToUse) {
        AppToRender = FallbackErrorComponent;
      } else {
        const { data: appComponent } = await tryCatch(
          importFromString(codeToUse),
        );
        AppToRender = appComponent || FallbackErrorComponent;
      }
    }
  } else {
    console.error(
      "renderApp: No valid parameters provided. Using ultimate fallback.",
    );
    const { data: mockApp } = await tryCatch(
      importFromString("export default ()=><div>Ultimate Fallback App</div>"),
    );
    AppToRender = mockApp || FallbackErrorComponent;
  }
  return { AppToRender: AppToRender || FallbackErrorComponent, emptyApp };
}

interface PerformReactRenderParams {
  rootEl: HTMLDivElement;
  reactRoot: Root;
  AppToRender: FlexibleComponentType;
  cssCache: ReturnType<typeof createCache>;
  codeSpace: string | undefined;
  emptyApp: boolean;
  cleanupFn: () => void;
}

function _performReactRender({
  rootEl,
  reactRoot,
  AppToRender,
  cssCache,
  codeSpace,
  emptyApp,
  cleanupFn,
}: PerformReactRenderParams): RenderedApp {
  try {
    reactRoot.render(
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="darkMode"
      >
        <CustomThemeProvider>
          <React.Fragment>
            <CacheProvider value={cssCache}>
              {emptyApp
                ? <AppToRender />
                : (
                  <ErrorBoundary {...(codeSpace ? { codeSpace } : {})}>
                    <AppWithScreenSize AppToRender={AppToRender} />
                  </ErrorBoundary>
                )}
            </CacheProvider>{" "}
            {codeSpace && <AIBuildingOverlay codeSpace={codeSpace} />}
          </React.Fragment>
        </CustomThemeProvider>
      </NextThemesProvider>,
    );
    const newRenderedApp = {
      rootElement: rootEl,
      rRoot: reactRoot,
      App: AppToRender,
      cssCache,
      toHtmlAndCss,
      cleanup: cleanupFn,
    };
    renderedApps.set(rootEl, newRenderedApp);
    return newRenderedApp;
  } catch (renderError) {
    console.error("Error during React render:", renderError);
    const FallbackApp = FallbackErrorComponent;
    try {
      reactRoot.render(<FallbackErrorComponent />);
    } catch (fallbackRenderError) {
      console.error(
        "Error rendering FallbackErrorComponent:",
        fallbackRenderError,
      );
    }
    const errorRenderedApp = {
      rootElement: rootEl,
      rRoot: reactRoot,
      App: FallbackApp,
      cssCache,
      toHtmlAndCss,
      cleanup: cleanupFn,
    };
    renderedApps.set(rootEl, errorRenderedApp);
    return errorRenderedApp;
  }
}

async function renderApp(
  props: IRenderApp,
): Promise<RenderedApp> {
  const { rootElement, codeSpace, transpiled, App, code, root } = props;

  if (!_determineEnvironment()) {
    return _handleTestEnvironment({ App, transpiled, code });
  }

  const rootEl = _setupBrowserDOM(rootElement);

  const { AppToRender, emptyApp } = await _loadAppComponent(props, origin);

  const myReactRoot = root || renderedApps.get(rootEl)?.rRoot ||
    createRoot(rootEl);

  const cacheKey = md5(transpiled || code || Math.random().toString())
    .toLocaleLowerCase().replace(
      /[0-9]/g,
      "",
    );
  const parentNode = rootEl.parentNode;

  const cssCache = createCache({
    key: firstRender ? "x" : cacheKey,
    speedy: true,
    container: parentNode || document.body,
  });
  firstRender = false;

  const cleanupFn = () => {
    requestAnimationFrame(() => {
      try {
        myReactRoot.unmount();
      } catch (e) {
        console.error("Error during cleanup unmount:", e);
      }
      if (cssCache.sheet) {
        try {
          cssCache.sheet.flush();
        } catch (e) {
          console.error("Error during cleanup flush:", e);
        }
      }
      try {
        rootEl.remove();
      } catch (e) {
        console.error("Error during cleanup remove:", e);
      }
      renderedApps.delete(rootEl);
    });
  };

  let currentRenderedApp = renderedApps.get(rootEl);

  if (!currentRenderedApp) {
    currentRenderedApp = _performReactRender({
      rootEl,
      reactRoot: myReactRoot,
      AppToRender,
      cssCache,
      codeSpace,
      emptyApp,
      cleanupFn,
    });
  } else {
    currentRenderedApp = _performReactRender({
      rootEl,
      reactRoot: currentRenderedApp.rRoot,
      AppToRender,
      cssCache,
      codeSpace,
      emptyApp,
      cleanupFn,
    });
  }

  return currentRenderedApp;
}

export { renderApp };
