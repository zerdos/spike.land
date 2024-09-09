import { ClerkProvider } from "@clerk/clerk-react";
import { renderApp } from "@/lib/render-app";
import type { ICode } from "./cSess.interface";
import { Suspense, lazy } from "react";


export const renderPreviewWindow = async (
  { codeSpace, cSess }: { codeSpace: string; cSess: ICode },
) => {

  const App = lazy(() => import("./AppToRender").then((module) => ({ default: module.AppToRender })));



  
const SpikeLansAPP = ()=> <Suspense fallback={
 <iframe src={`/live/${codeSpace}/iframe`} style={{width: "100%", height: "100%"}}></iframe> 
}><ClerkProvider publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ" afterSignOutUrl="/">
<App codeSpace={codeSpace} cSess={cSess} />
</ClerkProvider>
</Suspense>

  return renderApp({ App: SpikeLansAPP, rootElement: document.getElementById("embed") as unknown as HTMLDivElement });
};
