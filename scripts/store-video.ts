// Store promo video: npm run store-video [-- <locale> ...] (default: en)
// Plays the production build in Chrome (playwright-core) on a phone-sized screen with the seeded player of the store
// screenshots, and records each scene through Chrome's screencast while a drawn hand taps differences and swipes lists
// (every tap is a real touch, made as the finger presses). Each scene is shown in a phone beside its caption
// (assets/store/listing/<locale>/screenshots.txt), and the scenes are joined with crossfades over the menu music into
// store-screenshots/video/keen-eye-<locale>.mp4: 1920×1080, 30 fps, H.264 + AAC — a landscape video for YouTube,
// whose link the Google Play listing takes (gitignored). The hand suits Google Play only: Apple's app previews may not
// show hands on the device.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { chromium, type Browser, type Page } from 'playwright-core'
import { preview } from 'vite'
import {
  captions as readCaptions, CHROME, escape, findDifferences, FONT, INK, pictureBox, seedStorage, WORD_BREAK,
} from './store-common.ts'

const PORT = 4176
const BASE = `http://localhost:${PORT}`
const OUT = 'store-screenshots/video'
const MUSIC = 'assets/music/main_menu.m4a'

const WIDTH = 1920
const HEIGHT = 1080
const FPS = 30
/** Crossfade between scenes, in seconds. */
const FADE = 0.4

/** The phone the game plays on (CSS pixels, recorded at twice that; a common Android width, the game drawn big) and
 * where its screen sits in the frame: as tall as the frame allows, 30 px clear above and below the bezel. */
const PHONE = { width: 360, height: 780 }
const SCREEN = { x: 1120, y: 45, width: 458, height: 990 }
const BEZEL = 15
const RADIUS = 60

/** "N levels free" on the closing card, N as the game has it (FREE_LEVELS; the store module itself needs Vite).
 * English only so far: other languages leave the line out. */
const FREE_LEVELS = Number(readFileSync('src/stores/purchase.ts', 'utf8').match(/FREE_LEVELS = (\d+)/)![1])
const FREE_LINE: Record<string, string> = { en: `${FREE_LEVELS} levels free` }

const ICON = readFileSync('public/favicon.svg', 'base64')

/** One scene of the video: a game screen in the phone beside its caption, or a full-frame card. */
interface Scene {
  name: string
  seconds: number
  /** Index into screenshots.txt, or the game's tagline (`map.task`). */
  caption?: number | 'tagline'
  route?: string
  card?: (texts: Texts) => string
  settings?: Record<string, unknown>
  storage?: Record<string, unknown>
  /** Time to let the screen load before recording, ms. */
  settle?: number
  /** Where the hand rests on screen as recording starts (CSS px); otherwise it enters from below on its first move. */
  handAt?: { x: number; y: number }
  act?: (page: Page) => Promise<void>
}

interface Texts {
  locale: string
  captions: string[]
  tagline: string
}

/** The hand (page code, run before the app; strings, as the scripts are type checked without the DOM). Its fingertip
 * is the point it moves to; it enters from below the screen. `__hand.move(x, y, ms)`, `press()`, `hold(on)`. */
const HAND = `(() => {
  const SVG = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 132" width="74" height="98">
    <defs><filter id="hand-shadow" x="-30%" y="-20%" width="160%" height="150%">
      <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".3"/></filter></defs>
    <g filter="url(#hand-shadow)">
      <g fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round">
        <rect x="34" y="4" width="23" height="72" rx="11.5"/>
        <rect x="55" y="44" width="19" height="36" rx="9.5"/>
        <rect x="71" y="52" width="17" height="32" rx="8.5"/>
        <rect x="18" y="56" width="70" height="56" rx="22"/>
        <rect x="6" y="60" width="18" height="38" rx="9" transform="rotate(-28 15 79)"/>
        <rect x="26" y="106" width="54" height="22" rx="5"/>
      </g>
      <g stroke="none">
        <rect x="34" y="4" width="23" height="72" rx="11.5" fill="#fff"/>
        <rect x="55" y="44" width="19" height="36" rx="9.5" fill="#fff"/>
        <rect x="71" y="52" width="17" height="32" rx="8.5" fill="#fff"/>
        <rect x="18" y="56" width="70" height="56" rx="22" fill="#fff"/>
        <rect x="6" y="60" width="18" height="38" rx="9" fill="#fff" transform="rotate(-28 15 79)"/>
        <rect x="26" y="106" width="54" height="22" rx="5" fill="#7cc6e8"/>
      </g>
      <g fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" opacity=".35">
        <path d="M56 62v10M72 66v10M40 18h11"/>
      </g>
    </g></svg>\`
  // The fingertip in the svg's pixels (74/100 of its viewBox units).
  const TIP = { x: 45.5 * 0.74, y: 6 * 0.74 }
  let el, x = innerWidth * 0.78, y = innerHeight + 60
  const place = (ms) => {
    el.style.transition = 'transform ' + ms + 'ms cubic-bezier(.45,0,.55,1)'
    el.style.transform = 'translate(' + x + 'px,' + y + 'px)'
  }
  const make = () => {
    if (el) return
    el = document.createElement('div')
    el.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;will-change:transform'
    el.innerHTML = '<div style="transform-origin:' + TIP.x + 'px ' + TIP.y + 'px;transition:transform .12s ease-out;' +
      'margin:-' + TIP.y + 'px 0 0 -' + TIP.x + 'px;rotate:-14deg">' + SVG + '</div>'
    document.documentElement.append(el)
    place(0)
  }
  window.__hand = {
    move(nx, ny, ms) { make(); x = nx; y = ny; requestAnimationFrame(() => place(ms)) },
    hold(on) { make(); el.firstChild.style.transform = on ? 'scale(.86)' : '' },
    press() {
      make()
      el.firstChild.animate([{ transform: 'scale(1)' }, { transform: 'scale(.84)' }, { transform: 'scale(1)' }],
        { duration: 280, easing: 'ease-in-out' })
    },
  }
  // A found difference draws the eye: its new circle pulses (1 → 1.3 → 1 in 300 ms) once the game's own spring of
  // it (600 ms) is over. No zoom: the pictures stay whole.
  new MutationObserver((records) => {
    for (const record of records) for (const node of record.addedNodes)
      if (node.nodeName === 'circle' && node.getAttribute('fill') === 'none' && node.getAttribute('stroke-width') === '4')
        node.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }],
          { duration: 300, delay: 600, easing: 'ease-in-out' })
  }).observe(document, { childList: true, subtree: true })
  // A ring where the touch lands.
  addEventListener('pointerdown', (e) => {
    const ring = document.createElement('div')
    ring.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;width:44px;height:44px;' +
      'margin:-22px 0 0 -22px;border-radius:50%;border:3px solid #fff;background:rgba(255,255,255,.35);' +
      'box-shadow:0 1px 8px rgba(0,0,0,.3);left:' + e.clientX + 'px;top:' + e.clientY + 'px'
    ring.animate([{ transform: 'scale(.4)', opacity: 1 }, { transform: 'scale(1.4)', opacity: 0 }],
      { duration: 600, easing: 'ease-out', fill: 'forwards' })
    document.documentElement.append(ring)
    setTimeout(() => ring.remove(), 650)
  }, true)
})()`

/** The hand moves to (x, y), presses, and the touch lands as the finger goes down. */
async function tapAt(page: Page, x: number, y: number, travel = 450) {
  await page.evaluate(`__hand.move(${x}, ${y}, ${travel})`)
  await page.waitForTimeout(travel + 60)
  await page.evaluate('__hand.press()')
  await page.waitForTimeout(110)
  await page.touchscreen.tap(x, y)
  await page.waitForTimeout(170)
}

const handTap = (page: Page, x: number, y: number) => tapAt(page, x, y)

/** The hand swipes up the screen's scrolling list by `distance` CSS px over `ms`; the list follows the finger. */
const swipe = (distance: number, ms: number, delay = 300) => async (page: Page) => {
  await page.waitForTimeout(delay)
  const x = PHONE.width * 0.72
  const from = PHONE.height * 0.78
  await page.evaluate(`__hand.move(${x}, ${from}, 420)`)
  await page.waitForTimeout(480)
  await page.evaluate('__hand.hold(true)')
  await page.waitForTimeout(120)
  await page.evaluate(`__hand.move(${x}, ${from - distance}, ${ms})`)
  await page.evaluate(`new Promise((resolve) => {
    const el = [...document.querySelectorAll('main, .screen, [class*="scroll"]')].find(
      (e) => e.scrollHeight > e.clientHeight + 4 && getComputedStyle(e).overflowY !== 'visible')
    if (!el) return resolve()
    const from = el.scrollTop
    const to = Math.min(from + ${distance}, el.scrollHeight - el.clientHeight)
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / ${ms})
      el.scrollTop = from + (to - from) * (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
      if (t < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })`)
  await page.evaluate('__hand.hold(false)')
}

const pause = (ms: number) => (page: Page) => page.waitForTimeout(ms)
const steps =
  (...acts: ((page: Page) => Promise<void>)[]) =>
  async (page: Page) => {
    for (const act of acts) await act(page)
  }

/** Taps the level toolbar's picture style button, and the same level comes back as 3D pictures: the hand leaves the
 * screen so nothing hides them, and a soft shine sweeps across both once they are in. */
const showOff3d = async (page: Page) => {
  const box = (await page.locator('button.style-switch').last().boundingBox())!
  await tapAt(page, box.x + box.width / 2, box.y + box.height / 2)
  await page.evaluate(`__hand.move(${PHONE.width * 0.5}, ${PHONE.height + 140}, 600)`)
  await page.waitForTimeout(900)
  const rects = await Promise.all([0, 1].map(async (i) => (await pictureBox(page.locator('.pictures > svg').nth(i))).clip))
  await page.evaluate(`(${JSON.stringify(rects)}).forEach((r, i) => {
    const box = document.createElement('div')
    box.style.cssText = 'position:fixed;z-index:2147483645;pointer-events:none;overflow:hidden;left:' + r.x + 'px;top:' +
      r.y + 'px;width:' + r.width + 'px;height:' + r.height + 'px'
    const band = document.createElement('div')
    band.style.cssText = 'position:absolute;top:-30%;height:160%;width:38%;left:-45%;transform:skewX(-18deg);' +
      'background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.5),rgba(255,255,255,0))'
    box.append(band)
    document.documentElement.append(box)
    band.animate([{ left: '-45%' }, { left: '115%' }], { duration: 1100, delay: i * 180, easing: 'ease-in-out' })
      .finished.then(() => box.remove())
  })`)
}

/** After a find, before the hand moves on. */
const AFTER_FIND = 200

// The video opens on play: two pictures and a finger finding the differences from the first frame.
const SCENES: Scene[] = [
  {
    name: 'level-3d',
    caption: 'tagline',
    route: '/level/12',
    settings: { pictureStyle: 'redesign' },
    seconds: 8,
    handAt: { x: PHONE.width * 0.7, y: PHONE.height * 0.7 },
    act: steps(pause(200), findDifferences(12, 5, 'redesign', AFTER_FIND, handTap)),
  },
  // A farm level as drawn, then the same level as 3D pictures, held on screen to be looked at.
  {
    name: 'living-drawing',
    caption: 1,
    route: '/level/4',
    seconds: 6.8,
    act: steps(pause(300), findDifferences(4, 1, 'classic', AFTER_FIND, handTap), showOff3d),
  },
  { name: 'modes', caption: 2, route: '/levels', settings: { pictureStyle: 'redesign' }, seconds: 4.4, act: swipe(420, 2200) },
  {
    name: 'time',
    caption: 3,
    route: '/level/203',
    settings: { pictureStyle: 'redesign' },
    seconds: 5.2,
    act: steps(pause(300), findDifferences(203, 3, 'redesign', AFTER_FIND, handTap)),
  },
  // Long enough to read the case's story before the hand swipes to its scenes.
  { name: 'detective', caption: 4, route: '/detective/cake', seconds: 4.4, act: swipe(220, 1600, 1700) },
  { name: 'travel', caption: 5, route: '/travel', seconds: 4, act: swipe(260, 2000) },
  // Two players taking turns: the bottle spins for who goes first as the duel opens.
  { name: 'duel', caption: 6, route: '/duo/75', storage: { duoSetup: { mode: 'hotseat' } }, seconds: 3.6, settle: 300 },
  { name: 'end', card: endCard, seconds: 4.2, settle: 100 },
]

const html = (locale: string, body: string, style = '') =>
  `<!doctype html><html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}"><head><style>
    body { margin: 0; font-family: ${FONT}; color: ${INK}; }
    .bg { position: absolute; inset: 0; overflow: hidden;
      background: linear-gradient(135deg, #a8dcf2 0%, #d9f0f4 50%, #f4f1ea 100%); }
    .bg::before, .bg::after { content: ''; position: absolute; border-radius: 50%; background: #fff; opacity: .35; }
    .bg::before { width: 760px; height: 760px; left: 1000px; top: -180px; }
    .bg::after { width: 520px; height: 520px; left: -160px; top: 700px; }
    ${style}
  </style></head><body>${body}</body></html>`

/** The closing card: icon, name, the last caption (calm mode, no ads, offline) and how many levels are free. */
function endCard({ locale, captions }: Texts) {
  const free = FREE_LINE[locale]
  return html(
    locale,
    `<div class="bg"></div><div class="card">
      <img src="data:image/svg+xml;base64,${ICON}" alt="">
      <h1>Keen Eye</h1>
      <p>${escape(captions[7])}</p>
      ${free ? `<p class="free">${escape(free)}</p>` : ''}
    </div>`,
    `.card { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; }
    img { width: 150px; height: 150px; border-radius: 34px; box-shadow: 0 10px 28px rgba(35,48,43,.3);
      animation: pop .7s cubic-bezier(.2,1.4,.4,1) both; }
    h1 { font-size: 72px; font-weight: 800; margin: 26px 0 0; letter-spacing: -0.01em; animation: rise .6s .25s both; }
    p { font-size: 36px; font-weight: 700; margin: 14px 40px 0; text-wrap: balance;
      word-break: ${WORD_BREAK[locale] ?? 'normal'}; animation: rise .6s .5s both; }
    p.free { font-size: 30px; margin-top: 22px; padding: 10px 28px; border-radius: 999px; background: #fff;
      box-shadow: 0 6px 16px rgba(35,48,43,.15); animation-delay: .75s; }
    @keyframes pop { from { transform: scale(.4); opacity: 0 } to { transform: none; opacity: 1 } }
    @keyframes rise { from { transform: translateY(24px); opacity: 0 } to { transform: none; opacity: 1 } }`,
  )
}

/** The frame behind a phone scene (WIDTH × HEIGHT): background, the game's name, the caption and the phone's body. */
function back(locale: string, caption: string) {
  return html(
    locale,
    `<div class="bg"></div>
    <div class="text">
      <div class="brand"><img src="data:image/svg+xml;base64,${ICON}" alt=""><span>Keen Eye</span></div>
      <div class="caption">${escape(caption)}</div>
    </div>
    <div class="phone"></div>`,
    `.text { position: absolute; left: 150px; top: 0; bottom: 0; width: 820px; display: flex; flex-direction: column;
      justify-content: center; text-align: start; }
    .brand { display: flex; align-items: center; gap: 20px; font-size: 40px; font-weight: 800; }
    .brand img { width: 76px; height: 76px; border-radius: 18px; box-shadow: 0 6px 16px rgba(35,48,43,.25); }
    .caption { margin-top: 36px; font-size: 84px; font-weight: 800; line-height: 1.08; letter-spacing: -0.015em;
      text-wrap: balance; word-break: ${WORD_BREAK[locale] ?? 'normal'}; }
    .phone { position: absolute; left: ${SCREEN.x - BEZEL}px; top: ${SCREEN.y - BEZEL}px;
      width: ${SCREEN.width + 2 * BEZEL}px; height: ${SCREEN.height + 2 * BEZEL}px; border-radius: ${RADIUS}px;
      background: ${INK}; box-shadow: 0 34px 70px rgba(35,48,43,.38); }`,
  )
}

/** The phone's bezel over the screen, rounding its corners (transparent elsewhere). */
const BEZEL_PAGE = `<!doctype html><html><body style="margin:0;background:transparent">
  <div style="position:absolute;left:${SCREEN.x - BEZEL}px;top:${SCREEN.y - BEZEL}px;width:${SCREEN.width + 2 * BEZEL}px;
    height:${SCREEN.height + 2 * BEZEL}px;border-radius:${RADIUS}px;overflow:hidden">
    <div style="position:absolute;inset:${BEZEL}px;border-radius:${RADIUS - BEZEL}px;box-shadow:0 0 0 60px ${INK}"></div>
  </div></body></html>`

/** `markup` as a WIDTH × HEIGHT PNG. */
async function still(browser: Browser, markup: string, transparent = false): Promise<Buffer> {
  const tab = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  await tab.setContent(markup)
  await tab.evaluate('document.fonts.ready')
  const png = await tab.screenshot({ omitBackground: transparent })
  await tab.close()
  return png
}

/** Records `scene` into `dir/scene.mp4`: screencast frames at their own times, resampled to FPS. */
async function record(browser: Browser, texts: Texts, scene: Scene, dir: string) {
  const viewport = scene.card ? { width: WIDTH / 2, height: HEIGHT / 2 } : PHONE
  const size = scene.card ? { width: WIDTH, height: HEIGHT } : SCREEN
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, isMobile: !scene.card, hasTouch: true })
  await seedStorage(ctx, texts.locale, scene.settings, scene.storage)
  await ctx.addInitScript(HAND)
  const tab = await ctx.newPage()
  if (scene.card) await tab.setContent(scene.card(texts))
  else await tab.goto(BASE + scene.route)
  await tab.evaluate('document.fonts.ready')
  if (scene.handAt) await tab.evaluate(`__hand.move(${scene.handAt.x}, ${scene.handAt.y}, 0)`)
  await tab.waitForTimeout(scene.settle ?? 1500)

  const cdp = await ctx.newCDPSession(tab)
  const frames: { time: number; data: string }[] = []
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    frames.push({ time: metadata.timestamp!, data })
    void cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
  })
  await cdp.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 95,
    maxWidth: viewport.width * 2,
    maxHeight: viewport.height * 2,
    everyNthFrame: 1,
  })
  await Promise.all([scene.act?.(tab), tab.waitForTimeout(scene.seconds * 1000)])
  await cdp.send('Page.stopScreencast')
  await ctx.close()
  if (!frames.length) throw new Error(`${scene.name}: no frames`)

  // Each frame lasts until the next one; the last one to the end of the scene (concat needs it listed twice).
  const framesDir = `${dir}/${scene.name}`
  mkdirSync(framesDir, { recursive: true })
  const start = frames[0].time
  let list = ''
  frames.forEach((frame, i) => {
    const file = `${framesDir}/${String(i).padStart(5, '0')}.jpg`
    writeFileSync(file, Buffer.from(frame.data, 'base64'))
    const until = i + 1 < frames.length ? frames[i + 1].time - start : Math.max(scene.seconds, frame.time - start + 0.1)
    list += `file '${file.split('/').pop()}'\nduration ${(until - (frame.time - start)).toFixed(4)}\n`
    if (i + 1 === frames.length) list += `file '${file.split('/').pop()}'\n`
  })
  writeFileSync(`${framesDir}/list.txt`, list)
  ffmpeg([
    '-f', 'concat', '-safe', '0', '-i', `${framesDir}/list.txt`,
    '-vf', `scale=${size.width}:${size.height}:flags=lanczos,fps=${FPS},format=yuv420p`,
    '-t', String(scene.seconds), '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', `${dir}/${scene.name}.mp4`,
  ])
  rmSync(framesDir, { recursive: true })
  console.log(`  ${scene.name}: ${frames.length} frames`)
}

function ffmpeg(args: string[]) {
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' })
}

/** Puts each phone scene on its frame under the bezel, crossfades the scenes and lays the music under them. */
function assemble(dir: string, file: string) {
  const inputs: string[] = []
  const filters: string[] = []
  let count = 0
  const input = (...args: string[]) => {
    inputs.push(...args)
    return count++
  }
  const loop = (seconds: number, png: string) => input('-loop', '1', '-framerate', String(FPS), '-t', String(seconds), '-i', png)
  SCENES.forEach((scene, i) => {
    const clip = input('-i', `${dir}/${scene.name}.mp4`)
    // Every scene on one time base, as xfade needs.
    const same = `format=yuv420p,setsar=1,fps=${FPS},settb=1/${FPS}`
    if (scene.card) filters.push(`[${clip}:v]${same}[s${i}]`)
    else {
      const bg = loop(scene.seconds, `${dir}/${scene.name}-back.png`)
      const bezel = loop(scene.seconds, `${dir}/bezel.png`)
      filters.push(
        `[${bg}:v][${clip}:v]overlay=${SCREEN.x}:${SCREEN.y}[p${i}]`,
        `[p${i}][${bezel}:v]overlay=0:0,${same}[s${i}]`,
      )
    }
  })
  let total = SCENES[0].seconds
  let last = 's0'
  for (let i = 1; i < SCENES.length; i++) {
    const offset = total - FADE
    filters.push(`[${last}][s${i}]xfade=transition=fade:duration=${FADE}:offset=${offset.toFixed(3)}[x${i}]`)
    last = `x${i}`
    total = offset + SCENES[i].seconds
  }
  const music = input('-i', MUSIC)
  filters.push(`[${music}:a]atrim=0:${total.toFixed(3)},afade=t=in:d=0.4,afade=t=out:st=${(total - 2.5).toFixed(3)}:d=2.5[a]`)
  ffmpeg([
    ...inputs,
    '-filter_complex', filters.join(';'),
    '-map', `[${last}]`, '-map', '[a]',
    '-c:v', 'libx264', '-crf', '17', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart',
    file,
  ])
  console.log(`${file}: ${total.toFixed(1)} s`)
}

const locales = process.argv.length > 2 ? process.argv.slice(2) : ['en']
const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: 'error' })
const browser = await chromium.launch({ executablePath: CHROME })
try {
  for (const locale of locales) {
    const texts: Texts = {
      locale,
      captions: readCaptions(locale),
      tagline: JSON.parse(readFileSync(`src/i18n/${locale}.json`, 'utf8')).map.task,
    }
    const dir = `${OUT}/${locale}`
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
    writeFileSync(`${dir}/bezel.png`, await still(browser, BEZEL_PAGE, true))
    for (const scene of SCENES) {
      await record(browser, texts, scene, dir)
      if (scene.caption !== undefined) {
        const caption = scene.caption === 'tagline' ? texts.tagline : texts.captions[scene.caption]
        writeFileSync(`${dir}/${scene.name}-back.png`, await still(browser, back(locale, caption)))
      }
    }
    assemble(dir, `${OUT}/keen-eye-${locale}.mp4`)
    rmSync(dir, { recursive: true })
  }
} finally {
  await browser.close()
  await new Promise<void>((resolve) => server.httpServer.close(() => resolve()))
}
