import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { buildSync } from 'esbuild';
import { join } from 'node:path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  build: {
    manifest: true,
  },
  plugins: [
    react(),
    {
      name: 'build-sw',
      apply: 'build',
      enforce: 'post',
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), 'cacheServiceWorker.js')],
          outfile: join(process.cwd(), 'dist', 'cacheServiceWorker.js'),
        });
      },
    },
  ],
});
