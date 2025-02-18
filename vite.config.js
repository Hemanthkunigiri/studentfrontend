import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 5173, // Use Render's assigned port or default to 5173
    host: "0.0.0.0", // Allow external access
    strictPort: true,
    allowedHosts: ["studentfrontend-p63g.onrender.com"], // Allow Render host
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
