import { useCallback, useEffect, useRef } from "react";

interface AutoSaveOptions {
  key: string;
  data: any;
  debounceMs?: number;
}

const MAX_HISTORY_LENGTH = 100; // Adjust this value as needed

export const useAutoSave = ({ key, data, debounceMs = 1000 }: AutoSaveOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const saveData = useCallback(async () => {
    const timestamp = Date.now();
    const storageKey = `${key}_${timestamp}`;

    try {
      // Save the current data with the timestamp key
      await localStorage.setItem(storageKey, JSON.stringify(data));

      // Update the inventory of timestamps
      const inventory = JSON.parse(await localStorage.getItem(`${key}_inventory`) || "[]");
      inventory.push(timestamp);

      // Limit the inventory size
      if (inventory.length > MAX_HISTORY_LENGTH) {
        const removedTimestamp = inventory.shift();
        await localStorage.removeItem(`${key}_${removedTimestamp}`);
      }

      // Save the updated inventory
      await localStorage.setItem(`${key}_inventory`, JSON.stringify(inventory));

      console.log(`Data saved at ${new Date(timestamp).toISOString()}`);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [key, data]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(saveData, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, debounceMs, saveData]);

  return { saveData };
};

export const getLatestSavedData = async (key: string) => {
  try {
    const inventory = JSON.parse(await localStorage.getItem(`${key}_inventory`) || "[]");
    if (inventory.length === 0) return null;

    const latestTimestamp = Math.max(...inventory);
    const latestData = await localStorage.getItem(`${key}_${latestTimestamp}`);

    return latestData ? JSON.parse(latestData) : null;
  } catch (error) {
    console.error("Error retrieving latest saved data:", error);
    return null;
  }
};
