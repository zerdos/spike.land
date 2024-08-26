import localforage from "localforage";
import { useCallback, useEffect, useMemo, useState } from "react";

// Create a localforage instance
const store = localforage.createInstance({
  name: "SyncedStorageDB",
});

export function useSyncedStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Memoize the localforage instance
  const storage = useMemo(() => store, []);

  const setValue = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await storage.setItem(key, valueToStore);

      if (typeof BroadcastChannel !== "undefined") {
        const broadcastChannel = new BroadcastChannel("storage_sync");
        broadcastChannel.postMessage({ type: `update_${key}`, value: valueToStore });
      }
    } catch (error) {
      console.error("Error writing to storage:", error);
    }
  }, [key, storedValue, storage]);

  useEffect(() => {
    let isMounted = true;
    const fetchStoredValue = async () => {
      try {
        const value = await storage.getItem<T>(key);
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
        if (event.data && event.data.type === `update_${key}` && isMounted) {
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
  }, [key, storage]);

  return [storedValue, setValue];
}
