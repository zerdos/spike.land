import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getD1Database,
  getUserByClerkId,
  createOrUpdateUser,
  getConversationsByUserId,
  createConversation,
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

export async function GET(request: NextRequest) {
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
      const userConversations = Array.from(storage.values()).map((conv: Record<string, unknown>) => ({
        id: conv.id,
        title: conv.title,
        model: conv.model,
        created_at: conv.created_at,
        updated_at: conv.updated_at,
      }));

      return NextResponse.json({
        success: true,
        data: userConversations,
      });
    }

    // Get or create user in database if it's a Clerk ID
    let dbUser = null;
    if (userId.startsWith("user_")) {
      dbUser = await getUserByClerkId(db, userId);

      if (!dbUser) {
        // Try to create user with available info
        const userInfo = getUserInfoFromRequest(request);
        if (userInfo) {
          dbUser = await createOrUpdateUser(db, {
            clerk_id: userId,
            email: userInfo.email,
          });
        }
      }
    }

    if (!dbUser) {
      // For non-Clerk auth, return empty conversations
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Get user's conversations from database
    const conversations = await getConversationsByUserId(db, dbUser.id);

    // Format timestamps for frontend
    const formatTimestamp = (ts: number | string) => {
      if (typeof ts === "number") {
        return new Date(ts * 1000).toISOString();
      }
      return ts;
    };

    const formattedConversations = conversations.map((conv: Record<string, unknown>) => ({
      id: conv.id,
      user_id: conv.user_id,
      title: conv.title,
      model: conv.model,
      created_at: formatTimestamp(conv.created_at),
      updated_at: formatTimestamp(conv.updated_at),
      message_count: conv.message_count || 0,
    }));

    return NextResponse.json({
      success: true,
      data: formattedConversations,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
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
    const { title, model = "claude-3-sonnet" } = body;

    const db = getD1Database();
    if (!db) {
      // Fallback to in-memory storage for local development
      const storage = globalThis.conversationsStorage || new Map();
      const conversation = {
        id: `conv-${Date.now()}`,
        title: title || "New Conversation",
        model,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: userId,
        messages: [],
      };

      storage.set(conversation.id, conversation);
      globalThis.conversationsStorage = storage;

      return NextResponse.json({
        success: true,
        data: {
          id: conversation.id,
          title: conversation.title,
          model: conversation.model,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
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
      // Cannot create conversation without user in database
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Create conversation in database
    const conversation = await createConversation(db, {
      user_id: dbUser.id,
      title: title || "New Conversation",
      model,
    });

    // Format timestamps for frontend
    const formatTimestamp = (ts: number | string) => {
      if (typeof ts === "number") {
        return new Date(ts * 1000).toISOString();
      }
      return ts;
    };

    return NextResponse.json({
      success: true,
      data: {
        id: conversation.id,
        user_id: conversation.user_id,
        title: conversation.title,
        model: conversation.model,
        created_at: formatTimestamp(conversation.created_at),
        updated_at: formatTimestamp(conversation.updated_at),
      },
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create conversation" },
      { status: 500 }
    );
  }
}

// Edge runtime not supported with OpenNext
// export const runtime = "edge";