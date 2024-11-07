import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: { port: 8000, open: true, cors: true },
  clearScreen: false,
  base: process.env.NODE_ENV === 'production' ? 'nyt-union-stacker' : '/',
});
