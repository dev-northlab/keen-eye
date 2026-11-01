import type { Locale } from './index.ts'

// What the language picker shows for each locale. Adding a locale without an entry here fails the type check.

/** Per language: its name in that language and a flag (SVG markup in its own viewBox, shown cropped to 3:2). */
export const LANGUAGES: Record<Locale, { name: string; flag: { viewBox: string; svg: string } }> = {
  ru: {
    name: 'Русский',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="6" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039a6"/><rect y="4" width="9" height="2" fill="#d52b1e"/>',
    },
  },
  en: {
    // Union Jack, simplified (no counterchange of the red diagonals).
    name: 'English',
    flag: {
      viewBox: '0 0 60 30',
      svg:
        '<rect width="60" height="30" fill="#012169"/>' +
        '<path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="6"/>' +
        '<path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" stroke-width="2"/>' +
        '<path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>' +
        '<path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/>',
    },
  },
  hy: {
    name: 'Հայերեն',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="2" fill="#d90012"/><rect y="2" width="9" height="2" fill="#0033a0"/><rect y="4" width="9" height="2" fill="#f2a800"/>',
    },
  },
}
