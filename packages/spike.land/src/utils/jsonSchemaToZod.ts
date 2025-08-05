import { z } from "zod";

export interface JsonSchema {
  type?: string;
  description?: string;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
}

export class JsonSchemaToZodConverter {
  /**
   * Convert JSON Schema to Zod schema
   * Handles basic types: string, number, boolean, object, array
   */
  convert(schema: JsonSchema | null | undefined): z.ZodTypeAny {
    if (!schema || !schema.type) {
      return z.any();
    }

    switch (schema.type) {
      case "string": {
        let stringSchema = z.string();
        if (schema.description) {
          stringSchema = stringSchema.describe(schema.description);
        }
        return stringSchema;
      }

      case "number": {
        let numberSchema = z.number();
        if (schema.description) {
          numberSchema = numberSchema.describe(schema.description);
        }
        return numberSchema;
      }

      case "boolean": {
        let booleanSchema = z.boolean();
        if (schema.description) {
          booleanSchema = booleanSchema.describe(schema.description);
        }
        return booleanSchema;
      }

      case "array": {
        if (schema.items) {
          const itemSchema = this.convert(schema.items);
          let arraySchema = z.array(itemSchema);
          if (schema.description) {
            arraySchema = arraySchema.describe(schema.description);
          }
          return arraySchema;
        }
        return z.array(z.any());
      }

      case "object": {
        if (schema.properties) {
          const shape: Record<string, z.ZodTypeAny> = {};
          const required = schema.required || [];

          for (const [key, value] of Object.entries(schema.properties)) {
            let fieldSchema = this.convert(value);

            // Make field optional if not in required array
            if (!required.includes(key)) {
              fieldSchema = fieldSchema.optional();
            }

            shape[key] = fieldSchema;
          }

          return z.object(shape);
        }
        return z.object({});
      }

      default:
        return z.any();
    }
  }
}
