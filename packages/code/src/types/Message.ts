export interface Message {
  id: string;
  role: "user" | "assistant";
  content:
    | string
    | ({ type: "text"; text: string } | {
      type: "image";
      source: { type: "base64"; media_type: string; data: string };
    })[];
}
