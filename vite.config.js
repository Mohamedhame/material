import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Material App',
        short_name: 'Material',
        start_url: '.',
        display: 'standalone',
        background_color: '#333',
        theme_color: '#333',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
