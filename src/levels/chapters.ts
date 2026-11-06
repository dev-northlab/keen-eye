// Chapters ("worlds"): 20 levels each, plus 10 harder ones added later with ids after 100;
// and the categories ("time", "memory", "travel", "detective"), which play like a chapter but are not worlds.
// Adding a chapter is one entry here, its levels in `index.ts` and the `chapters.<id>` /
// `levelTitles.*` texts in every locale.
import type { Level } from '../engine/types.ts'
import { allLevels } from './index.ts'
import { upcomingLevels } from './upcoming.ts'

/** Screen backdrop worlds (drawn by components/ScreenBackdrop.vue). */
export type BackdropTheme = 'meadow' | 'farm' | 'forest' | 'sea' | 'city' | 'space'

export interface Chapter {
  /** Level.chapter value and i18n key `chapters.<id>`. */
  id: string
  /**
   * Level id ranges of the chapter, inclusive, in play order: the first 20 levels, then the harder
   * ones. Levels may still be missing at the end ("coming soon").
   */
  ranges: [from: number, to: number][]
  /** Card colors on the chapter map: border/accent and a light background. */
  color: string
  soft: string
  /** Card icon: markup inside a 48×48 viewBox. */
  icon: string
  /** Backdrop of the chapter's level grid. */
  backdrop: BackdropTheme
  /** Categories: i18n key of the rules shown above the level grid. */
  rules?: string
  /**
   * Categories: level id ranges that need no purchase, inclusive (default: the first FREE_CATEGORY_LEVELS,
   * stores/purchase.ts).
   */
  free?: [from: number, to: number][]
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'farm',
    ranges: [
      [1, 20],
      [101, 110],
      [151, 160],
    ],
    color: '#e05a47',
    soft: '#ffe9e3',
    backdrop: 'farm',
    icon:
      `<path d="M6 22L24 8l18 14v18H6Z" fill="#e05a47"/>` +
      `<path d="M4 22L24 6l20 16" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>` +
      `<rect x="17" y="24" width="14" height="16" fill="#fff"/>` +
      `<path d="M17 24l14 16M31 24L17 40" stroke="#e05a47" stroke-width="2"/>`,
  },
  {
    id: 'city',
    ranges: [
      [21, 40],
      [111, 120],
      [161, 170],
    ],
    color: '#3a86ff',
    soft: '#e3edff',
    backdrop: 'city',
    icon:
      `<rect x="5" y="18" width="12" height="24" fill="#7aa6d6"/><rect x="19" y="8" width="14" height="34" fill="#3a86ff"/>` +
      `<rect x="35" y="22" width="9" height="20" fill="#7aa6d6"/>` +
      `<g fill="#fff8e1"><rect x="22" y="12" width="3" height="4"/><rect x="28" y="12" width="3" height="4"/>` +
      `<rect x="22" y="20" width="3" height="4"/><rect x="28" y="20" width="3" height="4"/><rect x="22" y="28" width="3" height="4"/>` +
      `<rect x="28" y="28" width="3" height="4"/><rect x="8" y="22" width="3" height="4"/><rect x="8" y="30" width="3" height="4"/></g>`,
  },
  {
    id: 'forest',
    ranges: [
      [41, 60],
      [121, 130],
      [171, 180],
    ],
    color: '#2f7d55',
    soft: '#e1f2e6',
    backdrop: 'forest',
    icon:
      `<rect x="21" y="32" width="6" height="10" fill="#7a4e33"/>` +
      `<path d="M24 4L12 22h6L10 34h28L30 22h6Z" fill="#2f7d55"/>` +
      `<path d="M24 4L17 16" stroke="#fff" stroke-opacity="0.35" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: 'sea',
    ranges: [
      [61, 80],
      [131, 140],
      [181, 190],
    ],
    color: '#1f8fbf',
    soft: '#dff3fb',
    backdrop: 'sea',
    icon:
      `<circle cx="34" cy="14" r="7" fill="#ffd23f"/>` +
      `<path d="M4 28q5-8 10 0t10 0t10 0t10 0V44H4Z" fill="#3ba7cc"/>` +
      `<path d="M4 36q5-8 10 0t10 0t10 0t10 0V44H4Z" fill="#1f8fbf"/>`,
  },
  {
    id: 'space',
    ranges: [
      [81, 100],
      [141, 150],
      [191, 200],
    ],
    color: '#5b4bd6',
    soft: '#e8e4fb',
    backdrop: 'space',
    icon:
      `<circle cx="24" cy="24" r="11" fill="#9b7bff"/>` +
      `<ellipse cx="24" cy="26" rx="20" ry="6" fill="none" stroke="#5b4bd6" stroke-width="3"/>` +
      `<circle cx="9" cy="9" r="2" fill="#5b4bd6"/><circle cx="40" cy="12" r="1.5" fill="#5b4bd6"/><circle cx="38" cy="40" r="2" fill="#5b4bd6"/>`,
  },
]

/**
 * "Spot the difference in time" (docs/time-differences-mode.md, levels in `time/`): its own banner on
 * the game modes screen, not a world. Its first level is open from the start; the first
 * `FREE_CATEGORY_LEVELS` (stores/purchase.ts) need no purchase.
 */
export const TIME_CHAPTER: Chapter = {
  id: 'time',
  ranges: [[201, 240]],
  color: '#7a5af5',
  soft: '#ece6ff',
  backdrop: 'meadow',
  rules: 'timeMode.rules',
  icon:
    `<path d="M24 4a20 20 0 0 0 0 40Z" fill="#ffc94a"/><path d="M24 4a20 20 0 0 1 0 40Z" fill="#3b3f8f"/>` +
    `<circle cx="16" cy="24" r="6" fill="#fff3b0"/><path d="M34 16a7 7 0 1 0 0 12a6 6 0 0 1 0-12Z" fill="#fff3b0"/>`,
}

/**
 * "Memory" (docs/memory-mode.md, levels in `memory/`): picture A for a few seconds, then B alone, find
 * the changes from memory. Played by MemoryLevelView; open and paid like the "time" category.
 */
export const MEMORY_CHAPTER: Chapter = {
  id: 'memory',
  ranges: [[301, 340]],
  color: '#e8457a',
  soft: '#ffe6ee',
  backdrop: 'meadow',
  rules: 'memoryMode.rules',
  icon:
    `<rect x="4" y="8" width="40" height="32" rx="5" fill="#bfe6f7"/>` +
    `<path d="M4 32l11-10 9 7 8-6 12 9v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" fill="#3fa46f"/>` +
    `<circle cx="14" cy="17" r="4" fill="#ffd23f"/>` +
    `<circle cx="34" cy="20" r="11" fill="#e8457a"/>` +
    `<path d="M30.5 17.5a3.6 3.6 0 1 1 5.2 3.2c-1.2.6-1.7 1.3-1.7 2.6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>` +
    `<circle cx="34" cy="27" r="1.6" fill="#fff"/>`,
}

/**
 * "Travel" (docs/world-travel-mode.md, levels in `travel/`): a recognizable place per level, its fact
 * after the win. Listed on the world map (TravelView), not a grid; open and paid like the "time" category.
 */
export const TRAVEL_CHAPTER: Chapter = {
  id: 'travel',
  ranges: [[401, 432]],
  color: '#1f9bb5',
  soft: '#ddf4f8',
  backdrop: 'meadow',
  rules: 'worldTravel.rules',
  icon:
    `<circle cx="24" cy="24" r="20" fill="#5cc3e0"/>` +
    `<path d="M10 14q6-4 11 0t4 9q-3 4-8 2t-7 4q-4-6 0-15ZM27 30q5-3 9 1t-1 9q-6 3-9-2t1-8ZM29 9q6 0 9 5l-6 2q-4-2-3-7Z" fill="#6cc46a"/>` +
    `<path d="M38 4l-9 21l-5-6l-6 4Z" fill="#e5484d" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>`,
}

/**
 * "Detective" (docs/detective-mode.md, levels in `detective/`): cases of 5 scenes, each difference a
 * clue, then the player names the culprit (CaseView). The first case and "The missing chickens" (531–535,
 * listed first) are free.
 */
export const DETECTIVE_CHAPTER: Chapter = {
  id: 'detective',
  ranges: [[501, 535]],
  color: '#8a5a2b',
  soft: '#f6eadc',
  backdrop: 'city',
  rules: 'detective.rules',
  free: [
    [501, 505],
    [531, 535],
  ],
  icon:
    `<path d="M8 40l4-14h24l4 14Z" fill="#8a5a2b"/><path d="M6 26h36" stroke="#5e3b1a" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M14 26q2-14 10-14t10 14" fill="#a8743f"/><path d="M14 22h20" stroke="#3b2a1a" stroke-width="3"/>` +
    `<circle cx="32" cy="34" r="8" fill="#fff" fill-opacity="0.6" stroke="#3b2a1a" stroke-width="3"/>` +
    `<path d="M38 40l6 6" stroke="#3b2a1a" stroke-width="4" stroke-linecap="round"/>`,
}

/** Categories: a banner each on the game modes screen; levels numbered from 1, the first ones free. */
export const CATEGORIES = [TIME_CHAPTER, MEMORY_CHAPTER, TRAVEL_CHAPTER, DETECTIVE_CHAPTER]

/**
 * Chapters hiding a golden key (docs/hidden-item-feature.md): every world and category, one level each
 * (`Level.secret`; the key's id is the chapter id). The first is in the free part of the farm.
 */
export const KEY_CHAPTERS = [...CHAPTERS, ...CATEGORIES]

/**
 * "Treasury" (docs/hidden-item-feature.md, `treasury/`): the bonus level, opened once the key of every
 * chapter in KEY_CHAPTERS is found; reached from its banner on the game modes screen.
 */
export const TREASURY_CHAPTER: Chapter = {
  id: 'treasury',
  ranges: [[900, 900]],
  color: '#d99a00',
  soft: '#fff3cf',
  backdrop: 'meadow',
  icon:
    `<path d="M6 22q0-12 18-12t18 12Z" fill="#a8743f" stroke="#5e3b1a" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<rect x="6" y="22" width="36" height="20" rx="2" fill="#8a5a2b" stroke="#5e3b1a" stroke-width="2.5"/>` +
    `<path d="M6 28H42M14 14V42M34 14V42" stroke="#f7c948" stroke-width="3"/>` +
    `<rect x="20" y="24" width="8" height="9" rx="2" fill="#f7c948" stroke="#5e3b1a" stroke-width="1.5"/>`,
}

/**
 * "Test" (`test/`, ids from 1001): picture pairs tried out before they become real levels. Its levels sit with
 * the hidden ones (upcoming.ts), so only developer mode shows its banner on the game modes screen and plays them.
 */
export const TEST_CHAPTER: Chapter = {
  id: 'test',
  ranges: [[1001, 1100]],
  color: '#6b7280',
  soft: '#eceef2',
  backdrop: 'meadow',
  icon:
    `<path d="M18 4h12M20 4v14L8 40a3 3 0 0 0 3 4h26a3 3 0 0 0 3-4L28 18V4" fill="#eceef2" stroke="#6b7280" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M13 32h22l4 8a2 2 0 0 1-2 3H11a2 2 0 0 1-2-3Z" fill="#5cc3e0"/>`,
}

const ALL_CHAPTERS = [...CHAPTERS, ...CATEGORIES, TREASURY_CHAPTER, TEST_CHAPTER]

export const chapterById = (id: string): Chapter | undefined => ALL_CHAPTERS.find((c) => c.id === id)

export const chapterOf = (levelId: number): Chapter | undefined =>
  ALL_CHAPTERS.find((c) => c.ranges.some(([from, to]) => levelId >= from && levelId <= to))

/** The level of the chapter hiding its key. */
export const secretLevel = (chapter: Chapter) => chapterLevels(chapter).find((l) => l.secret)

/** Number of levels the chapter will have ("N of M" on its card), without the hidden ones of `upcoming.ts`. */
export const chapterSize = (chapter: Chapter) =>
  chapter.ranges.reduce((n, [from, to]) => n + to - from + 1, 0) - upcomingLevels.filter((l) => l.chapter === chapter.id).length

/** Levels of the chapter that exist, in play order (`allLevels` is sorted by id, as are the ranges). */
export const chapterLevels = (chapter: Chapter) => allLevels.filter((l) => l.chapter === chapter.id)

/** The chapter's levels followed by its hidden ones (upcoming.ts, ids after the released): developer mode's grid. */
export const chapterLevelsWithHidden = (chapter: Chapter) => [...chapterLevels(chapter), ...upcomingLevels.filter((l) => l.chapter === chapter.id)]

/**
 * The level after `level` in its chapter, or at a world's end the next world's first one. A "detective"
 * case ends with its last scene: the player names the culprit before the next case. None after a hidden level.
 */
export function nextLevel(level: Level): Level | undefined {
  const chapter = chapterById(level.chapter)!
  const own = chapterLevels(chapter)
  const i = own.indexOf(level)
  // A hidden level (upcoming.ts) is outside the order.
  if (i < 0) return undefined
  const after = own[i + 1]
  if (level.detective) return after?.detective!.case === level.detective.case ? after : undefined
  const next = CHAPTERS[CHAPTERS.indexOf(chapter) + 1]
  return after ?? (CHAPTERS.includes(chapter) && next ? chapterLevels(next)[0] : undefined)
}

/** The category of a level, or undefined for a world's level. */
export const categoryOf = (level: Level) => CATEGORIES.find((c) => c.id === level.chapter)

/**
 * Route of the screen listing a level: the world map open at its region for "travel", the case for
 * "detective", the game modes for the treasury, its chapter's grid otherwise.
 */
export const levelsScreen = (level: Level) =>
  level.travel
    ? { name: 'travel', query: { region: level.travel.region } }
    : level.detective
      ? { name: 'case', params: { case: level.detective.case } }
      : level.chapter === TREASURY_CHAPTER.id
        ? { name: 'levels' }
        : { name: 'chapter', params: { chapter: level.chapter } }

/** Number shown to the player: the id in the worlds, the place in its category (1, 2, …) otherwise. */
export function levelNumber(level: Level): number {
  const category = categoryOf(level)
  return category ? level.id - category.ranges[0][0] + 1 : level.id
}
