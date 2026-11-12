// Store screenshots: npm run store-screenshots [-- <locale> ...]
// Plays the production build in Chrome (playwright-core drives the installed /usr/bin/google-chrome) with a seeded
// mid-game progress, taps some differences, and frames each screen under its caption from
// assets/store/listing/<locale>/screenshots.txt. Writes store-screenshots/<device>/<locale>/NN-<shot>.png for
// Google Play phones, the 6.9" iPhone and the 13" iPad (also fine for Play tablets), plus the Play feature graphic
// store-screenshots/feature-graphic/<locale>.png (gitignored).
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { chromium, type Browser, type Locator, type Page } from 'playwright-core'
import { preview } from 'vite'
import { levelById } from '../src/levels/index.ts'
import { styledLevel, type PictureStyle } from '../src/levels/picture-style.ts'
import { timeTravelLevelById } from '../src/levels/time-travel/index.ts'

const CHROME = '/usr/bin/google-chrome'
const PORT = 4175
const BASE = `http://localhost:${PORT}`
const OUT = 'store-screenshots'
const LISTING = 'assets/store/listing'

const INK = '#23302b'
const FONT = `system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif`

/** Store sizes in pixels and the app viewport (CSS pixels) framed inside them. */
interface Device {
  name: string
  width: number
  height: number
  viewport: { width: number; height: number }
  /** Caption font size and the height of the caption band, in output pixels. */
  font: number
  band: number
}

const DEVICES: Device[] = [
  { name: 'play-phone', width: 1080, height: 1920, viewport: { width: 400, height: 720 }, font: 72, band: 330 },
  { name: 'ios-iphone-6.9', width: 1290, height: 2796, viewport: { width: 393, height: 852 }, font: 92, band: 430 },
  { name: 'ios-ipad-13', width: 2048, height: 2732, viewport: { width: 700, height: 933 }, font: 112, band: 420 },
]

/** A screen of the game: where to go, what to set first, what to do before the picture is taken. */
interface Shot {
  name: string
  route: string
  settings?: Record<string, unknown>
  act?: (page: Page) => Promise<void>
}

/** Where a picture's viewBox lands on the page: the svg fits it centered ("xMidYMid meet"), leaving empty bands. */
async function pictureBox(svg: Locator) {
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

/** Taps the centers of the first `count` still differences of a level on picture B, as drawn or as 3D pictures. */
const findDifferences = (id: number, count: number, style: PictureStyle = 'classic') => async (page: Page) => {
  const level = styledLevel(levelById(id)!, style)
  for (const d of level.differences.filter((d) => !d.animatedId).slice(0, count)) {
    const [x, y] = (await pictureBox(page.locator('.pictures svg').nth(1))).at(d.x, d.y)
    await page.touchscreen.tap(x, y)
    await page.waitForTimeout(250)
  }
}

/** Taps the first `count` odd items of a "find the odd one out" level (positions in percent of the picture). */
const findOddItems = (id: string, count: number) => async (page: Page) => {
  const level = timeTravelLevelById(id)!
  for (const item of level.items.slice(0, count)) {
    const [cx, cy] = item.shape === 'circle' ? [item.x, item.y] : [item.x + item.w / 2, item.y + item.h / 2]
    const [x, y] = (await pictureBox(page.locator('.pictures svg').first())).at((cx / 100) * level.width, (cy / 100) * level.height)
    await page.touchscreen.tap(x, y)
    await page.waitForTimeout(300)
  }
}

// Order = order in the stores; captions are the lines of screenshots.txt in the same order.
const SHOTS: Shot[] = [
  { name: 'level', route: '/level/75', act: findDifferences(75, 4) },
  // The same level as 3D pictures: every level is drawn, many also come in 3D.
  { name: 'level-3d', route: '/level/75', settings: { pictureStyle: 'redesign' }, act: findDifferences(75, 4, 'redesign') },
  { name: 'modes', route: '/levels' },
  { name: 'time', route: '/level/203', act: findDifferences(203, 3) },
  { name: 'detective', route: '/detective/cake' },
  { name: 'travel', route: '/travel' },
  { name: 'time-travel', route: '/time-travel/rome-01', act: findOddItems('rome-01', 3) },
  { name: 'calm', route: '/', settings: { mode: 'calm' } },
]

/** A player some way into the game: worlds up to the sea, a few levels of every mode, the full game bought. */
function seededProgress() {
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

/** The app screen as a PNG for `locale` on `device`. */
async function capture(browser: Browser, device: Device, locale: string, shot: Shot): Promise<Buffer> {
  const ctx = await browser.newContext({ viewport: device.viewport, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
  const settings = { locale, theme: 'light', season: 'summer', musicVolume: 0, soundVolume: 0, ...shot.settings }
  await ctx.addInitScript(
    ([settings, progress]) => {
      localStorage.setItem('CapacitorStorage.settings', JSON.stringify(settings))
      localStorage.setItem('CapacitorStorage.progress', JSON.stringify(progress))
      localStorage.setItem('CapacitorStorage.purchase', JSON.stringify({ fullGame: true }))
    },
    [settings, seededProgress()] as const,
  )
  const page = await ctx.newPage()
  await page.goto(BASE + shot.route)
  await page.waitForTimeout(1200)
  await shot.act?.(page)
  await page.waitForTimeout(600)
  const png = await page.screenshot()
  await ctx.close()
  return png
}

/** Line breaks between words for scripts written without spaces (Japanese by phrase) or that keep words whole (Korean). */
const WORD_BREAK: Record<string, string> = { ja: 'auto-phrase', ko: 'keep-all' }

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** The app screen in a phone frame under its caption, at the store size. */
async function frame(browser: Browser, device: Device, locale: string, caption: string, screen: Buffer): Promise<Buffer> {
  const page = await browser.newPage({ viewport: { width: device.width, height: device.height } })
  const frameWidth = Math.round(device.width * 0.8)
  const bezel = Math.round(device.width * 0.014)
  const radius = Math.round(device.width * 0.055)
  await page.setContent(`<!doctype html><html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}"><body style="margin:0">
    <div style="width:${device.width}px;height:${device.height}px;overflow:hidden;position:relative;
      background:linear-gradient(180deg,#a8dcf2 0%,#d9f0f4 45%,#f4f1ea 100%);font-family:${FONT}">
      <div style="height:${device.band}px;display:flex;align-items:center;justify-content:center;
        padding:0 ${Math.round(device.width * 0.07)}px;box-sizing:border-box;text-align:center;color:${INK};
        font-size:${device.font}px;font-weight:800;line-height:1.15;letter-spacing:-0.01em;text-wrap:balance;word-break:${WORD_BREAK[locale] ?? 'normal'}">${escape(caption)}</div>
      <div style="width:${frameWidth}px;margin:0 auto;border:${bezel}px solid ${INK};border-radius:${radius}px;
        overflow:hidden;box-shadow:0 ${bezel * 2}px ${bezel * 5}px rgba(35,48,43,.35);background:#fff">
        <img src="data:image/png;base64,${screen.toString('base64')}" style="display:block;width:100%">
      </div>
    </div></body></html>`)
  await page.evaluate('document.fonts.ready')
  const png = await page.screenshot()
  await page.close()
  return png
}

/** Play feature graphic (1024×500): icon, name and tagline beside a level picture. */
async function featureGraphic(browser: Browser, locale: string, picture: Buffer): Promise<Buffer> {
  const icon = readFileSync('public/favicon.svg', 'base64')
  const tagline = JSON.parse(readFileSync(`src/i18n/${locale}.json`, 'utf8')).map.task as string
  const page = await browser.newPage({ viewport: { width: 1024, height: 500 } })
  await page.setContent(`<!doctype html><html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}"><body style="margin:0">
    <div style="width:1024px;height:500px;display:flex;align-items:center;gap:36px;padding:0 44px;box-sizing:border-box;
      background:linear-gradient(135deg,#a8dcf2 0%,#e3f3f2 55%,#f4f1ea 100%);font-family:${FONT};color:${INK}">
      <div style="flex:0 0 360px">
        <img src="data:image/svg+xml;base64,${icon}" width="112" height="112" style="border-radius:26px;box-shadow:0 8px 20px rgba(35,48,43,.25)">
        <div style="font-size:64px;font-weight:800;margin-top:18px;line-height:1">Keen Eye</div>
        <div style="font-size:34px;font-weight:700;margin-top:14px;line-height:1.2">${escape(tagline)}</div>
      </div>
      <img src="data:image/png;base64,${picture.toString('base64')}"
        style="flex:1;min-width:0;border-radius:22px;border:8px solid #fff;box-shadow:0 10px 26px rgba(35,48,43,.3)">
    </div></body></html>`)
  await page.evaluate('document.fonts.ready')
  const png = await page.screenshot()
  await page.close()
  return png
}

/** Picture A of the first shot's level, wide, for the feature graphic. */
async function levelPicture(browser: Browser): Promise<Buffer> {
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 760 }, deviceScaleFactor: 1 })
  await ctx.addInitScript((progress) => {
    localStorage.setItem('CapacitorStorage.settings', JSON.stringify({ locale: 'en', theme: 'light', musicVolume: 0, soundVolume: 0 }))
    localStorage.setItem('CapacitorStorage.progress', JSON.stringify(progress))
    localStorage.setItem('CapacitorStorage.purchase', JSON.stringify({ fullGame: true }))
  }, seededProgress())
  const page = await ctx.newPage()
  await page.goto(`${BASE}/level/75`)
  await page.waitForTimeout(1200)
  const png = await page.screenshot({ clip: (await pictureBox(page.locator('.pictures svg').first())).clip })
  await ctx.close()
  return png
}

const all = readdirSync(LISTING, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
const locales = process.argv.length > 2 ? process.argv.slice(2) : all

const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: 'error' })
const browser = await chromium.launch({ executablePath: CHROME })
try {
  const picture = await levelPicture(browser)
  for (const locale of locales) {
    const captions = readFileSync(`${LISTING}/${locale}/screenshots.txt`, 'utf8').trim().split('\n')
    if (captions.length !== SHOTS.length) throw new Error(`${locale}: ${captions.length} captions for ${SHOTS.length} shots`)
    for (const device of DEVICES) {
      const dir = `${OUT}/${device.name}/${locale}`
      // Start clean: shots renamed or renumbered would leave old files behind.
      rmSync(dir, { recursive: true, force: true })
      mkdirSync(dir, { recursive: true })
      for (const [i, shot] of SHOTS.entries()) {
        const screen = await capture(browser, device, locale, shot)
        writeFileSync(`${dir}/${String(i + 1).padStart(2, '0')}-${shot.name}.png`, await frame(browser, device, locale, captions[i], screen))
      }
    }
    mkdirSync(`${OUT}/feature-graphic`, { recursive: true })
    writeFileSync(`${OUT}/feature-graphic/${locale}.png`, await featureGraphic(browser, locale, picture))
    console.log(locale)
  }
} finally {
  await browser.close()
  await new Promise<void>((resolve) => server.httpServer.close(() => resolve()))
}
