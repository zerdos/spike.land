import { useCallback, useEffect, useMemo, useState } from "react";
import { useCodeSpace } from "./useCodeSpace";

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

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName, { keyPath: "key" });
      };
    });
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

function getStorageBackend<T>(): StorageBackend<T> {
  if (typeof window !== "undefined" && "localStorage" in window) {
    return new LocalStorageBackend<T>();
  } else if (typeof indexedDB !== "undefined") {
    return new IndexedDBBackend<T>();
  }
  throw new Error("No suitable storage backend available");
}

export function useSyncedStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => Promise<void>] {
  const codeSpace = useCodeSpace();
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const storageBackend = useMemo(() => getStorageBackend<T>(), []); // Memoized storage backend

  const setValue = useCallback(async (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    await storageBackend.set(key, valueToStore);

    if (typeof BroadcastChannel !== "undefined") {
      const broadcastChannel = new BroadcastChannel("storage_sync");
      broadcastChannel.postMessage({ type: `update_${key}-${codeSpace}`, value: valueToStore });
    }
  }, [key, codeSpace, storedValue, storageBackend]);

  useEffect(() => {
    let isMounted = true;
    const fetchStoredValue = async () => {
      try {
        const value = await storageBackend.get(key);
        if (value !== null && isMounted) {
          setStoredValue(value);
        }
      } catch (error) {
        console.error("Error reading from storage:", error);
      }
    };

    fetchStoredValue();

    if (typeof BroadcastChannel !== "undefined") {
      const broadcastChannel = new BroadcastChannel("storage_sync");
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === `update_${key}-${codeSpace}` && isMounted) {
          setStoredValue(event.data.value as T);
        }
      };

      broadcastChannel.addEventListener("message", handleMessage);
      return () => {
        isMounted = false;
        broadcastChannel.removeEventListener("message", handleMessage);
        broadcastChannel.close();
      };
    }

    return () => {
      isMounted = false;
    };
  }, [key, codeSpace, storageBackend]);

  return [storedValue, setValue];
}
