import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { parseLevels } from '../src/stores/progress-data.ts'

describe('stored progress is untrusted', () => {
  test('level records: stars 0–3 and a time that is null or not negative', () => {
    assert.deepEqual(
      parseLevels({
        1: { stars: 3, bestTimeSec: 40 },
        2: { stars: 0, bestTimeSec: null },
        3: { stars: 4, bestTimeSec: 10 },
        4: { stars: 2, bestTimeSec: -1 },
        x: { stars: 1, bestTimeSec: 5 },
        5: null,
      }),
      { 1: { stars: 3, bestTimeSec: 40 }, 2: { stars: 0, bestTimeSec: null } },
    )
  })
})
