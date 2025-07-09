import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/robinrawat007/Portfolio',
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          darkMode: 'class',
          content: ['./index.html', './src/**/*.{js,jsx}'],
        }),
        autoprefixer(),
      ],
    },
  },
});