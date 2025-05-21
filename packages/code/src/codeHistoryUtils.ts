// src/codeHistoryUtils.ts

export interface Version {
  timestamp: number;
  code: string;
}

import { tryCatch } from "@/lib/try-catch"; // Added import

const VERSION_HISTORY_KEY = "codeVersionHistory";
const MAX_VERSIONS = 250; // Maximum number of versions to store
const SAVE_INTERVAL = 60000; // 1 minute in milliseconds

export const loadVersionHistory = async (
  codeSpace: string,
): Promise<Version[]> => {
  const fetchPromise = fetch(`/live/${codeSpace}/auto-save/history`);
  const { data: response, error: fetchError } = await tryCatch(fetchPromise);

  if (fetchError || !response) {
    console.error(
      `Error fetching version history for ${codeSpace}:`,
      fetchError,
    );
    return []; // Return empty array on fetch error
  }
  if (!response.ok) {
    console.error(
      `Error response status for version history ${codeSpace}: ${response.status}`,
    );
    return []; // Return empty array on bad response
  }

  const { data: jsonData, error: jsonError } = await tryCatch(response.json());
  if (jsonError) {
    console.error(
      `Error parsing version history JSON for ${codeSpace}:`,
      jsonError,
    );
    return []; // Return empty array on JSON parse error
  }
  return jsonData || [];
};

export const saveVersionHistory = (
  codeSpace: string,
  versions: Version[],
): void => {
  const key = `${VERSION_HISTORY_KEY}_${codeSpace}`;
  localStorage.setItem(key, JSON.stringify(versions.slice(0, MAX_VERSIONS)));
};

export const addVersion = (
  codeSpace: string,
  newVersion: Version,
  currentVersions: Version[],
): Version[] => {
  const now = Date.now();
  const latestVersion = currentVersions[0];

  // Only add a new version if it's been more than SAVE_INTERVAL since the last save
  // or if it's the first version
  if (!latestVersion || (now - latestVersion.timestamp) >= SAVE_INTERVAL) {
    const updatedVersions = [newVersion, ...currentVersions].slice(
      0,
      MAX_VERSIONS,
    );
    saveVersionHistory(codeSpace, updatedVersions);
    return updatedVersions;
  }

  return currentVersions;
};
