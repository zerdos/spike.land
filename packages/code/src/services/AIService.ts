import { createContextManager } from "@/lib/context-manager";
import { Message, MessageContent } from "@/lib/interfaces";
import { ICode } from "@src/cSess.interface";
import { throttle } from "es-toolkit";
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
    onUpdate: (content: string) => void,
  ): Promise<string> {
    let content = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = this.decoder.decode(value);
      content += chunk;
      onUpdate(content);
    }
    return content.trim();
  }
}

export class AIService {
  private config: AIServiceConfig;
  private streamHandler: StreamHandler;
  private cSess: ICode;
  private contextManager: ReturnType<typeof createContextManager>;

  constructor(config: AIServiceConfig, cSess: ICode, codeSpace: string) {
    this.config = config;
    this.streamHandler = new StreamHandler();
    this.cSess = cSess;
    this.contextManager = createContextManager(codeSpace);
  }

  private getEndpoint(type: AIEndpoint): string {
    const endpointMap: Record<AIEndpoint, string> = {
      gpt4o: this.config.gpt4oEndpoint,
      anthropic: this.config.anthropicEndpoint,
      openAI: this.config.openAIEndpoint,
    };
    return endpointMap[type];
  }

  private formatMessageContent(content: MessageContent): any {
    if (typeof content === "string") {
      return content;
    } else if (Array.isArray(content)) {
      return content.map(item => {
        if (item.type === "image" && item.source) {
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
      const formattedMessages = messages.map(({ role, content }) => ({
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
    onUpdate: (content: string) => void,
    model?: string,
  ): Promise<string> {
    try {
      this.config.setIsStreaming(true);
      const response = await this.makeAPICall(endpoint, messages, model);
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable!");
      }

      const throttleUpdate = throttle(onUpdate, this.config.updateThrottleMs);
      const content = await this.streamHandler.handleStream(reader, throttleUpdate);
      onUpdate(content);

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
    onUpdate: (content: string) => void,
  ): Promise<Message> {
    try {
      const endpoint = this.getEndpoint(type);
      const result = await this.handleStreamingResponse(endpoint, messages, onUpdate, type === "gpt4o" ? `gpt-4o` : "");

      const lastMessage = messages[messages.length - 1];

      // Update context based on AI response
      this.contextManager.updateContext("currentTask", extractCurrentTask(result));
      this.contextManager.updateContext("codeStructure", extractCodeStructure(result));

      return {
        id: ((+lastMessage.id) + 1).toString(),
        role: "assistant",
        content: result,
      };
    } catch (error) {
      console.error("Error sending to AI:", error);
      throw error;
    } finally {
      this.config.setIsStreaming(false);
    }
  }

  async sendToGpt4o(messages: Message[], onUpdate: (content: string) => void): Promise<Message> {
    return this.sendToAI("gpt4o", messages, onUpdate);
  }

  async sendToAnthropic(messages: Message[], onUpdate: (content: string) => void): Promise<Message> {
    return this.sendToAI("anthropic", messages, onUpdate);
  }

  async continueWithOpenAI(
    fullResponse: string,
    codeNow: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
  ): Promise<string> {
    const messages: Message[] = [
      { id: Date.now().toString(), role: "system", content: gptSystem },
      { id: (Date.now() + 1).toString(), role: "user", content: `${codeNow}\n**** instructions ****\n${fullResponse}` },
    ];

    const updateMessages = (newCode: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), role: "assistant", content: newCode },
      ]);
    };

    try {
      const endpoint = this.getEndpoint("openAI");
      const response = await this.handleStreamingResponse(endpoint, messages, updateMessages);
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
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
    prevMessages: Message[],
  ): Promise<string> {
    console.log("Retrying with Claude");
    const message: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `${codeNow}\n**** instructions ****\n${fullResponse}\n**** error ****\n${
        error instanceof Error ? error.toString() : String(error)
      }\nCould you help me with this error? I'm stuck.`,
    };

    try {
      const answer = await this.sendToAnthropic([...prevMessages, message], (code) => {
        setMessages((prevMessages) => [...prevMessages, { ...message, content: code }]);
      });
      setMessages((prevMessages) => [...prevMessages, answer]);

      return await this.continueWithOpenAI(answer.content as string, codeNow, setMessages, setAICode);
    } catch (error) {
      try {
        const answer = await this.sendToGpt4o([...prevMessages, message], (code) => {
          setMessages((prevMessages) => [...prevMessages, { ...message, content: code }]);
        });
        setMessages((prevMessages) => [...prevMessages, answer]);

        return await this.continueWithOpenAI(answer.content as string, codeNow, setMessages, setAICode);
      } catch (error) {
        console.error("Error retrying with Claude:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), role: "assistant", content: "I'm sorry, I couldn't help you with this error." },
        ]);
        return "";
      }
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
