import { createWorkflow } from "@/workers/chat-utils-langchain.worker";
import { HumanMessage } from "@langchain/core/messages";

import { ICodeSession } from "@/lib/interfaces";

// Example usage of the chat workflow that demonstrates AI code modifications
const example = async (userRequest: string) => {
  // In a real system, this would be read from the active editor
  const currentFileContent = (globalThis as unknown as {
    cSess: {
      session: ICodeSession
    };
  }).cSess.session.code

  // Initialize the workflow with code context and instructions
  const workflow = await createWorkflow({
    code: currentFileContent,
    debugLogs: [
      "Starting workflow with current file content"
    ],
    messages: [
      new HumanMessage(
        `SYSTEM: You are a code modification assistant. IMMEDIATELY modify the code based on user requests using search/replace blocks. NO conversation or clarification - just output the modifications.

CURRENT CODE:
${currentFileContent}

REQUIRED FORMAT:
<<<<<<< SEARCH
[exact lines from current code]
=======
[replacement lines with requested changes]
>>>>>>> REPLACE

EXAMPLE - If asked to rename a method:
<<<<<<< SEARCH
  addUser(name: string) {
=======
  createUser(name: string) {
>>>>>>> REPLACE

IMPORTANT: Make sure your SEARCH block matches the code EXACTLY. Do not ask questions - just output the modifications.`
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

// Simulating reading from active editor with sample code
async function getCurrentFileContent(): Promise<string> {
  // Note: In a real implementation, this would get content from the active editor
  // For this example, we use a class-based implementation that will be modified to:
  // 1. Add password field to user type
  // 2. Add bcrypt import for password hashing
  // 3. Make addUser async to handle password hashing
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
export const setupAndRun = async (prompt: string) => {
  const channel = setupMessageHandler();

  try {
    await example(prompt);
  } finally {
    channel.close();
  }
};

// Run the example
// setupAndRun().catch(console.error);
