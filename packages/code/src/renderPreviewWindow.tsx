import { ClerkProvider } from "@/external/clerk";
import type { ICode } from "@/lib/interfaces";
import { renderApp } from "@/lib/render-app";
import { AppToRender } from "./AppToRender";

export const renderPreviewWindow = async (
  { codeSpace, cSess }: { codeSpace: string; cSess: ICode; },
) => {
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
