import type { ToolCall } from "./types";

export interface ToolResult {
  content: unknown;
}

export interface ToolRegistry {
  execute(call: ToolCall): Promise<ToolResult>;
}