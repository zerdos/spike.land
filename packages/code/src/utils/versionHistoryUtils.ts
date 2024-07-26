// src/utils/versionHistoryUtils.ts

export interface Version {
  timestamp: number;
  code: string;
}

const VERSION_HISTORY_KEY = "codeVersionHistory";
const MAX_VERSIONS = 250; // Maximum number of versions to store
const SAVE_INTERVAL = 60000; // 1 minute in milliseconds

export const loadVersionHistory = async (codeSpace: string): Promise<Version[]> => {
  const res = fetch(`/live/${codeSpace}/auto-save/history`);

  return (await res).json()
};

export const saveVersionHistory = (codeSpace: string, versions: Version[]): void => {
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
    const updatedVersions = [newVersion, ...currentVersions].slice(0, MAX_VERSIONS);
    saveVersionHistory(codeSpace, updatedVersions);
    return updatedVersions;
  }

  return currentVersions;
};
