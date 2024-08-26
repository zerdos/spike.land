import { beforeEach, describe, expect, it } from "vitest";
import { Message } from "../types/Message";
import { loadMessages } from "./chatUtils";

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("loadMessages", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array when no messages are stored", () => {
    const messages = loadMessages("testSpace");
    expect(messages).toEqual([]);
  });

  it("should load and filter messages correctly", () => {
    const testMessages: Message[] = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
      { role: "user", content: "How are you?" },
      { role: "assistant", content: "I'm doing well, thanks!" },
      { role: "user", content: "Great!" },
      { role: "assistant", content: "Can I help you with anything?" },
      { role: "system", content: "System message" }, // This should not be filtered out
    ];

    localStorage.setItem("chatMessages-testSpace", JSON.stringify(testMessages));

    const loadedMessages = loadMessages("testSpace");

    expect(loadedMessages).toHaveLength(7);
    expect(loadedMessages[0]).toEqual({ role: "user", content: "Hello" });
    expect(loadedMessages[1]).toEqual({ role: "assistant", content: "Hi there" });
    expect(loadedMessages[2]).toEqual({ role: "user", content: "How are you?" });
    expect(loadedMessages[3]).toEqual({ role: "assistant", content: "I'm doing well, thanks!" });
    expect(loadedMessages[4]).toEqual({ role: "user", content: "Great!" });
    expect(loadedMessages[5]).toEqual({ role: "assistant", content: "Can I help you with anything?" });
    expect(loadedMessages[6]).toEqual({ role: "system", content: "System message" });
  });

  it("should handle empty messages", () => {
    const testMessages: Message[] = [
      { role: "user", content: "Hello" },
      { role: "user", content: "This should be filtered out" },
      { role: "assistant", content: "Hi there" },
    ];

    localStorage.setItem("chatMessages-testSpace", JSON.stringify(testMessages));

    const loadedMessages = loadMessages("testSpace");

    expect(loadedMessages).toHaveLength(2);
    expect(loadedMessages[0]).toEqual({ role: "user", content: "Hello" });
    expect(loadedMessages[1]).toEqual({ role: "assistant", content: "Hi there" });
  });

  it("should remove consecutive messages with the same role", () => {
    const testMessages: Message[] = [
      { role: "user", content: "Hello" },
      { role: "user", content: "This should be removed" },
      { role: "assistant", content: "Hi there" },
      { role: "assistant", content: "This should also be removed" },
      { role: "user", content: "How are you?" },
    ];

    localStorage.setItem("chatMessages-testSpace", JSON.stringify(testMessages));

    const loadedMessages = loadMessages("testSpace");

    expect(loadedMessages).toHaveLength(3);
    expect(loadedMessages[0]).toEqual({ role: "user", content: "Hello" });
    expect(loadedMessages[1]).toEqual({ role: "assistant", content: "Hi there" });
    expect(loadedMessages[2]).toEqual({ role: "user", content: "How are you?" });
  });
});
