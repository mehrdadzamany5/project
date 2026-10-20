import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Base44 sandbox preview overrides.
 *
 * The preview proxy forwards a hostname that rotates whenever the environment
 * is recreated, so Vite's dev-server host allowlist is extended with the
 * wildcard sandbox domain. This is gated on BASE44_PREVIEW_MODE === '1' so a
 * normal local or CI run keeps Vite's stock behaviour (no extra allowed hosts).
 */
const previewAllowedHosts =
  process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN
    ? [`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`]
    : undefined

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    ...(previewAllowedHosts ? { allowedHosts: previewAllowedHosts } : {}),
  },
})
