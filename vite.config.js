import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, // Use Render's assigned port or default to 5173
    host: "0.0.0.0", // Make the server accessible externally
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
