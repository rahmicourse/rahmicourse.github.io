import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/Lets-practice1/', // <-- Ubah bagian ini agar sesuai dengan nama folder di GitHub
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { 
      '@': path.resolve(__dirname, './src') 
    },
  },
});
