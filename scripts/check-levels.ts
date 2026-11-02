// Level validator: npm run check-levels
import { zoneCenter } from '../src/engine/animation.ts'
import type { Animation, Level, SceneSvg } from '../src/engine/types.ts'
import { chapterOf } from '../src/levels/chapters.ts'
import { difficultyOf } from '../src/levels/difficulty.ts'
import { levels } from '../src/levels/index.ts'
import { posedSvg, rasterize } from './render.ts'

/** Moving zones are checked geometrically at these times (seconds of animation). */
const SAMPLE_UNTIL_S = 120
const SAMPLE_STEP_S = 0.05
/** Pictures are compared pixel by pixel at these times (only t = 0 for levels without animation). */
const PIXEL_TIMES_S = [0, 0.37, 0.9, 1.6, 2.45, 3.3, 4.75, 6.1, 7.9, 10.3]
/** A pixel differs when the summed RGB difference exceeds this (ignores rounding noise). */
const PIXEL_THRESHOLD = 8
/** Anti-aliasing may spill this far outside a zone circle. */
const ZONE_TOLERANCE_PX = 2
/** A zone must show at least this many differing pixels at some sampled time. */
const MIN_VISIBLE_PX = 40

type Zone = { x: number; y: number; r: number }

/**
 * Renders A and B at the sampled times and checks that they differ only inside
 * the zones (in either picture's zone positions) and that every zone really
 * shows a difference.
 */
function comparePixels(level: Level, a: SceneSvg, b: SceneSvg, pictures: Map<string, Animation>[], report: Report) {
  const { w, h } = level.viewBox
  const ds = level.differences
  const animated = a.animations.length > 0 || b.animations.length > 0
  const times = animated ? PIXEL_TIMES_S : [0]
  const perZone = times.map(() => ds.map(() => 0))

  times.forEach((t, ti) => {
    const pa = rasterize(posedSvg(a, t), w, h).pixels
    const pb = rasterize(posedSvg(b, t), w, h).pixels
    const zones: Zone[][] = pictures.map((anims) => ds.map((d) => ({ ...zoneCenter(d, anims, t), r: d.r })))
    let outside = 0
    let box = { x0: w, y0: h, x1: 0, y1: 0 }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const k = (y * w + x) * 4
        if (Math.abs(pa[k] - pb[k]) + Math.abs(pa[k + 1] - pb[k + 1]) + Math.abs(pa[k + 2] - pb[k + 2]) <= PIXEL_THRESHOLD)
          continue
        const px = x + 0.5
        const py = y + 0.5
        const inside = (z: Zone) => (px - z.x) ** 2 + (py - z.y) ** 2 <= (z.r + ZONE_TOLERANCE_PX) ** 2
        const i = ds.findIndex((_, i) => inside(zones[0][i]) || inside(zones[1][i]))
        if (i >= 0) {
          perZone[ti][i]++
          continue
        }
        outside++
        box = { x0: Math.min(box.x0, x), y0: Math.min(box.y0, y), x1: Math.max(box.x1, x), y1: Math.max(box.y1, y) }
      }
    }
    if (outside > 0)
      report(
        'pictures differ outside the zones',
        `${outside} px in x ${box.x0}–${box.x1}, y ${box.y0}–${box.y1}, t=${t}s`,
      )
  })

  ds.forEach((_, i) => {
    const counts = perZone.map((z) => z[i])
    if (Math.max(...counts) < MIN_VISIBLE_PX) report(`zone #${i} shows no visible difference`, `max ${Math.max(...counts)} px`)
  })
}

type Report = (problem: string, detail: string) => void

function check(level: Level, index: number): { errors: string[]; motion: number } {
  const errors: string[] = []
  // Each problem is reported once, with the details of its first occurrence.
  const reported = new Set<string>()
  const report: Report = (problem, detail) => {
    if (!reported.has(problem)) errors.push(`${problem} (${detail})`)
    reported.add(problem)
  }
  const { w, h } = level.viewBox
  const ds = level.differences

  if (level.id !== index + 1) errors.push(`id ${level.id} is out of order (expected ${index + 1})`)
  const chapter = chapterOf(level.id)
  if (!chapter) errors.push(`no chapter covers level ${level.id}`)
  else if (chapter.id !== level.chapter) errors.push(`chapter "${level.chapter}", expected "${chapter.id}" (chapters.ts)`)

  const { differences: [min, max], motion: [mmin, mmax], minRadius, minGap = 0 } = difficultyOf(level.id)
  if (ds.length < min || ds.length > max) errors.push(`${ds.length} differences, expected ${min}–${max}`)
  ds.forEach((d, i) => d.r < minRadius && errors.push(`zone #${i} r${d.r} is too small for level ${level.id} (min ${minRadius})`))

  if (level.kind !== 'svg') {
    if (!level.imageA || !level.imageB) errors.push('image level without imageA/imageB')
    return { errors, motion: 0 }
  }
  if (!level.build) return { errors: [...errors, 'svg level without build()'], motion: 0 }
  const a = level.build(0)
  const b = level.build(1)
  if (JSON.stringify(a) !== JSON.stringify(level.build(0))) errors.push('build(0) is not deterministic')
  // resvg (validator, previews) reads `rgb(r g b / a)` as black while browsers show it: use fill-opacity.
  if (/rgba?\([^)]*\//.test(a.svg + b.svg)) errors.push('CSS "rgb(r g b / a)" color: use fill-opacity / stroke-opacity')
  const pictures = [a, b].map((p) => new Map(p.animations.map((anim) => [anim.id, anim])))

  ds.forEach((d, i) => {
    if (d.animatedId !== undefined && !pictures.some((p) => p.has(d.animatedId!)))
      errors.push(`zone #${i} follows unknown animation "${d.animatedId}"`)
  })

  // Zones are checked in each picture over time: moving zones must stay inside the
  // picture and never overlap other zones. Static levels need only t = 0.
  const moving = ds.some((d) => d.animatedId !== undefined)
  for (let t = 0; t <= (moving ? SAMPLE_UNTIL_S : 0); t += SAMPLE_STEP_S) {
    pictures.forEach((anims, v) => {
      const when = `picture ${'AB'[v]}, t=${t.toFixed(2)}s`
      const zones = ds.map((d) => ({ ...zoneCenter(d, anims, t), r: d.r }))
      zones.forEach((z, i) => {
        if (z.x - z.r < 0 || z.y - z.r < 0 || z.x + z.r > w || z.y + z.r > h)
          report(`zone #${i} goes outside the ${w}×${h} viewBox`, when)
        for (let j = i + 1; j < zones.length; j++) {
          const gap = Math.hypot(z.x - zones[j].x, z.y - zones[j].y)
          if (gap < z.r + zones[j].r) report(`zones #${i} and #${j} overlap`, when)
          else if (gap < minGap) report(`zones #${i} and #${j} are closer than ${minGap}`, when)
        }
      })
    })
  }

  comparePixels(level, a, b, pictures, report)

  const motion = ds.filter((d) => d.motion).length
  if (motion < mmin || motion > mmax) errors.push(`${motion} motion differences, expected ${mmin}–${mmax}`)

  return { errors, motion }
}

// Optional level ids to check (npm run check-levels -- 81 82); all levels by default.
const ids = process.argv.slice(2).map(Number)
const selected = levels.filter((l) => ids.length === 0 || ids.includes(l.id))

let failed = 0
selected.forEach((level) => {
  const i = levels.indexOf(level)
  const { errors, motion } = check(level, i)
  if (errors.length === 0) {
    console.log(`ok    level ${level.id} (${level.differences.length} differences, ${motion} in motion)`)
    return
  }
  failed++
  console.log(`FAIL  level ${level.id}`)
  for (const e of errors) console.log(`        ${e}`)
})

console.log(failed ? `\n${failed} of ${selected.length} levels failed` : `\nAll ${selected.length} levels passed`)
process.exitCode = failed ? 1 : 0
