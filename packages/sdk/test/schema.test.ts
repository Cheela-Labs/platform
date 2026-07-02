import { describe, expect, it } from "vitest";

import { ValidationError, validate } from "../src";

describe("validate", () => {
	it("returns parsed values", () => {
		const schema = {
			parse(value: unknown) {
				return value as string;
			},
		};

		expect(validate(schema, "hello")).toBe("hello");
	});

	it("throws ValidationError when parsing fails", () => {
		const schema = {
			parse() {
				throw new Error("Invalid input");
			},
		};

		expect(() => validate(schema, {})).toThrow(ValidationError);
	});

	it("rethrows ValidationError", () => {
		const schema = {
			parse() {
				throw new ValidationError("Already validated");
			},
		};

		expect(() => validate(schema, {})).toThrow("Already validated");
	});
});
