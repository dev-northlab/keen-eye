// Alpaca ranch: the farm's hardest scene, after its harder ten (hidden until released, levels/upcoming.ts).
// New on the farm: alpacas, a donkey with its cart, a pickup truck, a dovecote, a wind pump, a greenhouse,
// a tool shed and a turkey. Motion differences: the wind pump's wheel turns only on picture A; the donkey
// swishes its tail and the shed's weathervane swings only on B.
import { butterfly } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { basket, chick, cloud, fence, flower, FLOWER_COLORS, hen, milkCan, pick, pumpkin, sun, sunflower, wheelbarrow } from '../shapes.ts'

/** Alpaca, faces right (left with `flip`); (x, y) = feet center. Bounds: x from −37 to +43, y from −114 to 0. */
const alpaca = (x: number, y: number, flip: boolean, wool: string, shade: string) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<g fill="${shade}"><rect x="-22" y="-32" width="7" height="32" rx="3"/><rect x="-11" y="-32" width="7" height="32" rx="3"/>` +
  `<rect x="9" y="-32" width="7" height="32" rx="3"/><rect x="19" y="-32" width="7" height="32" rx="3"/></g>` +
  `<g fill="${wool}"><circle cx="-30" cy="-46" r="7"/><ellipse cy="-40" rx="30" ry="18"/>` +
  `<circle cx="-18" cy="-54" r="8"/><circle cx="-4" cy="-57" r="9"/><circle cx="10" cy="-55" r="8"/>` +
  `<path d="M14 -48L18 -92H32L30 -44Z"/><ellipse cx="28" cy="-96" rx="11" ry="9"/></g>` +
  `<ellipse cx="37" cy="-92" rx="6" ry="5" fill="${shade}"/>` +
  `<path d="M20 -103l-2 -10l6 6ZM29 -104l1 -10l4 8Z" fill="${shade}"/>` +
  `<circle cx="24" cy="-104" r="6" fill="${wool}"/><circle cx="31" cy="-98" r="1.8" fill="#222"/></g>`

/** Red halter on the snout of an alpaca facing right at (x, y). Bounds: x from +20 to +44, y from −100 to −85. */
const halter = (x: number, y: number) =>
  `<ellipse cx="${x + 36}" cy="${y - 92}" rx="7" ry="6" fill="none" stroke="#e63946" stroke-width="2.5"/>` +
  `<path d="M${x + 29} ${y - 93}L${x + 21} ${y - 99}" stroke="#e63946" stroke-width="2.5" stroke-linecap="round"/>`

/** Donkey without its tail (`donkeyTail`), faces right; (x, y) = feet center. Bounds: x from −34 to +65, y from −108 to 0. */
const donkey = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<g fill="#7d7a78"><rect x="-26" y="-34" width="8" height="34" rx="3"/><rect x="-14" y="-34" width="8" height="34" rx="3"/>` +
  `<rect x="12" y="-34" width="8" height="34" rx="3"/><rect x="23" y="-34" width="8" height="34" rx="3"/></g>` +
  `<g fill="#4a4644"><rect x="-26" y="-5" width="8" height="5"/><rect x="-14" y="-5" width="8" height="5"/>` +
  `<rect x="12" y="-5" width="8" height="5"/><rect x="23" y="-5" width="8" height="5"/></g>` +
  `<ellipse cy="-42" rx="34" ry="18" fill="#9a9692"/><ellipse cy="-33" rx="24" ry="7" fill="#c9c5c0"/>` +
  `<path d="M20 -52L34 -84L48 -76L34 -40Z" fill="#9a9692"/><path d="M22 -54L36 -86" stroke="#4a4644" stroke-width="4" stroke-linecap="round"/>` +
  `<ellipse cx="36" cy="-96" rx="3.5" ry="11" fill="#8a8682" transform="rotate(-15 36 -96)"/>` +
  `<ellipse cx="43" cy="-96" rx="3.5" ry="11" fill="#8a8682" transform="rotate(12 43 -96)"/>` +
  `<ellipse cx="50" cy="-74" rx="15" ry="9" fill="#9a9692" transform="rotate(35 50 -74)"/>` +
  `<ellipse cx="58" cy="-66" rx="7" ry="6" fill="#e8e4df"/><circle cx="45" cy="-80" r="1.8" fill="#222"/>` +
  `<path d="M24 -48q10 10 4 22" stroke="#c0392b" stroke-width="3" fill="none"/></g>`

/** The donkey's tail, from its rump at (x − 33, y − 46) for a donkey at (x, y). Bounds: x from −43 to −30, y from −46 to −14. */
const donkeyTail = (x: number, y: number) =>
  `<path d="M${x - 33} ${y - 46}q-8 10 -6 24" stroke="#7d7a78" stroke-width="3.5" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="${x - 39}" cy="${y - 20}" rx="4" ry="6" fill="#4a4644"/>`

/** Cart wheel with `pairs` spoke pairs; (x, y) = hub. Bounds: radius 22. */
const wheel = (x: number, y: number, pairs: number) => {
  let spokes = ''
  for (let i = 0; i < pairs; i++) {
    const a = (Math.PI * i) / pairs
    const dx = (18 * Math.cos(a)).toFixed(1)
    const dy = (18 * Math.sin(a)).toFixed(1)
    spokes += `<path d="M${x} ${y}l${dx} ${dy}M${x} ${y}l${-dx} ${-dy}" stroke="#7a5230" stroke-width="3"/>`
  }
  return spokes + `<circle cx="${x}" cy="${y}" r="19" fill="none" stroke="#5a3d1e" stroke-width="5"/><circle cx="${x}" cy="${y}" r="5" fill="#5a3d1e"/>`
}

/** Pickup truck without its side mirror, faces right; (x, y) = ground under the bed's back. Bounds: x from −4 to +214, y from −88 to 0. */
const pickup = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-4" y="-28" width="218" height="6" fill="#555"/>` +
  `<rect x="0" y="-58" width="110" height="34" rx="3" fill="${color}"/><path d="M4 -48H106" stroke="#1f6f66" stroke-width="2"/>` +
  `<path d="M110 -24V-58L122 -88H168L180 -58V-24Z" fill="${color}"/><path d="M120 -60L129 -82H162L172 -60Z" fill="#bde3f2"/>` +
  `<path d="M142 -58V-28" stroke="#1f6f66" stroke-width="2"/><rect x="146" y="-52" width="10" height="3" rx="1.5" fill="#1f6f66"/>` +
  `<rect x="176" y="-58" width="34" height="34" rx="6" fill="${color}"/><circle cx="206" cy="-48" r="4" fill="#fff3b0"/>` +
  `<rect x="200" y="-34" width="14" height="8" rx="2" fill="#8d99ae"/>` +
  `<circle cx="36" cy="-18" r="17" fill="#2b2b2b"/><circle cx="36" cy="-18" r="7" fill="#c9d1d9"/>` +
  `<circle cx="170" cy="-18" r="17" fill="#2b2b2b"/><circle cx="170" cy="-18" r="7" fill="#c9d1d9"/></g>`

/** Wooden crate; (x, y) = top left, w wide. Bounds: x from 0 to w, y from 0 to +20. */
const crate = (x: number, y: number, w: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="20" fill="#c68b4e"/>` +
  `<path d="M${x} ${y + 7}H${x + w}M${x} ${y + 14}H${x + w}" stroke="#9c6a37" stroke-width="2"/>`

/** A heap of round fruit or vegetables on a crate's top edge at (x, y), `w` wide. Bounds: x from −1 to w+1, y from −11 to +6. */
const heap = (x: number, y: number, w: number, color: string, r = 6) => {
  let s = ''
  for (let cx = x + r; cx <= x + w - r; cx += r * 1.6) s += `<circle cx="${cx}" cy="${y + 2}" r="${r}" fill="${color}"/>`
  for (let cx = x + r * 1.8; cx <= x + w - r * 1.8; cx += r * 1.6) s += `<circle cx="${cx}" cy="${y - 4}" r="${r}" fill="${color}"/>`
  return s
}

/** Dove, faces right; (x, y) = feet. Bounds: x from −13 to +12, y from −15 to 0. */
const dove = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -5L-13 -2L-11 -8Z" fill="#c9d1d9"/><ellipse cy="-6" rx="8" ry="5" fill="#f4f6f8"/>` +
  `<circle cx="6" cy="-11" r="4" fill="#f4f6f8"/><path d="M10 -11l2 1l-2 1Z" fill="#ff9f1c"/><circle cx="7" cy="-12" r="1" fill="#222"/></g>`

/** Dovecote on a pole; (x, y) = pole foot. Bounds: x ±30, y from −162 to 0. */
const dovecote = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 112}" width="6" height="112" fill="#8a5a33"/>` +
  `<rect x="${x - 24}" y="${y - 140}" width="48" height="30" fill="#f4f1e8"/><path d="M${x - 30} ${y - 140}L${x} ${y - 162}L${x + 30} ${y - 140}Z" fill="#3a86ff"/>` +
  `<path d="M${x - 17} ${y - 118}v-8a5 5 0 0 1 10 0v8ZM${x + 7} ${y - 118}v-8a5 5 0 0 1 10 0v8Z" fill="#3b2a1a"/>` +
  `<rect x="${x - 27}" y="${y - 112}" width="54" height="4" fill="#8a5a33"/>`

/** The wind pump's wheel; (x, y) = hub. Bounds: radius 22. */
const pumpWheel = (x: number, y: number) => {
  let blades = ''
  for (let a = 0; a < 360; a += 45) blades += `<path d="M2 -3L20 -6V6L2 3Z" transform="rotate(${a})"/>`
  return `<g transform="translate(${x} ${y})" fill="#e9edf2" stroke="#8d99ae" stroke-width="1">${blades}<circle r="4" fill="#5c677d"/></g>`
}

/** The wind pump's tower and tail vane, the wheel's hub at (x, y − 160); (x, y) = ground. Bounds: x from −16 to +40, y from −172 to 0. */
const pumpTower = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}L${x - 3} ${y - 150}M${x + 16} ${y}L${x + 3} ${y - 150}" stroke="#6c757d" stroke-width="4"/>` +
  `<path d="M${x - 12} ${y - 40}L${x + 9} ${y - 90}M${x + 12} ${y - 40}L${x - 9} ${y - 90}M${x - 13} ${y - 40}H${x + 13}M${x - 9} ${y - 90}H${x + 9}" stroke="#6c757d" stroke-width="2"/>` +
  `<rect x="${x - 6}" y="${y - 154}" width="12" height="6" fill="#5c677d"/>` +
  `<path d="M${x} ${y - 160}H${x + 30}" stroke="#5c677d" stroke-width="3"/><path d="M${x + 26} ${y - 172}H${x + 40}V${y - 148}Z" fill="#e05a47"/>` +
  `<rect x="${x - 10}" y="${y - 14}" width="20" height="14" fill="#8d99ae"/>`

/** Tomato plant on a stake; (x, y) = foot. Bounds: x ±10, y from −64 to 0. */
const tomatoPlant = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 64}" stroke="#8a5a33" stroke-width="2"/>` +
  `<g fill="#4c9a3f"><ellipse cx="${x - 6}" cy="${y - 50}" rx="6" ry="4"/><ellipse cx="${x + 6}" cy="${y - 40}" rx="6" ry="4"/>` +
  `<ellipse cx="${x - 6}" cy="${y - 28}" rx="6" ry="4"/><ellipse cx="${x + 6}" cy="${y - 14}" rx="6" ry="4"/><ellipse cx="${x - 2}" cy="${y - 60}" rx="5" ry="4"/></g>`

/** Three tomatoes; (x, y) = cluster center. Bounds: x ±9, y ±9. */
const tomatoes = (x: number, y: number, color: string) =>
  `<g fill="${color}"><circle cx="${x - 4}" cy="${y - 4}" r="4.5"/><circle cx="${x + 4}" cy="${y - 1}" r="4.5"/><circle cx="${x - 1}" cy="${y + 5}" r="4.5"/></g>`

/** Hand saw hanging on a nail, handle right; (x, y) = center. Bounds: x from −18 to +18, y from −8 to +10. */
const saw = (x: number, y: number) => {
  let teeth = ''
  for (let tx = x - 18; tx < x + 6; tx += 4) teeth += `l2 3l2 -3`
  return (
    `<circle cx="${x - 4}" cy="${y - 6}" r="2" fill="#555"/>` +
    `<path d="M${x - 18} ${y - 4}L${x + 8} ${y - 6}V${y + 6}H${x - 18}Z" fill="#c9d1d9"/>` +
    `<path d="M${x - 18} ${y + 6}${teeth}" fill="#c9d1d9" stroke="#8d99ae" stroke-width="1"/>` +
    `<rect x="${x + 7}" y="${y - 8}" width="11" height="16" rx="4" fill="#8a4a24"/><rect x="${x + 10}" y="${y - 3}" width="5" height="6" rx="2" fill="#c96a3a"/>`
  )
}

/** Weathervane arrow pointing right; (x, y) = pivot. Bounds: x from −18 to +16, y ±5. */
const vaneArrow = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}H${x + 12}" stroke="#333" stroke-width="2.5"/><path d="M${x + 16} ${y}l-7 -5v10Z" fill="#333"/>` +
  `<path d="M${x - 14} ${y}l-4 -5h4l3 5l-3 5h-4Z" fill="#333"/><circle cx="${x}" cy="${y}" r="3" fill="#ffd23f"/>`

/** Turkey, faces right; (x, y) = feet. Bounds: x from −34 to +22, y from −64 to 0. */
const turkey = (x: number, y: number) => {
  const colors = ['#8a5a33', '#c68b4e', '#5e3b1a', '#c68b4e', '#8a5a33', '#c68b4e', '#5e3b1a']
  let fan = ''
  colors.forEach((c, i) => {
    fan += `<ellipse cx="-6" cy="-50" rx="7" ry="16" fill="${c}" transform="rotate(${-75 + i * 22} -6 -28)"/>`
  })
  return (
    `<g transform="translate(${x} ${y})">${fan}` +
    `<path d="M-4 -10V0M6 -10V0" stroke="#ff9f1c" stroke-width="3"/>` +
    `<ellipse cx="0" cy="-22" rx="16" ry="14" fill="#6b4226"/>` +
    `<path d="M8 -30Q14 -38 14 -44" stroke="#6b4226" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<circle cx="15" cy="-45" r="5" fill="#a7c4d6"/><path d="M19 -46l4 2l-4 2Z" fill="#ffb703"/>` +
    `<path d="M16 -42q2 6 -1 9" stroke="#e63946" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="16" cy="-47" r="1.2" fill="#222"/></g>`
  )
}

/** Sheepdog lying down, faces left; (x, y) = ground under the middle. Bounds: x from −36 to +32, y from −26 to 0. */
const sheepdog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M22 -8q10 -2 10 -12" stroke="#2b2b2b" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="25" ry="9" fill="#2b2b2b"/><ellipse cx="-6" cy="-5" rx="12" ry="5" fill="#f4f1e8"/>` +
  `<circle cx="-24" cy="-14" r="9" fill="#2b2b2b"/><ellipse cx="-31" cy="-11" rx="6" ry="4" fill="#f4f1e8"/>` +
  `<path d="M-20 -21l4 -5l1 7Z" fill="#2b2b2b"/><circle cx="-36" cy="-12" r="2" fill="#222"/><circle cx="-26" cy="-16" r="1.4" fill="#fff"/>` +
  `<path d="M-30 -2h12" stroke="#f4f1e8" stroke-width="4" stroke-linecap="round"/></g>`

/** Little round tree far away; (x, y) = trunk foot. Bounds: x ±16, y from −40 to 0. */
const farTree = (x: number, y: number) =>
  `<rect x="${x - 2}" y="${y - 14}" width="4" height="14" fill="#7a5230"/><circle cx="${x}" cy="${y - 25}" r="15" fill="#6aaf55"/>`

export default svgLevel({
  id: 151,
  chapter: 'farm',
  title: 'alpacaRanch',
  parTimeSec: 75,
  scene: ({ diff, anim, rand, extra }) => {
    // Zone centers, so the grass keeps clear of them.
    const zones = [[65, 94], [160, 140], [245, 130], [344, 262], [552, 262], [617, 258], [755, 270], [121, 340], [360, 438], [443, 424], [525, 170]]
    let grass = ''
    for (let i = 0; i < 40; i++) {
      const x = rand() * 790 + 5
      const y = 380 + rand() * 115
      if (zones.every(([zx, zy]) => Math.hypot(x - zx, y - zy) > 40))
        grass += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l3 -10l3 10l3 -12l3 12" fill="#6fbf4f"/>`
    }
    let flowers = ''
    for (const x of [14, 34, 268, 286, 560]) flowers += flower(x, x > 400 ? 336 : 376, pick(rand, FLOWER_COLORS))
    const wheelTurning = anim({ type: 'rotate', pivot: [160, 140], period: 3 }, pumpWheel(160, 140))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` + sun(720, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 26 }, cloud(330, 60, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 30 }, cloud(560, 92, 0.55)) +
      `<path d="M0 250Q120 200 260 240T520 230T800 236V300H0Z" fill="#a6d98a"/>` +
      `<path d="M0 282Q200 252 400 276T800 270V300H0Z" fill="#93cc72"/>` +
      farTree(118, 300) + farTree(200, 302) + farTree(276, 300) +
      `<rect y="300" width="800" height="200" fill="#8bd36a"/>` +
      `<path d="M560 300Q600 360 520 500H700Q720 380 680 300Z" fill="#d9b98a"/>` + grass +
      // Silo with its roof vent
      `<rect x="30" y="130" width="70" height="170" fill="#c9d1d9"/><path d="M30 170H100M30 210H100M30 250H100" stroke="#a7b1bc" stroke-width="3"/>` +
      `<path d="M88 130V300M96 130V300M88 150H96M88 175H96M88 200H96M88 225H96M88 250H96M88 275H96" stroke="#6c757d" stroke-width="2"/>` +
      diff(65, 94, 22, `<rect x="61" y="90" width="8" height="14" fill="#8d99ae"/><path d="M57 92L65 84L73 92Z" fill="#5c677d"/>`, '') +
      `<path d="M30 130A35 28 0 0 1 100 130Z" fill="#e05a47"/>` +
      // Wind pump
      pumpTower(160, 300) + diff(160, 140, 24, wheelTurning, pumpWheel(160, 140)) +
      // Dovecote with its doves
      dovecote(245, 300) + dove(230, 188) + dove(258, 188) + diff(245, 130, 22, dove(245, 138), '') +
      // Greenhouse with tomatoes
      `<rect x="290" y="212" width="170" height="88" fill="#dff3f7"/>` +
      tomatoPlant(312, 300) + tomatoPlant(344, 300) + tomatoPlant(406, 300) + tomatoPlant(438, 300) +
      tomatoes(316, 276, '#e63946') + tomatoes(408, 262, '#e63946') + tomatoes(436, 280, '#e63946') + tomatoes(440, 252, '#e63946') +
      diff(344, 262, 22, tomatoes(344, 262, '#e63946'), tomatoes(344, 262, '#a7c957')) +
      `<rect x="362" y="252" width="26" height="48" fill="#cfe9ef" stroke="#9fb8c0" stroke-width="2"/>` +
      `<path d="M332 214V300M375 214V252M418 214V300M290 250H362M388 250H460" stroke="#9fb8c0" stroke-width="2"/>` +
      `<rect x="290" y="212" width="170" height="88" fill="none" stroke="#9fb8c0" stroke-width="3"/>` +
      `<path d="M284 214L375 180L466 214Z" fill="#eaf7fa" stroke="#9fb8c0" stroke-width="3" stroke-linejoin="round"/>` +
      sunflower(456, 318, 50) + sunflower(474, 322, 38) +
      // Tool shed: the pitchfork, the saw and the weathervane
      `<rect x="480" y="222" width="90" height="78" fill="#c96a3a"/>` +
      `<path d="M492 222V250M504 222V250M540 222V300M552 222V300M564 222V300" stroke="#a8552c" stroke-width="2"/>` +
      `<rect x="488" y="250" width="28" height="50" fill="#8a4a24"/><circle cx="510" cy="276" r="2.5" fill="#ffd23f"/>` +
      `<path d="M472 224L525 194L578 224Z" fill="#6b4a2b"/>` +
      `<path d="M528 298L528 238" stroke="#a0703f" stroke-width="3"/><path d="M521 238H535M521 238V226M528 238V224M535 238V226" stroke="#7d8790" stroke-width="2.5"/>` +
      diff(552, 262, 22, saw(552, 262), '') +
      `<path d="M525 194V174" stroke="#444" stroke-width="2.5"/>` +
      diff(525, 170, 22, vaneArrow(525, 170), anim({ type: 'sway', angle: 20, pivot: [525, 170], period: 2.6 }, vaneArrow(525, 170))) +
      // Pickup truck with crates of apples and cabbages
      crate(596, 262, 44) + diff(617, 258, 22, heap(596, 262, 44, '#e63946'), heap(596, 262, 44, '#f4a261')) +
      crate(646, 262, 40) + heap(646, 262, 40, '#8ac46a', 7) +
      pickup(578, 340, '#2a9d8f') +
      diff(755, 270, 22, `<path d="M748 274h8" stroke="#333" stroke-width="2"/><rect x="755" y="264" width="7" height="12" rx="2" fill="#333"/>`, '') +
      // Alpaca pen
      fence(0, 300, 318, '#b98a5e') + hen(186, 290, false, '#c0532b') +
      wheelbarrow(526, 340, '#e8772e') + pumpkin(512, 326) +
      `<rect x="122" y="452" width="72" height="22" rx="4" fill="#8d99ae"/><rect x="127" y="455" width="62" height="7" rx="3" fill="#4dabf7"/>` +
      alpaca(90, 432, false, '#f4efe6', '#d9cbb5') + diff(121, 340, 22, halter(90, 432), '') +
      alpaca(215, 428, true, '#b07a4f', '#7d5230') +
      flowers +
      anim({ type: 'bob', dx: 4, dy: 5, period: 1.7 }, butterfly(272, 330, '#ffb703')) +
      anim({ type: 'bob', dx: -5, dy: 4, period: 2.1 }, butterfly(470, 312, '#b38cff')) +
      // Donkey with its cart
      `<rect x="315" y="392" width="105" height="26" fill="#b5793f"/><path d="M315 405H420M350 392V418M385 392V418" stroke="#8a5a33" stroke-width="2"/>` +
      basket(340, 392, '#f08c2e') + milkCan(385, 392) + milkCan(404, 392) +
      `<path d="M418 404L478 418" stroke="#8a5a33" stroke-width="4"/>` +
      diff(360, 438, 24, wheel(360, 438, 3), wheel(360, 438, 2)) +
      diff(443, 424, 24, donkeyTail(480, 455), anim({ type: 'sway', angle: 18, pivot: [447, 409], period: 1.8 }, donkeyTail(480, 455))) +
      donkey(480, 455) +
      // Turkey, hen and chicks
      sheepdog(262, 478) +
      turkey(650, 460) + hen(720, 452) + chick(752, 470) + chick(772, 476, true) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['mushroom', 30, 482],
        ['chick', 100, 478],
        ['stones', 302, 484],
        ['horseshoe', 560, 484],
        ['flower', 604, 478, '#b38cff'],
        ['ladybug', 778, 432],
      ])
    )
  },
})
