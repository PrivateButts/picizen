import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/static/',
  server: {
    port: 3000,
  },
  build: {
    outDir: './dist',
    manifest: true,
    rollupOptions: {
      input: './src/main.ts',
    }
  }
})
