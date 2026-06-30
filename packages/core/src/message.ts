export type MessageRole =
  | "system"
  | "user"
  | "assistant"
  | "tool";

export interface TextContent {
  type: "text";
  text: string;
}

export interface ToolCallContent {
  type: "tool-call";

  id: string;

  tool: string;

  arguments: Record<string, unknown>;
}

export interface ToolResultContent {
  type: "tool-result";

  id: string;

  tool: string;

  result: unknown;

  isError?: boolean;
}

export type MessageContent =
  | TextContent
  | ToolCallContent
  | ToolResultContent;

export interface Message {
  id: string;

  role: MessageRole;

  content: MessageContent;

  createdAt: number;

  metadata?: Record<string, unknown>;
}