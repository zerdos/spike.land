
import { anthropic, gptSystem, reminder } from "../config/aiConfig";
import { Message } from "../types/Message";
import { prettierToThrow } from "../shared";
import { LocalStorageService } from "./LocalStorageService";
import debounce from "lodash.debounce";

export class AIService {
  private localStorageService: LocalStorageService;

  constructor(private codeSpace: string) {
    this.localStorageService = new LocalStorageService(codeSpace);
  }

  async sendMessage(messages: Message[]): Promise<Message> {
    const response = await fetch("/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((x) => ({ role: x.role, content: x.content })),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let content = "";
    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    const debouncedUpdate = debounce((newContent: string) => {
      assistantMessage.id = (Date.now() + 1).toString();
      assistantMessage.content = newContent;
    }, 100);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      content += chunk;
      debouncedUpdate(content);
    }

    debouncedUpdate.flush();

    assistantMessage.content = content.trim();

    this.localStorageService.saveAIInteraction(messages[messages.length - 1].content, assistantMessage.content);

    return assistantMessage;
  }

  async continueConversation(
    fullResponse: string,
    currentCode: string,
    onCodeUpdate: (code: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
  ): Promise<string | void> {
    console.log(fullResponse);

    let code = "";
    const response = await fetch("/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{
          "role": "system",
          "content": gptSystem,
        }, {
          "role": "user",
          "content": currentCode + `
            **** instructions ****
          ` + fullResponse,
        }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    const debouncedSetMessages = debounce((newCode: string) => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const updatedLastMessage = {
          ...lastMessage,
          content: fullResponse + `\n` + newCode,
        };
        return [...prevMessages.slice(0, -1), updatedLastMessage];
      });
    }, 100);

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const chunk = decoder.decode(value);
      code += chunk;

      debouncedSetMessages(code); 
    }

    this.localStorageService.saveAIInteraction(fullResponse, code);

    return this.processCodeResponse(code, currentCode, fullResponse, onCodeUpdate, setMessages, setAICode);
  }

  private async processCodeResponse(
    code: string,
    currentCode: string,
    fullResponse: string,
    onCodeUpdate: (code: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
  ): Promise<string | void> {
    const codeModificationRegex = /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
    const matches = code.match(codeModificationRegex);

    if (matches) {
      const modifiedCode = matches[matches.length - 1].replace(
        /```(?:typescript?|tsx?|jsx?|javascript?)\n|```/g,
        "",
      );

      try {
        console.log("modifiedCode", modifiedCode);

        const prettyCode = await prettierToThrow({
          code: modifiedCode,
          toThrow: true,
        });

        onCodeUpdate(prettyCode);
        setAICode(prettyCode);

        return prettyCode;
      } catch (error) {
        console.error("Error AI code with prettier:", error);
        return this.handleCodeError(error, currentCode, fullResponse, modifiedCode, setMessages);
      }
    }
  }

  private async handleCodeError(
    error: any,
    currentCode: string,
    fullResponse: string,
    modifiedCode: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  ): Promise<void> {
    console.log("asking for help");
    const errorTextWithAllTheCode = { error }.toString();
    const message: Message = {
      "id": (Date.now() + 1).toString(),
      "role": "user",
      "content":  `
      ${currentCode} 
      
      **** instructions ****  
      ${fullResponse}

      ***** result *****

      ${modifiedCode}

      **** error ****

      ${errorTextWithAllTheCode}

      Could you help me with this error? I'm stuck.
      `,
    };

    setMessages((prevMessages) => [...prevMessages, message]);

    const prevMessages = this.localStorageService.loadMessages();

    const answer = await this.sendMessage([...prevMessages, message]);
    setMessages((prevMessages) => [...prevMessages, answer]);
  }

  prepareContent(
    content: string,
    messages: Message[],
    currentCode: string,
    codeSpace: string,
  ): string {
    if (
      messages.length === 0 || currentCode !== messages[messages.length - 1]?.content
    ) {
      return anthropic(
          {
              fileName: codeSpace, 
              fileContent: currentCode,
              userPrompt: content
          });
    } else {
      return reminder({userPrompt: content});
    }
  }
}
