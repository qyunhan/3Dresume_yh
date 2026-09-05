import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js is intentionally the dominant Phase 1 dependency.
    chunkSizeWarningLimit: 1200,
  },
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.worktrees/**'],
    setupFiles: './src/test/setup.js',
  },
})
