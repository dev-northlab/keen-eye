// Open Graph preview of the web version (link previews in messengers and social networks): npm run og
// The home screen's own art: the spring meadow of MeadowScene.vue rendered by Vue on the server, under the sky,
// sun and clouds of ScreenBackdrop.vue, with the title, a tagline and the play button. Writes public/og-image.png
// (1200×630), which the build copies next to index.html. The text uses Roboto (system-ui on Android); install it
// first, otherwise resvg falls back to another sans-serif font.
import { writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import { createServer } from 'vite'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

const W = 1200
const H = 630
const OUT = 'public/og-image.png'

// Colours of the home screen: style.css tokens and the spring meadow sky of ScreenBackdrop.vue.
const FG = '#23302b'
const ACCENT = '#2f9e6e'
const BG = '#f4f1ea'
const SKY = '#a7def2'
const SKY_MID = '#e3f5ea'
const SUN = '#ffd45c'
const FONT = `Roboto, 'Segoe UI', 'Noto Sans', sans-serif`

async function meadow(): Promise<string> {
  const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' })
  try {
    const { default: MeadowScene } = await vite.ssrLoadModule('/src/components/MeadowScene.vue')
    const html = await renderToString(createSSRApp({ render: () => h(MeadowScene) }))
    // Scoped-style markers are valueless HTML attributes, which SVG (XML) does not allow.
    return html.replace(/ data-v-[0-9a-f]+/g, '')
  } finally {
    await vite.close()
  }
}

/** The sun of ScreenBackdrop.vue (its 140-unit box), centred at (x, y) and scaled by s. */
function sun(x: number, y: number, s: number): string {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6
    const r2 = i % 2 ? 52 : 60
    return `<line x1="${40 * Math.cos(a)}" y1="${40 * Math.sin(a)}" x2="${r2 * Math.cos(a)}" y2="${r2 * Math.sin(a)}"/>`
  }).join('')
  return (
    `<circle cx="${x}" cy="${y}" r="${108 * s}" fill="url(#glow)"/>` +
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<g stroke="${SUN}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.85">${rays}</g>` +
    `<circle r="38" fill="#fff" fill-opacity="0.5"/><circle r="32" fill="${SUN}"/>` +
    `<circle cx="-10" cy="-10" r="9" fill="#fff" fill-opacity="0.35"/></g>`
  )
}

/** A cloud of ScreenBackdrop.vue (120×50 box), `w` wide with its top left corner at (x, y). */
const cloud = (x: number, y: number, w: number, opacity: number) =>
  `<g transform="translate(${x} ${y}) scale(${w / 120})" fill="#fff" fill-opacity="${opacity}">` +
  `<circle cx="35" cy="30" r="18"/><circle cx="60" cy="22" r="22"/><circle cx="85" cy="30" r="16"/>` +
  `<rect x="20" y="30" width="80" height="18" rx="9"/></g>`

/** Text with the home title's soft white halo, which keeps it readable over the sky. */
const haloText = (y: number, size: number, weight: number, text: string) => {
  const attrs = `x="${W / 2}" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${size}" font-weight="${weight}"`
  return (
    `<text ${attrs} fill="#fff" stroke="#fff" stroke-width="${size / 6}" stroke-linejoin="round" opacity="0.8" filter="url(#halo)">${text}</text>` +
    `<text ${attrs} fill="${FG}">${text}</text>`
  )
}

/** The home screen's play button: a green pill, the play triangle in a white circle, then the label. */
function playButton(cy: number): string {
  const w = 316
  const hgt = 88
  const x = (W - w) / 2
  const y = cy - hgt / 2
  const r = 26
  const icon = x + 18 + 29
  return (
    `<rect x="${x}" y="${y + 9}" width="${w}" height="${hgt}" rx="${r}" fill="#23302b" fill-opacity="0.2" filter="url(#shadow)"/>` +
    `<clipPath id="pill"><rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="${r}"/></clipPath>` +
    `<g clip-path="url(#pill)"><rect x="${x}" y="${y}" width="${w}" height="${hgt}" fill="${ACCENT}"/>` +
    `<rect x="${x}" y="${y + hgt - 6}" width="${w}" height="6" fill="#000" fill-opacity="0.12"/></g>` +
    `<circle cx="${icon}" cy="${cy - 3}" r="29" fill="#fff"/>` +
    `<g transform="translate(${icon - 18 + 2} ${cy - 3 - 18}) scale(1.5)">` +
    `<path d="M9 6.5v11l9-5.5Z" fill="${ACCENT}" stroke="${ACCENT}" stroke-width="2" stroke-linejoin="round"/></g>` +
    `<text x="${icon + 29 + 18}" y="${cy + 11}" font-family="${FONT}" font-size="40" font-weight="700" fill="#fff">Play now</text>`
  )
}

// The meadow strip (1600×400) at 0.85 scale, cut at the sides like on a phone, along the bottom edge.
const STRIP = 0.85
const stripW = W / STRIP
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<defs>` +
  `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">` +
  `<stop offset="0" stop-color="${SKY}"/><stop offset="0.55" stop-color="${SKY_MID}"/><stop offset="1" stop-color="${BG}"/></linearGradient>` +
  `<radialGradient id="glow"><stop offset="0" stop-color="#fff8d6" stop-opacity="0.8"/><stop offset="0.62" stop-color="#fff8d6" stop-opacity="0"/></radialGradient>` +
  `<filter id="halo" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>` +
  `<filter id="shadow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>` +
  `</defs>` +
  `<rect width="${W}" height="${H}" fill="url(#sky)"/>` +
  sun(1088, 96, 1.6) +
  cloud(40, 46, 190, 1) +
  cloud(56, 214, 112, 0.85) +
  cloud(1008, 222, 150, 0.7) +
  `<svg x="0" y="${H - 400 * STRIP}" width="${W}" height="${400 * STRIP}" viewBox="${(1600 - stripW) / 2} 0 ${stripW} 400">` +
  (await meadow()) +
  `</svg>` +
  haloText(168, 112, 700, 'Keen Eye') +
  haloText(232, 42, 500, 'Spot the differences. Train your eye.') +
  playButton(312) +
  `</svg>`

const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Roboto' } }).render().asPng()
writeFileSync(OUT, png)
console.log(`${OUT}: ${W}×${H}, ${Math.round(png.length / 1024)} KB`)
