import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The dev server proxies /user/* to the Spring Boot backend,
// so the browser never makes a cross-origin request (no CORS needed).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
