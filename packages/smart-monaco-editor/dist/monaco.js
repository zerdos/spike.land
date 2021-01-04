import { importScript } from "./importScript.js";
export const getMonaco = async () => {
    const vsPath = "https://unpkg.com/monaco-editor@0.21.2/min/vs";
    const { require } = await importScript("https://unpkg.com/monaco-editor@0.21.2/min/vs/loader.js");
    require.config({ paths: { "vs": vsPath } });
    const monaco = await new Promise((resolve) => require(["vs/editor/editor.main"], (_m) => resolve(_m)));
    return monaco;
};
