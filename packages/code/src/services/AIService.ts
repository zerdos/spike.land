import { messagesPush } from "@/lib/chat-utils";
import { ContextManager } from "@/lib/context-manager";
import type { Message, MessageContent } from "@/lib/interfaces";
import type { ICode } from "@/lib/interfaces";
import { anthropicSystem, gptSystem, reminder } from "../config/aiConfig";
import { extractCodeStructure, extractCurrentTask } from "../utils/contextUtils";

export interface AIServiceConfig {
  gpt4oEndpoint: string;
  anthropicEndpoint: string;
  openAIEndpoint: string;
  updateThrottleMs: number;
  retryWithClaudeEnabled: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
}

type AIEndpoint = "gpt4o" | "anthropic" | "openAI";

class StreamHandler {
  private decoder = new TextDecoder();

  async handleStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onUpdate: (chunk: string) => void,
  ): Promise<string> {
    const chunks: string[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = this.decoder.decode(value);
      chunks.push(chunk);
      onUpdate(chunks.join("").trim()); // Pass only the latest chunk
    }
    return chunks.join("").trim();
  }
}

export class AIService {
  private config: AIServiceConfig;
  private streamHandler: StreamHandler;
  private cSess: ICode;
  private contextManager: ContextManager;

  constructor(config: AIServiceConfig, cSess: ICode, codeSpace: string) {
    this.config = config;
    this.streamHandler = new StreamHandler();
    this.cSess = cSess;
    this.contextManager = new ContextManager(codeSpace);
  }

  private getEndpoint(type: AIEndpoint): string {
    const endpointMap: Record<AIEndpoint, string> = {
      gpt4o: this.config.gpt4oEndpoint,
      anthropic: this.config.anthropicEndpoint,
      openAI: this.config.openAIEndpoint,
    };
    return endpointMap[type];
  }

  private formatMessageContent(content: MessageContent) {
    if (typeof content === "string") {
      return content;
    } else if (Array.isArray(content)) {
      return content.map(item => {
        if (item.type === "image") {
          return {
            type: "image",
            source: {
              type: "base64",
              media_type: item.source.media_type,
              data: item.source.data,
            },
          };
        } else {
          return item;
        }
      });
    }
    return content;
  }

  private async makeAPICall(endpoint: string, messages: Message[], model = ``): Promise<Response> {
    try {
      const formattedMessages = messages.slice(-5).map(({ role, content }) => ({
        role,
        content: this.formatMessageContent(content),
      }));

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: true,
          messages: formattedMessages,
          ...(model ? { model } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Error making API call:", error);
      throw error;
    }
  }

  private async handleStreamingResponse(
    endpoint: string,
    messages: Message[],
    onUpdate: (chunk: string) => void,
    model?: string,
  ): Promise<string> {
    try {
      this.config.setIsStreaming(true);
      const response = await this.makeAPICall(endpoint, messages, model);
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable!");
      }

      // const throttleUpdate = (onUpdate, this.config.updateThrottleMs);
      const content = await this.streamHandler.handleStream(reader, onUpdate);
      return content;
    } catch (error) {
      console.error("Error handling streaming response:", error);
      throw error;
    } finally {
      this.config.setIsStreaming(false);
    }
  }

  async sendToAI(
    type: AIEndpoint,
    messages: Message[],
    onUpdate: (chunk: string) => void,
  ): Promise<Message> {
    try {
      const endpoint = this.getEndpoint(type);

      const result = await this.handleStreamingResponse(
        endpoint,
        messages,
        onUpdate,
        type === "gpt4o" ? `gpt-4o` : "",
      );

      messages = messagesPush(messages, { id: Date.now().toString(), role: "assistant", content: result });

      // Update context based on AI response
      this.contextManager.updateContext("currentTask", extractCurrentTask(result));
      this.contextManager.updateContext("codeStructure", extractCodeStructure(result));

      return messages[messages.length - 1];
    } catch (error) {
      console.error("Error sending to AI:", error);
      throw error;
    } finally {
      this.config.setIsStreaming(false);
    }
  }

  async sendToGpt4o(messages: Message[], onUpdate: (chunk: string) => void): Promise<Message> {
    return this.sendToAI("gpt4o", messages, onUpdate);
  }

  async sendToAnthropic(messages: Message[], onUpdate: (chunk: string) => void): Promise<Message> {
    return this.sendToAI("anthropic", messages, onUpdate);
  }

  async continueWithOpenAI(
    fullResponse: string,
    codeNow: string,
    messages: Message[],
    setMessages: (messages: Message[]) => void,
    setAICode: (code: string) => void,
  ): Promise<string> {
    const messagesNew: Message[] = [
      { id: Date.now().toString(), role: "system", content: gptSystem },
      { id: (Date.now() + 1).toString(), role: "user", content: `${codeNow}\n**** instructions ****\n${fullResponse}` },
    ];

    const updateMessages = (newChunk: string) => {
      messages = messagesPush(messages, { id: Date.now().toString(), role: "assistant", content: newChunk });

      setMessages([...messages]);
    };

    try {
      const endpoint = this.getEndpoint("openAI");
      const response = await this.handleStreamingResponse(endpoint, messagesNew, updateMessages);
      const modifiedCode = this.extractCodeFromResponse(response);

      if (!modifiedCode) {
        setAICode("");
        updateMessages("");
        return "";
      }

      const success = await this.cSess.setCode(modifiedCode);
      if (!success) {
        throw new Error("Error setting code");
      }
      return modifiedCode;
    } catch (error) {
      console.error("Error in AI code processing:", error);
      updateMessages(error instanceof Error ? error.message : String(error));
      throw error;
    } finally {
      this.config.setIsStreaming(false);
    }
  }

  private extractCodeFromResponse(response: string): string {
    const codeModificationRegex = /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
    const matches = response.match(codeModificationRegex);
    if (!matches) {
      return "";
    }
    return matches[matches.length - 1].replace(/```(?:typescript?|tsx?|jsx?|javascript?)\n|```/g, "");
  }

  async retryWithClaude(
    fullResponse: string,
    codeNow: string,
    error: unknown,
    messages: Message[],
    setMessages: (messages: Message[]) => void,
    setAICode: (code: string) => void,
  ): Promise<string> {
    console.log("Retrying with Claude");
    const message: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `${codeNow}\n**** instructions ****\n${fullResponse}\n**** error ****\n${
        error instanceof Error ? error.toString() : String(error)
      }\nCould you help me with this error? I'm stuck.`,
    };

    messages = messagesPush(messages, message);
    setMessages([...messages]);

    try {
      const answer = await this.sendToAnthropic(messages, (chunk) => {
        messages = messagesPush(messages, { id: Date.now().toString(), role: "assistant", content: chunk });

        setMessages([...messages]);
      });

      messages = messagesPush(messages, answer);

      setMessages([...messages]);
      return "";
    } catch (error) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "user") {
        messages = messagesPush(messages, lastMessage);
      }

      setMessages([...messages]);

      console.error("Error retrying with Claude:", error);
      try {
        const answer = await this.sendToGpt4o(messages, (chunk) => {
          messages = messagesPush(messages, { id: Date.now().toString(), role: "assistant", content: chunk });

          setMessages([...messages]);
        });

        messages = messagesPush(messages, answer);
        setMessages([...messages]);

        return "";
      } catch {
        const lastMessage = [...messages].pop()!;

        setMessages([...messages, lastMessage]);

        const content = messages.filter((message) => message.role === "assistant").pop()?.content;

        const mini = await this.continueWithOpenAI(content as string, codeNow, messages, setMessages, setAICode);
        if (mini) {
          const assistantMessage: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: mini,
          };

          messages = messagesPush(messages, assistantMessage);
          setMessages([...messages]);

          return mini;
        }
      }

      return "";
    }
  }

  prepareClaudeContent(
    content: string,
    messages: Message[],
    codeNow: string,
    codeSpace: string,
  ): string {
    const context = this.contextManager.getFullContext();
    const contextString = JSON.stringify(context, null, 2);

    if (messages.length === 0 || codeNow !== messages[messages.length - 1]?.content) {
      return `
Current project context:
${contextString}

${
        anthropicSystem({
          fileName: codeSpace,
          fileContent: codeNow,
          userPrompt: content,
        })
      }`;
    } else {
      return `
Current project context:
${contextString}

${reminder({ userPrompt: content })}`;
    }
  }
}
