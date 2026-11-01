// App icon and splash: npm run icons
// The artwork lives here as SVG; this script renders every size Android, the store and the web need.
import { mkdirSync, writeFileSync } from 'node:fs'
import { crc32, deflateSync } from 'node:zlib'
import { Resvg } from '@resvg/resvg-js'

const BACKGROUND = '#2f9e6e'
const SPLASH_BACKGROUND = '#f4f1ea'
const RES = 'android/app/src/main/res'

/** Eye with a sparkle, in a 108×108 adaptive-icon canvas; stays inside the 66-unit safe circle. */
const FOREGROUND =
  `<path d="M40 33l-3 -6M54 30v-7M68 33l3 -6" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>` +
  `<path d="M24 54Q54 22 84 54Q54 86 24 54Z" fill="#ffffff" stroke="#1d3a30" stroke-width="3"/>` +
  `<circle cx="54" cy="54" r="14" fill="#ffb703"/><circle cx="54" cy="54" r="14" fill="none" stroke="#e08a00" stroke-width="2"/>` +
  `<circle cx="54" cy="54" r="7" fill="#1d3a30"/><circle cx="58.5" cy="49.5" r="3" fill="#ffffff"/>` +
  `<path d="M80 30l2 5l5 2l-5 2l-2 5l-2 -5l-5 -2l5 -2Z" fill="#ffd166"/>`

const svg = (size: number, body: string, viewBox = '0 0 108 108') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${body}</svg>`

/**
 * Full icon with the eye, cropped to the middle 76 units of the canvas: rounded square or circle (legacy launchers,
 * splash, favicon) or full-bleed square (Google Play rounds the corners itself).
 */
const fullIcon = (shape: 'square' | 'round' | 'bleed') =>
  ({
    square: `<rect x="16" y="16" width="76" height="76" rx="17" fill="${BACKGROUND}"/>`,
    round: `<circle cx="54" cy="54" r="38" fill="${BACKGROUND}"/>`,
    bleed: `<rect width="108" height="108" fill="${BACKGROUND}"/>`,
  })[shape] + FOREGROUND

const render = (markup: string) => new Resvg(markup, { font: { loadSystemFonts: false } }).render()
const png = (markup: string) => render(markup).asPng()

/** PNG without an alpha channel: the App Store rejects icons that have one, even when fully opaque. */
function opaquePng(markup: string): Buffer {
  const img = render(markup)
  const { width, height, pixels } = img
  const rows = Buffer.alloc((width * 3 + 1) * height)
  for (let y = 0; y < height; y++) {
    rows[y * (width * 3 + 1)] = 0 // filter: none
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      pixels.copy(rows, y * (width * 3 + 1) + 1 + x * 3, i, i + 3)
    }
  }
  const chunk = (type: string, data: Buffer) => {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(body))
    return Buffer.concat([len, body, crc])
  }
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8 // bit depth
  header[9] = 2 // color type: RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function write(path: string, data: Buffer | string) {
  mkdirSync(path.slice(0, path.lastIndexOf('/')), { recursive: true })
  writeFileSync(path, data)
  console.log(path)
}

// Launcher icons: 48 dp legacy icons and 108 dp adaptive foregrounds per density.
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 }
for (const [density, k] of Object.entries(DENSITIES)) {
  const dir = `${RES}/mipmap-${density}`
  write(`${dir}/ic_launcher.png`, png(svg(48 * k, fullIcon('square'), '16 16 76 76')))
  write(`${dir}/ic_launcher_round.png`, png(svg(48 * k, fullIcon('round'), '16 16 76 76')))
  write(`${dir}/ic_launcher_foreground.png`, png(svg(108 * k, FOREGROUND)))
}
write(
  `${RES}/values/ic_launcher_background.xml`,
  `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${BACKGROUND}</color>\n</resources>\n`,
)

// Splash (Android < 12 and the launch theme background): the icon centered on the app background.
const SPLASHES: Record<string, [number, number]> = {
  drawable: [480, 320],
  'drawable-port-mdpi': [320, 480],
  'drawable-port-hdpi': [480, 800],
  'drawable-port-xhdpi': [720, 1280],
  'drawable-port-xxhdpi': [960, 1600],
  'drawable-port-xxxhdpi': [1280, 1920],
  'drawable-land-mdpi': [480, 320],
  'drawable-land-hdpi': [800, 480],
  'drawable-land-xhdpi': [1280, 720],
  'drawable-land-xxhdpi': [1600, 960],
  'drawable-land-xxxhdpi': [1920, 1280],
}
for (const [dir, [w, h]] of Object.entries(SPLASHES)) {
  const s = Math.round(Math.min(w, h) * 0.4)
  const icon = `<svg x="${(w - s) / 2}" y="${(h - s) / 2}" width="${s}" height="${s}" viewBox="16 16 76 76">${fullIcon('square')}</svg>`
  write(
    `${RES}/${dir}/splash.png`,
    png(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${SPLASH_BACKGROUND}"/>${icon}</svg>`),
  )
}

// iOS: 1024 px app icon (opaque, full bleed — iOS rounds the corners) and the 2732 px launch image.
const IOS = 'ios/App/App/Assets.xcassets'
write(`${IOS}/AppIcon.appiconset/AppIcon-512@2x.png`, opaquePng(svg(1024, fullIcon('bleed'), '16 16 76 76')))
const iosSplash = opaquePng(
  `<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732"><rect width="2732" height="2732" fill="${SPLASH_BACKGROUND}"/>` +
    `<svg x="1066" y="1066" width="600" height="600" viewBox="16 16 76 76">${fullIcon('square')}</svg></svg>`,
)
for (const name of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png'])
  write(`${IOS}/Splash.imageset/${name}`, iosSplash)

// Store icon and the web favicon.
write('assets/store/icon-512.png', png(svg(512, fullIcon('bleed'), '16 16 76 76')))
write('public/favicon.svg', svg(64, fullIcon('square'), '16 16 76 76'))
