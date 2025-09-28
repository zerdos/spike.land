import type { NextRequest } from "next/server";

export function getAuthToken(request: NextRequest): string | null {
  // Check for Bearer token in Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Check for auth_token in cookies
  const cookieToken = request.cookies.get("auth_token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // Check for Clerk session in cookies
  const clerkSession = request.cookies.get("__session")?.value;
  if (clerkSession) {
    return clerkSession;
  }

  // Check if there's a Clerk client JWT
  const clerkClientJwt = request.cookies.get("__client_uat")?.value;
  if (clerkClientJwt) {
    return clerkClientJwt;
  }

  return null;
}

export function isAuthenticated(request: NextRequest): boolean {
  const token = getAuthToken(request);
  return token !== null && token !== "";
}