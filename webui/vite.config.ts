import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';


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
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(__dirname, "/node_modules/bootstrap-icons")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      }
    }
  }
})
