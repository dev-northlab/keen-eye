import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { MODE_RULES } from '../src/engine/rules.ts'
import { memoryLevels } from '../src/levels/memory/index.ts'
import { upcomingLevels } from '../src/levels/upcoming.ts'

describe('difficulty modes (docs/difficulty-modes.md)', () => {
  test('hints an attempt: calm 3, normal 1; calm has no lock and slower motion, normal the usual lock', () => {
    assert.deepEqual([MODE_RULES.calm.hints, MODE_RULES.normal.hints], [3, 1])
    assert.deepEqual([MODE_RULES.calm.missLock, MODE_RULES.normal.missLock], [false, true])
    assert.ok(MODE_RULES.calm.animationSpeed < MODE_RULES.normal.animationSpeed)
  })

  test('picture B mirrored or turned (docs/mirror-rotate-feature.md): off in calm mode, on in normal', () => {
    assert.deepEqual([MODE_RULES.calm.transformB, MODE_RULES.normal.transformB], [false, true])
  })

  test('extra objects (docs/extra-objects.md): in normal mode, never in calm mode', () => {
    assert.deepEqual([MODE_RULES.calm.extras, MODE_RULES.normal.extras], [false, true])
  })

  test('"memory" pictures carry no extra objects: A must be remembered in a few seconds', () => {
    for (const level of [...memoryLevels, ...upcomingLevels.filter((l) => l.memory)]) assert.equal(level.extras, undefined, `level ${level.id}`)
  })

  test('"memory": calm has 3 peeks and no miss limit, normal the level\'s peeks and 3 misses', () => {
    for (const level of memoryLevels) {
      const { peeks } = level.memory!
      assert.equal(MODE_RULES.normal.memoryPeeks(peeks), peeks)
      assert.equal(MODE_RULES.calm.memoryPeeks(peeks), 3)
    }
    assert.deepEqual([MODE_RULES.calm.memoryMaxMisses, MODE_RULES.normal.memoryMaxMisses], [Infinity, 3])
  })
})
