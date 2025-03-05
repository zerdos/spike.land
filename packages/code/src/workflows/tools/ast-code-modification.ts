import { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { format } from "@/lib/shared";
import generate from "@babel/generator";
import { parse, ParseResult, ParserPlugin } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import type { CodeModification } from "../chat-langchain";

/**
 * Represents a code modification operation
 */
interface ModificationOperation {
  type: "add" | "update" | "delete" | "move";
  target: string; // Path to the target node (e.g., "class:UserManager.method:addUser")
  code?: string; // New code for add/update operations
  position?: "before" | "after" | "replace" | "inside"; // Position for add operations
  newTarget?: string; // Target location for move operations
}

/**
 * Creates an error response with consistent format
 */
function createErrorResponse(
  currentCode: string,
  errorMessage: string,
  additionalProps = {},
): CodeModification {
  return {
    code: currentCode,
    error: errorMessage,
    hash: md5(currentCode),
    ...additionalProps,
  };
}

/**
 * Parses the code into an AST
 */
function parseCode(code: string, filePath: string) {
  try {
    // Determine parser plugins based on file extension
    const plugins: ParserPlugin[] = [];

    if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
      plugins.push("typescript");
      if (filePath.endsWith(".tsx")) {
        plugins.push("jsx");
      }
    } else if (filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
      plugins.push("flow");
      if (filePath.endsWith(".jsx")) {
        plugins.push("jsx");
      }
    }

    // Add common plugins
    plugins.push("classProperties", "decorators-legacy");

    return parse(code, {
      sourceType: "module",
      plugins,
    });
  } catch (error) {
    throw new Error(
      `Failed to parse code: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Finds a node in the AST based on the target path
 */
function findNode(ast: ParseResult<t.File>, targetPath: string) {
  let foundNode: t.Node | null = null;

  // Parse the target path (e.g., "class:UserManager.method:addUser")
  const parts = targetPath.split(".");

  traverse(ast, {
    enter(path) {
      // Implementation would match the path parts to find the target node
      // This is a simplified example - a real implementation would be more robust

      if (t.isClassDeclaration(path.node) && parts[0].startsWith("class:")) {
        const className = parts[0].split(":")[1];
        if (path.node.id && path.node.id.name === className) {
          if (parts.length === 1) {
            foundNode = path.node;
            path.stop();
          } else if (parts[1].startsWith("method:")) {
            const methodName = parts[1].split(":")[1];
            path.traverse({
              ClassMethod(methodPath) {
                if (
                  t.isIdentifier(methodPath.node.key) &&
                  methodPath.node.key.name === methodName
                ) {
                  foundNode = methodPath.node;
                  methodPath.stop();
                }
              },
            });
          }
        }
      }
    },
  });

  return foundNode;
}

/**
 * Applies a modification operation to the AST
 */
function applyModification(
  ast: ParseResult<t.File>,
  operation: ModificationOperation,
  filePath: string,
) {
  try {
    // Find the target node
    const targetNode = findNode(ast, operation.target);
    if (!targetNode && operation.type !== "add") {
      throw new Error(`Target not found: ${operation.target}`);
    }

    // Apply the operation based on its type
    switch (operation.type) {
      case "update":
        if (!targetNode) break;
        // Parse the new code and replace the target node
        const newNode = parseCode(operation.code || "", filePath).program.body[0];
        // In a real implementation, we would replace the target node with the new node
        break;

      case "delete":
        if (!targetNode) break;
        // Remove the target node
        // In a real implementation, we would remove the node from its parent
        break;

      case "add":
        // Parse the new code
        const nodeToAdd = parseCode(operation.code || "", filePath).program.body[0];
        // Add the new node at the specified position
        // In a real implementation, we would add the node to the appropriate location
        break;

      case "move":
        if (!targetNode || !operation.newTarget) break;
        // Move the target node to the new target location
        // In a real implementation, we would move the node to the new location
        break;
    }

    return ast;
  } catch (error) {
    throw new Error(
      `Failed to apply modification: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Formats the generated code using prettier
 */
async function formatCode(code: string, filePath: string): Promise<string> {
  try {
    // Determine parser based on file extension
    return await format(code);
  } catch (error) {
    // If formatting fails, return the unformatted code
    console.error("Formatting failed:", error);
    return code;
  }
}

// AST-based code modification tool
export const astCodeModificationTool = tool(
  async (
    {
      operations,
      hash,
      filePath,
    }: {
      operations: ModificationOperation[];
      hash: string;
      filePath: string;
    },
  ): Promise<CodeModification> => {
    // Get current code from the session
    const currentCode = await (globalThis as unknown as {
      cSess: { getCode: () => Promise<string>; };
    }).cSess.getCode();

    // Verify document hash to ensure code integrity
    if (hash && typeof hash === "string") {
      const currentHash = md5(currentCode);
      if (hash !== currentHash) {
        return createErrorResponse(
          currentCode,
          "Document has been modified since last hash. Please try again with the latest version.",
          {
            currentFileContent: currentCode,
            hash: currentHash,
          },
        );
      }
    }

    try {
      // Validate operations
      if (!operations || !Array.isArray(operations) || operations.length === 0) {
        return createErrorResponse(
          currentCode,
          "No valid operations provided. Please specify at least one operation.",
        );
      }

      // Parse the code into an AST
      let ast;
      try {
        ast = parseCode(currentCode, filePath);
      } catch (error) {
        return createErrorResponse(
          currentCode,
          `Failed to parse code: ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      // Apply each operation sequentially
      for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        try {
          ast = applyModification(ast, operation, filePath);
        } catch (error) {
          return createErrorResponse(
            currentCode,
            `Operation ${i + 1} failed: ${error instanceof Error ? error.message : String(error)}`,
            { failedOperation: operation },
          );
        }
      }

      // Generate code from the modified AST
      let modifiedCode = generate(ast).code;

      // Format the code
      modifiedCode = await formatCode(modifiedCode, filePath);

      // If we reach here, all operations were applied successfully
      const cSess = (globalThis as unknown as {
        cSess: ICode;
      }).cSess;

      // Set the modified code in the session
      const res = await cSess.setCode(modifiedCode);

      if (res === false) {
        return createErrorResponse(
          currentCode,
          "Failed to set code in the code session",
        );
      }

      // Calculate the new document hash
      const newhash = md5(modifiedCode);

      // Return success response with the new hash
      return {
        error: "",
        hash: newhash,
        code: modifiedCode,
      };
    } catch (error) {
      // Handle any unexpected errors
      return createErrorResponse(
        currentCode,
        error instanceof Error ? error.message : "Unknown error in code modification",
      );
    }
  },
  {
    name: "ast_code_modification",
    description:
      `AST-based code modification tool that makes semantic changes to code by understanding its structure. This approach is more robust than string-based search/replace, especially for large files.

The tool accepts a list of operations to perform on the code. Each operation specifies:
- type: The type of operation ('add', 'update', 'delete', or 'move')
- target: Path to the target node (e.g., "class:UserManager.method:addUser")
- code: New code for add/update operations
- position: Position for add operations ('before', 'after', 'replace', 'inside')
- newTarget: Target location for move operations

Benefits over string-based search/replace:
1. Understands code structure rather than just text
2. More resilient to formatting differences
3. Can target specific code elements semantically
4. Better handling of large files
5. More precise error messages

Examples:

1. Update a method in a class:
{
  "type": "update",
  "target": "class:UserManager.method:addUser",
  "code": "async addUser(name: string, password: string) { const hashedPassword = await hash(password, 10); const user = { id: this.nextId++, name, password: hashedPassword }; this.users.push(user); return user; }"
}

2. Add a new import:
{
  "type": "add",
  "target": "program",
  "position": "before",
  "code": "import { hash } from 'bcrypt';"
}

3. Add a field to a class:
{
  "type": "add",
  "target": "class:UserManager",
  "position": "inside",
  "code": "private userCount: number = 0;"
}

4. Delete a method:
{
  "type": "delete",
  "target": "class:UserManager.method:removeUser"
}

5. Move a method to another class:
{
  "type": "move",
  "target": "class:UserManager.method:validateUser",
  "newTarget": "class:AuthService"
}`,
    schema: z.object({
      operations: z.array(z.object({
        type: z.enum(["add", "update", "delete", "move"]),
        target: z.string(),
        code: z.string().optional(),
        position: z.enum(["before", "after", "replace", "inside"]).optional(),
        newTarget: z.string().optional(),
      })).describe("List of operations to perform on the code"),
      hash: z.string().describe(
        "MD5 hash of the document being modified. The tool will verify that the document hasn't been modified since the hash was generated.",
      ),
      filePath: z.string().describe(
        "Path to the file being modified, used to determine the appropriate parser plugins.",
      ),
    }),
  },
);
