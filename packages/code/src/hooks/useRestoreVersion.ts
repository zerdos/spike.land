import { useCallback, useState } from "react";

interface RestoreStatus {
  type: "loading" | "success" | "error";
  message: string;
}

export const useRestoreVersion = (codeSpace: string) => {
  const [restoreStatus, setRestoreStatus] = useState<RestoreStatus | null>(
    null,
  );

  const restoreVersion = useCallback(async (timestamp: number) => {
    try {
      setRestoreStatus({ type: "loading", message: "Restoring..." });
      const response = await fetch(
        `/live/${codeSpace}/auto-save/restore/${timestamp}`,
      );
      if (!response || !response.ok) throw new Error("Failed to restore version");
      setRestoreStatus({
        type: "success",
        message: "Version restored successfully!",
      });
    } catch (err) {
      setRestoreStatus({
        type: "error",
        message: err instanceof Error
          ? err.message
          : "An unknown error occurred",
      });
    }
  }, [codeSpace]);

  return { restoreStatus, restoreVersion };
};
