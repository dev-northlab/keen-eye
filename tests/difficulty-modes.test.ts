import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { computeStars, hardStars, memoryHardStars, memoryStars, MISS_LIMIT, MODE_RULES } from '../src/engine/rules.ts'
import { memoryLevels } from '../src/levels/memory/index.ts'

describe('difficulty modes (docs/difficulty-modes.md)', () => {
  test('hints an attempt: calm 3, normal 1, hard none; calm has no mistake limit or lock, normal the usual lock', () => {
    assert.deepEqual([MODE_RULES.calm.hints, MODE_RULES.normal.hints, MODE_RULES.hard.hints], [3, 1, 0])
    assert.deepEqual([MODE_RULES.calm.maxMistakes, MODE_RULES.calm.missLock], [Infinity, false])
    assert.deepEqual([MODE_RULES.normal.maxMistakes, MODE_RULES.normal.missLock], [Infinity, true])
    assert.ok(MODE_RULES.calm.animationSpeed < MODE_RULES.normal.animationSpeed)
  })

  test('picture B mirrored or turned (docs/mirror-rotate-feature.md): off in calm mode, on in normal and hard', () => {
    assert.deepEqual([MODE_RULES.calm.transformB, MODE_RULES.normal.transformB, MODE_RULES.hard.transformB], [false, true, true])
  })

  test('hard: no hints, one mistake allowed and lost at the 2nd (before a lock could start), traps unexplained', () => {
    const hard = MODE_RULES.hard
    assert.deepEqual([hard.hints, hard.maxMistakes, hard.trapNotes], [0, 2, false])
    assert.ok(hard.maxMistakes <= MISS_LIMIT)
    assert.equal(hard.missLock, false)
  })

  test('red stars of hard mode: 3 without a mistake in the par time, 2 without a mistake or within it, 1 for a pass', () => {
    assert.deepEqual([MODE_RULES.calm.stars, MODE_RULES.normal.stars, MODE_RULES.hard.stars], [computeStars, computeStars, hardStars])
    const p = { timeSec: 60, parTimeSec: 60, mistakes: 0, hintsUsed: 0 }
    assert.equal(hardStars(p), 3)
    assert.equal(hardStars({ ...p, timeSec: 61 }), 2)
    assert.equal(hardStars({ ...p, mistakes: 1 }), 2)
    assert.equal(hardStars({ ...p, mistakes: 1, timeSec: 61 }), 1)
  })

  test('"memory" red stars: all found, 3 without a miss, 2 with one; 0 = failed', () => {
    assert.deepEqual([MODE_RULES.normal.memoryStars, MODE_RULES.hard.memoryStars], [memoryStars, memoryHardStars])
    assert.equal(memoryHardStars({ found: 4, total: 4, mistakes: 0, peeks: 0 }), 3)
    assert.equal(memoryHardStars({ found: 4, total: 4, mistakes: 1, peeks: 0 }), 2)
    assert.equal(memoryHardStars({ found: 3, total: 4, mistakes: 2, peeks: 0 }), 0)
  })

  test('"memory": calm has 3 peeks; hard shows A a second less (at least 2 s), without peeks, ending at 2 misses', () => {
    for (const level of memoryLevels) {
      const { showSeconds, peeks } = level.memory!
      assert.equal(MODE_RULES.normal.memoryShowSeconds(showSeconds), showSeconds)
      assert.equal(MODE_RULES.normal.memoryPeeks(peeks), peeks)
      assert.equal(MODE_RULES.hard.memoryShowSeconds(showSeconds), Math.max(2, showSeconds - 1))
      assert.equal(MODE_RULES.hard.memoryPeeks(peeks), 0)
      assert.equal(MODE_RULES.calm.memoryPeeks(peeks), 3)
    }
    assert.deepEqual([MODE_RULES.calm.memoryMaxMisses, MODE_RULES.normal.memoryMaxMisses, MODE_RULES.hard.memoryMaxMisses], [Infinity, 3, 2])
  })

})
