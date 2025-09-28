import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getD1Database,
  getConversationWithMessages,
  getConversationById,
  deleteConversation as deleteConversationFromDb,
  getUserByClerkId,
} from "../../../../lib/db-helpers";

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = getD1Database();
    if (!db) {
      // Fallback to in-memory storage for local development
      const storage = globalThis.conversationsStorage || new Map();
      const conversation = storage.get(params.id);

      if (!conversation) {
        return NextResponse.json(
          { success: false, error: "Conversation not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          conversation: {
            id: conversation.id,
            title: conversation.title,
            model: conversation.model,
            created_at: conversation.created_at,
            updated_at: conversation.updated_at,
          },
          messages: conversation.messages || [],
        },
      });
    }

    // Try to get user from database if it's a Clerk ID
    const dbUser = userId.startsWith("user_") ? await getUserByClerkId(db, userId) : null;

    // Get conversation with messages from database
    const conversationData = await getConversationWithMessages(db, params.id);

    if (!conversationData) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Verify user owns this conversation (if we have user data)
    if (dbUser && conversationData.user_id !== dbUser.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Format timestamps for frontend
    const formatTimestamp = (ts: number | string) => {
      if (typeof ts === "number") {
        return new Date(ts * 1000).toISOString();
      }
      return ts; // Already formatted
    };

    return NextResponse.json({
      success: true,
      data: {
        conversation: {
          id: conversationData.id,
          title: conversationData.title,
          model: conversationData.model,
          created_at: formatTimestamp(conversationData.created_at),
          updated_at: formatTimestamp(conversationData.updated_at),
        },
        messages: conversationData.messages.map((msg: Record<string, unknown>) => ({
          id: msg.id,
          conversation_id: msg.conversation_id,
          role: msg.role,
          content: msg.content,
          created_at: formatTimestamp(msg.created_at),
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch conversation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = getD1Database();
    if (!db) {
      // Fallback to in-memory storage for local development
      const storage = globalThis.conversationsStorage || new Map();

      if (!storage.has(params.id)) {
        return NextResponse.json(
          { success: false, error: "Conversation not found" },
          { status: 404 }
        );
      }

      storage.delete(params.id);

      return NextResponse.json({
        success: true,
        message: "Conversation deleted successfully",
      });
    }

    // Try to get user from database if it's a Clerk ID
    const dbUser = userId.startsWith("user_") ? await getUserByClerkId(db, userId) : null;

    // Verify conversation exists
    const conversation = await getConversationById(db, params.id);
    if (!conversation) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Verify user owns this conversation (if we have user data)
    if (dbUser && conversation.user_id !== dbUser.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete conversation (messages will be cascade deleted)
    const deleted = await deleteConversationFromDb(db, params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Failed to delete conversation" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}

// Edge runtime not supported with OpenNext
// export const runtime = "edge";