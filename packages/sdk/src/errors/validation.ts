/**
 * Thrown when an SDK definition is invalid.
 */
export class ValidationError extends Error {
	override readonly name = "ValidationError";

	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
