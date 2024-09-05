import type { RenderedApp } from "@/lib/interfaces";
import { renderApp } from "@/lib/render-app";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const renderedAPPS = new Map<HTMLElement, RenderedApp>();

interface WrapperProps {
  codeSpace?: string;
  code?: string;
  transpiled?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ codeSpace, transpiled, code }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === undefined) return;
    if (containerRef.current === null) return;

    let rendered: RenderedApp | null;

    (async () => rendered = await renderApp({ rootElement: containerRef.current!, codeSpace, transpiled, code }))();

    return () => {
      rendered && rendered.cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="wrapper-container"
      className={cn("w-full h-full")}
    />
  );
};
