import debounce from "lodash.debounce";
import { anthropic, gptSystem, reminder } from "../config/aiConfig";
import { prettierToThrow } from "../shared";
import { Message } from "../types/Message";
import { LocalStorageService } from "./LocalStorageService";

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
    console.log("Starting continueConversation");
    console.log("Full response:", fullResponse);
    console.log("Current code:", currentCode);

    let code = "";
    console.log("Sending request to /ai");
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
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Response received, starting to read");
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      console.error("Response body is not readable!");
      throw new Error("Response body is not readable!");
    }

    console.log("Setting up debounced message update");
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
        console.log("Finished reading response");
        break;
      }

      const chunk = decoder.decode(value);
      code += chunk;

      console.log("Received chunk:", chunk);
      debouncedSetMessages(code);
    }

    console.log("Final code received:", code);
    this.localStorageService.saveAIInteraction(fullResponse, code);

    console.log("Processing code response");
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
    console.log("Searching for code blocks in response");
    const codeModificationRegex = /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
    const matches = code.match(codeModificationRegex);

    if (matches) {
      console.log("Found code blocks:", matches.length);
      const modifiedCode = matches[matches.length - 1].replace(
        /```(?:typescript?|tsx?|jsx?|javascript?)\n|```/g,
        "",
      );

      console.log("Extracted modified code:", modifiedCode);

      try {
        console.log("Attempting to prettify code");
        const prettyCode = await prettierToThrow({
          code: modifiedCode,
          toThrow: true,
        });

        console.log("Code prettified successfully");
        onCodeUpdate(prettyCode);
        setAICode(prettyCode);

        return prettyCode;
      } catch (error) {
        console.error("Error prettifying AI code:", error);
        return this.handleCodeError(error, currentCode, fullResponse, modifiedCode, setMessages);
      }
    } else {
      console.warn("No code blocks found in the response");
      return this.handleCodeError(new Error("No code blocks found"), currentCode, fullResponse, code, setMessages);
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
      "content": `
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
          userPrompt: content,
        },
      );
    } else {
      return reminder({ userPrompt: content });
    }
  }
}
