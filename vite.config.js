import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: "http://91.229.8.136/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
