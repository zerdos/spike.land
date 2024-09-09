import { ClerkProvider } from "@clerk/clerk-react";
import { renderApp } from "@/lib/render-app";
import type { ICode } from "./cSess.interface";
import { Suspense, lazy } from "react";


export const renderPreviewWindow = async (
  { codeSpace, cSess }: { codeSpace: string; cSess: ICode },
) => {
const rootElement =   document.getElementById("embed") as HTMLDivElement;
rootElement.id = "root";

  const LazyAppToRender = lazy(() => import("./AppToRender").then((module) => ({ default: module.AppToRender })));



  
const App = ()=> 
<ClerkProvider publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ" afterSignOutUrl="/">
<Suspense fallback={
 <iframe src={`/live/${codeSpace}/iframe`} style={{width: "100%", height: "100vh"}}></iframe> 
}><LazyAppToRender codeSpace={codeSpace} cSess={cSess} />
</Suspense>
</ClerkProvider>

  return renderApp({ App, rootElement });
};
