// "The ski lodge mystery", scene 5 — the summit in the morning: the trophy in the snowman's hand, a red
// scarf round its neck, a flag planted on the cairn, a camera left on a rock, tripod marks, a thermos,
// a snow angel, snow fallen off the fir, boot prints going up and a ski pole stuck in the snow.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { fir, trophy } from './shapes.ts'

/** Snow angel pressed into the snow. Bounds: x 124–196, y 403–470. */
const snowAngel = () =>
  `<g fill="#dfe8f2" stroke="#c7d8e8" stroke-width="1.4"><path d="M148 424Q130 402 124 414Q130 430 150 434ZM172 424Q190 402 196 414Q190 430 170 434Z"/>` +
  `<path d="M148 424H172L180 470H140Z"/><circle cx="160" cy="412" r="9"/></g>`

/** Small boot print, toe up. Bounds: x ±6, y ±10. */
const bootPrint = (x: number, y: number) => `<rect x="${x - 6}" y="${y - 10}" width="12" height="20" rx="6" fill="#c7d8e8"/>`

const tripodHole = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6" fill="#8aa5bf"/>`

export default detectiveLevel({
  id: 530,
  case: 'lodge',
  title: 'lodgeSummit',
  parTimeSec: 126,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="500" fill="#8fc8ef"/><circle cx="110" cy="80" r="34" fill="#fff3b0"/>` +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 40 }, `<g fill="#fff"><ellipse cx="300" cy="70" rx="46" ry="14"/><circle cx="286" cy="60" r="16"/><circle cx="312" cy="56" r="18"/></g>`) +
    `<path d="M0 260L90 200L170 250L260 190L360 250L470 180L560 240L680 170L800 230V300H0Z" fill="#c7dcef"/>` +
    // The summit plateau and the peak with its cairn
    `<path d="M0 300Q200 280 400 296T800 290V500H0Z" fill="#f4f8fc"/><path d="M520 300L640 236L760 300Z" fill="#f4f8fc" stroke="#dfe8f2" stroke-width="2"/>` +
    `<g fill="#9aa3ad">${[[628, 252, 12], [652, 252, 12], [640, 240, 10]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}"/>`).join('')}</g>` +
    clue('flagPlanted', 656, 210, 40, '', `<path d="M640 242V176" stroke="#5e3b1a" stroke-width="4"/><path d="M642 178L676 192L642 206Z" fill="#e5484d"/>`) +
    fir(90, 330) +
    fir(196, 306, 0.6) +
    fir(780, 326, 0.7) +
    `<ellipse cx="470" cy="318" rx="16" ry="7" fill="#b8bcc4"/><ellipse cx="40" cy="420" rx="22" ry="9" fill="#b8bcc4"/>` +
    anim({ type: 'bob', dx: 0, dy: 5, period: 3.4 }, `<path d="M520 90q10 -8 20 0q10 -8 20 0M580 120q8 -6 16 0q8 -6 16 0" stroke="#2b2b38" stroke-width="2.4" fill="none"/>`) +
    clue('pineSnowFallen', 90, 233, 20, '', `<path d="M90 220L105.3 244Q90 252 74.7 244Z" fill="#2f7d55"/>`) +
    // Rocks with the thermos and the camera
    `<ellipse cx="262" cy="338" rx="32" ry="14" fill="#9aa3ad"/><ellipse cx="560" cy="336" rx="30" ry="12" fill="#9aa3ad"/>` +
    clue('thermosLeft', 262, 316, 22, '', `<rect x="254" y="304" width="16" height="28" rx="4" fill="#3a6ea5"/><rect x="253" y="300" width="18" height="7" rx="2" fill="#2b2b38"/>`) +
    clue('cameraLeft', 560, 313, 20, '', `<rect x="546" y="306" width="28" height="18" rx="3" fill="#2b2b38"/><rect x="552" y="301" width="10" height="6" fill="#2b2b38"/><circle cx="560" cy="315" r="6" fill="#5b6b7a" stroke="#dfe3ea" stroke-width="1.6"/>`) +
    clue('snowAngel', 160, 436, 46, '', snowAngel()) +
    // The snowman
    `<g fill="#fff" stroke="#c7d8e8" stroke-width="2"><circle cx="400" cy="440" r="40"/><circle cx="400" cy="378" r="28"/><circle cx="400" cy="336" r="20"/></g>` +
    `<circle cx="393" cy="331" r="2.4" fill="#2b2b38"/><circle cx="407" cy="331" r="2.4" fill="#2b2b38"/><path d="M400 337l14 3l-14 3Z" fill="#f2994a"/>` +
    `<g fill="#2b2b38"><circle cx="400" cy="370" r="3"/><circle cx="400" cy="384" r="3"/><circle cx="400" cy="420" r="3.4"/></g>` +
    `<path d="M374 374L338 350M338 350l-6 -8M338 350l-8 2M426 374L462 352M462 352l4 -8M462 352l8 0" stroke="#6b4a2b" stroke-width="4" stroke-linecap="round"/>` +
    clue('trophyInSnowman', 326, 338, 26, '', `<g transform="translate(330 354) scale(0.6) translate(-330 -354)">${trophy(330, 354)}</g>`) +
    clue('snowmanScarf', 401, 368, 30, '', `<path d="M378 352Q400 362 422 352L422 360Q400 370 378 360Z" fill="#e5484d"/><path d="M408 360L416 386L424 384L416 358Z" fill="#e5484d"/><path d="M412 372l8 -2" stroke="#fff" stroke-width="2.4"/>`) +
    clue('tripodMarks', 500, 471, 20, '', tripodHole(490, 476) + tripodHole(510, 476) + tripodHole(500, 462)) +
    clue('bootPrintsUp', 620, 447, 32, '', bootPrint(612, 466) + bootPrint(628, 446) + bootPrint(614, 428)) +
    clue('skiPoleLeft', 722, 376, 42, '', `<path d="M716 346L724 414" stroke="#2b2b38" stroke-width="4"/><rect x="711" y="336" width="9" height="14" rx="3" fill="#e5484d"/><ellipse cx="723" cy="404" rx="9" ry="3" fill="none" stroke="#2b2b38" stroke-width="2"/>`) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['mittens', 40, 482],
      ['snowShovel', 313, 483],
      ['tent', 492, 353],
      ['mailbox', 603, 383],
      ['snowballs', 736, 480],
    ]) +
    extras({ extra, anim }, [
      ['plane', 50, 43],
      ['sparrow', 86, 374],
      ['owl', 155, 320],
      ['crow', 218, 375],
      ['paperPlane', 222, 196],
      ['bench', 279, 412],
      ['swallow', 473, 196],
      ['sled', 527, 410],
      ['bullfinch', 660, 325],
      ['dragonfly', 680, 85],
    ]),
})
