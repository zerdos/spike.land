import  { useState, useEffect } from "react";
import type { FC } from "react";


const resolution = {
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
  

const defaultProps: {
    cfg?: number;
    steps?: number;
    prompt: string;
    aspect_ratio?: keyof typeof resolution;
    output_format?: 'webp' | 'png' | 'jpeg';
    output_quality?: number;
    negative_prompt?: string;
    prompt_strength?: number;
} = {
  cfg: 3.5,
  steps: 28,
  prompt: 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"',
  aspect_ratio: "16:9",
  output_format: "webp",
  output_quality: 90,
  negative_prompt: "",
  prompt_strength: 0.85,
};


export const ImageLoader: FC<typeof defaultProps> = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();

      // Only add props that are different from the default values
      Object.entries(props).forEach(([key, value]) => {
        if (value !== defaultProps[key as keyof typeof defaultProps]) {
          params.append(key, value as string);
        }
      });

      const url = `/replicate?${params.toString()}`;
      setImageUrl(url);
      setIsLoading(false);
    };

    loadImage();
  }, [props]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
          <p className="text-gray-500">Loading image...</p>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={props.prompt || defaultProps.prompt}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default ImageLoader;
