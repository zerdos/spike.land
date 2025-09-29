import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  getD1Database,
  getConversationWithMessages,
  getConversationById,
  deleteConversation as deleteConversationFromDb,
  getUserByClerkId,
  createOrUpdateUser,
} from "../../../../lib/db-helpers";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user ID from Clerk
    const { userId } = await auth();
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

      if (conversation.user_id !== userId) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 403 }
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

    // Get user from database
    let dbUser = await getUserByClerkId(db, userId);

    if (!dbUser) {
      // Get current user info from Clerk to create database user
      const clerkUser = await currentUser();
      if (clerkUser) {
        dbUser = await createOrUpdateUser(db, {
          clerk_id: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          username: clerkUser.username || undefined,
          first_name: clerkUser.firstName || undefined,
          last_name: clerkUser.lastName || undefined,
          avatar_url: clerkUser.imageUrl || undefined,
        });
      }
    }

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Get conversation with messages from database
    const conversationData = await getConversationWithMessages(db, params.id);

    if (!conversationData) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Verify user owns this conversation
    if (conversationData.user_id !== dbUser.id) {
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
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user ID from Clerk
    const { userId } = await auth();
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

      if (conversation.user_id !== userId) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 403 }
        );
      }

      storage.delete(params.id);
      globalThis.conversationsStorage = storage;

      return NextResponse.json({
        success: true,
        message: "Conversation deleted successfully",
      });
    }

    // Get user from database
    let dbUser = await getUserByClerkId(db, userId);

    if (!dbUser) {
      // Get current user info from Clerk to create database user
      const clerkUser = await currentUser();
      if (clerkUser) {
        dbUser = await createOrUpdateUser(db, {
          clerk_id: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          username: clerkUser.username || undefined,
          first_name: clerkUser.firstName || undefined,
          last_name: clerkUser.lastName || undefined,
          avatar_url: clerkUser.imageUrl || undefined,
        });
      }
    }

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Verify conversation exists
    const conversation = await getConversationById(db, params.id);
    if (!conversation) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Verify user owns this conversation
    if (conversation.user_id !== dbUser.id) {
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