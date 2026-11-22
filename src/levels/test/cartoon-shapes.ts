// Drawing helpers of the cartoon spike levels (docs/cartoon-spike.md): characters with an ink outline, drawn at their
// rest position, and the keyframe helpers that make them walk.
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
    `<ellipse cx="${x}" cy="${y - 23}" rx="30" ry="15" fill="${fur}" ${O}/>` +
    `<path d="M${x - 10} ${y - 37}q3 8 0 14M${x} ${y - 38}q3 8 0 14M${x - 20} ${y - 33}q3 6 1 11" fill="none" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>` +
    `<ellipse cx="${x + 4}" cy="${y - 15}" rx="17" ry="6" fill="#fde3b8"/>` +
    leg(x - 11, fur, legs?.back) +
    leg(x + 21, fur, legs?.front) +
    // Head
    `<path d="M${x + 14} ${y - 48}l1-17l11 9z" fill="${fur}" ${O}/>` +
    `<path d="M${x + 29} ${y - 56}l9-12l3 16z" fill="${fur}" ${O}/>` +
    `<path d="M${x + 17} ${y - 58}l0-4l4 3z M${x + 33} ${y - 60}l4-5l1 6z" fill="#f7a6b4"/>` +
    `<circle cx="${x + 27}" cy="${y - 42}" r="15.5" fill="${fur}" ${O}/>` +
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

/** Wraps a tree's crown so it can sway (pivot: the top of its trunk). */
type Crown = (pivot: [number, number], markup: string) => string

/** An apple on (x, y). */
export const apple = (x: number, y: number, r = 7) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#e63946" ${Ow(1.5)}/><path d="M${x} ${y - r}l2-5" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
  `<circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.25}" fill="#fff" fill-opacity="0.6"/>`

/** An apple tree standing on (x, y), `s` times its size: a round, layered crown full of apples. */
export const appleTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    `<path d="M${x - k(12)} ${y}q${k(5)}-${k(70)}-${k(3)}-${k(130)}h${k(24)}q-${k(8)} ${k(60)} ${k(3)} ${k(130)}z" fill="#8a5a2b" ${O}/>` +
    crown(
      [x, y - k(120)],
      `<circle cx="${x - k(40)}" cy="${y - k(150)}" r="${k(48)}" fill="#4caf50" ${O}/>` +
        `<circle cx="${x + k(38)}" cy="${y - k(160)}" r="${k(46)}" fill="#5cbf55" ${O}/>` +
        `<circle cx="${x}" cy="${y - k(200)}" r="${k(54)}" fill="#66c25a" ${O}/>` +
        apple(x - k(52), y - k(140), k(7)) + apple(x - k(14), y - k(176), k(7)) + apple(x + k(30), y - k(140), k(7)) +
        apple(x + k(14), y - k(226), k(7)) + apple(x + k(56), y - k(178), k(7)) + apple(x - k(34), y - k(206), k(7)),
    )
  )
}

/** A fir tree standing on (x, y), `s` times its size. */
export const pineTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    `<rect x="${x - k(8)}" y="${y - k(30)}" width="${k(16)}" height="${k(30)}" fill="#7a4f28" ${O}/>` +
    crown(
      [x, y - k(30)],
      `<path d="M${x} ${y - k(150)}l${k(36)} ${k(50)}h-${k(14)}l${k(30)} ${k(40)}h-${k(14)}l${k(34)} ${k(40)}h-${k(144)}l${k(34)}-${k(40)}h-${k(14)}l${k(30)}-${k(40)}h-${k(14)}z" fill="#2f8a4a" ${O}/>` +
        `<path d="M${x} ${y - k(140)}l-${k(18)} ${k(30)}M${x - k(8)} ${y - k(90)}l-${k(24)} ${k(28)}M${x - k(10)} ${y - k(50)}l-${k(30)} ${k(14)}" stroke="#3fa45a" stroke-width="${k(4)}" stroke-linecap="round"/>`,
    )
  )
}

/** A birch standing on (x, y), `s` times its size: white trunk with dark marks, a light airy crown. */
export const birchTree = (x: number, y: number, s: number, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    `<path d="M${x - k(7)} ${y}l${k(2)}-${k(150)}h${k(10)}l${k(2)} ${k(150)}z" fill="#f4f1ea" ${O}/>` +
    `<path d="M${x - k(5)} ${y - k(30)}h${k(6)}M${x} ${y - k(62)}h${k(5)}M${x - k(4)} ${y - k(96)}h${k(6)}M${x + k(1)} ${y - k(124)}h${k(4)}" stroke="${INK}" stroke-width="${k(3)}" stroke-linecap="round"/>` +
    crown(
      [x, y - k(140)],
      `<ellipse cx="${x - k(22)}" cy="${y - k(160)}" rx="${k(30)}" ry="${k(26)}" fill="#9bd16a" ${O}/>` +
        `<ellipse cx="${x + k(24)}" cy="${y - k(170)}" rx="${k(30)}" ry="${k(28)}" fill="#a9db78" ${O}/>` +
        `<ellipse cx="${x}" cy="${y - k(200)}" rx="${k(32)}" ry="${k(30)}" fill="#b6e384" ${O}/>`,
    )
  )
}

/** A round tree standing on (x, y), `s` times its size, crown of `color`. */
export const roundTree = (x: number, y: number, s: number, color: string, crown: Crown) => {
  const k = (n: number) => Math.round(n * s * 10) / 10
  return (
    `<path d="M${x - k(9)} ${y}q${k(4)}-${k(50)}-${k(2)}-${k(90)}h${k(20)}q-${k(6)} ${k(40)} ${k(2)} ${k(90)}z" fill="#8a5a2b" ${O}/>` +
    crown([x, y - k(90)], `<circle cx="${x}" cy="${y - k(130)}" r="${k(52)}" fill="${color}" ${O}/><path d="M${x - k(30)} ${y - k(150)}q${k(14)}-${k(20)} ${k(34)}-${k(18)}" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="${k(6)}" stroke-linecap="round"/>`)
  )
}

/** A tuft of grass on (x, y). */
export const grassTuft = (x: number, y: number) =>
  `<path d="M${x - 6} ${y}q2-12 0-18M${x} ${y}q1-16 4-22M${x + 6} ${y}q-1-10 4-14" fill="none" stroke="#3f8f3a" stroke-width="2.6" stroke-linecap="round"/>`
