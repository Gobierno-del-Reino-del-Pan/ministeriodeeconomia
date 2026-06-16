import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: { outDir: './dist', emptyOutDir: true },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'client/src') },
  },

  server: {
    host: true, // or '0.0.0.0' if you prefer
    allowedHosts: [
      'mineco.duckdns.org',
    ],
  },
});