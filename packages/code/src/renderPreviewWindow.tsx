
import { createRoot } from "./reactDomClient";
import { AppToRender } from "./AppToRender";



const singleton = { started: false };

export const renderPreviewWindow = async (
  { codeSpace }: { codeSpace: string },
) => {
  if (singleton.started) return;
  singleton.started = true;

  const rootEl = document.createElement("div");
  rootEl.style.opacity = "0";
  rootEl.style.height = "0px";

  const root = createRoot(rootEl);
  document.getElementById("root")!.appendChild(rootEl);
  

  root.render(<AppToRender codeSpace={codeSpace} />);
};
