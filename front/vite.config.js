import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default defineConfig({
  plugins: [react()],
  server: {
    // middlewareMode: true,  // ❌ Elimina esta línea
  },
  configureServer: ({ middlewares }) => {
    middlewares.use(
      '/auth',
      createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true })
    )
  },
})
