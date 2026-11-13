// Store screenshots: npm run store-screenshots [-- <locale> ...]
// Plays the production build in Chrome (playwright-core drives the installed /usr/bin/google-chrome) with a seeded
// mid-game progress, taps some differences, and frames each screen under its caption from
// assets/store/listing/<locale>/screenshots.txt. Writes store-screenshots/<device>/<locale>/NN-<shot>.png for
// Google Play phones, the 6.9" iPhone and the 13" iPad (also fine for Play tablets), plus the Play feature graphic
// store-screenshots/feature-graphic/<locale>.png (gitignored).
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { chromium, type Browser, type Page } from 'playwright-core'
import { preview } from 'vite'
import {
  captions as readCaptions, CHROME, escape, findDifferences, FONT, INK, LISTING, pictureBox, seedStorage, WORD_BREAK,
} from './store-common.ts'

const PORT = 4175
const BASE = `http://localhost:${PORT}`
const OUT = 'store-screenshots'

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
  /** Other stored values (key without the storage prefix → value), e.g. the two-player setup. */
  storage?: Record<string, unknown>
  act?: (page: Page) => Promise<void>
}

/** Holds the hot-seat bottle spin (2.6 s) near its end, both players still shown around the bottle. */
const holdBottle = async (page: Page) => {
  await page.evaluate(`for (const a of document.getAnimations())
    if (a.animationName === 'spin-bottle') { a.pause(); a.currentTime = 2400 }`)
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
  // Two players taking turns: the bottle spun for who goes first, held just before it stops (once it stops, the
  // dialog shows only the first player).
  { name: 'duel', route: '/duo/75', storage: { duoSetup: { mode: 'hotseat' } }, act: holdBottle },
  { name: 'calm', route: '/', settings: { mode: 'calm' } },
]

/** The app screen as a PNG for `locale` on `device`. */
async function capture(browser: Browser, device: Device, locale: string, shot: Shot): Promise<Buffer> {
  const ctx = await browser.newContext({ viewport: device.viewport, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
  await seedStorage(ctx, locale, shot.settings, shot.storage)
  const page = await ctx.newPage()
  await page.goto(BASE + shot.route)
  await page.waitForTimeout(1200)
  await shot.act?.(page)
  await page.waitForTimeout(600)
  const png = await page.screenshot()
  await ctx.close()
  return png
}

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
  await seedStorage(ctx, 'en')
  const page = await ctx.newPage()
  await page.goto(`${BASE}/level/75`)
  await page.waitForTimeout(1200)
  const png = await page.screenshot({ clip: (await pictureBox(page.locator('.pictures > svg').first())).clip })
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
    const captions = readCaptions(locale)
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
