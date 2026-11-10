// Big pixel pictures (the redesigned levels' AVIF, the screen backdrops) fetched and decoded ahead, as a game engine
// loads a scene: shown with the same URL, they appear at once instead of decoding as the screen opens (AVIF decodes
// slowly on a weak phone). A few at a time — decoded, one takes ~17 MB, so a whole chapter would not fit a phone.
import { pictureFiles } from '../engine/render.ts'
import type { Level } from '../engine/types.ts'

/** Images got ready, the latest last. Kept referenced, so the browser keeps them ready; older ones are let go. */
const preloaded = new Map<string, HTMLImageElement>()
const KEEP_PRELOADED = 32

/** How long opening a screen waits for its pictures before showing it anyway (a slow download, e.g. the web build). */
const WAIT_MS = 1500

/** Fetches and decodes the image at `url`; resolves when it is ready or failed (a failed one shows as before). */
export function preloadImage(url: string): Promise<void> {
  let image = preloaded.get(url)
  if (image) preloaded.delete(url)
  else {
    image = new Image()
    image.src = url
  }
  preloaded.set(url, image)
  if (preloaded.size > KEEP_PRELOADED) preloaded.delete(preloaded.keys().next().value!)
  return image.decode().catch(() => {})
}

/** Gets the pictures of `level` ready (the level as it will be played: `styledLevel`). Nothing to do for a drawn scene. */
export const preloadPictures = (level: Level) => Promise.all(pictureFiles(level).map(preloadImage)).then(() => {})

/** `ready`, or `WAIT_MS` if it takes longer: a screen waits for its pictures, but not for long. */
export const waitAtMost = (ready: Promise<unknown>) =>
  Promise.race([ready, new Promise((done) => setTimeout(done, WAIT_MS))]).then(() => {})
