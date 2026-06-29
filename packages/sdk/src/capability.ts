import { CapabilityDefinition } from "./types";

export function defineCapability<
    TInput,
    TOutput
>(
    capability: CapabilityDefinition<
        TInput,
        TOutput
    >,
) {
    return capability;
}