import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable history API fallback for SPA
    historyApiFallback: true,
  },
  define: {
    global: 'window'
  },
  build: {
    // Optional: Ensure proper handling in production builds
    rollupOptions: {
      output: {
        manualChunks: undefined, // Keeps chunks together for better routing
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Adjust for cleaner imports
    },
  },
})
