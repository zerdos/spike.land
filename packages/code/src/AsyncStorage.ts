import {
  clear,
  getAllkeys,
  getItem,
  mergeItem,
  multiGet,
  multiMerge,
  multiRemove,
  multiSet,
  removeItem,
  setItem,
} from "window-async-local-storage";

export const getStore = async () => {
  const keys = (await getAllkeys() as string[]).filter((k) => k);
  const stores = (await multiGet(keys)) as string[];
  const store = {};

  stores.forEach(([key, value]) => {
    Object.assign(store, { [key]: value });
  });
  return store;
};

export {
  clear,
  getAllkeys,
  getItem,
  mergeItem,
  multiGet,
  multiMerge,
  multiRemove,
  multiSet,
  removeItem,
  setItem,
};

export class AsyncLocalStorage {
  private currentStore: any = null;

  constructor() {
    console.log("AsyncStorage constructor");
  }

  getItem = getItem;
  setItem = setItem;
  removeItem = removeItem;
  clear = clear;
  getStore = () => this.currentStore;

  run(store: any, callback: Function, ...args: any[]): any {
    const previousStore = this.currentStore;
    this.currentStore = store;

    try {
      return callback(...args);
    } finally {
      this.currentStore = previousStore;
    }
  }

  // This method mimics the behavior of asyncLocalStorage.getStore()
  // in the Node.js implementation
  getStoreSync(): any {
    return this.currentStore;
  }
}

export default AsyncLocalStorage;
