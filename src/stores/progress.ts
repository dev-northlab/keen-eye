import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Level, LevelResult, Stars } from '../engine/types.ts'
import { categoryOf, chapterById, chapterLevels, KEY_CHAPTERS, TREASURY_CHAPTER } from '../levels/chapters.ts'
import { caseStars } from '../levels/detective/cases.ts'
import { allLevels, levelById, levels } from '../levels/index.ts'
import { isUpcoming } from '../levels/upcoming.ts'
import { loadJson, remove, saveJson } from '../services/storage.ts'
import {
  parseCases,
  parseGuesses,
  parseKeys,
  parseStruck,
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
  /** Suspects wrongly accused per case: kept so that leaving the screen does not undo them (docs/detective-difficulty.md). */
  const caseGuesses = ref<Record<string, string[]>>({})
  /** Suspects the player crossed out in a case's notebook: a note only, no effect on the stars. */
  const struckSuspects = ref<Record<string, string[]>>({})
  /** Chapters whose hidden golden key the player has found (docs/hidden-item-feature.md). */
  const keys = ref<string[]>([])
  /** Developer tools checkbox: every level is playable, ignoring order and the purchase (only in developer mode). */
  const devOpenAll = ref(false)
  const openAll = computed(() => devOpenAll.value && useSettingsStore().developer)

  const save = () =>
    saveJson(KEY, { levels: records.value, timeTravel: timeTravel.value, cases: solvedCases.value, guesses: caseGuesses.value, struck: struckSuspects.value, keys: keys.value })

  async function load() {
    const raw = ((await loadJson(KEY)) ?? {}) as { levels?: unknown; timeTravel?: unknown; cases?: unknown; guesses?: unknown; struck?: unknown; keys?: unknown }
    records.value = parseLevels(raw.levels)
    timeTravel.value = parseTimeTravel(raw.timeTravel)
    solvedCases.value = parseCases(raw.cases)
    caseGuesses.value = parseGuesses(raw.guesses)
    struckSuspects.value = parseStruck(raw.struck)
    keys.value = parseKeys(raw.keys)
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
   * A hidden level (levels/upcoming.ts) is reached only in developer mode.
   */
  function isReached(id: number): boolean {
    const level = levelById(id)
    if (level && isUpcoming(id)) return useSettingsStore().developer
    if (!level || openAll.value) return !!level
    if (level.chapter === TREASURY_CHAPTER.id) return allKeysFound.value
    const before = requiredBefore(level)
    return before === undefined || isCompleted(before)
  }

  /** The id of the level whose completion opens `level` (see `isReached`); undefined when nothing holds it back. */
  function requiredBefore(level: Level): number | undefined {
    const own = chapterLevels(chapterById(level.chapter)!)
    const i = own.indexOf(level)
    const opensFreeCase = !!level.detective && level.detective.case !== own[i - 1]?.detective!.case && isFreeLevel(level.id)
    if (i > 0 && !opensFreeCase) return own[i - 1].id
    return level.id === 1 || categoryOf(level) !== undefined ? undefined : level.id - 1
  }

  /**
   * For a level not reached yet: the reached level to complete first on the way to it (the first of the chain of
   * levels holding it back that is open), for the "complete … first" message. Undefined for a level with no such
   * level (the treasury, a hidden one).
   */
  function firstToComplete(id: number): Level | undefined {
    let level = levelById(id)
    if (!level || isReached(id) || isUpcoming(id) || level.chapter === TREASURY_CHAPTER.id) return undefined
    while (level && !isReached(level.id)) {
      const before = requiredBefore(level)
      level = before === undefined ? undefined : levelById(before)
    }
    return level
  }

  /** The level not reached yet whose "complete … first" message is open (`LockedLevelDialog`, mounted in App.vue). */
  const lockedLevelId = ref<number | null>(null)

  /** A tap on a level not reached yet: tells which level to complete first. */
  function showLocked(id: number) {
    if (firstToComplete(id)) lockedLevelId.value = id
  }

  /** A paid level while the full game is not bought. Hidden levels (developer mode only) are free to test. */
  const needsPurchase = (id: number) => !openAll.value && !isUpcoming(id) && !isFreeLevel(id) && !usePurchaseStore().fullGame

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

  const recordResult = (id: number, result: LevelResult) => record(records.value, id, result)
  const recordCalmCompletion = (id: number) => recordCalm(records.value, id)

  /** A finished "find the odd one out" level; `null` = calm mode (no stars or time). */
  const recordTimeTravel = (id: string, result: LevelResult | null) =>
    result ? record(timeTravel.value, id, result) : recordCalm(timeTravel.value, id)

  const isCaseSolved = (id: string) => solvedCases.value.includes(id)

  const wrongGuesses = (id: string) => caseGuesses.value[id] ?? []

  /** Stars of a solved case: fewer for every wrong guess before it. */
  const caseStarsOf = (id: string) => caseStars(wrongGuesses(id).length)

  /** The player accused an innocent `suspect` of case `id`. */
  async function guessWrong(id: string, suspect: string) {
    if (isCaseSolved(id) || wrongGuesses(id).includes(suspect)) return
    caseGuesses.value[id] = [...wrongGuesses(id), suspect]
    await save()
  }

  const isStruck = (id: string, suspect: string) => struckSuspects.value[id]?.includes(suspect) ?? false

  /** Crosses `suspect` of case `id` out of the notebook, or brings them back. */
  async function toggleStruck(id: string, suspect: string) {
    const list = struckSuspects.value[id] ?? []
    struckSuspects.value[id] = isStruck(id, suspect) ? list.filter((s) => s !== suspect) : [...list, suspect]
    await save()
  }

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
    caseGuesses.value = {}
    struckSuspects.value = {}
    keys.value = []
    await remove(KEY)
  }

  return {
    records,
    timeTravel,
    solvedCases,
    keys,
    devOpenAll,
    lockedLevelId,
    load,
    isCompleted,
    isReached,
    isUnlocked,
    firstToComplete,
    showLocked,
    needsPurchase,
    continueLevelId,
    totalStars,
    recordResult,
    recordCalmCompletion,
    recordTimeTravel,
    isCaseSolved,
    solveCase,
    wrongGuesses,
    caseStarsOf,
    guessWrong,
    isStruck,
    toggleStruck,
    hasKey,
    allKeysFound,
    collectKey,
    resetKeys,
    unlockAll,
    reset,
  }
})
