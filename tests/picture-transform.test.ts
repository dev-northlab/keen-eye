import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import {
  combineTransforms,
  inverseTransformPoint,
  PICTURE_TRANSFORMS,
  svgTransform,
  transformPoint,
  transformRect,
  type PictureTransform,
} from '../src/engine/transform.ts'
import { Viewport, type ViewSvg } from '../src/engine/zoom.ts'
import { CHAPTERS, chapterLevels, DETECTIVE_CHAPTER, MEMORY_CHAPTER, TIME_CHAPTER, TRAVEL_CHAPTER } from '../src/levels/chapters.ts'
import { allLevels } from '../src/levels/index.ts'

const SIZE = { w: 800, h: 500 }
const POINTS = [
  { x: 0, y: 0 },
  { x: 120, y: 40 },
  { x: 400, y: 250 },
  { x: 799, y: 333 },
]

describe('picture transforms (docs/mirror-rotate-feature.md)', () => {
  test('shown positions follow the table of the spec (fractions of the picture)', () => {
    const unit = { w: 1, h: 1 }
    const p = { x: 0.2, y: 0.4 }
    const near = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      assert.ok(Math.abs(a.x - b.x) < 1e-12 && Math.abs(a.y - b.y) < 1e-12, `${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`)
    near(transformPoint('none', p, unit), { x: 0.2, y: 0.4 })
    near(transformPoint('mirror-x', p, unit), { x: 0.8, y: 0.4 })
    near(transformPoint('mirror-y', p, unit), { x: 0.2, y: 0.6 })
    near(transformPoint('rotate-180', p, unit), { x: 0.8, y: 0.6 })
  })

  test('works in viewBox units of a picture that is not square', () => {
    assert.deepEqual(transformPoint('mirror-x', { x: 120, y: 40 }, SIZE), { x: 680, y: 40 })
    assert.deepEqual(transformPoint('rotate-180', { x: 120, y: 40 }, SIZE), { x: 680, y: 460 })
  })

  test('a tap turned back lands on the scene point shown there', () => {
    for (const t of PICTURE_TRANSFORMS)
      for (const p of POINTS) assert.deepEqual(inverseTransformPoint(t, transformPoint(t, p, SIZE), SIZE), p, t)
  })

  test('a zone hit on the shown picture is the same zone: distances are kept', () => {
    const zone = { x: 150, y: 90, r: 30 }
    for (const t of PICTURE_TRANSFORMS) {
      const shownTap = transformPoint(t, { x: 170, y: 100 }, SIZE)
      const tap = inverseTransformPoint(t, shownTap, SIZE)
      assert.ok(Math.hypot(tap.x - zone.x, tap.y - zone.y) <= zone.r, t)
    }
  })

  test('a rectangle (the zoomed view) is shown as the rectangle of its turned corners', () => {
    const r = { x: 100, y: 50, w: 200, h: 125 }
    for (const t of PICTURE_TRANSFORMS) {
      const shown = transformRect(t, r, SIZE)
      assert.deepEqual([shown.w, shown.h], [r.w, r.h], t)
      for (const corner of [{ x: r.x, y: r.y }, { x: r.x + r.w, y: r.y + r.h }]) {
        const c = transformPoint(t, corner, SIZE)
        assert.ok(c.x >= shown.x && c.x <= shown.x + shown.w && c.y >= shown.y && c.y <= shown.y + shown.h, t)
      }
      assert.deepEqual(transformRect(t, shown, SIZE), r, t)
    }
  })

  test('combining two transforms is applying one after the other', () => {
    for (const a of PICTURE_TRANSFORMS)
      for (const b of PICTURE_TRANSFORMS)
        for (const p of POINTS)
          assert.deepEqual(transformPoint(combineTransforms(a, b), p, SIZE), transformPoint(b, transformPoint(a, p, SIZE), SIZE), `${a} + ${b}`)
    assert.equal(combineTransforms('mirror-x', 'rotate-180'), 'mirror-y')
    assert.equal(combineTransforms('rotate-180', 'rotate-180'), 'none')
  })

  test('the svg transform draws the scene where transformPoint says', () => {
    assert.equal(svgTransform('none', SIZE), null)
    for (const t of PICTURE_TRANSFORMS.filter((t) => t !== 'none')) {
      const [a, b, c, d, e, f] = svgTransform(t, SIZE)!.match(/-?\d+(\.\d+)?/g)!.map(Number)
      for (const p of POINTS) assert.deepEqual({ x: a * p.x + c * p.y + e, y: b * p.x + d * p.y + f }, transformPoint(t, p, SIZE), t)
    }
  })
})

/** An svg of `width` × (width·5/8) client px at (left, top): its screen CTM follows the viewBox (no letterbox). */
function fakeSvg(left: number, top: number, width: number) {
  let vb = [0, 0, SIZE.w, SIZE.h]
  return {
    setAttribute: (_name: string, v: string) => (vb = v.split(' ').map(Number)),
    getScreenCTM: () => {
      const k = width / vb[2]
      return { a: k, d: k, e: left - vb[0] * k, f: top - vb[1] * k }
    },
    get viewBox() {
      return vb
    },
  }
}

describe('shared zoom of a plain and a mirrored picture', () => {
  for (const t of PICTURE_TRANSFORMS) {
    test(`${t}: the pictures show the same part of the scene and the finger keeps its scene point`, () => {
      const a = fakeSvg(0, 0, 400)
      const b = fakeSvg(420, 0, 400)
      const svgs: ViewSvg[] = [a, b]
      const viewport = new Viewport(svgs, SIZE.w, SIZE.h, () => {}, ['none', t])
      // Pinch on B: the scene point under the finger stays under it at scale 2.
      const frame = viewport.frame(svgs[1])!
      const finger = { x: 420 + 100, y: 60 }
      const p = viewport.toScene(frame, finger.x, finger.y)
      viewport.anchor(frame, p.x, p.y, finger.x, finger.y, 2)
      const after = viewport.toScene(viewport.frame(svgs[1])!, finger.x, finger.y)
      assert.ok(Math.hypot(after.x - p.x, after.y - p.y) < 1e-9, `${JSON.stringify(after)} ≠ ${JSON.stringify(p)}`)
      // B's viewBox is A's (the scene part in view) shown the same way as B.
      const [x, y, w, h] = a.viewBox
      assert.deepEqual(b.viewBox, Object.values(transformRect(t, { x, y, w, h }, SIZE)))
    })
  }
})

describe('levels with a mirrored or turned picture B', () => {
  const lastFive = (levels: { id: number }[]) => levels.slice(-5).map((l) => l.id)

  test('the last five levels of every world, "travel" and "detective" alternate mirror-x and rotate-180', () => {
    for (const chapter of [...CHAPTERS, TRAVEL_CHAPTER, DETECTIVE_CHAPTER]) {
      // Play order: the ranges of the chapter, the harder ten last.
      const ordered = chapter.ranges.flatMap(([from, to]) => chapterLevels(chapter).filter((l) => l.id >= from && l.id <= to))
      const transforms = ordered.slice(-5).map((l) => l.transformB)
      assert.deepEqual(transforms, ['mirror-x', 'rotate-180', 'mirror-x', 'rotate-180', 'mirror-x'], chapter.id)
      for (const l of ordered.slice(0, -5)) assert.equal(l.transformB, undefined, `level ${l.id}`)
    }
  })

  test('"time", "memory" and every other level keep picture B as drawn', () => {
    const transformed = new Set(
      [...CHAPTERS, TRAVEL_CHAPTER, DETECTIVE_CHAPTER].flatMap((c) =>
        lastFive(c.ranges.flatMap(([from, to]) => chapterLevels(c).filter((l) => l.id >= from && l.id <= to))),
      ),
    )
    for (const l of allLevels) if (!transformed.has(l.id)) assert.equal(l.transformB, undefined, `level ${l.id}`)
    for (const c of [TIME_CHAPTER, MEMORY_CHAPTER]) for (const l of chapterLevels(c)) assert.equal(l.transformB, undefined)
  })

  test('only transforms the HUD has texts for (level.transformB.*, level.transformNotice.*)', () => {
    const used = new Set(allLevels.flatMap((l) => (l.transformB ? [l.transformB] : [])))
    assert.deepEqual([...used].sort(), ['mirror-x', 'rotate-180'] satisfies PictureTransform[])
  })
})
