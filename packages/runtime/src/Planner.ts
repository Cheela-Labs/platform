import type { RuntimeContext } from "./RuntimeContext";
import type {
  ExecutionStep,
  ProviderResponse,
} from "./types";

export interface Planner {
  plan(
    context: RuntimeContext,
    response: ProviderResponse,
  ): Promise<ExecutionStep>;
}