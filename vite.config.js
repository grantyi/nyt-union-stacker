import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: { port: 8000, open: true, cors: true },
  clearScreen: false,
  base: './',
});
