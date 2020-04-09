const isChromeExtension = () => {
  try {
    return chrome && chrome.storage;
  } catch (_e) {
    return false;
  }
};

export const numberStorage = {
  set: (key: string, value: number) => {
    if (isChromeExtension()) {
      chrome.storage.sync.set({
        [key]: value,
      });
    } else {
      localStorage.setItem(key, value.toString());
    }
  },
  get: async (key: string) => {
    if (isChromeExtension()) {
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
