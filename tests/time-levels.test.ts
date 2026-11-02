import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { hitTest } from '../src/engine/rules.ts'
import { svgLevel } from '../src/levels/helpers.ts'
import { chapterOf, levelNumber, nextLevel, TIME_CHAPTER } from '../src/levels/chapters.ts'
import { levelById, levels } from '../src/levels/index.ts'
import { timeLevels } from '../src/levels/time/index.ts'

describe('"time" levels (docs/time-differences-mode.md)', () => {
  test('svgLevel: time() follows the moment, diff() the variant, trap() registers its zone', () => {
    const level = svgLevel({
      id: 999,
      chapter: 'time',
      title: 'test',
      pair: 'day-night',
      parTimeSec: 60,
      scene: ({ diff, time, trap }) => time('sun', 'moon') + diff(10, 10, 5, 'A', 'B') + trap(50, 50, 8, 'x', 'y', 'moon'),
    })
    assert.deepEqual(level.traps, [{ x: 50, y: 50, r: 8, hint: 'moon' }])
    assert.equal(level.differences.length, 1)
    assert.equal(level.build!(0).svg, 'sunAx')
    assert.equal(level.build!(1).svg, 'moonBy')
    // The validator's mix: B's moment with A's differences.
    assert.equal(level.build!(0, 1).svg, 'moonAy')
  })

  test('other levels have no pair or traps', () => {
    for (const level of levels) assert.ok(!level.pair && !level.traps, `level ${level.id}`)
  })

  test('15 levels from 201 in the time category, morning/evening first, then summer/winter, then both', () => {
    assert.deepEqual(timeLevels.map((l) => l.id), Array.from({ length: 15 }, (_, i) => 201 + i))
    timeLevels.forEach((level, i) => {
      assert.equal(level.chapter, TIME_CHAPTER.id)
      assert.equal(chapterOf(level.id), TIME_CHAPTER)
      assert.equal(levelById(level.id), level)
      assert.equal(levelNumber(level), i + 1)
      if (i < 5) assert.equal(level.pair, 'day-night')
      else if (i < 10) assert.equal(level.pair, 'summer-winter')
      assert.ok(level.traps!.length >= 3 && level.traps!.length <= 6, `level ${level.id}`)
    })
    const pairs = new Set(timeLevels.slice(10).map((l) => l.pair))
    assert.equal(pairs.size, 2)
  })

  test('"next" stays in the category and ends with it', () => {
    assert.equal(nextLevel(timeLevels[0]), timeLevels[1])
    assert.equal(nextLevel(timeLevels.at(-1)!), undefined)
    assert.equal(nextLevel(levels.find((l) => l.id === 150)!), undefined)
  })

  test('a tap on a trap is not a difference', () => {
    for (const level of timeLevels)
      for (const t of level.traps!) assert.equal(hitTest(level.differences, t.x, t.y), -1, `level ${level.id} ${t.hint}`)
  })

  test('every hint and title exists in every interface language', () => {
    const dir = new URL('../src/i18n/', import.meta.url)
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
      assert.ok(t.chapters.time, file)
      for (const level of timeLevels) {
        assert.ok(t.levelTitles[level.title], `${file} ${level.title}`)
        assert.ok(t.timeMode.pairs[level.pair!], `${file} ${level.pair}`)
        for (const trap of level.traps!) assert.ok(t.timeMode.traps[trap.hint], `${file} ${trap.hint}`)
      }
    }
  })
})
