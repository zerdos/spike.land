import type { ICodeSession } from "@spike-npm-land/code";

export interface McpRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

export interface McpResponse {
  jsonrpc: string;
  id: string | number;
  result?: Record<string, unknown>;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, Record<string, unknown>>;
    required?: string[];
  };
}

export interface LineEdit {
  startLine: number;
  endLine: number;
  newContent: string;
}

export interface LineMatch {
  lineNumber: number;
  content: string;
  matchText: string;
}

export interface ToolExecutionContext {
  session: ICodeSession;
  codeSpace: string;
  updateSession: (session: ICodeSession) => Promise<void>;
}

export interface ReadCodeResult extends Record<string, unknown> {
  code: string;
  codeSpace: string;
}

export interface ReadHtmlResult extends Record<string, unknown> {
  html: string;
  codeSpace: string;
}

export interface ReadSessionResult extends Record<string, unknown> {
  code: string;
  html: string;
  css: string;
  codeSpace: string;
}

export interface UpdateCodeResult extends Record<string, unknown> {
  success: boolean;
  message: string;
  codeSpace: string;
  requiresTranspilation: boolean;
}

export interface EditCodeResult extends Record<string, unknown> {
  success: boolean;
  message: string;
  codeSpace: string;
  diff: string;
  linesChanged: number;
  requiresTranspilation: boolean;
}

export interface FindLinesResult extends Record<string, unknown> {
  pattern: string;
  isRegex: boolean;
  matches: LineMatch[];
  totalMatches: number;
  codeSpace: string;
}

export interface SearchReplaceResult extends Record<string, unknown> {
  success: boolean;
  message: string;
  replacements: number;
  search: string;
  replace: string;
  isRegex: boolean;
  global: boolean;
  codeSpace: string;
  requiresTranspilation: boolean;
}
