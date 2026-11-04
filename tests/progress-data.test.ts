import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { timeTravelLevels } from '../src/levels/time-travel/index.ts'
import { parseHard, parseLevels } from '../src/stores/progress-data.ts'

describe('stored progress is untrusted', () => {
  test('red stars of hard mode: 1–3 for known level and "find the odd one out" ids', () => {
    const era = timeTravelLevels[0].id
    assert.deepEqual(parseHard({ 1: 3, 301: 1, [era]: 2 }), { 1: 3, 301: 1, [era]: 2 })
    // Unknown ids, ids that only look like numbers, stars out of range or not numbers.
    assert.deepEqual(parseHard({ 99999: 3, '1.0': 3, '01': 2, 'no-such-era': 1, 2: 0, 3: 4, 4: '3', 5: 2.5, 6: null }), {})
    for (const raw of [undefined, null, 'x', 7, [1, 2]]) assert.deepEqual(parseHard(raw), {})
  })

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
