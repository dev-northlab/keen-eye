/** Frame delta cap so that time in a hidden tab (rAF paused) is not counted. */
const MAX_FRAME_MS = 250

/**
 * requestAnimationFrame loop of a scene: calls `frame(dtMs, now)` every frame. While paused
 * no time passes; after stop() it never runs again.
 */
export class FrameLoop {
  private readonly frame: (dt: number, now: number) => void
  private rafId = 0
  private last = 0
  private running = false
  private stopped = false

  constructor(frame: (dt: number, now: number) => void) {
    this.frame = frame
    this.resume()
  }

  get paused(): boolean {
    return !this.running
  }

  pause(): void {
    this.running = false
    cancelAnimationFrame(this.rafId)
  }

  resume(): void {
    if (this.running || this.stopped) return
    this.running = true
    this.last = performance.now()
    this.rafId = requestAnimationFrame(this.tick)
  }

  stop(): void {
    this.stopped = true
    this.pause()
  }

  private tick = (now: number) => {
    const dt = Math.min(Math.max(now - this.last, 0), MAX_FRAME_MS)
    this.last = now
    this.frame(dt, now)
    // The frame may have paused the loop.
    if (this.running) this.rafId = requestAnimationFrame(this.tick)
  }
}
