import { createWorkflow } from "@/workers/chat-utils-langchain.worker";

// Example usage of the chat workflow
const example = async () => {
  // Initialize the workflow with initial state
  const workflow = await createWorkflow({
    code: `// Initial code to modify
function example() {
  console.log("Hello");
}`,
    debugLogs: ["Starting workflow"],
  });

  // Example prompt that includes code modification instructions
  const prompt = `Please modify the code to add a parameter 'name' and use it in the console.log.
Here's how:

<<<<<<< SEARCH
function example() {
  console.log("Hello");
}
=======
function example(name: string) {
  console.log("Hello, " + name);
}
>>>>>>> REPLACE
`;

  // Execute the workflow
  const finalState = await workflow.invoke(prompt);

  // The finalState contains:
  console.log({
    // The modified code
    code: finalState.code,
    // Any errors that occurred
    lastError: finalState.lastError,
    // Debug logs
    debugLogs: finalState.debugLogs,
    // Final messages including AI responses
    messages: finalState.messages,
  });
};

// To use in browser/worker context
Object.assign(globalThis, { example });

// For Node.js/testing context
export { example };

// Example of handling messages with broadcast channel
const setupMessageHandler = () => {
  const channel = new BroadcastChannel("code-updates");
  
  channel.onmessage = (event) => {
    const { code, isStreaming, messages, debugLogs } = event.data;
    
    // Handle code updates
    if (code) {
      console.log("Code updated:", code);
    }
    
    // Handle streaming status
    if (typeof isStreaming === "boolean") {
      console.log("Streaming status:", isStreaming);
    }
    
    // Handle message updates
    if (messages) {
      console.log("New messages:", messages);
    }
    
    // Handle debug logs
    if (debugLogs) {
      console.log("Debug logs:", debugLogs);
    }
  };

  return channel;
};

// Example setup and usage
export const setupAndRun = async () => {
  const channel = setupMessageHandler();
  
  try {
    await example();
  } finally {
    channel.close();
  }
};

// Run the example
// setupAndRun().catch(console.error);
