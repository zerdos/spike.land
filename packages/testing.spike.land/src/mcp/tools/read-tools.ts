import type { ICodeSession } from "@spike-npm-land/code";
import type {
  McpTool,
  ReadCodeResult,
  ReadHtmlResult,
  ReadSessionResult,
} from "../types";

export const readCodeTool: McpTool = {
  name: "read_code",
  description: "Read current code only. Use before making changes to understand the codebase.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to read code from",
      },
    },
    required: ["codeSpace"],
  },
};

export const readHtmlTool: McpTool = {
  name: "read_html",
  description: "Read current HTML output only. Lightweight way to check rendering results.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to read HTML from",
      },
    },
    required: ["codeSpace"],
  },
};

export const readSessionTool: McpTool = {
  name: "read_session",
  description:
    "Read ALL session data (code+html+css). Use sparingly - prefer specific read tools.",
  inputSchema: {
    type: "object",
    properties: {
      codeSpace: {
        type: "string",
        description: "The codeSpace identifier to read session from",
      },
    },
    required: ["codeSpace"],
  },
};

export const readTools: McpTool[] = [readCodeTool, readHtmlTool, readSessionTool];

export function executeReadCode(
  session: ICodeSession,
  codeSpace: string,
): ReadCodeResult {
  return {
    code: session.code,
    codeSpace,
  };
}

export function executeReadHtml(
  session: ICodeSession,
  codeSpace: string,
): ReadHtmlResult {
  return {
    html: session.html,
    codeSpace,
  };
}

export function executeReadSession(
  session: ICodeSession,
  codeSpace: string,
): ReadSessionResult {
  return {
    code: session.code,
    html: session.html,
    css: session.css,
    codeSpace,
  };
}
