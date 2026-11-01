import { SystemBars, SystemBarsStyle } from '@capacitor/core'

// Light/dark theme: CSS colour tokens switch on html[data-theme] (style.css); on the device the
// status and navigation bar icons follow (dark icons on the light theme, light icons on the dark one).

export type Theme = 'light' | 'dark'

/** The system's preference, used until the player picks a theme. */
export const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  // Not implemented in the browser; there the call just fails.
  SystemBars.setStyle({ style: theme === 'dark' ? SystemBarsStyle.Dark : SystemBarsStyle.Light }).catch(() => {})
}
