import type { AIRequest, Env } from "../types";

// Cloudflare AI Types
interface AIRunOptions {
  messages?: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface AIResponse {
  response?: string;
}

export interface AIServiceResponse {
  success: boolean;
  response?: string;
  tokensUsed?: number;
  error?: string;
}

// For Cloudflare AI, we need to bypass the strict typing for now
interface CloudflareAI {
  run(model: string, options: AIRunOptions): Promise<string | AIResponse>;
}

export class AIService {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async generateResponse(request: AIRequest): Promise<AIServiceResponse> {
    try {
      const modelName = this.getModelName(request.model);

      const response = await (this.env.AI as unknown as CloudflareAI).run(
        modelName,
        {
          messages: request.messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.max_tokens ?? 1000,
        },
      );

      let responseText: string;
      if (typeof response === "string") {
        responseText = response;
      } else if (response && typeof response === "object" && "response" in response) {
        responseText = response.response as string;
      } else {
        throw new Error("Invalid AI response format");
      }

      const tokensUsed = await this.countTokens(responseText);

      return {
        success: true,
        response: responseText,
        tokensUsed,
      };
    } catch (error) {
      console.error("AI generation error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate AI response",
      };
    }
  }

  async countTokens(text: string): Promise<number> {
    return Math.ceil(text.length / 4);
  }

  async moderateContent(content: string): Promise<boolean> {
    try {
      const response = await (this.env.AI as unknown as CloudflareAI).run(
        "@cf/meta/llama-guard-2-8b",
        {
          messages: [
            {
              role: "user",
              content: content,
            },
          ],
        },
      );

      const result = typeof response === "string" ? response : (response as AIResponse)?.response;

      return !result?.toLowerCase().includes("unsafe");
    } catch (error) {
      console.error("Content moderation error:", error);
      return true;
    }
  }

  async generateTitle(
    messages: Array<{ role: string; content: string; }>,
  ): Promise<string> {
    try {
      const prompt =
        `Based on this conversation, generate a short, descriptive title (max 50 chars):
${
          messages
            .slice(0, 3)
            .map((m) => `${m.role}: ${m.content.slice(0, 100)}`)
            .join("\n")
        }

Title:`;

      const response = await this.env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
        messages: [
          {
            role: "system",
            content: "You are a title generator. Generate only the title, nothing else.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 20,
      });

      const title = typeof response === "string" ? response : response?.response;

      return (title as string)?.trim().slice(0, 50) || "New Conversation";
    } catch (error) {
      console.error("Title generation error:", error);
      return "New Conversation";
    }
  }

  async summarizeConversation(
    messages: Array<{ role: string; content: string; }>,
  ): Promise<string> {
    try {
      const conversationText = messages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      const response = await this.env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
        messages: [
          {
            role: "system",
            content: "Summarize the following conversation in 2-3 sentences.",
          },
          {
            role: "user",
            content: conversationText.slice(0, 2000),
          },
        ],
        temperature: 0.3,
        max_tokens: 150,
      });

      return typeof response === "string" ? response : response?.response || "";
    } catch (error) {
      console.error("Summarization error:", error);
      return "";
    }
  }

  private getModelName(model: string): string {
    const modelMap: Record<string, string> = {
      "llama-2-7b": "@cf/meta/llama-2-7b-chat-int8",
      "llama-2-7b-fp16": "@cf/meta/llama-2-7b-chat-fp16",
      "mistral-7b": "@cf/mistral/mistral-7b-instruct-v0.1",
      codellama: "@cf/meta/codellama-7b-instruct-awq",
      "phi-2": "@cf/microsoft/phi-2",
      "qwen-1.5": "@cf/qwen/qwen1.5-14b-chat-awq",
      deepseek: "@cf/deepseek-ai/deepseek-math-7b-instruct",
      tinyllama: "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
      openchat: "@cf/openchat/openchat-3.5-0106",
      gemma: "@cf/google/gemma-7b-it-lora",
    };

    return modelMap[model] || "@cf/meta/llama-2-7b-chat-int8";
  }

  async extractKeywords(text: string): Promise<string[]> {
    try {
      const response = await this.env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
        messages: [
          {
            role: "system",
            content: "Extract 3-5 key topics from the text. Return only comma-separated keywords.",
          },
          {
            role: "user",
            content: text.slice(0, 500),
          },
        ],
        temperature: 0.3,
        max_tokens: 50,
      });

      const keywords = typeof response === "string" ? response : response?.response || "";
      return keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    } catch (error) {
      console.error("Keyword extraction error:", error);
      return [];
    }
  }
}
