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
  const store: Record<string, unknown> = {};

  stores.forEach(([key, value]) => {
    Object.assign(store, { [key as string]: value });
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
  private currentStore: Record<string, unknown> = {};

  constructor() {
    console.warn("AsyncStorage constructor");
  }

  getItem = getItem;
  setItem = setItem;
  removeItem = removeItem;
  clear = clear;
  getStore = () => this.currentStore;

  run(
    store: Record<string, unknown>,
    callback: (...args: unknown[]) => unknown,
    ...args: unknown[]
  ): unknown {
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
  getStoreSync() {
    return this.currentStore;
  }
}

export default AsyncLocalStorage;
