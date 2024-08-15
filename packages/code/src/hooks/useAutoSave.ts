export const useAutoSave = async (codeSpace: string) => fetch(`/live/${codeSpace}/autosave`);
