import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { sampleKeys } from '../src/engine/keyframes.ts'
import type { Keyframe } from '../src/engine/types.ts'

describe('keyframes', () => {
  test('eases from key to key, a field left out keeping the key before', () => {
    const keys: Keyframe[] = [{ t: 0, x: 0, rot: 10 }, { t: 2, x: 20 }]
    const at1 = sampleKeys(keys, 1, 4, ['x', 'rot'] as const, { x: 0, rot: 0 })
    assert.equal(at1.x, 10)
    assert.equal(at1.rot, 10)
  })

  test('the same keys read with other fields give those fields, not what an earlier read filled in', () => {
    const keys: Keyframe[] = [{ t: 0, x: 0, y: 0 }, { t: 2, x: 20, y: 40 }]
    // A level working out where something will be reads only x and y…
    assert.deepEqual(sampleKeys(keys, 1, 4, ['x', 'y'] as const, { x: 0, y: 0 }), { x: 10, y: 20 })
    // …and posing the same keys later reads them all, the scale at its rest.
    const all = sampleKeys(keys, 1, 4, ['x', 'y', 'sx'] as const, { x: 0, y: 0, sx: 1 })
    assert.deepEqual(all, { x: 10, y: 20, sx: 1 })
  })
})
