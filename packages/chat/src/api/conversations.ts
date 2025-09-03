import type { Env, Conversation, Message, APIResponse } from "../types";
import { AuthService } from "../utils/auth";
import { nanoid } from "nanoid";

export class ConversationsAPI {
  private env: Env;
  private auth: AuthService;
  
  constructor(env: Env) {
    this.env = env;
    this.auth = new AuthService(env);
  }
  
  async list(request: Request): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);
    
    if (!authContext) {
      return this.unauthorized();
    }
    
    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }
    
    try {
      const { results } = await this.env.DATABASE.prepare(
        `SELECT * FROM conversations 
         WHERE user_id = ? 
         ORDER BY updated_at DESC 
         LIMIT 50`
      )
        .bind(user.id)
        .all();
      
      return this.json<Conversation[]>({
        success: true,
        data: results as unknown as Conversation[],
      });
    } catch (error) {
      console.error("List conversations error:", error);
      return this.error("Failed to fetch conversations");
    }
  }
  
  async create(request: Request): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);
    
    if (!authContext) {
      return this.unauthorized();
    }
    
    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }
    
    try {
      const body = await request.json() as { title?: string; model?: string };
      const { title, model = "llama-2-7b" } = body;
      
      const id = nanoid();
      
      await this.env.DATABASE.prepare(
        `INSERT INTO conversations (id, user_id, title, model, created_at, updated_at)
         VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`
      )
        .bind(id, user.id, title || "New Conversation", model)
        .run();
      
      const conversation = await this.env.DATABASE.prepare(
        "SELECT * FROM conversations WHERE id = ?"
      )
        .bind(id)
        .first();
      
      return this.json<Conversation>({
        success: true,
        data: conversation as unknown as Conversation,
      });
    } catch (error) {
      console.error("Create conversation error:", error);
      return this.error("Failed to create conversation");
    }
  }
  
  async get(request: Request, conversationId: string): Promise<Response> {
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
        "SELECT * FROM conversations WHERE id = ? AND user_id = ?"
      )
        .bind(conversationId, user.id)
        .first();
      
      if (!conversation) {
        return this.notFound();
      }
      
      const { results: messages } = await this.env.DATABASE.prepare(
        `SELECT * FROM messages 
         WHERE conversation_id = ? 
         ORDER BY created_at ASC`
      )
        .bind(conversationId)
        .all();
      
      return this.json({
        success: true,
        data: {
          conversation,
          messages,
        },
      });
    } catch (error) {
      console.error("Get conversation error:", error);
      return this.error("Failed to fetch conversation");
    }
  }
  
  async delete(request: Request, conversationId: string): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);
    
    if (!authContext) {
      return this.unauthorized();
    }
    
    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }
    
    try {
      const result = await this.env.DATABASE.prepare(
        "DELETE FROM conversations WHERE id = ? AND user_id = ?"
      )
        .bind(conversationId, user.id)
        .run();
      
      if (result.meta.changes === 0) {
        return this.notFound();
      }
      
      return this.json({
        success: true,
        message: "Conversation deleted successfully",
      });
    } catch (error) {
      console.error("Delete conversation error:", error);
      return this.error("Failed to delete conversation");
    }
  }
  
  async updateTitle(
    request: Request,
    conversationId: string
  ): Promise<Response> {
    const authContext = await this.auth.verifyRequest(request);
    
    if (!authContext) {
      return this.unauthorized();
    }
    
    const user = await this.auth.getUserFromClerkId(authContext.clerkId);
    if (!user) {
      return this.unauthorized();
    }
    
    try {
      const { title } = await request.json() as { title: string };
      
      const result = await this.env.DATABASE.prepare(
        `UPDATE conversations 
         SET title = ?, updated_at = datetime('now')
         WHERE id = ? AND user_id = ?`
      )
        .bind(title, conversationId, user.id)
        .run();
      
      if (result.meta.changes === 0) {
        return this.notFound();
      }
      
      return this.json({
        success: true,
        message: "Title updated successfully",
      });
    } catch (error) {
      console.error("Update title error:", error);
      return this.error("Failed to update title");
    }
  }
  
  private json<T = any>(response: APIResponse<T>): Response {
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
      }
    );
  }
  
  private unauthorized(): Response {
    return this.error("Unauthorized", 401);
  }
  
  private notFound(): Response {
    return this.error("Not found", 404);
  }
}