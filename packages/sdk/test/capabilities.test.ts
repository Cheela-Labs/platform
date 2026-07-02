import { describe, expect, it } from "vitest";

import { createCapability } from "../src";

describe("createCapability", () => {
	it("creates a capability definition", () => {
		const capability = createCapability({
			name: "weather",
			version: "1.0.0",
			description: "Weather capability",
		});

		expect(capability.name).toBe("weather");
		expect(capability.version).toBe("1.0.0");
		expect(capability.description).toBe("Weather capability");
	});

	it("preserves metadata", () => {
		const capability = createCapability({
			name: "weather",
			version: "1.0.0",

			metadata: {
				author: "cheela",
			},
		});

		expect(capability.metadata).toEqual({
			author: "cheela",
		});
	});
});
