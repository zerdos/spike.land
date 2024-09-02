import { ICode } from "@src/cSess.interface";
import { throttle } from "es-toolkit";
import { anthropic, gptSystem, reminder } from "../config/aiConfig";
import { Message, MessageContent } from "../types/Message";

interface AIModelResponse {
  content: string;
  id: string;
}

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
  private cSess: any;

  constructor(config: AIServiceConfig, cSess: ICode) {
    this.config = config;
    if (this.config.setIsStreaming) {
      this.config.setIsStreaming(false);
    }
    this.streamHandler = new StreamHandler();
    this.cSess = cSess;
  }

  private getEndpoint(type: AIEndpoint): string {
    const endpointMap: Record<AIEndpoint, string> = {
      gpt4o: this.config.gpt4oEndpoint,
      anthropic: this.config.anthropicEndpoint,
      openAI: this.config.openAIEndpoint,
    };
    return endpointMap[type];
  }

  private async makeAPICall(endpoint: string, messages: Message[]): Promise<Response> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stream: true,
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  private async handleStreamingResponse(
    endpoint: string,
    messages: Message[],
    onUpdate: (content: string) => void,
  ): Promise<AIModelResponse> {
    const response = await this.makeAPICall(endpoint, messages);
    const reader = response.body?.getReader();
    if (this.config.setIsStreaming) {
      this.config.setIsStreaming(true);
    }
    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    console.log("handleStreamingResponse, updateThrottleMs:", this.config.updateThrottleMs);
    const debouncedUpdate = throttle(onUpdate, this.config.updateThrottleMs);
    const content = await this.streamHandler.handleStream(reader, debouncedUpdate);
    onUpdate(content);

    if (this.config.setIsStreaming) {
      this.config.setIsStreaming(false);
    }
    return {
      id: Date.now().toString(),
      content,
    };
  }

  async sendToAI(
    type: AIEndpoint,
    messages: Message[],
    onUpdate: (content: string) => void,
  ): Promise<Message> {
    const endpoint = this.getEndpoint(type);
    const result = await this.handleStreamingResponse(endpoint, messages, onUpdate);

    const assistantMessage: Message = {
      id: result.id,
      role: "assistant",
      content: result.content,
    };

    return assistantMessage;
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
      const modifiedCode = this.extractCodeFromResponse(response.content);

      if (!modifiedCode) {
        setAICode("");
        updateMessages("");
        return "";
      }
      // const prettyCode = await this.formatAndRunCode(modifiedCode);

      const success = await this.cSess.setCode(modifiedCode);
      if (!success) {
        throw new Error("Error somewhere....");
      }
      return modifiedCode;
    } catch (error) {
      console.error("Error in AI code processing:", error);
      updateMessages(error instanceof Error ? error.message : String(error));

      throw error;
    }
  }

  private extractCodeFromResponse(response: string | MessageContent): string {
    if (typeof response !== "string") {
      throw new Error("Invalid response content");
    }
    const codeModificationRegex = /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
    const matches = response.match(codeModificationRegex);
    if (!matches) {
      return "";
    }
    return matches[matches.length - 1].replace(/```(?:typescript?|tsx?|jsx?|javascript?)\n|```/g, "");
  }

  private async retryWithClaude(
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

    const answer = await this.sendToAnthropic([...prevMessages, message], (code) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, content: code }]);
    });
    setMessages((prevMessages) => [...prevMessages, answer]);

    return await this.continueWithOpenAI(answer.content as string, codeNow, setMessages, setAICode);
  }

  prepareClaudeContent(
    content: string,
    messages: Message[],
    codeNow: string,
    codeSpace: string,
  ): string {
    if (messages.length === 0 || codeNow !== messages[messages.length - 1]?.content) {
      return anthropic({
        fileName: codeSpace,
        fileContent: codeNow,
        userPrompt: content,
      });
    } else {
      return reminder({ userPrompt: content });
    }
  }
}
