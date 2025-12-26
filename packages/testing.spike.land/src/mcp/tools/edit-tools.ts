import type { ICodeSession } from "@spike-npm-land/code";
import type {
  EditCodeResult,
  LineEdit,
  McpTool,
  SearchReplaceResult,
  UpdateCodeResult,
} from "../types";

export const updateCodeTool: McpTool = {
  name: "update_code",
  description:
    "Replace ALL code with new content. For smaller changes, use edit_code or search_and_replace instead.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to update code in",
      },
      code: {
        type: "string",
        description: "The complete new code to replace ALL existing code",
      },
    },
    required: ["codeSpace", "code"],
  },
};

export const searchAndReplaceTool: McpTool = {
  name: "search_and_replace",
  description:
    "MOST EFFICIENT: Replace patterns without needing line numbers. Best for simple text replacements.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to perform search and replace in",
      },
      search: {
        type: "string",
        description: "Text or pattern to search for",
      },
      replace: {
        type: "string",
        description: "Replacement text",
      },
      isRegex: {
        type: "boolean",
        description: "Whether search is a regular expression (default: false)",
      },
      global: {
        type: "boolean",
        description: "Replace all occurrences (default: true)",
      },
    },
    required: ["codeSpace", "search", "replace"],
  },
};

export const editCodeTool: McpTool = {
  name: "edit_code",
  description:
    "Make precise line-based edits. More efficient than update_code for targeted changes.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to edit code in",
      },
      edits: {
        type: "array",
        description: "Array of line edits to apply",
        items: {
          type: "object",
          properties: {
            startLine: {
              type: "number",
              description: "Starting line number (1-based)",
            },
            endLine: {
              type: "number",
              description: "Ending line number (1-based)",
            },
            newContent: {
              type: "string",
              description: "New content for the specified lines",
            },
          },
          required: ["startLine", "endLine", "newContent"],
        },
      },
    },
    required: ["codeSpace", "edits"],
  },
};

export const editTools: McpTool[] = [updateCodeTool, searchAndReplaceTool, editCodeTool];

export async function executeUpdateCode(
  session: ICodeSession,
  codeSpace: string,
  code: string,
  updateSession: (session: ICodeSession) => Promise<void>,
): Promise<UpdateCodeResult> {
  console.log(`[MCP] update_code called for codeSpace: ${codeSpace}`);
  console.log(
    `[MCP] Current code length: ${session.code?.length || 0}, New code length: ${code.length}`,
  );

  const updatedSession = {
    ...session,
    code,
    html: "",
    css: "",
    codeSpace,
  };

  console.log(
    `[MCP] Broadcasting session update with empty transpiled to trigger re-transpilation`,
  );
  await updateSession(updatedSession);

  return {
    success: true,
    message:
      `Code updated successfully (${code.length}/500 chars). Transpilation will be triggered automatically.`,
    codeSpace,
    requiresTranspilation: true,
  };
}

export async function executeEditCode(
  session: ICodeSession,
  codeSpace: string,
  edits: LineEdit[],
  updateSession: (session: ICodeSession) => Promise<void>,
): Promise<EditCodeResult> {
  const originalCode = session.code || "";
  const { newCode, diff } = applyLineEdits(originalCode, edits);

  const updatedSession = {
    ...session,
    code: newCode,
    transpiled: "",
    html: "",
    css: "",
    codeSpace,
  };

  await updateSession(updatedSession);

  return {
    success: true,
    message: "Code edited successfully. Transpilation will be triggered automatically.",
    codeSpace,
    diff,
    linesChanged: edits.length,
    requiresTranspilation: true,
  };
}

export async function executeSearchAndReplace(
  session: ICodeSession,
  codeSpace: string,
  search: string,
  replace: string,
  isRegex: boolean,
  global: boolean,
  updateSession: (session: ICodeSession) => Promise<void>,
): Promise<SearchReplaceResult> {
  const originalCode = session.code || "";
  let newCode: string;
  let replacements = 0;

  try {
    if (isRegex) {
      const flags = global ? "g" : "";
      const regex = new RegExp(search, flags);
      const matches = originalCode.match(new RegExp(search, "g"));
      replacements = matches ? matches.length : 0;
      newCode = originalCode.replace(regex, replace);
    } else {
      const searchText = search;
      if (global) {
        const regex = new RegExp(
          searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "g",
        );
        const matches = originalCode.match(regex);
        replacements = matches ? matches.length : 0;
        newCode = originalCode.replace(regex, replace);
      } else {
        const index = originalCode.indexOf(searchText);
        if (index !== -1) {
          replacements = 1;
          newCode = originalCode.substring(0, index) + replace +
            originalCode.substring(index + searchText.length);
        } else {
          replacements = 0;
          newCode = originalCode;
        }
      }
    }
  } catch (error) {
    throw new Error(
      `Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (replacements > 0) {
    const updatedSession = {
      ...session,
      code: newCode,
      transpiled: "",
      html: "",
      css: "",
      codeSpace,
    };

    await updateSession(updatedSession);
  }

  return {
    success: true,
    message: replacements > 0
      ? `Made ${replacements} replacement(s). Transpilation will be triggered automatically.`
      : "No matches found",
    replacements,
    search,
    replace,
    isRegex,
    global,
    codeSpace,
    requiresTranspilation: replacements > 0,
  };
}

export function applyLineEdits(
  originalCode: string,
  edits: LineEdit[],
): { newCode: string; diff: string; } {
  const originalLines = originalCode.split("\n");
  const editsCopy = [...edits].sort((a, b) => b.startLine - a.startLine);

  for (const edit of editsCopy) {
    if (edit.startLine < 1 || edit.endLine < 1) {
      throw new Error("Line numbers must be 1-based and positive");
    }
    if (edit.startLine > edit.endLine) {
      throw new Error("Start line must be less than or equal to end line");
    }
    if (edit.endLine > originalLines.length) {
      throw new Error(
        `End line ${edit.endLine} exceeds code length (${originalLines.length} lines)`,
      );
    }
  }

  const sortedEdits = [...edits].sort((a, b) => a.startLine - b.startLine);
  for (let i = 1; i < sortedEdits.length; i++) {
    const currentEdit = sortedEdits[i];
    const previousEdit = sortedEdits[i - 1];
    if (!currentEdit || !previousEdit) continue;

    if (currentEdit.startLine <= previousEdit.endLine) {
      throw new Error(
        `Overlapping edits detected: lines ${previousEdit.startLine}-${previousEdit.endLine} and ${currentEdit.startLine}-${currentEdit.endLine}`,
      );
    }
  }

  const modifiedLines = [...originalLines];
  const diffParts: string[] = [];

  for (const edit of editsCopy) {
    const startIdx = edit.startLine - 1;
    const endIdx = edit.endLine - 1;
    const removedLines = modifiedLines.slice(startIdx, endIdx + 1);
    const newLines = edit.newContent ? edit.newContent.split("\n") : [];

    const contextStart = Math.max(0, startIdx - 2);
    const contextEnd = Math.min(modifiedLines.length - 1, endIdx + 2);

    const diffHeader = `@@ -${edit.startLine},${
      edit.endLine - edit.startLine + 1
    } +${edit.startLine},${newLines.length} @@`;
    const diffLines = [diffHeader];

    for (let i = contextStart; i < startIdx; i++) {
      diffLines.push(` ${modifiedLines[i]}`);
    }

    for (const line of removedLines) {
      diffLines.push(`-${line}`);
    }

    for (const line of newLines) {
      diffLines.push(`+${line}`);
    }

    for (
      let i = endIdx + 1;
      i <= Math.min(contextEnd, modifiedLines.length - 1);
      i++
    ) {
      diffLines.push(` ${modifiedLines[i]}`);
    }

    diffParts.unshift(diffLines.join("\n"));

    modifiedLines.splice(startIdx, endIdx - startIdx + 1, ...newLines);
  }

  const newCode = modifiedLines.join("\n");
  const diff = diffParts.length > 0
    ? diffParts.join("\n\n")
    : "No changes made";

  return { newCode, diff };
}
