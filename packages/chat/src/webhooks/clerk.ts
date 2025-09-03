import type { Env } from "../types";
import { AuthService } from "../utils/auth";
import { Webhook } from "svix";

export async function handleClerkWebhook(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());
    
    const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);
    
    let event: any;
    try {
      event = webhook.verify(body, headers);
    } catch (error) {
      console.error("Webhook verification failed:", error);
      return new Response("Invalid signature", { status: 400 });
    }
    
    const authService = new AuthService(env);
    
    switch (event.type) {
      case "user.created":
      case "user.updated": {
        const userData = event.data;
        await authService.createOrUpdateUser({
          clerk_id: userData.id,
          email: userData.email_addresses[0]?.email_address || "",
          name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || undefined,
        });
        break;
      }
      
      case "user.deleted": {
        const userId = event.data.id;
        
        await env.DATABASE.prepare(
          "DELETE FROM users WHERE clerk_id = ?"
        )
          .bind(userId)
          .run();
        break;
      }
      
      case "session.created": {
        const sessionData = event.data;
        const cacheKey = `session:${sessionData.id}`;
        
        await env.KV_STORE.put(
          cacheKey,
          JSON.stringify({
            userId: sessionData.user_id,
            createdAt: sessionData.created_at,
            expiresAt: sessionData.expire_at,
          }),
          {
            expirationTtl: 86400,
          }
        );
        break;
      }
      
      case "session.ended":
      case "session.revoked": {
        const sessionId = event.data.id;
        const cacheKey = `session:${sessionId}`;
        
        await env.KV_STORE.delete(cacheKey);
        break;
      }
      
      default:
        console.log("Unhandled webhook event type:", event.type);
    }
    
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}