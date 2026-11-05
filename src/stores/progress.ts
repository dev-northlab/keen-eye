import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { LevelResult, Stars } from '../engine/types.ts'
import { categoryOf, chapterById, chapterLevels, KEY_CHAPTERS, TREASURY_CHAPTER } from '../levels/chapters.ts'
import { allLevels, levelById, levels } from '../levels/index.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'
import {
  parseCases,
  parseHard,
  parseKeys,
  parseLevels,
  parseTimeTravel,
  type LevelRecord,
} from './progress-data.ts'
import { isFreeLevel, usePurchaseStore } from './purchase.ts'
import { useSettingsStore } from './settings.ts'

const KEY = 'progress'
const DEV_OPEN_ALL_KEY = 'devOpenAll'

export const useProgressStore = defineStore('progress', () => {
  const records = ref<Record<number, LevelRecord>>({})
  /** "Find the odd one out" levels by their string id (docs/anachronism-mode.md); no unlock order. */
  const timeTravel = ref<Record<string, LevelRecord>>({})
  /** "Detective" cases whose culprit the player has named (docs/detective-mode.md). */
  const solvedCases = ref<string[]>([])
  /** Chapters whose hidden golden key the player has found (docs/hidden-item-feature.md). */
  const keys = ref<string[]>([])
  /** Best red stars of hard mode by level id, shown next to the normal mode's (yellow) stars. */
  const hard = ref<Record<string, Stars>>({})
  /** Developer tools checkbox: every level is playable, ignoring order and the purchase (only in developer mode). */
  const devOpenAll = ref(false)
  const openAll = computed(() => devOpenAll.value && useSettingsStore().developer)

  const save = () =>
    saveJson(KEY, { levels: records.value, timeTravel: timeTravel.value, cases: solvedCases.value, keys: keys.value, hard: hard.value })

  async function load() {
    const raw = ((await loadJson(KEY)) ?? {}) as { levels?: unknown; timeTravel?: unknown; cases?: unknown; keys?: unknown; hard?: unknown }
    records.value = parseLevels(raw.levels)
    timeTravel.value = parseTimeTravel(raw.timeTravel)
    solvedCases.value = parseCases(raw.cases)
    keys.value = parseKeys(raw.keys)
    hard.value = parseHard(raw.hard)
    devOpenAll.value = (await loadJson(DEV_OPEN_ALL_KEY)) === true
  }

  watch(devOpenAll, (open) => saveJson(DEV_OPEN_ALL_KEY, open))

  const isCompleted = (id: number) => id in records.value

  const hasKey = (chapter: string) => keys.value.includes(chapter)

  /** Every chapter's key is found: the treasury opens. */
  const allKeysFound = computed(() => KEY_CHAPTERS.every((c) => hasKey(c.id)))

  /**
   * Levels open one after another: the first one, then each after the previous level of its chapter
   * is completed. A world's first level follows level id − 1 (the previous world's first 20), so
   * the harder levels added at a world's end never hold back the next world. A category ("time",
   * "memory") starts open, and so does a free "detective" case. The treasury opens with the last key.
   */
  function isReached(id: number): boolean {
    const level = levelById(id)
    if (!level || openAll.value) return !!level
    if (level.chapter === TREASURY_CHAPTER.id) return allKeysFound.value
    const own = chapterLevels(chapterById(level.chapter)!)
    const i = own.indexOf(level)
    const opensFreeCase = !!level.detective && level.detective.case !== own[i - 1]?.detective!.case && isFreeLevel(id)
    if (i > 0 && !opensFreeCase) return isCompleted(own[i - 1].id)
    return id === 1 || categoryOf(level) !== undefined || isCompleted(id - 1)
  }

  /** A paid level while the full game is not bought. */
  const needsPurchase = (id: number) => !openAll.value && !isFreeLevel(id) && !usePurchaseStore().fullGame

  /** Playable: reached in order and, for paid levels, bought. */
  const isUnlocked = (id: number) => isReached(id) && !needsPurchase(id)

  /** Level for "Play": the first reached level not completed yet (may need the purchase); undefined when all are done. */
  const continueLevelId = computed(() => levels.find((l) => isReached(l.id) && !isCompleted(l.id))?.id)

  const totalStars = computed(() => Object.values(records.value).reduce((s, r) => s + r.stars, 0))

  /**
   * Stores a normal mode result in `map`, keeping the best stars and time.
   */
  async function record(map: Record<string | number, LevelRecord>, id: string | number, result: LevelResult) {
    const prev = map[id]
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

  /**
   * Hard mode: the level is passed — completed in `map` (without yellow stars, like calm mode, if it was not)
   * and its best red stars kept.
   */
  async function recordHard(map: Record<string | number, LevelRecord>, id: string | number, stars: Stars) {
    map[id] ??= { stars: 0, bestTimeSec: null }
    hard.value[id] = Math.max(hard.value[id] ?? 0, stars) as Stars
    await save()
  }

  /** Best red stars of level `id`; 0 = not passed in hard mode. */
  const hardStars = (id: number | string): Stars | 0 => hard.value[id] ?? 0

  const recordResult = (id: number, result: LevelResult) => record(records.value, id, result)
  const recordCalmCompletion = (id: number) => recordCalm(records.value, id)
  const recordHardPass = (id: number, stars: Stars) => recordHard(records.value, id, stars)

  /** A finished "find the odd one out" level; `null` = calm mode (no stars or time). */
  const recordTimeTravel = (id: string, result: LevelResult | null) =>
    result ? record(timeTravel.value, id, result) : recordCalm(timeTravel.value, id)
  const recordTimeTravelHard = (id: string, stars: Stars) => recordHard(timeTravel.value, id, stars)

  const isCaseSolved = (id: string) => solvedCases.value.includes(id)

  /** The player named the culprit of case `id`. */
  async function solveCase(id: string) {
    if (isCaseSolved(id)) return
    solvedCases.value.push(id)
    await save()
  }

  /** The hidden key of `chapter` was found. */
  async function collectKey(chapter: string) {
    if (hasKey(chapter)) return
    keys.value.push(chapter)
    await save()
  }

  /** Development only: forget the hidden keys found, so they show on the pictures again. */
  async function resetKeys() {
    keys.value = []
    await save()
  }

  /** Development only: complete every level with one star. */
  async function unlockAll() {
    for (const l of allLevels) records.value[l.id] ??= { stars: 1, bestTimeSec: null }
    await save()
  }

  async function reset() {
    records.value = {}
    timeTravel.value = {}
    solvedCases.value = []
    keys.value = []
    hard.value = {}
    await remove(KEY)
  }

  return {
    records,
    timeTravel,
    solvedCases,
    keys,
    hard,
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
    recordHardPass,
    recordTimeTravelHard,
    hardStars,
    isCaseSolved,
    solveCase,
    hasKey,
    allKeysFound,
    collectKey,
    resetKeys,
    unlockAll,
    reset,
  }
})
