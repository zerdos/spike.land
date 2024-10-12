interface GlobalWithLoadedScripts {
  loadedScripts?: Set<string>;
}

const globalWithLoadedScripts = globalThis as GlobalWithLoadedScripts;

const loadedScripts: Set<string> = globalWithLoadedScripts.loadedScripts
  || new Set<string>();
globalWithLoadedScripts.loadedScripts = loadedScripts;

export const lazyLoadScript = (scriptName: string): void => {
  importScripts(`/@/workers/${scriptName}.worker.js`);
};

// If you need to add other global properties, you can do it like this:
// (globalThis).someOtherGlobalProperty = 'value';
