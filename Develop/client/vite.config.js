import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // Ensure the root is correctly set to the directory containing index.html
  server: {
    port: 3001, // This is the port for Vite
    open: true,  // Automatically open the browser when the server starts
    https: false, // Ensure the Vite dev server uses HTTP instead of HTTPS
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // The Express server (GraphQL) runs here
        secure: false, // Disable SSL validation for this proxy
        changeOrigin: true, // Needed if you're using a virtual hosted site
      }
    }
  }
})
