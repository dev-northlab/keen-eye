import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { levelById } from '../src/levels/index.ts'
import { isPictureStyle, styledLevel } from '../src/levels/picture-style.ts'

describe('picture style (levels/picture-style.ts)', () => {
  const drawn = levelById(1)!
  // A level without redesigned pictures: the sea's first (the farm's get them one by one).
  const plain = levelById(61)!

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
    assert.equal(level.id, drawn.id)
    assert.equal(level.title, drawn.title)
    assert.equal(level.parTimeSec, drawn.parTimeSec)
  })

  test('a level without pictures stays drawn in the redesign style', () => {
    assert.equal(plain.redesign, undefined)
    assert.equal(styledLevel(plain, 'redesign'), plain)
  })

  test('only known styles are accepted from storage', () => {
    assert.ok(isPictureStyle('classic') && isPictureStyle('redesign'))
    for (const v of ['new', '', null, undefined, 1, {}]) assert.ok(!isPictureStyle(v))
  })
})
