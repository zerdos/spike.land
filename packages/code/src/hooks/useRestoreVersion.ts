import { useCallback, useState } from "react";
import { tryCatch } from "@/lib/try-catch";

interface RestoreStatus {
  type: "loading" | "success" | "error";
  message: string;
}

export const useRestoreVersion = (codeSpace: string) => {
  const [restoreStatus, setRestoreStatus] = useState<RestoreStatus | null>(
    null,
  );

  const restoreVersion = useCallback(async (timestamp: number) => {
    setRestoreStatus({ type: "loading", message: "Restoring..." });

    const restorePromise = async () => {
      const response = await fetch(
        `/live/${codeSpace}/auto-save/restore/${timestamp}`,
      );
      if (!response || !response.ok) {
        throw new Error("Failed to restore version");
      }
      // No explicit data to return on success for this operation
    };

    const { error } = await tryCatch(restorePromise());

    if (error) {
      setRestoreStatus({
        type: "error",
        message: error instanceof Error
          ? error.message
          : "An unknown error occurred",
      });
    } else {
      setRestoreStatus({
        type: "success",
        message: "Version restored successfully!",
      });
    }
  }, [codeSpace]);

  return { restoreStatus, restoreVersion };
};
