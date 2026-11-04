// Motion differences: the neon cup flickers only on picture B; the wall fan spins faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bollard, car, lampHead, lampPost, mailbox, manhole, newspaperBox, parkingMeter, person } from './shapes.ts'

/** Neon tube along path `d` in `color`, with a soft glow. */
const neon = (d: string, color: string) =>
  `<path d="${d}" stroke="${color}" stroke-width="9" stroke-opacity="0.25" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`

/** Five-pointed star path of outer radius r around (x, y). */
const starPath = (x: number, y: number, r: number) => {
  let d = ''
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const k = i % 2 ? r * 0.45 : r
    d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * k).toFixed(1)} ${(y + Math.sin(a) * k).toFixed(1)}`
  }
  return d + 'Z'
}

const heartPath = (x: number, y: number) => `M${x} ${y + 14}C${x - 22} ${y} ${x - 14} ${y - 18} ${x} ${y - 6}C${x + 14} ${y - 18} ${x + 22} ${y} ${x} ${y + 14}Z`
const cupPath = (x: number, y: number) => `M${x - 12} ${y - 8}h24v10a12 12 0 0 1 -24 0ZM${x + 12} ${y - 4}q10 0 6 8l-6 2M${x - 16} ${y + 16}h32`
const arrowPath = (x: number, y: number) => `M${x - 22} ${y}h36M${x + 6} ${y - 10}l10 10l-10 10`

/** Wall fan; (x, y) = hub. Bounds: radius 14. */
const fan = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#8d99ae"><path d="M0 0L-4 -13h8Z"/><path d="M0 0L-4 -13h8Z" transform="rotate(120)"/><path d="M0 0L-4 -13h8Z" transform="rotate(240)"/><circle r="3" fill="#3d4a55"/></g>`

/** Fire escape ladder between two platforms; (x, y) = ladder top center, `rungs` rungs in 44 units. */
const ladder = (x: number, y: number, rungs: number) => {
  let s = `<path d="M${x - 8} ${y}v44M${x + 8} ${y}v44" stroke="#5a5470" stroke-width="2.5"/>`
  for (let i = 1; i <= rungs; i++) s += `<path d="M${x - 8} ${y + (44 * i) / (rungs + 1)}h16" stroke="#5a5470" stroke-width="2"/>`
  return s
}

/** Cat sitting, faces left; (x, y) = feet. Bounds: x from −14 to +18, y from −30 to 0. */
const cat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#1b1b26"><ellipse cy="-10" rx="10" ry="11"/><circle cx="-3" cy="-24" r="7"/>` +
  `<path d="M-9 -28l1 -7l4 4ZM3 -28l-1 -7l-4 4Z"/><path d="M8 -4q10 2 8 -12" stroke="#1b1b26" stroke-width="3" fill="none"/>` +
  `<circle cx="-6" cy="-25" r="1.3" fill="#d9ff6a"/><circle cx="0" cy="-25" r="1.3" fill="#d9ff6a"/></g>`

export default svgLevel({
  id: 116,
  chapter: 'city',
  title: 'neonStreet',
  parTimeSec: 95,
  scene: ({ diff, anim, rand, extra }) => {
    const facades: [number, number, number, string][] = [[0, 170, 40, '#2e2a4f'], [170, 190, 60, '#3a2f55'], [360, 160, 30, '#262c4a'], [520, 150, 70, '#33284a'], [670, 130, 50, '#2a3352']]
    let blocks = ''
    for (const [x, w, top, c] of facades) {
      blocks += `<rect x="${x}" y="${top}" width="${w}" height="${360 - top}" fill="${c}"/>`
      for (let y = top + 24; y < 180; y += 38)
        for (let wx = x + 18; wx < x + w - 24; wx += 34) {
          if (Math.hypot(wx + 8 - 420, y + 10 - 100) < 30) continue
          blocks += `<rect x="${wx}" y="${y}" width="16" height="20" fill="${rand() < 0.55 ? '#ffd98a' : '#1d1a33'}"/>`
        }
    }
    let rain = ''
    for (let i = 0; i < 40; i++) {
      const x = rand() * 800
      const y = rand() * 340
      rain += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l-3 10" stroke="#9fb3ff" stroke-opacity="0.35" stroke-width="1.5"/>`
    }
    const spinning = (period: number) => anim({ type: 'rotate', pivot: [560, 140], period }, fan(560, 140))

    return (
      `<rect width="800" height="500" fill="#151230"/>` +
      `<circle cx="740" cy="34" r="20" fill="#f4efd0"/><circle cx="732" cy="30" r="4" fill="#ddd6b0"/>` +
      blocks +
      `<rect x="404" y="110" width="32" height="5" fill="#4a4466"/>` +
      diff(420, 100, 22, `<path d="M410 110h20l-3 -10h-14Z" fill="#c96a3a"/><circle cx="416" cy="96" r="5" fill="#5fae4b"/><circle cx="425" cy="94" r="6" fill="#5fae4b"/>`, '') +
      // Fire escape
      `<rect x="196" y="116" width="76" height="5" fill="#5a5470"/><rect x="196" y="164" width="76" height="5" fill="#5a5470"/>` +
      `<path d="M196 116v-18M272 116v-18M196 98h76M196 164v-18M272 164v-18M196 146h76" stroke="#5a5470" stroke-width="2.5"/>` +
      diff(234, 142, 26, ladder(234, 120, 4), ladder(234, 120, 5)) +
      `<rect x="546" y="126" width="28" height="28" rx="4" fill="#3d4a55"/>` +
      diff(560, 140, 22, spinning(3), spinning(0.8)) +
      // Shop fronts with neon signs
      `<rect y="250" width="800" height="110" fill="#1f1a38"/>` +
      `<rect x="20" y="272" width="130" height="70" fill="#ffcf7a" fill-opacity="0.85"/><rect x="200" y="272" width="120" height="70" fill="#7ad7ff" fill-opacity="0.6"/>` +
      `<rect x="380" y="272" width="140" height="70" fill="#ff9ec7" fill-opacity="0.6"/><rect x="580" y="272" width="90" height="70" fill="#ffcf7a" fill-opacity="0.8"/>` +
      `<rect x="700" y="272" width="80" height="88" fill="#3a3358"/><rect x="712" y="284" width="56" height="76" fill="#ffd98a" fill-opacity="0.5"/>` +
      `<path d="M50 342v-30M80 342v-36M110 342v-26" stroke="#8a5a33" stroke-width="5"/><circle cx="240" cy="300" r="10" fill="#3a86ff" fill-opacity="0.6"/>` +
      diff(110, 214, 28, neon(starPath(110, 214, 18), '#ffe14d'), neon(starPath(110, 214, 22), '#ffe14d')) +
      diff(302, 214, 28, neon(cupPath(300, 214), '#4df0ff'), anim({ type: 'blink', duty: 0.6, period: 0.9 }, neon(cupPath(300, 214), '#4df0ff'))) +
      diff(480, 212, 26, neon(heartPath(480, 212), '#ff4fa3'), neon(heartPath(480, 212), '#e55ad6')) +
      diff(648, 220, 28, neon(arrowPath(648, 220), '#7dff6a'), `<g transform="rotate(-18 648 220)">${neon(arrowPath(648, 220), '#7dff6a')}</g>`) +
      // Wet street
      `<rect y="360" width="800" height="140" fill="#24223a"/><rect y="356" width="800" height="8" fill="#3a3658"/>` +
      `<ellipse cx="110" cy="392" rx="30" ry="5" fill="#ffe14d" fill-opacity="0.15"/><ellipse cx="300" cy="392" rx="30" ry="5" fill="#4df0ff" fill-opacity="0.15"/><ellipse cx="480" cy="392" rx="30" ry="5" fill="#ff4fa3" fill-opacity="0.15"/>` +
      `<ellipse cx="200" cy="470" rx="60" ry="8" fill="#3a3658"/><ellipse cx="560" cy="440" rx="44" ry="6" fill="#3a3658"/>` +
      lampPost(160, 372) + lampHead(160, 372) + lampPost(600, 372) + lampHead(600, 372) +
      `<circle cx="160" cy="272" r="26" fill="#ffd166" fill-opacity="0.12"/><circle cx="600" cy="272" r="26" fill="#ffd166" fill-opacity="0.12"/>` +
      car(330, 440, '#e63946') + `<path d="M372 432l60 -10v24Z" fill="#fff6c4" fill-opacity="0.25"/>` + car(620, 480, '#3a86ff', true) +
      person(60, 400, '#8338ec') + person(250, 410, '#ff006e', true) + person(460, 396, '#2a9d8f') + person(520, 404, '#ffb703', true, '#a86b4c', '#2b2b2b') +
      `<path d="M440 344h32a16 10 0 0 0 -32 0Z" fill="#e63946"/><path d="M456 344v16" stroke="#2b2b2b" stroke-width="2"/>` +
      // Dumpster with a cat
      `<rect x="704" y="372" width="76" height="46" rx="3" fill="#2f6b4f"/><path d="M700 372h84l-4 -8h-76Z" fill="#245a41"/>` +
      diff(740, 352, 28, cat(732, 368), cat(746, 368)) +
      mailbox(115, 368) +
      newspaperBox(330, 368) +
      bollard(405, 370) +
      parkingMeter(560, 370) +
      manhole(460, 470) +
      rain +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 635, 54],
        ['sparkle', 356, 314],
        ['hydrant', 75, 447],
        ['shoppingBag', 620, 395],
        ['pigeon', 503, 479],
      ])
    )
  },
})
