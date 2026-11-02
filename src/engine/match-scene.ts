import { Board, randomUnfound, type Tap } from './board.ts'
import { FrameLoop } from './loop.ts'
import { Match, type MatchEffect, type MatchState, type PlayerId } from './match.ts'
import type { Level } from './types.ts'

export interface MatchHandlers {
  /** After every change of the match state (scores, locks, turn, hints): a snapshot for the view. */
  onChange?: (state: MatchState) => void
  onFound?: (playerId: PlayerId) => void
  onMiss?: (playerId: PlayerId) => void
  /** Hot-seat: the turn passed; the scene has paused itself until resume() (hand the phone over). */
  onTurn?: (playerId: PlayerId) => void
  /** Called when the whole number of elapsed seconds changes. */
  onTick?: (seconds: number) => void
  /** Zoom of board 0 (shared boards only; face-to-face boards reset with a double tap). */
  onZoom?: (scale: number) => void
  /** A hint is shown (true) or its difference was found (false) on board 0 or 1. */
  onHint?: (board: number, active: boolean) => void
  onComplete?: (state: MatchState) => void
}

export interface MatchSceneOptions {
  /** Animation time multiplier (reduce motion). */
  animationSpeed?: number
}

/**
 * Two-player scene on one device: the clock, one or two boards and the match
 * engine. Containers: one = a shared board (duel: picture A belongs to player 1,
 * B to player 2; hot-seat: the player whose turn it is; co-op: by picture, for the
 * mark colors), two = face to face (player 1's board, then player 2's, turned by 180°).
 */
export class MatchScene {
  private readonly match: Match
  private readonly handlers: MatchHandlers
  private readonly animationSpeed: number
  private readonly boards: Board[]
  private readonly loop: FrameLoop
  private elapsedMs = 0
  private animTime = 0

  constructor(containers: HTMLElement[], level: Level, match: Match, handlers: MatchHandlers = {}, options: MatchSceneOptions = {}) {
    this.match = match
    this.handlers = handlers
    this.animationSpeed = options.animationSpeed ?? 1
    const faceToFace = containers.length > 1
    // A shared duel board has no zoom: one player must not zoom the other's view, and two fingers are two taps.
    const zoom = faceToFace || match.rules.mode !== 'duel'
    this.boards = containers.map(
      (container, i) =>
        new Board(container, level, (hit, tap) => this.tap(hit, tap, i), {
          zoom,
          flipped: i === 1,
          onZoom: i === 0 && !faceToFace ? (s) => handlers.onZoom?.(s) : undefined,
        }),
    )
    this.loop = new FrameLoop(this.frame)
  }

  get state(): Readonly<MatchState> {
    return this.match.state
  }

  /** The board a player looks at: their own face to face, else the shared one. */
  boardOf(playerId: PlayerId): number {
    return this.boards.length > 1 ? playerId - 1 : 0
  }

  /**
   * Spends a hint of the player (co-op: of the team) and shows it on the player's board.
   * False when the player has none left or a hint is already shown there.
   */
  hint(playerId: PlayerId): boolean {
    if (this.loop.paused || this.boards[this.boardOf(playerId)].hinting) return false
    return this.apply(this.match.dispatch({ type: 'hint', playerId, t: this.seconds })) > 0
  }

  resetZoom(): void {
    for (const b of this.boards) b.resetZoom()
  }

  /** Freezes the clock, animation and input. */
  pause(): void {
    this.loop.pause()
  }

  resume(): void {
    this.loop.resume()
  }

  destroy(): void {
    this.loop.stop()
    for (const b of this.boards) b.destroy()
  }

  private get seconds(): number {
    return this.elapsedMs / 1000
  }

  // Keeps animating after the match: the scene stays alive under the result dialog.
  private frame = (dt: number, now: number) => {
    if (this.match.state.status === 'playing') {
      const prevSec = Math.floor(this.elapsedMs / 1000)
      this.elapsedMs += dt
      const sec = Math.floor(this.elapsedMs / 1000)
      if (sec !== prevSec) this.handlers.onTick?.(sec)
      this.apply(this.match.dispatch({ type: 'tick', t: this.seconds }))
    }
    this.animTime += (dt / 1000) * this.animationSpeed
    for (const b of this.boards) b.pose(this.animTime, now)
  }

  private tap(hit: number, tap: Tap, board: number): void {
    if (this.loop.paused) return
    const { mode, currentTurn } = this.match.state
    const playerId: PlayerId =
      this.boards.length > 1 ? ((board + 1) as PlayerId) : mode === 'hotseat' ? currentTurn : ((tap.picture + 1) as PlayerId)
    this.apply(this.match.dispatch({ type: 'tap', playerId, diff: hit, t: this.seconds }), { board, tap })
  }

  /** Shows the effects of an event (`at`: the tap that caused it); returns their number. */
  private apply(effects: MatchEffect[], at?: { board: number; tap: Tap }): number {
    const state = this.match.state
    for (const e of effects) {
      switch (e.type) {
        case 'found': {
          const color = state.players[e.playerId - 1].color
          this.boards.forEach((b, i) => b.markFound(e.diff, color) && this.handlers.onHint?.(i, false))
          this.handlers.onFound?.(e.playerId)
          break
        }
        case 'miss':
          if (at) this.boards[at.board].markMiss(at.tap)
          this.handlers.onMiss?.(e.playerId)
          break
        case 'hint': {
          // The match spends a hint only while something is unfound.
          const board = this.boardOf(e.playerId)
          this.boards[board].showHint(randomUnfound([...Array(state.total).keys()].map((i) => this.match.isFound(i))))
          this.handlers.onHint?.(board, true)
          break
        }
        case 'turn':
          this.loop.pause()
          this.handlers.onTurn?.(e.playerId)
          break
        case 'finished':
          this.handlers.onComplete?.(structuredClone(state))
          break
        case 'lock':
          break
      }
    }
    if (effects.length) this.handlers.onChange?.(structuredClone(state))
    return effects.length
  }
}
