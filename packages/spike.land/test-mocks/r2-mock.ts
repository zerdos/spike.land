import { vi } from "vitest";

const mockR2Object = {
  key: "test-key",
  size: 100,
  version: "test-version",
  etag: "test-etag",
  httpEtag: "test-http-etag",
  checksums: { md5: "test-md5" },
  uploaded: new Date(),
  httpMetadata: {},
  customMetadata: {},
  range: () => ({ offset: 0, length: 100 }),
  writeHttpMetadata: () => {},
  text: () => Promise.resolve("test content"),
  json: () => Promise.resolve({ test: "data" }),
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
  blob: () => Promise.resolve(new Blob(["test"])),
};

interface R2Value {
  size?: number;
  [key: string]: unknown;
}

export function setupR2Mock() {
  vi.mock("@cloudflare/workers-types", () => {
    return {
      R2Bucket: class {
        async put(key: string, value: R2Value) {
          if (!value || !value.size) {
            const error = new Error("Missing or empty request body");
            (error as { status?: number; }).status = 400;
            throw error;
          }
          return { key, size: value.size };
        }

        async get(key: string) {
          if (key === "error") {
            throw new Error("R2 get error");
          }
          return {
            ...mockR2Object,
            key,
          };
        }

        async list() {
          return { objects: [], truncated: false };
        }

        async delete(key: string) {
          if (key === "error") {
            throw new Error("R2 delete error");
          }
          return undefined;
        }
      },
    };
  });
}
