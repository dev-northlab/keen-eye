// Level previews: npm run preview-levels [-- <level id> ...]
// Writes previews/level-NNN.png: picture A | picture B with the difference zones outlined.
import { mkdirSync, writeFileSync } from 'node:fs'
import { zoneCenter } from '../src/engine/animation.ts'
import { levels } from '../src/levels/index.ts'
import { posedSvg, rasterize } from './render.ts'

/** Animation moment shown in the previews (seconds). */
const T = 1.6
const GAP = 10
const OUT = 'previews'

const ids = process.argv.slice(2).map(Number)
mkdirSync(OUT, { recursive: true })
for (const level of levels) {
  if (ids.length > 0 && !ids.includes(level.id)) continue
  if (level.kind !== 'svg' || !level.build) continue
  const { w, h } = level.viewBox
  const pictures = [level.build(0), level.build(1)].map((scene, v) => {
    const anims = new Map(scene.animations.map((a) => [a.id, a]))
    const zones = level.differences
      .map((d, i) => {
        const c = zoneCenter(d, anims, T)
        return (
          `<circle cx="${c.x}" cy="${c.y}" r="${d.r}" fill="none" stroke="#e11d48" stroke-width="2.5"/>` +
          `<text x="${c.x}" y="${c.y - d.r - 4}" font-size="14" text-anchor="middle" fill="#e11d48">${i}</text>`
        )
      })
      .join('')
    return `<g transform="translate(${v * (w + GAP)} 0)"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${posedSvg(scene, T)}${zones}</svg></g>`
  })
  const png = rasterize(`<rect width="${2 * w + GAP}" height="${h}" fill="#333"/>${pictures.join('')}`, 2 * w + GAP, h).asPng()
  const file = `${OUT}/level-${String(level.id).padStart(3, '0')}.png`
  writeFileSync(file, png)
  console.log(file)
}
