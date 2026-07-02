import { ValidationError } from "../errors";

/**
 * A schema capable of validating and parsing a value.
 */
export interface Schema<T> {
	parse(value: unknown): T;
}

/**
 * Validates a value against a schema.
 */
export function validate<T>(schema: Schema<T>, value: unknown): T {
	try {
		return schema.parse(value);
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}

		throw new ValidationError(
			error instanceof Error ? error.message : "Validation failed.",
			error instanceof Error ? { cause: error } : undefined,
		);
	}
}
