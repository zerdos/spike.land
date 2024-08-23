export const useAutoSave = async (codeSpace: string) => fetch(`/live/${codeSpace}/auto-save`);
