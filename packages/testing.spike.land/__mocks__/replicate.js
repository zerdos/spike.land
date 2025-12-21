// Mock implementation of replicate
import { vi } from "vitest";

const replicate = {
  run: vi.fn().mockResolvedValue({
    output: "mocked output",
  }),
  models: {
    get: vi.fn().mockResolvedValue({
      name: "mock-model",
      version: "mock-version",
    }),
  },
};

module.exports = replicate;
module.exports.default = replicate;
