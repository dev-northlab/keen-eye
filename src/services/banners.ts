// The photo banners of the "tiny boy" levels (TinyBoyView): the router gets them ready with the screen's backdrop, so
// the list opens with its photos in place instead of each one decoding after the screen appears.
import type { Level } from '../engine/types.ts'
import { chapterLevels, chapterLevelsWithHidden, TINY_BOY_CHAPTER } from '../levels/chapters.ts'
import { useSettingsStore } from '../stores/settings.ts'
import { preloadImage } from './images.ts'

/** The levels the "tiny boy" screen lists: developer mode also shows the hidden ones (levels/upcoming.ts). */
export const tinyBoyLevels = (): Level[] =>
  useSettingsStore().developer ? chapterLevelsWithHidden(TINY_BOY_CHAPTER) : chapterLevels(TINY_BOY_CHAPTER)

/** The photo of a "tiny boy" level's banner (public/banners/). */
export const tinyBoyBanner = (id: number) => `${import.meta.env.BASE_URL}banners/tiny-boy-${id}.avif`

/** Gets the banner photos of the listed "tiny boy" levels ready. */
export const preloadTinyBoyBanners = () =>
  Promise.all(tinyBoyLevels().map((level) => preloadImage(tinyBoyBanner(level.id)))).then(() => {})
