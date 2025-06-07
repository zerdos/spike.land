import { Textarea } from "@/components/ui/textarea";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useDictation } from "@/hooks/use-dictation";
import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";
import { AnimatePresence, motion } from "framer-motion";
import { CircleMinus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const StartWithPrompt: React.FC = () => {
  const [prompt, setPrompt] = useDictation("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useDarkMode();
  const handlePaste = async (
    event: React.ClipboardEvent<HTMLTextAreaElement>,
  ) => {
    const items = event.clipboardData.items;
    for (const item of Array.from(items)) { // Changed to Array.from(items)
      if (item.type.indexOf("image") !== -1) {
        event.preventDefault();
        const file = item.getAsFile();
        if (file && images.length < 5) {
          try {
            if (!file) return;
            if (!file) return;
            const imageData = await processImage(file);
            setImages((prevImages: ImageData[]) => [...prevImages, imageData]);
          } catch (error) {
            console.error("Error processing pasted image:", error);
          }
        }
        break;
      }
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEnlargedImage(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && images.length < 5) {
      const file = files[0];
      try {
        const imageData = await processImage(file!);
        setImages((prevImages) => [...prevImages, imageData]);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0 && images.length < 5) {
      const file = files[0];
      try {
        const imageData = await processImage(file!);
        setImages((prevImages) => [...prevImages, imageData]);
      } catch (error) {
        console.error("Error processing dropped image:", error);
      }
    }
  };
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    const key = md5(prompt);

    sessionStorage.setItem(
      key,
      JSON.stringify({
        images,
        prompt,
      }),
    );

    location.href = `/live/x-${key}`;
  };

  return (
    <div
      key={images.length}
      className={`h-screen flex flex-col justify-center items-center ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-white to-gray-100 text-gray-800"
      } p-8 space-y-6`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h1
        className={`text-5xl font-bold text-center mb-8 ${
          isDarkMode
            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            : "text-gray-800"
        }`}
      >
        Generate a new app or website
      </h1>

      <div className="relative w-full max-w-3xl space-y-4 mt-4 flex flex-col">
        <div className="relative">
          <PromptTextarea
            prompt={prompt}
            setPrompt={setPrompt}
            isDarkMode={isDarkMode}
            onPaste={handlePaste}
          />
          <ActionButtons
            handleImageUpload={() => fileInputRef.current?.click()}
            handleGenerate={handleGenerate}
            disableUpload={images.length >= 5}
            isDarkMode={isDarkMode}
          />
        </div>
        <ImageGallery
          images={images}
          removeImage={removeImage}
          handleImageClick={setEnlargedImage}
          isDarkMode={isDarkMode}
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
      {images.length === 0 && <TemplateButton isDarkMode={isDarkMode} />}
    </div>
  );
};

const PromptTextarea: React.FC<{
  prompt: string;
  setPrompt: (value: string) => void;
  isDarkMode: boolean;
  onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
}> = ({ prompt, setPrompt, isDarkMode, onPaste }) => (
  <Textarea
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    onPaste={onPaste}
    className={`w-full min-h-[8rem] p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isDarkMode
        ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
        : "bg-white border border-gray-300 text-gray-800 placeholder-gray-500 shadow-md"
    }`}
    placeholder="Enter your prompt here or paste an image..."
  />
);

const ActionButtons: React.FC<{
  handleImageUpload: () => void;
  handleGenerate: () => void;
  disableUpload: boolean;
  isDarkMode: boolean;
}> = ({ handleImageUpload, handleGenerate, disableUpload, isDarkMode }) => (
  <div className="absolute bottom-4 right-4 flex space-x-2">
    <button
      onClick={handleImageUpload}
      className={`px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm ${
        isDarkMode
          ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
          : "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-300"
      } ${disableUpload ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disableUpload}
      aria-disabled={disableUpload ? "true" : "false"}
    >
      Upload Image
    </button>
    <button
      onClick={handleGenerate}
      className={`px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm ${
        isDarkMode
          ? "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
          : "bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-300"
      }`}
    >
      Generate
    </button>
  </div>
);

const ImageGallery: React.FC<{
  images: ImageData[];
  removeImage: (index: number) => void;
  handleImageClick: (index: number) => void;
  isDarkMode: boolean;
}> = ({ images, removeImage, handleImageClick, isDarkMode }) => (
  <div className="flex flex-wrap gap-4 mt-4">
    {images.map((img, index) => (
      <div
        key={index}
        className="relative flex flex-col items-center"
      >
        <motion.img
          src={img.src}
          alt={`Uploaded ${index}`}
          className="w-40 h-40 object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => handleImageClick(index)}
          layoutId={`image-${index}`}
          whileTap={{ scale: 0.95 }}
        />
        <span
          className={`mt-2 text-xs truncate w-full text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {img.imageName}
        </span>
        <button
          onClick={() => removeImage(index)}
          className="absolute -top-2 right-[10%] bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white shadow-md transition-colors duration-300"
          aria-label="Remove image"
        >
          <CircleMinus className="w-6 h-6 text-white" />
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
            src={images[enlargedImage]!.src}
            alt="Enlarged"
            className="max-w-full max-h-[80vh] object-contain"
            layoutId={`image-${enlargedImage}`}
          />
          <span className="mt-4 text-sm text-gray-300 text-center max-w-full px-4 break-words">
            {images[enlargedImage]!.imageName}
          </span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TemplateButton: React.FC<{ isDarkMode: boolean; }> = ({ isDarkMode }) => (
  <button
    onClick={() => (location.href = "/start")}
    className={`mt-6 px-6 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm flex items-center ${
      isDarkMode
        ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400"
    }`}
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
