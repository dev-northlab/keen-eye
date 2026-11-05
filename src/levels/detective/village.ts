// Drawing helpers of "The missing chickens" (levels 531–535): the village girl (in a different outfit in every scene),
// her animals and her village yard.
// Coordinates are in the 800×500 viewBox; "bounds" are relative to the given point.

const SKIN = '#f2c9a0'
const HAIR = '#5a3a22'

/** The girl's clothes, a different outfit in every scene. */
export type Outfit = 'dress' | 'jeans' | 'overalls' | 'flannel' | 'sundress'

const JEANS = '#3b5f9a'

/** Headscarf tied at the back. */
const kerchief = (color: string, stripe: string) =>
  `<path d="M-18 -110Q-18 -133 0 -133Q18 -133 18 -110Q0 -120 -18 -110Z" fill="${color}"/>` +
  `<path d="M-14 -122Q0 -128 14 -122M-10 -129Q0 -132 10 -129" stroke="#fff" stroke-width="2" fill="none"/><path d="M-16 -116Q0 -123 16 -116" stroke="${stripe}" stroke-width="1.6" fill="none"/>` +
  `<path d="M-17 -112L-29 -102L-20 -100Z" fill="${color}"/>`
/** Hair parted on top, for the outfits without a scarf. */
const hairTop = `<path d="M-16 -110Q-18 -130 0 -130Q18 -130 16 -110Q8 -122 0 -121Q-8 -122 -16 -110Z" fill="${HAIR}"/>`
/** Wreath of meadow flowers. */
const wreath =
  `<path d="M-17 -118Q0 -136 17 -118" stroke="#4c9a3f" stroke-width="3" fill="none"/>` +
  [[-16, -119, '#9b59d0'], [-11, -126, '#e86aa0'], [-4, -130, '#fff'], [4, -130, '#9b59d0'], [11, -126, '#e86aa0'], [16, -119, '#fff']]
    .map(([fx, fy, c]) => `<circle cx="${fx}" cy="${fy}" r="4" fill="${c}"/><circle cx="${fx}" cy="${fy}" r="1.4" fill="#f2b632"/>`)
    .join('')
const strawHat = `<ellipse cy="-122" rx="27" ry="5" fill="#e8c26a"/><path d="M-13 -122Q-13 -136 0 -136Q13 -136 13 -122Z" fill="#e8c26a"/><path d="M-13 -125H13" stroke="#e5484d" stroke-width="3"/>`

/** Shirt from the shoulders to the waist and jeans hips under it. */
const top = (color: string) => `<path d="M-15 -94H15L16 -60H-16Z" fill="${color}"/><path d="M-16 -62H16L14 -50H-14Z" fill="${JEANS}"/>`

const BODY: Record<Outfit, { body: string; sleeve: string; arm: string }> = {
  dress: {
    body:
      `<path d="M-15 -94H15L28 -26H-28Z" fill="#fbf4ec"/>` +
      ([[-18, -40, '#d9384a'], [-8, -52, '#e86aa0'], [4, -44, '#f2b632'], [16, -36, '#5a8de0'], [-22, -32, '#e86aa0'], [10, -56, '#d9384a'], [20, -50, '#e86aa0'], [-12, -70, '#f2b632'], [12, -74, '#5a8de0'], [-4, -34, '#d9384a']] as const)
        .map(([dx, dy, c]) => `<circle cx="${dx}" cy="${dy}" r="2.6" fill="${c}"/>`)
        .join('') +
      `<path d="M-7 -94H7L9 -64H-9Z" fill="#7a2f2a"/><path d="M-5 -92L-7 -66M5 -92L7 -66" stroke="#3a6ed8" stroke-width="2"/><path d="M-15 -63H15" stroke="#7a2f2a" stroke-width="3"/>`,
    sleeve: '#fbf4ec',
    arm: SKIN,
  },
  jeans: {
    body: top('#8a3fc8') + `<path d="M-16 -62H16" stroke="#5e3b1a" stroke-width="3"/><circle cy="-62" r="2" fill="#f2b632"/>`,
    sleeve: '#8a3fc8',
    arm: SKIN,
  },
  overalls: {
    body:
      top('#ffd54a') +
      `<rect x="-11" y="-86" width="22" height="26" rx="2" fill="${JEANS}"/><path d="M-10 -86L-13 -94M10 -86L13 -94" stroke="${JEANS}" stroke-width="4"/>` +
      `<circle cx="-7" cy="-82" r="1.8" fill="#ffd54a"/><circle cx="7" cy="-82" r="1.8" fill="#ffd54a"/><rect x="-5" y="-76" width="10" height="8" rx="1" fill="none" stroke="#2c4a7a" stroke-width="1.4"/>`,
    sleeve: '#ffd54a',
    arm: SKIN,
  },
  flannel: {
    body: top('#c8382e') + `<path d="M-15 -84H15M-15 -72H15M-6 -94V-62M6 -94V-62" stroke="#8a1f1a" stroke-opacity="0.6" stroke-width="2"/><path d="M0 -94V-62" stroke="#fff" stroke-opacity="0.5"/>`,
    sleeve: '#c8382e',
    arm: '#c8382e',
  },
  sundress: {
    body:
      `<path d="M-13 -92H13L28 -26H-28Z" fill="#f6a9c4"/><path d="M-10 -92L-12 -100M10 -92L12 -100" stroke="#f6a9c4" stroke-width="3"/>` +
      `<g fill="#fff">${[[-20, -34], [-6, -40], [8, -34], [20, -40], [0, -54], [-12, -60], [12, -62]].map(([dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="2.4"/>`).join('')}</g>` +
      `<path d="M-14 -64H14" stroke="#e86aa0" stroke-width="3"/>`,
    sleeve: SKIN,
    arm: SKIN,
  },
}

const HEAD: Record<Outfit, string> = {
  dress: kerchief('#a8d4f0', '#e86aa0'),
  jeans: hairTop + wreath,
  overalls: hairTop + strawHat,
  flannel: kerchief('#f6a9c4', '#c8382e'),
  sundress: hairTop + wreath,
}

/**
 * The village girl with her long dark hair, in one of her outfits; (x, y) = between her feet. `wave` raises her
 * right hand; `s` scales her. Bounds: x ±30·s (±34·s waving), y from −136·s to 0.
 */
export function villageGirl(x: number, y: number, outfit: Outfit, wave = false, s = 1.15) {
  const { body, sleeve, arm } = BODY[outfit]
  const inJeans = outfit === 'jeans' || outfit === 'overalls' || outfit === 'flannel'
  const legs = inJeans ? `<path d="M-8 -60V-6M8 -60V-6" stroke="${JEANS}" stroke-width="12"/>` : `<path d="M-8 -28V-4M8 -28V-4" stroke="${SKIN}" stroke-width="6"/>`
  const feet =
    outfit === 'flannel'
      ? `<rect x="-15" y="-20" width="13" height="20" rx="3" fill="#3f8f4b"/><rect x="2" y="-20" width="13" height="20" rx="3" fill="#3f8f4b"/>`
      : `<ellipse cx="-9" cy="-3" rx="7" ry="3.5" fill="#7a3b2a"/><ellipse cx="9" cy="-3" rx="7" ry="3.5" fill="#7a3b2a"/>`
  const line = (d: string) => `<path d="${d}" stroke="${arm}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
  const hand = (hx: number, hy: number) => `<circle cx="${hx}" cy="${hy}" r="3.4" fill="${SKIN}"/>`
  const arms = line('M-17 -86L-24 -60') + hand(-24, -60) + (wave ? line('M17 -86L30 -104L32 -122') + hand(32, -122) : line('M17 -86L24 -60') + hand(24, -60))
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<path d="M-21 -112Q-26 -70 -19 -50H19Q26 -70 21 -112Z" fill="${HAIR}"/>` +
    legs +
    feet +
    arms +
    body +
    `<circle cx="-16" cy="-89" r="6" fill="${sleeve}"/><circle cx="16" cy="-89" r="6" fill="${sleeve}"/>` +
    `<rect x="-4" y="-102" width="8" height="9" fill="${SKIN}"/><circle cy="-112" r="15" fill="${SKIN}"/>` +
    `<path d="M-15 -112Q-18 -98 -15 -88M15 -112Q18 -98 15 -88" stroke="${HAIR}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    HEAD[outfit] +
    `<circle cx="-6" cy="-111" r="2" fill="#2b2b38"/><circle cx="6" cy="-111" r="2" fill="#2b2b38"/>` +
    `<circle cx="-10" cy="-105" r="3" fill="#f29a9a" fill-opacity="0.6"/><circle cx="10" cy="-105" r="3" fill="#f29a9a" fill-opacity="0.6"/>` +
    (wave ? `<path d="M-5 -104q5 5 10 0" stroke="#a8433a" stroke-width="2" fill="none" stroke-linecap="round"/>` : `<ellipse cy="-103" rx="2.6" ry="3" fill="#a8433a"/>`) +
    `</g>`
  )
}

/**
 * White goat kid with a red bow and a golden bell (`bell` false: lost), facing right; (x, y) = body center.
 * Bounds: x from −32 to +42, y from −42 to +30.
 */
export const goat = (x: number, y: number, flip = false, bell = true) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-18 8V28M-8 10V28M10 10V28M20 8V28" stroke="#ece8de" stroke-width="6"/><path d="M-18 26v3M-8 26v3M10 26v3M20 26v3" stroke="#5e4a3a" stroke-width="6"/>` +
  `<path d="M-26 -6l-6 -6l4 8Z" fill="#ece8de"/><ellipse rx="27" ry="15" fill="#f7f5ef"/>` +
  `<path d="M16 -6L26 -22" stroke="#f7f5ef" stroke-width="12" stroke-linecap="round"/>` +
  `<path d="M24 -36q-2 -6 -8 -6M30 -36q2 -6 -2 -8" stroke="#b8b0a0" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="32" cy="-26" rx="10" ry="8" fill="#f7f5ef"/><ellipse cx="18" cy="-30" rx="7" ry="3" fill="#ece8de" transform="rotate(-20 18 -30)"/>` +
  `<circle cx="34" cy="-28" r="1.8" fill="#2b2b38"/><ellipse cx="41" cy="-24" rx="1.6" ry="1.2" fill="#c98a8a"/>` +
  `<path d="M14 -10L20 -18L24 -8Z M20 -12l-8 0" fill="#d32f3a"/><path d="M16 -14l-7 -5v10Z M24 -14l7 -5v10Z" fill="#d32f3a"/>` +
  (bell ? `<circle cx="20" cy="-6" r="4" fill="#f2b632" stroke="#c98a10" stroke-width="1.2"/>` : '') +
  `</g>`

/** Grey-and-white goose with a long neck, facing right; (x, y) = body center. Bounds: x from −30 to +34, y from −52 to +26. */
export const goose = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-4 12V24M6 12V24" stroke="#f08a24" stroke-width="3"/><path d="M-9 24h8M1 24h8" stroke="#f08a24" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M-24 -2L-30 -10L-18 -8Z" fill="#c9ccd1"/><ellipse rx="25" ry="15" fill="#f4f4f0"/><path d="M-16 -4Q0 -12 14 -2Q0 6 -16 -4Z" fill="#c9ccd1"/>` +
  `<path d="M14 -6Q20 -26 18 -40" stroke="#f4f4f0" stroke-width="9" stroke-linecap="round" fill="none"/>` +
  `<circle cx="20" cy="-42" r="8" fill="#e8e8e2"/><path d="M26 -46L34 -40L26 -38Z" fill="#f08a24"/><circle cx="26" cy="-47" r="2.6" fill="#f08a24"/>` +
  `<circle cx="22" cy="-44" r="1.6" fill="#2b2b38"/></g>`

/** Shaggy white-and-grey dog, facing right; `asleep` lies it down with closed eyes. (x, y) = feet line, body middle. Bounds: x ±40, y from −46 to +2. */
export function shaggyDog(x: number, y: number, asleep = false) {
  if (asleep)
    return (
      `<g transform="translate(${x} ${y})">` +
      `<ellipse cy="-12" rx="34" ry="13" fill="#eeeae4"/><path d="M-30 -14q-8 -2 -8 6" stroke="#eeeae4" stroke-width="7" stroke-linecap="round" fill="none"/>` +
      `<path d="M-20 -22q4 -4 8 0M-4 -24q4 -4 8 0M10 -22q4 -4 8 0" stroke="#c9c4bb" stroke-width="2" fill="none"/>` +
      `<ellipse cx="28" cy="-14" rx="13" ry="11" fill="#eeeae4"/><path d="M20 -22q-6 6 -2 16" stroke="#9aa0a6" stroke-width="6" stroke-linecap="round" fill="none"/>` +
      `<path d="M26 -16q3 2 6 0" stroke="#2b2b38" stroke-width="1.6" fill="none"/><circle cx="40" cy="-12" r="2.6" fill="#2b2b38"/></g>`
    )
  return (
    `<g transform="translate(${x} ${y})">` +
    `<path d="M-20 -8V0M-8 -6V0M10 -6V0M22 -8V0" stroke="#e4dfd6" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M-28 -24q-10 -10 -6 -18" stroke="#eeeae4" stroke-width="7" stroke-linecap="round" fill="none"/>` +
    `<ellipse cy="-18" rx="30" ry="14" fill="#eeeae4"/><path d="M-20 -28q4 -4 8 0M-4 -30q4 -4 8 0M10 -28q4 -4 8 0" stroke="#c9c4bb" stroke-width="2" fill="none"/>` +
    `<circle cx="28" cy="-30" r="14" fill="#eeeae4"/><path d="M18 -40q-8 8 -4 22M38 -40q6 8 2 20" stroke="#9aa0a6" stroke-width="7" stroke-linecap="round" fill="none"/>` +
    `<path d="M18 -38q10 -8 20 0" stroke="#d6d1c8" stroke-width="6" stroke-linecap="round" fill="none"/>` +
    `<circle cx="24" cy="-31" r="2" fill="#2b2b38"/><circle cx="33" cy="-31" r="2" fill="#2b2b38"/><ellipse cx="29" cy="-24" rx="4" ry="3" fill="#2b2b38"/></g>`
  )
}

/** Red rooster with a dark tail, facing right; (x, y) = body center. Bounds: x from −34 to +34, y from −36 to +26. */
export const rooster = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-6 14V26M6 14V26" stroke="#f0a020" stroke-width="3"/>` +
  `<path d="M-18 -4Q-34 -30 -22 -32Q-24 -16 -14 -8Z" fill="#2f5a3a"/><path d="M-20 0Q-34 -16 -30 -24Q-26 -10 -16 -4Z" fill="#1f2a30"/>` +
  `<ellipse rx="21" ry="15" fill="#b8452a"/><path d="M-10 -2Q4 -8 14 2Q2 8 -10 -2Z" fill="#8a2f1e"/>` +
  `<circle cx="16" cy="-16" r="10" fill="#e07a2a"/><path d="M10 -26q2 -8 5 -2q2 -8 5 -1q3 -6 4 2Z" fill="#e5383b"/>` +
  `<path d="M25 -18L33 -15L25 -12Z" fill="#f0a020"/><path d="M22 -10q2 6 -2 8" stroke="#e5383b" stroke-width="4" stroke-linecap="round" fill="none"/>` +
  `<circle cx="19" cy="-18" r="1.8" fill="#222"/></g>`

/** White rabbit with black patches, sitting, facing right; (x, y) = bottom middle. Bounds: x from −18 to +20, y from −46 to 0. */
export const rabbit = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cy="-12" rx="16" ry="12" fill="#fafafa"/><circle cx="-15" cy="-14" r="4" fill="#fff"/><ellipse cx="-4" cy="-14" rx="6" ry="5" fill="#2b2b38"/>` +
  `<circle cx="9" cy="-24" r="9" fill="#fafafa"/><ellipse cx="6" cy="-36" rx="3.5" ry="10" fill="#fafafa"/><ellipse cx="12" cy="-36" rx="3.5" ry="10" fill="#2b2b38"/>` +
  `<circle cx="12" cy="-25" r="1.6" fill="#2b2b38"/><circle cx="17" cy="-22" r="1.6" fill="#e8a0b0"/></g>`

/** Brown horse's head looking over a stall door, facing left; (x, y) = bottom of its neck. Bounds: x from −46 to +16, y from −70 to 0. */
export const horseHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-6 0Q-12 -40 -4 -56L14 -48Q12 -20 14 0Z" fill="#8a5a33"/>` +
  `<path d="M-6 -54Q-30 -46 -42 -30Q-46 -22 -38 -20Q-24 -24 -10 -34Z" fill="#8a5a33"/><ellipse cx="-40" cy="-24" rx="6" ry="5" fill="#6e4426"/>` +
  `<path d="M-2 -60l4 -10l4 10Z" fill="#8a5a33"/><path d="M-2 -56Q6 -40 6 0" stroke="#3b2a1a" stroke-width="5" fill="none"/>` +
  `<circle cx="-14" cy="-42" r="2" fill="#2b2b38"/><path d="M-26 -46l6 8" stroke="#f4ece0" stroke-width="5" stroke-linecap="round"/></g>`

/** Duck on the water or the grass, white with an orange beak, facing right; (x, y) = body center. Bounds: x from −22 to +26, y from −24 to +10. */
export const whiteDuck = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-16 -2L-22 -10L-10 -6Z" fill="#ececec"/><ellipse rx="18" ry="10" fill="#fafafa"/><path d="M-8 -2Q2 -6 10 0" stroke="#d8d8d8" stroke-width="3" fill="none"/>` +
  `<circle cx="12" cy="-14" r="7" fill="#fafafa"/><path d="M18 -15L26 -12L18 -10Z" fill="#f08a24"/><circle cx="14" cy="-16" r="1.4" fill="#222"/></g>`

/** Log house wall with a grey roof and a window with blue frames and white shutters; (x, y) = top-left of the wall. */
export function logHouse(x: number, y: number, w: number, h: number) {
  const logs = Array.from({ length: Math.floor(h / 16) }, (_, i) => `<rect x="${x}" y="${y + i * 16}" width="${w}" height="15" rx="7" fill="${i % 2 ? '#9a6a3c' : '#a8743f'}"/>`).join('')
  const wx = x + w / 2 - 30
  const wy = y + 34
  return (
    logs +
    `<path d="M${x - 24} ${y + 4}L${x + w / 2} ${y - 80}L${x + w + 24} ${y + 4}Z" fill="#7d858c"/><path d="M${x - 24} ${y + 4}L${x + w / 2} ${y - 80}L${x + w + 24} ${y + 4}" stroke="#5e656b" stroke-width="5" fill="none"/>` +
    `<rect x="${wx - 16}" y="${wy}" width="14" height="56" fill="#fff"/><rect x="${wx + 62}" y="${wy}" width="14" height="56" fill="#fff"/>` +
    `<rect x="${wx}" y="${wy}" width="60" height="56" fill="#3a7bd5"/><rect x="${wx + 6}" y="${wy + 6}" width="48" height="44" fill="#cfe9ff"/>` +
    `<path d="M${wx + 30} ${wy + 6}V${wy + 50}M${wx + 6} ${wy + 24}H${wx + 54}" stroke="#3a7bd5" stroke-width="4"/>` +
    `<rect x="${wx - 6}" y="${wy + 54}" width="72" height="7" fill="#fff"/>`
  )
}

/** Plank wall or gable of a barn or a coop: vertical boards from (x, y), w × h. */
export const planks = (x: number, y: number, w: number, h: number, color = '#b5835a', line = '#8a5a2b') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>` +
  `<path d="${Array.from({ length: Math.floor(w / 22) }, (_, i) => `M${x + 22 * (i + 1)} ${y}v${h}`).join('')}" stroke="${line}" stroke-width="2"/>`

/** Picket wicket gate, hinged on the left at x; open swings it out. Bounds: x from 0 to w (open: 0 to w·0.45), y from −70 to 0. */
export function wicket(x: number, y: number, w: number, open: boolean, color = '#9fc6e6') {
  const pickets = (n: number, step: number) => Array.from({ length: n }, (_, i) => `<path d="M${x + i * step + 2} ${y}V${y - 62}l${step / 2 - 2} -8l${step / 2 - 2} 8V${y}Z" fill="${color}" stroke="#000" stroke-opacity="0.15"/>`).join('')
  return open ? pickets(4, (w * 0.45) / 4) : pickets(4, w / 4) + `<path d="M${x + 2} ${y - 46}H${x + w - 2}M${x + 2} ${y - 18}H${x + w - 2}" stroke="${color}" stroke-width="5"/>`
}

/** Grain scattered around (x, y). Bounds: x ±(w/2 + 3), y ±8. */
export const grain = (x: number, y: number, w = 40) =>
  `<g fill="#e8a83a" stroke="#b8802a" stroke-width="0.8">${Array.from({ length: Math.round(w / 3) }, (_, i) => `<ellipse cx="${(x - w / 2 + ((i * 37) % w)).toFixed(1)}" cy="${(y + ((i * 7) % 11) - 5).toFixed(1)}" rx="3" ry="2"/>`).join('')}</g>`

/** Burlap sack of grain, standing; (x, y) = bottom middle. Bounds: x ±24, y from −56 to 0. */
export const sack = (x: number, y: number) =>
  `<path d="M${x - 22} ${y}Q${x - 26} ${y - 30} ${x - 14} ${y - 46}H${x + 14}Q${x + 26} ${y - 30} ${x + 22} ${y}Z" fill="#c9a66b"/>` +
  `<path d="M${x - 12} ${y - 46}Q${x} ${y - 58} ${x + 12} ${y - 46}" fill="#b8955c"/><path d="M${x - 14} ${y - 44}H${x + 14}" stroke="#7a5233" stroke-width="3"/>`
/** The same sack knocked over and spilt; (x, y) = bottom middle of the standing sack. Bounds: x from −36 to +56, y from −28 to +6. */
export const sackSpilt = (x: number, y: number) =>
  `<path d="M${x - 34} ${y}Q${x - 36} ${y - 26} ${x - 8} ${y - 26}H${x + 16}Q${x + 20} ${y - 14} ${x + 16} ${y}Z" fill="#c9a66b"/>` +
  `<path d="M${x + 16} ${y - 24}Q${x + 26} ${y - 12} ${x + 16} ${y}" fill="#8a6a3c"/>` +
  grain(x + 34, y - 2, 36)

/** White feather lying at (x, y), tilted. Bounds: x ±14, y ±7. */
export const whiteFeather = (x: number, y: number, angle = -20) =>
  `<g transform="rotate(${angle} ${x} ${y})"><path d="M${x - 14} ${y}Q${x} ${y - 8} ${x + 14} ${y}Q${x} ${y + 6} ${x - 14} ${y}Z" fill="#fff" stroke="#d6d1c8" stroke-width="1"/>` +
  `<path d="M${x - 14} ${y}H${x + 12}" stroke="#c9c4bb" stroke-width="1.2"/></g>`

/** Cloven hoof print; (x, y) = center. Bounds: x ±7, y ±7. */
export const hoof = (x: number, y: number) =>
  `<g fill="#4a3020" fill-opacity="0.85"><path d="M${x - 1} ${y - 7}Q${x - 7} ${y - 5} ${x - 6} ${y + 6}H${x - 1}Z"/><path d="M${x + 1} ${y - 7}Q${x + 7} ${y - 5} ${x + 6} ${y + 6}H${x + 1}Z"/></g>`

/** Head of cabbage; `nibbled` takes bites out of it. (x, y) = bottom middle. Bounds: x ±20, y from −28 to 0. */
export const cabbage = (x: number, y: number, nibbled = false) =>
  `<ellipse cx="${x}" cy="${y - 10}" rx="20" ry="11" fill="#5fae4b"/>` +
  (nibbled
    ? `<rect x="${x - 3}" y="${y - 20}" width="6" height="10" rx="2" fill="#eaf7d0"/><path d="M${x - 12} ${y - 10}l3 -7l3 5l3 -6l3 6l3 -5l3 6l3 -4l2 5Z" fill="#b8e08a"/>`
    : `<circle cx="${x}" cy="${y - 16}" r="12" fill="#b8e08a"/><path d="M${x - 6} ${y - 20}q6 -6 12 0M${x - 4} ${y - 13}q4 -4 8 0" stroke="#7cc25a" stroke-width="1.6" fill="none"/>`)

/** Chicken coop with a sloped roof; (x, y) = top-left of the wall, 200 × 170; the door gap is x+140…x+180, y+100…y+170. */
export const coop = (x: number, y: number) =>
  planks(x, y, 200, 170, '#c98d55', '#a06a38') +
  `<path d="M${x - 18} ${y + 6}L${x + 40} ${y - 50}H${x + 172}L${x + 218} ${y + 6}Z" fill="#b83a2c"/><path d="M${x - 18} ${y + 6}H${x + 218}" stroke="#8a2a20" stroke-width="5"/>` +
  `<rect x="${x + 140}" y="${y + 100}" width="40" height="70" fill="#3b2a1a"/>` +
  `<path d="M${x + 180} ${y + 170}L${x + 230} ${y + 200}" stroke="#a06a38" stroke-width="10" stroke-linecap="round"/><path d="M${x + 192} ${y + 177}l6 -4M${x + 206} ${y + 185}l6 -4M${x + 220} ${y + 193}l6 -4" stroke="#7a4a20" stroke-width="2"/>`
/** The coop door: shut with the latch down, or swung open with the latch up. Bounds: x+138…x+188, y+98…y+172. */
export const coopDoor = (x: number, y: number, open: boolean) =>
  open
    ? `<path d="M${x + 140} ${y + 100}L${x + 152} ${y + 105}V${y + 165}L${x + 140} ${y + 170}Z" fill="#e0b07a" stroke="#a06a38" stroke-width="2"/><path d="M${x + 147} ${y + 130}l-5 -12" stroke="#5e656b" stroke-width="4" stroke-linecap="round"/>`
    : `<rect x="${x + 140}" y="${y + 100}" width="40" height="70" fill="#e0b07a" stroke="#a06a38" stroke-width="2"/><path d="M${x + 142} ${y + 112}L${x + 178} ${y + 158}" stroke="#c98d55" stroke-width="5"/>` +
      `<path d="M${x + 172} ${y + 134}H${x + 186}" stroke="#5e656b" stroke-width="4" stroke-linecap="round"/>`

/** Dog kennel; (x, y) = bottom middle. Bounds: x ±46, y from −84 to 0. */
export const kennel = (x: number, y: number) =>
  `<rect x="${x - 38}" y="${y - 58}" width="76" height="58" fill="#c98d55"/><path d="M${x - 46} ${y - 54}L${x} ${y - 84}L${x + 46} ${y - 54}Z" fill="#7d858c"/>` +
  `<path d="M${x - 16} ${y}V${y - 26}Q${x - 16} ${y - 42} ${x} ${y - 42}Q${x + 16} ${y - 42} ${x + 16} ${y - 26}V${y}Z" fill="#3b2a1a"/>`
