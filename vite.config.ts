import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  optimizeDeps: {
    include: ['mnemonist/lru-cache'],
    exclude: [
      '@aws-sdk/credential-providers',
      '@aws-sdk/credential-provider-web-identity',
      '@aws-sdk/client-dynamodb',
      '@aws-sdk/lib-dynamodb',
    ],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
