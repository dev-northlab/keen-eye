/** Frame delta cap so that time in a hidden tab (rAF paused) is not counted. */
const MAX_FRAME_MS = 250

/**
 * requestAnimationFrame loop of a scene: calls `frame(dtMs, now)` every frame. A frame with nothing on screen
 * moving returns how long the loop may sleep (ms; Infinity: until `wake()`) — a still picture costs no frames, only
 * one when the timer's next second is due; 0 or nothing runs the next frame. While paused no time passes; after
 * stop() it never runs again.
 */
export class FrameLoop {
  private readonly frame: (dt: number, now: number) => number | void
  private rafId = 0
  private sleepTimer = 0
  private sleeping = false
  private last = 0
  /** The longest dt the next frame counts: one frame, or the sleep before it. */
  private maxDt = MAX_FRAME_MS
  private running = false
  private stopped = false

  constructor(frame: (dt: number, now: number) => number | void) {
    this.frame = frame
    this.resume()
  }

  get paused(): boolean {
    return !this.running
  }

  pause(): void {
    this.running = false
    this.sleeping = false
    cancelAnimationFrame(this.rafId)
    clearTimeout(this.sleepTimer)
  }

  resume(): void {
    if (this.running || this.stopped) return
    this.running = true
    this.last = performance.now()
    this.maxDt = MAX_FRAME_MS
    this.rafId = requestAnimationFrame(this.tick)
  }

  /** Something started moving (a zoom, the animation back on): ends a sleep with the next frame. */
  wake = (): void => {
    if (!this.running || !this.sleeping) return
    this.sleeping = false
    clearTimeout(this.sleepTimer)
    this.rafId = requestAnimationFrame(this.tick)
  }

  stop(): void {
    this.stopped = true
    this.pause()
  }

  private tick = (now: number) => {
    const dt = Math.min(Math.max(now - this.last, 0), this.maxDt)
    this.last = now
    const sleep = this.frame(dt, now) ?? 0
    // The frame may have paused the loop.
    if (!this.running) return
    if (sleep <= 0) {
      this.maxDt = MAX_FRAME_MS
      this.rafId = requestAnimationFrame(this.tick)
      return
    }
    this.sleeping = true
    if (sleep === Infinity) {
      this.maxDt = MAX_FRAME_MS
    } else {
      this.maxDt = sleep + MAX_FRAME_MS
      this.sleepTimer = window.setTimeout(this.wake, sleep)
    }
  }
}
