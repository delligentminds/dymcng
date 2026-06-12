import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // If deploying to a subdirectory on GitHub Pages, set base:
  // base: "/dymcng-website/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
