import type { RuntimeContext } from "./RuntimeContext";
import type { ProviderResponse } from "./types";

export interface Provider {
  generate(
    context: RuntimeContext,
  ): Promise<ProviderResponse>;
}