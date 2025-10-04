import { describe, expect, it } from "vitest";
import {
  AppError,
  DOMError,
  ErrorCode,
  getErrorCode,
  getErrorMessage,
  isRetryableError,
  MessageError,
  MessageHandlingError,
  NetworkError,
  RouterError,
  StorageError,
  ValidationError,
  WebSocketError,
} from "../errors";

describe("ErrorCode", () => {
  it("should contain all error code values", () => {
    expect(ErrorCode.MESSAGE_PARSE_FAILED).toBe("MESSAGE_PARSE_FAILED");
    expect(ErrorCode.WEBSOCKET_CONNECTION_FAILED).toBe("WEBSOCKET_CONNECTION_FAILED");
    expect(ErrorCode.UNKNOWN_ERROR).toBe("UNKNOWN_ERROR");
  });
});

describe("AppError", () => {
  it("should create error with message and default code", () => {
    const error = new AppError("Test error");
    expect(error.message).toBe("Test error");
    expect(error.code).toBe(ErrorCode.UNKNOWN_ERROR);
    expect(error.details).toBeUndefined();
    expect(error.timestamp).toBeInstanceOf(Date);
  });

  it("should create error with custom code", () => {
    const error = new AppError("Network error", ErrorCode.NETWORK_CONNECTION_FAILED);
    expect(error.code).toBe(ErrorCode.NETWORK_CONNECTION_FAILED);
  });

  it("should create error with details", () => {
    const details = { userId: "123", action: "save" };
    const error = new AppError("Test error", ErrorCode.UNKNOWN_ERROR, details);
    expect(error.details).toEqual(details);
  });

  it("should serialize to JSON correctly", () => {
    const error = new AppError("Test error", ErrorCode.UNKNOWN_ERROR, { key: "value" });
    const json = error.toJSON();

    expect(json["name"]).toBe("AppError");
    expect(json["message"]).toBe("Test error");
    expect(json["code"]).toBe(ErrorCode.UNKNOWN_ERROR);
    expect(json["details"]).toEqual({ key: "value" });
    expect(json["timestamp"]).toBeDefined();
    expect(json["stack"]).toBeDefined();
  });

  it("should capture stack trace", () => {
    const error = new AppError("Test error");
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("AppError");
  });
});

describe("MessageError", () => {
  it("should create with default code", () => {
    const error = new MessageError("Parse failed");
    expect(error.code).toBe(ErrorCode.MESSAGE_PARSE_FAILED);
    expect(error.messageData).toBeUndefined();
  });

  it("should create with custom code and message data", () => {
    const messageData = { type: "ping", id: "123" };
    const error = new MessageError(
      "Send failed",
      ErrorCode.MESSAGE_SEND_FAILED,
      messageData,
    );
    expect(error.code).toBe(ErrorCode.MESSAGE_SEND_FAILED);
    expect(error.messageData).toEqual(messageData);
  });

  it("should include message data in details", () => {
    const messageData = { payload: "test" };
    const error = new MessageError("Error", ErrorCode.MESSAGE_PARSE_FAILED, messageData);
    const json = error.toJSON();
    expect(json["details"]).toMatchObject({ messageData });
  });
});

describe("ValidationError", () => {
  it("should create with field and value", () => {
    const error = new ValidationError("Invalid email", "email", "invalid@");
    expect(error.field).toBe("email");
    expect(error.value).toBe("invalid@");
    expect(error.code).toBe(ErrorCode.VALIDATION_INVALID_TYPE);
  });

  it("should include field and value in details", () => {
    const error = new ValidationError("Required field", "username", undefined);
    const json = error.toJSON();
    expect(json["details"]).toMatchObject({ field: "username", value: undefined });
  });

  it("should work without field or value", () => {
    const error = new ValidationError("General validation error");
    expect(error.field).toBeUndefined();
    expect(error.value).toBeUndefined();
  });
});

describe("NetworkError", () => {
  it("should create with default code", () => {
    const error = new NetworkError("Connection failed");
    expect(error.code).toBe(ErrorCode.NETWORK_CONNECTION_FAILED);
  });

  it("should include URL and status code", () => {
    const error = new NetworkError(
      "Request failed",
      ErrorCode.NETWORK_RESPONSE_INVALID,
      "https://api.example.com",
      500,
    );
    expect(error.url).toBe("https://api.example.com");
    expect(error.statusCode).toBe(500);
  });

  it("should serialize URL and status in details", () => {
    const error = new NetworkError("Timeout", ErrorCode.NETWORK_REQUEST_TIMEOUT, "/api/data", 408);
    const json = error.toJSON();
    expect(json["details"]).toMatchObject({ url: "/api/data", statusCode: 408 });
  });
});

describe("StorageError", () => {
  it("should create with default code", () => {
    const error = new StorageError("Read failed");
    expect(error.code).toBe(ErrorCode.STORAGE_READ_FAILED);
  });

  it("should include storage key", () => {
    const error = new StorageError("Write failed", ErrorCode.STORAGE_WRITE_FAILED, "user-settings");
    expect(error.key).toBe("user-settings");
  });

  it("should serialize key in details", () => {
    const error = new StorageError("Quota exceeded", ErrorCode.STORAGE_QUOTA_EXCEEDED, "cache");
    const json = error.toJSON();
    expect(json["details"]).toMatchObject({ key: "cache" });
  });
});

describe("WebSocketError", () => {
  it("should create with message", () => {
    const error = new WebSocketError("Connection failed");
    expect(error.message).toBe("Connection failed");
    expect(error.code).toBe(ErrorCode.WEBSOCKET_CONNECTION_FAILED);
  });

  it("should wrap original error", () => {
    const originalError = new Error("Network timeout");
    const error = new WebSocketError("Connection failed", originalError);
    expect(error.originalError).toBe(originalError);
  });

  it("should append original stack trace", () => {
    const originalError = new Error("Network timeout");
    const error = new WebSocketError("Connection failed", originalError);
    expect(error.stack).toContain("Caused by:");
    expect(error.stack).toContain("Network timeout");
  });

  it("should include original error message in details", () => {
    const originalError = new Error("Socket closed");
    const error = new WebSocketError("Send failed", originalError, ErrorCode.WEBSOCKET_SEND_FAILED);
    const json = error.toJSON();
    expect(json["details"]).toMatchObject({ originalError: "Socket closed" });
  });
});

describe("DOMError", () => {
  it("should create with element ID", () => {
    const error = new DOMError("Element not found", "submit-button");
    expect(error.elementId).toBe("submit-button");
    expect(error.message).toContain("Element: submit-button");
  });

  it("should create without element ID", () => {
    const error = new DOMError("DOM operation failed");
    expect(error.elementId).toBeUndefined();
    expect(error.message).toBe("DOM operation failed");
  });

  it("should use custom error code", () => {
    const error = new DOMError("Operation failed", "canvas", ErrorCode.DOM_OPERATION_FAILED);
    expect(error.code).toBe(ErrorCode.DOM_OPERATION_FAILED);
  });
});

describe("RouterError", () => {
  it("should create with path", () => {
    const error = new RouterError("Navigation failed", "/dashboard");
    expect(error.path).toBe("/dashboard");
    expect(error.message).toContain("Path: /dashboard");
  });

  it("should create without path", () => {
    const error = new RouterError("Invalid route");
    expect(error.path).toBeUndefined();
    expect(error.message).toBe("Invalid route");
  });

  it("should use custom error code", () => {
    const error = new RouterError("Invalid path", "/404", ErrorCode.ROUTER_INVALID_PATH);
    expect(error.code).toBe(ErrorCode.ROUTER_INVALID_PATH);
  });
});

describe("MessageHandlingError", () => {
  it("should create with data", () => {
    const data = { type: "update", payload: {} };
    const error = new MessageHandlingError("Handler failed", data);
    expect(error.data).toEqual(data);
    expect(error.code).toBe(ErrorCode.MESSAGE_VALIDATION_FAILED);
  });

  it("should work without data", () => {
    const error = new MessageHandlingError("Handler failed");
    expect(error.data).toBeUndefined();
  });
});

describe("getErrorMessage", () => {
  it("should get message from Error instance", () => {
    const error = new Error("Test error");
    expect(getErrorMessage(error)).toBe("Test error");
  });

  it("should get message from AppError instance", () => {
    const error = new AppError("App error");
    expect(getErrorMessage(error)).toBe("App error");
  });

  it("should convert string to string", () => {
    expect(getErrorMessage("String error")).toBe("String error");
  });

  it("should convert number to string", () => {
    expect(getErrorMessage(404)).toBe("404");
  });

  it("should convert object to string", () => {
    expect(getErrorMessage({ error: "object" })).toBe("[object Object]");
  });

  it("should handle null and undefined", () => {
    expect(getErrorMessage(null)).toBe("null");
    expect(getErrorMessage(undefined)).toBe("undefined");
  });
});

describe("getErrorCode", () => {
  it("should get code from AppError", () => {
    const error = new AppError("Error", ErrorCode.NETWORK_CONNECTION_FAILED);
    expect(getErrorCode(error)).toBe(ErrorCode.NETWORK_CONNECTION_FAILED);
  });

  it("should return UNKNOWN_ERROR for Error", () => {
    const error = new Error("Generic error");
    expect(getErrorCode(error)).toBe(ErrorCode.UNKNOWN_ERROR);
  });

  it("should return UNKNOWN_ERROR for non-Error values", () => {
    expect(getErrorCode("string")).toBe(ErrorCode.UNKNOWN_ERROR);
    expect(getErrorCode(null)).toBe(ErrorCode.UNKNOWN_ERROR);
    expect(getErrorCode(undefined)).toBe(ErrorCode.UNKNOWN_ERROR);
  });
});

describe("isRetryableError", () => {
  it("should return true for retryable network errors", () => {
    const error = new NetworkError("Timeout", ErrorCode.NETWORK_REQUEST_TIMEOUT);
    expect(isRetryableError(error)).toBe(true);
  });

  it("should return true for retryable websocket errors", () => {
    const error = new WebSocketError("Connection failed");
    expect(isRetryableError(error)).toBe(true);
  });

  it("should return true for retryable storage errors", () => {
    const error = new StorageError("Read failed", ErrorCode.STORAGE_READ_FAILED);
    expect(isRetryableError(error)).toBe(true);
  });

  it("should return false for non-retryable errors", () => {
    const error = new ValidationError("Invalid input");
    expect(isRetryableError(error)).toBe(false);
  });

  it("should return false for DOM errors", () => {
    const error = new DOMError("Element not found");
    expect(isRetryableError(error)).toBe(false);
  });

  it("should return false for generic Error", () => {
    const error = new Error("Generic error");
    expect(isRetryableError(error)).toBe(false);
  });

  it("should return false for non-Error values", () => {
    expect(isRetryableError("string")).toBe(false);
    expect(isRetryableError(null)).toBe(false);
  });
});
