import { importScript } from "../../code/src/importScript.js";

export const getMonaco = async () => {
  const vsPath = "https://unpkg.com/monaco-editor@0.21.2/min/vs";

  const { require } = await importScript(
    "https://unpkg.com/monaco-editor@0.21.2/min/vs/loader.js",
  );

  require.config({ paths: { "vs": vsPath } });
  const monaco = await new Promise((resolve) =>
    require(["vs/editor/editor.main"], (monaco) => resolve(monaco))
  );
  return monaco;
};

export const isMobile = () => {
  if (typeof window === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent,
  );
};

// import type { monaco } from "https://unpkg.com/monaco-editor@0.21.2/monaco.d.ts";
// import type {Ace} from "https://raw.githubusercontent.com/ajaxorg/ace/master/ace.d.ts";
