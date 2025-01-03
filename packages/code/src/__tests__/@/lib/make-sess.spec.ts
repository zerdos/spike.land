import {
  applySessionPatch,
  computeSessionHash,
  createDiff,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/make-sess";
import { ICodeSession } from "src/modules";
import { expect, test } from "vitest";

test("should sanitize session", () => {
  const input = {
    i: 1,
    codeSpace: "ts",
    code: "const x = 5;",
    html: undefined,
    ooo: "ooo",
    css: "",
    transpiled: "",
    messages: [],
  };
  const result = sanitizeSession(input);
  expect(result).toMatchInlineSnapshot(`
      {
        "code": "const x = 5;",
        "codeSpace": "ts",
        "css": "",
        "html": "",
        "i": 1,
        "messages": [],
        "transpiled": "",
      }
    `);
});
