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
  [key: string]: any; // Add index signature
}

const DEFAULT_PROPS: ImageLoaderProps = {
  cfg: 3.5,
  steps: 28,
  prompt: "A web app for AI development. spike.land",
  aspect_ratio: "16:9" as keyof typeof RESOLUTION,
  output_format: "webp",
  output_quality: 90,
  negative_prompt: "",
  prompt_strength: 0.85,
  className: "",
};

export const ImageLoader: React.FC<ImageLoaderProps> = (props) => {
  const params = new URLSearchParams();

  Object.entries(props).forEach(([key, value]) => {
    if (!DEFAULT_PROPS[key]) return;
    if (value !== DEFAULT_PROPS[key as keyof ImageLoaderProps] && key !== "className") {
      params.append(key, value as string);
    }
  });

  const containerClassName = props.className || "w-full max-w-2xl mx-auto";

  return (
    <img
      src={`/replicate.webp?${params.toString()}`}
      alt={props.prompt || DEFAULT_PROPS.prompt}
      className={containerClassName}
    />
  );
};

export default () => <ImageLoader prompt="A nice day" />;
