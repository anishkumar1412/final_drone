import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows the server to be accessible from any IP address
    port: 3000, // You can specify the port number you want to use
  },
})
