/**
 * A capability represents a named operation that can be exposed
 * by a runtime or provider.
 */
export interface Capability<TInput = unknown, TOutput = unknown> {
	/**
	 * Unique capability name.
	 */
	readonly name: string;

	/**
	 * Human-readable description.
	 */
	readonly description?: string;

	/**
	 * Capability Version.
	 */
	readonly version?: string;

	/**
	 * Input schema associated with the capability.
	 */
	readonly input?: TInput;

	/**
	 * Output schema associated with the capability.
	 */
	readonly output?: TOutput;

	/**
	 * Optional metadata.
	 */
	readonly metadata?: Record<string, unknown>;
}
