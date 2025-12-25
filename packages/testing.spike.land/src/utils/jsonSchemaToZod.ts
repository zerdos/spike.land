import { z } from "zod";

/**
 * Supported JSON Schema primitive types
 */
export type JsonSchemaPrimitiveType = "string" | "number" | "integer" | "boolean" | "null";

/**
 * Supported JSON Schema composite types
 */
export type JsonSchemaCompositeType = "object" | "array";

/**
 * All supported JSON Schema types
 * Note: We use string union with specific types for better compatibility with external sources
 */
export type JsonSchemaTypeName =
  | JsonSchemaPrimitiveType
  | JsonSchemaCompositeType
  | (string & Record<never, never>);

/**
 * JSON Schema string format constraints
 */
export interface JsonSchemaStringFormat {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: "email" | "uri" | "uuid" | "date" | "date-time" | "time" | string;
}

/**
 * JSON Schema number constraints
 */
export interface JsonSchemaNumberConstraints {
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
}

/**
 * JSON Schema array constraints
 */
export interface JsonSchemaArrayConstraints {
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

/**
 * Complete JSON Schema type definition for tool input schemas
 * This represents the subset of JSON Schema supported by the converter
 */
export interface JsonSchemaType {
  type?: JsonSchemaTypeName;
  description?: string;
  properties?: Record<string, JsonSchemaType>;
  items?: JsonSchemaType;
  required?: string[];
  enum?: readonly (string | number | boolean | null)[];
  const?: string | number | boolean | null;
  default?: unknown;
  oneOf?: JsonSchemaType[];
  anyOf?: JsonSchemaType[];
  allOf?: JsonSchemaType[];
  $ref?: string;
  additionalProperties?: boolean | JsonSchemaType;

  // String constraints
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;

  // Number constraints
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;

  // Array constraints
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

/**
 * Input schema specifically for MCP tools (always has type: "object")
 */
export interface McpToolInputSchema extends JsonSchemaType {
  type: "object";
  properties: Record<string, JsonSchemaType>;
  required?: string[];
}

/**
 * Type guard to check if a schema is a valid JsonSchemaType
 */
export function isJsonSchemaType(value: unknown): value is JsonSchemaType {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const schema = value as Record<string, unknown>;

  // Must have a type property if it's a proper schema (or be empty for any)
  if ("type" in schema) {
    const validTypes: string[] = [
      "string",
      "number",
      "integer",
      "boolean",
      "null",
      "object",
      "array",
    ];
    if (typeof schema.type !== "string" || !validTypes.includes(schema.type)) {
      return false;
    }
  }

  return true;
}

/**
 * Type guard to check if a schema is a valid MCP tool input schema
 */
export function isMcpToolInputSchema(value: unknown): value is McpToolInputSchema {
  if (!isJsonSchemaType(value)) {
    return false;
  }

  const schema = value as JsonSchemaType;

  return (
    schema.type === "object" &&
    typeof schema.properties === "object" &&
    schema.properties !== null
  );
}

/**
 * Converts JSON Schema to Zod schema for use with the AI SDK
 *
 * The AI SDK requires Zod schemas for tool parameter validation.
 * This class converts JSON Schema (used by MCP tools) to equivalent Zod schemas.
 */
export class JsonSchemaToZodConverter {
  /**
   * Convert a JSON Schema to a Zod schema
   *
   * @param schema - The JSON Schema to convert
   * @returns A Zod schema equivalent to the input JSON Schema
   *
   * @example
   * ```typescript
   * const converter = new JsonSchemaToZodConverter();
   * const zodSchema = converter.convert({
   *   type: "object",
   *   properties: {
   *     name: { type: "string", description: "User name" },
   *     age: { type: "number" }
   *   },
   *   required: ["name"]
   * });
   * ```
   */
  convert(schema: JsonSchemaType | null | undefined): z.ZodTypeAny {
    if (!schema || !schema.type) {
      return z.unknown();
    }

    return this.convertType(schema);
  }

  /**
   * Internal method to convert a schema based on its type
   */
  private convertType(schema: JsonSchemaType): z.ZodTypeAny {
    // Handle enum first as it can apply to multiple types
    if (schema.enum && Array.isArray(schema.enum) && schema.enum.length > 0) {
      return this.convertEnum(schema);
    }

    // Handle const (literal value)
    if ("const" in schema && schema.const !== undefined) {
      return z.literal(schema.const as string | number | boolean);
    }

    switch (schema.type) {
      case "string":
        return this.convertString(schema);

      case "number":
      case "integer":
        return this.convertNumber(schema);

      case "boolean":
        return this.convertBoolean(schema);

      case "null":
        return z.null();

      case "array":
        return this.convertArray(schema);

      case "object":
        return this.convertObject(schema);

      default:
        return z.unknown();
    }
  }

  /**
   * Convert a string schema to Zod
   */
  private convertString(schema: JsonSchemaType): z.ZodTypeAny {
    let stringSchema: z.ZodString = z.string();

    if (schema.minLength !== undefined) {
      stringSchema = stringSchema.min(schema.minLength);
    }

    if (schema.maxLength !== undefined) {
      stringSchema = stringSchema.max(schema.maxLength);
    }

    if (schema.pattern !== undefined) {
      try {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      } catch {
        // Invalid regex pattern, skip this constraint
      }
    }

    // Handle common formats
    if (schema.format) {
      switch (schema.format) {
        case "email":
          stringSchema = stringSchema.email();
          break;
        case "uri":
        case "url":
          stringSchema = stringSchema.url();
          break;
        case "uuid":
          stringSchema = stringSchema.uuid();
          break;
        // Other formats are not directly supported by Zod
      }
    }

    if (schema.description) {
      return stringSchema.describe(schema.description);
    }

    return stringSchema;
  }

  /**
   * Convert a number/integer schema to Zod
   */
  private convertNumber(schema: JsonSchemaType): z.ZodTypeAny {
    let numberSchema: z.ZodNumber = z.number();

    if (schema.type === "integer") {
      numberSchema = numberSchema.int();
    }

    if (schema.minimum !== undefined) {
      numberSchema = numberSchema.min(schema.minimum);
    }

    if (schema.maximum !== undefined) {
      numberSchema = numberSchema.max(schema.maximum);
    }

    if (schema.exclusiveMinimum !== undefined) {
      numberSchema = numberSchema.gt(schema.exclusiveMinimum);
    }

    if (schema.exclusiveMaximum !== undefined) {
      numberSchema = numberSchema.lt(schema.exclusiveMaximum);
    }

    if (schema.multipleOf !== undefined) {
      numberSchema = numberSchema.multipleOf(schema.multipleOf);
    }

    if (schema.description) {
      return numberSchema.describe(schema.description);
    }

    return numberSchema;
  }

  /**
   * Convert a boolean schema to Zod
   */
  private convertBoolean(schema: JsonSchemaType): z.ZodTypeAny {
    let booleanSchema = z.boolean();

    if (schema.description) {
      booleanSchema = booleanSchema.describe(schema.description);
    }

    return booleanSchema;
  }

  /**
   * Convert an array schema to Zod
   */
  private convertArray(schema: JsonSchemaType): z.ZodTypeAny {
    let itemSchema: z.ZodTypeAny;

    if (schema.items) {
      itemSchema = this.convert(schema.items);
    } else {
      itemSchema = z.unknown();
    }

    let arraySchema = z.array(itemSchema);

    if (schema.minItems !== undefined) {
      arraySchema = arraySchema.min(schema.minItems);
    }

    if (schema.maxItems !== undefined) {
      arraySchema = arraySchema.max(schema.maxItems);
    }

    if (schema.description) {
      return arraySchema.describe(schema.description);
    }

    return arraySchema;
  }

  /**
   * Convert an object schema to Zod
   */
  private convertObject(schema: JsonSchemaType): z.ZodTypeAny {
    if (!schema.properties) {
      // Object without defined properties
      // In Zod v4, z.record requires a key schema as the first argument
      if (schema.additionalProperties === true) {
        return z.record(z.string(), z.unknown());
      }
      if (
        typeof schema.additionalProperties === "object" &&
        schema.additionalProperties !== null
      ) {
        return z.record(z.string(), this.convert(schema.additionalProperties));
      }
      return z.object({});
    }

    const shape: Record<string, z.ZodTypeAny> = {};
    const required = new Set(schema.required || []);

    for (const [key, propSchema] of Object.entries(schema.properties)) {
      let fieldSchema = this.convert(propSchema);

      // Make field optional if not in required array
      if (!required.has(key)) {
        fieldSchema = fieldSchema.optional();
      }

      shape[key] = fieldSchema;
    }

    const objectSchema = z.object(shape);

    if (schema.description) {
      return objectSchema.describe(schema.description);
    }

    return objectSchema;
  }

  /**
   * Convert an enum schema to Zod
   */
  private convertEnum(schema: JsonSchemaType): z.ZodTypeAny {
    if (!schema.enum || schema.enum.length === 0) {
      return z.unknown();
    }

    // Check if all values are strings
    const allStrings = schema.enum.every((v) => typeof v === "string");

    if (allStrings && schema.enum.length >= 1) {
      const enumValues = schema.enum as string[];
      // Use z.literal for single value, z.union for multiple
      if (enumValues.length === 1) {
        let literalSchema = z.literal(enumValues[0]);
        if (schema.description) {
          literalSchema = literalSchema.describe(schema.description);
        }
        return literalSchema;
      }

      // For multiple string values, create a union of literals
      const literals = enumValues.map((v) => z.literal(v));
      // We've already checked length >= 2, so first and second are guaranteed
      // Using non-null assertion since we verified length >= 2 above
      const first = literals[0]!;
      const second = literals[1]!;
      const rest = literals.slice(2);
      let unionSchema = z.union([first, second, ...rest]);

      if (schema.description) {
        unionSchema = unionSchema.describe(schema.description);
      }

      return unionSchema;
    }

    // For mixed types or non-string enums, use union of literals
    const literals: z.ZodTypeAny[] = schema.enum.map((value) => {
      if (value === null) {
        return z.null();
      }
      return z.literal(value as string | number | boolean);
    });

    if (literals.length === 1) {
      // Using non-null assertion since we verified length === 1
      const singleLiteral = literals[0]!;
      if (schema.description) {
        return singleLiteral.describe(schema.description);
      }
      return singleLiteral;
    }

    // We've already checked length >= 2
    // Using non-null assertions since we verified length >= 2
    const first = literals[0]!;
    const second = literals[1]!;
    const rest = literals.slice(2);
    let unionSchema = z.union([first, second, ...rest]);

    if (schema.description) {
      unionSchema = unionSchema.describe(schema.description);
    }

    return unionSchema;
  }
}
