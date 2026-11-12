import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { caseStars } from '../src/levels/detective/cases.ts'
import { parseGuesses, parseLevels, parseStruck } from '../src/stores/progress-data.ts'

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

  test('wrong accusations: known cases, their innocent suspects only, each once', () => {
    assert.deepEqual(
      parseGuesses({
        cake: ['cat', 'cat', 'dog', 'nobody', 7, 'cook'],
        chickens: ['goat'],
        nowhere: ['cat'],
        vase: 'keeper',
      }),
      { cake: ['cat', 'cook'] },
    )
    assert.deepEqual(parseGuesses(['cake']), {})
    assert.deepEqual(parseStruck({ cake: ['dog', 'cat', 'dog', 'nobody'], chickens: [], nowhere: ['cat'] }), { cake: ['dog', 'cat'] })
    assert.deepEqual(parseGuesses(null), {})
  })
})

describe('detective case stars', () => {
  test('3 on the first try, one less per wrong guess, at least 1', () => {
    assert.deepEqual([0, 1, 2, 3].map(caseStars), [3, 2, 1, 1])
  })
})
