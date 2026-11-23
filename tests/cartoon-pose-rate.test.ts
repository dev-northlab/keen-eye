import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { MIN_POSE_INTERVAL_MS, PoseRate } from '../src/engine/pace.ts'

/** Runs frames every `frameMs` for `seconds`, posing when due; returns the poses per second at the end and the rate. */
function play(rate: PoseRate, frameMs: number, seconds: number, start = 0) {
  let lastPose = -Infinity
  let poses = 0
  let now = start
  const end = start + seconds * 1000
  const lastSecond = end - 1000
  for (; now < end; now += frameMs) {
    if (rate.due(now, lastPose)) {
      lastPose = now
      if (now >= lastSecond) poses++
    }
  }
  return { poses, now }
}

describe('cartoon pose rate', () => {
  test('poses about 60 times a second on a 60 Hz and a 120 Hz screen', () => {
    assert.ok(play(new PoseRate(), 1000 / 60, 6).poses >= 58)
    assert.ok(play(new PoseRate(), 1000 / 120, 6).poses >= 58)
  })

  test('falls back to the usual pace when the phone cannot keep 60, and tries 60 again later', () => {
    const rate = new PoseRate()
    // A phone that manages only 35 frames a second.
    const slow = play(rate, 1000 / 35, 9)
    assert.equal(rate.interval, MIN_POSE_INTERVAL_MS)
    // Some seconds later it tries 60 again (the phone got faster).
    play(rate, 1000 / 60, 12, slow.now)
    assert.ok(rate.interval < MIN_POSE_INTERVAL_MS)
  })

  test('a busy start of the level does not drop the pace', () => {
    const rate = new PoseRate()
    // Opening: 3.5 s at 25 frames a second, then the phone runs at 60.
    const busy = play(rate, 1000 / 25, 3.5)
    play(rate, 1000 / 60, 6, busy.now)
    assert.ok(rate.interval < MIN_POSE_INTERVAL_MS)
  })

  test('one slow moment later on does not drop the pace either', () => {
    const rate = new PoseRate()
    const fast = play(rate, 1000 / 60, 6)
    // A second of slow frames (a notification, the garbage collector).
    const hiccup = play(rate, 1000 / 30, 1, fast.now)
    play(rate, 1000 / 60, 4, hiccup.now)
    assert.ok(rate.interval < MIN_POSE_INTERVAL_MS)
  })

  test('a pause does not count as slow frames', () => {
    const rate = new PoseRate()
    const first = play(rate, 1000 / 60, 3)
    // Five seconds paused (no frames), then on again.
    play(rate, 1000 / 60, 5, first.now + 5000)
    assert.ok(rate.interval < MIN_POSE_INTERVAL_MS)
  })
})
