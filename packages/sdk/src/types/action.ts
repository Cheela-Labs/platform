export interface Action<TInput = unknown, TOutput = unknown> {
	/**
	 * Action name.
	 */
	readonly name: string;

	/**
	 * Human-readable description.
	 */
	readonly description?: string;

	/**
	 * Input schema.
	 */
	readonly input?: TInput;

	/**
	 * Output schema.
	 */
	readonly output?: TOutput;

	/**
	 * Permissions required to execute this action.
	 */
	readonly permissions?: readonly string[];

	/**
	 * Optional metadata.
	 */
	readonly metadata?: Record<string, unknown>;

	/**
	 * Action implementation.
	 */
	readonly handler: (
		context: unknown,
		input: TInput,
	) => Promise<TOutput> | TOutput;
}
