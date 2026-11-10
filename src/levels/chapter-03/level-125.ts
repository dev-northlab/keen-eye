// Motion differences: chimney smoke drifts only on picture B; the dog wags its tail faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level125Redesign } from './level-125-redesign.ts'
import { acorn, anthill, backpack, bird, bluebells, flower, oak, pine, pineCone, rabbit, stump } from './shapes.ts'

/** Window, 34 × 34, with `cols` columns of panes; (x, y) = center. */
const window = (x: number, y: number, cols: number) => {
  let s = `<rect x="${x - 17}" y="${y - 17}" width="34" height="34" fill="#fff1c4" stroke="#5a3a24" stroke-width="4"/><path d="M${x - 15} ${y}h30" stroke="#5a3a24" stroke-width="2.5"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 17 + (34 * i) / cols} ${y - 15}v30" stroke="#5a3a24" stroke-width="2.5"/>`
  return s
}

const shutter = (x: number, y: number, color: string) => `<rect x="${x - 7}" y="${y - 18}" width="14" height="36" fill="${color}"/><path d="M${x - 4} ${y - 12}h8M${x - 4} ${y}h8M${x - 4} ${y + 12}h8" stroke="#2b2b2b" stroke-opacity="0.25" stroke-width="2"/>`

/** Wall lantern; (x, y) = bracket, glass `s` scale. */
const lantern = (x: number, y: number, s: number) =>
  `<path d="M${x} ${y}h8" stroke="#2b2b2b" stroke-width="2"/><g transform="translate(${x + 8} ${y}) scale(${s})"><path d="M-6 0h12l-2 -5h-8Z" fill="#2b2b2b"/>` +
  `<rect x="-5" y="0" width="10" height="14" rx="2" fill="#ffd166" stroke="#2b2b2b" stroke-width="1.5"/><path d="M-6 14h12" stroke="#2b2b2b" stroke-width="2"/></g>`

const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="7" fill="#e8ece8" fill-opacity="0.9"/><circle cx="${x + 7}" cy="${y - 11}" r="8" fill="#e8ece8" fill-opacity="0.7"/><circle cx="${x + 2}" cy="${y - 24}" r="7" fill="#e8ece8" fill-opacity="0.5"/>`

/** Axe stuck in a stump top at (x, y), handle leaning right. Bounds: x from −8 to +30, y from −30 to +2. */
const axe = (x: number, y: number) => `<path d="M${x} ${y}L${x + 26} ${y - 28}" stroke="#a0703f" stroke-width="4" stroke-linecap="round"/><path d="M${x - 8} ${y - 4}l8 -8l6 6l-8 8Z" fill="#8d99ae"/>`

/** Standing dog, faces left; (x, y) = feet. Tail separate. Bounds: x ±22, y from −30 to 0. */
const dog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 -10v10M-4 -10v10M6 -10v10M14 -10v10" stroke="#8a5a33" stroke-width="4"/>` +
  `<rect x="-16" y="-22" width="34" height="14" rx="7" fill="#c48a5a"/><circle cx="-18" cy="-24" r="8" fill="#c48a5a"/><path d="M-22 -28q-6 8 -2 12" fill="#8a5a33"/>` +
  `<ellipse cx="-25" cy="-22" rx="4" ry="3" fill="#c48a5a"/><circle cx="-28" cy="-23" r="1.6" fill="#222"/><circle cx="-19" cy="-26" r="1.5" fill="#222"/></g>`
const dogTail = (x: number, y: number) => `<path d="M${x} ${y}q10 -2 12 -14" stroke="#c48a5a" stroke-width="4" stroke-linecap="round" fill="none"/>`

export default svgLevel({
  id: 125,
  chapter: 'forest',
  title: 'foresterHouse',
  parTimeSec: 105,
  redesign: level125Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let back = ''
    for (let x = -10; x < 820; x += 30) back += pine(x + rand() * 10, 236, 0.8 + rand() * 0.4, rand() < 0.5 ? '#3f7a5a' : '#356b4e')
    let logs = ''
    for (let k = 220; k < 380; k += 16) logs += `<rect x="150" y="${k}" width="300" height="16" rx="8" fill="${k % 32 ? '#a0703f' : '#946538'}"/>`
    let pile = ''
    for (let row = 0; row < 3; row++)
      for (let i = 0; i < 6 - row; i++) {
        const x = 488 + i * 20 + row * 10
        const y = 372 - row * 18
        if (!(row === 1 && i === 2)) pile += `<circle cx="${x}" cy="${y}" r="9" fill="#d9a46b" stroke="#8a5a33" stroke-width="2"/>`
      }
    let flowers = ''
    for (let i = 0; i < 7; i++) flowers += flower(30 + i * 18, 470 + (i % 2) * 6, ['#ff6b8b', '#ffd166', '#b38cff'][i % 3])
    const wag = (period: number) => anim({ type: 'sway', angle: 22, pivot: [536, 444], period }, dogTail(536, 444))

    return (
      `<rect width="800" height="500" fill="#cfe8f5"/>` +
      `<path d="M0 200L140 110L260 180L420 90L580 190L720 120L800 160V260H0Z" fill="#a8bccb"/>` +
      back +
      `<rect y="236" width="800" height="264" fill="#8fbf6a"/><path d="M300 500q10 -60 0 -120h40q-10 60 20 120Z" fill="#d9c08c"/>` +
      // House
      logs + `<path d="M150 220h300" stroke="#6b4226" stroke-width="3"/>` +
      `<path d="M126 228L300 130L474 228Z" fill="#5a3a24"/><path d="M150 214L300 140L450 214" stroke="#704a2e" stroke-width="6" fill="none"/>` +
      `<rect x="390" y="128" width="28" height="60" fill="#8d7b6a"/><rect x="386" y="124" width="36" height="8" fill="#6b5a4a"/>` +
      diff(406, 100, 26, smoke(404, 110), anim({ type: 'bob', dx: 6, dy: -6, period: 1.8 }, smoke(404, 110))) +
      diff(232, 158, 22, '', bird(232, 168, '#c0392b')) +
      `<circle cx="300" cy="188" r="12" fill="#fff1c4" stroke="#5a3a24" stroke-width="3"/>` +
      window(210, 282, 2) + diff(186, 282, 22, shutter(186, 282, '#2a6f5a'), shutter(186, 282, '#3f7f5a')) + shutter(234, 282, '#2a6f5a') +
      diff(390, 282, 24, window(390, 282, 2), window(390, 282, 3)) + shutter(366, 282, '#2a6f5a') + shutter(414, 282, '#2a6f5a') +
      `<rect x="194" y="302" width="32" height="8" fill="#8a5a33"/><circle cx="200" cy="300" r="4" fill="#ff6b8b"/><circle cx="210" cy="298" r="4" fill="#ffd166"/><circle cx="220" cy="300" r="4" fill="#ff6b8b"/>` +
      `<path d="M276 380v-70a24 24 0 0 1 48 0v70Z" fill="#6b4226"/><circle cx="316" cy="346" r="3" fill="#f2c14e"/>` +
      diff(262, 300, 22, lantern(254, 300, 1), lantern(254, 300, 1.3)) +
      `<rect x="140" y="378" width="320" height="10" fill="#8a5a33"/>` +
      `<path d="M360 378h18v-18h-18Z" fill="#3a86ff"/><path d="M378 364l10 -8" stroke="#3a86ff" stroke-width="3"/>` +
      // Woodpile and chopping stump
      `<rect x="474" y="380" width="140" height="6" fill="#6b4226"/>` + pile +
      diff(538, 354, 22, `<circle cx="538" cy="354" r="9" fill="#d9a46b" stroke="#8a5a33" stroke-width="2"/>`, '') +
      `<path d="M470 320l74 -24l74 24" stroke="#5a3a24" stroke-width="5" fill="none"/>` +
      stump(660, 436) +
      diff(668, 408, 26, axe(660, 420), `<g transform="rotate(-24 660 420)">${axe(660, 420)}</g>`) +
      dog(560, 468) + diff(540, 438, 22, wag(1.6), wag(0.5)) +
      // Yard
      `<path d="M0 400h130M0 424h130M10 392v48M50 392v48M90 392v48M126 392v48" stroke="#c9a06c" stroke-width="5"/>` +
      `<path d="M90 392V320" stroke="#6b4226" stroke-width="5"/><rect x="74" y="296" width="32" height="26" fill="#e07a5f"/><path d="M70 298l20 -14l20 14Z" fill="#8c3a2b"/><circle cx="90" cy="310" r="5" fill="#2b2b2b"/>` +
      oak(772, 460, 1.6, '#4c9a3f') + pine(736, 500, 1.2, '#2f6b4a') +
      rabbit(420, 470, true) + flowers +
      backpack(470, 412) +
      pineCone(240, 478) +
      acorn(475, 478) +
      anthill(600, 482) +
      bluebells(165, 420) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['leafPile', 385, 418],
        ['butterfly', 543, 275],
        ['squirrel', 196, 451],
        ['butterfly', 687, 92],
        ['cloud', 513, 68],
      ])
    )
  },
})
