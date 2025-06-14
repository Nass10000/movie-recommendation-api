import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Solo proxea las rutas de API, no el callback del frontend
      '/auth/login': 'http://localhost:3000',
      '/auth/register': 'http://localhost:3000',
      '/auth/me': 'http://localhost:3000',
      // ...agrega aquí las rutas de API que necesites
    },
  },
})
