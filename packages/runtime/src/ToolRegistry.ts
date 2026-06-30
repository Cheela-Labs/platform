import type { ToolCall } from "./types.js";

export interface ToolResult {
  content: unknown;
}

export interface ToolRegistry {
  execute(call: ToolCall): Promise<ToolResult>;
}
