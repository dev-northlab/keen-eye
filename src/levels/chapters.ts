// Chapters ("worlds"): 20 levels each, plus 10 harder ones added later with ids after 100;
// and the "time" category (TIME_CHAPTER), which plays like a chapter but is not a world.
// Adding a chapter is one entry here, its levels in `index.ts` and the `chapters.<id>` /
// `levelTitles.*` texts in every locale.
import type { Level } from '../engine/types.ts'
import { allLevels } from './index.ts'

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
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'farm',
    ranges: [
      [1, 20],
      [101, 110],
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
 * `FREE_TIME_LEVELS` (stores/purchase.ts) need no purchase.
 */
export const TIME_CHAPTER: Chapter = {
  id: 'time',
  ranges: [[201, 230]],
  color: '#7a5af5',
  soft: '#ece6ff',
  backdrop: 'meadow',
  icon:
    `<path d="M24 4a20 20 0 0 0 0 40Z" fill="#ffc94a"/><path d="M24 4a20 20 0 0 1 0 40Z" fill="#3b3f8f"/>` +
    `<circle cx="16" cy="24" r="6" fill="#fff3b0"/><path d="M34 16a7 7 0 1 0 0 12a6 6 0 0 1 0-12Z" fill="#fff3b0"/>`,
}

const ALL_CHAPTERS = [...CHAPTERS, TIME_CHAPTER]

export const chapterById = (id: string): Chapter | undefined => ALL_CHAPTERS.find((c) => c.id === id)

export const chapterOf = (levelId: number): Chapter | undefined =>
  ALL_CHAPTERS.find((c) => c.ranges.some(([from, to]) => levelId >= from && levelId <= to))

/** Number of levels the chapter will have ("N of M" on its card). */
export const chapterSize = (chapter: Chapter) => chapter.ranges.reduce((n, [from, to]) => n + to - from + 1, 0)

/** Levels of the chapter that exist, in play order (`allLevels` is sorted by id, as are the ranges). */
export const chapterLevels = (chapter: Chapter) => allLevels.filter((l) => l.chapter === chapter.id)

/** The level after `level` in its chapter, or at a world's end the next world's first one. */
export function nextLevel(level: Level): Level | undefined {
  const chapter = chapterById(level.chapter)!
  const own = chapterLevels(chapter)
  const next = CHAPTERS[CHAPTERS.indexOf(chapter) + 1]
  return own[own.indexOf(level) + 1] ?? (CHAPTERS.includes(chapter) && next ? chapterLevels(next)[0] : undefined)
}

/** Number shown to the player: the id in the worlds, the place in the category for "time" levels (1–15). */
export const levelNumber = (level: Level) =>
  level.chapter === TIME_CHAPTER.id ? level.id - TIME_CHAPTER.ranges[0][0] + 1 : level.id
