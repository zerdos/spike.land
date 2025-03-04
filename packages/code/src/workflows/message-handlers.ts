import type { ImageData, Message } from "@/lib/interfaces";

/**
 * Creates a new user message with optional image content
 */
export async function createNewMessage(
  images: ImageData[],
  claudeContent: string,
): Promise<Message> {
  // Filter out any images without URLs and create image content array
  const imagesContent = images
    .map((image) => {
      const imageUrl = image.url || image.src;
      if (!imageUrl) {
        console.warn("Image missing URL:", image);
        return null;
      }
      return {
        type: "image_url" as const,
        image_url: { url: imageUrl },
      };
    })
    .filter((content): content is { type: "image_url"; image_url: { url: string; }; } =>
      content !== null
    );

  const content = imagesContent.length > 0
    ? [...imagesContent, {
      type: "text" as const,
      text: claudeContent.trim() || "",
    }]
    : claudeContent;

  return {
    id: Date.now().toString(),
    role: "user" as const,
    content,
  };
}
