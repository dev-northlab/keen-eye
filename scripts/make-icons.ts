// App icon and splash: npm run icons
// The artwork lives here as SVG; this script renders every size Android, the store and the web need.
import { mkdirSync, writeFileSync } from 'node:fs'
import { crc32, deflateSync } from 'node:zlib'
import { Resvg } from '@resvg/resvg-js'

const SPLASH_BACKGROUND = '#f4f1ea'
const RES = 'android/app/src/main/res'

/** Background: a teal diagonal gradient with a soft light in the top left, filling the given shape. */
const background = (shape: string) =>
  `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fd6c6"/><stop offset="0.55" stop-color="#22a396"/><stop offset="1" stop-color="#137a73"/></linearGradient>` +
  `<radialGradient id="glow" cx="0.32" cy="0.28" r="0.6"><stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient></defs>` +
  shape.replace('/>', ' fill="url(#bg)"/>') +
  shape.replace('/>', ' fill="url(#glow)"/>')

/** One of the owl's eyes, centered at (x, 54): face disk, white, amber iris, pupil, highlight. */
const owlEye = (x: number) =>
  `<circle cx="${x}" cy="54" r="12.5" fill="#f3dcb4"/>` +
  `<circle cx="${x}" cy="54" r="9.6" fill="#ffffff"/>` +
  `<circle cx="${x}" cy="54" r="6.6" fill="url(#iris)"/>` +
  `<circle cx="${x}" cy="54" r="3.4" fill="#1b1410"/>` +
  `<circle cx="${x + 2}" cy="51.8" r="1.7" fill="#ffffff"/>`

/** A wide-eyed owl in a 108×108 adaptive-icon canvas; stays inside the 66-unit safe circle. */
const FOREGROUND =
  `<defs>` +
  `<radialGradient id="iris" cx="0.42" cy="0.38" r="0.7"><stop offset="0" stop-color="#fff0a8"/><stop offset="0.5" stop-color="#ffb703"/><stop offset="1" stop-color="#d36b00"/></radialGradient>` +
  `<filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2.6" stdDeviation="2.2" flood-color="#06403c" flood-opacity="0.4"/></filter>` +
  `</defs>` +
  `<g filter="url(#shadow)">` +
  // Head with ear tufts, the chest and its feathers.
  `<path d="M31 42L33.5 27.5L45 36Q54 33.5 63 36L74.5 27.5L77 42Q83 53 80 66Q74 82 54 82Q34 82 28 66Q25 53 31 42Z" fill="#8b5a2b"/>` +
  `<path d="M40 76q14 7 28 0q-4-9-14-9t-14 9Z" fill="#a8743f"/>` +
  `<path d="M47 75l2 3M54 74v3.5M61 75l-2 3" stroke="#8b5a2b" stroke-width="1.6" stroke-linecap="round"/>` +
  owlEye(42.5) +
  owlEye(65.5) +
  // Beak and brows.
  `<path d="M50.5 63h7L54 70.5Z" fill="#ff9f1c" stroke="#d97706" stroke-width="1" stroke-linejoin="round"/>` +
  `<path d="M33 40.5q9-4 18 1.5M75 40.5q-9-4-18 1.5" fill="none" stroke="#5e3a17" stroke-width="2.6" stroke-linecap="round"/>` +
  `</g>`

const svg = (size: number, body: string, viewBox = '0 0 108 108') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${body}</svg>`

/** The adaptive icon's background layer: the whole 108×108 canvas. */
const BACKGROUND = background('<rect width="108" height="108"/>')

/**
 * Full icon with the owl, cropped to the middle 76 units of the canvas: rounded square or circle (legacy launchers,
 * splash, favicon) or full-bleed square (Google Play rounds the corners itself).
 */
const fullIcon = (shape: 'square' | 'round' | 'bleed') =>
  background(
    {
      square: '<rect x="16" y="16" width="76" height="76" rx="17"/>',
      round: '<circle cx="54" cy="54" r="38"/>',
      bleed: '<rect x="16" y="16" width="76" height="76"/>',
    }[shape],
  ) + FOREGROUND

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
  write(`${dir}/ic_launcher_background.png`, png(svg(108 * k, BACKGROUND)))
}

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
