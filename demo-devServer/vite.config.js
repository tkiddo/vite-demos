import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // 端口号
    port: 8080,
    open: true,
    proxy: {
      "^/api": {
        target: "http://dog-api.kinduff.com",
      },
    },
  },
});
