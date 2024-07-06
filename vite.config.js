import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'cordova/www',
  },
  server: {
    open: true,
  },
  define: {
    'process.env.VITE_PLATFORM': JSON.stringify(process.env.VITE_PLATFORM)
  }
});
