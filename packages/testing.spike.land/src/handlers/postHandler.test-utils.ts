import type { R2Bucket } from "@cloudflare/workers-types";
import { vi } from "vitest";
import type { Code } from "../chatRoom";
import type Env from "../env";
import type { McpTool } from "../mcp";
import type { StorageService } from "../services/storageService";

// Mock crypto.randomUUID
export const mockRandomUUID = vi.fn(() => "test-uuid-123");

export const setupCrypto = () => {
  global.crypto = {
    randomUUID: mockRandomUUID,
  } as unknown as Crypto;
};

// Helper function to create mock tools for Anthropic provider
export const createMockTools = () => ({
  bash_20241022: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.bash_20241022",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  bash_20250124: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.bash_20250124",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  textEditor_20241022: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.textEditor_20241022",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  textEditor_20250124: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.textEditor_20250124",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  computer_20250124: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.computer_20250124",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  computer_20241022: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.computer_20241022",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  textEditor_20250429: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.textEditor_20250429",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  webSearch_20250305: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.webSearch_20250305",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  codeExecution_20250522: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.codeExecution_20250522",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  textEditor_20250728: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.textEditor_20250728",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  webFetch_20250910: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.webFetch_20250910",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  codeExecution_20250825: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.codeExecution_20250825",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
  memory_20250818: vi.fn().mockReturnValue({
    type: "provider-defined",
    id: "anthropic.memory_20250818",
    args: {},
    parameters: {} as never,
    execute: vi.fn(),
  }),
});

// Create mock MCP server
export const createMockMcpServer = () => ({
  tools: [
    {
      name: "read_code",
      description: "Read code",
      inputSchema: {
        type: "object",
        properties: {
          codeSpace: { type: "string" },
        },
        required: ["codeSpace"],
      },
    },
  ] as McpTool[],
});

// Create mock Code instance
export const createMockCode = (mcpServer = createMockMcpServer()): Code => ({
  getSession: vi.fn().mockReturnValue({
    codeSpace: "test-space",
  }),
  getMcpServer: vi.fn().mockReturnValue(mcpServer),
  getOrigin: vi.fn().mockReturnValue("https://test.spike.land"),
}) as unknown as Code;

// Create mock Env
export const createMockEnv = (): Env => ({
  ANTHROPIC_API_KEY: "test-api-key",
  R2: {} as unknown as R2Bucket,
}) as unknown as Env;

// Create mock StorageService
export const createMockStorageService = (): StorageService => ({
  saveRequestBody: vi.fn().mockResolvedValue(undefined),
  loadRequestBody: vi.fn().mockResolvedValue(null),
}) as unknown as StorageService;

// Setup StorageService mock implementation
// Note: The caller must pass in the mocked StorageService constructor from their module
export const setupStorageServiceMock = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  StorageServiceMock: new (...args: any[]) => StorageService,
  mockStorageService: StorageService,
) => {
  vi.mocked(StorageServiceMock).mockImplementation(() => mockStorageService);
};

// Create mock URL
export const createMockUrl = () => new URL("https://test.spike.land/api/post");
