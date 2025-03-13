import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.lottie"],
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})
