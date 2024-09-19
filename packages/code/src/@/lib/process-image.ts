import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";

const MAX_FILE_SIZE = 600 * 1024; // 600 KB

export const processImage = (file: File): Promise<ImageData> => {
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const resizeImage = (img: HTMLImageElement, maxSize: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate the width and height, constraining the proportions
      if (width > height) {
        if (width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(blob!);
      }, file.type);
    });
  };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        let arrayBuffer = e.target?.result as ArrayBuffer;
        let blob = new Blob([arrayBuffer], { type: file.type });

        let size = 1600;
        // Check if the file size is larger than 600 KB
        while (blob.size > MAX_FILE_SIZE) {
          const img = new Image();
          const resizedBlob = await new Promise<Blob>((res) => {
            img.onload = async () => {
              console.log("Resizing image to", size);
              const resized = await resizeImage(img, size); // Resize to 800px max dimension
              res(resized);
            };
            img.src = URL.createObjectURL(blob);
          });

          blob = resizedBlob;
          arrayBuffer = await resizedBlob.arrayBuffer();
          size -= 300;
        }

        const base64Data = await blobToBase64(blob);
        const md5Body = md5(base64Data);
        const imageName = file.name;
        const url = window.location.origin + `/my-cms/${md5Body}/${imageName}`;
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
