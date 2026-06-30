// packages/runtime/src/RuntimeContext.ts

import type { Message } from "@cheela/core";

import { RuntimeState, type RuntimeStatus } from "./RuntimeState.js";

export class RuntimeContext {
  constructor(private readonly state: RuntimeState) {}

  // ---------------------------------------------------------------------------
  // Runtime
  // ---------------------------------------------------------------------------

  get executionId(): string {
    return this.state.executionId;
  }

  get status(): RuntimeStatus {
    return this.state.status;
  }

  get iteration(): number {
    return this.state.iteration;
  }

  get startedAt(): number | undefined {
    return this.state.startedAt;
  }

  get finishedAt(): number | undefined {
    return this.state.finishedAt;
  }

  get duration(): number | undefined {
    return this.state.duration();
  }

  get error(): Error | undefined {
    return this.state.error;
  }

  // ---------------------------------------------------------------------------
  // Conversation
  // ---------------------------------------------------------------------------

  get messages(): readonly Message[] {
    return this.state.messages;
  }

  // ---------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------

  get<T>(key: string): T | undefined {
    return this.state.get<T>(key);
  }

  has(key: string): boolean {
    return this.state.has(key);
  }

  // ---------------------------------------------------------------------------
  // Cancellation
  // ---------------------------------------------------------------------------

  get signal(): AbortSignal {
    return this.state.signal;
  }

  // ---------------------------------------------------------------------------
  // Status Helpers
  // ---------------------------------------------------------------------------

  isRunning(): boolean {
    return this.state.isRunning();
  }

  isFinished(): boolean {
    return this.state.isFinished();
  }
}
