import type { RuntimeContext } from "./RuntimeContext.js";
import type { ExecutionStep, ProviderResponse } from "./types.js";

export interface Planner {
  plan(
    context: RuntimeContext,
    response: ProviderResponse,
  ): Promise<ExecutionStep>;
}
