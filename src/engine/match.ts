// Match engine of the two-player modes: rules and state only, no DOM and no clock of its own.
// Input comes as events (from this device now, from the network later); the answer is a list
// of effects for the view (marks, sounds, the hand-over screen). Taps are hit-tested here,
// against the zones of the tapped picture at the tap's time, so the engine alone decides.
import { zoneCenter } from './animation.ts'
import { hitTest } from './rules.ts'
import type { Animation, Level } from './types.ts'

export const MATCH_MODES = ['duel', 'hotseat', 'coop'] as const
/** duel: both at once, first to find scores; hotseat: by turns; coop: together, one shared score. */
export type MatchMode = (typeof MATCH_MODES)[number]
export type PlayerId = 1 | 2

/** A wrong tap locks the player (co-op: the team) for this long, seconds. */
export const MISS_LOCK_SEC = 2

export interface MatchRules {
  mode: MatchMode
  /** Duel: hints per player; co-op: hints of the team; hot-seat: none. */
  hints: number
  /** Duel and co-op: the match ends after this many seconds; null = no limit. */
  timeLimitSec: number | null
  /** Hot-seat: a turn also ends after this many seconds (it always ends on a miss); null = only on a miss. */
  turnSec: number | null
}

export interface MatchPlayer {
  id: PlayerId
  name: string
  /** Color of the player's found marks. */
  color: string
  score: number
  misses: number
  hints: number
  /** Match time (s) until which the player's taps are ignored; 0 = not locked. */
  lockedUntil: number
}

export interface FoundDifference {
  diffIndex: number
  byPlayer: PlayerId
  /** Match time, s. */
  at: number
}

export interface MatchState {
  mode: MatchMode
  levelId: number
  /** Number of differences of the level. */
  total: number
  players: [MatchPlayer, MatchPlayer]
  found: FoundDifference[]
  /** Hot-seat: whose turn it is; other modes: 1. */
  currentTurn: PlayerId
  /** Hot-seat: match time the current turn began. */
  turnStartedAt: number
  status: 'playing' | 'finished'
}

/** `t` is the match time in seconds (the scene's clock; it stops while paused). */
export type MatchEvent =
  /** A tap on picture 0 (A) or 1 (B) at scene point (x, y). */
  | { type: 'tap'; playerId: PlayerId; picture: 0 | 1; x: number; y: number; t: number }
  | { type: 'hint'; playerId: PlayerId; t: number }
  /** Time passes: ends locks, turns and the time limit. */
  | { type: 'tick'; t: number }

export type MatchEffect =
  | { type: 'found'; diff: number; playerId: PlayerId }
  | { type: 'miss'; playerId: PlayerId; picture: 0 | 1; x: number; y: number }
  | { type: 'lock'; playerId: PlayerId; locked: boolean }
  /** A hint was spent: the view highlights an unfound difference. */
  | { type: 'hint'; playerId: PlayerId }
  /** Hot-seat: the turn passed to `playerId`. */
  | { type: 'turn'; playerId: PlayerId }
  | { type: 'finished' }

export interface MatchOptions {
  /** Animation time per second of match time (the scene's animation speed); places the moving zones. */
  animationSpeed?: number
}

export class Match {
  readonly rules: MatchRules
  private readonly level: Level
  private readonly animationSpeed: number
  /** Animations by id of pictures A and B: moving zones follow them. */
  private readonly animations: Map<string, Animation>[]
  private readonly s: MatchState

  constructor(level: Level, players: { name: string; color: string }[], rules: MatchRules, options: MatchOptions = {}) {
    this.rules = rules
    this.level = level
    this.animationSpeed = options.animationSpeed ?? 1
    this.animations = ([0, 1] as const).map((v) => new Map((level.build?.(v).animations ?? []).map((a) => [a.id, a])))
    const player = (id: PlayerId): MatchPlayer => ({
      id,
      ...players[id - 1],
      score: 0,
      misses: 0,
      hints: rules.mode === 'hotseat' ? 0 : rules.hints,
      lockedUntil: 0,
    })
    this.s = {
      mode: rules.mode,
      levelId: level.id,
      total: level.differences.length,
      players: [player(1), player(2)],
      found: [],
      currentTurn: 1,
      turnStartedAt: 0,
      status: 'playing',
    }
  }

  get state(): Readonly<MatchState> {
    return this.s
  }

  isFound(diff: number): boolean {
    return this.s.found.some((f) => f.diffIndex === diff)
  }

  dispatch(e: MatchEvent): MatchEffect[] {
    if (this.s.status !== 'playing') return []
    switch (e.type) {
      case 'tap':
        return this.tap(e)
      case 'hint':
        return this.hint(e.playerId)
      case 'tick':
        return this.tick(e.t)
    }
  }

  private player(id: PlayerId): MatchPlayer {
    return this.s.players[id - 1]
  }

  /** Co-op shares locks and hints: they apply to both players. */
  private affected(id: PlayerId): MatchPlayer[] {
    return this.s.mode === 'coop' ? this.s.players : [this.player(id)]
  }

  private tap({ playerId: id, picture, x, y, t }: Extract<MatchEvent, { type: 'tap' }>): MatchEffect[] {
    const p = this.player(id)
    if (this.s.mode === 'hotseat' && id !== this.s.currentTurn) return []
    if (t < p.lockedUntil) return []
    const zones = this.level.differences.map((d) => ({ ...zoneCenter(d, this.animations[picture], t * this.animationSpeed), r: d.r }))
    const diff = hitTest(zones, x, y)
    if (diff >= 0) {
      // Already found (by anyone): neither a point nor a miss.
      if (this.isFound(diff)) return []
      this.s.found.push({ diffIndex: diff, byPlayer: id, at: t })
      p.score++
      const effects: MatchEffect[] = [{ type: 'found', diff, playerId: id }]
      if (this.s.found.length === this.s.total) effects.push(this.finish())
      return effects
    }
    p.misses++
    const miss: MatchEffect = { type: 'miss', playerId: id, picture, x, y }
    if (this.s.mode === 'hotseat') return [miss, this.passTurn(t)]
    const effects: MatchEffect[] = [miss]
    for (const q of this.affected(id)) {
      q.lockedUntil = t + MISS_LOCK_SEC
      effects.push({ type: 'lock', playerId: q.id, locked: true })
    }
    return effects
  }

  private hint(id: PlayerId): MatchEffect[] {
    if (this.player(id).hints <= 0 || this.s.found.length === this.s.total) return []
    for (const q of this.affected(id)) q.hints--
    return [{ type: 'hint', playerId: id }]
  }

  private tick(t: number): MatchEffect[] {
    const effects: MatchEffect[] = []
    for (const p of this.s.players) {
      if (p.lockedUntil > 0 && t >= p.lockedUntil) {
        p.lockedUntil = 0
        effects.push({ type: 'lock', playerId: p.id, locked: false })
      }
    }
    const { timeLimitSec, turnSec } = this.rules
    if (this.s.mode !== 'hotseat' && timeLimitSec !== null && t >= timeLimitSec) effects.push(this.finish())
    else if (this.s.mode === 'hotseat' && turnSec !== null && t - this.s.turnStartedAt >= turnSec) effects.push(this.passTurn(t))
    return effects
  }

  private passTurn(t: number): MatchEffect {
    this.s.currentTurn = this.s.currentTurn === 1 ? 2 : 1
    this.s.turnStartedAt = t
    return { type: 'turn', playerId: this.s.currentTurn }
  }

  private finish(): MatchEffect {
    this.s.status = 'finished'
    for (const p of this.s.players) p.lockedUntil = 0
    return { type: 'finished' }
  }
}

/** Winner by score, or null for a draw (co-op has no winner). */
export function winnerOf(state: Readonly<MatchState>): PlayerId | null {
  const [a, b] = state.players
  if (state.mode === 'coop' || a.score === b.score) return null
  return a.score > b.score ? 1 : 2
}
