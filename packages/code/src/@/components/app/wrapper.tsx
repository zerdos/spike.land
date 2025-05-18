import type { RenderedApp } from "@/lib/interfaces";
import { renderApp } from "@/lib/render-app";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface WrapperProps {
  codeSpace?: string;
  code?: string;
  transpiled?: string;
  scale?: number;
  className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  codeSpace,
  transpiled,
  code,
  scale,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<Error | null>(null);
  const renderedAppRef = useRef<RenderedApp | null>(null);

  useEffect(() => {
    // Skip if the container ref is not available
    if (!containerRef.current) return;

    let isMounted = true;
    
    const renderContent = async () => {
      try {
        // Clean up previous render if it exists
        if (renderedAppRef.current) {
          renderedAppRef.current.cleanup();
          renderedAppRef.current = null;
        }

        // Render the new app
        const rendered = await renderApp({
          rootElement: containerRef.current!,
          codeSpace,
          transpiled,
          code,
        });

        // Only update state if the component is still mounted
        if (isMounted) {
          renderedAppRef.current = rendered;
        } else if (rendered) {
          // Clean up if component was unmounted during async operation
          rendered.cleanup();
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to render app:", err);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      }
    };

    renderContent();

    // Cleanup function
    return () => {
      isMounted = false;
      if (renderedAppRef.current) {
        renderedAppRef.current.cleanup();
        renderedAppRef.current = null;
      }
    };
  }, [codeSpace, transpiled, code]); // Add dependencies to ensure re-rendering when props change

  // Calculate style based on scale prop
  const containerStyle = scale 
    ? { transform: `scale(${scale})`, transformOrigin: "0 0" } 
    : undefined;

  return (
    <>
      {error && (
        <div className="text-red-500 p-4 border border-red-300 rounded mb-4">
          <h3 className="font-bold">Render Error</h3>
          <p>{error.message}</p>
        </div>
      )}
      <div
        ref={containerRef}
        style={containerStyle}
        data-testid="wrapper-container"
        className={cn("w-full h-full", className)}
      />
    </>
  );
};