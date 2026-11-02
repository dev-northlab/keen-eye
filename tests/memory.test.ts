import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, test } from 'node:test'
import { memoryStars } from '../src/engine/rules.ts'
import { chapterOf, levelNumber, MEMORY_CHAPTER, nextLevel } from '../src/levels/chapters.ts'
import { difficultyOf } from '../src/levels/difficulty.ts'
import { allLevels, levelById } from '../src/levels/index.ts'
import { memoryLevels } from '../src/levels/memory/index.ts'

describe('"memory" mode (docs/memory-mode.md)', () => {
  test('stars: 3 without a peek and with at most one miss, 2 for all found, 1 for more than half', () => {
    assert.equal(memoryStars({ found: 4, total: 4, mistakes: 1, peeks: 0 }), 3)
    assert.equal(memoryStars({ found: 4, total: 4, mistakes: 2, peeks: 0 }), 2)
    assert.equal(memoryStars({ found: 4, total: 4, mistakes: 0, peeks: 1 }), 2)
    assert.equal(memoryStars({ found: 3, total: 5, mistakes: 3, peeks: 1 }), 1)
    assert.equal(memoryStars({ found: 2, total: 4, mistakes: 3, peeks: 0 }), 0)
    assert.equal(memoryStars({ found: 1, total: 3, mistakes: 3, peeks: 0 }), 0)
  })

  test('30 levels from 301: 3 changes for 5 s, 4 for 4 s, 5–6 for 3 s, then busier scenes: 5 for 5 s, 6 for 4 s', () => {
    assert.deepEqual(memoryLevels.map((l) => l.id), Array.from({ length: 30 }, (_, i) => 301 + i))
    memoryLevels.forEach((level, i) => {
      assert.equal(level.chapter, MEMORY_CHAPTER.id)
      assert.equal(chapterOf(level.id), MEMORY_CHAPTER)
      assert.equal(levelById(level.id), level)
      assert.equal(levelNumber(level), i + 1)
      assert.equal(level.memory!.peeks, 1)
      assert.equal(level.memory!.showSeconds, difficultyOf(level.id).showSeconds)
      const n = level.differences.length
      if (i < 5) assert.deepEqual([n, level.memory!.showSeconds], [3, 5])
      else if (i < 10) assert.deepEqual([n, level.memory!.showSeconds], [4, 4])
      else if (i < 15) assert.ok(n >= 5 && n <= 6 && level.memory!.showSeconds === 3, `level ${level.id}`)
      else if (i < 20) assert.deepEqual([n, level.memory!.showSeconds], [5, 5])
      else assert.deepEqual([n, level.memory!.showSeconds], [6, 4])
      assert.ok(!level.multiplayerReady && !level.differences.some((d) => d.motion), `level ${level.id}`)
    })
  })

  test('only "memory" levels have memory rules', () => {
    for (const level of allLevels) assert.equal(!!level.memory, level.chapter === MEMORY_CHAPTER.id, `level ${level.id}`)
  })

  test('"next" stays in the category and ends with it', () => {
    assert.equal(nextLevel(memoryLevels[0]), memoryLevels[1])
    assert.equal(nextLevel(memoryLevels.at(-1)!), undefined)
  })

  test('every text and title exists in every interface language', () => {
    const dir = new URL('../src/i18n/', import.meta.url)
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const t = JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
      assert.ok(t.chapters.memory, file)
      for (const level of memoryLevels) assert.ok(t.levelTitles[level.title], `${file} ${level.title}`)
      for (const key of ['task', 'rules', 'peek', 'finish', 'misses', 'failed', 'foundOf', 'legend'])
        assert.ok(t.memoryMode[key], `${file} ${key}`)
      for (const phase of ['show', 'search', 'peek', 'reveal']) assert.ok(t.memoryMode.phases[phase], `${file} ${phase}`)
    }
  })
})
