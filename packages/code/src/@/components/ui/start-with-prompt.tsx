import { useDarkMode } from "@/hooks/use-dark-mode";
import { md5 } from "@/lib/md5";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const XCircle: React.FC<{ className: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
      clipRule="evenodd"
    />
  </svg>
);

interface ImageData {
  imageName: string;
  url: string;
  src: string;
}

export const StartWithPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEnlargedImage(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && images.length < 5) {
      const file = files[0];
      try {
        const imageData = await processImage(file);
        setImages((prevImages) => [...prevImages, imageData]);
      } catch (error) {
        console.error("Error processing image:", error);
        // Optionally, show an error message to the user
      }
    }
  };

  const processImage = (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              const body = await file.arrayBuffer();
              const md5Body = md5(await blob.text());
              const imageName = file.name;
              const url = `/my-cms/${md5Body}/${imageName}`;

              await fetch(url, { method: "PUT", body });

              resolve({
                imageName,
                url,
                src: URL.createObjectURL(blob),
              });
            } else {
              reject(new Error("Failed to create blob from image"));
            }
          });
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    const imagePrompts = images
      .map((img) => `![${img.imageName}](${location.origin}${img.url})`)
      .join("\n");
    const fullPrompt = `${prompt}\n\n${imagePrompts}`;
    location.href = `/live/empty-${md5(fullPrompt)}?prompt=${encodeURIComponent(fullPrompt)}`;
  };

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center ${
        isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-white text-black"
      } p-8 space-y-6`}
    >
      <h1 className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Generate a new app or website
      </h1>

      <div className="relative w-full max-w-3xl space-y-4 mt-4 flex flex-col">
        <div className="relative">
          <PromptTextarea
            prompt={prompt}
            setPrompt={setPrompt}
          />
          <ActionButtons
            handleImageUpload={() => fileInputRef.current?.click()}
            handleGenerate={handleGenerate}
            disableUpload={images.length >= 5}
          />
        </div>
        <ImageGallery
          images={images}
          removeImage={removeImage}
          handleImageClick={setEnlargedImage}
        />
        <EnlargedImageModal
          enlargedImage={enlargedImage}
          images={images}
          closeModal={() => setEnlargedImage(null)}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        ref={fileInputRef}
      />
      <TemplateButton />
    </div>
  );
};

const PromptTextarea: React.FC<{
  prompt: string;
  setPrompt: (value: string) => void;
}> = ({ prompt, setPrompt }) => (
  <textarea
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    className="w-full min-h-[8rem] p-4 pt-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none"
    placeholder="Enter your prompt here..."
  />
);

const ActionButtons: React.FC<{
  handleImageUpload: () => void;
  handleGenerate: () => void;
  disableUpload: boolean;
}> = ({ handleImageUpload, handleGenerate, disableUpload }) => (
  <div className="absolute bottom-4 right-4 flex space-x-2 transform transition-transform hover:translate-y-1">
    <button
      onClick={handleImageUpload}
      className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-xs"
      disabled={disableUpload}
    >
      Upload Image
    </button>
    <button
      onClick={handleGenerate}
      className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-semibold shadow-lg hover:opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-xs"
    >
      Generate
    </button>
  </div>
);

const ImageGallery: React.FC<{
  images: ImageData[];
  removeImage: (index: number) => void;
  handleImageClick: (index: number) => void;
}> = ({ images, removeImage, handleImageClick }) => (
  <div className="flex flex-wrap gap-4 mt-4">
    {images.map((img, index) => (
      <div
        key={index}
        className="relative flex flex-col items-center"
      >
        <motion.img
          src={img.src}
          alt={`Uploaded ${index}`}
          className="w-40 h-40 object-cover rounded cursor-pointer"
          onClick={() => handleImageClick(index)}
          layoutId={`image-${index}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <span className="mt-1 text-xs text-gray-300 truncate w-full text-center">
          {img.imageName}
        </span>
        <button
          onClick={() => removeImage(index)}
          className="absolute -top-3 -right-3 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white"
        >
          <XCircle className="w-5 h-5 text-white" />
        </button>
      </div>
    ))}
  </div>
);

const EnlargedImageModal: React.FC<{
  enlargedImage: number | null;
  images: ImageData[];
  closeModal: () => void;
}> = ({ enlargedImage, images, closeModal }) => (
  <AnimatePresence>
    {enlargedImage !== null && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={closeModal}
      >
        <div className="flex flex-col items-center">
          <motion.img
            src={images[enlargedImage].src}
            alt="Enlarged"
            className="max-w-full max-h-[80vh] object-contain"
            layoutId={`image-${enlargedImage}`}
          />
          <span className="mt-4 text-sm text-gray-300 text-center max-w-full px-4 break-words">
            {images[enlargedImage].imageName}
          </span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TemplateButton: React.FC = () => (
  <button
    onClick={() => (location.href = "/start")}
    className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
    Choose from templates
  </button>
);

export default StartWithPrompt;
