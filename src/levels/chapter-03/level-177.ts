// Marsh boardwalk: a wetland trail among the forest's ten hardest (hidden until released, levels/upcoming.ts). New
// in the forest: a boardwalk with its rail, cattails, a bird hide on stilts, an info board, a birdwatcher with
// binoculars, a camera on a tripod, a kingfisher, a turtle on a log, water lilies with a frog, a muskrat and a
// moored rowing boat. Motion differences: the muskrat swims and the cattails sway only on picture A; the
// kingfisher bobs only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, frog, oak } from './shapes.ts'

/** Deck top of the boardwalk at x: (0, 392) → (330, 360) → (620, 300). */
const deckY = (x: number) => (x <= 330 ? 392 - (32 / 330) * x : 360 - (60 / 290) * (x - 330))

/** Muskrat swimming to the right with its wake; (x, y) = head. Bounds: x from −26 to +8, y ±8. */
const muskrat = (x: number, y: number) =>
  `<path d="M${x - 26} ${y - 6}L${x - 6} ${y}L${x - 26} ${y + 6}" stroke="#9ad3f0" stroke-width="2" fill="none"/>` +
  `<ellipse cx="${x - 4}" cy="${y}" rx="10" ry="5" fill="#6b4a2b"/><circle cx="${x + 3}" cy="${y - 2}" r="1.3" fill="#222"/>`

/** Kingfisher perched, faces left; (x, y) = feet. Bounds: x from −14 to +8, y from −18 to 0. */
const kingfisher = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M4 -4l4 6" stroke="#1d5fbf" stroke-width="3"/><ellipse cy="-8" rx="6" ry="8" fill="#1d8fd0"/><ellipse cx="-1" cy="-4" rx="4" ry="5" fill="#fb8500"/>` +
  `<circle cx="-2" cy="-15" r="5" fill="#1d8fd0"/><path d="M-6 -16l-8 2l8 1Z" fill="#2b2b2b"/><circle cx="-3" cy="-16" r="1" fill="#fff"/></g>`

/** A clump of cattails rising from (x, y). Bounds: x ±18, y from −72 to 0. */
const cattails = (x: number, y: number) =>
  `<path d="M${x - 12} ${y}Q${x - 14} ${y - 40} ${x - 16} ${y - 66}M${x} ${y}V${y - 72}M${x + 12} ${y}Q${x + 14} ${y - 40} ${x + 14} ${y - 62}" stroke="#5f8f3a" stroke-width="2.5" fill="none"/>` +
  `<rect x="${x - 19}" y="${y - 64}" width="6" height="18" rx="3" fill="#7a4a24"/><rect x="${x - 3}" y="${y - 70}" width="6" height="18" rx="3" fill="#7a4a24"/><rect x="${x + 11}" y="${y - 60}" width="6" height="18" rx="3" fill="#7a4a24"/>` +
  `<path d="M${x - 6} ${y}q-10 -26 -18 -34M${x + 6} ${y}q12 -22 20 -30" stroke="#6fa04a" stroke-width="3" fill="none"/>`

/** Turtle shell; (x, y) = dome center. Bounds: x ±13, y from −10 to +4. */
const shell = (x: number, y: number, color: string) => `<path d="M${x - 13} ${y + 4}Q${x - 12} ${y - 10} ${x} ${y - 10}Q${x + 12} ${y - 10} ${x + 13} ${y + 4}Z" fill="${color}"/><path d="M${x - 6} ${y + 2}l3 -8h6l3 8" stroke="#3d4a2a" stroke-width="1.5" fill="none"/>`

export default svgLevel({
  id: 177,
  chapter: 'forest',
  title: 'marshBoardwalk',
  parTimeSec: 102,
  scene: ({ diff, anim, rand, extra }) => {
    const swimming = anim({ id: 'muskrat', type: 'path', points: [[0, 0], [60, 0]], period: 5 }, muskrat(300, 468))
    let reeds = ''
    for (let i = 0; i < 26; i++) {
      const x = rand() * 790 + 5
      reeds += `<path d="M${x.toFixed(1)} 262q2 -20 -2 -34" stroke="#6f8f3a" stroke-width="2" fill="none"/>`
    }
    let deck = `<path d="M0 392L330 360L620 300V314L330 374L0 406Z" fill="#a0703f"/>`
    for (let x = 20; x < 620; x += 40) if (x !== 400) deck += `<path d="M${x} ${deckY(x)}V${deckY(x) - 26}" stroke="#7a5230" stroke-width="4"/>`
    deck += `<path d="M0 366L330 334L620 274" stroke="#7a5230" stroke-width="3" fill="none"/>`
    for (let x = 30; x < 620; x += 60) deck += `<path d="M${x} ${deckY(x) + 4}V${deckY(x) + 40}" stroke="#5e3b1a" stroke-width="5"/>`
    return (
      `<rect width="800" height="500" fill="#d6ecf5"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(300, 70, 0.6)) +
      oak(80, 250, 0.8, '#6f9a45') + oak(420, 246, 0.7, '#5f8f3a') + oak(560, 250, 0.9, '#6f9a45') +
      `<rect y="240" width="800" height="22" fill="#9cbf6a"/>` + reeds +
      `<rect y="260" width="800" height="240" fill="#5f9fb8"/><path d="M40 300q20 -4 40 0M560 360q20 -4 40 0M120 440q20 -4 40 0M640 480q20 -4 40 0" stroke="#9ad3f0" stroke-width="2" fill="none"/>` +
      // Cattails, the kingfisher on its snag
      diff(150, 264, 40, anim({ type: 'sway', angle: 6, pivot: [150, 300], period: 2.4 }, cattails(150, 300)), cattails(150, 300)) +
      `<path d="M470 290L490 200M484 226l14 -8" stroke="#6b5a48" stroke-width="5" stroke-linecap="round"/>` +
      diff(486, 196, 22, kingfisher(488, 206), anim({ type: 'bob', dx: 0, dy: -3, period: 0.8 }, kingfisher(488, 206))) +
      // Bird hide on its stilts with the viewing slot
      `<path d="M650 300V230M730 300V230" stroke="#5e3b1a" stroke-width="6"/><rect x="640" y="168" width="100" height="64" fill="#8a5a33"/><path d="M632 172L690 140L748 172Z" fill="#5e3b1a"/>` +
      `<path d="M716 232L760 300" stroke="#a0703f" stroke-width="5"/>` +
      diff(690, 198, 26, `<rect x="666" y="192" width="48" height="12" fill="#2b2b2b"/>`, `<rect x="666" y="192" width="48" height="12" fill="#a0703f"/><path d="M666 198h48" stroke="#7a5230" stroke-width="1.5"/>`) +
      // Turtle on its log, lilies and the frog, the moored boat
      `<rect x="380" y="438" width="92" height="14" rx="7" fill="#7a5230"/>` +
      `<g transform="translate(420 438)"><ellipse cx="16" cy="-4" rx="5" ry="4" fill="#6f8f3a"/><path d="M-10 0v-4M10 0v-4" stroke="#6f8f3a" stroke-width="4"/></g>` +
      diff(420, 432, 22, shell(420, 434, '#5e6b3a'), shell(420, 434, '#a0632b')) +
      `<g fill="#3f8f3a"><ellipse cx="590" cy="436" rx="20" ry="7"/><ellipse cx="628" cy="426" rx="18" ry="6"/><ellipse cx="566" cy="452" rx="18" ry="6"/><ellipse cx="652" cy="450" rx="16" ry="6"/></g>` +
      diff(628, 418, 22, `<g fill="#ff8fab"><ellipse cx="624" cy="418" rx="4" ry="7"/><ellipse cx="632" cy="418" rx="4" ry="7"/><ellipse cx="628" cy="415" rx="4" ry="8"/></g>`, `<g fill="#ffffff"><ellipse cx="624" cy="418" rx="4" ry="7"/><ellipse cx="632" cy="418" rx="4" ry="7"/><ellipse cx="628" cy="415" rx="4" ry="8"/></g>`) +
      diff(566, 440, 22, frog(566, 450), '') +
      `<path d="M690 430Q730 460 780 430Z" fill="#c0392b"/><path d="M690 430H780" stroke="#8e2c27" stroke-width="3"/><path d="M690 432L660 410" stroke="#8d99ae" stroke-width="1.5"/>` +
      diff(744, 418, 26, `<path d="M728 430L758 408" stroke="#a0703f" stroke-width="3"/><path d="M756 404l8 -2l-2 8Z" fill="#a0703f"/>`, '') +
      // Muskrat
      diff(292, 468, 26, swimming, muskrat(300, 468), 'muskrat') +
      // Boardwalk, info board, birdwatcher, camera; the missing rail post
      deck +
      diff(400, ~~(deckY(400) - 13), 22, `<path d="M400 ${deckY(400)}V${deckY(400) - 26}" stroke="#7a5230" stroke-width="4"/>`, '') +
      `<path d="M50 ${deckY(50)}V${deckY(50) - 40}M70 ${deckY(70)}V${deckY(70) - 40}" stroke="#5e3b1a" stroke-width="4"/><rect x="38" y="316" width="44" height="32" rx="3" fill="#f4f1e8" stroke="#5e3b1a" stroke-width="3"/>` +
      diff(60, 332, 22, `<circle cx="60" cy="332" r="9" fill="#3a86ff"/><path d="M54 332l6 -4l6 4" stroke="#ffffff" stroke-width="2" fill="none"/>`, `<circle cx="60" cy="332" r="9" fill="#8ac926"/><path d="M54 332l6 -4l6 4" stroke="#ffffff" stroke-width="2" fill="none"/>`) +
      person(222, Math.round(deckY(222)), '#3f6f4a', false, '#e0b48a', '#5a3d2b') +
      diff(232, 318, 22, `<rect x="226" y="312" width="14" height="7" rx="2" fill="#2b2b2b"/><path d="M234 320l-6 10" stroke="#3f6f4a" stroke-width="4"/>`, '') +
      `<path d="M300 ${deckY(300)}L310 332L320 ${deckY(320)}M310 332V${deckY(310)}" stroke="#3d4a55" stroke-width="2.5" fill="none"/>` +
      diff(310, 322, 22, `<rect x="300" y="316" width="22" height="14" rx="2" fill="#2b2b2b"/><circle cx="324" cy="323" r="4" fill="#5c677d"/>`, '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['dragonfly', 380, 250],
        ['duck', 110, 450],
        ['frog', 700, 480],
        ['bird', 520, 300],
        ['feather', 470, 480],
      ])
    )
  },
})
