import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";

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

  const PUBLISHABLE_KEY = "pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ";
  const { AppToRender } = await import("./AppToRender");

  root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppToRender codeSpace={codeSpace} />
    </ClerkProvider>,
  );
};
