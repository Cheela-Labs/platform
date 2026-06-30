// packages/runtime/src/RuntimeState.ts

import type { Message } from "@cheela/core"; // Adjust this import as needed.

export type RuntimeStatus =
  "idle" | "running" | "completed" | "failed" | "cancelled";

export interface RuntimeStateOptions {
  executionId: string;
}

export class RuntimeState {
  private readonly _executionId: string;

  private _status: RuntimeStatus = "idle";

  private readonly _messages: Message[] = [];

  private readonly _variables = new Map<string, unknown>();

  private _iteration = 0;

  private _startedAt?: number;

  private _finishedAt?: number;

  private _error?: Error;

  private readonly _abortController = new AbortController();

  constructor({ executionId }: RuntimeStateOptions) {
    this._executionId = executionId;
  }

  // ---------------------------------------------------------------------------
  // Getters
  // ---------------------------------------------------------------------------

  get executionId(): string {
    return this._executionId;
  }

  get status(): RuntimeStatus {
    return this._status;
  }

  get messages(): readonly Message[] {
    return this._messages;
  }

  get iteration(): number {
    return this._iteration;
  }

  get startedAt(): number | undefined {
    return this._startedAt;
  }

  get finishedAt(): number | undefined {
    return this._finishedAt;
  }

  get error(): Error | undefined {
    return this._error;
  }

  get signal(): AbortSignal {
    return this._abortController.signal;
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  start(): void {
    if (this._status !== "idle") {
      throw new Error(`Cannot start runtime from "${this._status}" state.`);
    }

    this._status = "running";
    this._startedAt = Date.now();
  }

  complete(): void {
    if (this._status !== "running") {
      throw new Error(`Cannot complete runtime from "${this._status}" state.`);
    }

    this._status = "completed";
    this._finishedAt = Date.now();
  }

  fail(error: Error): void {
    if (this.isFinished()) {
      return;
    }

    this._error = error;
    this._status = "failed";
    this._finishedAt = Date.now();
  }

  cancel(): void {
    if (this.isFinished()) {
      return;
    }

    this._abortController.abort();

    this._status = "cancelled";
    this._finishedAt = Date.now();
  }

  // ---------------------------------------------------------------------------
  // Conversation
  // ---------------------------------------------------------------------------

  addMessage(message: Message): void {
    this._messages.push(message);
  }

  addMessages(messages: readonly Message[]): void {
    this._messages.push(...messages);
  }

  clearMessages(): void {
    this._messages.length = 0;
  }

  // ---------------------------------------------------------------------------
  // Execution
  // ---------------------------------------------------------------------------

  nextIteration(): number {
    return ++this._iteration;
  }

  // ---------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------

  set<T>(key: string, value: T): void {
    this._variables.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this._variables.get(key) as T | undefined;
  }

  has(key: string): boolean {
    return this._variables.has(key);
  }

  delete(key: string): boolean {
    return this._variables.delete(key);
  }

  clearVariables(): void {
    this._variables.clear();
  }

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------

  duration(): number | undefined {
    if (this._startedAt === undefined) {
      return undefined;
    }

    return (this._finishedAt ?? Date.now()) - this._startedAt;
  }

  isRunning(): boolean {
    return this._status === "running";
  }

  isFinished(): boolean {
    return (
      this._status === "completed" ||
      this._status === "failed" ||
      this._status === "cancelled"
    );
  }
}
