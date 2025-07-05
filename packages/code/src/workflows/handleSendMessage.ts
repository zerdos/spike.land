import type { HandleSendMessageProps, Message } from "@/lib/interfaces";

/**
 * Handles sending a message to the backend API
 */
export async function handleSendMessage(
  { prompt, images, cSess: codeSession }: HandleSendMessageProps,
): Promise<void> {
  const codeSpace = codeSession.getCodeSpace();

  // Prepare the message content
  let messageContent = prompt;

  // If there are images, we might need to handle them differently
  // For now, we'll just mention them in the prompt
  if (images && images.length > 0) {
    messageContent += `\n\n[Note: ${images.length} image(s) attached]`;
  }

  try {
    // Send message to the backend API
    const response = await fetch(`/live/${codeSpace}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messageContent,
        role: "user",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    const result = await response.json();

    // The backend will handle adding messages to the session and broadcasting updates
    // The UI will update automatically through the WebSocket connection
    console.log("Message sent successfully:", result);
  } catch (error) {
    console.error("Error sending message:", error);

    // Add error message to the session so user knows something went wrong
    const errorMessage: Message = {
      id: crypto.randomUUID(),
      role: "system",
      content: `Error sending message: ${error instanceof Error ? error.message : "Unknown error"}`,
    };

    codeSession.addMessage(errorMessage);
  }
}
