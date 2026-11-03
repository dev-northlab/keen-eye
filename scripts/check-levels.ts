// Level validator: npm run check-levels
import { zoneCenter } from '../src/engine/animation.ts'
import type { Animation, Level, SceneSvg } from '../src/engine/types.ts'
import { chapterOf, DETECTIVE_CHAPTER, MEMORY_CHAPTER, TIME_CHAPTER, TRAVEL_CHAPTER, TREASURY_CHAPTER } from '../src/levels/chapters.ts'
import { detectiveLevels } from '../src/levels/detective/index.ts'
import { difficultyOf } from '../src/levels/difficulty.ts'
import { levels, treasuryLevel } from '../src/levels/index.ts'
import { memoryLevels } from '../src/levels/memory/index.ts'
import { travelLevels } from '../src/levels/travel/index.ts'
import { timeLevels } from '../src/levels/time/index.ts'
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
/** The hidden key shows at least this many pixels, and at most this share of itself: part of it is covered. */
const SECRET_MIN_VISIBLE_PX = 25
const SECRET_MAX_SHOWN = 0.75

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
        // A "memory" level's key is drawn on B only: not a difference.
        if (level.secret?.on === 'b' && inside(level.secret)) continue
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

/** Differing pixels of A and B at t = 0 inside each zone. */
function pixelsInZones(level: Level, a: SceneSvg, b: SceneSvg, zones: Zone[]): number[] {
  const { w, h } = level.viewBox
  const pa = rasterize(posedSvg(a, 0), w, h).pixels
  const pb = rasterize(posedSvg(b, 0), w, h).pixels
  return zones.map((z) => {
    let n = 0
    for (let y = Math.max(0, Math.floor(z.y - z.r)); y < Math.min(h, z.y + z.r); y++) {
      for (let x = Math.max(0, Math.floor(z.x - z.r)); x < Math.min(w, z.x + z.r); x++) {
        if ((x + 0.5 - z.x) ** 2 + (y + 0.5 - z.y) ** 2 > z.r ** 2) continue
        const k = (y * w + x) * 4
        if (Math.abs(pa[k] - pb[k]) + Math.abs(pa[k + 1] - pb[k + 1]) + Math.abs(pa[k + 2] - pb[k + 2]) > PIXEL_THRESHOLD) n++
      }
    }
    return n
  })
}

/**
 * "Time" levels: the traps are where the natural changes show (A against B's moment drawn with
 * A's differences) and keep clear of the difference zones and of each other.
 */
function checkTraps(level: Level, a: SceneSvg, aAtB: SceneSvg, range: [number, number] | undefined, errors: string[]) {
  const { w, h } = level.viewBox
  const traps = level.traps ?? []
  if (!level.pair) errors.push('"time" level without a pair')
  if (!range) {
    errors.push('no trap range in difficulty.ts')
    return
  }
  if (traps.length < range[0] || traps.length > range[1]) errors.push(`${traps.length} traps, expected ${range[0]}–${range[1]}`)
  traps.forEach((t, i) => {
    if (t.x - t.r < 0 || t.y - t.r < 0 || t.x + t.r > w || t.y + t.r > h) errors.push(`trap #${i} goes outside the ${w}×${h} viewBox`)
    level.differences.forEach((d, j) => {
      if (Math.hypot(t.x - d.x, t.y - d.y) < t.r + d.r) errors.push(`trap #${i} overlaps zone #${j}`)
    })
    for (let j = i + 1; j < traps.length; j++)
      if (Math.hypot(t.x - traps[j].x, t.y - traps[j].y) < t.r + traps[j].r) errors.push(`traps #${i} and #${j} overlap`)
  })
  pixelsInZones(level, a, aAtB, traps).forEach((n, i) => {
    if (n < MIN_VISIBLE_PX) errors.push(`trap #${i} ("${traps[i].hint}") shows no natural change (${n} px)`)
  })
}

/**
 * The hidden key (docs/hidden-item-feature.md) keeps clear of the traps, really shows (the picture it
 * is drawn on differs from the same picture without it inside the tap zone) and is partly covered (it
 * shows less than when drawn on top of everything). Zones over time are checked with the zones.
 */
function checkSecret(level: Level, scene: SceneSvg, errors: string[]) {
  const s = level.secret!
  const { w, h } = level.viewBox
  if (s.x - s.r < 0 || s.y - s.r < 0 || s.x + s.r > w || s.y + s.r > h) errors.push(`the secret key goes outside the ${w}×${h} viewBox`)
  if (s.on !== (level.memory ? 'b' : 'both')) errors.push(`the secret key is on "${s.on}", expected ${level.memory ? 'B only' : 'both pictures'}`)
  ;(level.traps ?? []).forEach((t, i) => {
    if (Math.hypot(t.x - s.x, t.y - s.y) < t.r + s.r) errors.push(`the secret key overlaps trap #${i}`)
  })
  const key = scene.svg.match(/<g data-secret=""[^>]*>.*?<\/g><\/g>/)?.[0]
  if (!key) {
    errors.push('the secret key is not drawn: use secret()')
    return
  }
  const without = { ...scene, svg: scene.svg.replace(key, '') }
  const onTop = { ...without, svg: without.svg + key }
  const [shown, whole] = pixelsInZones(level, scene, without, [s]).concat(pixelsInZones(level, onTop, without, [s]))
  if (shown < SECRET_MIN_VISIBLE_PX) errors.push(`the secret key is hidden (${shown} px visible)`)
  else if (shown > whole * SECRET_MAX_SHOWN)
    errors.push(`the secret key is too easy: ${shown} of its ${whole} px show, cover at least ${Math.round((1 - SECRET_MAX_SHOWN) * 100)}%`)
}

type Report = (problem: string, detail: string) => void

function check(level: Level, expectedId: number): { errors: string[]; motion: number } {
  const errors: string[] = []
  // Each problem is reported once, with the details of its first occurrence.
  const reported = new Set<string>()
  const report: Report = (problem, detail) => {
    if (!reported.has(problem)) errors.push(`${problem} (${detail})`)
    reported.add(problem)
  }
  const { w, h } = level.viewBox
  const ds = level.differences

  if (level.id !== expectedId) errors.push(`id ${level.id} is out of order (expected ${expectedId})`)
  const chapter = chapterOf(level.id)
  if (!chapter) errors.push(`no chapter covers level ${level.id}`)
  else if (chapter.id !== level.chapter) errors.push(`chapter "${level.chapter}", expected "${chapter.id}" (chapters.ts)`)

  const { differences: [min, max], motion: [mmin, mmax], minRadius, minGap = 0, traps, showSeconds } = difficultyOf(level.id)
  const timed = level.chapter === TIME_CHAPTER.id
  if (!timed && (level.pair || level.traps)) errors.push('pair/traps on a level outside the "time" category')
  if ((level.chapter === MEMORY_CHAPTER.id) !== !!level.memory) errors.push('"memory" rules belong to exactly the "memory" category')
  else if (level.memory && level.memory.showSeconds !== showSeconds)
    errors.push(`shows A for ${level.memory.showSeconds} s, expected ${showSeconds} (difficulty.ts)`)
  if ((level.chapter === TRAVEL_CHAPTER.id) !== !!level.travel) errors.push('a "travel" place belongs to exactly the "travel" category')
  if ((level.chapter === DETECTIVE_CHAPTER.id) !== !!level.detective) errors.push('a "detective" case belongs to exactly the "detective" category')
  else if (level.detective && level.detective.clues.length !== level.differences.length) errors.push('every difference needs a clue: draw them with clue()')
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
        const s = level.secret
        if (s && Math.hypot(z.x - s.x, z.y - s.y) < z.r + s.r) report(`the secret key overlaps zone #${i}`, when)
      })
    })
  }
  if (level.secret) checkSecret(level, b, errors)

  if (timed) {
    // The moments change the whole picture: differences are compared at B's moment, traps at A's.
    const aAtB = level.build(0, 1)
    comparePixels(level, aAtB, b, pictures, report)
    checkTraps(level, a, aAtB, traps, errors)
  } else comparePixels(level, a, b, pictures, report)

  const motion = ds.filter((d) => d.motion).length
  if (motion < mmin || motion > mmax) errors.push(`${motion} motion differences, expected ${mmin}–${mmax}`)

  return { errors, motion }
}

// Optional level ids to check (npm run check-levels -- 81 82); all levels by default.
const ids = process.argv.slice(2).map(Number)
// Ids run on without gaps: the worlds from 1, each category from its first id.
const expected = new Map([
  ...levels.map((l, i) => [l, i + 1] as const),
  ...timeLevels.map((l, i) => [l, TIME_CHAPTER.ranges[0][0] + i] as const),
  ...memoryLevels.map((l, i) => [l, MEMORY_CHAPTER.ranges[0][0] + i] as const),
  ...travelLevels.map((l, i) => [l, TRAVEL_CHAPTER.ranges[0][0] + i] as const),
  ...detectiveLevels.map((l, i) => [l, DETECTIVE_CHAPTER.ranges[0][0] + i] as const),
  [treasuryLevel, TREASURY_CHAPTER.ranges[0][0]] as const,
])
const selected = [...expected.keys()].filter((l) => ids.length === 0 || ids.includes(l.id))

let failed = 0
selected.forEach((level) => {
  const { errors, motion } = check(level, expected.get(level)!)
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
