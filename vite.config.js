import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', // ✅ Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [react(), tailwindcss(),],
})
