// packages/spike.land/src/types/cloudflare.d.ts
import type { R2PutOptions, R2Object } from '@cloudflare/workers-types';

declare module '@cloudflare/workers-types' {
  interface R2Bucket {
    put(
      key: string,
      value: ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob,
      options?: R2PutOptions
    ): Promise<R2Object>;
  }
}
