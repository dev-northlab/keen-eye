// Animation benchmark (developer mode, /dev/bench): a drawn scene (SceneSvg) taken apart into a tree of layers, so that
// Canvas 2D can play the same picture as the SVG engine. The static runs between animated groups are
// rasterized once into bitmaps; animated groups (and wrappers that hold any) become nodes posed every frame.
import { pose, type Matrix } from '../engine/animation.ts'
import type { Animation, SceneSvg } from '../engine/types.ts'

const SVG_NS = 'http://www.w3.org/2000/svg'
/** Bitmap pixels per scene unit: sharp enough on a phone's close-ups, and the whole 1440-wide world stays under 4096 px. */
export const RESOLUTION = 2
/** Strokes reach past getBBox(), which measures geometry only. */
const PAD = 6

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface StaticLayer {
  kind: 'static'
  /** Where the bitmap goes, in the parent's units. */
  box: Rect
  bitmap: HTMLCanvasElement
}

export interface GroupLayer {
  kind: 'group'
  /** Posed every frame (a `data-anim` group)… */
  animation?: Animation
  /** …or a wrapper's own constant transform. */
  matrix?: Matrix
  /** A wrapper's clip-path (a single rect), in its own units. */
  clip?: Rect
  children: Layer[]
}

export type Layer = StaticLayer | GroupLayer

export interface LayerStats {
  bitmaps: number
  megabytes: number
}

const IDENTITY: Matrix = [1, 0, 0, 1, 0, 0]

export function multiply([a, b, c, d, e, f]: Matrix, [a2, b2, c2, d2, e2, f2]: Matrix): Matrix {
  return [a * a2 + c * b2, b * a2 + d * b2, a * c2 + c * d2, b * c2 + d * d2, a * e2 + c * f2 + e, b * e2 + d * f2 + f]
}

/** A layer's own transform and opacity at time t. */
export function layerPose(layer: GroupLayer, t: number): { matrix: Matrix; opacity: number } {
  if (layer.animation) {
    const p = pose(layer.animation, t)
    return { matrix: p.matrix ?? IDENTITY, opacity: p.opacity ?? 1 }
  }
  return { matrix: layer.matrix ?? IDENTITY, opacity: 1 }
}

/**
 * Takes picture A and B of a level apart. Runs of markup that are the same in both pictures share one bitmap.
 * Needs the DOM (it measures with getBBox and rasterizes through <img>).
 */
export async function buildLayers(pictures: SceneSvg[]): Promise<{ roots: GroupLayer[]; stats: LayerStats }> {
  const measure = document.createElementNS(SVG_NS, 'svg')
  measure.setAttribute('style', 'position:fixed;left:-10000px;top:0;width:10px;height:10px;visibility:hidden')
  document.body.append(measure)
  const cache = new Map<string, Promise<StaticLayer | null>>()
  const serializer = new XMLSerializer()
  try {
    const roots = await Promise.all(
      pictures.map(async (scene) => {
        const doc = new DOMParser().parseFromString(`<svg xmlns="${SVG_NS}">${scene.svg}</svg>`, 'image/svg+xml')
        const root = doc.documentElement
        const defs = [...root.children].filter((el) => el.tagName === 'defs')
        const defsMarkup = defs.map((d) => serializer.serializeToString(d)).join('')
        measure.innerHTML = defsMarkup
        const byKey = new Map(scene.animations.map((a) => [a.key, a]))
        const clips = new Map([...root.querySelectorAll('clipPath')].map((c) => [c.id, c]))

        const staticRun = (elements: Element[], inherit: string): Promise<StaticLayer | null> => {
          const markup = `<g${inherit}>${elements.map((e) => serializer.serializeToString(e)).join('')}</g>`
          const key = defsMarkup.length + markup
          let layer = cache.get(key)
          if (!layer) {
            layer = rasterize(markup, defsMarkup, measure)
            cache.set(key, layer)
          }
          return layer
        }

        // Presentation attributes of a wrapper go on with its static runs (fill, stroke… set on the wrapper).
        const inherited = (el: Element) =>
          [...el.attributes]
            .filter((a) => !['transform', 'clip-path', 'data-anim', 'id', 'data-secret'].includes(a.name))
            .map((a) => ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`)
            .join('')

        const walk = async (parent: Element, inherit: string): Promise<Layer[]> => {
          const layers: Promise<Layer | null>[] = []
          let run: Element[] = []
          const flush = () => {
            if (run.length) layers.push(staticRun(run, inherit))
            run = []
          }
          for (const el of [...parent.children]) {
            if (el.tagName === 'defs' || el.tagName === 'clipPath') continue
            const animated = el.hasAttribute('data-anim')
            if (!animated && !el.querySelector('[data-anim]')) {
              run.push(el)
              continue
            }
            flush()
            const children = walk(el, inherit + inherited(el))
            if (animated) {
              const animation = byKey.get(el.getAttribute('data-anim')!)
              layers.push(children.then((c) => ({ kind: 'group', animation, children: c })))
            } else {
              const matrix = parseTransform(el.getAttribute('transform'))
              const clip = clipRect(el.getAttribute('clip-path'), clips)
              layers.push(children.then((c) => ({ kind: 'group', matrix, clip, children: c })))
            }
          }
          flush()
          return (await Promise.all(layers)).filter((l): l is Layer => l !== null)
        }
        // Each picture is walked with its own defs in the measuring svg.
        const children = await walk(root, '')
        return { kind: 'group', children } as GroupLayer
      }),
    )
    const layers = new Set((await Promise.all(cache.values())).filter((l): l is StaticLayer => l !== null))
    let bytes = 0
    for (const l of layers) bytes += l.bitmap.width * l.bitmap.height * 4
    return { roots, stats: { bitmaps: layers.size, megabytes: bytes / 1024 / 1024 } }
  } finally {
    measure.remove()
  }
}

/** Measures a run of markup and draws it into a bitmap of its own box. */
async function rasterize(markup: string, defs: string, measure: SVGSVGElement): Promise<StaticLayer | null> {
  const g = document.createElementNS(SVG_NS, 'g')
  g.innerHTML = markup
  measure.append(g)
  const b = g.getBBox()
  g.remove()
  if (b.width <= 0 && b.height <= 0) return null
  const box = { x: b.x - PAD, y: b.y - PAD, w: b.width + 2 * PAD, h: b.height + 2 * PAD }
  const w = Math.max(1, Math.ceil(box.w * RESOLUTION))
  const h = Math.max(1, Math.ceil(box.h * RESOLUTION))
  const svg = `<svg xmlns="${SVG_NS}" width="${w}" height="${h}" viewBox="${box.x} ${box.y} ${box.w} ${box.h}">${defs}${markup}</svg>`
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    const bitmap = document.createElement('canvas')
    bitmap.width = w
    bitmap.height = h
    bitmap.getContext('2d')!.drawImage(img, 0, 0, w, h)
    return { kind: 'static', box, bitmap }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** The constant transform of a wrapper (translate, scale, matrix… as the browser reads it). */
function parseTransform(value: string | null): Matrix | undefined {
  if (!value) return undefined
  const g = document.createElementNS(SVG_NS, 'g')
  g.setAttribute('transform', value)
  const m = g.transform.baseVal.consolidate()?.matrix
  return m ? [m.a, m.b, m.c, m.d, m.e, m.f] : undefined
}

/** A clip-path that is one rect (the only kind the scenes use). */
function clipRect(value: string | null, clips: Map<string, Element>): Rect | undefined {
  const id = value?.match(/url\(#([^)]+)\)/)?.[1]
  const rect = id ? clips.get(id)?.querySelector('rect') : undefined
  if (!rect) return undefined
  const n = (a: string) => Number(rect.getAttribute(a) ?? 0)
  return { x: n('x'), y: n('y'), w: n('width'), h: n('height') }
}
