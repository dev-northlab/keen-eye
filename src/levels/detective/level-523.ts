// "The night train mystery", scene 3 — the dining car: a tall stack of fresh pancakes (the chef cooked
// all night), the sugar bowl tipped, a bar stool knocked over, the candle out, the menu fallen flat,
// the cookie jar opened, a bottle fallen on the shelf, the rose gone and a window blind pulled down.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { candle, flame, shelf, smoke, tiles, windowBox } from './shapes.ts'

const table = (x: number, w: number) =>
  `<rect x="${x + w / 2 - 6}" y="290" width="12" height="110" fill="#5e3b1a"/><ellipse cx="${x + w / 2}" cy="400" rx="30" ry="5" fill="#5e3b1a"/>` +
  `<path d="M${x} 256H${x + w}V296${'q-10 8 -20 0'.repeat(Math.round(w / 20))}Z" fill="#fff"/>`

const chairBack = (x: number) => `<rect x="${x - 18}" y="230" width="36" height="110" rx="10" fill="#b83236"/><rect x="${x - 22}" y="330" width="44" height="12" rx="4" fill="#8f2427"/>`

/** Bar stool standing at x (A) or lying on the floor (B). Bounds: x 666–741, y 324–408. */
const stool = (x: number, up: boolean) =>
  up
    ? `<path d="M${x} 334V396" stroke="#8a8f99" stroke-width="6"/><ellipse cx="${x}" cy="398" rx="18" ry="5" fill="#8a8f99"/><ellipse cx="${x}" cy="330" rx="22" ry="6" fill="#e5484d"/>`
    : `<path d="M678 392H734" stroke="#8a8f99" stroke-width="6"/><ellipse cx="736" cy="392" rx="5" ry="16" fill="#8a8f99"/><ellipse cx="672" cy="388" rx="6" ry="22" fill="#e5484d"/>`

const pancake = (y: number) => `<ellipse cx="640" cy="${y}" rx="22" ry="5" fill="#d9963a"/><ellipse cx="640" cy="${y - 2}" rx="21" ry="4" fill="#f2c069"/>`

/** Sugar bowl: upright with its spoon (A) or tipped, sugar spilled (B). Bounds: x 426–470, y 236–260. */
const sugar = (up: boolean) =>
  up
    ? `<path d="M428 248Q428 260 440 260Q452 260 452 248Z" fill="#fff" stroke="#a9c7dc" stroke-width="1.5"/><ellipse cx="440" cy="248" rx="12" ry="3" fill="#f5f2ea"/><path d="M444 248l6 -10" stroke="#8a8f99" stroke-width="2.4" stroke-linecap="round"/>`
    : `<g fill="#fff">${[[452, 257], [458, 255], [462, 258], [466, 256], [456, 259]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>` +
      `<path d="M430 246Q426 258 436 260L448 252Q446 240 436 240Z" fill="#fff" stroke="#a9c7dc" stroke-width="1.5"/><path d="M440 252l18 2" stroke="#8a8f99" stroke-width="2.4" stroke-linecap="round"/>`

/** Wine bottle on the shelf: standing (A) or fallen on its side (B). Bounds: x 576–626, y 118–170. */
const bottle = (up: boolean) =>
  up
    ? `<path d="M592 170V138Q592 132 597 128V118H603V128Q608 132 608 138V170Z" fill="#2f7d55"/><rect x="594" y="146" width="12" height="12" fill="#f5ecd8"/>`
    : `<path d="M576 170H608Q614 170 618 165H626V159H618Q614 154 608 154H576Z" fill="#2f7d55"/><rect x="586" y="156" width="12" height="12" fill="#f5ecd8"/>`

const hangingLamp = (x: number) => `<path d="M${x} 16V44" stroke="#5e3b1a" stroke-width="2"/><path d="M${x - 16} 58Q${x} 34 ${x + 16} 58Z" fill="#f2c14e"/><circle cx="${x}" cy="58" r="5" fill="#fff3b0"/>`

export default detectiveLevel({
  id: 523,
  case: 'train',
  title: 'trainDiningCar',
  parTimeSec: 112,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="400" fill="#f5ecd8"/><rect y="290" width="800" height="110" fill="#8a5a2b"/><rect width="800" height="16" fill="#8a5a2b"/>` +
    tiles(400, '#2b2b38', '#e8e2d6') +
    anim({ type: 'sway', angle: 4, pivot: [260, 16], period: 2.2 }, hangingLamp(260)) +
    anim({ type: 'sway', angle: 4, pivot: [520, 16], period: 2.2 }, hangingLamp(520)) +
    // Windows with the night outside
    windowBox(95, 80, 110, 120, '#1f2a4a') +
    windowBox(345, 80, 110, 120, '#1f2a4a') +
    `<path d="M103 192V160Q140 146 197 166V192ZM353 192V170Q400 150 447 168V192Z" fill="#14203a"/><circle cx="170" cy="112" r="10" fill="#fff3b0"/>` +
    clue('blindDown', 400, 110, 53, '', `<rect x="353" y="88" width="94" height="42" fill="#f2c069"/><path d="M353 126H447" stroke="#c9953f" stroke-width="3"/><path d="M400 130v4" stroke="#5e3b1a" stroke-width="2"/><circle cx="400" cy="136" r="3" fill="#5e3b1a"/>`) +
    // Table 1: candle and rose
    chairBack(60) +
    chairBack(260) +
    table(70, 180) +
    candle(120, 260) +
    clue('candleOut', 120, 204, 20, flame(120, 260), smoke(120, 260)) +
    `<path d="M194 260V244Q194 238 200 238Q206 238 206 244V260Z" fill="#bfe6ff"/>` +
    clue('roseGone', 200, 220, 22, `<path d="M200 240V214" stroke="#3f9b4b" stroke-width="2.4"/><path d="M200 228q-10 -2 -12 -8q8 0 12 6Z" fill="#3f9b4b"/><circle cx="200" cy="208" r="8" fill="#e5484d"/><path d="M196 206q4 -4 8 0" stroke="#b83236" stroke-width="1.6" fill="none"/>`, '') +
    // Table 2: menu and sugar
    chairBack(310) +
    chairBack(490) +
    table(320, 160) +
    `<ellipse cx="400" cy="258" rx="22" ry="4" fill="#dfe3ea"/>` +
    clue('menuFallen', 360, 246, 22, `<path d="M346 260L360 232L374 260Z" fill="#8e2f45"/><path d="M354 252h12" stroke="#f2c14e" stroke-width="2"/>`, `<rect x="342" y="254" width="36" height="5" rx="1" fill="#8e2f45"/>`) +
    clue('sugarSpilled', 446, 250, 26, sugar(true), sugar(false)) +
    // Kitchen counter
    shelf(560, 170, 240) +
    clue('bottleFallen', 600, 148, 35, bottle(true), bottle(false)) +
    `<rect x="650" y="138" width="22" height="32" rx="4" fill="#e8457a"/><rect x="690" y="130" width="18" height="40" rx="3" fill="#f2b632"/><rect x="730" y="144" width="40" height="26" rx="4" fill="#bfe6ff"/>` +
    `<rect x="560" y="256" width="240" height="144" fill="#b5835a"/><rect x="552" y="244" width="248" height="14" rx="3" fill="#8a5a2b"/>` +
    `<ellipse cx="640" cy="252" rx="28" ry="5" fill="#fff"/>` +
    pancake(246) +
    clue('pancakeStack', 640, 230, 30, '', [239, 232, 225, 218, 211].map(pancake).join('') + `<rect x="634" y="202" width="12" height="7" rx="2" fill="#fff3b0"/>`) +
    `<rect x="706" y="218" width="28" height="32" rx="5" fill="#e8f6ff" fill-opacity="0.8" stroke="#a9c7dc" stroke-width="1.5"/><g fill="#a8743f"><circle cx="714" cy="240" r="5"/><circle cx="726" cy="236" r="5"/><circle cx="719" cy="228" r="5"/></g>` +
    clue(
      'cookieJarOpen',
      739,
      231,
      42,
      `<rect x="704" y="212" width="32" height="8" rx="3" fill="#e5484d"/><circle cx="720" cy="209" r="4" fill="#e5484d"/>`,
      `<g transform="rotate(8 758 246)"><rect x="742" y="242" width="32" height="8" rx="3" fill="#e5484d"/><circle cx="758" cy="239" r="4" fill="#e5484d"/></g>`,
    ) +
    stool(600, true) +
    clue('stoolTipped', 704, 370, 54, stool(700, true), stool(700, false)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['newspapers', 43, 423],
      ['dartboard', 300, 85],
      ['bucket', 333, 466],
      ['yarnBasket', 738, 481],
      ['wallPhone', 749, 70],
    ]) +
    extras({ extra, anim }, [
      ['sconce', 47, 129],
      ['pouf', 158, 464, '#4fb3a9'],
      ['garlic', 165, 49],
      ['calendar', 228, 317],
      ['hatBox', 247, 426, '#7b5ea7'],
      ['butterflyFrame', 375, 318],
      ['cat', 512, 448],
      ['roundMirror', 520, 85],
      ['photoOval', 538, 251],
      ['fireExtinguisher', 627, 485],
    ]),
})
