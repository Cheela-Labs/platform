import { CapabilityDefinition } from "./types.js";

export function defineCapability<TInput, TOutput>(
  capability: CapabilityDefinition<TInput, TOutput>,
) {
  return capability;
}
