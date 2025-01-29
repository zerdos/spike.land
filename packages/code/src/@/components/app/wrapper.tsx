import type { FlexibleComponentType } from "@/lib/interfaces";
import { AppWithScreenSize } from "@/lib/render-app";
import React, { useState } from "react";

interface WrapperProps {
  codeSpace: string;
}

export const Wrapper: React.FC<WrapperProps> = (
  { codeSpace },
) => {
  const [App, setApp] = useState<FlexibleComponentType | null>(null);

  React.useEffect(() => {
    (async () => {
      const App = (await import(`@/live/${codeSpace}/index.js`)).default;
      setApp(App);
    })();
  }, []);
  if (!App) {
    return <iframe src={`/live/${codeSpace}/dehydrated`} className="w-full h-full" />;
  }
  return <AppWithScreenSize AppToRender={App} />;
};
