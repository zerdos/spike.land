/**
 * Type declarations for hono
 * Minimal types to satisfy TypeScript imports
 */

declare module "hono" {
  export interface Context {
    req: {
      method: string;
      path: string;
      header: (name: string) => string | undefined;
    };
    get: <T = unknown>(key: string) => T;
    set: (key: string, value: unknown) => void;
    header: (name: string, value: string) => void;
  }

  export type Next = () => Promise<void>;
}
