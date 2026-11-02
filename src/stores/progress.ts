import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { LevelResult, Stars } from '../engine/types.ts'
import { levels } from '../levels/index.ts'
import { timeTravelLevelById } from '../levels/time-travel/index.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'
import { isFreeLevel, usePurchaseStore } from './purchase.ts'

const KEY = 'progress'
const DEV_OPEN_ALL_KEY = 'devOpenAll'
/** Hint pool of a new player (spec, section 9). */
const START_HINTS = 5

export interface LevelRecord {
  /** 0 = completed only in calm mode (no stars). */
  stars: Stars | 0
  /** null until completed in normal mode (calm mode has no timer). */
  bestTimeSec: number | null
}

/** Keeps only well-formed records with ids passing `isId`: storage content is not trusted. */
function parseRecords(raw: unknown, isId: (id: string) => boolean): Record<string, LevelRecord> {
  const out: Record<string, LevelRecord> = {}
  if (typeof raw !== 'object' || raw === null) return out
  for (const [id, rec] of Object.entries(raw)) {
    const { stars, bestTimeSec } = (rec ?? {}) as Partial<LevelRecord>
    if (!isId(id) || ![0, 1, 2, 3].includes(stars as number)) continue
    if (bestTimeSec !== null && !(typeof bestTimeSec === 'number' && bestTimeSec >= 0)) continue
    out[id] = { stars: stars as LevelRecord['stars'], bestTimeSec }
  }
  return out
}

const parseLevels = (raw: unknown): Record<number, LevelRecord> => parseRecords(raw, (id) => Number.isInteger(Number(id)))

const parseTimeTravel = (raw: unknown) => parseRecords(raw, (id) => timeTravelLevelById(id) !== undefined)

function parseHints(raw: unknown): number {
  return Number.isInteger(raw) && (raw as number) >= 0 ? (raw as number) : START_HINTS
}

export const useProgressStore = defineStore('progress', () => {
  const records = ref<Record<number, LevelRecord>>({})
  /** "Find the odd one out" levels by their string id (docs/anachronism-mode.md); no unlock order. */
  const timeTravel = ref<Record<string, LevelRecord>>({})
  /** Shared hint pool of normal mode (calm mode hints are unlimited). */
  const hints = ref(START_HINTS)
  /** Development only (Home checkbox): every level is playable, ignoring order and the purchase. */
  const devOpenAll = ref(false)

  const save = () => saveJson(KEY, { levels: records.value, hints: hints.value, timeTravel: timeTravel.value })

  async function load() {
    const raw = ((await loadJson(KEY)) ?? {}) as { levels?: unknown; hints?: unknown; timeTravel?: unknown }
    records.value = parseLevels(raw.levels)
    timeTravel.value = parseTimeTravel(raw.timeTravel)
    hints.value = parseHints(raw.hints)
    devOpenAll.value = import.meta.env.DEV && (await loadJson(DEV_OPEN_ALL_KEY)) === true
  }

  watch(devOpenAll, (open) => saveJson(DEV_OPEN_ALL_KEY, open))

  const isCompleted = (id: number) => id in records.value

  /**
   * Levels open one after another: the first one, then each after the previous level of its chapter
   * is completed. A chapter's first level follows level id − 1 (the previous chapter's first 20), so
   * the harder levels added at a chapter's end never hold back the next chapter.
   */
  function isReached(id: number): boolean {
    const i = levels.findIndex((l) => l.id === id)
    if (i <= 0 || devOpenAll.value) return i >= 0
    let j = i - 1
    while (j >= 0 && levels[j].chapter !== levels[i].chapter) j--
    return isCompleted(j >= 0 ? levels[j].id : id - 1)
  }

  /** A paid level while the full game is not bought. */
  const needsPurchase = (id: number) => !devOpenAll.value && !isFreeLevel(id) && !usePurchaseStore().fullGame

  /** Playable: reached in order and, for paid levels, bought. */
  const isUnlocked = (id: number) => isReached(id) && !needsPurchase(id)

  /** Level for "Play": the first reached level not completed yet (may need the purchase); undefined when all are done. */
  const continueLevelId = computed(() => levels.find((l) => isReached(l.id) && !isCompleted(l.id))?.id)

  const totalStars = computed(() => Object.values(records.value).reduce((s, r) => s + r.stars, 0))

  /**
   * Stores a normal mode result in `map`, keeping the best stars and time. The first
   * three-star finish of a level earns a hint.
   */
  async function record(map: Record<string | number, LevelRecord>, id: string | number, result: LevelResult) {
    const prev = map[id]
    if (result.stars === 3 && prev?.stars !== 3) hints.value++
    map[id] = {
      stars: Math.max(prev?.stars ?? 0, result.stars) as Stars,
      bestTimeSec: Math.min(prev?.bestTimeSec ?? Infinity, result.timeSec),
    }
    await save()
  }

  /** Calm mode: the level is marked completed in `map` without stars or time. */
  async function recordCalm(map: Record<string | number, LevelRecord>, id: string | number) {
    map[id] ??= { stars: 0, bestTimeSec: null }
    await save()
  }

  const recordResult = (id: number, result: LevelResult) => record(records.value, id, result)
  const recordCalmCompletion = (id: number) => recordCalm(records.value, id)

  /** A finished "find the odd one out" level; `null` = calm mode (no stars or time). */
  const recordTimeTravel = (id: string, result: LevelResult | null) =>
    result ? record(timeTravel.value, id, result) : recordCalm(timeTravel.value, id)

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
    timeTravel.value = {}
    hints.value = START_HINTS
    await remove(KEY)
  }

  return {
    records,
    timeTravel,
    hints,
    devOpenAll,
    load,
    isCompleted,
    isUnlocked,
    needsPurchase,
    continueLevelId,
    totalStars,
    recordResult,
    recordCalmCompletion,
    recordTimeTravel,
    spendHint,
    unlockAll,
    reset,
  }
})
