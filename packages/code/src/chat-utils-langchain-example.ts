import { createWorkflow } from "@/workers/chat-utils-langchain.worker";

// Example usage of the chat workflow that demonstrates AI code modifications
const example = async () => {
  // In a real system, this would be read from the active editor
  const currentFileContent = await getCurrentFileContent();

  // Initialize the workflow with the current file content
  const workflow = await createWorkflow({
    code: currentFileContent,
    debugLogs: [
      "Starting workflow with current file content",
      // Instructions for the AI system on how to format modifications
      `FORMAT INSTRUCTIONS:
When modifying code, format your response using search/replace blocks:

<<<<<<< SEARCH
[exact lines to find]
=======
[new lines to replace with]
>>>>>>> REPLACE

Example:
<<<<<<< SEARCH
function add(a: number) {
  return a;
}
=======
function add(a: number, b: number) {
  return a + b;
}
>>>>>>> REPLACE`,
    ],
  });

  // Example: User sends a natural language request
  const userRequest = "Add a password field to users and hash it before storing";

  // The AI system would:
  // 1. Read the current code from currentFileContent
  // 2. Analyze the requirement
  // 3. Generate response in the correct search/replace format
  const result = await workflow.invoke(userRequest);

  console.log({
    // Original request
    userRequest,
    // AI's response will include search/replace blocks
    aiResponse: result.messages,
    // The modified code after applying the changes
    modifiedCode: result.code,
    // Debug logs showing the AI's thought process
    debugLogs: result.debugLogs,
  });
};

// Simulating reading from active editor
async function getCurrentFileContent(): Promise<string> {
  // In a real implementation, this would get the content from the active editor
  // For this example, we'll use a sample class
  return `class UserManager {
  private users: { id: number; name: string; }[] = [];
  private nextId = 1;

  addUser(name: string) {
    const user = { id: this.nextId++, name };
    this.users.push(user);
    return user;
  }

  getUser(id: number) {
    return this.users.find(user => user.id === id);
  }
}`;
}

// To use in browser/worker context
Object.assign(globalThis, { example });

// For Node.js/testing context
export { example };

// Example of handling messages with broadcast channel
const setupMessageHandler = () => {
  const channel = new BroadcastChannel("code-updates");

  channel.onmessage = (event) => {
    const { code, isStreaming, messages, debugLogs } = event.data;

    if (code) {
      // The code after applying the AI's search/replace blocks
      console.log("Modified code:", code);
    }

    if (typeof isStreaming === "boolean") {
      console.log("Processing request:", isStreaming);
    }

    if (messages) {
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
