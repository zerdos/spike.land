
import { createRoot } from "./reactDomClient";
// import { AppToRender } from "./AppToRender";
// import {EmbeddableEditor} from "./EmbeddableEditor";

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

  if (sessionStorage.getItem("z") !== null) {
    const { reveal } = await import("./reveal");
    const { EmbeddableEditor } = await import("./EmbeddableEditor");

    root.render(<EmbeddableEditor />);
    reveal();
    return;
  }

  const { AppToRender } = await import("./AppToRender");
  root.render(<AppToRender codeSpace={codeSpace} />);
};
