import type { Message } from "@cheela/core";

export interface ToolCall {
  id: string;
  tool: string;
  arguments: Record<string, unknown>;
}

export interface ProviderResponse {
  message: Message;
}

export interface ResponseStep {
  type: "response";
  message: Message;
}

export interface ToolStep {
  type: "tool";
  call: ToolCall;
}

export type ExecutionStep = ResponseStep | ToolStep;

export interface RuntimeResult {
  executionId: string;
  messages: readonly Message[];
  duration: number;
}

export interface RunOptions {
  messages: readonly Message[];
}

export interface RuntimeOptions {
  provider: Provider;
  planner: Planner;
  registry: ToolRegistry;
  events?: EventEmitter;
}