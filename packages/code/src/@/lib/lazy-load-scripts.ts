const loadedScripts: Set<string> = new Set();

export function lazyLoadScript(script: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (loadedScripts.has(script)) {
      resolve();
      return;
    }

    try {
      importScripts(`/@/workers/${script}.worker.js`);
      loadedScripts.add(script);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
