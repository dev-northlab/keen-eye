// Level previews: npm run preview-levels [-- [--extras] <level id> ...]
// Writes previews/level-NNN.png: picture A | picture B with the difference zones outlined
// (and the traps of "time" levels, dashed blue; the hidden key's tap zone, dashed gold). `--extras`: the
// pictures of normal mode with their extra objects (docs/extra-objects.md), dashed green, into level-NNN-extras.png.
import { mkdirSync, writeFileSync } from 'node:fs'
import { zoneCenter } from '../src/engine/animation.ts'
import { allLevels } from '../src/levels/index.ts'
import { upcomingLevels } from '../src/levels/upcoming.ts'
import { posedSvg, rasterize } from './render.ts'

/** Animation moment shown in the previews (seconds). */
const T = 1.6
const GAP = 10
const OUT = 'previews'

const args = process.argv.slice(2)
const withExtras = args.includes('--extras')
const ids = args.filter((a) => a !== '--extras').map(Number)
mkdirSync(OUT, { recursive: true })
for (const level of [...allLevels, ...upcomingLevels]) {
  if (ids.length > 0 && !ids.includes(level.id)) continue
  if (level.kind !== 'svg' || !level.build || (withExtras && !level.extras)) continue
  const { w, h } = level.viewBox
  const pictures = [level.build(0, 0, withExtras), level.build(1, 1, withExtras)].map((scene, v) => {
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
    const traps = (level.traps ?? [])
      .map((t) => `<circle cx="${t.x}" cy="${t.y}" r="${t.r}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6 4"/>`)
      .join('')
    const s = level.secret
    const secret = s && (s.on === 'both' || v === 1)
      ? `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4 3"/>`
      : ''
    const extras = withExtras
      ? level.extras!.map((e) => `<circle cx="${e.x}" cy="${e.y}" r="${e.r}" fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="5 4"/>`).join('')
      : ''
    return `<g transform="translate(${v * (w + GAP)} 0)"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${posedSvg(scene, T)}${zones}${traps}${secret}${extras}</svg></g>`
  })
  const png = rasterize(`<rect width="${2 * w + GAP}" height="${h}" fill="#333"/>${pictures.join('')}`, 2 * w + GAP, h).asPng()
  const file = `${OUT}/level-${String(level.id).padStart(3, '0')}${withExtras ? '-extras' : ''}.png`
  writeFileSync(file, png)
  console.log(file)
}
