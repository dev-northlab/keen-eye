import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.keeneye.app',
  appName: 'Keen Eye',
  webDir: 'dist',
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
