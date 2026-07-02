import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		globals: true,

		include: ["test/**/*.test.ts"],
		exclude: ["dist/**", "coverage/**", "node_modules/**"],

		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			reportsDirectory: "./coverage",
			exclude: ["dist/**", "test/**", "**/*.d.ts", "vitest.config.ts"],
		},
	},
});
