import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this project from its repository path in production.
  // Keeping the local base at / preserves `npm run dev` and local previews.
  base: process.env.GITHUB_ACTIONS ? '/3Dresume_yh/' : '/',
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
