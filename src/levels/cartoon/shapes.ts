// Drawing helpers of the cartoons (docs/cartoon-mode.md): characters with an ink outline, drawn at their rest position,
// the keyframe helpers that make them walk, and the shaded nature (trees, apples, ground shadows) of their yards.
import type { Keyframe } from '../../engine/types.ts'

export const INK = '#3d2b1f'
/** Ink outline of every character, `width` thick. */
export const Ow = (width: number) => `stroke="${INK}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"`
export const O = Ow(2.5)

const r2 = (n: number) => Math.round(n * 100) / 100

/**
 * Keys that swing back and forth (rot ±angle) every `step` seconds inside each interval and rest at 0 outside them:
 * a leg that walks only while its owner walks. `flip` starts with the other swing (the other leg of a pair).
 */
export function swingKeys(intervals: [number, number][], step: number, angle: number, flip = false): Keyframe[] {
  const keys: Keyframe[] = [{ t: 0, rot: 0 }]
  for (const [from, to] of intervals) {
    if (from > keys[keys.length - 1].t) keys.push({ t: from, rot: 0, ease: 'inOut' })
    let i = flip ? 1 : 0
    for (let t = from + step / 2; t < to - step / 2; t += step, i++) keys.push({ t: r2(t), rot: i % 2 ? -angle : angle, ease: 'inOut' })
    keys.push({ t: to, rot: 0 })
  }
  return keys
}

/** A ginger cat standing on (x, y), facing right; `bow` draws a blue bow tie at its neck. Ids: legs keyed by `legs`. */
export function cat(x: number, y: number, legs: { back: Keyframe[]; front: Keyframe[] } | null, anim: (keys: Keyframe[], pivot: [number, number], markup: string) => string, bow: string, blink: (markup: string) => string, tailSway: (markup: string) => string) {
  const fur = '#f4a13b'
  const dark = '#d9822b'
  const leg = (lx: number, color: string, keys: Keyframe[] | undefined) => {
    const m = `<rect x="${lx - 4}" y="${y - 17}" width="8.5" height="17" rx="4" fill="${color}" ${O}/>`
    return keys ? anim(keys, [lx, y - 15], m) : m
  }
  const flip = (keys: Keyframe[]) => keys.map((k) => ({ ...k, rot: k.rot === undefined ? undefined : -k.rot }))
  return (
    tailSway(
      `<path d="M${x - 26} ${y - 25}q-22-4-21-32q1-9 8-7" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
        `<path d="M${x - 26} ${y - 25}q-22-4-21-32q1-9 8-7" fill="none" stroke="${fur}" stroke-width="5.5" stroke-linecap="round"/>` +
        `<path d="M${x - 39} ${y - 50}l6 3" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>`,
    ) +
    leg(x - 19, dark, legs ? flip(legs.back) : undefined) +
    leg(x + 13, dark, legs ? flip(legs.front) : undefined) +
    `<ellipse cx="${x}" cy="${y - 23}" rx="30" ry="15" fill="url(#ke-ginger)" ${O}/>` +
    `<path d="M${x - 10} ${y - 37}q3 8 0 14M${x} ${y - 38}q3 8 0 14M${x - 20} ${y - 33}q3 6 1 11" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>` +
    `<ellipse cx="${x + 4}" cy="${y - 15}" rx="17" ry="6" fill="#fde3b8"/>` +
    leg(x - 11, fur, legs?.back) +
    leg(x + 21, fur, legs?.front) +
    // Head
    `<path d="M${x + 14} ${y - 48}l1-17l11 9z" fill="${fur}" ${O}/>` +
    `<path d="M${x + 29} ${y - 56}l9-12l3 16z" fill="${fur}" ${O}/>` +
    `<path d="M${x + 17} ${y - 58}l0-4l4 3z M${x + 33} ${y - 60}l4-5l1 6z" fill="#f7a6b4"/>` +
    `<circle cx="${x + 27}" cy="${y - 42}" r="15.5" fill="url(#ke-ginger)" ${O}/>` +
    `<path d="M${x + 22} ${y - 56}q2 5 0 8M${x + 28} ${y - 57}q2 5 0 8" fill="none" stroke="${dark}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<ellipse cx="${x + 25}" cy="${y - 44}" rx="4" ry="5" fill="#fff" ${Ow(1.5)}/>` +
    `<ellipse cx="${x + 35}" cy="${y - 44}" rx="4" ry="5" fill="#fff" ${Ow(1.5)}/>` +
    `<circle cx="${x + 26.5}" cy="${y - 43}" r="2.2" fill="${INK}"/><circle cx="${x + 36.5}" cy="${y - 43}" r="2.2" fill="${INK}"/>` +
    blink(`<ellipse cx="${x + 25}" cy="${y - 44}" rx="4.6" ry="5.6" fill="${fur}"/><ellipse cx="${x + 35}" cy="${y - 44}" rx="4.6" ry="5.6" fill="${fur}"/>` +
      `<path d="M${x + 21} ${y - 43}h8M${x + 31} ${y - 43}h8" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
    `<path d="M${x + 39} ${y - 38}l4-1.5l-1.5 3.5z" fill="#e8798f" ${Ow(1.2)}/>` +
    `<path d="M${x + 41} ${y - 35}q-2 4-5 2M${x + 41} ${y - 35}q1 4 4 2" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M${x + 38} ${y - 37}l13-3M${x + 38} ${y - 35}l13 1M${x + 22} ${y - 37}l-10-2" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>` +
    bow
  )
}

/** The cat's blue bow tie at its neck (cat standing on (x, y)). */
export const catBow = (x: number, y: number) =>
  `<path d="M${x + 14} ${y - 30}l-10-7v14zM${x + 14} ${y - 30}l10-7v14z" fill="#3a86ff" ${Ow(1.8)}/>` +
  `<circle cx="${x + 14}" cy="${y - 30}" r="3.2" fill="#1f5fd1" ${Ow(1.5)}/>`

/** A fish centered on (x, y), facing right. */
export const fish = (x: number, y: number, s = 1, color = '#ff7b3a') =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-14 0l-12-10v20z" fill="${color}" ${O}/>` +
  `<ellipse cx="0" cy="0" rx="17" ry="10" fill="${color}" ${O}/>` +
  `<path d="M-4-9q4-8 10-3" fill="${color}" ${Ow(2)}/>` +
  `<path d="M-2-7q-3 7 0 14M4-8q-3 8 0 16" fill="none" stroke="#e0531a" stroke-width="2"/>` +
  `<circle cx="9" cy="-2.5" r="3" fill="#fff" ${Ow(1.2)}/><circle cx="10" cy="-2.5" r="1.4" fill="${INK}"/>` +
  `<path d="M15 3q-2 2-4 1" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>` +
  `</g>`

/** A green frog sitting on (x, y); `blink` wraps its eyelids, `throat` its puffing throat. */
export const frog = (x: number, y: number, blink: (m: string) => string = () => '', throat: (m: string) => string = () => '') =>
  `<ellipse cx="${x - 12}" cy="${y - 4}" rx="9" ry="5" fill="#4caf50" ${O}/>` +
  `<ellipse cx="${x + 12}" cy="${y - 4}" rx="9" ry="5" fill="#4caf50" ${O}/>` +
  `<ellipse cx="${x}" cy="${y - 12}" rx="16" ry="12" fill="#66c25a" ${O}/>` +
  `<ellipse cx="${x}" cy="${y - 8}" rx="9" ry="6" fill="#c8eba0"/>` +
  throat(`<ellipse cx="${x}" cy="${y - 9}" rx="7" ry="4.5" fill="#e3f7c8" ${Ow(1.2)}/>`) +
  `<circle cx="${x - 8}" cy="${y - 24}" r="6" fill="#66c25a" ${O}/><circle cx="${x + 8}" cy="${y - 24}" r="6" fill="#66c25a" ${O}/>` +
  `<circle cx="${x - 8}" cy="${y - 24}" r="3.2" fill="#fff"/><circle cx="${x + 8}" cy="${y - 24}" r="3.2" fill="#fff"/>` +
  `<circle cx="${x - 7.5}" cy="${y - 24}" r="1.6" fill="${INK}"/><circle cx="${x + 8.5}" cy="${y - 24}" r="1.6" fill="${INK}"/>` +
  blink(`<circle cx="${x - 8}" cy="${y - 24}" r="3.6" fill="#66c25a"/><circle cx="${x + 8}" cy="${y - 24}" r="3.6" fill="#66c25a"/>`) +
  `<path d="M${x - 7} ${y - 14}q7 5 14 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`

/** A little blue bird standing on (x, y), facing left; `wing` wraps its wing (to flap it). */
export const bird = (x: number, y: number, wing: (markup: string) => string = (m) => m) =>
  `<path d="M${x + 7} ${y - 9}l12-5l-2 8z" fill="#2f6fbf" ${Ow(1.8)}/>` +
  `<path d="M${x - 2} ${y}v-4M${x + 3} ${y}v-4" stroke="#e8a33b" stroke-width="2" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y - 10}" rx="10" ry="8" fill="#4d96e6" ${Ow(1.8)}/>` +
  `<ellipse cx="${x - 2}" cy="${y - 7}" rx="5" ry="3.5" fill="#dcecff"/>` +
  `<circle cx="${x - 7}" cy="${y - 18}" r="6.5" fill="#4d96e6" ${Ow(1.8)}/>` +
  `<path d="M${x - 13} ${y - 19}l-6 2l6 1.5z" fill="#f2a93b" ${Ow(1.2)}/>` +
  `<circle cx="${x - 9}" cy="${y - 19.5}" r="1.4" fill="${INK}"/>` +
  wing(`<path d="M${x + 1} ${y - 13}q10-2 11 6q-8 2-11-6z" fill="#2f6fbf" ${Ow(1.6)}/>`)

/** A lily pad centered on (x, y). */
export const lilyPad = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y}l${r2(18 * s)} ${r2(-4 * s)}a${r2(22 * s)} ${r2(9 * s)} 0 1 1 ${r2(-4 * s)} ${r2(-4 * s)}z" fill="#5aa845" ${Ow(1.8)}/>` +
  `<path d="M${x} ${y}l${r2(-14 * s)} ${r2(-3 * s)}M${x} ${y}l${r2(-6 * s)} ${r2(6 * s)}" stroke="#468a35" stroke-width="1.4"/>`

/** A pink water lily on (x, y). */
export const waterLily = (x: number, y: number) =>
  `<path d="M${x - 12} ${y}q-2-12 6-14q4 6 6 14zM${x + 12} ${y}q2-12-6-14q-4 6-6 14z" fill="#ff9fc0" ${Ow(1.6)}/>` +
  `<path d="M${x - 6} ${y}q0-16 6-20q6 4 6 20z" fill="#ffc2d7" ${Ow(1.6)}/>` +
  `<circle cx="${x}" cy="${y - 4}" r="3" fill="#ffd23f"/>`

/** A soft cloud centered on (x, y). */
export const puffCloud = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff">` +
  `<ellipse cx="0" cy="6" rx="52" ry="16"/><circle cx="-22" cy="0" r="18"/><circle cx="4" cy="-8" r="24"/><circle cx="28" cy="2" r="16"/>` +
  `<ellipse cx="0" cy="14" rx="46" ry="6" fill="#dbe9f6"/></g>`

/** A grey mouse standing on (x, y), facing right; `tail` wraps its tail. */
export const mouse = (x: number, y: number, tail: (m: string) => string = (m) => m) =>
  tail(`<path d="M${x - 10} ${y - 5}q-14 2-16-8" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
  `<ellipse cx="${x}" cy="${y - 7}" rx="11" ry="7" fill="#a7a9b4" ${Ow(1.8)}/>` +
  `<circle cx="${x + 4}" cy="${y - 15}" r="5" fill="#a7a9b4" ${Ow(1.6)}/><circle cx="${x + 4}" cy="${y - 15}" r="2.4" fill="#f7a6b4"/>` +
  `<path d="M${x + 8} ${y - 11}l9 2l-8 4z" fill="#a7a9b4" ${Ow(1.6)}/><circle cx="${x + 17}" cy="${y - 9}" r="1.6" fill="#e8798f"/>` +
  `<circle cx="${x + 10}" cy="${y - 11}" r="1.4" fill="${INK}"/>` +
  `<path d="M${x - 5} ${y}v-2M${x + 6} ${y}v-2" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`

/** A butterfly centered on (x, y); `flap` wraps its wings. */
export const butterflyAt = (x: number, y: number, colors: [string, string], flap: (m: string) => string) =>
  flap(
    `<path d="M${x} ${y}q-12-14-15-3q1 7 15 3zM${x} ${y}q12-14 15-3q-1 7-15 3z" fill="${colors[0]}" ${Ow(1.4)}/>` +
      `<path d="M${x} ${y + 1}q-9 4-8 10q5 0 8-10zM${x} ${y + 1}q9 4 8 10q-5 0-8-10z" fill="${colors[1]}" ${Ow(1.4)}/>`,
  ) + `<path d="M${x} ${y - 5}v11M${x} ${y - 5}l-3-5M${x} ${y - 5}l3-5" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`

/** A bee centered on (x, y), flying left; `buzz` wraps its wings. */
export const bee = (x: number, y: number, buzz: (m: string) => string) =>
  buzz(`<ellipse cx="${x + 1}" cy="${y - 8}" rx="4" ry="6" fill="#fff" fill-opacity="0.85" ${Ow(1.2)}/>`) +
  `<ellipse cx="${x}" cy="${y}" rx="8" ry="5.5" fill="#ffd23f" ${Ow(1.5)}/>` +
  `<path d="M${x - 1} ${y - 5}v10M${x + 3} ${y - 5}v10" stroke="${INK}" stroke-width="2"/>` +
  `<circle cx="${x - 6}" cy="${y - 1}" r="1.2" fill="${INK}"/>`

/** A dragonfly centered on (x, y), its body along x; `buzz` wraps its wings. */
export const dragonfly = (x: number, y: number, buzz: (m: string) => string) =>
  buzz(
    `<ellipse cx="${x - 4}" cy="${y - 7}" rx="5" ry="10" transform="rotate(-25 ${x - 4} ${y - 7})" fill="#e2f6ff" fill-opacity="0.75" ${Ow(1)}/>` +
      `<ellipse cx="${x + 4}" cy="${y - 7}" rx="5" ry="10" transform="rotate(25 ${x + 4} ${y - 7})" fill="#e2f6ff" fill-opacity="0.75" ${Ow(1)}/>`,
  ) +
  `<path d="M${x + 4} ${y}h22" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x + 4} ${y}h22" stroke="#1fb5a8" stroke-width="2.6" stroke-linecap="round"/>` +
  `<circle cx="${x}" cy="${y}" r="4.5" fill="#1fb5a8" ${Ow(1.4)}/><circle cx="${x - 4}" cy="${y - 2}" r="2.6" fill="#0d5f59"/>`

/** A small fly centered on (x, y). */
export const fly = (x: number, y: number, buzz: (m: string) => string) =>
  buzz(`<ellipse cx="${x - 2}" cy="${y - 4}" rx="2.5" ry="4" fill="#fff" fill-opacity="0.8" ${Ow(0.8)}/><ellipse cx="${x + 2}" cy="${y - 4}" rx="2.5" ry="4" fill="#fff" fill-opacity="0.8" ${Ow(0.8)}/>`) +
  `<circle cx="${x}" cy="${y}" r="3" fill="#33384a"/>`

/** A snail on (x, y), crawling right. */
export const snail = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}h26q4 0 4-4l-4-6q-2 6-6 6h-20z" fill="#d9c59a" ${Ow(1.5)}/>` +
  `<path d="M${x + 12} ${y - 8}l2-8M${x + 16} ${y - 8}l4-7" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>` +
  `<circle cx="${x - 3}" cy="${y - 10}" r="10" fill="#d97b4b" ${Ow(1.6)}/>` +
  `<path d="M${x - 3} ${y - 10}m-5 0a5 5 0 1 1 5 5" fill="none" stroke="#9a4a26" stroke-width="1.6"/>`

/** A far bird of a flock: a little "m" on (x, y); `flap` wraps it. */
export const farBird = (x: number, y: number, flap: (m: string) => string) =>
  flap(`<path d="M${x - 9} ${y - 3}q5-5 9 2q4-7 9-2" fill="none" stroke="#3a4660" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`)

/** A white hen standing on (x, y), facing right. */
export const cartoonHen = (x: number, y: number) =>
  `<path d="M${x - 4} ${y - 6}v6M${x + 4} ${y - 6}v6" stroke="#e8a33b" stroke-width="2.6" stroke-linecap="round"/>` +
  `<path d="M${x - 16} ${y - 18}q-10-14-2-20q4 8 8 10z" fill="#f4f1ea" ${Ow(1.8)}/>` +
  `<ellipse cx="${x}" cy="${y - 15}" rx="16" ry="11" fill="#fbfaf6" ${Ow(2)}/>` +
  `<path d="M${x - 6} ${y - 16}q6 8 14 0" fill="none" stroke="#d8d2c4" stroke-width="2"/>` +
  `<circle cx="${x + 13}" cy="${y - 27}" r="7.5" fill="#fbfaf6" ${Ow(1.8)}/>` +
  `<path d="M${x + 9} ${y - 34}q2-6 4-1q2-5 4 0q3-3 3 3z" fill="#e63946" ${Ow(1.2)}/>` +
  `<path d="M${x + 19} ${y - 28}l7 2l-7 2z" fill="#f2a93b" ${Ow(1.2)}/>` +
  `<path d="M${x + 18} ${y - 24}q2 5-1 6q-2-3 1-6z" fill="#e63946"/>` +
  `<circle cx="${x + 15}" cy="${y - 29}" r="1.5" fill="${INK}"/>`

/** A yellow chick standing on (x, y), facing right. */
export const cartoonChick = (x: number, y: number) =>
  `<path d="M${x - 2} ${y - 3}v3M${x + 2} ${y - 3}v3" stroke="#e8a33b" stroke-width="1.8" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y - 8}" rx="7" ry="5.5" fill="#ffd84a" ${Ow(1.5)}/>` +
  `<circle cx="${x + 5}" cy="${y - 13}" r="4" fill="#ffd84a" ${Ow(1.5)}/>` +
  `<path d="M${x + 8.5} ${y - 13.5}l3.5 1l-3.5 1.5z" fill="#f2a93b"/><circle cx="${x + 6}" cy="${y - 14}" r="1" fill="${INK}"/>`

/** A red squirrel clinging to a tree trunk at (x, y), head up; `tail` wraps its tail. */
export const squirrel = (x: number, y: number, tail: (m: string) => string = (m) => m) =>
  tail(`<path d="M${x - 2} ${y + 10}q-22 4-20-16q2-18 14-14q-10 4-6 14q2 8 12 6z" fill="#c8662d" ${Ow(1.8)}/>`) +
  `<ellipse cx="${x + 4}" cy="${y}" rx="7" ry="13" fill="#d97b3b" ${Ow(1.8)}/>` +
  `<circle cx="${x + 6}" cy="${y - 15}" r="6.5" fill="#d97b3b" ${Ow(1.8)}/>` +
  `<path d="M${x + 3} ${y - 20}l-1-6l5 4z" fill="#d97b3b" ${Ow(1.4)}/>` +
  `<circle cx="${x + 9}" cy="${y - 16}" r="1.5" fill="${INK}"/><circle cx="${x + 12}" cy="${y - 13}" r="1.3" fill="${INK}"/>` +
  `<path d="M${x + 9} ${y - 2}h5M${x + 9} ${y + 8}h5" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`

/**
 * Gradients of the shaded nature helpers below (trees, apples, ground shadows), lit from the upper right: put them
 * in the `<defs>` of a level that draws them.
 */
export const NATURE_DEFS =
  `<radialGradient id="ke-leaf" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#a6e57f"/><stop offset="0.5" stop-color="#55b24a"/><stop offset="1" stop-color="#2a7434"/></radialGradient>` +
  `<radialGradient id="ke-birch-leaf" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#d9f3a6"/><stop offset="0.55" stop-color="#a5d873"/><stop offset="1" stop-color="#6aa54a"/></radialGradient>` +
  `<linearGradient id="ke-pine" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fae63"/><stop offset="0.6" stop-color="#2c7f45"/><stop offset="1" stop-color="#1d5c33"/></linearGradient>` +
  `<linearGradient id="ke-bark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e3a1c"/><stop offset="0.6" stop-color="#8f5d2e"/><stop offset="1" stop-color="#b07a44"/></linearGradient>` +
  `<linearGradient id="ke-birch" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfc9bb"/><stop offset="0.6" stop-color="#f6f3ec"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
  `<radialGradient id="ke-apple" cx="0.65" cy="0.3" r="0.8"><stop offset="0" stop-color="#ff8a80"/><stop offset="0.5" stop-color="#e2303c"/><stop offset="1" stop-color="#981b26"/></radialGradient>` +
  `<radialGradient id="ke-ginger" cx="0.6" cy="0.25" r="0.85"><stop offset="0" stop-color="#ffc77a"/><stop offset="0.55" stop-color="#f4a13b"/><stop offset="1" stop-color="#c9741f"/></radialGradient>` +
  `<radialGradient id="ke-owl-iris" cx="0.42" cy="0.38" r="0.7"><stop offset="0" stop-color="#fff0a8"/><stop offset="0.5" stop-color="#ffb703"/><stop offset="1" stop-color="#d36b00"/></radialGradient>` +
  `<radialGradient id="ke-shadow"><stop offset="0" stop-color="#1b3311" stop-opacity="0.38"/><stop offset="0.7" stop-color="#1b3311" stop-opacity="0.16"/><stop offset="1" stop-color="#1b3311" stop-opacity="0"/></radialGradient>`

/** A soft shadow on the ground around (x, y). */
export const groundShadow = (x: number, y: number, rx: number, ry: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#ke-shadow)"/>`

/** Leafy texture over a crown ball at (x, y) of radius r: a few darker curls. */
const leaves = (x: number, y: number, r: number) =>
  `<path d="M${x - r * 0.5} ${y + r * 0.2}q${r * 0.15}-${r * 0.2} ${r * 0.3} 0M${x + r * 0.05} ${y + r * 0.45}q${r * 0.15}-${r * 0.2} ${r * 0.3} 0M${x - r * 0.15} ${y - r * 0.2}q${r * 0.15}-${r * 0.2} ${r * 0.3} 0" fill="none" stroke="#2a7434" stroke-opacity="0.45" stroke-width="${Math.max(1.5, r * 0.05)}" stroke-linecap="round"/>`

/** A shaded crown ball of the trees below. */
const ball = (x: number, y: number, r: number, fill = 'url(#ke-leaf)') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${O}/>` + leaves(x, y, r)

/** Wraps a tree's crown so it can sway (pivot: the top of its trunk). */
type Crown = (pivot: [number, number], markup: string) => string

/** An apple on (x, y). */
export const apple = (x: number, y: number, r = 7) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#ke-apple)" ${Ow(1.5)}/><path d="M${x} ${y - r}l2-5" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
  `<circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.25}" fill="#fff" fill-opacity="0.6"/>`

/** An apple tree standing on (x, y), `s` times its size: a round, layered crown full of apples. */
export const appleTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    groundShadow(x - k(26), y, k(90), k(14)) +
    `<path d="M${x - k(12)} ${y}q${k(5)}-${k(70)}-${k(3)}-${k(130)}h${k(24)}q-${k(8)} ${k(60)} ${k(3)} ${k(130)}z" fill="url(#ke-bark)" ${O}/>` +
    `<path d="M${x - k(4)} ${y - k(20)}q${k(3)}-${k(30)} 0-${k(60)}M${x + k(4)} ${y - k(50)}q-${k(2)}-${k(20)} 0-${k(40)}" fill="none" stroke="#4a2c14" stroke-opacity="0.5" stroke-width="${k(2.5)}" stroke-linecap="round"/>` +
    crown(
      [x, y - k(120)],
      ball(x - k(40), y - k(150), k(48)) + ball(x + k(38), y - k(160), k(46)) + ball(x, y - k(200), k(54)) +
        apple(x - k(52), y - k(140), k(7)) + apple(x - k(14), y - k(176), k(7)) + apple(x + k(30), y - k(140), k(7)) +
        apple(x + k(14), y - k(226), k(7)) + apple(x + k(56), y - k(178), k(7)) + apple(x - k(34), y - k(206), k(7)),
    )
  )
}

/** A fir tree standing on (x, y), `s` times its size. */
export const pineTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    groundShadow(x - k(22), y, k(70), k(11)) +
    `<rect x="${x - k(8)}" y="${y - k(30)}" width="${k(16)}" height="${k(30)}" fill="url(#ke-bark)" ${O}/>` +
    crown(
      [x, y - k(30)],
      `<path d="M${x} ${y - k(150)}l${k(36)} ${k(50)}h-${k(14)}l${k(30)} ${k(40)}h-${k(14)}l${k(34)} ${k(40)}h-${k(144)}l${k(34)}-${k(40)}h-${k(14)}l${k(30)}-${k(40)}h-${k(14)}z" fill="url(#ke-pine)" ${O}/>` +
        `<path d="M${x} ${y - k(110)}l${k(22)} ${k(10)}M${x} ${y - k(70)}l${k(30)} ${k(10)}M${x} ${y - k(32)}l${k(36)} ${k(6)}" stroke="#1d5c33" stroke-opacity="0.6" stroke-width="${k(3)}" stroke-linecap="round"/>` +
        `<path d="M${x} ${y - k(140)}l-${k(18)} ${k(30)}M${x - k(8)} ${y - k(90)}l-${k(24)} ${k(28)}M${x - k(10)} ${y - k(50)}l-${k(30)} ${k(14)}" stroke="#3fa45a" stroke-width="${k(4)}" stroke-linecap="round"/>`,
    )
  )
}

/** A birch standing on (x, y), `s` times its size: white trunk with dark marks, a light airy crown. */
export const birchTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    groundShadow(x - k(24), y, k(60), k(10)) +
    `<path d="M${x - k(7)} ${y}l${k(2)}-${k(150)}h${k(10)}l${k(2)} ${k(150)}z" fill="url(#ke-birch)" ${O}/>` +
    `<path d="M${x - k(5)} ${y - k(30)}h${k(6)}M${x} ${y - k(62)}h${k(5)}M${x - k(4)} ${y - k(96)}h${k(6)}M${x + k(1)} ${y - k(124)}h${k(4)}" stroke="${INK}" stroke-width="${k(3)}" stroke-linecap="round"/>` +
    crown(
      [x, y - k(140)],
      ball(x - k(22), y - k(160), k(28), 'url(#ke-birch-leaf)') + ball(x + k(24), y - k(170), k(29), 'url(#ke-birch-leaf)') + ball(x, y - k(200), k(31), 'url(#ke-birch-leaf)'),
    )
  )
}

/** A round tree standing on (x, y), `s` times its size, crown of `color`. */
export const roundTree = (x: number, y: number, s: number, color: string, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    groundShadow(x - k(24), y, k(64), k(10)) +
    `<path d="M${x - k(9)} ${y}q${k(4)}-${k(50)}-${k(2)}-${k(90)}h${k(20)}q-${k(6)} ${k(40)} ${k(2)} ${k(90)}z" fill="url(#ke-bark)" ${O}/>` +
    crown([x, y - k(90)], ball(x, y - k(130), k(52), color) + `<path d="M${x - k(30)} ${y - k(150)}q${k(14)}-${k(20)} ${k(34)}-${k(18)}" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="${k(6)}" stroke-linecap="round"/>`)
  )
}

/** A tuft of grass on (x, y). */
export const grassTuft = (x: number, y: number) =>
  `<path d="M${x - 6} ${y}q2-12 0-18M${x} ${y}q1-16 4-22M${x + 6} ${y}q-1-10 4-14" fill="none" stroke="#3f8f3a" stroke-width="2.6" stroke-linecap="round"/>`

/**
 * Gradients of the spring trees below (oak, blossoming cherry, weeping willow, lilac bush), lit from the upper right
 * like NATURE_DEFS: put them in the `<defs>` of a level that draws them.
 */
export const SPRING_DEFS =
  `<radialGradient id="ke-oak" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#8fcf5e"/><stop offset="0.5" stop-color="#3f8f3a"/><stop offset="1" stop-color="#1f5a26"/></radialGradient>` +
  `<radialGradient id="ke-blossom" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#fff0f5"/><stop offset="0.5" stop-color="#ffc1d6"/><stop offset="1" stop-color="#e889ad"/></radialGradient>` +
  `<linearGradient id="ke-willow" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4ef8a"/><stop offset="0.6" stop-color="#9ccf52"/><stop offset="1" stop-color="#6a9e35"/></linearGradient>` +
  `<radialGradient id="ke-lilac" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#e6c8ff"/><stop offset="0.6" stop-color="#b48ae6"/><stop offset="1" stop-color="#7d55b8"/></radialGradient>`

/** An oak standing on (x, y), `s` times its size: a thick gnarled trunk with roots, a broad dark crown with acorns. */
export const oakTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  const acorn = (ax: number, ay: number) =>
    `<ellipse cx="${ax}" cy="${ay + k(3)}" rx="${k(3.5)}" ry="${k(4.5)}" fill="#c8893f" ${Ow(1.2)}/><path d="M${ax - k(4)} ${ay + k(1)}q${k(4)}-${k(5)} ${k(8)} 0z" fill="#7a4a22" ${Ow(1)}/>`
  return (
    groundShadow(x - k(30), y, k(120), k(16)) +
    `<path d="M${x - k(34)} ${y}q${k(16)}-${k(6)} ${k(18)}-${k(30)}q${k(2)}-${k(50)}-${k(10)}-${k(110)}l${k(16)}-${k(8)}q${k(10)} ${k(30)} ${k(12)} ${k(40)}q${k(4)}-${k(30)} ${k(16)}-${k(44)}l${k(14)} ${k(6)}q-${k(12)} ${k(30)}-${k(8)} ${k(98)}q${k(2)} ${k(24)} ${k(20)} ${k(30)}z" fill="url(#ke-bark)" ${O}/>` +
    `<path d="M${x - k(8)} ${y - k(20)}q${k(4)}-${k(30)}-${k(2)}-${k(60)}M${x + k(6)} ${y - k(40)}q-${k(3)}-${k(20)} ${k(2)}-${k(40)}M${x - k(18)} ${y - k(8)}q${k(6)}-${k(12)} ${k(4)}-${k(26)}" fill="none" stroke="#4a2c14" stroke-opacity="0.5" stroke-width="${k(2.5)}" stroke-linecap="round"/>` +
    crown(
      [x, y - k(130)],
      ball(x - k(76), y - k(160), k(50), 'url(#ke-oak)') + ball(x + k(74), y - k(166), k(52), 'url(#ke-oak)') +
        ball(x - k(36), y - k(214), k(56), 'url(#ke-oak)') + ball(x + k(38), y - k(220), k(54), 'url(#ke-oak)') + ball(x, y - k(176), k(58), 'url(#ke-oak)') +
        acorn(x - k(80), y - k(150)) + acorn(x + k(60), y - k(150)) + acorn(x - k(20), y - k(232)) + acorn(x + k(30), y - k(186)) + acorn(x + k(86), y - k(196)),
    )
  )
}

/** A blossoming cherry standing on (x, y), `s` times its size: a slim, bent trunk and a pink cloud of flowers. */
export const blossomTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  const flowers = (cx: number, cy: number, r: number) => {
    let m = ''
    for (let i = 0; i < 6; i++) {
      const a = i * 2.4
      const fx = Math.round(cx + Math.cos(a) * r * 0.6)
      const fy = Math.round(cy + Math.sin(a) * r * 0.55)
      m += `<circle cx="${fx}" cy="${fy}" r="${k(3.4)}" fill="#fff"/><circle cx="${fx}" cy="${fy}" r="${k(1.4)}" fill="#e2508a"/>`
    }
    return m
  }
  const pink = (bx: number, by: number, r: number) =>
    `<circle cx="${bx}" cy="${by}" r="${r}" fill="url(#ke-blossom)" ${O}/>` + flowers(bx, by, r)
  return (
    groundShadow(x - k(24), y, k(74), k(11)) +
    `<path d="M${x - k(9)} ${y}q${k(10)}-${k(50)}-${k(8)}-${k(90)}l${k(14)}-${k(4)}q${k(16)} ${k(40)} ${k(12)} ${k(94)}z" fill="#6e3f2a" ${O}/>` +
    `<path d="M${x - k(6)} ${y - k(80)}q-${k(20)}-${k(20)}-${k(40)}-${k(24)}M${x + k(2)} ${y - k(86)}q${k(20)}-${k(16)} ${k(44)}-${k(18)}" fill="none" stroke="#6e3f2a" stroke-width="${k(6)}" stroke-linecap="round"/>` +
    crown([x, y - k(90)], pink(x - k(44), y - k(118), k(36)) + pink(x + k(46), y - k(122), k(38)) + pink(x, y - k(150), k(46)))
  )
}

/** A weeping willow standing on (x, y), `s` times its size: a leaning trunk, a crown with long hanging strands. */
export const willowTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  let strands = ''
  for (let i = 0; i < 11; i++) {
    const sx = Math.round(x - k(96) + i * k(19))
    const top = Math.round(y - k(200) + Math.abs(i - 5) * k(8))
    const len = k(110 + (i % 3) * 22)
    strands += `<path d="M${sx} ${top}q${k(6)} ${len / 2}-${k(4)} ${len}" fill="none" stroke="#5f8f2e" stroke-width="${k(9)}" stroke-linecap="round"/>`
    strands += `<path d="M${sx} ${top}q${k(6)} ${len / 2}-${k(4)} ${len}" fill="none" stroke="url(#ke-willow)" stroke-width="${k(6)}" stroke-linecap="round" stroke-dasharray="${k(5)} ${k(3)}"/>`
  }
  return (
    groundShadow(x - k(20), y, k(100), k(14)) +
    `<path d="M${x - k(12)} ${y}q${k(10)}-${k(70)}-${k(14)}-${k(150)}h${k(20)}q${k(18)} ${k(80)} ${k(16)} ${k(150)}z" fill="url(#ke-bark)" ${O}/>` +
    crown(
      [x - k(16), y - k(150)],
      `<ellipse cx="${x - k(14)}" cy="${y - k(196)}" rx="${k(104)}" ry="${k(46)}" fill="url(#ke-willow)" ${O}/>` + strands,
    )
  )
}

/** A lilac bush standing on (x, y), `s` times its size: green leaves and purple flower cones. */
export const lilacBush = (x: number, y: number, s: number) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  const cone = (cx: number, cy: number) =>
    `<path d="M${cx - k(10)} ${cy}q${k(10)}-${k(34)} ${k(20)} 0q-${k(10)} ${k(8)}-${k(20)} 0z" fill="url(#ke-lilac)" ${Ow(1.4)}/>` +
    `<circle cx="${cx - k(3)}" cy="${cy - k(10)}" r="${k(2)}" fill="#f3e6ff"/><circle cx="${cx + k(3)}" cy="${cy - k(18)}" r="${k(1.6)}" fill="#f3e6ff"/>`
  return (
    groundShadow(x, y, k(84), k(10)) +
    `<path d="M${x - k(78)} ${y}q-${k(10)}-${k(50)} ${k(26)}-${k(66)}q${k(14)}-${k(36)} ${k(56)}-${k(28)}q${k(40)}-${k(14)} ${k(58)} ${k(24)}q${k(36)} ${k(20)} ${k(18)} ${k(70)}z" fill="url(#ke-oak)" ${O}/>` +
    leaves(x - k(30), y - k(40), k(40)) + leaves(x + k(30), y - k(50), k(36)) +
    cone(x - k(48), y - k(52)) + cone(x - k(14), y - k(80)) + cone(x + k(22), y - k(74)) + cone(x + k(54), y - k(44)) + cone(x - k(2), y - k(40))
  )
}

/**
 * The game's owl (the app icon's, scripts/make-icons.ts): ear tufts, cream face disks, amber eyes, orange beak, brows —
 * with wings and feet, perched on (x, y), `s` times its size (about 36 units tall at 1). `blink` wraps its eyelids;
 * `sleepy` draws it dozing, eyes shut.
 */
export const keenOwl = (x: number, y: number, s: number, blink: (m: string) => string = () => '', sleepy = false) => {
  const eye = (ex: number) =>
    `<circle cx="${ex}" cy="54" r="12.5" fill="#f3dcb4"/>` +
    (sleepy
      ? `<path d="M${ex - 7} 55q7 5 14 0" fill="none" stroke="#5e3a17" stroke-width="2.6" stroke-linecap="round"/>`
      : `<circle cx="${ex}" cy="54" r="9.6" fill="#fff"/><circle cx="${ex}" cy="54" r="6.6" fill="url(#ke-owl-iris)"/><circle cx="${ex}" cy="54" r="3.4" fill="#1b1410"/><circle cx="${ex + 2}" cy="51.8" r="1.7" fill="#fff"/>`)
  const lids = `<circle cx="42.5" cy="54" r="10.4" fill="#8b5a2b"/><circle cx="65.5" cy="54" r="10.4" fill="#8b5a2b"/><path d="M33 55h19M56 55h19" stroke="#5e3a17" stroke-width="2"/>`
  return (
    `<g transform="translate(${x} ${y}) scale(${Math.round(s * 62) / 100}) translate(-54 -86)">` +
    `<path d="M30 60q-8 14 2 26l8-6zM78 60q8 14-2 26l-8-6z" fill="#6e4520" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>` +
    `<path d="M31 42L33.5 27.5L45 36Q54 33.5 63 36L74.5 27.5L77 42Q83 53 80 66Q74 82 54 82Q34 82 28 66Q25 53 31 42Z" fill="#8b5a2b" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>` +
    `<path d="M40 76q14 7 28 0q-4-9-14-9t-14 9Z" fill="#a8743f"/>` +
    `<path d="M47 75l2 3M54 74v3.5M61 75l-2 3" stroke="#8b5a2b" stroke-width="1.6" stroke-linecap="round"/>` +
    eye(42.5) + eye(65.5) +
    (sleepy ? '' : blink(lids)) +
    `<path d="M50.5 63h7L54 70.5Z" fill="#ff9f1c" stroke="#d97706" stroke-width="1" stroke-linejoin="round"/>` +
    `<path d="M33 40.5q9-4 18 1.5M75 40.5q-9-4-18 1.5" fill="none" stroke="#5e3a17" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M45 82v4M49 82v4M59 82v4M63 82v4" stroke="#e8a33b" stroke-width="2.6" stroke-linecap="round"/>` +
    `</g>`
  )
}

/** Gradients of the beach things below (palm): put them in the `<defs>` of a level that draws them. */
export const BEACH_DEFS =
  `<linearGradient id="ke-palm" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9be06a"/><stop offset="0.6" stop-color="#3fa34a"/><stop offset="1" stop-color="#23703a"/></linearGradient>` +
  `<linearGradient id="ke-palm-bark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6236"/><stop offset="0.6" stop-color="#b98b52"/><stop offset="1" stop-color="#d9ae72"/></linearGradient>`

/**
 * A coconut palm standing on (x, y), `s` times its size, its ringed trunk bending to the right (`lean` −1: left);
 * `crown` gets the top of the trunk and the fronds (a level adds its coconuts there).
 */
export const palmTree = (x: number, y: number, s: number, crown: Crown, lean = 1, coconuts = '') => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  const tx = Math.round(x + lean * k(40))
  const ty = Math.round(y - k(210))
  let rings = ''
  for (let i = 1; i < 9; i++) {
    const f = i / 9
    const rx = Math.round(x + lean * k(40) * f * f)
    const ry = Math.round(y - k(210) * f)
    rings += `<path d="M${rx - k(8)} ${ry}q${k(8)} ${k(5)} ${k(16)} 0" fill="none" stroke="#6e4a26" stroke-width="${k(2)}" stroke-linecap="round"/>`
  }
  let fronds = ''
  const angles = [-170, -140, -105, -70, -35, -8, 20, 160]
  for (const [i, a] of angles.entries()) {
    const r = (a * Math.PI) / 180
    const len = k(i % 2 ? 92 : 80)
    const ex = Math.round(tx + Math.cos(r) * len)
    const ey = Math.round(ty + Math.sin(r) * len * 0.55 + k(Math.abs(Math.cos(r)) * 36))
    const mx = Math.round((tx + ex) / 2)
    const my = Math.round((ty + ey) / 2 - k(26))
    fronds +=
      `<path d="M${tx} ${ty}Q${mx} ${my - k(12)} ${ex} ${ey}Q${mx} ${my + k(14)} ${tx} ${ty}z" fill="url(#ke-palm)" ${Ow(1.8)}/>` +
      `<path d="M${tx} ${ty}Q${mx} ${my} ${ex} ${ey}" fill="none" stroke="#23703a" stroke-width="${k(1.6)}"/>`
  }
  return (
    groundShadow(x + lean * k(30), y, k(80), k(12)) +
    `<path d="M${x - k(11)} ${y}Q${x + lean * k(4)} ${y - k(120)} ${tx - k(6)} ${ty}h${k(12)}Q${x + lean * k(22)} ${y - k(110)} ${x + k(11)} ${y}z" fill="url(#ke-palm-bark)" ${O}/>` +
    rings +
    crown([tx, ty], fronds + coconuts)
  )
}

/** Gradients of the jungle plants below (banana plant, bamboo): put them in the `<defs>` of a level that draws them. */
export const JUNGLE_DEFS =
  `<linearGradient id="ke-banana-leaf" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6e86a"/><stop offset="0.6" stop-color="#5cb342"/><stop offset="1" stop-color="#2f7d34"/></linearGradient>` +
  `<linearGradient id="ke-bamboo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7fae3a"/><stop offset="0.6" stop-color="#b9d968"/><stop offset="1" stop-color="#d9ec98"/></linearGradient>`

/**
 * A banana plant standing on (x, y), `s` times its size: a green stem, big ragged leaves arching out of its top
 * (`crown` gets them, with `extra` drawn among them: a bunch, a young rolled leaf).
 */
export const bananaPlant = (x: number, y: number, s: number, crown: Crown, extra = '') => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  const top = y - k(150)
  let leavesM = ''
  for (const [i, a] of [-160, -120, -60, -20, 200].entries()) {
    const r = (a * Math.PI) / 180
    const len = k(i % 2 ? 110 : 96)
    const ex = Math.round(x + Math.cos(r) * len)
    const ey = Math.round(top + Math.sin(r) * len * 0.5 + k(40))
    const mx = Math.round((x + ex) / 2)
    const my = Math.round((top + ey) / 2 - k(40))
    leavesM +=
      `<path d="M${x} ${top}Q${mx} ${my - k(26)} ${ex} ${ey}Q${mx} ${my + k(18)} ${x} ${top}z" fill="url(#ke-banana-leaf)" ${Ow(1.8)}/>` +
      `<path d="M${x} ${top}Q${mx} ${my - k(4)} ${ex} ${ey}" fill="none" stroke="#2f7d34" stroke-width="${k(2)}"/>` +
      `<path d="M${Math.round(mx - k(8))} ${Math.round(my + k(4))}l${k(4)} ${k(10)}M${Math.round(mx + k(10))} ${Math.round(my + k(6))}l${k(2)} ${k(10)}" stroke="#2f7d34" stroke-width="${k(1.4)}"/>`
  }
  return (
    groundShadow(x, y, k(50), k(8)) +
    `<path d="M${x - k(12)} ${y}q${k(2)}-${k(80)} ${k(4)}-${k(150)}h${k(16)}q${k(2)} ${k(70)} ${k(4)} ${k(150)}z" fill="#7fae3a" ${O}/>` +
    `<path d="M${x - k(4)} ${y - k(10)}q${k(2)}-${k(60)} 0-${k(130)}" fill="none" stroke="#5c8a2a" stroke-width="${k(2)}"/>` +
    crown([x, top], leavesM + extra)
  )
}

/** A clump of bamboo standing on (x, y), `s` times its size: `n` jointed stalks with leaf sprays; `sway` moves each. */
export const bambooClump = (x: number, y: number, s: number, n: number, sway: (pivot: [number, number], m: string) => string) => {
  const k = (v: number) => Math.round(v * s * 10) / 10
  let m = groundShadow(x, y, k(60), k(8))
  for (let i = 0; i < n; i++) {
    const sx = Math.round(x - k(36) + i * k(72 / Math.max(1, n - 1)))
    const h = k(260 - (i % 3) * 40)
    let joints = ''
    for (let j = 1; j * k(40) < h; j++) joints += `<path d="M${sx - k(7)} ${y - j * k(40)}h${k(14)}" stroke="#5c8a2a" stroke-width="${k(3)}"/>`
    const sprays = [0.55, 0.8]
      .map((f, j) => {
        const lx = sx + (j % 2 ? k(6) : -k(6))
        const ly = Math.round(y - h * f)
        const d = j % 2 ? 1 : -1
        return `<path d="M${lx} ${ly}q${d * k(20)}-${k(4)} ${d * k(34)} ${k(6)}q-${d * k(18)} ${k(4)}-${d * k(34)}-${k(6)}zM${lx} ${ly}q${d * k(16)}-${k(14)} ${d * k(30)}-${k(16)}q-${d * k(14)} ${k(10)}-${d * k(30)} ${k(16)}z" fill="url(#ke-banana-leaf)" ${Ow(1.4)}/>`
      })
      .join('')
    m += sway([sx, y], `<rect x="${sx - k(7)}" y="${y - h}" width="${k(14)}" height="${h}" rx="${k(5)}" fill="url(#ke-bamboo)" ${Ow(1.8)}/>` + joints + sprays)
  }
  return m
}
