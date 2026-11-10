// Motion differences: steam rises from the right cup only on picture B; the hanging plant swings faster on B.
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { awning, ball, bike, cityTree, flowerBox, lampHead, lampPost, newspaperBox, person, pigeon, scooter, shoppingBag } from './shapes.ts'
import { level112Redesign } from './level-112-redesign.ts'

/** Café table with a parasol; (x, y) = ground under the table. Bounds: x ±56, y from −118 to 0. */
const table = (x: number, y: number, canopy: string) =>
  `<path d="M${x} ${y}V${y - 104}" stroke="#6b6b70" stroke-width="3"/>` +
  `<path d="M${x - 56} ${y - 96}Q${x} ${y - 136} ${x + 56} ${y - 96}Z" fill="${canopy}"/>` +
  `<path d="M${x - 28} ${y - 108}L${x} ${y - 118}L${x + 28} ${y - 108}" stroke="#fff" stroke-width="5" fill="none"/>` +
  `<rect x="${x - 26}" y="${y - 40}" width="52" height="6" rx="2" fill="#f4efe6"/><path d="M${x - 14} ${y}l6 -34M${x + 14} ${y}l-6 -34" stroke="#3d4a55" stroke-width="3"/>`

/** Bistro chair, faces left (dir −1) or right (1); (x, y) = ground center. Bounds: x ±12, y from −40 to 0. */
const chair = (x: number, y: number, dir: 1 | -1) =>
  `<g transform="translate(${x} ${y}) scale(${dir} 1)" stroke="#3d4a55" stroke-width="3" fill="none">` +
  `<path d="M-10 0V-22h20V0M-10 -22V-40M-10 -40q4 -4 8 0"/><path d="M-10 -22h20" stroke="#a0703f" stroke-width="5"/></g>`

/** Coffee cup on a saucer; (x, y) = saucer. Bounds: x ±10, y from −12 to +2. */
const cup = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="10" ry="2.5" fill="#f4f4f4"/><path d="M${x - 6} ${y - 1}v-10h12v10Z" fill="${color}"/>` +
  `<path d="M${x + 6} ${y - 9}q5 1 0 5" stroke="${color}" stroke-width="2" fill="none"/>`

const steam = (x: number, y: number) =>
  `<path d="M${x - 3} ${y}q-4 -6 0 -12t0 -12M${x + 3} ${y - 2}q-4 -6 0 -12" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.9" fill="none"/>`

/** Croissant; (x, y) = center. Bounds: x ±11, y ±6. */
const croissant = (x: number, y: number) =>
  `<path d="M${x - 11} ${y + 3}q4 -10 11 -9q7 -1 11 9q-6 -3 -11 -3q-5 0 -11 3Z" fill="#e0a050"/><path d="M${x - 3} ${y - 5}v6M${x + 3} ${y - 5}v6" stroke="#b8762c" stroke-width="1.5"/>`

/** Hanging basket of flowers from (x, y). Bounds: x ±14, y from 0 to +34. */
const hangingPlant = (x: number, y: number) =>
  `<path d="M${x} ${y}l-10 20M${x} ${y}l10 20" stroke="#5a3d2b" stroke-width="1.5"/>` +
  `<path d="M${x - 12} ${y + 20}h24l-4 10h-16Z" fill="#c68b4e"/>` +
  `<circle cx="${x - 8}" cy="${y + 18}" r="5" fill="#ff6b8b"/><circle cx="${x + 2}" cy="${y + 16}" r="5" fill="#ffd166"/><circle cx="${x + 9}" cy="${y + 19}" r="4" fill="#ff6b8b"/>` +
  `<path d="M${x - 10} ${y + 28}q-2 6 0 6M${x + 10} ${y + 28}q2 6 0 6" stroke="#3f8f3a" stroke-width="2" fill="none"/>`

/** Blade sign with a cup on a wall bracket; (x, y) = bracket hook. Bounds: x ±16, y from 0 to +36. */
const bladeSign = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}v4M${x + 8} ${y}v4" stroke="#3d4a55" stroke-width="2"/>` +
  `<circle cx="${x}" cy="${y + 20}" r="16" fill="#2a6f5a" stroke="#f2cc8f" stroke-width="3"/>` +
  `<path d="M${x - 6} ${y + 15}h12v8a6 6 0 0 1 -12 0Z" fill="#f2cc8f"/><path d="M${x + 6} ${y + 17}q5 1 0 5" stroke="#f2cc8f" stroke-width="2" fill="none"/>`

/** Balcony window; (x, y) = window center. Bounds: x ±30, y from −26 to +30. */
const balcony = (x: number, y: number) =>
  `<rect x="${x - 16}" y="${y - 26}" width="32" height="44" rx="12" fill="#bde3f2" stroke="#f4efe6" stroke-width="4"/>` +
  `<path d="M${x} ${y - 22}v40" stroke="#f4efe6" stroke-width="2"/>` +
  `<rect x="${x - 30}" y="${y + 14}" width="60" height="4" fill="#3d4a55"/>` +
  `<path d="M${x - 28} ${y + 18}v12M${x - 18} ${y + 18}v12M${x - 8} ${y + 18}v12M${x + 2} ${y + 18}v12M${x + 12} ${y + 18}v12M${x + 22} ${y + 18}v12" stroke="#3d4a55" stroke-width="2"/>` +
  `<rect x="${x - 30}" y="${y + 28}" width="60" height="3" fill="#3d4a55"/>`

export default svgLevel({
  id: 112,
  chapter: 'city',
  title: 'cornerCafe',
  parTimeSec: 110,
  redesign: level112Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let bricks = ''
    for (let y = 46; y < 200; y += 14)
      for (let x = 60 + ((y / 14) % 2) * 14; x < 740; x += 28) if (rand() < 0.22) bricks += `<rect x="${x}" y="${y}" width="22" height="8" rx="1" fill="#c9694f" fill-opacity="0.5"/>`
    let tiles = ''
    for (let x = 0; x < 800; x += 40) tiles += `<path d="M${x} 330l-30 170" stroke="#bfc6cc" stroke-width="1.5"/>`
    const swinging = (period: number) => anim({ type: 'sway', angle: 12, pivot: [300, 126], period }, hangingPlant(300, 126))
    const shelf = (x: number) =>
      `<path d="M${x} 250h96" stroke="#a0703f" stroke-width="4"/>` +
      `<rect x="${x + 6}" y="236" width="10" height="14" fill="#e63946"/><rect x="${x + 20}" y="232" width="10" height="18" fill="#3a86ff"/><rect x="${x + 36}" y="238" width="16" height="12" fill="#ffd166"/>` +
      `<rect x="${x + 58}" y="234" width="10" height="16" fill="#8ac926"/><rect x="${x + 74}" y="236" width="14" height="14" fill="#f4efe6"/>`

    return (
      `<rect width="800" height="500" fill="#d9eef8"/>` +
      `<rect x="0" y="60" width="60" height="270" fill="#9fb4c8"/><rect x="740" y="80" width="60" height="250" fill="#b6a4c4"/>` +
      // Café building
      `<rect x="60" y="40" width="680" height="290" fill="#e07a5f"/>` + bricks +
      `<rect x="54" y="32" width="692" height="12" fill="#f4efe6"/>` +
      balcony(130, 96) + balcony(230, 96) + balcony(400, 96) + balcony(570, 96) + balcony(670, 96) +
      flowerBox(130, 122, '#ff6b8b') + flowerBox(400, 122, '#ffd166') + flowerBox(670, 122, '#b38cff') +
      `<path d="M286 126h28" stroke="#3d4a55" stroke-width="3"/>` +
      diff(300, 144, 24, swinging(2.6), swinging(1.1)) +
      `<path d="M740 170h-26" stroke="#3d4a55" stroke-width="3"/>` +
      diff(722, 192, 26, bladeSign(722, 172), `<g transform="rotate(14 722 172)">${bladeSign(722, 172)}</g>`) +
      `<rect x="60" y="200" width="680" height="130" fill="#2a6f5a"/>` +
      // Shop windows and door
      `<rect x="80" y="226" width="200" height="94" fill="#f6e3c0"/><rect x="420" y="226" width="300" height="94" fill="#f6e3c0"/>` +
      `<path d="M120 226v94M180 226v94M240 226v94M480 226v94M540 226v94M600 226v94M660 226v94" stroke="#2a6f5a" stroke-width="3" stroke-opacity="0.35"/>` +
      shelf(430) + shelf(600) +
      `<circle cx="500" cy="236" r="7" fill="#ffd166"/><path d="M500 226v4M640 226v4" stroke="#3d4a55"/><circle cx="640" cy="236" r="7" fill="#ffd166"/>` +
      `<path d="M100 296h160" stroke="#a0703f" stroke-width="5"/><path d="M130 290h-10" stroke="#e0a050"/>` +
      croissant(140, 290) + diff(162, 288, 22, croissant(162, 290), '') + croissant(184, 290) +
      `<circle cx="216" cy="288" r="8" fill="#8a4b2a"/><circle cx="238" cy="288" r="8" fill="#e8b4c8"/>` +
      `<rect x="300" y="226" width="100" height="104" fill="#1e5242"/><rect x="312" y="238" width="76" height="92" fill="#3a2a1e"/><rect x="320" y="246" width="60" height="40" fill="#f6e3c0"/>` +
      `<circle cx="376" cy="296" r="3" fill="#ffd166"/>` +
      awning(170, 200, 220, '#e63946') + awning(570, 200, 320, '#e63946') +
      diff(520, 192, 22, '', pigeon(520, 200, true)) +
      // Sidewalk
      `<rect y="330" width="800" height="170" fill="#d4d9de"/>` + tiles +
      `<path d="M0 330H800" stroke="#9aa3ab" stroke-width="4"/>` +
      cityTree(30, 420, 1.2) +
      lampPost(770, 430) + lampHead(770, 430) +
      // Easel with the menu
      `<path d="M262 430l14 -60l14 60M276 370v60" stroke="#8a5a33" stroke-width="3" fill="none"/><rect x="258" y="370" width="36" height="44" rx="2" fill="#2b2b2b" stroke="#8a5a33" stroke-width="3"/>` +
      `<path d="M266 382h20M266 392h14M266 402h18" stroke="#f4f4f4" stroke-width="2"/>` +
      // Tables
      table(180, 470, '#2a9d8f') + chair(140, 470, 1) + chair(220, 470, -1) +
      diff(204, 424, 22, cup(204, 430, '#f4f4f4'), cup(204, 430, '#d9e4ef')) + cup(160, 430, '#f4f4f4') +
      person(124, 462, '#ffb703') +
      table(420, 470, '#e9c46a') + chair(380, 470, 1) +
      diff(464, 450, 28, chair(458, 470, -1), chair(470, 470, -1)) +
      cup(410, 430, '#e63946') + person(380, 462, '#8338ec', false, '#a86b4c', '#2b2b2b') +
      table(640, 470, '#2a9d8f') + chair(600, 470, 1) + chair(680, 470, -1) +
      cup(620, 430, '#f4f4f4') + diff(620, 410, 22, steam(620, 426), anim({ type: 'bob', dx: 0, dy: -4, period: 1.2 }, steam(620, 426))) +
      person(684, 462, '#3a86ff', true) +
      // Waiter, bike, pigeons
      person(540, 480, '#f4f4f4') + `<rect x="548" y="430" width="22" height="3" fill="#8d99ae"/><circle cx="560" cy="426" r="4" fill="#e63946"/>` +
      bike(330, 496, '#ffb703') + pigeon(90, 492) + pigeon(740, 490, true) +
      bird(240, 111) +
      ball(48, 472) +
      scooter(262, 482) +
      shoppingBag(735, 440) +
      newspaperBox(322, 380) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 450, 170, '#ffb703'],
        ['flowerBox', 208, 171, '#ff006e'],
        ['skateboard', 320, 450],
        ['cone', 733, 374],
        ['ball', 87, 390, '#e63946'],
      ])
    )
  },
})
