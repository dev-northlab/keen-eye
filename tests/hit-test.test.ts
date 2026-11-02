import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { clientToPercent, hitItem, hitsShape, shapeCircle } from '../src/engine/hit-test.ts'
import type { HitShape } from '../src/engine/types.ts'

const size = { w: 800, h: 500 }
const full = { x: 0, y: 0, w: 800, h: 500 }
const box = { left: 0, top: 0, width: 800, height: 500 }

describe('clientToPercent', () => {
  test('maps the picture corners and center without zoom', () => {
    assert.deepEqual(clientToPercent(0, 0, box, full, size), { x: 0, y: 0 })
    assert.deepEqual(clientToPercent(400, 250, box, full, size), { x: 50, y: 50 })
    assert.deepEqual(clientToPercent(800, 500, box, full, size), { x: 100, y: 100 })
  })

  test('accounts for the element position and its display scale', () => {
    const shifted = { left: 100, top: 40, width: 400, height: 250 }
    assert.deepEqual(clientToPercent(100, 40, shifted, full, size), { x: 0, y: 0 })
    assert.deepEqual(clientToPercent(300, 165, shifted, full, size), { x: 50, y: 50 })
  })

  test('skips the empty bands of a picture fitted into a box of other proportions', () => {
    // 800×500 in 800×600: 50 px bands above and below.
    const tall = { left: 0, top: 0, width: 800, height: 600 }
    assert.equal(clientToPercent(400, 20, tall, full, size), null)
    assert.equal(clientToPercent(400, 580, tall, full, size), null)
    assert.deepEqual(clientToPercent(400, 50, tall, full, size), { x: 50, y: 0 })
    assert.deepEqual(clientToPercent(400, 300, tall, full, size), { x: 50, y: 50 })
    // 800×500 in 1000×500: 100 px bands left and right.
    const wide = { left: 0, top: 0, width: 1000, height: 500 }
    assert.equal(clientToPercent(50, 250, wide, full, size), null)
    assert.deepEqual(clientToPercent(100, 250, wide, full, size), { x: 0, y: 50 })
  })

  test('follows zoom and pan', () => {
    // Zoom ×2 on the bottom-right quarter.
    const quarter = { x: 400, y: 250, w: 400, h: 250 }
    assert.deepEqual(clientToPercent(0, 0, box, quarter, size), { x: 50, y: 50 })
    assert.deepEqual(clientToPercent(400, 250, box, quarter, size), { x: 75, y: 75 })
    assert.deepEqual(clientToPercent(800, 500, box, quarter, size), { x: 100, y: 100 })
    // Zoom ×4, panned to the top-left area.
    const small = { x: 100, y: 50, w: 200, h: 125 }
    assert.deepEqual(clientToPercent(400, 250, box, small, size), { x: 25, y: 22.5 })
  })

  test('returns null for an element without size', () => {
    assert.equal(clientToPercent(0, 0, { left: 0, top: 0, width: 0, height: 0 }, full, size), null)
  })
})

describe('hitsShape', () => {
  const aspect = 800 / 500
  const circle: HitShape = { shape: 'circle', x: 50, y: 50, r: 10 }
  const rect: HitShape = { shape: 'rect', x: 20, y: 30, w: 10, h: 20 }

  test('circle: center and edge hit, far away misses', () => {
    assert.ok(hitsShape(circle, 50, 50, aspect))
    assert.ok(hitsShape(circle, 60, 50, aspect, 0))
    assert.ok(!hitsShape(circle, 80, 50, aspect))
  })

  test('circle: the radius is in percent of the width, so it stays round on a wide picture', () => {
    // 10% of the width = 80 px = 16% of the height.
    assert.ok(hitsShape(circle, 50, 65.9, aspect, 0))
    assert.ok(!hitsShape(circle, 50, 66.1, aspect, 0))
  })

  test('circle: the hitbox margin grows the radius by 20%', () => {
    assert.ok(!hitsShape(circle, 61, 50, aspect, 0))
    assert.ok(hitsShape(circle, 61, 50, aspect))
    assert.ok(hitsShape(circle, 61.9, 50, aspect))
    assert.ok(!hitsShape(circle, 62.1, 50, aspect))
    assert.ok(hitsShape(circle, 50, 50 + 19.1, aspect))
    assert.ok(!hitsShape(circle, 50, 50 + 19.3, aspect))
  })

  test('rect: inside and on the edges hit, outside misses', () => {
    assert.ok(hitsShape(rect, 25, 40, aspect, 0))
    assert.ok(hitsShape(rect, 20, 30, aspect, 0))
    assert.ok(hitsShape(rect, 30, 50, aspect, 0))
    assert.ok(!hitsShape(rect, 19.9, 40, aspect, 0))
    assert.ok(!hitsShape(rect, 25, 50.1, aspect, 0))
  })

  test('rect: the margin grows width and height by 20% around the center', () => {
    // 10 × 20 → 12 × 24: x 19–31, y 28–52.
    assert.ok(hitsShape(rect, 19.1, 40, aspect))
    assert.ok(!hitsShape(rect, 18.9, 40, aspect))
    assert.ok(hitsShape(rect, 30.9, 40, aspect))
    assert.ok(!hitsShape(rect, 31.1, 40, aspect))
    assert.ok(hitsShape(rect, 25, 28.1, aspect))
    assert.ok(!hitsShape(rect, 25, 27.9, aspect))
    assert.ok(hitsShape(rect, 25, 51.9, aspect))
    assert.ok(!hitsShape(rect, 25, 52.1, aspect))
  })
})

describe('hitItem', () => {
  const shapes: HitShape[] = [
    { shape: 'circle', x: 20, y: 20, r: 5 },
    { shape: 'rect', x: 60, y: 60, w: 10, h: 10 },
  ]

  test('returns the index of the shape hit, or -1', () => {
    assert.equal(hitItem(shapes, 20, 20, 1.6), 0)
    assert.equal(hitItem(shapes, 65, 65, 1.6), 1)
    assert.equal(hitItem(shapes, 40, 40, 1.6), -1)
  })

  test('works on a point taken from a zoomed screen', () => {
    // Zoom ×2 on the bottom-right quarter: the rect center (65%, 65%) is at client (240, 150).
    const pt = clientToPercent(240, 150, box, { x: 400, y: 250, w: 400, h: 250 }, size)!
    assert.equal(hitItem(shapes, pt.x, pt.y, 1.6), 1)
  })
})

describe('shapeCircle', () => {
  test('circle in pixels; rect enclosed by a circle around its center', () => {
    assert.deepEqual(shapeCircle({ shape: 'circle', x: 50, y: 50, r: 10 }, size), { x: 400, y: 250, r: 80 })
    assert.deepEqual(shapeCircle({ shape: 'rect', x: 0, y: 0, w: 7.5, h: 16 }, size), { x: 30, y: 40, r: 50 })
  })
})
