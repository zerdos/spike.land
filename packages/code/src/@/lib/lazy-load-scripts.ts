const loadedScripts: Set<string> = globalThis.loadedScripts || new Set<string>();
globalThis.loadedScripts = loadedScripts;

export const lazyLoadScript = (scriptName: string): void => {
  if (!loadedScripts.has(scriptName)) {
    try {
      importScripts(`/@/workers/${scriptName}.worker.js`);
      loadedScripts.add(scriptName);
    } catch (error) {
      console.error(`Error loading script ${scriptName}:`, error);
      throw error;
    }
  }
};
