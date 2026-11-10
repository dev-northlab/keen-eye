// Small props of the "detective" scenes, drawn the same in A and B: the scenery of every mode (`decor`) and
// the extra objects of normal mode (`extras`), both listed per level through `levels/extras.ts`, which keeps
// their boxes. Floor and ground things stand on their anchor (bottom middle); wall and sky things are
// centred on it. Every shape is drawn around (0, 0) and moved to its anchor.

const at = (x: number, y: number, body: string) => `<g transform="translate(${x} ${y})">${body}</g>`
const eyes = (x1: number, x2: number, y: number, r = 1.3) => `<circle cx="${x1}" cy="${y}" r="${r}" fill="#2b2b2b"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#2b2b2b"/>`

// ---- Animals

/** Sitting cat, tail curled up at the side. Box: x −11…18, y −37…0. */
export const cat = (x: number, y: number, color = '#f2a65a') =>
  at(
    x,
    y,
    `<path d="M8 -3Q19 -4 16 -16" stroke="${color}" stroke-width="4" stroke-linecap="round" fill="none"/>` +
      `<ellipse cy="-10" rx="10" ry="11" fill="${color}"/><ellipse cy="-7" rx="5" ry="6" fill="#fff" fill-opacity="0.55"/>` +
      `<path d="M-7 -28L-6 -36L-1 -30ZM7 -28L6 -36L1 -30Z" fill="${color}"/><circle cy="-24" r="7.5" fill="${color}"/>` +
      eyes(-2.8, 2.8, -25) +
      `<path d="M-1.4 -21.6h2.8l-1.4 1.6Z" fill="#e58a9a"/>`,
  )

/** Mouse facing right. Box: x −16…14, y −13…0. */
export const mouse = (x: number, y: number, color = '#9aa0a8') =>
  at(
    x,
    y,
    `<path d="M-8 -3Q-14 -1 -15 -8" stroke="${color}" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
      `<ellipse cx="-1" cy="-5" rx="8" ry="5" fill="${color}"/><path d="M4 -9Q13 -6 13 -3Q9 -1 4 -1Z" fill="${color}"/>` +
      `<circle cx="5" cy="-10" r="3" fill="${color}"/><circle cx="5" cy="-10" r="1.6" fill="#f2a7b5"/>` +
      `<circle cx="13" cy="-3" r="1.2" fill="#e58a9a"/><circle cx="8.6" cy="-5.6" r="1" fill="#2b2b2b"/>`,
  )

/** Puppy asleep on its tummy. Box: x −19…21, y −20…0. */
export const puppy = (x: number, y: number, color = '#c98a4b') =>
  at(
    x,
    y,
    `<path d="M-15 -8Q-20 -12 -18 -15" stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none"/>` +
      `<ellipse cx="-2" cy="-7" rx="14" ry="7" fill="${color}"/><ellipse cx="14" cy="-2" rx="5" ry="2.5" fill="${color}"/>` +
      `<circle cx="12" cy="-11" r="7" fill="${color}"/><ellipse cx="17" cy="-9" rx="4" ry="3" fill="#f3d9b8"/><circle cx="20" cy="-10" r="1.4" fill="#2b2b2b"/>` +
      `<ellipse cx="8" cy="-11" rx="3" ry="6" fill="#8a5a2b"/><path d="M11 -13.5q2 1.4 4 0" stroke="#2b2b2b" stroke-width="1.1" fill="none"/>`,
  )

/** Tortoise walking right. Box: x −15…20, y −12…1. */
export const tortoise = (x: number, y: number) =>
  at(
    x,
    y,
    `<g fill="#9bb46a"><ellipse cx="-8" cy="-1" rx="3" ry="2"/><ellipse cx="7" cy="-1" rx="3" ry="2"/><circle cx="15" cy="-5" r="4"/><path d="M-12 -2l-3 1l3 1Z"/></g>` +
      `<path d="M-12 -1A12 11 0 0 1 12 -1Z" fill="#6b8e3a"/><path d="M-6 -1l2 -6h8l2 6M0 -7V-11" stroke="#4e6b2a" stroke-width="1.4" fill="none"/>` +
      `<circle cx="16.5" cy="-6" r="0.9" fill="#2b2b2b"/>`,
  )

/** Sitting fox with a white-tipped tail. Box: x −10…15, y −31…0. */
export const fox = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M6 -2Q16 -2 14 -14Q12 -8 6 -8Z" fill="#e8762c"/><path d="M14 -14Q15 -10 12 -8Q13 -12 14 -14Z" fill="#fff"/>` +
      `<path d="M-8 0Q-10 -14 -4 -20H4Q10 -14 8 0Z" fill="#e8762c"/><path d="M-3 0Q-4 -10 0 -16Q4 -10 3 0Z" fill="#fff"/>` +
      `<path d="M-9 -27L-8 -31L-3 -26ZM9 -27L8 -31L3 -26Z" fill="#c45a1c"/><path d="M-9 -26Q-8 -18 0 -14Q8 -18 9 -26Q0 -30 -9 -26Z" fill="#e8762c"/>` +
      `<path d="M-6 -20Q0 -16 6 -20Q0 -14 0 -14Z" fill="#fff"/>` +
      eyes(-3.5, 3.5, -22, 1.1) +
      `<circle cy="-15" r="1.3" fill="#2b2b2b"/>`,
  )

/** Sparrow hopping on the ground, facing right. Box: x −10…10, y −13…0. */
export const sparrow = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-2 -2V0M2 -2V0" stroke="#d98b3a" stroke-width="1.2"/><path d="M-10 -7L-4 -6L-4 -9Z" fill="#7a5233"/>` +
      `<ellipse cy="-6" rx="7" ry="5" fill="#a8743f"/><ellipse cx="1" cy="-4.5" rx="4.5" ry="2.5" fill="#efe0c8"/>` +
      `<circle cx="5" cy="-9" r="4" fill="#7a5233"/><path d="M8.5 -9.5L10 -8.5L8.5 -7.5Z" fill="#3b2a1a"/><circle cx="6" cy="-10" r="0.9" fill="#fff"/>` +
      `<path d="M-4 -7Q0 -10 3 -6" stroke="#5c3d24" stroke-width="1.4" fill="none"/>`,
  )

/** Crow standing, facing left. Box: x −12…11, y −19…0. */
export const crow = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-2 -4V0M2 -4V0" stroke="#55565e" stroke-width="1.6"/><path d="M5 -9L11 -6L6 -5Z" fill="#26272e"/>` +
      `<ellipse cy="-9" rx="8" ry="6" fill="#26272e"/><circle cx="-5" cy="-14" r="5" fill="#26272e"/>` +
      `<path d="M-9 -15L-12 -13.5L-9 -12.5Z" fill="#55565e"/><circle cx="-6" cy="-15" r="1.1" fill="#fff"/>`,
  )

/** Bullfinch with a red breast. Box: x −10…10, y −15…0. */
export const bullfinch = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-2 -2V0M2 -2V0" stroke="#55565e" stroke-width="1.2"/><path d="M-10 -8L-5 -7L-5 -10Z" fill="#2b2b2b"/>` +
      `<ellipse cy="-7" rx="7" ry="6" fill="#7a8494"/><path d="M-1 -12Q8 -10 6 -3Q2 -1 -2 -3Z" fill="#e5484d"/>` +
      `<circle cx="4" cy="-11" r="4" fill="#e5484d"/><path d="M1 -14Q4 -16 8 -12L2 -11Z" fill="#2b2b2b"/>` +
      `<path d="M8 -11L10 -10L8 -9Z" fill="#2b2b2b"/><circle cx="5" cy="-11.5" r="0.8" fill="#2b2b2b"/>`,
  )

/** Mole peeking out of its molehill. Box: x −15…15, y −16…0. */
export const molehill = (x: number, y: number) =>
  at(
    x,
    y,
    `<ellipse cy="-9" rx="6" ry="6" fill="#3d3a40"/><circle cx="-6" cy="-9" r="2.4" fill="#f2a7b5"/><circle cx="6" cy="-9" r="2.4" fill="#f2a7b5"/>` +
      `<ellipse cy="-6.5" rx="2" ry="1.6" fill="#f08a9a"/>` +
      eyes(-2.4, 2.4, -11, 0.9) +
      `<path d="M-15 0Q-12 -8 -6 -6Q0 -2 6 -6Q12 -8 15 0Z" fill="#7a5233"/><g fill="#5c3d24"><circle cx="-8" cy="-2" r="1.4"/><circle cx="4" cy="-2" r="1.2"/><circle cx="10" cy="-3" r="1"/></g>`,
  )

/** Bat flying, wings spread. Box: x −14…14, y −7…6. */
export const bat = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -3Q-6 -7 -14 -4Q-11 0 -12 4Q-8 1 -6 4Q-4 1 0 3Q4 1 6 4Q8 1 12 4Q11 0 14 -4Q6 -7 0 -3Z" fill="#6c5a8e"/>` +
      `<ellipse cy="0" rx="3.4" ry="4" fill="#6c5a8e"/><path d="M-2.5 -3L-2 -6L-0.6 -3.6ZM2.5 -3L2 -6L0.6 -3.6Z" fill="#6c5a8e"/>` +
      `<circle cx="-1.2" cy="-1" r="0.7" fill="#ffd54a"/><circle cx="1.2" cy="-1" r="0.7" fill="#ffd54a"/>`,
  )

/** Dragonfly with four glassy wings. Box: x −13…13, y −8…9. */
export const dragonfly = (x: number, y: number) =>
  at(
    x,
    y,
    `<g fill="#bfe6ff" fill-opacity="0.85" stroke="#7fb3d5" stroke-width="0.8"><ellipse cx="-6" cy="-5" rx="7" ry="2.4" transform="rotate(-20 -6 -5)"/>` +
      `<ellipse cx="6" cy="-5" rx="7" ry="2.4" transform="rotate(20 6 -5)"/><ellipse cx="-6" cy="-1" rx="6" ry="2" transform="rotate(15 -6 -1)"/>` +
      `<ellipse cx="6" cy="-1" rx="6" ry="2" transform="rotate(-15 6 -1)"/></g>` +
      `<path d="M0 -4V8" stroke="#2a9d8f" stroke-width="2.4" stroke-linecap="round"/><circle cy="-5.5" r="2.4" fill="#2a9d8f"/>`,
  )

/** Firefly glowing in the grass at night. Box: x −6…6, y −6…6. */
export const firefly = (x: number, y: number) =>
  at(x, y, `<circle r="6" fill="#fff59d" fill-opacity="0.35"/><circle r="3" fill="#fff59d"/><circle cx="-1" cy="-2" r="1.6" fill="#3b2a1a"/>`)

/** Owl sitting, big round eyes. Box: x −10…10, y −25…0. */
export const owl = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-7 -20L-8 -25L-3 -21ZM7 -20L8 -25L3 -21Z" fill="#7a5a3a"/><ellipse cy="-11" rx="9" ry="11" fill="#9b7650"/><ellipse cy="-7" rx="5.5" ry="6.5" fill="#e9d6b4"/>` +
      `<path d="M-4 -9q1.4 1 2.8 0M1.2 -6q1.4 1 2.8 0M-3 -4q1.4 1 2.8 0" stroke="#b49470" stroke-width="0.9" fill="none"/>` +
      `<circle cx="-3.6" cy="-16" r="3.6" fill="#fff"/><circle cx="3.6" cy="-16" r="3.6" fill="#fff"/><circle cx="-3.4" cy="-16" r="1.8" fill="#2b2b2b"/><circle cx="3.4" cy="-16" r="1.8" fill="#2b2b2b"/>` +
      `<path d="M-1.3 -13.5H1.3L0 -10.6Z" fill="#f2994a"/><path d="M-4 0V-1.6M-2 0V-1.6M2 0V-1.6M4 0V-1.6" stroke="#f2994a" stroke-width="1.4"/>`,
  )

/** Swallow flying, forked tail. Box: x −14…14, y −7…6. */
export const swallow = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-2 0Q-8 -7 -14 -5Q-8 -3 -4 2ZM2 0Q8 -7 14 -5Q8 -3 4 2Z" fill="#26375a"/><path d="M-1 3L-4 6L0 4L4 6L1 3Z" fill="#26375a"/>` +
      `<ellipse cy="0" rx="3" ry="4" fill="#26375a"/><ellipse cy="1" rx="1.8" ry="2.6" fill="#fff"/><path d="M-1.4 -3.4h2.8" stroke="#e5484d" stroke-width="1.4"/>`,
  )

// ---- Things on the floor

/** Pair of rubber boots. Box: x −13…16, y −24…0. */
export const boots = (x: number, y: number, color = '#f2c14e') =>
  at(
    x,
    y,
    `<g fill="${color}"><path d="M-12 -23H-3V-5H3Q5 -5 5 -2V0H-12Z"/><path d="M1 -21H10V-5H15Q16 -5 16 -2V0H1Z" transform="translate(-1 0)"/></g>` +
      `<path d="M-12 -2H5M0 -2H15" stroke="#3b2a1a" stroke-opacity="0.45" stroke-width="2.2"/>` +
      `<path d="M-12 -20H-3M0 -18H9" stroke="#fff" stroke-opacity="0.5" stroke-width="1.6"/>`,
  )

/** Umbrella stand with two folded umbrellas. Box: x −10…10, y −44…0. */
export const umbrellaStand = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-3 -18L-6 -38" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/><path d="M-6 -38q-1 -5 3 -5t3 3" stroke="#5c3d24" stroke-width="2" fill="none"/>` +
      `<path d="M3 -18L6 -36" stroke="#2f6fb5" stroke-width="5" stroke-linecap="round"/><path d="M6 -36q1 -5 -3 -6" stroke="#5c3d24" stroke-width="2" fill="none"/>` +
      `<path d="M-8 -20H8L7 0H-7Z" fill="#5a6b7c"/><path d="M-8 -20H8" stroke="#7a8b9c" stroke-width="2.4"/>`,
  )

/** Wicker basket with balls of yarn and knitting needles. Box: x −15…16, y −28…0. */
export const yarnBasket = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-6 -16L10 -27M3 -17L15 -25" stroke="#8a8f99" stroke-width="1.6" stroke-linecap="round"/>` +
      `<circle cx="-6" cy="-14" r="6.5" fill="#e5484d"/><circle cx="6" cy="-14" r="6" fill="#4a90d9"/>` +
      `<path d="M-10 -15q4 -3 8 0M3 -16q3 -2 6 0" stroke="#fff" stroke-opacity="0.5" stroke-width="1.2" fill="none"/>` +
      `<path d="M-15 -12H15L12 0H-12Z" fill="#c8955a"/><path d="M-14 -8H14M-13 -4H13" stroke="#a06a38" stroke-width="1.4"/>`,
  )

/** Round ottoman with a button. Box: x −15…15, y −21…0. */
export const pouf = (x: number, y: number, color = '#7b5ea7') =>
  at(
    x,
    y,
    `<rect x="-15" y="-17" width="30" height="17" rx="6" fill="${color}"/><ellipse cy="-16" rx="15" ry="4.5" fill="#fff" fill-opacity="0.25"/>` +
      `<circle cy="-16" r="1.8" fill="#3b2a1a" fill-opacity="0.5"/><path d="M-10 -8V-2M0 -9V-1M10 -8V-2" stroke="#000" stroke-opacity="0.15" stroke-width="1.6"/>`,
  )

/** Teddy bear sitting. Box: x −12…12, y −32…0. */
export const teddy = (x: number, y: number, color = '#b07a4a') =>
  at(
    x,
    y,
    `<g fill="${color}"><circle cx="-6.5" cy="-28" r="3.4"/><circle cx="6.5" cy="-28" r="3.4"/><ellipse cy="-10" rx="9" ry="9.5"/>` +
      `<ellipse cx="-9" cy="-12" rx="3" ry="5"/><ellipse cx="9" cy="-12" rx="3" ry="5"/><circle cy="-23" r="7.5"/>` +
      `<ellipse cx="-6.5" cy="-2.5" rx="4.5" ry="3"/><ellipse cx="6.5" cy="-2.5" rx="4.5" ry="3"/></g>` +
      `<ellipse cy="-20.5" rx="3.6" ry="2.6" fill="#f3d9b8"/><ellipse cy="-9" rx="5" ry="5.5" fill="#f3d9b8"/>` +
      eyes(-2.8, 2.8, -24.5, 1.1) +
      `<circle cy="-21.3" r="1.1" fill="#2b2b2b"/>`,
  )

/** Toy drum with its sticks. Box: x −12…14, y −27…0. */
export const toyDrum = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-11" y="-17" width="22" height="17" rx="2" fill="#e5484d"/><path d="M-11 -14L-5 -3L0 -14L5 -3L11 -14" stroke="#f2c14e" stroke-width="1.6" fill="none"/>` +
      `<ellipse cy="-17" rx="11" ry="3.5" fill="#fff8e7" stroke="#d8c9a8" stroke-width="1"/>` +
      `<path d="M-4 -19L8 -26M2 -19L13 -24" stroke="#a8743f" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="-26" r="1.6" fill="#fff"/><circle cx="13" cy="-24" r="1.6" fill="#fff"/>`,
  )

/** Desk globe on its stand. Box: x −10…13, y −29…1. */
export const globe = (x: number, y: number) =>
  at(
    x,
    y,
    `<ellipse cy="-1.5" rx="8" ry="2.4" fill="#8a5a2b"/><path d="M0 -2V-8" stroke="#8a5a2b" stroke-width="2.4"/>` +
      `<path d="M-9 -12A11 11 0 0 0 9 -28" stroke="#c9953f" stroke-width="1.8" fill="none"/>` +
      `<circle cy="-20" r="9" fill="#4a90d9"/><path d="M-6 -24q3 -3 6 -1t1 4q-3 2 -5 0zM2 -15q3 -2 5 1q-2 3 -5 1z" fill="#7cc25a"/>` +
      `<path d="M-9 -20h18" stroke="#fff" stroke-opacity="0.4" stroke-width="1"/>`,
  )

/** Cactus in a clay pot. Box: x −10…10, y −30…0. */
export const cactus = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-4 -16V-26Q-4 -30 0 -30Q4 -30 4 -26V-12H-4Z" fill="#4c9a52"/><path d="M-4 -16H-7Q-9 -16 -9 -18V-23" stroke="#4c9a52" stroke-width="4" stroke-linecap="round" fill="none"/>` +
      `<path d="M4 -20H7Q9 -20 9 -22V-25" stroke="#4c9a52" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M0 -28V-14" stroke="#3a7a40" stroke-width="1"/>` +
      `<path d="M-8 -12H8L6 0H-6Z" fill="#d9774a"/><rect x="-9" y="-13" width="18" height="3.4" rx="1" fill="#c0603a"/>`,
  )

/** A stack of newspapers tied with string. Box: x −15…15, y −15…0. */
export const newspapers = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-14" y="-5" width="28" height="5" fill="#ece6d6"/><rect x="-15" y="-10" width="28" height="5" fill="#f5f0e2"/><rect x="-13" y="-15" width="28" height="5" fill="#ece6d6"/>` +
      `<path d="M-14 -5H14M-15 -10H13" stroke="#b9b1a0" stroke-width="0.8"/><path d="M-9 -13.5h10M-9 -11.8h7" stroke="#8a8478" stroke-width="0.9"/>` +
      `<path d="M3 -15V0" stroke="#a06a38" stroke-width="1.4"/>`,
  )

/** Doll's house with a red roof. Box: x −16…16, y −34…0. */
export const dollhouse = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-13" y="-20" width="26" height="20" fill="#f7c6d9"/><path d="M-16 -19L0 -34L16 -19Z" fill="#c0392b"/>` +
      `<rect x="-3.5" y="-10" width="7" height="10" fill="#8a5a2b"/><rect x="-10" y="-16" width="5" height="5" fill="#bfe6ff"/><rect x="5" y="-16" width="5" height="5" fill="#bfe6ff"/>` +
      `<circle cy="-25" r="2.6" fill="#bfe6ff"/>`,
  )

/** Round hat box with a ribbon. Box: x −14…14, y −23…0. */
export const hatBox = (x: number, y: number, color = '#4fb3a9') =>
  at(
    x,
    y,
    `<path d="M-13 -16V-2Q0 3 13 -2V-16Z" fill="${color}"/><path d="M-6 -16V0M6 -16V0" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>` +
      `<ellipse cy="-16" rx="14" ry="4" fill="#fff" fill-opacity="0.35"/><ellipse cy="-17" rx="14" ry="4" fill="${color}"/>` +
      `<path d="M0 -18q-6 -6 -6 -1t6 1q6 -6 6 -1t-6 1" fill="#e5484d"/>`,
  )

/** Watering can with its rose to the right. Box: x −15…18, y −22…0. */
export const wateringCan = (x: number, y: number, color = '#4fa3c7') =>
  at(
    x,
    y,
    `<path d="M-6 -16Q-6 -23 0 -23Q6 -23 6 -16" stroke="${color}" stroke-width="2.6" fill="none"/>` +
      `<path d="M-9 -14Q-15 -10 -9 -5" stroke="${color}" stroke-width="2.6" fill="none"/>` +
      `<path d="M6 -8L15 -17" stroke="${color}" stroke-width="3" stroke-linecap="round"/><rect x="13" y="-21" width="5" height="6" rx="1.4" fill="${color}" transform="rotate(-45 15.5 -18)"/>` +
      `<rect x="-9" y="-15" width="17" height="15" rx="2" fill="${color}"/><path d="M-9 -11H8" stroke="#fff" stroke-opacity="0.4" stroke-width="1.6"/>`,
  )

/** Broom standing on its bristles. Box: x −8…8, y −45…0. */
export const broom = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -44V-14" stroke="#a8743f" stroke-width="2.6" stroke-linecap="round"/><path d="M-3 -15H3L8 0H-8Z" fill="#e8c25a"/>` +
      `<path d="M-4 -4L-2 0M0 -6V0M4 -4L2 0" stroke="#c9a33f" stroke-width="1"/><rect x="-4" y="-16" width="8" height="3" rx="1" fill="#c0392b"/>`,
  )

/** Metal bucket with its handle. Box: x −10…10, y −23…0. */
export const bucket = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-9 -15Q-9 -23 0 -23Q9 -23 9 -15" stroke="#6b6f80" stroke-width="1.4" fill="none"/>` +
      `<path d="M-9 -16H9L7 0H-7Z" fill="#a9b4bf"/><ellipse cy="-16" rx="9" ry="2.4" fill="#7a8494"/><path d="M-8.4 -10H8.4M-7.6 -4H7.6" stroke="#8b96a3" stroke-width="1.4"/>`,
  )

/** Fire extinguisher. Box: x −9…8, y −32…0. */
export const fireExtinguisher = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-1 -27H5L7 -30M-3 -26Q-9 -20 -8 -10" stroke="#2b2b2b" stroke-width="1.8" stroke-linecap="round" fill="none"/>` +
      `<rect x="-5" y="-28" width="6" height="4" fill="#3b3b3b"/><rect x="-6" y="-25" width="12" height="25" rx="4" fill="#e5484d"/>` +
      `<rect x="-4" y="-17" width="8" height="7" rx="1" fill="#fff"/><path d="M-2 -14h4" stroke="#e5484d" stroke-width="1.2"/>`,
  )

// ---- Things on the wall

/** Cuckoo clock shaped like a little house, its weights on chains. Box: x −14…14, y −20…28. */
export const cuckooClock = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-4 12V22M4 12V18" stroke="#6b6f80" stroke-width="1"/><ellipse cx="-4" cy="24" rx="2.2" ry="4" fill="#5c3d24"/><ellipse cx="4" cy="20.5" rx="2.2" ry="4" fill="#5c3d24"/>` +
      `<path d="M-10 -6L0 -15L10 -6V12H-10Z" fill="#a8743f"/><path d="M-13 -5L0 -18L13 -5" stroke="#5c3d24" stroke-width="3" stroke-linejoin="round" fill="none"/>` +
      `<rect x="-2.5" y="-10" width="5" height="4" fill="#3b2a1a"/><circle cy="3" r="6" fill="#fffaf0"/>` +
      `<path d="M0 3V-1M0 3h3" stroke="#3b2a1a" stroke-width="1.2" stroke-linecap="round"/>`,
  )

/** Wall calendar with a red top. Box: x −10…10, y −14…13. */
export const calendar = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-10" y="-11" width="20" height="24" rx="1.5" fill="#fff"/><rect x="-10" y="-11" width="20" height="7" rx="1.5" fill="#e5484d"/>` +
      `<path d="M-5 -14v5M5 -14v5" stroke="#6b6f80" stroke-width="1.6" stroke-linecap="round"/>` +
      `<g fill="#9aa0a8">${[0, 1, 2]
        .flatMap((r) => [0, 1, 2, 3].map((c) => `<rect x="${-7.5 + c * 4.2}" y="${-1 + r * 4.2}" width="2.6" height="2.6"/>`))
        .join('')}</g><rect x="1" y="3.2" width="2.6" height="2.6" fill="#e5484d"/>`,
  )

/** Key rack: a little board with keys on hooks. Box: x −14…14, y −6…13. */
export const keyRack = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-14" y="-6" width="28" height="7" rx="2" fill="#a8743f"/>` +
      [-8, 0, 8]
        .map((dx, i) => `<g fill="${['#f2c14e', '#b0b7c0', '#d9774a'][i]}"><circle cx="${dx}" cy="5" r="3"/><rect x="${dx - 0.9}" y="6" width="1.8" height="7"/><rect x="${dx}" y="10" width="2.6" height="1.6"/></g><circle cx="${dx}" cy="5" r="1" fill="#a8743f"/>`)
        .join(''),
  )

/** Round mirror in a golden frame. Box: x −12…12, y −12…12. */
export const roundMirror = (x: number, y: number) =>
  at(x, y, `<circle r="12" fill="#c9953f"/><circle r="9" fill="#d6eef8"/><path d="M-5 -1L1 -6M-3 3L4 -3" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`)

/** Bird cage hanging from a hook, a canary inside; (x, y) = middle of the cage. Box: x −11…11, y −24…14. */
export const birdcage = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -24V-15" stroke="#6b6f80" stroke-width="1.4"/><circle cy="-15" r="2" fill="none" stroke="#c9953f" stroke-width="1.4"/>` +
      `<ellipse cx="1" cy="4" rx="4.5" ry="3.8" fill="#ffd23f"/><circle cx="4" cy="0" r="2.8" fill="#ffd23f"/><path d="M6.5 -0.2l2 1l-2 1Z" fill="#f2994a"/><circle cx="4.6" cy="-0.6" r="0.7" fill="#2b2b2b"/>` +
      `<path d="M-9 11V-2Q-9 -13 0 -13Q9 -13 9 -2V11M-4.5 11V-11M4.5 11V-11M0 11V-13M-9 -1H9" stroke="#c9953f" stroke-width="1.2" fill="none"/>` +
      `<rect x="-11" y="10" width="22" height="4" rx="1.5" fill="#c9953f"/><path d="M-6 6H6" stroke="#a8743f" stroke-width="1.4"/>`,
  )

/** Wall lamp: a bracket and a glowing shade. Box: x −9…9, y −16…8. */
export const sconce = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-3" y="2" width="6" height="6" rx="1.4" fill="#8a5a2b"/><path d="M0 4V-3" stroke="#8a5a2b" stroke-width="2"/>` +
      `<path d="M-9 -3L-6 -16H6L9 -3Z" fill="#ffe0a3"/><path d="M-9 -3H9" stroke="#e8b85a" stroke-width="1.6"/>`,
  )

/** Treasure map pinned to the wall: a dashed route to a cross. Box: x −16…16, y −12…12. */
export const treasureMap = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-16 -10L-5 -12L5 -9L16 -11V10L5 12L-5 9L-16 11Z" fill="#f1dfb0"/><path d="M-5 -12V9M5 -9V12" stroke="#d8c08a" stroke-width="1"/>` +
      `<path d="M-12 6Q-6 -2 0 3T10 -4" stroke="#a06a38" stroke-width="1.4" stroke-dasharray="2 2" fill="none"/>` +
      `<path d="M8 -7l5 5M13 -7l-5 5" stroke="#e5484d" stroke-width="1.8" stroke-linecap="round"/><circle cx="-14" cy="-9" r="1.6" fill="#e5484d"/>`,
  )

/** Dartboard with a dart in it. Box: x −12…15, y −12…12. */
export const dartboard = (x: number, y: number) =>
  at(
    x,
    y,
    `<circle r="12" fill="#2b2b2b"/><circle r="9.5" fill="#f1e6c8"/><circle r="7" fill="#e5484d"/><circle r="4.5" fill="#f1e6c8"/><circle r="2" fill="#4c9a52"/>` +
      `<path d="M2 -2L11 -9" stroke="#6b6f80" stroke-width="1.4"/><path d="M11 -9l4 -1l-2 -2Z" fill="#4a90d9"/>`,
  )

/** Garland of little flags. Box: x −22…22, y −3…12. */
export const bunting = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-22 -2Q0 6 22 -2" stroke="#8a5a2b" stroke-width="1.2" fill="none"/>` +
      [
        [-17, 0.4, '#e5484d'],
        [-8.5, 2.6, '#f2c14e'],
        [0, 3.2, '#4a90d9'],
        [8.5, 2.6, '#7cc25a'],
        [17, 0.4, '#b38cff'],
      ]
        .map(([dx, dy, c]) => `<path d="M${(dx as number) - 3.5} ${dy}H${(dx as number) + 3.5}L${dx} ${(dy as number) + 8.5}Z" fill="${c}"/>`)
        .join(''),
  )

/** Oval portrait of someone's grandpa. Box: x −10…10, y −13…13. */
export const photoOval = (x: number, y: number) =>
  at(
    x,
    y,
    `<ellipse rx="10" ry="13" fill="#5c3d24"/><ellipse rx="7.5" ry="10.5" fill="#efe3c6"/>` +
      `<path d="M-6 9Q-6 2 0 2Q6 2 6 9Q0 11 -6 9Z" fill="#5a6b7c"/><circle cy="-3" r="4" fill="#e8c3a0"/><path d="M-4 -4Q-4 -8 0 -8Q4 -8 4 -4Q2 -6 0 -6Q-2 -6 -4 -4Z" fill="#d6d6d6"/>` +
      `<path d="M-2.4 -0.6q2.4 1.4 4.8 0" stroke="#d6d6d6" stroke-width="1.3" fill="none"/>`,
  )

/** Braid of garlic on a nail. Box: x −7…7, y −6…27. */
export const garlic = (x: number, y: number) =>
  at(
    x,
    y,
    `<circle cy="-4" r="1.8" fill="#6b6f80"/><path d="M0 -4V20" stroke="#c8a96a" stroke-width="2.4"/>` +
      [
        [-2, 4],
        [2, 12],
        [-1, 20],
      ]
        .map(([dx, dy]) => `<path d="M${dx} ${dy - 6}Q${dx + 7} ${dy - 1} ${dx + 5} ${dy + 3}Q${dx} ${dy + 7} ${dx - 5} ${dy + 3}Q${dx - 7} ${dy - 1} ${dx} ${dy - 6}Z" fill="#f5efe2" stroke="#b49ac6" stroke-width="1"/><path d="M${dx} ${dy - 3}V${dy + 5}" stroke="#b49ac6" stroke-width="0.8"/>`)
        .join(''),
  )

/** Frying pan hanging on a hook. Box: x −9…9, y −6…27. */
export const pan = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -6V-2" stroke="#6b6f80" stroke-width="1.6"/><circle cy="0" r="1.6" fill="none" stroke="#6b6f80" stroke-width="1.2"/>` +
      `<rect x="-1.8" y="1" width="3.6" height="10" rx="1.4" fill="#5c3d24"/><circle cy="18.5" r="8.5" fill="#3d4a55"/><circle cy="18.5" r="6" fill="#55626d"/>`,
  )

/** Framed butterfly from a collection. Box: x −12…12, y −10…10. */
export const butterflyFrame = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-12" y="-10" width="24" height="20" rx="1.5" fill="#3b2a1a"/><rect x="-9" y="-7" width="18" height="14" fill="#f5f0e2"/>` +
      `<path d="M0 0Q-8 -8 -7 -2Q-8 4 0 1Q8 4 7 -2Q8 -8 0 0Z" fill="#4a90d9"/><path d="M0 -4V4" stroke="#2b2b2b" stroke-width="1.2"/>`,
  )

/** Antlers on a wooden plaque. Box: x −19…19, y −14…9. */
export const antlers = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-3 -1Q-10 -2 -14 -11M-9 -3L-11 -12M-12 -6L-17 -8M3 -1Q10 -2 14 -11M9 -3L11 -12M12 -6L17 -8" stroke="#e9d9b6" stroke-width="2.4" stroke-linecap="round" fill="none"/>` +
      `<path d="M-6 -2H6L5 6Q0 10 -5 6Z" fill="#8a5a2b"/><path d="M-4 0H4" stroke="#a8743f" stroke-width="1.4"/>`,
  )

/** Spider dangling from its thread; (x, y) = the spider. Box: x −7…7, y −24…6. */
export const spider = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -24V-3" stroke="#9aa0a8" stroke-width="0.8"/>` +
      `<path d="M-2 -1L-7 -5M-2 0L-7 0M-2 1L-6 5M2 -1L7 -5M2 0L7 0M2 1L6 5" stroke="#2b2b2b" stroke-width="1.1" stroke-linecap="round"/>` +
      `<circle cy="-1.5" r="2" fill="#2b2b2b"/><ellipse cy="2" rx="3" ry="3.4" fill="#2b2b2b"/>`,
  )

/** Striped scarf on a wall hook. Box: x −8…8, y −6…25. */
export const scarfHook = (x: number, y: number, color = '#e5484d') =>
  at(
    x,
    y,
    `<rect x="-3" y="-6" width="6" height="5" rx="1.4" fill="#8a5a2b"/>` +
      `<path d="M-4 -2Q0 2 4 -2L7 22H1L0 8L-1 24H-7Z" fill="${color}"/><path d="M-6 16L-1 16M2 14L7 14M-5.5 10L-0.5 10M1.5 9L6 9" stroke="#fff" stroke-opacity="0.7" stroke-width="2"/>` +
      `<path d="M-7 24.5v1M-4 24.5v1M1 22.5v1M4 22.5v1M7 22.5v1" stroke="${color}" stroke-width="1.2"/>`,
  )

/** Old wall telephone with a dial. Box: x −11…10, y −12…12. */
export const wallPhone = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-8" y="-12" width="16" height="24" rx="3" fill="#e05a47"/><circle cy="2" r="5" fill="#fffaf0"/><circle cy="2" r="1.6" fill="#e05a47"/>` +
      `<path d="M-11 -9Q-11 -12 -9 -12V8Q-11 8 -11 5Z" fill="#3b2a1a"/><path d="M-10 8Q-8 14 -4 12" stroke="#3b2a1a" stroke-width="1" fill="none"/>`,
  )

// ---- Things in the yard

/** Garden rake lying on the grass. Box: x −26…22, y −9…0. */
export const rake = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-24 -3H15" stroke="#b5835a" stroke-width="2.6" stroke-linecap="round"/><rect x="14" y="-9" width="4" height="9" rx="1" fill="#7a8494"/>` +
      `<path d="M18 -8h4M18 -5h4M18 -2h4" stroke="#7a8494" stroke-width="1.4"/>`,
  )

/** Spade stuck in a little heap of earth. Box: x −10…10, y −42…1. */
export const shovel = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -38V-14" stroke="#b5835a" stroke-width="3"/><path d="M-5 -40H5" stroke="#5c3d24" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M-5 -15H5V-6Q5 -2 0 0Q-5 -2 -5 -6Z" fill="#a9b4bf"/><path d="M-10 1Q-6 -6 0 -4Q6 -6 10 1Z" fill="#7a5233"/>`,
  )

/** Snow shovel stuck in the snow. Box: x −10…10, y −40…1. */
export const snowShovel = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -36V-14" stroke="#5a6b7c" stroke-width="3"/><path d="M-5 -38H5" stroke="#2b2b2b" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M-9 -15H9V-3H-9Z" fill="#2f6fb5"/><path d="M-9 -11H9" stroke="#fff" stroke-opacity="0.35" stroke-width="1.6"/><path d="M-10 1Q0 -5 10 1Z" fill="#fff" stroke="#c7d6e6" stroke-width="1"/>`,
  )

/** Wheelbarrow, handles to the left. Box: x −26…14, y −18…0. */
export const wheelbarrow = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-14 -12L-25 -15M-12 -8L-10 0" stroke="#5c3d24" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M-20 -17H12L6 -7H-14Z" fill="#4c9a52"/><circle cx="7" cy="-5" r="5" fill="#2b2b2b"/><circle cx="7" cy="-5" r="1.8" fill="#a9b4bf"/>`,
  )

/** Birdhouse on a pole. Box: x −11…11, y −43…0. */
export const birdhouse = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-1.5" y="-24" width="3" height="24" fill="#8a5a2b"/><rect x="-8" y="-35" width="16" height="13" fill="#d9a35a"/>` +
      `<path d="M-11 -34L0 -43L11 -34Z" fill="#c0392b"/><circle cy="-29" r="2.8" fill="#3b2a1a"/><path d="M-2 -25H2" stroke="#8a5a2b" stroke-width="1.6"/>`,
  )

/** Letter box on a post, its flag up. Box: x −10…13, y −35…0. */
export const mailbox = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-2" y="-21" width="4" height="21" fill="#8a5a2b"/><path d="M-9 -21V-29Q-9 -35 0 -35Q9 -35 9 -29V-21Z" fill="#2f6fb5"/>` +
      `<path d="M9 -27V-34H13V-31H9" fill="#e5484d" stroke="#e5484d" stroke-width="1"/><path d="M-6 -28H4" stroke="#fff" stroke-opacity="0.5" stroke-width="1.4"/>`,
  )

/** Garden gnome with a red cap. Box: x −8…8, y −25…0. */
export const gnome = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-8 0L-6 -12H6L8 0Z" fill="#2f6fb5"/><rect x="-7" y="-2" width="14" height="2" fill="#5c3d24"/><circle cy="-14" r="4.5" fill="#f3c9a8"/>` +
      `<path d="M-5 -13Q0 -2 5 -13Q0 -10 -5 -13Z" fill="#fff"/><path d="M-6 -16Q0 -34 6 -16Z" fill="#e5484d"/><circle cy="-13" r="1.3" fill="#e58a7a"/>`,
  )

/** Straw beehive (a skep) on a stand. Box: x −13…13, y −25…0. */
export const beehive = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-13" y="-4" width="26" height="4" fill="#8a5a2b"/><path d="M-11 -4Q-12 -24 0 -25Q12 -24 11 -4Z" fill="#e8b84a"/>` +
      `<path d="M-11 -9H11M-11.5 -14H11.5M-9.5 -19H9.5" stroke="#c8952f" stroke-width="1.4"/><ellipse cy="-7" rx="2.6" ry="2" fill="#3b2a1a"/>`,
  )

/** Hay bale tied with string. Box: x −15…15, y −17…0. */
export const haybale = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="-15" y="-17" width="30" height="17" rx="3" fill="#e8c25a"/><path d="M-12 -12h7M-2 -8h9M-11 -4h6M4 -14h7" stroke="#c9a33f" stroke-width="1.2"/>` +
      `<path d="M-6 -17V0M6 -17V0" stroke="#a06a38" stroke-width="1.6"/>`,
  )

/** Clay pot of daisies. Box: x −11…11, y −26…0. */
export const flowerPot = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -10L-6 -20M0 -10V-23M0 -10L6 -19" stroke="#4c9a52" stroke-width="1.6"/>` +
      [
        [-6, -20],
        [0, -23],
        [6, -19],
      ]
        .map(([fx, fy]) => `<circle cx="${fx}" cy="${fy}" r="3.4" fill="#fff"/><circle cx="${fx}" cy="${fy}" r="1.4" fill="#f2c14e"/>`)
        .join('') +
      `<path d="M-8 -10H8L6 0H-6Z" fill="#d9774a"/><rect x="-9" y="-11" width="18" height="3" rx="1" fill="#c0603a"/>`,
  )

/** Small cottage with a chimney, seen far off. Box: x −18…18, y −32…0. */
export const cottage = (x: number, y: number) =>
  at(
    x,
    y,
    `<rect x="7" y="-31" width="5" height="10" fill="#8a5a2b"/><rect x="-14" y="-16" width="28" height="16" fill="#f3e3c3"/>` +
      `<path d="M-18 -15L-10 -27H10L18 -15Z" fill="#a0522d"/><rect x="-10" y="-10" width="6" height="10" fill="#8a5a2b"/>` +
      `<rect x="2" y="-11" width="8" height="6" fill="#ffe08a"/><path d="M6 -11v6M2 -8h8" stroke="#fff" stroke-width="1"/>`,
  )

/** Windmill with four sails. Box: x −12…13, y −46…0. */
export const windmill = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-8 0L-5 -30H5L8 0Z" fill="#efe3c6"/><path d="M-6 -30Q0 -38 6 -30Z" fill="#a0522d"/><path d="M-2.5 0V-7Q0 -10 2.5 -7V0Z" fill="#8a5a2b"/>` +
      `<g stroke="#8a5a2b" stroke-width="1.6"><path d="M0 -34L-9 -45M0 -34L10 -44M0 -34L-10 -24M0 -34L9 -23"/></g>` +
      `<g fill="#fff" fill-opacity="0.85"><path d="M-3 -38L-9 -45L-12 -42L-6 -35Z"/><path d="M3 -38L10 -44L13 -41L6 -35Z"/><path d="M-4 -31L-10 -24L-7 -21L-1 -29Z"/><path d="M4 -31L9 -23L12 -26L6 -33Z"/></g>` +
      `<circle cy="-34" r="2" fill="#5c3d24"/>`,
  )

/** Camping tent. Box: x −19…19, y −25…0. */
export const tent = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M0 -25V-21" stroke="#5c3d24" stroke-width="1.6"/><path d="M-19 0L0 -22L19 0Z" fill="#f2994a"/>` +
      `<path d="M0 -22L-6 0H6Z" fill="#c0603a"/><path d="M0 -22L3 0" stroke="#f2994a" stroke-width="1.2"/>`,
  )

/** Park bench. Box: x −21…21, y −24…0. */
export const bench = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-16 -10V0M16 -10V0M-14 -12V-23M14 -12V-23" stroke="#3d4a55" stroke-width="2.4"/>` +
      `<rect x="-21" y="-13" width="42" height="4" rx="1.5" fill="#4c9a52"/><rect x="-19" y="-24" width="38" height="4" rx="1.5" fill="#4c9a52"/><rect x="-19" y="-18.5" width="38" height="3.6" rx="1.5" fill="#4c9a52"/>`,
  )

/** Kick scooter. Box: x −14…16, y −29…0. */
export const scooter = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M8 -5L11 -27M7 -28H15" stroke="#3d4a55" stroke-width="2.2" stroke-linecap="round"/><rect x="-13" y="-7" width="21" height="3.4" rx="1.6" fill="#e5484d"/>` +
      `<circle cx="-11" cy="-3" r="3" fill="#2b2b2b"/><circle cx="9" cy="-3" r="3" fill="#2b2b2b"/>`,
  )

// ---- Things in the snow

/** Wooden sled. Box: x −19…20, y −12…0. */
export const sled = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-17 -2H14Q20 -2 18 -9" stroke="#5a6b7c" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M-12 -2V-7M8 -2V-7" stroke="#5a6b7c" stroke-width="2"/>` +
      `<rect x="-19" y="-12" width="30" height="5" rx="1.5" fill="#c0392b"/><path d="M-12 -12V-7M-4 -12V-7M4 -12V-7" stroke="#8e2a20" stroke-width="1.2"/>`,
  )

/** Pair of ice skates tied together. Box: x −15…16, y −16…0. */
export const iceSkates = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-1 -14Q2 -18 5 -14" stroke="#e5484d" stroke-width="1.2" fill="none"/>` +
      [
        [-8, '#fff'],
        [8, '#f3e9e2'],
      ]
        .map(
          ([dx, c]) =>
            `<path d="M${(dx as number) - 6} -14H${(dx as number) + 1}V-8H${(dx as number) + 7}Q${(dx as number) + 8} -5 ${(dx as number) + 6} -4H${(dx as number) - 6}Z" fill="${c}" stroke="#9aa0a8" stroke-width="1"/>` +
            `<path d="M${(dx as number) - 7} -1H${(dx as number) + 8}M${(dx as number) - 4} -4V-1M${(dx as number) + 4} -4V-1" stroke="#7a8494" stroke-width="1.4"/>`,
        )
        .join(''),
  )

/** Pile of snowballs. Box: x −13…13, y −17…0. */
export const snowballs = (x: number, y: number) =>
  at(
    x,
    y,
    `<g fill="#fff" stroke="#9fb4cc" stroke-width="1.2">${[
      [-7, -5],
      [0, -5],
      [7, -5],
      [-3.5, -11],
      [3.5, -11],
    ]
      .map(([bx, by]) => `<circle cx="${bx}" cy="${by}" r="4.6"/>`)
      .join('')}</g>`,
  )

/** Pair of red mittens. Box: x −14…14, y −14…0. */
export const mittens = (x: number, y: number) =>
  at(
    x,
    y,
    [-6, 7]
      .map(
        (dx) =>
          `<path d="M${dx - 5} -1V-9Q${dx - 5} -14 ${dx} -14Q${dx + 5} -14 ${dx + 5} -9V-1Z" fill="#e5484d"/><ellipse cx="${dx + 6}" cy="-7" rx="2.4" ry="3.4" fill="#e5484d"/>` +
          `<rect x="${dx - 6}" y="-3" width="12" height="3.4" rx="1" fill="#fff" stroke="#d6dbe3" stroke-width="0.8"/>`,
      )
      .join(''),
  )

// ---- Things in the sky

/** Kite with a bow tail; (x, y) = middle of the kite. Box: x −11…11, y −14…29. */
export const kite = (x: number, y: number, color = '#e5484d') =>
  at(
    x,
    y,
    `<path d="M0 14Q-6 20 0 24T2 29" stroke="#6b6f80" stroke-width="1" fill="none"/><path d="M-3 19l3 1l-3 1ZM3 25l-3 1l3 1Z" fill="#f2c14e"/>` +
      `<path d="M0 -14L11 -2L0 14L-11 -2Z" fill="${color}"/><path d="M0 -14L0 14L-11 -2Z" fill="#fff" fill-opacity="0.3"/><path d="M0 -14V14M-11 -2H11" stroke="#8a5a2b" stroke-width="1"/>`,
  )

/** Hot air balloon. Box: x −13…13, y −21…17. */
export const hotAirBalloon = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-5 7L-4 12M5 7L4 12" stroke="#6b6f80" stroke-width="1"/><rect x="-4.5" y="11" width="9" height="6" rx="1" fill="#a06a38"/>` +
      `<path d="M-6 8Q-13 2 -13 -8Q-13 -21 0 -21Q13 -21 13 -8Q13 2 6 8Z" fill="#f2c14e"/>` +
      `<path d="M-2 8Q-7 -2 -5 -21H5Q7 -2 2 8Z" fill="#e5484d"/><path d="M-12 -8H12" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>`,
  )

/** Paper plane. Box: x −13…13, y −7…7. */
export const paperPlane = (x: number, y: number) =>
  at(x, y, `<path d="M-13 -1L13 -7L-5 7L-4 1Z" fill="#fff" stroke="#9aa0a8" stroke-width="1" stroke-linejoin="round"/><path d="M-4 1L13 -7" stroke="#9aa0a8" stroke-width="1"/>`)

/** Airship with a gondola. Box: x −23…22, y −8…11. */
export const airship = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-17 -1L-23 -7V5Z" fill="#c0392b"/><ellipse cx="0" cy="-1" rx="20" ry="7" fill="#c7cfd8"/><path d="M-18 -1H18" stroke="#9aa5b1" stroke-width="1"/>` +
      `<path d="M-4 6L-3 8M4 6L3 8" stroke="#6b6f80" stroke-width="1"/><rect x="-5" y="7" width="10" height="4" rx="1.5" fill="#5a6b7c"/>`,
  )

/** Small propeller plane flying right. Box: x −16…16, y −9…6. */
export const plane = (x: number, y: number) =>
  at(
    x,
    y,
    `<path d="M-14 -1L-16 -9H-12L-8 -3Z" fill="#e5484d"/><path d="M-14 -3H10Q15 -3 15 0Q15 3 10 3H-12Z" fill="#fff" stroke="#c7cfd8" stroke-width="0.8"/>` +
      `<path d="M-4 -1L4 6H7L3 -1Z" fill="#e5484d"/><path d="M15.5 -4V4" stroke="#6b6f80" stroke-width="1.2"/>` +
      `<circle cx="6" cy="-1" r="1.2" fill="#4a90d9"/><circle cx="2" cy="-1" r="1.2" fill="#4a90d9"/>`,
  )

/** Paper sky lantern glowing as it floats up. Box: x −10…10, y −13…12. */
export const skyLantern = (x: number, y: number) =>
  at(
    x,
    y,
    `<circle cy="0" r="10" fill="#ffd54a" fill-opacity="0.3"/><path d="M-6 -12H6L7 8H-7Z" fill="#ff9f43"/><path d="M-6 -12H6L5 -9H-5Z" fill="#ffb86b"/>` +
      `<ellipse cy="8" rx="7" ry="1.6" fill="#e07b1f"/><circle cy="10" r="1.6" fill="#fff59d"/>`,
  )
