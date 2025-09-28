import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getD1Database,
  getUserByClerkId,
  createOrUpdateUser,
  getConversationById,
  createMessage,
  updateConversation,
} from "../../../lib/db-helpers";

// Helper to extract user ID from request
function getUserIdFromRequest(request: NextRequest): string | null {
  // Check various auth sources
  const authToken = request.headers.get("authorization")?.replace("Bearer ", "") ||
                   request.cookies.get("auth_token")?.value;

  // Try to get Clerk user ID from various sources
  const clerkUserId = request.cookies.get("__clerk_user_id")?.value ||
                     request.headers.get("x-clerk-user-id") ||
                     (authToken?.startsWith("clerk_") ? authToken.split("_")[1] : null);

  return clerkUserId || authToken || null;
}

// Helper to get user info from localStorage/cookies
function getUserInfoFromRequest(request: NextRequest): { id: string; email: string } | null {
  // Try to get user info from localStorage (passed as header)
  const userDataHeader = request.headers.get("x-user-data");
  if (userDataHeader) {
    try {
      return JSON.parse(userDataHeader);
    } catch (_e) {
      // Invalid JSON
    }
  }

  // Try to get from auth token
  const userId = getUserIdFromRequest(request);
  if (userId) {
    return {
      id: userId,
      email: "unknown@example.com", // Default email
    };
  }

  return null;
}

// Simple AI response generation for demo
async function generateAIResponse(userMessage: string): Promise<string> {
  // In production, this would call a real AI API (OpenAI, Anthropic, etc.)
  const responses = {
    react: "React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Meta. React uses a component-based architecture where you build reusable UI components that manage their own state. Key features include the virtual DOM for efficient updates, JSX syntax for writing component templates, and hooks for managing state and side effects in functional components.",
    javascript: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It's a dynamic, weakly typed, prototype-based language with first-class functions. JavaScript is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.",
    hello: "Hello! I'm your AI assistant. I'm here to help you with questions about programming, technology, and more. Feel free to ask me anything!",
    default: "I understand you're asking about that topic. While I'm a demo AI without full capabilities, in a production environment, I would provide detailed, helpful information based on your query. For now, I can help with basic questions about React, JavaScript, and web development.",
  };

  // Simple keyword matching for demo
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes("react")) return responses.react;
  if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) return responses.javascript;
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) return responses.hello;

  return responses.default;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    const userInfo = getUserInfoFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { conversationId, content } = body;

    if (!conversationId || !content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getD1Database();
    if (!db) {
      // Fallback to in-memory storage for local development
      const storage = globalThis.conversationsStorage || new Map();
      let conversation = storage.get(conversationId);

      if (!conversation) {
        // Create conversation if it doesn't exist
        conversation = {
          id: conversationId,
          title: "New Conversation",
          model: "claude-3-sonnet",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: userId,
          messages: [],
        };
        storage.set(conversationId, conversation);
        globalThis.conversationsStorage = storage;
      }

      // Add user message
      const userMessage = {
        id: `msg-${Date.now()}`,
        conversation_id: conversationId,
        role: "user",
        content,
        created_at: new Date().toISOString(),
      };

      conversation.messages = conversation.messages || [];
      conversation.messages.push(userMessage);

      // Generate AI response
      const aiResponseContent = await generateAIResponse(content);
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        conversation_id: conversationId,
        role: "assistant",
        content: aiResponseContent,
        created_at: new Date().toISOString(),
      };

      conversation.messages.push(aiMessage);
      conversation.updated_at = new Date().toISOString();

      // Update conversation title if it's the first message
      if (conversation.messages.length === 2 && conversation.title === "New Conversation") {
        conversation.title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
      }

      return NextResponse.json({
        success: true,
        data: {
          id: aiMessage.id,
          content: aiResponseContent,
          creditsRemaining: 9,
        },
      });
    }

    // Get or create user in database if it's a Clerk ID
    let dbUser = null;
    if (userId.startsWith("user_")) {
      dbUser = await getUserByClerkId(db, userId);

      if (!dbUser && userInfo) {
        dbUser = await createOrUpdateUser(db, {
          clerk_id: userId,
          email: userInfo.email,
        });
      }
    }

    if (!dbUser) {
      // Cannot send message without user in database
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Verify conversation exists and belongs to user
    const conversation = await getConversationById(db, conversationId);
    if (!conversation) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      );
    }

    if (conversation.user_id !== dbUser.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Add user message to database
    const _userMessage = await createMessage(db, {
      conversation_id: conversationId,
      role: "user",
      content,
    });

    // Generate AI response
    const aiResponseContent = await generateAIResponse(content);

    // Add assistant message to database
    const aiMessage = await createMessage(db, {
      conversation_id: conversationId,
      role: "assistant",
      content: aiResponseContent,
      model: conversation.model || "claude-3-sonnet",
    });

    // Update conversation title if it's the first exchange
    if (!conversation.title || conversation.title === "New Conversation") {
      const newTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "");
      await updateConversation(db, conversationId, { title: newTitle });
    }

    // In production, track actual credits
    const creditsRemaining = 9;

    return NextResponse.json({
      success: true,
      data: {
        id: aiMessage.id,
        content: aiResponseContent,
        creditsRemaining,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// Edge runtime not supported with OpenNext
// export const runtime = "edge";