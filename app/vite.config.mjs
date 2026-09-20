import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Build output deliberately goes to app/dist, NOT to ../docs.
 *
 * docs/index.html is the live site, generated from design/avinash-console.html
 * and served by GitHub Pages. Pointing Vite at it now would replace a finished
 * portfolio with a scaffold of placeholder routes on the next deploy. The
 * outDir switches to "../docs" only at cutover, once the port reaches parity
 * and the audit passes against the React build.
 */
export default defineConfig({
  plugins: [react()],
  // Pages serves this repo from a project subpath; relative asset URLs work
  // under any base, including the file:// loads the QA harness uses.
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
