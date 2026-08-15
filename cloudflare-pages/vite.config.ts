import react from "@vitejs/plugin-react";
import { copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectDirectory = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: "gemirels-social-card",
      async closeBundle() {
        await copyFile(
          resolve(projectDirectory, "../public/og.png"),
          resolve(projectDirectory, "dist/og.png"),
        );
      },
    },
  ],
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
