export type MessageContent =
  | string
  | Array<{
    type: "text" | "image";
    text?: string;
    source?: {
      type: "base64";
      media_type: "image/jpeg" | "image/png";
      data: string;
    };
  }>;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: MessageContent;
}
