// Animation benchmark (developer mode, /dev/bench): one cartoon level played two ways — the game's SVG and Canvas 2D
// — every frame of the browser, with the same story clock and camera, to compare on a phone. (PixiJS was tried too:
// as fast as Canvas 2D on a phone, but a big library, so it is gone.)
import { pose, type Matrix } from '../engine/animation.ts'
import { cameraAt, fitCamera } from '../engine/cartoon.ts'
import { createPicture, type Picture } from '../engine/render.ts'
import type { Level } from '../engine/types.ts'
import { layerPose, multiply, type GroupLayer, type Layer, type Rect } from './layers.ts'

export type RendererKind = 'svg' | 'canvas'

/** One way of drawing pictures A and B into their two boxes. */
export interface Renderer {
  /** Draws the story at time t (seconds). */
  frame(t: number): void
  destroy(): void
}

/** The part of the world a box shows at time t: the story's camera fitted to the box's shape. */
function shot(level: Level, box: HTMLElement, t: number): Rect {
  const aspect = box.clientHeight > 0 ? box.clientWidth / box.clientHeight : 0
  return fitCamera(cameraAt(level.cartoon!, t), aspect, level.viewBox)
}

/** The game's own drawing: SVG pictures posed through their `data-anim` groups, the camera as the viewBox. */
export function svgRenderer(level: Level, boxes: HTMLElement[]): Renderer {
  const pictures: Picture[] = boxes.map((box, i) => {
    const p = createPicture(level, i as 0 | 1)
    p.svg.style.width = '100%'
    p.svg.style.height = '100%'
    box.append(p.svg)
    return p
  })
  return {
    frame(t) {
      pictures.forEach((p, i) => {
        // Every frame (the game poses about 30 times a second): animatePicture would skip frames closer than that.
        for (const { el, animation } of p.animated) {
          const { matrix, opacity } = pose(animation, t)
          if (matrix) el.setAttribute('transform', `matrix(${matrix.join(' ')})`)
          if (opacity !== undefined) el.setAttribute('opacity', String(opacity))
        }
        const c = shot(level, boxes[i], t)
        p.svg.setAttribute('viewBox', `${c.x} ${c.y} ${c.w} ${c.h}`)
      })
    },
    destroy() {
      for (const p of pictures) p.svg.remove()
    },
  }
}

/** The four corners of a box through a matrix, as their bounds. */
function bounds([a, b, c, d, e, f]: Matrix, r: Rect): Rect {
  const xs = [r.x * a + r.y * c, (r.x + r.w) * a + r.y * c, r.x * a + (r.y + r.h) * c, (r.x + r.w) * a + (r.y + r.h) * c]
  const ys = [r.x * b + r.y * d, (r.x + r.w) * b + r.y * d, r.x * b + (r.y + r.h) * d, (r.x + r.w) * b + (r.y + r.h) * d]
  const x = Math.min(...xs) + e
  const y = Math.min(...ys) + f
  return { x, y, w: Math.max(...xs) + e - x, h: Math.max(...ys) + f - y }
}

const overlaps = (a: Rect, b: Rect) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h

/** Canvas 2D: the layers' bitmaps drawn through their poses, off-screen ones skipped. */
export function canvasRenderer(level: Level, boxes: HTMLElement[], roots: GroupLayer[]): Renderer {
  const dpr = window.devicePixelRatio || 1
  const canvases = boxes.map((box) => {
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(box.clientWidth * dpr)
    canvas.height = Math.round(box.clientHeight * dpr)
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    box.append(canvas)
    return canvas
  })
  const draw = (ctx: CanvasRenderingContext2D, layer: Layer, m: Matrix, alpha: number, view: Rect, t: number) => {
    if (layer.kind === 'static') {
      if (!overlaps(bounds(m, layer.box), view)) return
      ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
      ctx.globalAlpha = alpha
      ctx.drawImage(layer.bitmap, layer.box.x, layer.box.y, layer.box.w, layer.box.h)
      return
    }
    const p = layerPose(layer, t)
    const a = alpha * p.opacity
    if (a <= 0.001) return
    const mm = multiply(m, p.matrix)
    if (layer.clip) {
      ctx.save()
      ctx.setTransform(mm[0], mm[1], mm[2], mm[3], mm[4], mm[5])
      ctx.beginPath()
      ctx.rect(layer.clip.x, layer.clip.y, layer.clip.w, layer.clip.h)
      ctx.clip()
    }
    for (const child of layer.children) draw(ctx, child, mm, a, view, t)
    if (layer.clip) ctx.restore()
  }
  return {
    frame(t) {
      canvases.forEach((canvas, i) => {
        const ctx = canvas.getContext('2d')!
        const c = shot(level, boxes[i], t)
        const k = Math.min(canvas.width / c.w, canvas.height / c.h)
        const ox = (canvas.width - c.w * k) / 2
        const oy = (canvas.height - c.h * k) / 2
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // World → device pixels; the view in device pixels, to skip what the camera does not see.
        draw(ctx, roots[i], [k, 0, 0, k, ox - c.x * k, oy - c.y * k], 1, { x: 0, y: 0, w: canvas.width, h: canvas.height }, t)
      })
    },
    destroy() {
      for (const c of canvases) c.remove()
    },
  }
}
