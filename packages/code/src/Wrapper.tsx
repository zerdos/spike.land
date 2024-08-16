import createCache from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import { ParentSize } from "@visx/responsive";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AppRenderer } from "./components/AppRenderer";
import ErrorBoundary from "./components/ErrorBoundary";
import { transpile } from "./shared";

export const useTranspile = (code: string) => {
  const [transpiled, setTranspiled] = useState<string | null>(null);

  const doTranspile = useCallback(async () => {
    try {
      const result = await transpile({
        code,
        originToUse: window.location.origin,
      });
      setTranspiled(result);
    } catch (error) {
      console.error("Transpilation error:", error);
      setTranspiled(null);
    }
  }, [code]);

  useEffect(() => {
    doTranspile();
  }, [doTranspile]);

  return transpiled;
};

interface WrapperProps {
  codeSpace?: string;
  code?: string;
  transpiled?: string;
  scale?: number;
}

export const Wrapper: React.FC<WrapperProps> = React.memo(
  ({ code, codeSpace, transpiled: providedTranspiled, scale = 1 }) => {
    if (codeSpace) {
      return (
        <iframe
          css={css`
          height: ${100 / scale}%;
          width: ${100 / scale}%;
          border: 0;
          overflow: 'scroll';
          -webkit-overflow-scrolling: touch;
        `}
          src={`/live/${codeSpace}/embed`}
        />
      );
    }

    let transpiledCode = providedTranspiled;

    if (!transpiledCode && code) {
      transpiledCode = useTranspile(code || "")!;
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<Root | null>(null);

    const cssCache = useMemo(() => createCache({ key: "css", speedy: false }), []);

    const renderApp = useCallback(() => {
      if (!rootRef.current || !transpiledCode) return;

      rootRef.current.render(
        <ErrorBoundary>
          <CacheProvider value={cssCache}>
            <ParentSize>
              {(props) => <AppRenderer transpiled={transpiledCode} {...props} />}
            </ParentSize>
          </CacheProvider>
        </ErrorBoundary>,
      );
    }, [transpiledCode, cssCache]);

    useEffect(() => {
      if (!containerRef.current || !transpiledCode) return;

      if (!rootRef.current) {
        rootRef.current = createRoot(containerRef.current);
      }

      renderApp();

      return () => {
        setTimeout(() => {
          rootRef.current?.unmount();
          rootRef.current = null;
        }, 0);
      };
    }, [transpiledCode, renderApp]);

    return (
      <div
        ref={containerRef}
        css={css`
        width: 100%; 
        height: 100%;
      `}
        data-testid="wrapper-container"
      />
    );
  },
);
