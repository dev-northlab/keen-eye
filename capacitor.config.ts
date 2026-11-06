import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.northlab.keeneye',
  appName: 'Keen Eye',
  webDir: 'dist',
  android: {
    // Vite's default build target is Chrome 111 / iOS 16.4 (Baseline Widely Available) and the CSS uses
    // color-mix(); on an older Android System WebView Capacitor loads server.errorPath instead.
    minWebViewVersion: 111,
  },
  // public/webview-update.html: plain HTML + ES5 asking to update the WebView from Google Play. Android only:
  // iOS loads errorPath after any failed navigation, so `cap sync ios` (the config is read in the CLI's
  // process) leaves it out.
  ...(process.argv.includes('ios') ? {} : { server: { errorPath: 'webview-update.html' } }),
  plugins: {
    SystemBars: {
      // index.html uses viewport-fit=cover and the CSS pads by env(safe-area-inset-*).
      initialViewportFitValueHint: 'cover',
      // Dark status bar icons on the light app background.
      style: 'LIGHT',
    },
  },
}

export default config
