// "The ski lodge mystery", scene 1 — the lounge: the golden snowflake trophy gone from the mantel, the
// fire out, the log pile toppled, a painting crooked, the clock stopped, the window open, a pair of
// ski boots missing from the mat, melted snow on the floor, the rug folded and the cocoa spilled.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { boards, openPanes, panes, picture, trophy, windowBox } from './shapes.ts'

const mountains = (w: number, h: number) =>
  `<path d="M${-w / 2} ${h / 2}L${-w / 6} ${-h / 4}L${w / 12} ${h / 6}L${w / 4} ${-h / 3}L${w / 2} ${h / 2}Z" fill="#7a8a9a"/>` +
  `<path d="M${-w / 6} ${-h / 4}l-8 10h16ZM${w / 4} ${-h / 3}l-9 11h18Z" fill="#fff"/>`

/** Clock hands at (250, 100): angles in degrees from twelve. Bounds: ±14. */
const hands = (h: number, m: number) => {
  const end = (a: number, l: number) => `${(250 + Math.sin((a * Math.PI) / 180) * l).toFixed(1)} ${(100 - Math.cos((a * Math.PI) / 180) * l).toFixed(1)}`
  return `<path d="M250 100L${end(h, 8)}" stroke="#2b2b38" stroke-width="3" stroke-linecap="round"/><path d="M250 100L${end(m, 13)}" stroke="#2b2b38" stroke-width="2" stroke-linecap="round"/>`
}

const log = (x: number, y: number, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8a5a2b"/><circle cx="${x}" cy="${y}" r="${r * 0.55}" fill="#d9b277"/>`

/** Pair of red ski boots on the mat. Bounds: x 96–130, y 370–406. */
const skiBoots = () =>
  [96, 114]
    .map((x, i) => `<path d="M${x} ${370 + i * 2}H${x + 14}V${398 + i * 2}H${x + 16}V${404 + i * 2}H${x}Z" fill="#e5484d"/><path d="M${x} ${380 + i * 2}h14M${x} ${388 + i * 2}h14" stroke="#2b2b38" stroke-width="2"/>`)
    .join('')

const puddle = (x: number, y: number, rx: number) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.3}" fill="#bfe6ff" stroke="#8ec3e6" stroke-width="1.4"/>`

/** Cocoa mug on the side table: standing (A) or tipped over in a spill (B). Bounds: x 742–790, y 278–304. */
const mug = (up: boolean) =>
  up
    ? `<rect x="756" y="280" width="20" height="20" rx="3" fill="#e5484d"/><path d="M776 284q8 0 8 6t-8 6" stroke="#e5484d" stroke-width="3" fill="none"/><ellipse cx="766" cy="281" rx="9" ry="2" fill="#7a4a2a"/>`
    : `<ellipse cx="772" cy="300" rx="18" ry="3" fill="#7a4a2a"/><rect x="744" y="286" width="22" height="14" rx="3" fill="#e5484d"/><path d="M752 286q0 -8 6 -8t6 8" stroke="#e5484d" stroke-width="3" fill="none"/>`

export default detectiveLevel({
  id: 526,
  case: 'lodge',
  title: 'lodgeLounge',
  parTimeSec: 118,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="390" fill="#b5835a"/><path d="${Array.from({ length: 13 }, (_, i) => `M0 ${i * 30 + 15}H800`).join('')}" stroke="#8a5a2b" stroke-width="3"/>` +
    `<rect y="390" width="800" height="110" fill="#a8743f"/>` +
    boards(390, '#7a5233') +
    // Chimney and fireplace
    `<rect x="320" y="0" width="160" height="160" fill="#8a8f99"/><rect x="300" y="160" width="200" height="230" fill="#9aa3ad"/>` +
    `<g fill="#b8bcc4">${[[330, 30], [380, 60], [440, 24], [350, 110], [430, 100], [320, 200], [480, 210], [316, 300], [484, 320]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="10"/>`).join('')}</g>` +
    `<path d="M340 390V290Q340 250 400 250Q460 250 460 290V390Z" fill="#2b2b38"/>` +
    clue(
      'fireOut',
      400,
      338,
      50,
      `<path d="M372 376Q362 334 386 300Q388 330 400 336Q404 312 418 296Q440 336 428 376Z" fill="#ff8a3d"/><path d="M388 376Q382 350 398 330Q404 350 414 352Q420 362 414 376Z" fill="#ffd54a"/>`,
      `<g fill="#e5484d"><circle cx="388" cy="372" r="3"/><circle cx="404" cy="368" r="2.6"/><circle cx="414" cy="374" r="3"/></g><path d="M392 360q-6 -10 0 -20t0 -20M410 356q6 -10 0 -18t0 -16" stroke="#8a8f99" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    ) +
    `<path d="M362 386L438 374M362 374L438 386" stroke="#6b4a2b" stroke-width="9" stroke-linecap="round"/>` +
    `<rect x="280" y="156" width="240" height="14" rx="3" fill="#6b4a2b"/>` +
    `<rect x="300" y="128" width="20" height="28" rx="3" fill="#3f9b6b"/><rect x="462" y="124" width="30" height="32" rx="2" fill="#f5ecd8" stroke="#8a5a2b" stroke-width="3"/>` +
    clue('trophyGone', 400, 128, 34, trophy(400, 156), '') +
    // Log pile
    log(536, 376) +
    log(560, 376) +
    log(584, 376) +
    clue('logsTipped', 559, 364, 54, log(548, 354) + log(572, 354) + log(560, 332), log(532, 396, 11) + log(556, 398, 11) + log(586, 396, 11)) +
    // Left wall: painting, clock, boots
    clue('paintingCrooked', 150, 120, 58, picture(150, 120, 76, 52, mountains(76, 52)), `<g transform="rotate(8 150 120)">${picture(150, 120, 76, 52, mountains(76, 52))}</g>`) +
    `<circle cx="250" cy="100" r="22" fill="#6b4a2b"/><circle cx="250" cy="100" r="17" fill="#fffaf0"/>` +
    clue('clockStopped', 250, 100, 20, hands(300, 60), hands(100, 230)) +
    `<rect x="40" y="396" width="160" height="16" rx="4" fill="#5b6b7a"/>` +
    `<path d="M50 372h12v32h-12ZM66 374h12v30h-12Z" fill="#6b4a2b"/><path d="M146 380h12v24h-12ZM162 382h12v22h-12Z" fill="#3a6ea5"/>` +
    clue('skiBootsGone', 113, 388, 26, skiBoots(), '') +
    clue('meltedSnow', 196, 451, 32, '', puddle(184, 446, 18) + puddle(212, 456, 12)) +
    // Rug
    `<rect x="260" y="420" width="280" height="60" fill="#b83236"/><path d="M260 432H540M260 468H540" stroke="#f2c14e" stroke-width="4"/>` +
    clue('rugFolded', 523, 437, 26, '', `<path d="M540 420V454L506 420Z" fill="#a8743f"/><path d="M506 420L540 454L514 446Z" fill="#e8a0a0"/>`) +
    // Window with the snowy night
    windowBox(640, 80, 90, 100, '#1f2a4a') +
    `<path d="M648 172V150Q680 136 722 152V172Z" fill="#f4f8fc"/><g fill="#fff">${[[664, 100], [700, 96], [680, 120], [712, 130], [658, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>` +
    clue('windowOpen', 685, 130, 57, panes(640, 80, 90, 100), openPanes(640, 80, 90, 100)) +
    // Armchair and side table
    `<rect x="630" y="240" width="96" height="100" rx="20" fill="#3f6f99"/><rect x="618" y="300" width="22" height="70" rx="10" fill="#335d82"/><rect x="716" y="300" width="22" height="70" rx="10" fill="#335d82"/>` +
    `<rect x="636" y="326" width="84" height="30" rx="8" fill="#4a7aa8"/><path d="M632 370v18M724 370v18" stroke="#5e3b1a" stroke-width="6"/>` +
    `<rect x="740" y="300" width="56" height="8" rx="2" fill="#6b4a2b"/><path d="M768 308V390" stroke="#6b4a2b" stroke-width="6"/>` +
    clue('cocoaSpilled', 766, 292, 28, mug(true), mug(false)) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['scarfHook', 41, 84, '#7b5ea7'],
      ['cuckooClock', 202, 283],
      ['sconce', 597, 279],
      ['keyRack', 752, 49],
      ['newspapers', 758, 483],
    ]) +
    extras({ extra, anim }, [
      ['wallPhone', 39, 250],
      ['broom', 46, 468],
      ['teddy', 120, 490, '#d9a35a'],
      ['calendar', 303, 57],
      ['mouse', 332, 414],
      ['butterflyFrame', 530, 128],
      ['globe', 583, 487],
      ['yarnBasket', 643, 451],
      ['cactus', 718, 428],
      ['roundMirror', 755, 220],
    ]),
})
