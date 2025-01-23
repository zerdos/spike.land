import type { ICode } from "@/lib/interfaces";

export const renderPreviewWindow = async (
  { codeSpace, cSess }: { codeSpace: string; cSess: ICode; },
) => {
  //   import { renderApp } from "@/lib/render-app";
  // import { ClerkProvider } from "@clerk/clerk-react";
  // import { AppToRender } from "./AppToRender";

  const renderAppPromise = import("@/lib/render-app");
  const ClerkProviderPromise = import("@clerk/clerk-react");
  const AppToRenderPromise = import("./AppToRender");

  const [
    { renderApp },
    { ClerkProvider },
    { AppToRender },
  ] = await Promise.all([renderAppPromise, ClerkProviderPromise, AppToRenderPromise]);

  const App = () => (
    <ClerkProvider
      publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ"
      afterSignOutUrl="/"
    >
      <AppToRender codeSpace={codeSpace} cSess={cSess} />
    </ClerkProvider>
  );

  return renderApp({ App });
};
