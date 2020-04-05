export const numberStorage = {
  set: (key: string, value: number) => {
    if (chrome.storage) {
      chrome.storage.sync.set({
        [key]: value,
      });
    } else {
      localStorage.setItem(key, value.toString());
    }
  },
  get: async (key: string) => {
    if (chrome.storage) {
      return new Promise<number | null>((resolve) => {
        chrome.storage.sync.get(key, (item) => {
          resolve(item[key] ? Number(item[key]) : null);
        });
      });
    } else {
      console.log("chrome storage get", localStorage.getItem(key));
      return localStorage.getItem(key)
        ? Number(localStorage.getItem(key))
        : null;
    }
  },
};
