// Shared by the store scripts (store-screenshots.ts, store-video.ts): the browser, the listing texts, a seeded
// player and taps on a level's differences.
import { readFileSync } from 'node:fs'
import type { BrowserContext, Locator, Page } from 'playwright-core'
import { levelById } from '../src/levels/index.ts'
import { styledLevel, type PictureStyle } from '../src/levels/picture-style.ts'

export const CHROME = '/usr/bin/google-chrome'
export const LISTING = 'assets/store/listing'
export const INK = '#23302b'
export const FONT = `system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif`

/** Line breaks between words for scripts written without spaces (Japanese by phrase) or that keep words whole (Korean). */
export const WORD_BREAK: Record<string, string> = { ja: 'auto-phrase', ko: 'keep-all' }

export const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** The captions of the store screenshots of `locale`, one per line. */
export const captions = (locale: string) => readFileSync(`${LISTING}/${locale}/screenshots.txt`, 'utf8').trim().split('\n')

/** A player some way into the game: worlds up to the sea, a few levels of every mode, the full game bought. */
export function seededProgress() {
  const levels: Record<number, { stars: number; bestTimeSec: number }> = {}
  const done = (from: number, to: number) => {
    for (let id = from; id <= to; id++) levels[id] = { stars: id % 5 === 0 ? 2 : 3, bestTimeSec: 45 + (id % 30) }
  }
  done(1, 74)
  done(201, 205)
  done(301, 304)
  done(401, 409)
  done(501, 503)
  return {
    levels,
    hints: 6,
    timeTravel: { 'egypt-01': { stars: 3, bestTimeSec: 50 } },
    cases: [],
    keys: ['farm', 'city'],
  }
}

/** Stores the seeded player, the full game and `settings` before any page of `ctx` loads. */
export async function seedStorage(
  ctx: BrowserContext,
  locale: string,
  settings: Record<string, unknown> = {},
  storage: Record<string, unknown> = {},
) {
  const stored = {
    settings: { locale, theme: 'light', musicVolume: 0, soundVolume: 0, pictureStyle: 'classic', ...settings },
    progress: seededProgress(),
    purchase: { fullGame: true },
    ...storage,
  }
  await ctx.addInitScript((stored) => {
    for (const [key, value] of Object.entries(stored)) localStorage.setItem(`CapacitorStorage.${key}`, JSON.stringify(value))
  }, stored)
}

/** Where a picture's viewBox lands on the page: the svg fits it centered ("xMidYMid meet"), leaving empty bands. */
export async function pictureBox(svg: Locator) {
  const box = (await svg.boundingBox())!
  const [x, y, w, h] = (await svg.getAttribute('viewBox'))!.split(/[\s,]+/).map(Number)
  const scale = Math.min(box.width / w, box.height / h)
  const left = box.x + (box.width - w * scale) / 2
  const top = box.y + (box.height - h * scale) / 2
  return {
    clip: { x: left, y: top, width: w * scale, height: h * scale },
    /** Page point of a viewBox point. */
    at: (px: number, py: number) => [left + (px - x) * scale, top + (py - y) * scale] as const,
  }
}

/** Taps the centers of the first `count` still differences of a level on picture B, as drawn or as 3D pictures,
 * `pause` ms after each; `tap` makes the touch (the video's hand moves there first). */
export const findDifferences =
  (
    id: number,
    count: number,
    style: PictureStyle = 'classic',
    pause = 250,
    tap = (page: Page, x: number, y: number) => page.touchscreen.tap(x, y),
  ) =>
  async (page: Page) => {
    const level = styledLevel(levelById(id)!, style)
    for (const d of level.differences.filter((d) => !d.animatedId).slice(0, count)) {
      const [x, y] = (await pictureBox(page.locator('.pictures > svg').nth(1))).at(d.x, d.y)
      await tap(page, x, y)
      await page.waitForTimeout(pause)
    }
  }
