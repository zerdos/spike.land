import { useCallback, useEffect, useState } from "react";

export function useSyncedStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const getStoredValue = useCallback(async (): Promise<T> => {
    if (typeof window !== "undefined" && "localStorage" in window) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return initialValue;
      }
    } else if ("indexedDB" in self) {
      // Use IndexedDB in worker environment
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("SyncedStorageDB", 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction("keyvaluepairs", "readonly");
          const objectStore = transaction.objectStore("keyvaluepairs");
          const getRequest = objectStore.get(key);
          getRequest.onerror = () => reject(getRequest.error);
          getRequest.onsuccess = () => resolve(getRequest.result || initialValue);
        };
        request.onupgradeneeded = () => {
          const db = request.result;
          db.createObjectStore("keyvaluepairs", { keyPath: "key" });
        };
      });
    } else {
      console.warn("Neither localStorage nor IndexedDB is available");
      return initialValue;
    }
  }, [key, initialValue]);

  const setValue = useCallback(async (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);

    if (typeof window !== "undefined" && "localStorage" in window) {
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Error setting localStorage value:", error);
      }
    } else if ("indexedDB" in self) {
      // Use IndexedDB in worker environment
      const request = indexedDB.open("SyncedStorageDB", 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("keyvaluepairs", "readwrite");
        const objectStore = transaction.objectStore("keyvaluepairs");
        objectStore.put({ key, value: valueToStore });
      };
    } else {
      console.warn("Neither localStorage nor IndexedDB is available");
    }

    // Broadcast the change
    if ("BroadcastChannel" in self) {
      const broadcastChannel = new BroadcastChannel("storage_sync");
      broadcastChannel.postMessage({ type: `update_${key}`, value: valueToStore });
    }
  }, [key, storedValue]);

  useEffect(() => {
    getStoredValue().then(setStoredValue);

    if ("BroadcastChannel" in self) {
      const broadcastChannel = new BroadcastChannel("storage_sync");
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === `update_${key}`) {
          setStoredValue(event.data.value as T);
        }
      };

      broadcastChannel.addEventListener("message", handleMessage);
      return () => {
        broadcastChannel.removeEventListener("message", handleMessage);
        broadcastChannel.close();
      };
    }
  }, [key, getStoredValue]);

  return [storedValue, setValue];
}
