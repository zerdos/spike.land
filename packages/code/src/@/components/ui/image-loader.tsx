import React from "react";

interface RESOLUTION {
  "9:21": [640, 1536];
  "9:16": [768, 1344];
  "16:9": [896, 1584];
  "16:10": [896, 1408];
  "5:4": [1088, 896];
  "4:5": [896, 1088];
  "2:3": [832, 1216];
  "3:2": [1216, 832];
  "1:1": [1024, 1024];
}

interface ImageLoaderProps {
  cfg?: number;
  steps?: number;
  prompt: string;
  aspectRatio?: keyof RESOLUTION;
  outputFormat?: "webp" | "png" | "jpeg";
  outputQuality?: number;
  negativePrompt?: string;
  promptStrength?: number;
  className?: string;
}

const DEFAULT_PROPS: Required<ImageLoaderProps> = {
  cfg: 3.5,
  steps: 28,
  prompt: "A web app for AI development. spike.land",
  aspectRatio: "16:9",
  outputFormat: "webp",
  outputQuality: 90,
  negativePrompt: "",
  promptStrength: 0.85,
  className: "",
};

export const ImageLoader: React.FC<ImageLoaderProps> = (props) => {
  const params = React.useMemo(() => {
    const params = new URLSearchParams();
    (Object.keys(DEFAULT_PROPS) as Array<keyof ImageLoaderProps>).forEach(
      (key) => {
        if (
          key && props[key] && key !== "className" &&
          props[key] !== DEFAULT_PROPS[key]
        ) {
          params.append(key, String(props[key]));
        }
      },
    );
    return params.toString();
  }, [props]);

  const containerClassName = props.className || "w-full max-w-2xl mx-auto";

  return (
    <img
      src={`/replicate/${btoa(params)}.${props.outputFormat || DEFAULT_PROPS.outputFormat}`}
      alt={props.prompt || DEFAULT_PROPS.prompt}
      className={containerClassName}
    />
  );
};

const DefaultImageLoader = () => <ImageLoader prompt="A nice day" />;

export default DefaultImageLoader;
