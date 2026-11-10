import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { levelById } from '../src/levels/index.ts'
import { isPictureStyle, PATCH_MARGIN, styledLevel, zonePatches } from '../src/levels/picture-style.ts'

describe('picture style (levels/picture-style.ts)', () => {
  const drawn = levelById(1)!
  // A level without redesigned pictures: the "time" mode's first (the worlds get theirs one by one).
  const plain = levelById(201)!

  test('the classic style plays the drawn scene', () => {
    assert.equal(styledLevel(drawn, 'classic'), drawn)
  })

  test('the redesign plays the pictures with their zones, the same level otherwise', () => {
    const level = styledLevel(drawn, 'redesign')
    assert.ok(drawn.redesign)
    assert.equal(level.kind, 'image')
    assert.equal(level.imageA, drawn.redesign.imageA)
    assert.equal(level.imageB, drawn.redesign.imageB)
    assert.deepEqual(level.viewBox, drawn.redesign.viewBox)
    assert.equal(level.differences, drawn.redesign.differences)
    assert.equal(level.build, undefined)
    assert.equal(level.extras, undefined)
    assert.equal(level.redesign, undefined)
    assert.equal(level.secret, drawn.redesign.secret)
    assert.equal(level.id, drawn.id)
    assert.equal(level.title, drawn.title)
    assert.equal(level.parTimeSec, drawn.parTimeSec)
  })

  test("the drawn scene's key never lands on pictures that do not draw it", () => {
    const keyed = { ...drawn, secret: { x: 10, y: 10, r: 20, on: 'both' as const } }
    assert.equal(styledLevel(keyed, 'redesign').secret, undefined)
    const key = { x: 600, y: 400, r: 40, on: 'both' as const }
    assert.deepEqual(styledLevel({ ...keyed, redesign: { ...drawn.redesign!, secret: key } }, 'redesign').secret, key)
  })

  test('a level without pictures stays drawn in the redesign style', () => {
    assert.equal(plain.redesign, undefined)
    assert.equal(styledLevel(plain, 'redesign'), plain)
  })

  test('only known styles are accepted from storage', () => {
    assert.ok(isPictureStyle('classic') && isPictureStyle('redesign'))
    for (const v of ['new', '', null, undefined, 1, {}]) assert.ok(!isPictureStyle(v))
  })

  test("picture B's cut-outs cover each zone's grown circle, clipped to the picture, in numbered files", () => {
    const m = PATCH_MARGIN
    const patches = zonePatches('levels/redesign/level-999-b', [{ x: 500, y: 300, r: 60 }, { x: 20, y: 590, r: 50 }], { w: 1000, h: 600 })
    assert.deepEqual(patches, [
      { href: 'levels/redesign/level-999-b-1.webp', x: 440 - m, y: 240 - m, w: 120 + 2 * m, h: 120 + 2 * m },
      { href: 'levels/redesign/level-999-b-2.webp', x: 0, y: 540 - m, w: 70 + m, h: 60 + m },
    ])
  })

  test('a level whose B is made of cut-outs plays them over picture A', () => {
    const level = styledLevel(levelById(61)!, 'redesign')
    assert.equal(level.imageB, level.imageA)
    assert.equal(level.patchesB?.length, level.differences.length)
  })
})
