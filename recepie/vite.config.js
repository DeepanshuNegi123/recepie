import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Optional: useful in WSL, Docker, or network drives
    },
    hmr: true, // Ensures HMR is enabled
  },
})
