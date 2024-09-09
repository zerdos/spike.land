import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";

export const processImage = (file: File): Promise<ImageData> => {
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        const base64Data = await blobToBase64(blob);
        const md5Body = md5(base64Data);
        const imageName = file.name;
        const url = `/my-cms/${md5Body}/${imageName}`;
        await fetch(url, { method: "PUT", body: arrayBuffer });

        resolve({
          imageName,
          url,
          src: url,
          mediaType: file.type,
          data: url,
        } as ImageData);
      } catch (error) {
        reject(new Error("Failed to process image"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};
