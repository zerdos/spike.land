import debounce from "lodash.debounce";
import { anthropic, gptSystem, reminder } from "../config/aiConfig";
import { prettierToThrow } from "../shared";
import { Message } from "../types/Message";
import { LocalStorageService } from "./LocalStorageService";

export class AIService {
  private localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
  }

  async sendToAnthropic(messages: Message[], onUpdate: (code: string)=> void): Promise<Message> {
    const response = await fetch("/anthropic", {
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

    let c = "";
    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      c += chunk;
      onUpdate(c);
    }

    onUpdate(c);

    assistantMessage.content = c.trim();

    this.localStorageService.saveAIInteraction(
      messages[messages.length - 1].content,
      assistantMessage.content,
    );

    return assistantMessage;
  }

  async continueWithOpenAI(
    fullResponse: string,
    codeNow: string,
    onCodeUpdate: (code: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
    isRetry = false,
  ): Promise<string | void> {
    console.log(fullResponse);

    let code = "";
    const responseOpenAI = await fetch("/openai", {
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
          "content": codeNow + `
            **** instructions ****
          ` + fullResponse,
        }],
      }),
    });

    if (!responseOpenAI.ok) {
      throw new Error(`HTTP error! status: ${responseOpenAI.status}`);
    }

    const reader = responseOpenAI.body?.getReader();
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

    const codeModificationRegex =
      /```(?:typescript?|tsx?|jsx?|javascript?)\n([\s\S]*?)```/g;
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

        if (!isRetry) {
          console.log("asking for help, from Claude");
          const errorTextWithAllTheCode = { error }.toString();
          const message: Message = {
            "id": (Date.now() + 1).toString(),
            "role": "user",
            "content": `
            ${codeNow} 
            
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

          const answer = await this.sendToAnthropic([...prevMessages, message], debouncedSetMessages);
          setMessages((prevMessages) => [...prevMessages, answer]);
          await this.continueWithOpenAI(
            answer.content,
            modifiedCode,
            onCodeUpdate,
            setMessages,
            setAICode,
            true,
          );
        } else {
          console.error("Error in runner:", error);
        }
      }
    }
  }

  prepareClaudeContent(
    content: string,
    messages: Message[],
    codeNow: string,
    codeSpace: string,
  ): string {
    if (
      messages.length == 0 || codeNow !== messages[messages.length - 1]?.content
    ) {
      return anthropic(
        {
          fileName: codeSpace,
          fileContent: codeNow,
          userPrompt: content,
        },
      );
    } else {
      return reminder({ userPrompt: content });
    }
  }
}
