import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: '/src/app',
      components: '/src/components',
      contexts: 'utils/contexts',
      hooks: 'utils/hooks',
      utils: '/src/utils/utils',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  }
})
