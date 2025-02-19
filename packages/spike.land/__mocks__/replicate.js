// Mock implementation of replicate
const { vi } = require('vitest');

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
