import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // Sesuaikan base dengan folder hasil deploy di GitHub Pages
  // Jika isi dist diupload ke folder "lets-practice" di repo:
  base: "/lets-practice/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
