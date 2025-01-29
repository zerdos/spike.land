import useWindowSize from "@/hooks/use-window-size";
import type { FlexibleComponentType } from "@/lib/interfaces";
import React, { useState } from "react";

interface WrapperProps {
  codeSpace: string;
}

export const Wrapper: React.FC<WrapperProps> = (
  { codeSpace },
) => {
  const { width, height } = useWindowSize();
  const [App, setApp] = useState<FlexibleComponentType | null>(null);

  React.useEffect(() => {
    (async () => {
      const App = (await import(/* @vite-ignore */ `/live/${codeSpace}/index.js`)).default;
      setApp(App);
    })();
  }, []);

  if (!App) {
    return <iframe src={`/live/${codeSpace}/dehydrated`} className="w-full h-full" />;
  }
  return <App width={width} height={height} />;
};
