import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Proporciona polyfills para módulos de Node.js
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      util: 'util'
    }
  },
  define: {
    // Esto añade una variable global 'process.env'
    'process.env': {}
  },
  build: {
    // Mejora la compatibilidad con entornos de construcción
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
