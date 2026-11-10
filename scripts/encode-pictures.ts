// Encodes the game's pictures: a folder outside the project holds them as WebP (the sources, edited by hand, laid out as
// in `public/`; on the developer's machine ~/Pictures/keen-eye), `public/` gets them at the same path as AVIF, crf 26
// (libaom-av1, cpu-used 4 — the setting checked on a phone with test level 1007). Transparent pictures (the icons, the
// keys of redesigned levels) are small and stay WebP: they are copied as they are. A picture whose output is newer than
// its source is skipped; `--force` encodes everything again. `levels/test/` is left out: the test levels keep their own
// files to compare formats.
//
//   npm run encode-pictures -- <source folder> [--force] [<path under it> ...]
import { execFile } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { promisify } from 'node:util'

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

async function encode(source: string): Promise<string> {
  const base = join(TARGET, relative(SOURCE, source)).replace(/\.webp$/, '')
  const keepWebp = await transparent(source)
  const output = `${base}.${keepWebp ? 'webp' : 'avif'}`
  const stale = `${base}.${keepWebp ? 'avif' : 'webp'}`
  if (existsSync(stale)) rmSync(stale)
  if (!force && existsSync(output) && statSync(output).mtimeMs >= statSync(source).mtimeMs) return ''
  mkdirSync(dirname(output), { recursive: true })
  if (keepWebp) copyFileSync(source, output)
  else {
    await run('ffmpeg', ['-v', 'error', '-y', '-i', source, '-c:v', 'libaom-av1', '-crf', '26', '-b:v', '0',
      '-still-picture', '1', '-cpu-used', '4', '-pix_fmt', 'yuv420p', output])
  }
  return output
}

const files = sources(SOURCE).filter((f) => only.length === 0 || only.some((o) => f === o || f.startsWith(`${o}/`)))
let next = 0
let done = 0
// libaom uses a few threads per picture; a couple of pictures at a time keeps every core busy.
const workers = Array.from({ length: Math.max(1, Math.floor(availableParallelism() / 2)) }, async () => {
  while (next < files.length) {
    const source = files[next++]
    const output = await encode(source)
    done++
    if (output) console.log(`[${done}/${files.length}] ${output}`)
  }
})
await Promise.all(workers)
console.log(`${files.length} pictures checked`)
