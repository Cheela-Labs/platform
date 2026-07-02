/**
 * Base runtime error.
 */
export class RuntimeError extends Error {
	override readonly name = "RuntimeError";

	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
