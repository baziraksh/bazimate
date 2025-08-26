import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress TypeScript errors during build
        if (warning.code === 'TYPESCRIPT_ERROR') return
        warn(warning)
      },
      output: {
        manualChunks: undefined
      }
    }
  }
})
