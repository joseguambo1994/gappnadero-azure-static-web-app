import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  assetsInclude: ["**/*.lottie"],
  plugins: [react()],
  define: {
    'process.env': {}
  }
})
