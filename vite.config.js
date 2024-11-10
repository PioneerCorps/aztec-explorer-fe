import { defineConfig } from "vite";
import { aztec } from "@shieldswap/vite-plugin-aztec";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({ include: ["fs/promises"] }),
    topLevelAwait(),
    react(),
    svgr(),
  ],
});
