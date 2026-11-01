import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LevelResult, Stars } from '../engine/types.ts'
import { levels } from '../levels/index.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'

const KEY = 'progress'
/** Hint pool of a new player (spec, section 9). */
const START_HINTS = 5

export interface LevelRecord {
  /** 0 = completed only in calm mode (no stars). */
  stars: Stars | 0
  /** null until completed in normal mode (calm mode has no timer). */
  bestTimeSec: number | null
}

/** Keeps only well-formed records: storage content is not trusted. */
function parseLevels(raw: unknown): Record<number, LevelRecord> {
  const out: Record<number, LevelRecord> = {}
  if (typeof raw !== 'object' || raw === null) return out
  for (const [id, rec] of Object.entries(raw)) {
    const { stars, bestTimeSec } = (rec ?? {}) as Partial<LevelRecord>
    if (!Number.isInteger(Number(id)) || ![0, 1, 2, 3].includes(stars as number)) continue
    if (bestTimeSec !== null && !(typeof bestTimeSec === 'number' && bestTimeSec >= 0)) continue
    out[Number(id)] = { stars: stars as LevelRecord['stars'], bestTimeSec }
  }
  return out
}

function parseHints(raw: unknown): number {
  return Number.isInteger(raw) && (raw as number) >= 0 ? (raw as number) : START_HINTS
}

export const useProgressStore = defineStore('progress', () => {
  const records = ref<Record<number, LevelRecord>>({})
  /** Shared hint pool of normal mode (calm mode hints are unlimited). */
  const hints = ref(START_HINTS)

  const save = () => saveJson(KEY, { levels: records.value, hints: hints.value })

  async function load() {
    const raw = ((await loadJson(KEY)) ?? {}) as { levels?: unknown; hints?: unknown }
    records.value = parseLevels(raw.levels)
    hints.value = parseHints(raw.hints)
  }

  const isCompleted = (id: number) => id in records.value

  /** Levels open one after another: the first one, then each after the previous is completed. */
  function isUnlocked(id: number): boolean {
    const i = levels.findIndex((l) => l.id === id)
    return i === 0 || (i > 0 && isCompleted(levels[i - 1].id))
  }

  /** Level for "Play": the first unlocked level not completed yet; undefined when all are done. */
  const continueLevelId = computed(() => levels.find((l) => isUnlocked(l.id) && !isCompleted(l.id))?.id)

  const totalStars = computed(() => Object.values(records.value).reduce((s, r) => s + r.stars, 0))

  /**
   * Stores a normal mode result, keeping the best stars and time. The first
   * three-star finish of a level earns a hint.
   */
  async function recordResult(id: number, result: LevelResult) {
    const prev = records.value[id]
    if (result.stars === 3 && prev?.stars !== 3) hints.value++
    records.value[id] = {
      stars: Math.max(prev?.stars ?? 0, result.stars) as Stars,
      bestTimeSec: Math.min(prev?.bestTimeSec ?? Infinity, result.timeSec),
    }
    await save()
  }

  /** Calm mode: the level is marked completed without stars or time. */
  async function recordCalmCompletion(id: number) {
    records.value[id] ??= { stars: 0, bestTimeSec: null }
    await save()
  }

  /** Takes one hint from the pool; false when it is empty. */
  async function spendHint(): Promise<boolean> {
    if (hints.value <= 0) return false
    hints.value--
    await save()
    return true
  }

  /** Development only: complete every level with one star. */
  async function unlockAll() {
    for (const l of levels) records.value[l.id] ??= { stars: 1, bestTimeSec: null }
    await save()
  }

  async function reset() {
    records.value = {}
    hints.value = START_HINTS
    await remove(KEY)
  }

  return {
    records,
    hints,
    load,
    isCompleted,
    isUnlocked,
    continueLevelId,
    totalStars,
    recordResult,
    recordCalmCompletion,
    spendHint,
    unlockAll,
    reset,
  }
})
