import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Shown like the store version (versionName / MARKETING_VERSION): 1.0.0 → "1.0", 1.0.2 → "1.0.2".
const { version } = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8')) as { version: string }
const appVersion = version.replace(/^(\d+\.\d+)\.0$/, '$1')

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // The app sits at the root of the Capacitor webview; the GitHub Pages workflow builds it for its subpath.
  base: process.env.BASE_PATH ?? '/',
  server: { port: 3000, strictPort: true },
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
    // vue-i18n esm-bundler feature flags: Composition API only.
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
})
