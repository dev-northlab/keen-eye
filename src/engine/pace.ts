// How often the pictures' animations are posed. No DOM, so unit tests can use it.

/**
 * The pictures' animations are posed about 30 times a second on every screen: their motion is slow (sway, bob, a
 * walk), and each pose redraws the whole picture, so 60 (or a 120 Hz screen's 120) would only spend the battery.
 * The threshold sits between one and two frames of a 60 Hz screen (three and four of 120 Hz), so frame jitter does
 * not drop it to every third.
 */
export const MIN_POSE_INTERVAL_MS = 28

/** About 60 poses a second (a 60 Hz frame is 16.7 ms; a 120 Hz screen poses every other frame). */
const FAST_POSE_MS = 14
/** Under this many poses a second while aiming at 60, the phone is not keeping up: back to the usual ~30. */
const MIN_FAST_RATE = 48
/**
 * How long a pace is measured, and how long to wait before the first measure: the first seconds of a level are busy
 * (the browser draws every gradient and pattern for the first time), and their slow frames say nothing of the phone.
 */
const RATE_WINDOW_MS = 2000
const RATE_SETTLE_MS = 3000
/** Falls back only after this many slow measures in a row: one busy moment is not a slow phone. */
const SLOW_WINDOWS = 2
/** After falling back, 60 is tried again after this long, twice as long after every further fall. */
const RETRY_FAST_MS = 8000
const MAX_RETRY_FAST_MS = 64000

/**
 * How often a cartoon poses its story and camera: ~60 times a second for its quick motion (other levels pose ~30,
 * `MIN_POSE_INTERVAL_MS`), falling back to ~30 while the phone cannot keep that pace, and trying 60 again later.
 */
export class PoseRate {
  interval = FAST_POSE_MS
  private windowStart = -1
  private poses = 0
  private retryAt = Infinity
  private retryDelay = RETRY_FAST_MS
  private last = -1
  /** Slow measures in a row at the fast pace. */
  private slow = 0

  /** The frame at `now` poses (true) or skips (false); counts the poses to measure the pace. */
  due(now: number, lastPose: number): boolean {
    // A long gap (paused, hidden) restarts the measure.
    if (this.last < 0 || now - this.last > 250) this.windowStart = now + RATE_SETTLE_MS
    this.last = now
    if (this.interval > FAST_POSE_MS && now >= this.retryAt) {
      this.interval = FAST_POSE_MS
      this.windowStart = now
      this.poses = 0
      this.slow = 0
    }
    const due = now - lastPose >= this.interval
    if (now < this.windowStart) return due
    if (due) this.poses++
    if (now - this.windowStart >= RATE_WINDOW_MS) {
      const rate = (this.poses * 1000) / (now - this.windowStart)
      if (this.interval === FAST_POSE_MS) {
        this.slow = rate < MIN_FAST_RATE ? this.slow + 1 : 0
        if (this.slow >= SLOW_WINDOWS) {
          this.interval = MIN_POSE_INTERVAL_MS
          this.retryAt = now + this.retryDelay
          this.retryDelay = Math.min(this.retryDelay * 2, MAX_RETRY_FAST_MS)
          this.slow = 0
        }
      }
      this.windowStart = now
      this.poses = 0
    }
    return due
  }
}
