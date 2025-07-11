import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || '/',
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Enables '@/...' for cleaner imports
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`, // Automatically include variables globally
        },
      },
    },
  };
});
