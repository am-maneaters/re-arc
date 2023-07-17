import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig((props) => {
  return {
    plugins: [react()],
    publicDir: "public/",
    build: {
      outDir: "dist/",
    },
    esbuild: {
      treeShaking: true,
    },
  };
});
