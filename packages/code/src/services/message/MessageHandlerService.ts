import type {
  Message,
  MessageContent,
  MessageHandlerConfig,
  MessageResponse,
} from "@/lib/interfaces";
import { MessageType } from "@/lib/interfaces";
import { tryCatch } from "@/lib/try-catch";

/**
 * Service for handling and processing different types of messages
 * with support for text, command, and status messages.
 */
export class MessageHandlerService {
  private config: MessageHandlerConfig;

  /**
   * Creates a new MessageHandlerService instance
   * @param config Optional configuration for the service
   */
  constructor(config: MessageHandlerConfig = {}) {
    this.config = {
      logErrors: true,
      maxRetries: 3,
      timeout: 5000,
      ...config,
    };
  }

  /**
   * Validates if an unknown object is a valid Message
   * @param message The object to validate
   * @returns Type guard indicating if the object is a valid Message
   */
  public validateMessage(message: unknown): message is Message {
    if (!message || typeof message !== "object") {
      return false;
    }

    const msg = message as Message;
    return (
      "id" in msg &&
      "type" in msg &&
      "role" in msg
    );
  }

  /**
   * Type guard to check if content is a TextPart
   * @param content The content to check
   * @returns True if content is a TextPart
   */
  private isTextPart(part: unknown): part is { type: "text"; text: string; } {
    return (
      typeof part === "object" &&
      part !== null &&
      "type" in part &&
      part.type === "text" &&
      "text" in part &&
      typeof (part as { text: unknown; }).text === "string"
    );
  }

  /**
   * Extracts text content from different MessageContent types
   * @param content The message content to process
   * @returns The extracted text string
   * @throws Error if no valid text content is found
   */
  private getTextFromContent(content: MessageContent): string {
    if (typeof content === "string") {
      return content;
    }

    if (!Array.isArray(content)) {
      throw new Error("Invalid message content type");
    }

    const textPart = content.find(this.isTextPart);
    if (!textPart) {
      throw new Error("No text content found in message parts");
    }
    return textPart.text;
  }

  /**
   * Main method for handling messages
   * @param message The message to process
   * @returns A promise resolving to a MessageResponse
   */
  public async handleMessage(message: Message): Promise<MessageResponse> {
    const handlePromise = async () => {
      if (!this.validateMessage(message)) {
        throw new Error("Invalid message format");
      }

      if (!message.content) {
        throw new Error("Missing message content");
      }

      if (!Object.values(MessageType).includes(message.type as MessageType)) {
        console.error("Unhandled message type:", message.type);
        // This specific early return needs to be handled carefully with tryCatch
        // For now, let it throw and be caught by tryCatch, or adjust logic
        throw new Error("Unhandled message type");
      }

      const result = await this.processMessage(message);
      if (typeof result === "object" && result !== null && "error" in result) {
        // This also needs careful handling with tryCatch's single error path
        throw new Error(String(result.error));
      }
      return result;
    };

    const { data, error } = await tryCatch(handlePromise());

    if (error) {
      if (this.config.logErrors) {
        console.error("Error processing message:", error);
      }
      // Specific error handling for "Unhandled message type"
      if (error.message === "Unhandled message type") {
        return { success: false, error: "Unhandled message type" };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    return {
      success: true,
      data,
    };
  }

  /**
   * Processes a message based on its type
   * @param message The message to process
   * @returns A promise resolving to the processed result
   * @throws Error if message processing fails
   */
  private async processMessage(
    message: Message,
  ): Promise<Record<string, unknown>> {
    // This internal method's try/catch is for synchronous errors within getTextFromContent
    // or the switch logic. tryCatch is for wrapping the entire async operation.
    // If getTextFromContent were async, it would be a candidate.
    try {
      const text = this.getTextFromContent(message.content);

      switch (message.type) {
        case MessageType.TEXT:
          return { text };
        case MessageType.COMMAND:
          return { command: text, executed: true };
        case MessageType.STATUS:
          return { status: text, timestamp: new Date().toISOString() };
        default:
          throw new Error("Unhandled message type");
      }
    } catch (e) { // Catching synchronous errors from getTextFromContent or unhandled type
      throw new Error(
        e instanceof Error ? e.message : "Invalid message content type or unhandled type",
      );
    }
  }
}
