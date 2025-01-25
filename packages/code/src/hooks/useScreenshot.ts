import { useState } from "react";

export const useScreenshot = (codeSpace: string) => {
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
  const [screenshotImage, setScreenshotImage] = useState<string | null>(null);

  const screenshotToBase64Maker = async (
    codeSpace: string,
  ): Promise<string> => {
    const response = await fetch(`/live/${codeSpace}/screenshot`);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  const handleScreenshotClick = async () => {
    setIsScreenshotLoading(true);
    try {
      const base64Image = await screenshotToBase64Maker(codeSpace);
      setScreenshotImage(base64Image);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      setIsScreenshotLoading(false);
    }
  };

  const handleCancelScreenshot = () => {
    setScreenshotImage(null);
  };

  return {
    isScreenshotLoading,
    screenshotImage,
    handleScreenshotClick,
    handleCancelScreenshot,
  };
};
