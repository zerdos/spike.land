import { beforeEach, describe, expect, it, vi } from "vitest";
import { open } from "../file-handle";
import type { MockFileSystemFile } from "./setup";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("FileHandle", () => {
  beforeEach(() => {
    setupTest();
  });

  describe("chmod", () => {
    it("should throw ENOTSUP error with correct code and syscall", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        await fileHandle.chmod(0o644);
        expect.fail("chmod should have thrown an error");
      } catch (error) {
        const errnoException = error as NodeJS.ErrnoException;
        expect(errnoException.message).toBe("ENOTSUP: operation not supported, chmod");
        expect(errnoException.code).toBe("ENOTSUP");
        expect(errnoException.syscall).toBe("fchmod");
      }
    });
  });

  describe("chown", () => {
    it("should throw ENOTSUP error with correct code and syscall", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        await fileHandle.chown(1000, 1000);
        expect.fail("chown should have thrown an error");
      } catch (error) {
        const errnoException = error as NodeJS.ErrnoException;
        expect(errnoException.message).toBe("ENOTSUP: operation not supported, chown");
        expect(errnoException.code).toBe("ENOTSUP");
        expect(errnoException.syscall).toBe("fchown");
      }
    });
  });

  describe("utimes", () => {
    it("should throw ENOTSUP error with correct code and syscall", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        await fileHandle.utimes(new Date(), new Date());
        expect.fail("utimes should have thrown an error");
      } catch (error) {
        const errnoException = error as NodeJS.ErrnoException;
        expect(errnoException.message).toBe("ENOTSUP: operation not supported, utimes");
        expect(errnoException.code).toBe("ENOTSUP");
        expect(errnoException.syscall).toBe("futimes");
      }
    });

    it("should throw ENOTSUP error with string timestamps", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        await fileHandle.utimes("2023-01-01", "2023-01-02");
        expect.fail("utimes should have thrown an error");
      } catch (error) {
        const errnoException = error as NodeJS.ErrnoException;
        expect(errnoException.message).toBe("ENOTSUP: operation not supported, utimes");
        expect(errnoException.code).toBe("ENOTSUP");
        expect(errnoException.syscall).toBe("futimes");
      }
    });

    it("should throw ENOTSUP error with numeric timestamps", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        await fileHandle.utimes(Date.now(), Date.now());
        expect.fail("utimes should have thrown an error");
      } catch (error) {
        const errnoException = error as NodeJS.ErrnoException;
        expect(errnoException.message).toBe("ENOTSUP: operation not supported, utimes");
        expect(errnoException.code).toBe("ENOTSUP");
        expect(errnoException.syscall).toBe("futimes");
      }
    });
  });

  describe("datasync", () => {
    it("should resolve successfully", async () => {
      const fileHandle = await open("/test.txt", "r");
      await expect(fileHandle.datasync()).resolves.toBeUndefined();
    });

    it("should return undefined/void", async () => {
      const fileHandle = await open("/test.txt", "r");
      const result = await fileHandle.datasync();
      expect(result).toBeUndefined();
    });
  });

  describe("sync", () => {
    it("should resolve successfully", async () => {
      const fileHandle = await open("/test.txt", "r");
      await expect(fileHandle.sync()).resolves.toBeUndefined();
    });

    it("should return undefined/void", async () => {
      const fileHandle = await open("/test.txt", "r");
      const result = await fileHandle.sync();
      expect(result).toBeUndefined();
    });
  });

  describe("readableWebStream", () => {
    it("should return a ReadableStream", async () => {
      const fileHandle = await open("/test.txt", "r");
      const stream = fileHandle.readableWebStream();

      expect(stream).toBeInstanceOf(ReadableStream);
    });

    it("should read file content through the stream", async () => {
      const testContent = "test content";
      const encoder = new TextEncoder();
      const expectedBytes = encoder.encode(testContent);

      const mockFile = {
        size: testContent.length,
        type: "text/plain",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue(testContent),
        stream: vi.fn().mockReturnValue(
          new ReadableStream({
            start(controller) {
              controller.enqueue(expectedBytes);
              controller.close();
            },
          }),
        ),
      };

      mockFileSystem["test.txt"] = {
        kind: "file",
        name: "test.txt",
        getFile: vi.fn().mockResolvedValue(mockFile),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      mockDirectoryHandle.getFileHandle = vi.fn().mockResolvedValue(
        mockFileSystem["test.txt"],
      );

      const fileHandle = await open("/test.txt", "r");
      const stream = fileHandle.readableWebStream();
      const reader = stream.getReader();

      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }

      const result = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      const decoder = new TextDecoder();
      expect(decoder.decode(result)).toBe(testContent);
    });

    it("should handle errors during streaming", async () => {
      const mockError = new Error("Stream error");
      const mockFile = {
        size: 100,
        type: "text/plain",
        lastModified: Date.now(),
        text: vi.fn().mockResolvedValue("test"),
        stream: vi.fn().mockReturnValue(
          new ReadableStream({
            start(controller) {
              controller.error(mockError);
            },
          }),
        ),
      };

      mockFileSystem["test.txt"] = {
        kind: "file",
        name: "test.txt",
        getFile: vi.fn().mockResolvedValue(mockFile),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      mockDirectoryHandle.getFileHandle = vi.fn().mockResolvedValue(
        mockFileSystem["test.txt"],
      );

      const fileHandle = await open("/test.txt", "r");
      const stream = fileHandle.readableWebStream();
      const reader = stream.getReader();

      await expect(reader.read()).rejects.toThrow("Stream error");
    });
  });

  describe("readLines", () => {
    it("should throw ENOTSUP error", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        fileHandle.readLines();
        expect.fail("Should have thrown an error");
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        expect(err.message).toBe("ENOTSUP: operation not supported, readLines");
        expect(err.code).toBe("ENOTSUP");
        expect(err.syscall).toBe("readLines");
      }
    });
  });

  describe("createReadStream", () => {
    it("should throw ENOTSUP error", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        fileHandle.createReadStream();
        expect.fail("Should have thrown an error");
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        expect(err.message).toBe("ENOTSUP: operation not supported, createReadStream");
        expect(err.code).toBe("ENOTSUP");
        expect(err.syscall).toBe("createReadStream");
      }
    });

    it("should throw ENOTSUP error with options", async () => {
      const fileHandle = await open("/test.txt", "r");

      try {
        fileHandle.createReadStream({
          encoding: "utf8",
          start: 0,
          end: 100,
          highWaterMark: 64 * 1024,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        expect(err.message).toBe("ENOTSUP: operation not supported, createReadStream");
        expect(err.code).toBe("ENOTSUP");
        expect(err.syscall).toBe("createReadStream");
      }
    });
  });

  describe("createWriteStream", () => {
    it("should throw ENOTSUP error", async () => {
      const fileHandle = await open("/test.txt", "w");

      try {
        fileHandle.createWriteStream();
        expect.fail("Should have thrown an error");
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        expect(err.message).toBe("ENOTSUP: operation not supported, createWriteStream");
        expect(err.code).toBe("ENOTSUP");
        expect(err.syscall).toBe("createWriteStream");
      }
    });

    it("should throw ENOTSUP error with options", async () => {
      const fileHandle = await open("/test.txt", "w");

      try {
        fileHandle.createWriteStream({
          encoding: "utf8",
          start: 0,
          autoClose: true,
          emitClose: true,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        const err = error as NodeJS.ErrnoException;
        expect(err.message).toBe("ENOTSUP: operation not supported, createWriteStream");
        expect(err.code).toBe("ENOTSUP");
        expect(err.syscall).toBe("createWriteStream");
      }
    });
  });

  describe("writev", () => {
    it("should write multiple buffers to file", async () => {
      const fileHandle = await open("/test-writev.txt", "w");

      const buffer1 = new Uint8Array([72, 101, 108, 108, 111]);
      const buffer2 = new Uint8Array([32, 87, 111, 114, 108, 100]);

      const result = await fileHandle.writev([buffer1, buffer2]);

      expect(result.bytesWritten).toBe(11);
      expect(result.buffers).toEqual([buffer1, buffer2]);

      const mockFile = mockFileSystem["test-writev.txt"] as MockFileSystemFile;
      const writable = await mockFile.createWritable();
      expect(writable.write).toHaveBeenCalledWith(
        expect.objectContaining({
          byteLength: 11,
        }),
      );
      expect(writable.close).toHaveBeenCalled();

      await fileHandle.close();
    });

    it("should write multiple buffers with position", async () => {
      mockFileSystem["test-position.txt"] = {
        kind: "file",
        name: "test-position.txt",
        getFile: vi.fn().mockResolvedValue({
          size: 20,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue("Initial content here"),
          arrayBuffer: vi
            .fn()
            .mockResolvedValue(new TextEncoder().encode("Initial content here").buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
          seek: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-position.txt", "w");

      const buffer1 = new Uint8Array([65, 66, 67]);
      const buffer2 = new Uint8Array([68, 69, 70]);

      const result = await fileHandle.writev([buffer1, buffer2], 5);

      expect(result.bytesWritten).toBe(6);

      const mockFile = mockFileSystem["test-position.txt"] as MockFileSystemFile;
      const writable = await mockFile.createWritable();
      expect(writable.seek).toHaveBeenCalledWith(5);
      expect(writable.write).toHaveBeenCalled();
      expect(writable.close).toHaveBeenCalled();

      await fileHandle.close();
    });

    it("should return correct bytesWritten count", async () => {
      const fileHandle = await open("/test-count.txt", "w");

      const buffer1 = new Uint8Array(10);
      const buffer2 = new Uint8Array(20);
      const buffer3 = new Uint8Array(15);

      const result = await fileHandle.writev([buffer1, buffer2, buffer3]);

      expect(result.bytesWritten).toBe(45);
      expect(result.buffers.length).toBe(3);

      await fileHandle.close();
    });

    it("should handle empty buffer array", async () => {
      const fileHandle = await open("/test-empty.txt", "w");

      const result = await fileHandle.writev([]);

      expect(result.bytesWritten).toBe(0);
      expect(result.buffers).toEqual([]);

      await fileHandle.close();
    });

    it("should handle different ArrayBufferView types", async () => {
      const fileHandle = await open("/test-types.txt", "w");

      const buffer1 = new Uint8Array([1, 2, 3]);
      const buffer2 = new Uint16Array([4, 5]);
      const buffer3 = new Uint32Array([6]);

      const result = await fileHandle.writev([buffer1, buffer2, buffer3]);

      expect(result.bytesWritten).toBe(3 + 4 + 4);
      expect(result.buffers).toEqual([buffer1, buffer2, buffer3]);

      await fileHandle.close();
    });
  });

  describe("readv", () => {
    it("should read into multiple buffers", async () => {
      const fileContent = "Hello World!";
      mockFileSystem["test-readv.txt"] = {
        kind: "file",
        name: "test-readv.txt",
        getFile: vi.fn().mockResolvedValue({
          size: fileContent.length,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue(fileContent),
          arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(fileContent).buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-readv.txt", "r");

      const buffer1 = new Uint8Array(5);
      const buffer2 = new Uint8Array(7);

      const result = await fileHandle.readv([buffer1, buffer2]);

      expect(result.bytesRead).toBe(12);
      expect(result.buffers).toEqual([buffer1, buffer2]);

      expect(new TextDecoder().decode(buffer1)).toBe("Hello");
      expect(new TextDecoder().decode(buffer2)).toBe(" World!");

      await fileHandle.close();
    });

    it("should read into multiple buffers with position", async () => {
      const fileContent = "0123456789";
      mockFileSystem["test-readv-pos.txt"] = {
        kind: "file",
        name: "test-readv-pos.txt",
        getFile: vi.fn().mockResolvedValue({
          size: fileContent.length,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue(fileContent),
          arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(fileContent).buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-readv-pos.txt", "r");

      const buffer1 = new Uint8Array(3);
      const buffer2 = new Uint8Array(3);

      const result = await fileHandle.readv([buffer1, buffer2], 5);

      expect(result.bytesRead).toBe(5);
      expect(new TextDecoder().decode(buffer1)).toBe("567");
      expect(new TextDecoder().decode(buffer2)).toBe("89\u0000");

      await fileHandle.close();
    });

    it("should return correct bytesRead count", async () => {
      const fileContent = "Short";
      mockFileSystem["test-readv-count.txt"] = {
        kind: "file",
        name: "test-readv-count.txt",
        getFile: vi.fn().mockResolvedValue({
          size: fileContent.length,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue(fileContent),
          arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(fileContent).buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-readv-count.txt", "r");

      const buffer1 = new Uint8Array(3);
      const buffer2 = new Uint8Array(3);
      const buffer3 = new Uint8Array(10);

      const result = await fileHandle.readv([buffer1, buffer2, buffer3]);

      expect(result.bytesRead).toBe(5);

      await fileHandle.close();
    });

    it("should handle reading past end of file", async () => {
      const fileContent = "ABC";
      mockFileSystem["test-readv-eof.txt"] = {
        kind: "file",
        name: "test-readv-eof.txt",
        getFile: vi.fn().mockResolvedValue({
          size: fileContent.length,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue(fileContent),
          arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(fileContent).buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-readv-eof.txt", "r");

      const buffer1 = new Uint8Array(10);
      const buffer2 = new Uint8Array(10);

      const result = await fileHandle.readv([buffer1, buffer2]);

      expect(result.bytesRead).toBe(3);
      expect(new TextDecoder().decode(buffer1.slice(0, 3))).toBe("ABC");

      await fileHandle.close();
    });

    it("should handle empty file", async () => {
      mockFileSystem["test-readv-empty.txt"] = {
        kind: "file",
        name: "test-readv-empty.txt",
        getFile: vi.fn().mockResolvedValue({
          size: 0,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue(""),
          arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-readv-empty.txt", "r");

      const buffer1 = new Uint8Array(10);
      const buffer2 = new Uint8Array(10);

      const result = await fileHandle.readv([buffer1, buffer2]);

      expect(result.bytesRead).toBe(0);

      await fileHandle.close();
    });

    it("should handle empty buffer array", async () => {
      const fileContent = "Test content";
      mockFileSystem["test-readv-nobuf.txt"] = {
        kind: "file",
        name: "test-readv-nobuf.txt",
        getFile: vi.fn().mockResolvedValue({
          size: fileContent.length,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue(fileContent),
          arrayBuffer: vi.fn().mockResolvedValue(new TextEncoder().encode(fileContent).buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-readv-nobuf.txt", "r");

      const result = await fileHandle.readv([]);

      expect(result.bytesRead).toBe(0);
      expect(result.buffers).toEqual([]);

      await fileHandle.close();
    });
  });

  describe("writev and readv integration", () => {
    it("should write and read back multiple buffers", async () => {
      mockFileSystem["test-integration.txt"] = {
        kind: "file",
        name: "test-integration.txt",
        getFile: vi.fn().mockResolvedValue({
          size: 11,
          type: "text/plain",
          lastModified: Date.now(),
          text: vi.fn().mockResolvedValue("Hello World"),
          arrayBuffer: vi
            .fn()
            .mockResolvedValue(new TextEncoder().encode("Hello World").buffer),
        }),
        createWritable: vi.fn().mockResolvedValue({
          write: vi.fn().mockResolvedValue(undefined),
          close: vi.fn().mockResolvedValue(undefined),
        }),
      };

      const fileHandle = await open("/test-integration.txt", "w+");

      const writeBuffer1 = new Uint8Array([72, 101, 108, 108, 111]);
      const writeBuffer2 = new Uint8Array([32, 87, 111, 114, 108, 100]);

      await fileHandle.writev([writeBuffer1, writeBuffer2]);

      const readBuffer1 = new Uint8Array(5);
      const readBuffer2 = new Uint8Array(6);

      const readResult = await fileHandle.readv([readBuffer1, readBuffer2]);

      expect(readResult.bytesRead).toBe(11);
      expect(new TextDecoder().decode(readBuffer1)).toBe("Hello");
      expect(new TextDecoder().decode(readBuffer2)).toBe(" World");

      await fileHandle.close();
    });
  });
});
