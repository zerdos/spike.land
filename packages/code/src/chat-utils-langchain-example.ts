import { createWorkflow } from "@/workers/chat-utils-langchain.worker";
import { HumanMessage } from "@langchain/core/messages";

import { ICode } from "@/lib/interfaces";

import initialClaudeSrc from "./config/initial-claude.txt";
import { getBroadcastChannel } from "@/lib/broadcast-channel";



// Example usage of the chat workflow that demonstrates AI code modifications
const example = async (userRequest: string, cSess: ICode, channel: BroadcastChannel) => {
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

  // Apply the AI-generated patches to the original code
  const applyPatches = (original: string, patches: Array<{ search: string, replace: string }>) => {
    let code = original;
    for (const patch of patches) {
      code = code.replace(patch.search, patch.replace);
    }
    return code;
  };
  const finalCode = applyPatches(currentFileContent, result1.patches);
  
  console.log("Result of proper structure matching:", {
    userRequest: userRequest,
    aiResponse: result1.messages,
    modifiedCode: finalCode,
    debugLogs: result1.debugLogs,
  });

  // Send the properly modified code through the channel
  channel.postMessage({
    code: finalCode,
    messages: result1.messages,
    debugLogs: result1.debugLogs
  });
};


// Example setup and usage
export const setupAndRun = async (prompt: string, cSess: ICode) => {
 const channel = getBroadcastChannel(await cSess.getCodeSpace());
 
  try {
    await example(prompt, cSess, channel);
  } finally {
    channel.close();
  }
};

// Run the example
// setupAndRun().catch(console.error);
