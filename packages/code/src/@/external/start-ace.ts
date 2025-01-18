// xxxxxxxxx

// If you're bundling CSS files via a build tool (e.g. Webpack or Vite),
// you can import them as strings:
import baseAceCss from "ace-builds/src-min-noconflict/ace.css";
import monokaiThemeCss from "ace-builds/src-min-noconflict/theme-monokai.css";

import { edit } from "ace-builds";
// Pull in the TypeScript mode so Ace recognizes TS syntax
import "ace-builds/src-min-noconflict/mode-typescript";

// xxxxxxxxx
import { prettierToThrow } from "@/lib/shared";

const mod = {
  value: "",
  silent: false,
};

export async function startAce(
  code,
  cb,
  container,
) {
  container.style.height = "100vh";

  // Create the Shadow Root
  const shadowRoot = container.attachShadow({ mode: "open" });

  // Inject required Ace CSS into the shadow root
  const styleEl = document.createElement("style");
  styleEl.textContent = `${baseAceCss}\n${monokaiThemeCss}`;
  shadowRoot.appendChild(styleEl);

  // Create an inner container that Ace will mount on
  const shadowContainer = document.createElement("div");
  shadowContainer.style.width = "100%";
  shadowContainer.style.height = "100vh";
  shadowRoot.appendChild(shadowContainer);

  // Initialize Ace
  const editor = edit(shadowContainer, {
    mode: "ace/mode/typescript",
    theme: "ace/theme/monokai",
    autoScrollEditorIntoView: false,
    copyWithEmptySelection: false,
    tabSize: 2,
    useWorker: true,
    value: code,
  });

  // Listen for changes
  editor.session.on("change", () => {
    if (mod.silent) return;
    const value = editor.session.getValue();
    if (mod.value !== value) {
      mod.value = value;
      prettierToThrow({ code: value, toThrow: true }).then(cb);
    }
  });

  // Basic methods for external use
  return {
    getValue: () => mod.value,
    getErrors: () => Promise.resolve([]),
    setValue: newCode => {
      if (mod.value !== newCode) {
        mod.silent = true;
        mod.value = newCode;
        editor.session.setValue(newCode);
        mod.silent = false;
      }
    },
  };
}
