import { useCallback, useEffect, useMemo, useState } from "react";

interface StorageBackend<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
}

class LocalStorageBackend<T> implements StorageBackend<T> {
  async get(key: string): Promise<T | null> {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

class IndexedDBBackend<T> implements StorageBackend<T> {
  private dbName = "SyncedStorageDB";
  private storeName = "keyvaluepairs";
  private dbPromise: Promise<IDBDatabase> | null = null;

  private openDB(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          db.createObjectStore(this.storeName, { keyPath: "key" });
        };
      });
    }
    return this.dbPromise;
  }

  async get(key: string): Promise<T | null> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result ? request.result.value : null);
    });
  }

  async set(key: string, value: T): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.put({ key, value });
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

const storageBackendSingleton: { instance: StorageBackend<any> | null } = { instance: null };

function getStorageBackend<T>(): StorageBackend<T> {
  if (!storageBackendSingleton.instance) {
    if (typeof window !== "undefined" && "localStorage" in window) {
      storageBackendSingleton.instance = new LocalStorageBackend<T>();
    } else if (typeof indexedDB !== "undefined") {
      storageBackendSingleton.instance = new IndexedDBBackend<T>();
    } else {
      throw new Error("No suitable storage backend available");
    }
  }
  return storageBackendSingleton.instance as StorageBackend<T>;
}

export function useSyncedStorage<T>(
  key: string,
  startValue: T | null = null,
): [T | null, (value: T | ((val: T | null) => T | null)) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T | null>(startValue);
  const storageBackend = useMemo(() => {
    try {
      return getStorageBackend<T>();
    } catch (error) {
      console.error("Failed to initialize storage backend:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (startValue === null) {
      (async () => {
        try {
          const initialValue = await storageBackend?.get(key);
          if (initialValue !== undefined) {
            setStoredValue(initialValue);
          }
        } catch (error) {
          console.error(`Error fetching initial value for key '${key}':`, error);
        }
      })();
    }
  }, [key, startValue, storageBackend]);

  const setValue = useCallback(async (value: T | null | ((val: T | null) => T | null)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      if (valueToStore !== null && valueToStore !== undefined) {
        setStoredValue(valueToStore);
        if (storageBackend) {
          await storageBackend.set(key, valueToStore);
        }

        if (typeof BroadcastChannel !== "undefined") {
          const broadcastChannel = new BroadcastChannel("storage_sync");
          broadcastChannel.postMessage({ type: `update_${key}`, value: valueToStore });
        }
      }
    } catch (error) {
      console.error(`Error writing to storage for key '${key}':`, error);
    }
  }, [key, storedValue, storageBackend]);

  useEffect(() => {
    if (!storageBackend) return;

    let isMounted = true;
    const broadcastChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("storage_sync") : null;

    const handleStorageChange = (newValue: T) => {
      if (isMounted && newValue !== storedValue) {
        setStoredValue(newValue);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === `update_${key}`) {
        handleStorageChange(event.data.value as T);
      }
    };

    if (broadcastChannel) {
      broadcastChannel.addEventListener("message", handleMessage);
    }

    return () => {
      isMounted = false;
      if (broadcastChannel) {
        broadcastChannel.removeEventListener("message", handleMessage);
        broadcastChannel.close();
      }
    };
  }, [key, storageBackend, storedValue]);

  return [storedValue, setValue];
}
