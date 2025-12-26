import type { ICodeSession } from "@spike-npm-land/code";
import type { FindLinesResult, LineMatch, McpTool } from "../types";

export const findLinesTool: McpTool = {
  name: "find_lines",
  description:
    "Find line numbers containing a search pattern. Use before edit_code to locate target lines.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to search in",
      },
      pattern: {
        type: "string",
        description: "Pattern to search for",
      },
      isRegex: {
        type: "boolean",
        description: "Whether pattern is a regular expression (default: false)",
      },
    },
    required: ["codeSpace", "pattern"],
  },
};

export const findTools: McpTool[] = [findLinesTool];

export function executeFindLines(
  session: ICodeSession,
  codeSpace: string,
  pattern: string,
  isRegex: boolean,
): FindLinesResult {
  const code = session.code || "";
  const lines = code.split("\n");
  const matches: LineMatch[] = [];

  try {
    const searchPattern = isRegex ? new RegExp(pattern, "gi") : pattern;

    lines.forEach((line: string, index: number) => {
      const lineNumber = index + 1;
      if (isRegex) {
        const regex = searchPattern as RegExp;
        const match = line.match(regex);
        if (match) {
          matches.push({
            lineNumber,
            content: line,
            matchText: match[0],
          });
        }
      } else {
        if (line.includes(searchPattern as string)) {
          matches.push({
            lineNumber,
            content: line,
            matchText: searchPattern as string,
          });
        }
      }
    });
  } catch (error) {
    throw new Error(
      `Invalid regex pattern: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  return {
    pattern,
    isRegex,
    matches,
    totalMatches: matches.length,
    codeSpace,
  };
}
