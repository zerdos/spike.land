import { messagesPush } from "@/lib/chat-utils";
import type { Message } from "@/lib/interfaces";
import { describe, expect, it } from "vitest";

describe("messagesPush", () => {
  it("should throw error if message has no role", () => {
    const messages: Message[] = [];
    const newMessage = { content: "test" } as Message;

    expect(() => messagesPush(messages, newMessage)).toThrow("Message must have a role");
  });

  it("should add first message with generated id", () => {
    const messages: Message[] = [];
    const newMessage: Message = { id: "111", role: "user", content: "test" };

    const result = messagesPush(messages, newMessage);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      ...newMessage,
      id: "111",
    });
  });

  it("should append message with different role", () => {
    const messages: Message[] = [
      { role: "user", content: "first", id: "1" },
    ];
    const newMessage: Message = { id: "2", role: "assistant", content: "second" };

    const result = messagesPush(messages, newMessage);

    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({
      ...newMessage,
      id: "2",
    });
  });

  it("should update content of last message if same assistant role", () => {
    const messages: Message[] = [
      { role: "user", content: "first", id: "1" },
      { role: "assistant", content: "second", id: "2" },
    ];
    const newMessage: Message = {
      role: "assistant",
      content: "Updated",
      id: "5",
    };

    const result = messagesPush(messages, newMessage);

    expect(result).toHaveLength(2);
    expect(result[1].content).toBe("secondUpdated");
    expect(result[1].id).toBe("5");
  });

  it("should not merge if the first is prefix of the second", () => {
    const messages: Message[] = [
      { role: "user", content: "first", id: "1" },
      { role: "assistant", content: "second", id: "2" },
    ];
    const newMessage: Message = {
      role: "assistant",
      content: "second item",
      id: "5",
    };

    const result = messagesPush(messages, newMessage);

    expect(result).toHaveLength(2);
    expect(result[1].content).toBe("second item");
    expect(result[1].id).toBe("5");
  });

  it("should preserve existing message id if provided", () => {
    const messages: Message[] = [];
    const newMessage: Message = { role: "user", content: "test", id: "custom-id" };

    const result = messagesPush(messages, newMessage);

    expect(result[0].id).toBe("custom-id");
  });
});
