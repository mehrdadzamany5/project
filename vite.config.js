import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The API runs as a separate process. In development both are exposed through
// this dev server (single origin), so cookies and uploads work without CORS.
const apiTarget = process.env.API_PROXY_TARGET || 'http://127.0.0.1:8000'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // The preview proxy forwards the sandbox hostname in the Host header.
    allowedHosts: true,
    // Bind mounts inside the sandbox often miss inotify events; polling keeps
    // hot reload working when the compose file enables it.
    watch: process.env.CHOKIDAR_USEPOLLING === '1' ? { usePolling: true, interval: 300 } : undefined,
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
      '/uploads': { target: apiTarget, changeOrigin: true },
    },
  },
})
