import { importScript } from "../../importScript.js";

export const getMonaco = async () => {
  const vsPath = `${window.location.href}../monaco-editor/min/vs`;

  const { require } = await importScript(
    `${vsPath}/loader.js`,
  );

  require.config({ paths: { "vs": vsPath } });
  const monaco = await new Promise((resolve) =>
    require(["vs/editor/editor.main"], (_m) => resolve(_m))
  );
  return monaco;
};
