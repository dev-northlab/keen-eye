// Level validator: npm run check-levels
// TODO(stage 7): pixel comparison of rendered A/B to prove they differ only inside the zones
// (for zones that follow animations: inside the zone's positions in both pictures).
import { zoneCenter } from '../src/engine/animation.ts'
import type { Animation, Level } from '../src/engine/types.ts'
import { levels } from '../src/levels/index.ts'

/** Moving zones are checked at these times (seconds of animation). */
const SAMPLE_UNTIL_S = 120
const SAMPLE_STEP_S = 0.05

/** Allowed number of differences by level id (spec, section 7). */
function expectedDiffs(id: number): [min: number, max: number] {
  if (id <= 15) return [5, 5]
  if (id <= 50) return [6, 8]
  return [8, 12]
}

function check(level: Level, index: number): string[] {
  const errors: string[] = []
  const { w, h } = level.viewBox
  const ds = level.differences

  if (level.id !== index + 1) errors.push(`id ${level.id} is out of order (expected ${index + 1})`)

  const [min, max] = expectedDiffs(level.id)
  if (ds.length < min || ds.length > max) errors.push(`${ds.length} differences, expected ${min}–${max}`)

  let pictures: Map<string, Animation>[] = [new Map(), new Map()]
  if (level.kind === 'svg') {
    if (!level.build) return [...errors, 'svg level without build()']
    const a = level.build(0)
    const b = level.build(1)
    if (JSON.stringify(a) !== JSON.stringify(level.build(0))) errors.push('build(0) is not deterministic')
    if (JSON.stringify(a) === JSON.stringify(b)) errors.push('pictures A and B are identical')
    pictures = [a, b].map((p) => new Map(p.animations.map((anim) => [anim.id, anim])))
  } else if (!level.imageA || !level.imageB) {
    errors.push('image level without imageA/imageB')
  }

  ds.forEach((d, i) => {
    if (d.animatedId !== undefined && !pictures.some((p) => p.has(d.animatedId!)))
      errors.push(`zone #${i} follows unknown animation "${d.animatedId}"`)
  })

  // Zones are checked in each picture over time: moving zones must stay inside the
  // picture and never overlap other zones. Static levels need only t = 0.
  const moving = ds.some((d) => d.animatedId !== undefined)
  const reported = new Set<string>()
  // Each problem is reported once, at the first time it happens.
  const report = (problem: string, when: string) => {
    if (!reported.has(problem)) errors.push(`${problem} (${when})`)
    reported.add(problem)
  }
  for (let t = 0; t <= (moving ? SAMPLE_UNTIL_S : 0); t += SAMPLE_STEP_S) {
    pictures.forEach((anims, v) => {
      const when = `picture ${'AB'[v]}, t=${t.toFixed(2)}s`
      const zones = ds.map((d) => ({ ...zoneCenter(d, anims, t), r: d.r }))
      zones.forEach((z, i) => {
        if (z.x - z.r < 0 || z.y - z.r < 0 || z.x + z.r > w || z.y + z.r > h)
          report(`zone #${i} goes outside the ${w}×${h} viewBox`, when)
        for (let j = i + 1; j < zones.length; j++)
          if (Math.hypot(z.x - zones[j].x, z.y - zones[j].y) < z.r + zones[j].r)
            report(`zones #${i} and #${j} overlap`, when)
      })
    })
  }

  return errors
}

let failed = 0
levels.forEach((level, i) => {
  const errors = check(level, i)
  const moving = level.differences.filter((d) => d.animatedId !== undefined).length
  if (errors.length === 0) {
    console.log(`ok    level ${level.id} (${level.differences.length} differences, ${moving} moving zones)`)
    return
  }
  failed++
  console.log(`FAIL  level ${level.id}`)
  for (const e of errors) console.log(`        ${e}`)
})

console.log(failed ? `\n${failed} of ${levels.length} levels failed` : `\nAll ${levels.length} levels passed`)
process.exitCode = failed ? 1 : 0
