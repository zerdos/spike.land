import React, { useMemo } from "react";

interface AppRendererProps {
  transpiled: string;
  width: number;
  height: number;
  top: number;
  left: number;
}

export const AppRenderer: React.FC<AppRendererProps> = React.memo(
  ({ transpiled, width, height, top, left }) => {
    const AppToRender = useMemo(() => (
      React.lazy(() => import(createJsBlob(transpiled)))
    ), [transpiled]);

    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppToRender
          width={width || window.innerWidth}
          height={height || window.innerHeight}
          top={top || 0}
          left={left || 0}
        />
      </React.Suspense>
    );
  },
);
