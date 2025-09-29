import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  getD1Database,
  getUserByClerkId,
  createOrUpdateUser,
  getConversationsByUserId,
  createConversation,
} from "../../../lib/db-helpers";

export async function GET(_request: NextRequest) {
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
      const conversations = Array.from(storage.values()).filter(
        (conv: { user_id: string }) => conv.user_id === userId
      );

      return NextResponse.json({
        success: true,
        data: conversations,
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

    const conversations = await getConversationsByUserId(db, dbUser.id);

    return NextResponse.json({
      success: true,
      data: conversations,
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
    // Get authenticated user ID from Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const db = getD1Database();
    if (!db) {
      // Fallback to in-memory storage for local development
      const conversationId = `conv-${Date.now()}`;
      const conversation = {
        id: conversationId,
        title: body.title || "New Conversation",
        model: body.model || "claude-3-sonnet",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: userId,
        messages: [],
      };

      const storage = globalThis.conversationsStorage || new Map();
      storage.set(conversationId, conversation);
      globalThis.conversationsStorage = storage;

      return NextResponse.json({
        success: true,
        data: conversation,
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

    const conversation = await createConversation(db, {
      user_id: dbUser.id,
      title: body.title,
      model: body.model,
    });

    return NextResponse.json({
      success: true,
      data: conversation,
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