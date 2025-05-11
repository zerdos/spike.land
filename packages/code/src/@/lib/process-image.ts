import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tryCatch } from "./try-catch"; // Added import

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

  const resizeImage = (
    img: HTMLImageElement,
    maxSize: number,
  ): Promise<Blob> => {
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
      const processLogic = async () => {
        if (!e.target?.result) {
          throw new Error("FileReader did not load content.");
        }
        let arrayBuffer = e.target.result as ArrayBuffer;
        let blob = new Blob([arrayBuffer], { type: file.type });

        let size = 1600;
        while (blob.size > MAX_FILE_SIZE) {
          const img = new Image();
          // Wrapping the image loading and resizing in a promise for tryCatch
          const resizeStepPromise = new Promise<Blob>((res, rej) => {
            img.onload = () => {
              // Self-invoking async function to handle awaits
              (async () => {
                try {
                  console.warn("Resizing image to", size);
                  const resized = await resizeImage(img, size);
                  res(resized);
                } catch (resizeError) {
                  rej(resizeError);
                }
              })();
            };
            img.onerror = () => rej(new Error("Image loading failed for resizing."));
            img.src = URL.createObjectURL(blob);
          });

          const { data: resizedBlobData, error: resizeError } = await tryCatch(resizeStepPromise);
          if (resizeError || !resizedBlobData) {
            throw new Error(
              `Image resizing failed: ${resizeError?.message || "Unknown resize error"}`,
            );
          }
          blob = resizedBlobData;

          const { data: newArrayBuffer, error: blobToArrayBufferError } = await tryCatch(
            blob.arrayBuffer(),
          );
          if (blobToArrayBufferError || !newArrayBuffer) {
            throw new Error(
              `Failed to get arrayBuffer from resized blob: ${
                blobToArrayBufferError?.message || "Unknown error"
              }`,
            );
          }
          arrayBuffer = newArrayBuffer;
          size -= 300;
        }

        const base64Data = await blobToBase64(blob); // This returns a Promise, can be awaited directly
        const md5Body = md5(base64Data);
        const imageName = file.name;
        const url = location.origin + `/my-cms/${md5Body}/${imageName}`;

        const { error: putError } = await tryCatch(
          fetch(url, { method: "PUT", body: arrayBuffer }),
        );
        if (putError) {
          throw new Error(`Failed to upload image: ${putError.message}`);
        }

        return {
          imageName,
          url,
          src: url,
          mediaType: file.type,
          data: url,
        } as ImageData;
      };

      const { data: imageData, error } = await tryCatch(processLogic());
      if (error) {
        console.error("Error in processImage onload:", error);
        reject(new Error(`Failed to process image: ${error.message}`));
      } else if (imageData) {
        resolve(imageData);
      } else {
        reject(new Error("Image processing did not return data."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};
