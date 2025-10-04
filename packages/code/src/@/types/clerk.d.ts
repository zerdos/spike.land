/**
 * Type declarations for Clerk
 * Minimal types to satisfy TypeScript imports
 */

declare module "@clerk/clerk-js" {
  export interface UserResource {
    id: string;
    fullName: string | null;
    firstName: string | null;
    imageUrl: string;
    primaryEmailAddress?: {
      emailAddress: string;
      verification?: {
        status: string;
      };
    };
    createdAt: Date | null;
    updatedAt: Date | null;
  }

  export interface ClerkOptions {
    publishableKey: string;
  }

  export class Clerk {
    constructor(publishableKey: string, options?: Partial<ClerkOptions>);
    load(options?: unknown): Promise<void>;
    user: UserResource | null;
    session: {
      id: string;
      userId: string;
      expireAt: Date;
    } | null;
    signOut(): Promise<void>;
  }

  export default Clerk;
}

declare module "@clerk/backend" {
  export interface BackendClerkOptions {
    secretKey: string;
  }

  export function verifyToken(token: string, options?: unknown): Promise<{
    sub: string;
    exp: number;
    [key: string]: unknown;
  }>;

  export class ClerkBackend {
    constructor(options: BackendClerkOptions);
    verifyToken(token: string): Promise<unknown>;
  }
}
