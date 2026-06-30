import type { RuntimeContext } from "./RuntimeContext.js";
import type { ProviderResponse } from "./types.js";

export interface Provider {
  generate(context: RuntimeContext): Promise<ProviderResponse>;
}
