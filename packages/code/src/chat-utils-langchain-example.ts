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

    // Example: User sends a natural language request - showing proper structure matching
  const userRequest1 = "Add a password field to users and hash it before storing";
  
  // Example showing structure mismatch (this will fail with helpful error)
  const userRequest2 = "Update the User type with password field";

  // Run examples:
  
  console.log("Example 1: Modifying existing class structure");

  // The AI system will:
  // 1. Read the current code from currentFileContent
  // 2. Analyze the requirement and current code structure
  // 3. Generate response in the correct search/replace format
  const result1 = await workflow.invoke(userRequest1);

  console.log("Result of proper structure matching:", {
    userRequest: userRequest1,
    aiResponse: result1.messages,
    modifiedCode: result1.code,
    debugLogs: result1.debugLogs,
  });

  console.log("\nExample 2: Demonstrating structure mismatch handling");
  
  const result2 = await workflow.invoke(userRequest2);

  console.log("Result showing structure mismatch error:", {
    userRequest: userRequest2,
    aiResponse: result2.messages,
    // The code remains unchanged when modification fails
    modifiedCode: result2.code,
    debugLogs: result2.debugLogs,
  });
};

// Simulating reading from active editor with sample code
async function getCurrentFileContent(): Promise<string> {
  // Note: In a real implementation, this would get content from the active editor
  // For this example, we use a class-based implementation to demonstrate structure handling
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
