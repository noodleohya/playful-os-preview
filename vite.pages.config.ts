import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/playful-os-preview/",
  root: path.join(rootDir, "pages-static"),
  publicDir: path.join(rootDir, "public"),
  plugins: [react()],
  resolve: {
    alias: {
      "next/image": path.join(rootDir, "pages-static/next-image.tsx"),
    },
  },
  css: {
    postcss: path.join(rootDir, "postcss.config.mjs"),
  },
  build: {
    outDir: path.join(rootDir, "pages-dist"),
    emptyOutDir: true,
    sourcemap: false,
  },
});
