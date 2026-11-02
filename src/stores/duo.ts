import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { MATCH_MODES, type MatchMode, type MatchRules } from '../engine/match.ts'
import type { Level } from '../engine/types.ts'
import { levels } from '../levels/index.ts'
import { loadJson, saveJson } from '../services/storage.ts'
import { useProgressStore } from './progress.ts'

// Two players on one device: the match setup (kept between matches) and the match history.

const SETUP_KEY = 'duoSetup'
const HISTORY_KEY = 'duoHistory'
const HISTORY_LIMIT = 50
export const NAME_MAX = 16

/** Player colors (found marks, HUD); `id` is the i18n key `duo.colors.<id>`. Defaults: blue and red. */
export const PLAYER_COLORS = [
  { id: 'blue', value: '#3b82f6' },
  { id: 'red', value: '#ef4444' },
  { id: 'green', value: '#22c55e' },
  { id: 'orange', value: '#f59e0b' },
  { id: 'purple', value: '#a855f7' },
  { id: 'pink', value: '#ec4899' },
] as const
const isColor = (v: unknown): v is string => PLAYER_COLORS.some((c) => c.value === v)

/** Duel and co-op time limit, minutes (null = none, the default: like the calm mode). */
export const TIME_LIMITS = [null, 2, 3, 5] as const
/** Hot-seat turn length, seconds (null = until a miss). */
export const TURN_LENGTHS = [15, 30, 60, null] as const
/** Duel hints per player: none by default, or one each. */
export const DUEL_HINTS = [0, 1] as const
const COOP_HINTS = 3

/** Levels with this many differences last longer and suit two players best. */
const MULTIPLAYER_MIN_DIFFERENCES = 7
export const isMultiplayerReady = (level: Level) => level.differences.length >= MULTIPLAYER_MIN_DIFFERENCES

export interface DuoPlayer {
  /** Empty = the default "Player N" in the current language. */
  name: string
  color: string
}

export interface DuoSetup {
  mode: MatchMode
  players: [DuoPlayer, DuoPlayer]
  /** Duel on a tablet: each player gets their own copy of the pictures, the far one turned by 180°. */
  faceToFace: boolean
  duelHints: (typeof DUEL_HINTS)[number]
  timeLimitMin: (typeof TIME_LIMITS)[number]
  turnSec: (typeof TURN_LENGTHS)[number]
}

export interface MatchRecord {
  /** Date.now() at the end. */
  at: number
  mode: MatchMode
  levelId: number
  players: { name: string; score: number }[]
  /** 1 or 2; 0 = draw or co-op. */
  winner: 0 | 1 | 2
}

const defaultSetup = (): DuoSetup => ({
  mode: 'duel',
  players: [
    { name: '', color: PLAYER_COLORS[0].value },
    { name: '', color: PLAYER_COLORS[1].value },
  ],
  faceToFace: false,
  duelHints: 0,
  timeLimitMin: null,
  turnSec: 30,
})

const pick = <T>(options: readonly T[], v: unknown, fallback: T): T => (options.includes(v as T) ? (v as T) : fallback)

/** Storage content is not trusted: anything malformed falls back to the default. */
function parseSetup(raw: unknown): DuoSetup {
  const d = defaultSetup()
  if (typeof raw !== 'object' || raw === null) return d
  const r = raw as Record<string, unknown>
  const players = Array.isArray(r.players) ? r.players : []
  const parsed = d.players.map((def, i) => {
    const p = (players[i] ?? {}) as Record<string, unknown>
    return {
      name: typeof p.name === 'string' ? p.name.slice(0, NAME_MAX) : '',
      color: isColor(p.color) ? p.color : def.color,
    }
  }) as DuoSetup['players']
  if (parsed[0].color === parsed[1].color) parsed[1].color = PLAYER_COLORS.find((c) => c.value !== parsed[0].color)!.value
  return {
    mode: pick(MATCH_MODES, r.mode, d.mode),
    players: parsed,
    faceToFace: typeof r.faceToFace === 'boolean' ? r.faceToFace : d.faceToFace,
    duelHints: pick(DUEL_HINTS, r.duelHints, d.duelHints),
    timeLimitMin: pick(TIME_LIMITS, r.timeLimitMin, d.timeLimitMin),
    turnSec: pick(TURN_LENGTHS, r.turnSec, d.turnSec),
  }
}

function parseHistory(raw: unknown): MatchRecord[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((m): m is MatchRecord => {
    if (typeof m !== 'object' || m === null) return false
    const { at, mode, levelId, players, winner } = m as Record<string, unknown>
    return (
      typeof at === 'number' &&
      MATCH_MODES.includes(mode as MatchMode) &&
      Number.isInteger(levelId) &&
      [0, 1, 2].includes(winner as number) &&
      Array.isArray(players) &&
      players.length === 2 &&
      players.every((p) => typeof p?.name === 'string' && Number.isInteger(p?.score))
    )
  })
}

export const useDuoStore = defineStore('duo', () => {
  /** Changed by writing the fields directly (v-model); every change is saved. */
  const setup = ref<DuoSetup>(defaultSetup())
  /** Newest first. */
  const history = ref<MatchRecord[]>([])

  async function load() {
    setup.value = parseSetup(await loadJson(SETUP_KEY))
    history.value = parseHistory(await loadJson(HISTORY_KEY))
  }

  watch(setup, (s) => saveJson(SETUP_KEY, s), { deep: true })

  /** Rules of a match with the current setup. */
  const rules = computed<MatchRules>(() => {
    const s = setup.value
    return {
      mode: s.mode,
      hints: s.mode === 'duel' ? s.duelHints : s.mode === 'coop' ? COOP_HINTS : 0,
      timeLimitSec: s.timeLimitMin === null ? null : s.timeLimitMin * 60,
      turnSec: s.turnSec,
    }
  })

  async function recordMatch(record: MatchRecord) {
    history.value = [record, ...history.value].slice(0, HISTORY_LIMIT)
    await saveJson(HISTORY_KEY, history.value)
  }

  /** Wins by player name over the stored history (duels and hot-seat), most wins first. */
  const wins = computed(() => {
    const byName = new Map<string, number>()
    for (const m of history.value) {
      if (m.winner === 0) continue
      const name = m.players[m.winner - 1].name
      byName.set(name, (byName.get(name) ?? 0) + 1)
    }
    return [...byName].map(([name, n]) => ({ name, wins: n })).sort((a, b) => b.wins - a.wins)
  })

  /** Two players may play every free level and, after the purchase, every level. */
  const isAvailable = (level: Level) => !useProgressStore().needsPurchase(level.id)

  /** A random available level, preferring the ones with more differences. */
  function randomLevel(): Level {
    const available = levels.filter(isAvailable)
    const ready = available.filter(isMultiplayerReady)
    const pool = ready.length ? ready : available
    return pool[Math.floor(Math.random() * pool.length)]
  }

  return { setup, history, rules, wins, load, recordMatch, isAvailable, randomLevel }
})
