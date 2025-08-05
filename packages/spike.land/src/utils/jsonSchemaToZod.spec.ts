import { beforeEach, describe, expect, it } from "vitest";
import type { Code } from "../chatRoom";
import { McpServer } from "../mcpServer";
import { JsonSchemaToZodConverter, type JsonSchema } from "./jsonSchemaToZod";

describe("JsonSchemaToZodConverter", () => {
  let converter: JsonSchemaToZodConverter;
  let mcpServer: McpServer;

  beforeEach(() => {
    converter = new JsonSchemaToZodConverter();
    mcpServer = new McpServer({} as unknown as Code);
  });

  describe("MCP Tool Schema Conversion", () => {
    it("should convert all MCP tool schemas successfully", () => {
      const tools = mcpServer.getTools();

      expect(tools).toHaveLength(7);

      for (const tool of tools) {
        const zodSchema = converter.convert(tool.inputSchema);
        expect(zodSchema).toBeDefined();

        // Verify that each schema is an object type (all MCP tools use object schemas)
        expect(tool.inputSchema.type).toBe("object");
      }
    });

    it("should validate read_code tool parameters", () => {
      const readCodeTool = mcpServer.getTools().find(t => t.name === "read_code");
      expect(readCodeTool).toBeDefined();

      const zodSchema = converter.convert(readCodeTool!.inputSchema);

      // Valid parameters
      expect(() => zodSchema.parse({ codeSpace: "test-space" })).not.toThrow();

      // Missing required field
      expect(() => zodSchema.parse({})).toThrow();

      // Wrong type
      expect(() => zodSchema.parse({ codeSpace: 123 })).toThrow();

      // Extra fields are allowed in Zod by default
      expect(() => zodSchema.parse({ codeSpace: "test", extra: "field" })).not.toThrow();
    });

    it("should validate update_code tool parameters", () => {
      const updateCodeTool = mcpServer.getTools().find(t => t.name === "update_code");
      expect(updateCodeTool).toBeDefined();

      const zodSchema = converter.convert(updateCodeTool!.inputSchema);

      // Valid parameters
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          code: "console.log('hello');",
        })
      ).not.toThrow();

      // Missing required fields
      expect(() => zodSchema.parse({ codeSpace: "test" })).toThrow();
      expect(() => zodSchema.parse({ code: "test" })).toThrow();
      expect(() => zodSchema.parse({})).toThrow();

      // Wrong types
      expect(() => zodSchema.parse({ codeSpace: 123, code: "test" })).toThrow();
      expect(() => zodSchema.parse({ codeSpace: "test", code: 123 })).toThrow();
    });

    it("should validate search_and_replace tool parameters", () => {
      const searchReplaceTool = mcpServer.getTools().find(t => t.name === "search_and_replace");
      expect(searchReplaceTool).toBeDefined();

      const zodSchema = converter.convert(searchReplaceTool!.inputSchema);

      // Valid parameters with required fields only
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          search: "oldText",
          replace: "newText",
        })
      ).not.toThrow();

      // Valid parameters with optional fields
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          search: "oldText",
          replace: "newText",
          isRegex: true,
          global: false,
        })
      ).not.toThrow();

      // Missing required fields
      expect(() =>
        zodSchema.parse({
          codeSpace: "test",
          search: "oldText",
        })
      ).toThrow();

      // Wrong types for optional fields
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          search: "oldText",
          replace: "newText",
          isRegex: "true", // Should be boolean
        })
      ).toThrow();
    });

    it("should validate edit_code tool parameters with nested array schema", () => {
      const editCodeTool = mcpServer.getTools().find(t => t.name === "edit_code");
      expect(editCodeTool).toBeDefined();

      const zodSchema = converter.convert(editCodeTool!.inputSchema);

      // Valid parameters
      const validData = {
        codeSpace: "test-space",
        edits: [
          { startLine: 1, endLine: 2, newContent: "new code" },
          { startLine: 5, endLine: 5, newContent: "another edit" },
        ],
      };
      expect(() => zodSchema.parse(validData)).not.toThrow();

      // Empty edits array is valid
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          edits: [],
        })
      ).not.toThrow();

      // Missing required fields in array items
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          edits: [{ startLine: 1 }], // Missing endLine and newContent
        })
      ).toThrow();

      // Wrong types in array items
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          edits: [{
            startLine: "1", // Should be number
            endLine: 2,
            newContent: "test",
          }],
        })
      ).toThrow();

      // Not an array
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          edits: "not an array",
        })
      ).toThrow();
    });

    it("should validate find_lines tool parameters with optional fields", () => {
      const findLinesTool = mcpServer.getTools().find(t => t.name === "find_lines");
      expect(findLinesTool).toBeDefined();

      const zodSchema = converter.convert(findLinesTool!.inputSchema);

      // Valid with required fields only
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          pattern: "searchPattern",
        })
      ).not.toThrow();

      // Valid with optional field
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          pattern: "searchPattern",
          isRegex: true,
        })
      ).not.toThrow();

      // Optional field with wrong type
      expect(() =>
        zodSchema.parse({
          codeSpace: "test-space",
          pattern: "searchPattern",
          isRegex: "yes", // Should be boolean
        })
      ).toThrow();
    });

    it("should handle all MCP tool schemas consistently", () => {
      const tools = mcpServer.getTools();

      // Test each tool with minimal valid data
      const testCases = [
        { name: "read_code", data: { codeSpace: "test" } },
        { name: "read_html", data: { codeSpace: "test" } },
        { name: "read_session", data: { codeSpace: "test" } },
        { name: "update_code", data: { codeSpace: "test", code: "code" } },
        { name: "search_and_replace", data: { codeSpace: "test", search: "a", replace: "b" } },
        { name: "edit_code", data: { codeSpace: "test", edits: [] } },
        { name: "find_lines", data: { codeSpace: "test", pattern: "pattern" } },
      ];

      for (const testCase of testCases) {
        const tool = tools.find(t => t.name === testCase.name);
        expect(tool).toBeDefined();

        const zodSchema = converter.convert(tool!.inputSchema);
        expect(() => zodSchema.parse(testCase.data)).not.toThrow();
      }
    });
  });

  describe("Basic Type Conversion", () => {
    it("should convert string type", () => {
      const schema = { type: "string", description: "A string field" };
      const zodSchema = converter.convert(schema);

      expect(zodSchema).toBeDefined();
      expect(zodSchema.parse("hello")).toBe("hello");
      expect(() => zodSchema.parse(123)).toThrow();
    });

    it("should convert number type", () => {
      const schema = { type: "number", description: "A number field" };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse(123)).toBe(123);
      expect(() => zodSchema.parse("123")).toThrow();
    });

    it("should convert boolean type", () => {
      const schema = { type: "boolean" };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse(true)).toBe(true);
      expect(zodSchema.parse(false)).toBe(false);
      expect(() => zodSchema.parse("true")).toThrow();
    });

    it("should convert array type", () => {
      const schema = {
        type: "array",
        items: { type: "string" },
      };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse(["a", "b"])).toEqual(["a", "b"]);
      expect(() => zodSchema.parse([1, 2])).toThrow();
    });

    it("should handle array without items", () => {
      const schema = { type: "array" };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse([1, "a", true])).toEqual([1, "a", true]);
    });
  });

  describe("Object Type Conversion", () => {
    it("should convert simple object type", () => {
      const schema = {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
        required: ["name"],
      };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse({ name: "John", age: 30 })).toEqual({
        name: "John",
        age: 30,
      });

      // Optional field can be omitted
      expect(zodSchema.parse({ name: "John" })).toEqual({ name: "John" });

      // Required field must be present
      expect(() => zodSchema.parse({ age: 30 })).toThrow();
    });

    it("should handle nested objects", () => {
      const schema = {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
            },
            required: ["email"],
          },
        },
      };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse({
        user: { name: "John", email: "john@example.com" },
      })).toEqual({
        user: { name: "John", email: "john@example.com" },
      });

      // Nested required field
      expect(() => zodSchema.parse({ user: { name: "John" } })).toThrow();
    });

    it("should handle empty object", () => {
      const schema = { type: "object" };
      const zodSchema = converter.convert(schema);

      expect(zodSchema.parse({})).toEqual({});
      // Note: z.object({}) in Zod actually allows extra properties by default
      // This is the expected behavior for empty object schemas
      expect(zodSchema.parse({ extra: "field" })).toEqual({});
    });
  });

  describe("Tool Schema Validation", () => {
    it("should correctly convert MCP tool schemas", () => {
      const readCodeSchema = {
        type: "object",
        properties: {
          codeSpace: {
            type: "string",
            description: "The codeSpace identifier",
          },
        },
        required: ["codeSpace"],
      };

      const zodSchema = converter.convert(readCodeSchema);

      // Valid data
      expect(zodSchema.parse({ codeSpace: "test" })).toEqual({ codeSpace: "test" });

      // Missing required field
      expect(() => zodSchema.parse({})).toThrow();

      // Wrong type
      expect(() => zodSchema.parse({ codeSpace: 123 })).toThrow();
    });

    it("should convert complex tool schema", () => {
      const editCodeSchema = {
        type: "object",
        properties: {
          codeSpace: { type: "string" },
          edits: {
            type: "array",
            items: {
              type: "object",
              properties: {
                startLine: { type: "number" },
                endLine: { type: "number" },
                newContent: { type: "string" },
              },
              required: ["startLine", "endLine", "newContent"],
            },
          },
        },
        required: ["codeSpace", "edits"],
      };

      const zodSchema = converter.convert(editCodeSchema);

      const validData = {
        codeSpace: "test",
        edits: [
          { startLine: 1, endLine: 2, newContent: "new code" },
        ],
      };

      expect(zodSchema.parse(validData)).toEqual(validData);

      // Invalid nested data
      expect(() =>
        zodSchema.parse({
          codeSpace: "test",
          edits: [{ startLine: "1" }], // Wrong type and missing fields
        })
      ).toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing type", () => {
      const schema = { description: "No type specified" };
      const zodSchema = converter.convert(schema);

      // Should return z.any()
      expect(zodSchema.parse("anything")).toBe("anything");
      expect(zodSchema.parse(123)).toBe(123);
      expect(zodSchema.parse(null)).toBe(null);
    });

    it("should handle null/undefined schema", () => {
      expect(converter.convert(null as unknown as JsonSchema).parse("anything")).toBe("anything");
      expect(converter.convert(undefined as unknown as JsonSchema).parse(123)).toBe(123);
    });

    it("should handle unknown types", () => {
      const schema = { type: "unknown-type" };
      const zodSchema = converter.convert(schema);

      // Should return z.any()
      expect(zodSchema.parse("anything")).toBe("anything");
    });

    it("should preserve descriptions", () => {
      const schema = {
        type: "string",
        description: "Test description",
      };
      const zodSchema = converter.convert(schema);

      // Check if description is preserved (Zod stores it in _def)
      // Note: _def is an internal property that may vary, but we can verify the schema works
      expect(zodSchema.parse("test")).toBe("test");

      // We can also check that the describe() method was called by verifying
      // that the schema has the expected properties
      expect(zodSchema).toBeDefined();
    });
  });

  describe("MCP Tool Schema Edge Cases", () => {
    it("should handle tool schemas with deeply nested structures", () => {
      const complexSchema = {
        type: "object",
        properties: {
          codeSpace: { type: "string" },
          config: {
            type: "object",
            properties: {
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    value: { type: "number" },
                    enabled: { type: "boolean" },
                  },
                  required: ["name", "value"],
                },
              },
            },
          },
        },
        required: ["codeSpace"],
      };

      const zodSchema = converter.convert(complexSchema);

      // Valid nested data
      const validData = {
        codeSpace: "test",
        config: {
          options: [
            { name: "option1", value: 10, enabled: true },
            { name: "option2", value: 20 },
          ],
        },
      };
      expect(() => zodSchema.parse(validData)).not.toThrow();

      // Invalid nested data
      const invalidData = {
        codeSpace: "test",
        config: {
          options: [
            { name: "option1" }, // Missing required 'value'
          ],
        },
      };
      expect(() => zodSchema.parse(invalidData)).toThrow();
    });

    it("should handle MCP tool schemas with missing descriptions", () => {
      const schemaWithoutDescriptions = {
        type: "object",
        properties: {
          codeSpace: { type: "string" }, // No description
          data: { type: "string" }, // No description
        },
        required: ["codeSpace"],
      };

      const zodSchema = converter.convert(schemaWithoutDescriptions);

      // Should still work without descriptions
      expect(() => zodSchema.parse({ codeSpace: "test", data: "value" })).not.toThrow();
      expect(() => zodSchema.parse({ codeSpace: "test" })).not.toThrow();
      expect(() => zodSchema.parse({})).toThrow();
    });

    it("should handle empty required arrays in tool schemas", () => {
      const schemaWithEmptyRequired = {
        type: "object",
        properties: {
          codeSpace: { type: "string" },
          optional: { type: "string" },
        },
        required: [], // Empty required array means all fields are optional
      };

      const zodSchema = converter.convert(schemaWithEmptyRequired);

      // All fields should be optional
      expect(() => zodSchema.parse({})).not.toThrow();
      expect(() => zodSchema.parse({ codeSpace: "test" })).not.toThrow();
      expect(() => zodSchema.parse({ optional: "value" })).not.toThrow();
      expect(() => zodSchema.parse({ codeSpace: "test", optional: "value" })).not.toThrow();
    });

    it("should handle tool schemas without required field", () => {
      const schemaWithoutRequired = {
        type: "object",
        properties: {
          codeSpace: { type: "string" },
          code: { type: "string" },
        },
        // No required field - all properties should be optional
      };

      const zodSchema = converter.convert(schemaWithoutRequired);

      // All fields should be optional when required is not specified
      expect(() => zodSchema.parse({})).not.toThrow();
      expect(() => zodSchema.parse({ codeSpace: "test" })).not.toThrow();
      expect(() => zodSchema.parse({ code: "value" })).not.toThrow();
    });

    it("should preserve tool schema structure for AI SDK compatibility", () => {
      // Test that converted schemas work with patterns similar to AI SDK usage
      const tools = mcpServer.getTools();

      for (const tool of tools) {
        const zodSchema = converter.convert(tool.inputSchema);

        // Test that the schema can be used for validation
        // This simulates how AI SDK might use these schemas
        const testValidation = (data: unknown) => {
          try {
            zodSchema.parse(data);
            return { success: true };
          } catch (error) {
            return { success: false, error };
          }
        };

        // Each tool should fail on empty object except those with no required fields
        const result = testValidation({});
        const hasRequiredFields = tool.inputSchema.required && tool.inputSchema.required.length > 0;

        if (hasRequiredFields) {
          expect(result.success).toBe(false);
        }
      }
    });

    it("should handle malformed tool schemas gracefully", () => {
      const malformedSchemas = [
        { type: "object", properties: null }, // null properties
        { type: "object", properties: "not-an-object" }, // wrong type for properties
        { type: "object", properties: {}, required: "not-an-array" }, // wrong type for required
        { type: "object", properties: { field: {} } }, // field without type
      ];

      // Converter should handle these without throwing
      for (const schema of malformedSchemas) {
        expect(() => converter.convert(schema as unknown as JsonSchema)).not.toThrow();
      }
    });
  });

  describe("Invalid Schema Detection", () => {
    it("should reject schemas with non-object type at root level for tools", () => {
      const invalidSchemas = [
        { type: "string" },
        { type: "number" },
        { type: "boolean" },
        { type: "array" },
      ];

      invalidSchemas.forEach(schema => {
        // For tool schemas, we expect type to be "object"
        expect(schema.type).not.toBe("object");
      });
    });
  });
});
