import { ClerkProvider } from "@clerk/clerk-react";
import { renderApp } from "@/lib/render-app";
import type { ICode } from "@/lib/interfaces";
import { Suspense, lazy } from "react";


export const renderPreviewWindow = async (
  { codeSpace, cSess }: { codeSpace: string; cSess: ICode },
) => {


  const LazyAppToRender = lazy(() => import("./AppToRender").then((module) => ({ default: module.AppToRender })));



  
const App = ()=> 
<ClerkProvider publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ" afterSignOutUrl="/">
<Suspense fallback={
 <iframe src={`/live/${codeSpace}/iframe`} style={{width: "100%", height: "100dvh"}}></iframe> 
}><LazyAppToRender codeSpace={codeSpace} cSess={cSess} />
</Suspense>
</ClerkProvider>

  return renderApp({ App });
};
