import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/data": {
        target: "https://eliabs-siri-ex.s3.eu-west-3.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/data/, ""),
      },
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    strictPort: true,
  },
});
