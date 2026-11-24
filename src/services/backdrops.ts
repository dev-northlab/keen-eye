import type { BackdropTheme } from '../levels/chapters.ts'
import { useSettingsStore } from '../stores/settings.ts'
import { preloadImage } from './images.ts'

/**
 * The ready picture (public/backdrops/) `ScreenBackdrop` shows for `theme` with the current settings, or null when
 * the backdrop is drawn: the redesigned picture style (levels/picture-style.ts) has the meadow and every world one
 * per day and night, and space a single one (it is dark in both themes); "tiny boy" has its own autumn picture in both
 * styles, with no night version. All are upright pictures for phones (1536×2752), cut to the window by `cover`.
 */
export function backdropPicture(theme: BackdropTheme): string | null {
  const settings = useSettingsStore()
  const base = `${import.meta.env.BASE_URL}backdrops/`
  if (theme === 'tinyBoy') return `${base}tiny-boy.avif`
  if (settings.pictureStyle !== 'redesign') return null
  if (theme === 'space') return `${base}space.avif`
  return `${base}${theme}-${settings.theme === 'dark' ? 'night' : 'day'}.avif`
}

/** Gets the picture of `theme`'s backdrop ready; nothing to do for a drawn one. */
export function preloadBackdrop(theme: BackdropTheme): Promise<void> {
  const url = backdropPicture(theme)
  return url ? preloadImage(url) : Promise.resolve()
}
