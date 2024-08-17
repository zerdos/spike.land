import { debounce } from "es-toolkit";
import { anthropic, gptSystem, reminder } from "../config/aiConfig";
import { prettierToThrow } from "../shared";
import { Message, MessageContent } from "../types/Message";
import { LocalStorageService } from "./LocalStorageService";
import { runner } from "./runner";

interface AIModelResponse {
  content: string;
  id: string;
}

export interface AIServiceConfig {
  gpt4oEndpoint: string;
  anthropicEndpoint: string;
  openAIEndpoint: string;
}

export class AIService {
  private localStorageService: LocalStorageService;
  private config: AIServiceConfig;

  constructor(localStorageService: LocalStorageService, config: AIServiceConfig) {
    this.localStorageService = localStorageService;
    this.config = config;
  }

  private async makeAPICall(endpoint: string, messages: Message[]): Promise<Response> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  private async handleStreamingResponse(
    response: Response,
    onUpdate: (code: string) => void,
  ): Promise<AIModelResponse> {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    let content = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      content += chunk;
      onUpdate(content);
    }

    return {
      id: (Date.now() + 1).toString(),
      content: content.trim(),
    };
  }

  private saveInteraction(userMessage: string | object, assistantMessage: string | MessageContent): void {
    const msgToSave = typeof userMessage === "string" ? userMessage : JSON.stringify(userMessage);
    const assistantMsg = typeof assistantMessage === "string" ? assistantMessage : JSON.stringify(assistantMessage);
    this.localStorageService.saveAIInteraction(msgToSave, assistantMsg);
  }

  async sendToAI(
    endpoint: string,
    messages: Message[],
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    const mappedMessages: Message[] = messages.map((message, index) => ({
      id: (Date.now() + index + 1).toString(),
      role: message.role,
      content: message.content,
    }));

    const response = await this.makeAPICall(endpoint, mappedMessages);
    const result = await this.handleStreamingResponse(response, onUpdate);

    const assistantMessage: Message = {
      id: result.id,
      role: "assistant",
      content: result.content,
    };

    const userMessage = mappedMessages[mappedMessages.length - 1].content;
    this.saveInteraction(userMessage, assistantMessage.content);

    return assistantMessage;
  }

  async sendToGpt4o(messages: Message[], onUpdate: (code: string) => void): Promise<Message> {
    return this.sendToAI(this.config.gpt4oEndpoint, messages, onUpdate);
  }

  async sendToAnthropic(messages: Message[], onUpdate: (code: string) => void): Promise<Message> {
    return this.sendToAI(this.config.anthropicEndpoint, messages, onUpdate);
  }

  async continueWithOpenAI(
    fullResponse: string,
    codeNow: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
    isRetry = false,
  ): Promise<string | void> {
    console.log(fullResponse);

    const messages = [
      { role: "system" as const, content: gptSystem },
      { role: "user" as const, content: `${codeNow}\n**** instructions ****\n${fullResponse}` },
    ] as Message[];

    const debouncedSetMessages = debounce((newCode: string) => {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { ...prevMessages[prevMessages.length - 1], content: `${fullResponse}\n${newCode}` },
      ]);
    }, 100);

    try {
      const response = await this.sendToAI(this.config.openAIEndpoint, messages, debouncedSetMessages);
      const modifiedCode = this.extractCodeFromResponse(response.content);
      const prettyCode = await this.formatAndRunCode(modifiedCode);
      setAICode(prettyCode);
      return prettyCode;
    } catch (error) {
      console.error("Error in AI code processing:", error);
      if (!isRetry) {
        return this.retryWithClaude(fullResponse, codeNow, error, setMessages, setAICode);
      }
    }
  }

  private extractCodeFromResponse(response: string | MessageContent): string {
    if (typeof response === "string") {
      const codeModificationRegex = /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
      const matches = response.match(codeModificationRegex);
      if (!matches) {
        throw new Error("No code block found in the response");
      }
      return matches[matches.length - 1].replace(/```(?:typescript?|tsx?|jsx?|javascript?)\n|```/g, "");
    } else {
      throw new Error("Invalid response content");
    }
  }

  private async formatAndRunCode(code: string): Promise<string> {
    const prettyCode = await prettierToThrow({ code, toThrow: true });
    if (await runner(prettyCode) === false) {
      throw new Error("Error in runner");
    }
    return prettyCode;
  }

  private async retryWithClaude(
    fullResponse: string,
    codeNow: string,
    error: unknown, // Change the type of 'error' to 'unknown'
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
  ): Promise<string | void> {
    console.log("asking for help from Claude");
    const message: Message = {
      id: (Date.now() + 1).toString(),
      role: "user",
      content: `${codeNow}\n**** instructions ****\n${fullResponse}\n**** error ****\n${
        (error as Error).toString()
      }\nCould you help me with this error? I'm stuck.`,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    const prevMessages = this.localStorageService.loadMessages();
    const answer = await this.sendToAnthropic([...prevMessages, message], (code) => {
      setMessages((prevMessages) => [...prevMessages, { ...message, content: code }]);
    });
    setMessages((prevMessages) => [...prevMessages, answer]);

    return this.continueWithOpenAI(answer.content as unknown as string, codeNow, setMessages, setAICode, true);
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
