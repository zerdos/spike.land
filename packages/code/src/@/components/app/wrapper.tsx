import type { RenderedApp } from "@/lib/interfaces";
import { renderApp } from "@/lib/render-app";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface WrapperProps {
  codeSpace?: string;
  code?: string;
  transpiled?: string;
  scale?: number;
}

export const Wrapper: React.FC<WrapperProps> = (
  { codeSpace, transpiled, code, scale },
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === undefined) return;
    if (containerRef.current === null) return;

    let rendered: RenderedApp | null;

    (async () => {
      rendered = await renderApp({
        rootElement: containerRef.current!,
        codeSpace,
        transpiled,
        code,
      });
    })().catch(console.error);

    return () => {
      if (rendered !== null && rendered !== undefined) {
        rendered.cleanup();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}
      data-testid="wrapper-container"
      className={cn("w-full h-full")}
    />
  );
};
