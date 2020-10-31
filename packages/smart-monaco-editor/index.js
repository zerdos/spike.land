const version="6.4.1";

export const importSpecificVersion = (version) => Function(`return import("https://unpkg.com/smart-monaco-editor${version}/lib/editor.js")`);
export const mod = importSpecificVersion(version);