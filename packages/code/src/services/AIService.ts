import { throttle } from "es-toolkit";
import { anthropic, gptSystem, reminder } from "../config/aiConfig";
import { Message, MessageContent } from "../types/Message";
import { LocalStorageService } from "./LocalStorageService";

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
  private localStorageService: LocalStorageService;
  private config: AIServiceConfig;
  private streamHandler: StreamHandler;
  private cSess: any; // Add cSess as a private property

  constructor(localStorageService: LocalStorageService, config: AIServiceConfig, cSess: any) { // Add cSess to constructor
    this.localStorageService = localStorageService;
    this.config = config;
    this.streamHandler = new StreamHandler();
    this.cSess = cSess; // Initialize cSess
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

    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    console.log("handleStreamingResponse, updateThrottleMs:", this.config.updateThrottleMs);
    const debouncedUpdate = throttle(onUpdate, this.config.updateThrottleMs);
    const content = await this.streamHandler.handleStream(reader, debouncedUpdate);
    onUpdate(content);

    return {
      id: Date.now().toString(),
      content,
    };
  }

  private saveInteraction(userMessage: Message, assistantMessage: Message): void {
    this.localStorageService.saveAIInteraction(
      JSON.stringify(userMessage),
      JSON.stringify(assistantMessage),
    );
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

    const userMessage = messages[messages.length - 1];
    this.saveInteraction(userMessage, assistantMessage);

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
    isRetry = false,
  ): Promise<string | void> {
    const messages: Message[] = [
      { id: Date.now().toString(), role: "system", content: gptSystem },
      { id: (Date.now() + 1).toString(), role: "user", content: `${codeNow}\n**** instructions ****\n${fullResponse}` },
    ];

    const debouncedSetMessages = throttle((newCode: string) => {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { ...prevMessages[prevMessages.length - 1], content: `${fullResponse}\n${newCode}` },
      ]);
    }, this.config.updateThrottleMs);

    try {
      const response = await this.sendToAI("openAI", messages, debouncedSetMessages);
      const modifiedCode = this.extractCodeFromResponse(response.content);
      const prettyCode = await this.formatAndRunCode(modifiedCode);
      setAICode(prettyCode);
      return prettyCode;
    } catch (error) {
      console.error("Error in AI code processing:", error);
      if (!isRetry && this.config.retryWithClaudeEnabled) {
        return this.retryWithClaude(fullResponse, codeNow, error, setMessages, setAICode);
      }
    }
  }

  private extractCodeFromResponse(response: string | MessageContent): string {
    if (typeof response !== "string") {
      throw new Error("Invalid response content");
    }
    const codeModificationRegex = /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
    const matches = response.match(codeModificationRegex);
    if (!matches) {
      throw new Error("No code block found in the response");
    }
    return matches[matches.length - 1].replace(/```(?:typescript?|tsx?|jsx?|javascript?)\n|```/g, "");
  }

  private async formatAndRunCode(code: string): Promise<string> {
    if ((await this.cSess.setCode(code)) === false) { // Use this.cSess instead of global cSess
      throw new Error("Error in runner");
    }
    return code;
  }

  private async retryWithClaude(
    fullResponse: string,
    codeNow: string,
    error: unknown,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
  ): Promise<string | void> {
    console.log("Retrying with Claude");
    const message: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `${codeNow}\n**** instructions ****\n${fullResponse}\n**** error ****\n${
        error instanceof Error ? error.toString() : String(error)
      }\nCould you help me with this error? I'm stuck.`,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    const prevMessages = this.localStorageService.loadMessages();
    const answer = await this.sendToAnthropic([...prevMessages, message], (code) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, content: code }]);
    });
    setMessages((prevMessages) => [...prevMessages, answer]);

    return this.continueWithOpenAI(answer.content as string, codeNow, setMessages, setAICode, true);
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
