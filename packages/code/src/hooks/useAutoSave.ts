import { tryCatch } from "@/lib/try-catch";

export const useAutoSave = async (codeSpace: string) => {
  const autoSavePromise = fetch(`/live/${codeSpace}/auto-save`);
  const { data, error } = await tryCatch(autoSavePromise);

  if (error) {
    console.error(`Error during auto-save for ${codeSpace}:`, error);
    // Depending on requirements, you might want to throw the error
    // or return a specific error indicator. For now, let's re-throw.
    throw error;
  }
  // data will be Response object or null if error occurred.
  // If no error, data should be the Response.
  return data;
};
