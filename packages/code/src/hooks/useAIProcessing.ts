import { Message } from '../ChatDrawer';
import { gptSystem } from '../initialMessage';
import { prettier } from '../shared';

export const useAIProcessing = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>,
  onCodeUpdate: (code: string) => void,
  setAICode: React.Dispatch<React.SetStateAction<string>>
) => {
  const sendToAnthropic = async (content: string, prevMessages: Message[]): Promise<string> => {
    const response = await fetch("/anthropic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...prevMessages.filter(msg => msg.role !== "user"), { role: "user", content }]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      fullResponse += chunk;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        lastMessage.content = fullResponse;
        return updatedMessages;
      });
    }

    return fullResponse;
  };

  const continueWithOpenAI = async (fullResponse: string, codeNow: string) => {
    setIsStreaming(true);
    let code = '';
    const responseOpenAI = await fetch("/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{
          "role": "system",
          "content": gptSystem
        }, {
          "role": "user",
          "content": codeNow + `
            **** instructions ****
          ` + fullResponse
        }]
      })
    });

    if (!responseOpenAI.ok) {
      throw new Error(`HTTP error! status: ${responseOpenAI.status}`);
    }

    const reader = responseOpenAI.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is not readable!");
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const chunk = decoder.decode(value);
      code += chunk;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        lastMessage.content = fullResponse + `
          
        ` + code;
        return updatedMessages;
      });
    }

    const codeModificationRegex = /```(?:typescript?|javascript?)\n([\s\S]*?)```/g;
    const matches = code.match(codeModificationRegex);

    if (matches) {
      const modifiedCode = matches[matches.length - 1].replace(
        /```(?:typescript?|javascript?)\n|```/g,
        "",
      );
      onCodeUpdate(modifiedCode);
      setAICode(modifiedCode);
    }
    setIsStreaming(false);
  };

  return { sendToAnthropic, continueWithOpenAI };
};
