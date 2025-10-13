import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
/**
 * Vite Configuration
 *
 * Features:
 * - Path alias resolution (@/ -> src/)
 * - SASS preprocessing with custom options
 * - Optimized build configuration
 * - Development server settings
 */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Make abstracts available globally (optional)
                additionalData: "@use \"@/styles/abstracts/_variables.scss\" as *;",
                includePaths: [path.resolve(__dirname, './src/styles')],
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'antd-vendor': ['antd', '@ant-design/icons'],
                    'redux-vendor': ['react-redux', '@reduxjs/toolkit'],
                },
            },
        },
    },
});
