import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { Match, type MatchRules } from '../src/engine/match.ts'
import { levelById } from '../src/levels/index.ts'

const level = levelById(1)!
const players = [
  { name: 'One', color: '#a855f7' },
  { name: 'Two', color: '#e5484d' },
]
const hotseat: MatchRules = { mode: 'hotseat', hints: 0, timeLimitSec: null, turnSec: null }
const zone = level.differences[0]

describe('two-player match', () => {
  test('hot-seat starts with the player the bottle chose; the other one waits', () => {
    const match = new Match(level, players, hotseat, { firstTurn: 2 })
    assert.equal(match.state.currentTurn, 2)
    assert.deepEqual(match.dispatch({ type: 'tap', playerId: 1, picture: 1, x: zone.x, y: zone.y, t: 1 }), [])
    const effects = match.dispatch({ type: 'tap', playerId: 2, picture: 1, x: zone.x, y: zone.y, t: 1 })
    assert.deepEqual(effects[0], { type: 'found', diff: 0, playerId: 2 })
  })

  test('without a spin, player 1 starts; other modes ignore the first turn', () => {
    assert.equal(new Match(level, players, hotseat).state.currentTurn, 1)
    const duel: MatchRules = { mode: 'duel', hints: 1, timeLimitSec: null, turnSec: null }
    assert.equal(new Match(level, players, duel, { firstTurn: 2 }).state.currentTurn, 1)
  })
})
