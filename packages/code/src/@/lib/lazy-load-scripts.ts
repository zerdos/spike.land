interface GlobalWithLoadedScripts {
  loadedScripts?: Set<string>;
}

const globalWithLoadedScripts = globalThis as GlobalWithLoadedScripts;

const loadedScripts: Set<string> = globalWithLoadedScripts.loadedScripts || new Set<string>();
globalWithLoadedScripts.loadedScripts = loadedScripts;

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

// If you need to add other global properties, you can do it like this:
// (globalThis as any).someOtherGlobalProperty = 'value';
