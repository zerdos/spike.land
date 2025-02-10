import { Message } from "@/lib/interfaces";
import { AIHandler } from "../services/ai/AIHandler";

export class ChatHandler {
  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  async handleMessage(message: Message) {
    try {
      if (!message || !message.content) {
        throw new Error("Invalid message format");
      }
      await this.processMessage(message);
    } catch (error) {
      console.error("Error in handleMessage:", error);
      self.postMessage({
        type: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async processMessage(message: Message) {
    try {
      const text = typeof message.content === "string" 
        ? message.content
        : message.content.find((part): part is { type: "text", text: string } => 
            part.type === "text" && typeof part.text === "string"
          )?.text;

      if (!text) {
        throw new Error("Invalid assistant message content type");
      }

      const response = await AIHandler.process(text);
      self.postMessage({
        type: "response",
        content: response,
      });
    } catch (error) {
      console.error("Error in processMessage:", error);
      throw error;
    }
  }
}

const chatHandler = new ChatHandler();

export function handleSendMessage(message: Message) {
  return chatHandler.handleMessage(message);
}
