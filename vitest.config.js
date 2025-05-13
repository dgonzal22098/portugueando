import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        setupFiles: './src/setupTests.js',
        globals: true,
        environment: 'jsdom',
    },
});