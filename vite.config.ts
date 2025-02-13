import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: '/src/api/_api',
      app: '/src/app',
      components: '/src/components',
      endpoints: '/src/api',
      hookLogic: '/src/hooks',
      hooks: '/src/hooks/_hooks',
      layout: '/src/layout',
      provider: '/src/provider',
      types: '/src/utils/types',
      ui: '/src/ui',
      utils: '/src/utils/_utils',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  }
})
