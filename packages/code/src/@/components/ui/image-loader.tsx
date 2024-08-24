import React, { useEffect, useMemo, useState } from "react";

const RESOLUTION = {
  "9:21": [640, 1536],
  "9:16": [768, 1344],
  "16:9": [896, 1584],
  "16:10": [896, 1408],
  "5:4": [1088, 896],
  "4:5": [896, 1088],
  "2:3": [832, 1216],
  "3:2": [1216, 832],
  "1:1": [1024, 1024],
};

interface ImageLoaderProps {
  cfg?: number;
  steps?: number;
  prompt: string;
  aspect_ratio?: keyof typeof RESOLUTION;
  output_format?: "webp" | "png" | "jpeg";
  output_quality?: number;
  negative_prompt?: string;
  prompt_strength?: number;
  className?: string;
}

const DEFAULT_PROPS: Partial<ImageLoaderProps> = {
  cfg: 3.5,
  steps: 28,
  aspect_ratio: "16:9",
  output_format: "webp",
  output_quality: 90,
  negative_prompt: "",
  prompt_strength: 0.85,
};

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  prompt,
  className = "w-full max-w-2xl mx-auto",
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();
    Object.entries({ ...props, prompt }).forEach(([key, value]) => {
      if (value !== DEFAULT_PROPS[key as keyof ImageLoaderProps]) {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  }, [props, prompt]);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/replicate.webp?${params}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();
  }, [params]);

  return (
    <div className={className}>
      {isLoading
        ? (
          <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
            <p className="text-gray-500">Loading image...</p>
          </div>
        )
        : (
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
    </div>
  );
};

export default ImageLoader;
