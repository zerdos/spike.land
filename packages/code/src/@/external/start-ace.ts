import { edit } from "ace-builds";
import "ace-builds/src-min-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/mode-typescript";
import { prettierToThrow } from "@/lib/shared";

const mod = {
  value: "",
  silent: false,
};

export async function startAce(
  code: string,
  cb: (_code: string) => void,
  container: HTMLDivElement,
) {
  console.log("startAce", { code, cb, container, edit });
  container.style.height = "100vh";

  // it seems the module styles are overwritten by other elements
  // we need to attach it on a shadow container

  const shadowContainer = document.createElement("div");
  shadowContainer.style.height = "100vh";
  container.attachShadow({ mode: "open" });
  container.shadowRoot?.appendChild(shadowContainer);

  // Const {ace} = window;
  const editor = edit(shadowContainer, {
    autoScrollEditorIntoView: false,
    useWorker: true,
    tabSize: 2,
    value: code,
    mode: "ace/mode/typescript",

    copyWithEmptySelection: false,
  });
  editor.setTheme("ace/theme/monokai");

  // editor.session.se;

  editor.session.on("change", () => {
    if (mod.silent) return;

    const value = editor.session.getValue();
    if (mod.value !== value) {
      mod.value = value;
      prettierToThrow({ code: value, toThrow: true }).then(cb);
    }
  });

  return {
    getValue: () => mod.value,
    getErrors: () => Promise.resolve([] as string[]),
    setValue: (code: string) => {
      if (mod.value !== code) {
        mod.silent = true;
        mod.value = code;
        editor.session.setValue(code);
        mod.silent = false;
      }
    },
  };
}
