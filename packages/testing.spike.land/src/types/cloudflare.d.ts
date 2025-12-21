// packages/testing.spike.land/src/types/cloudflare.d.ts
import type { R2Object, R2PutOptions } from "@cloudflare/workers-types";

declare module "@cloudflare/workers-types" {
  interface R2Bucket {
    put(
      key: string,
      value:
        | ReadableStream
        | ArrayBuffer
        | ArrayBufferView
        | string
        | null
        | Blob,
      options?: R2PutOptions,
    ): Promise<R2Object>;
  }
}
