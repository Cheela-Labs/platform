import { ZodTypeAny } from "zod/v3";
import { CapabilityContext } from "./context";

export interface CapabilityDefinition<
    TInput = unknown,
    TOutput = unknown,
> {
    name: string;

    version?: string;

    description?: string;

    input?: ZodTypeAny;

    output?: ZodTypeAny;

    execute(
        context: CapabilityContext<TInput>
    ): Promise<TOutput> | TOutput
}