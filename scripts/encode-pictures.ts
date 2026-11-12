// Encodes the game's pictures: a folder outside the project holds them as WebP (the sources, edited by hand, laid out as
// in `public/`; on the developer's machine ~/Pictures/keen-eye), `public/` gets them at the same path as AVIF, crf 26
// (libaom-av1, cpu-used 4 — the setting checked on a phone with the test levels). Transparent pictures (the icons, the
// keys of redesigned levels) are small and stay WebP: they are copied as they are. A picture whose output is newer than
// its source is skipped; `--force` encodes everything again. `levels/test/` is left out: the test levels keep their own
// files to compare formats. The banner pictures (`banners/`) are scaled down to BANNER_WIDTH: `PhotoBanner` shows them
// 280×112 CSS px, so 750×300 is about a phone's pixels, and fewer pixels decode faster.
//
// Picture B of a redesigned level with `patchesB` (levels/picture-style.ts `zonePatches`) is not encoded whole: its
// cut-outs are, one per zone — B's pixels where they differ from A (grown a little and fading out, so no seam shows on
// A's picture) and nothing past the zone's circle grown by PATCH_MARGIN, as WebP with alpha.
//
//   npm run encode-pictures -- <source folder> [--force] [<path under it> ...]
import { execFile, spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { basename, dirname, join, relative } from 'node:path'
import { promisify } from 'node:util'
import type { Difference, ImagePatch, LevelPictures } from '../src/engine/types.ts'
import { allLevels } from '../src/levels/index.ts'
import { PATCH_MARGIN } from '../src/levels/picture-style.ts'
import { upcomingLevels } from '../src/levels/upcoming.ts'

const run = promisify(execFile)
const args = process.argv.slice(2)
const force = args.includes('--force')
const [SOURCE, ...paths] = args.filter((a) => a !== '--force')
if (!SOURCE || !existsSync(SOURCE)) {
  console.error('usage: npm run encode-pictures -- <source folder> [--force] [<path under it> ...]')
  process.exit(1)
}
const TARGET = 'public'
const SKIP = join(SOURCE, 'levels', 'test')
const only = paths.map((a) => join(SOURCE, a))
const BANNERS = join(SOURCE, 'banners')
const BANNER_WIDTH = 750

/** Patched pictures B by their source path: the level's pictures. */
const patched = new Map<string, LevelPictures>()
for (const level of [...allLevels, ...upcomingLevels]) {
  const p = level.redesign
  if (p?.patchesB) patched.set(join(SOURCE, p.patchesB[0].href.replace(/-1\.webp$/, '.webp')), p)
}

function sources(dir: string): string[] {
  if (dir === SKIP) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name)
    if (e.isDirectory()) return sources(path)
    return e.name.endsWith('.webp') ? [path] : []
  })
}

async function transparent(file: string): Promise<boolean> {
  const { stdout } = await run('ffprobe', ['-v', 'error', '-show_entries', 'stream=pix_fmt', '-of', 'csv=p=0', file])
  const format = stdout.trim()
  return format.includes('a') && format !== 'gray'
}

const newer = (output: string, ...inputs: string[]) =>
  !force && existsSync(output) && inputs.every((i) => statSync(output).mtimeMs >= statSync(i).mtimeMs)

async function encode(source: string): Promise<string[]> {
  const base = join(TARGET, relative(SOURCE, source)).replace(/\.webp$/, '')
  const pictures = patched.get(source)
  if (pictures) {
    if (existsSync(`${base}.avif`)) rmSync(`${base}.avif`)
    return makePatches(source, pictures)
  }
  const keepWebp = await transparent(source)
  const output = `${base}.${keepWebp ? 'webp' : 'avif'}`
  const stale = `${base}.${keepWebp ? 'avif' : 'webp'}`
  if (existsSync(stale)) rmSync(stale)
  // Cut-outs of a picture B that is whole again.
  const cutOut = new RegExp(`^${basename(base)}-\\d+\\.webp$`)
  if (existsSync(dirname(base))) for (const f of readdirSync(dirname(base))) if (cutOut.test(f)) rmSync(join(dirname(base), f))
  if (newer(output, source)) return []
  mkdirSync(dirname(output), { recursive: true })
  if (keepWebp) copyFileSync(source, output)
  else {
    const scale = source.startsWith(`${BANNERS}/`) ? ['-vf', `scale='min(iw,${BANNER_WIDTH})':-2:flags=lanczos`] : []
    await run('ffmpeg', ['-v', 'error', '-y', '-i', source, ...scale, '-c:v', 'libaom-av1', '-crf', '26', '-b:v', '0',
      '-still-picture', '1', '-cpu-used', '4', '-pix_fmt', 'yuv420p', output])
  }
  return [output]
}

interface Pixels {
  w: number
  h: number
  data: Buffer
}

async function decode(file: string, w: number, h: number): Promise<Pixels> {
  const { stdout } = await run('ffmpeg', ['-v', 'error', '-i', file, '-f', 'rawvideo', '-pix_fmt', 'rgba', '-'], {
    encoding: 'buffer',
    maxBuffer: w * h * 4 + 1024,
  })
  if (stdout.length !== w * h * 4) throw new Error(`${file}: not ${w}×${h}`)
  return { w, h, data: stdout }
}

function encodeWebp(rgba: Buffer, w: number, h: number, output: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${w}x${h}`, '-i', '-',
      '-c:v', 'libwebp', '-quality', '90', '-pix_fmt', 'yuva420p', output])
    ffmpeg.on('error', reject)
    ffmpeg.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg ${output}: exit ${code}`))))
    ffmpeg.stdin.end(rgba)
  })
}

/** A colour channel differs by more than this between A and B: the change (WebP noise stays below). */
const THRESHOLD = 16
/** The change is grown by this many pixels (soft edges, antialiasing), then faded out over as many. */
const GROW = 6
const FADE = 6

async function makePatches(sourceB: string, pictures: LevelPictures): Promise<string[]> {
  const sourceA = join(SOURCE, pictures.imageA.replace(/\.avif$/, '.webp'))
  const patches = pictures.patchesB!
  const outputs = patches.map((p) => join(TARGET, p.href))
  if (outputs.every((o) => newer(o, sourceA, sourceB))) return []
  const { w, h } = pictures.viewBox
  const [a, b] = await Promise.all([decode(sourceA, w, h), decode(sourceB, w, h)])
  await Promise.all(patches.map((p, i) => encodeWebp(cutOut(a, b, p, pictures.differences[i]), p.w, p.h, outputs[i])))
  return outputs
}

/** Picture B's pixels in the box, opaque where B differs from A (grown and faded), transparent past the zone's grown circle. */
function cutOut(a: Pixels, b: Pixels, box: ImagePatch, zone: Difference): Buffer {
  const { w, h } = box
  let mask: Float32Array = new Float32Array(w * h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const at = ((box.y + y) * a.w + box.x + x) * 4
      const d = Math.max(Math.abs(a.data[at] - b.data[at]), Math.abs(a.data[at + 1] - b.data[at + 1]), Math.abs(a.data[at + 2] - b.data[at + 2]))
      mask[y * w + x] = d > THRESHOLD ? 1 : 0
    }
  }
  mask = boxFilter(mask, w, h, GROW, Math.max)
  mask = boxFilter(boxFilter(mask, w, h, FADE / 2, sum), w, h, FADE / 2, sum)
  const rgba = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const at = ((box.y + y) * b.w + box.x + x) * 4
      const i = y * w + x
      // Inside the grown circle only, fading over its last FADE pixels.
      const edge = Math.min(1, Math.max(0, (zone.r + PATCH_MARGIN - Math.hypot(box.x + x + 0.5 - zone.x, box.y + y + 0.5 - zone.y)) / FADE))
      b.data.copy(rgba, i * 4, at, at + 3)
      rgba[i * 4 + 3] = Math.round(255 * Math.min(1, mask[i]) * edge)
    }
  }
  return rgba
}

const sum = (x: number, y: number) => x + y

/**
 * Separable box filter of radius r: `Math.max` grows the mask, `sum` (averaged) blurs it. Edges reuse the nearest
 * pixel, so a change cut by the box's border stays opaque up to it.
 */
function boxFilter(src: Float32Array, w: number, h: number, r: number, op: (x: number, y: number) => number): Float32Array {
  const pass = (from: Float32Array, horizontal: boolean) => {
    const to = new Float32Array(w * h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let acc = op === sum ? 0 : -Infinity
        for (let k = -r; k <= r; k++) {
          const xx = horizontal ? Math.min(w - 1, Math.max(0, x + k)) : x
          const yy = horizontal ? y : Math.min(h - 1, Math.max(0, y + k))
          acc = op(acc, from[yy * w + xx])
        }
        to[y * w + x] = op === sum ? acc / (2 * r + 1) : acc
      }
    }
    return to
  }
  return pass(pass(src, true), false)
}

const files = sources(SOURCE).filter((f) => only.length === 0 || only.some((o) => f === o || f.startsWith(`${o}/`)))
let next = 0
let done = 0
// libaom uses a few threads per picture; a couple of pictures at a time keeps every core busy.
const workers = Array.from({ length: Math.max(1, Math.floor(availableParallelism() / 2)) }, async () => {
  while (next < files.length) {
    const source = files[next++]
    const outputs = await encode(source)
    done++
    for (const output of outputs) console.log(`[${done}/${files.length}] ${output}`)
  }
})
await Promise.all(workers)
console.log(`${files.length} pictures checked`)
