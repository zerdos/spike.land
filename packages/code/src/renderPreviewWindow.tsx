
import { ClerkProvider } from '@clerk/clerk-react'
import { AppToRender } from "./AppToRender";
import { createRoot } from "./reactDomClient";
// import {EmbeddableEditor} from "./EmbeddableEditor";

const singleton = { started: false };

export const renderPreviewWindow = async (
  { codeSpace }: { codeSpace: string },
) => {
  addCSSFile("/hydrate.css");
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

  const PUBLISHABLE_KEY="pk_test_ZmVhc2libGUtd2FscnVzLTM3LmNsZXJrLmFjY291bnRzLmRldiQ"

  // const { AppToRender } = await import("./AppToRender");
  root.render(<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <AppToRender codeSpace={codeSpace} />
  </ClerkProvider>);
};

function addCSSFile(filename: string) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = filename;
  document.head.appendChild(link);
}
