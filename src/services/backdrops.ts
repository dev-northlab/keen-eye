import type { BackdropTheme } from '../levels/chapters.ts'
import { useSettingsStore } from '../stores/settings.ts'
import { preloadImage } from './images.ts'

/** A portrait window (phones): the meadow and "tiny boy" show their upright pictures there. */
export const TALL_WINDOW = '(max-aspect-ratio: 1/1)'

/**
 * The ready picture (public/backdrops/) `ScreenBackdrop` shows for `theme` with the current settings, or null when
 * the backdrop is drawn: the redesigned picture style (levels/picture-style.ts) has the meadow and every world one
 * per day and night (the meadow upright on a portrait window, `tall`), and space a single one (it is dark in both
 * themes). "Tiny boy" has its own autumn picture in both styles, upright on a portrait window, with no night version.
 */
export function backdropPicture(theme: BackdropTheme, tall = false): string | null {
  const settings = useSettingsStore()
  const base = `${import.meta.env.BASE_URL}backdrops/`
  if (theme === 'tinyBoy') return `${base}tiny-boy-${tall ? 'tall' : 'wide'}.avif`
  if (settings.pictureStyle !== 'redesign') return null
  if (theme === 'space') return `${base}space.avif`
  const time = settings.theme === 'dark' ? 'night' : 'day'
  return `${base}${theme === 'meadow' && tall ? 'meadow-tall' : theme}-${time}.avif`
}

/** Gets the picture of `theme`'s backdrop ready, as the window is now; nothing to do for a drawn one. */
export function preloadBackdrop(theme: BackdropTheme): Promise<void> {
  const url = backdropPicture(theme, matchMedia(TALL_WINDOW).matches)
  return url ? preloadImage(url) : Promise.resolve()
}
