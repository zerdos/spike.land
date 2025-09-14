import { nanoid } from "nanoid";
import { calculateCredits } from "../lib/stripe";
import type { APIResponse, Env, Message } from "../types";
import { AIService } from "../utils/ai";
import { AuthService } from "../utils/auth";

export class MessagesAPI {
  private env: Env;
  private auth: AuthService;
  private ai: AIService;

  constructor(env: Env) {
    this.env = env;
    this.auth = new AuthService(env);
    this.ai = new AIService(env);
  }

  async send(request: Request): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);

    if (!authContext) {
      return this.unauthorized();
    }

    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }

    try {
      const body = (await request.json()) as {
        conversationId: string;
        content: string;
        attachments?: Array<
          { filename: string; content: string | ArrayBuffer; contentType?: string; }
        >;
      };
      const { conversationId, content, attachments = [] } = body;

      if (!conversationId || !content) {
        return this.error("Missing required fields", 400);
      }

      const conversation = await this.env.DATABASE.prepare(
        "SELECT * FROM conversations WHERE id = ? AND user_id = ?",
      )
        .bind(conversationId, user.id)
        .first();

      if (!conversation) {
        return this.notFound();
      }

      const requiredCredits = calculateCredits(content);
      const hasCredits = await this.auth.checkUserCredits(user.id, requiredCredits);
      if (!hasCredits) {
        return this.error("Insufficient credits", 402);
      }

      const isSafe = await this.ai.moderateContent(content);
      if (!isSafe) {
        return this.error("Content violates our usage policy", 400);
      }

      const userMessageId = nanoid();
      await this.env.DATABASE.prepare(
        `INSERT INTO messages (id, conversation_id, user_id, role, content, created_at)
         VALUES (?, ?, ?, 'user', ?, datetime('now'))`,
      )
        .bind(userMessageId, conversationId, user.id, content)
        .run();

      if (attachments.length > 0) {
        await this.handleAttachments(userMessageId, user.id, attachments);
      }

      const { results: previousMessages } = await this.env.DATABASE.prepare(
        `SELECT role, content FROM messages 
         WHERE conversation_id = ? 
         ORDER BY created_at ASC 
         LIMIT 20`,
      )
        .bind(conversationId)
        .all();

      const messages = previousMessages.map((m: Record<string, unknown>) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content as string,
      }));

      const aiResponse = await this.ai.generateResponse({
        model: (conversation as Record<string, unknown>).model as string || "llama-2-7b",
        messages,
      });

      const tokens = await this.ai.countTokens(content + aiResponse);

      const assistantMessageId = nanoid();
      await this.env.DATABASE.prepare(
        `INSERT INTO messages (id, conversation_id, user_id, role, content, tokens_used, created_at)
         VALUES (?, ?, ?, 'assistant', ?, ?, datetime('now'))`,
      )
        .bind(assistantMessageId, conversationId, user.id, aiResponse, tokens)
        .run();

      await this.auth.deductCredits(user.id, requiredCredits);

      await this.env.DATABASE.prepare(
        "UPDATE conversations SET updated_at = datetime('now') WHERE id = ?",
      )
        .bind(conversationId)
        .run();

      if (!conversation.title || conversation.title === "New Conversation") {
        const newTitle = await this.ai.generateTitle(messages);
        await this.env.DATABASE.prepare(
          "UPDATE conversations SET title = ? WHERE id = ?",
        )
          .bind(newTitle, conversationId)
          .run();
      }

      const roomId = this.env.CHAT_ROOM.idFromName(conversationId);
      const room = this.env.CHAT_ROOM.get(roomId);

      await room.fetch("https://chat/broadcast", {
        method: "POST",
        body: JSON.stringify({
          type: "message",
          conversationId,
          message: {
            id: assistantMessageId,
            conversation_id: conversationId,
            user_id: user.id,
            role: "assistant",
            content: aiResponse,
            tokens_used: tokens,
            created_at: new Date().toISOString(),
          },
        }),
      });

      return this.json<Message>({
        success: true,
        data: {
          id: assistantMessageId,
          conversation_id: conversationId,
          user_id: user.id,
          role: "assistant",
          content: aiResponse,
          tokens_used: tokens,
          created_at: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Send message error:", error);
      return this.error("Failed to send message");
    }
  }

  async list(request: Request, conversationId: string): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);

    if (!authContext) {
      return this.unauthorized();
    }

    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }

    try {
      const conversation = await this.env.DATABASE.prepare(
        "SELECT * FROM conversations WHERE id = ? AND user_id = ?",
      )
        .bind(conversationId, user.id)
        .first();

      if (!conversation) {
        return this.notFound();
      }

      const url = new URL(request.url);
      const limit = parseInt(url.searchParams.get("limit") || "50");
      const offset = parseInt(url.searchParams.get("offset") || "0");

      const { results } = await this.env.DATABASE.prepare(
        `SELECT * FROM messages 
         WHERE conversation_id = ? 
         ORDER BY created_at DESC 
         LIMIT ? OFFSET ?`,
      )
        .bind(conversationId, limit, offset)
        .all();

      return this.json<Message[]>({
        success: true,
        data: results.reverse() as unknown as Message[],
      });
    } catch (error) {
      console.error("List messages error:", error);
      return this.error("Failed to fetch messages");
    }
  }

  async regenerate(request: Request, messageId: string): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);

    if (!authContext) {
      return this.unauthorized();
    }

    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }

    try {
      const message = await this.env.DATABASE.prepare(
        `SELECT m.*, c.model FROM messages m
         JOIN conversations c ON m.conversation_id = c.id
         WHERE m.id = ? AND m.user_id = ? AND m.role = 'assistant'`,
      )
        .bind(messageId, user.id)
        .first();

      if (!message) {
        return this.notFound();
      }

      const hasCredits = await this.auth.checkUserCredits(user.id);
      if (!hasCredits) {
        return this.error("Insufficient credits", 402);
      }

      const { results: previousMessages } = await this.env.DATABASE.prepare(
        `SELECT role, content FROM messages 
         WHERE conversation_id = ? AND created_at < (
           SELECT created_at FROM messages WHERE id = ?
         )
         ORDER BY created_at ASC`,
      )
        .bind(message.conversation_id, messageId)
        .all();

      const messages = previousMessages.map((m: Record<string, unknown>) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content as string,
      }));

      const aiResponse = await this.ai.generateResponse({
        model: (message as Record<string, unknown>).model as string || "llama-2-7b",
        messages,
        temperature: 0.8,
      });

      const tokens = await this.ai.countTokens(aiResponse);

      await this.env.DATABASE.prepare(
        `UPDATE messages 
         SET content = ?, tokens_used = ?, created_at = datetime('now')
         WHERE id = ?`,
      )
        .bind(aiResponse, tokens, messageId)
        .run();

      await this.auth.deductCredits(user.id);

      const roomId = this.env.CHAT_ROOM.idFromName(
        (message as Record<string, unknown>).conversation_id as string,
      );
      const room = this.env.CHAT_ROOM.get(roomId);

      await room.fetch("https://chat/broadcast", {
        method: "POST",
        body: JSON.stringify({
          type: "message",
          conversationId: message.conversation_id,
          message: {
            id: messageId,
            conversation_id: message.conversation_id,
            user_id: user.id,
            role: "assistant",
            content: aiResponse,
            tokens_used: tokens,
            created_at: new Date().toISOString(),
          },
        }),
      });

      return this.json<Message>({
        success: true,
        data: {
          id: messageId,
          conversation_id: (message as Record<string, unknown>).conversation_id as string,
          user_id: user.id,
          role: "assistant",
          content: aiResponse,
          tokens_used: tokens,
          created_at: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Regenerate message error:", error);
      return this.error("Failed to regenerate message");
    }
  }

  private async handleAttachments(
    messageId: string,
    userId: string,
    attachments: Array<{ filename: string; content: string | ArrayBuffer; contentType?: string; }>,
  ): Promise<void> {
    for (const attachment of attachments) {
      const { filename, content, contentType } = attachment;
      const r2Key = `attachments/${userId}/${messageId}/${filename}`;

      await this.env.R2_BUCKET.put(r2Key, content, {
        httpMetadata: {
          contentType: contentType || "application/octet-stream",
        },
      });

      await this.env.DATABASE.prepare(
        `INSERT INTO attachments (id, message_id, user_id, filename, content_type, size, r2_key, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      )
        .bind(
          nanoid(),
          messageId,
          userId,
          filename,
          contentType,
          typeof content === "string" ? content.length : content.byteLength,
          r2Key,
        )
        .run();
    }
  }

  private json<T = unknown>(response: APIResponse<T>): Response {
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private error(message: string, status: number = 500): Response {
    return new Response(
      JSON.stringify({
        success: false,
        error: message,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  private unauthorized(): Response {
    return this.error("Unauthorized", 401);
  }

  private notFound(): Response {
    return this.error("Not found", 404);
  }
}
