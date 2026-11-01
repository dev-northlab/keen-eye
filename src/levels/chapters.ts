// Chapters ("worlds") of 20 levels each. Adding a chapter is one entry here, its levels in
// `index.ts` and the `chapters.<id>` / `levelTitles.*` texts in the three locales.
import { levels } from './index.ts'

/** Screen backdrop worlds (drawn by components/ScreenBackdrop.vue). */
export type BackdropTheme = 'meadow' | 'forest' | 'sea' | 'city' | 'space'

export interface Chapter {
  /** Level.chapter value and i18n key `chapters.<id>`. */
  id: string
  /** Level ids of the chapter, inclusive. Levels may still be missing at the end ("coming soon"). */
  from: number
  to: number
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
    from: 1,
    to: 20,
    color: '#e05a47',
    soft: '#ffe9e3',
    backdrop: 'meadow',
    icon:
      `<path d="M6 22L24 8l18 14v18H6Z" fill="#e05a47"/>` +
      `<path d="M4 22L24 6l20 16" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>` +
      `<rect x="17" y="24" width="14" height="16" fill="#fff"/>` +
      `<path d="M17 24l14 16M31 24L17 40" stroke="#e05a47" stroke-width="2"/>`,
  },
  {
    id: 'city',
    from: 21,
    to: 40,
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
    from: 41,
    to: 60,
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
    from: 61,
    to: 80,
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
    from: 81,
    to: 100,
    color: '#5b4bd6',
    soft: '#e8e4fb',
    backdrop: 'space',
    icon:
      `<circle cx="24" cy="24" r="11" fill="#9b7bff"/>` +
      `<ellipse cx="24" cy="26" rx="20" ry="6" fill="none" stroke="#5b4bd6" stroke-width="3"/>` +
      `<circle cx="9" cy="9" r="2" fill="#5b4bd6"/><circle cx="40" cy="12" r="1.5" fill="#5b4bd6"/><circle cx="38" cy="40" r="2" fill="#5b4bd6"/>`,
  },
]

export const chapterById = (id: string): Chapter | undefined => CHAPTERS.find((c) => c.id === id)

export const chapterOf = (levelId: number): Chapter | undefined => CHAPTERS.find((c) => levelId >= c.from && levelId <= c.to)

/** Levels of the chapter that exist, in order. */
export const chapterLevels = (chapter: Chapter) => levels.filter((l) => l.chapter === chapter.id)
