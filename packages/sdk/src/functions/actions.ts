import type { Action } from "../types";

/**
 * Creates an action definition.
 */
export function createAction<
  TInput = unknown,
  TOutput = unknown,
>(action: Action<TInput, TOutput>): Action<TInput, TOutput> {
  return action;
}