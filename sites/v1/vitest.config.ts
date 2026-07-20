import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // `@vitejs/plugin-react` resolves a newer Vite than vitest 2.1.8's bundled
  // Vite, so the two `Plugin` types are nominally different. The plugin works
  // fine at runtime; the cast just reconciles the duplicate Vite type identities.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react()] as any,
  resolve: {
    alias: [
      // Mirror the tsconfig `@/*` -> ./src/* path alias.
      { find: /^@\//, replacement: path.resolve(__dirname, "src") + "/" },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
