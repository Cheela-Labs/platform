import { describe, expect, it } from "vitest";

import { createAction } from "../src";

describe("createAction", () => {
	it("creates an action definition", () => {
		const action = createAction({
			name: "echo",
			description: "Echo input",
			permissions: ["echo.execute"],

			handler: (_ctx, input: string) => input,
		});

		expect(action.name).toBe("echo");
		expect(action.description).toBe("Echo input");
		expect(action.permissions).toEqual(["echo.execute"]);
	});

	it("preserves the handler", async () => {
		const action = createAction({
			name: "echo",

			handler: (_ctx, input: string) => input,
		});

		await expect(action.handler({}, "hello")).toBe("hello");
	});
});
