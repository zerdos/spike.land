import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { createRoot } from "./reactDomClient";
const singleton = { started: false };
export const renderPreviewWindow = async ({ codeSpace }) => {
    if (singleton.started)
        return;
    singleton.started = true;
    const rootEl = document.createElement("div");
    rootEl.style.opacity = "0";
    rootEl.style.height = "0px";
    const root = createRoot(rootEl);
    document.getElementById("root").appendChild(rootEl);
    if (sessionStorage.getItem("z") !== null) {
        const { reveal } = await import("./reveal");
        const { EnhancedEmbeddableEditor } = await import("./EmbeddableEditor");
        root.render(_jsx(EnhancedEmbeddableEditor, {}));
        reveal();
        return;
    }
    const { AppToRender } = await import("./AppToRender");
    root.render(_jsx(AppToRender, { codeSpace: codeSpace }));
};
