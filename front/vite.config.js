import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy eliminado, ahora las peticiones deben ir directo a http://localhost:3000 en los fetch
  },
})
