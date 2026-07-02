import { describe, expect, it } from "vitest";

import { createPermission } from "../src";

describe("createPermission", () => {
	it("creates a permission definition", () => {
		const permission = createPermission({
			name: "weather.read",
			description: "Read weather information",
		});

		expect(permission.name).toBe("weather.read");
		expect(permission.description).toBe("Read weather information");
	});
});
