import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/", // Landing page
  "/signin(.*)",
  "/signup(.*)",
  "/sso-callback(.*)",
  "/api/webhooks(.*)", // Webhook endpoints need to be public
]);

// Define routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/chat(.*)",
  "/profile(.*)",
  "/dashboard(.*)",
  "/api/conversations(.*)",
  "/api/messages(.*)",
  "/api/user(.*)",
  "/api/subscription(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // CSP header for security
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://clerk.spike.land; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://img.clerk.com; font-src 'self' data:; connect-src 'self' ws: wss: https://clerk.spike.land https://*.clerk.accounts.dev; worker-src 'self' blob:; frame-ancestors 'none';",
  );

  // CORS headers for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With",
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers });
    }
  }

  // Add cache headers for static assets
  if (req.nextUrl.pathname.startsWith("/_next/static/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  // Add edge runtime specific headers
  response.headers.set("X-Edge-Runtime", "cloudflare-workers");

  // Protect routes that require authentication
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }

  return response;
});

export const config = {
  // Match all paths except static files
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// Export the runtime config for edge compatibility
export const runtime = "experimental-edge";