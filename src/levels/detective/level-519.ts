// "The circus mystery", scene 4 — the entrance: the ticket booth's window flung open, tickets spilled,
// the poster torn, the balloons flown off, a star fallen from the arch, the rope barrier unhooked,
// prints of pointed shoes going in and popcorn spilled by the cart.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { openPanes, panes, sky, windowBox } from './shapes.ts'

const star = (x: number, y: number, r: number, color = '#f2c14e') => {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5 - Math.PI / 2
    const d = i % 2 ? r * 0.45 : r
    return `${(x + Math.cos(a) * d).toFixed(1)} ${(y + Math.sin(a) * d).toFixed(1)}`
  })
  return `<path d="M${points.join('L')}Z" fill="${color}"/>`
}

const ticket = (x: number, y: number, a: number) =>
  `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 9}" y="${y - 6}" width="18" height="12" rx="2" fill="#f28fb1"/><path d="M${x + 4} ${y - 6}V${y + 6}" stroke="#fff" stroke-width="1.4" stroke-dasharray="2 2"/></g>`

/** Shoe print with a long pointed toe, toe up; (x, y) = heel area. Bounds: x ±7, y from −22 to +14. */
const pointed = (x: number, y: number) =>
  `<path d="M${x} ${y - 22}Q${x + 7} ${y - 8} ${x + 6} ${y + 4}Q${x + 5} ${y + 14} ${x} ${y + 14}Q${x - 5} ${y + 14} ${x - 6} ${y + 4}Q${x - 7} ${y - 8} ${x} ${y - 22}Z" fill="#5e3b1a" fill-opacity="0.45"/>`

const balloon = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="12" ry="14" fill="${color}"/><path d="M${x - 3} ${y + 16}h6l-3 -3Z" fill="${color}"/>`

/** Rope between the posts at 470 and 550: hooked (A) or hanging from the left post (B). Bounds: x 470–550, y 326–384. */
const rope = (hooked: boolean) =>
  `<path d="${hooked ? 'M474 330Q510 362 546 330' : 'M474 330Q468 360 480 380'}" stroke="#b83236" stroke-width="5" fill="none" stroke-linecap="round"/>`
const post = (x: number) =>
  `<rect x="${x - 3}" y="328" width="6" height="72" fill="#c9953f"/><ellipse cx="${x}" cy="400" rx="12" ry="4" fill="#c9953f"/><circle cx="${x}" cy="326" r="6" fill="#e0b030"/>`

const kernels = (points: [number, number][]) =>
  `<g fill="#fff8e0" stroke="#e8c35a" stroke-width="1">${points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5"/>`).join('')}</g>`

export default detectiveLevel({
  id: 519,
  case: 'circus',
  title: 'circusEntrance',
  parTimeSec: 100,
  scene: ({ clue, anim, extra }) =>
    sky('#ffd9b0') +
    `<circle cx="720" cy="80" r="36" fill="#ffb36b" fill-opacity="0.7"/>` +
    // Big top behind the arch
    `<path d="M300 400L530 40L760 400Z" fill="#fff1dc"/><path d="M530 40L380 400H440ZM530 40L500 400H560ZM530 40L620 400H680Z" fill="#e5484d"/>` +
    `<rect y="400" width="800" height="100" fill="#d9c08a"/><path d="M0 400H800" stroke="#c9a86a" stroke-width="4"/>` +
    // Ticket booth
    `<path d="M44 176L150 110L256 176Z" fill="#e5484d"/><rect x="60" y="176" width="180" height="224" fill="#f5ecd8"/>` +
    [76, 116, 156, 196].map((x) => `<rect x="${x}" y="176" width="20" height="224" fill="#f28fb1" fill-opacity="0.5"/>`).join('') +
    `<rect x="90" y="190" width="120" height="30" rx="4" fill="#e5484d"/>` +
    star(120, 205, 9, '#fff') +
    star(150, 205, 9, '#fff') +
    star(180, 205, 9, '#fff') +
    windowBox(100, 230, 100, 70, '#5b3a4a') +
    clue('windowOpen', 150, 265, 52, panes(100, 230, 100, 70), openPanes(100, 230, 100, 70)) +
    `<rect x="110" y="330" width="80" height="50" rx="4" fill="#e5484d"/>` +
    `<path d="M252 176V142M250 176L262 144M254 176L242 128" stroke="#5b6b7a" stroke-width="1.4"/>` +
    clue('balloonsLoose', 251, 114, 34, balloon(240, 112, '#3fbf5f') + balloon(262, 100, '#3a6ea5') + balloon(254, 126, '#8e6bbf'), '') +
    clue('ticketsSpilled', 150, 440, 32, '', ticket(130, 432, 20) + ticket(156, 446, -14) + ticket(172, 430, 40) + ticket(144, 456, 4)) +
    // Poster board
    `<path d="M272 264V400M328 264V400" stroke="#6b4a2b" stroke-width="8"/><rect x="256" y="146" width="88" height="118" fill="#8a5a2b"/>` +
    `<rect x="260" y="150" width="80" height="110" fill="#f2c14e"/><circle cx="300" cy="196" r="24" fill="#fff"/><circle cx="300" cy="200" r="6" fill="#e5484d"/>` +
    `<path d="M282 180l8 6M318 180l-8 6M288 212q12 10 24 0" stroke="#2b2b38" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M276 168L300 140L324 168Z" fill="#3a6ea5"/>` +
    `<rect x="272" y="232" width="56" height="8" rx="2" fill="#e5484d"/>` +
    clue('posterTorn', 323, 244, 26, '', `<path d="M340 226V260H306Z" fill="#8a5a2b"/><path d="M340 226L306 260L318 236Z" fill="#fff8e0" stroke="#e8c35a" stroke-width="1.2"/>`) +
    // The arch
    [380, 640].map((x) => `<rect x="${x}" y="150" width="40" height="250" fill="#fff1dc"/>${[170, 230, 290, 350].map((y) => `<path d="M${x} ${y}l40 20v20l-40 -20Z" fill="#e5484d"/>`).join('')}`).join('') +
    `<rect x="370" y="110" width="320" height="50" rx="10" fill="#3a6ea5"/>` +
    [430, 480, 530, 630].map((x) => star(x, 135, 14)).join('') +
    clue('starGone', 580, 135, 20, star(580, 135, 14), '') +
    anim({ type: 'sway', angle: 12, pivot: [530, 110], period: 2 }, `<path d="M530 110V84" stroke="#5e3b1a" stroke-width="3"/><path d="M530 84l24 7l-24 7Z" fill="#e5484d"/>`) +
    post(470) +
    post(550) +
    clue('ropeDown', 510, 344, 50, rope(true), rope(false)) +
    clue('pointedPrints', 601, 444, 33, '', pointed(590, 456) + pointed(612, 440)) +
    // Popcorn cart
    `<rect x="700" y="330" width="90" height="60" fill="#e5484d"/><rect x="706" y="262" width="78" height="68" fill="#e8f6ff" fill-opacity="0.8" stroke="#c9953f" stroke-width="4"/>` +
    kernels([[716, 320], [728, 316], [740, 320], [752, 314], [764, 320], [774, 316], [722, 306], [746, 304], [768, 306]]) +
    `<path d="M696 262L745 236L794 262Z" fill="#f2b632"/><g fill="#5e3b1a"><circle cx="716" cy="396" r="12"/><circle cx="774" cy="396" r="12"/></g>` +
    clue('popcornSpilled', 740, 446, 30, '', kernels([[720, 446], [732, 438], [744, 450], [756, 440], [764, 452], [738, 458], [750, 432]])) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['newspapers', 43, 483],
      ['rake', 74, 412],
      ['bucket', 223, 426],
      ['toyDrum', 300, 430],
      ['tent', 497, 468],
    ]) +
    extras({ extra, anim }, [
      ['airship', 172, 67],
      ['mouse', 262, 479, '#b9a58a'],
      ['hatBox', 337, 486, '#f7a1c4'],
      ['wateringCan', 373, 427, '#e5484d'],
      ['hotAirBalloon', 400, 73],
      ['pouf', 423, 484, '#e5484d'],
      ['haybale', 443, 420],
      ['swallow', 628, 56],
      ['sparrow', 676, 419],
      ['paperPlane', 757, 181],
    ]),
})
