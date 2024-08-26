import { useCallback, useEffect, useState } from "react";
import { useCodeSpace } from "./useCodeSpace";

export function useSyncedLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const codeSpace = useCodeSpace();

  const getStoredValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));

      const broadcastChannel = new BroadcastChannel("local_storage_sync");
      broadcastChannel.postMessage({
        type: `update_${key}-${codeSpace}`,
        value: valueToStore,
      });
    } catch (error) {
      console.error("Error setting localStorage value:", error);
    }
  }, [key, codeSpace, storedValue]);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("local_storage_sync");
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === `update_${key}-${codeSpace}`) {
        setStoredValue(event.data.value as T);
      }
    };

    broadcastChannel.addEventListener("message", handleMessage);
    return () => {
      broadcastChannel.removeEventListener("message", handleMessage);
      broadcastChannel.close();
    };
  }, [key, codeSpace]);

  return [storedValue, setValue];
}
