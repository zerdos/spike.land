import React, { useEffect, useState } from "react";

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
  aspect_ratio?: string;
  output_format?: "webp" | "png" | "jpeg";
  output_quality?: number;
  negative_prompt?: string;
  prompt_strength?: number;
  className?: string;
}

const DEFAULT_PROPS: ImageLoaderProps = {
  cfg: 3.5,
  steps: 28,
  prompt: "A web app for AI development. spike.land",
  aspect_ratio: "16:9",
  output_format: "webp",
  output_quality: 90,
  negative_prompt: "",
  prompt_strength: 0.85,
  className: "",
};

export const ImageLoader: React.FC<ImageLoaderProps> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();

      Object.entries(props).forEach(([key, value]) => {
        if (
          value !== DEFAULT_PROPS[key as keyof ImageLoaderProps]
          && key !== "className"
        ) {
          params.append(key, value as string);
        }
      });

      try {
        const response = await fetch(`/replicate.webp?${params.toString()}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!imageUrl) loadImage();
  }, [props]);

  const containerClassName = props.className || "w-full max-w-2xl mx-auto";

  return (
    <div className={containerClassName}>
      {isLoading ? <LoadingPlaceholder /> : (
        <img
          src={imageUrl}
          alt={props.prompt || DEFAULT_PROPS.prompt}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

const LoadingPlaceholder: React.FC = () => (
  <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
    <p className="text-gray-500">Loading image...</p>
  </div>
);

export default ImageLoader;
