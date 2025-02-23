import { createWorkflow } from "@/workers/chat-utils-langchain.worker";
import { HumanMessage } from "@langchain/core/messages";

import { ICode } from "@/lib/interfaces";

import initialClaudeSrc from "./config/initial-claude.txt";

// Example usage of the chat workflow that demonstrates AI code modifications
const example = async (userRequest: string, cSess: ICode) => {
  // In a real system, this would be read from the active editor
  const currentFileContent = await cSess.getCode();

  const fileName = cSess.getCodeSpace()+".tsx";

  // Initialize the workflow with code context and instructions
  const initialClaude = await fetch(initialClaudeSrc).then((res) => res.text());
  const workflow = await createWorkflow({
    code: currentFileContent,
    debugLogs: [
      "Starting workflow with current file content"
    ],
    messages: [
      new HumanMessage(initialClaude.replace("{{userPrompt}}", userRequest).replace("{{fileContent}}", currentFileContent).replace("{{fileName}}", fileName)
      )
    ]
  });

  // Example: User sends a natural language request
  // Run examples:
  

  // The AI system will:
  // 1. Read the current code from currentFileContent
  // 2. Analyze the requirement and current code structure
  // 3. Generate response in the correct search/replace format
  const result1 = await workflow.invoke(userRequest);

  console.log("Result of proper structure matching:", {
    userRequest: userRequest,
    aiResponse: result1.messages,
    modifiedCode: result1.code,
    debugLogs: result1.debugLogs,
  });

  
};


// Example of handling messages with broadcast channel
const setupMessageHandler = (cSess: ICode) => {
  const channel = new BroadcastChannel("code-updates");

  channel.onmessage = (event) => {
    const { code, isStreaming, messages, debugLogs } = event.data;

    if (code) {
      cSess.setCode(code);
      // The code after applying the AI's search/replace blocks
      console.log("Modified code:", code);
    }

    if (typeof isStreaming === "boolean") {
      console.log("Processing request:", isStreaming);
    }

    if (messages) {
      cSess.setMessages(messages);
      // The AI's response with search/replace blocks
      console.log("AI generated modifications:", messages);
    }

    if (debugLogs) {
      // The AI's analysis and thought process
      console.log("Analysis process:", debugLogs);
    }
  };

  return channel;
};

// Example setup and usage
export const setupAndRun = async (prompt: string) => {

  const cSess = (globalThis as unknown as {
    cSess: ICode
  }).cSess;

  const channel = setupMessageHandler(cSess);


  try {
    await example(prompt, cSess);
  } finally {
    channel.close();
  }
};

// Run the example
// setupAndRun().catch(console.error);
