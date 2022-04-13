import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:4000',
        ws: true,
      },
      '/api' : 'http://localhost:4000/',
    }
  },
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL("./src", import.meta.url)),
    }
  }
})
