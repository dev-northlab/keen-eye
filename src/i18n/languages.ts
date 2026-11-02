import type { Locale } from './index.ts'

// What the language picker shows for each locale. Adding a locale without an entry here fails the type check.

/** Five-pointed star centred at (cx, cy) with outer radius r; one point aims at angle `deg` (−90 = up). */
function star(cx: number, cy: number, r: number, fill: string, deg = -90): string {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = ((deg + i * 36) * Math.PI) / 180
    const k = i % 2 ? r * 0.382 : r
    return `${(cx + k * Math.cos(a)).toFixed(2)},${(cy + k * Math.sin(a)).toFixed(2)}`
  })
  return `<polygon points="${points.join(' ')}" fill="${fill}"/>`
}

/** Three horizontal (or vertical) stripes in a 9×6 box. */
const tricolor = (colors: [string, string, string], vertical = false) => ({
  viewBox: '0 0 9 6',
  svg: colors
    .map((c, i) => (vertical ? `<rect x="${i * 3}" width="3" height="6" fill="${c}"/>` : `<rect y="${i * 2}" width="9" height="2" fill="${c}"/>`))
    .join(''),
})

/** Small stars of the Chinese flag, each pointing at the big star at (5, 5). */
const chinaStars = [
  [10, 2],
  [12, 4],
  [12, 7],
  [10, 9],
]
  .map(([x, y]) => star(x, y, 1, '#ffde00', (Math.atan2(5 - y, 5 - x) * 180) / Math.PI))
  .join('')

/** Korean trigrams, simplified to three solid bars each, on the four diagonals of a 36×24 flag. */
const koreaTrigrams = [33.69, 146.31, 213.69, 326.31]
  .map((a) => `<g transform="rotate(${a} 18 12)"><path d="M26.5 9h1v6h-1zM28 9h1v6h-1zM29.5 9h1v6h-1z" fill="#000"/></g>`)
  .join('')

/** Ashoka Chakra of the Indian flag (225×150): a wheel with 24 spokes. */
const chakraSpokes = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 15 * Math.PI) / 180
  return `M112.5 75L${(112.5 + 18 * Math.cos(a)).toFixed(2)} ${(75 + 18 * Math.sin(a)).toFixed(2)}`
}).join('')

/** Per language: its name in that language and a flag (SVG markup in its own viewBox, shown cropped to 3:2). */
export const LANGUAGES: Record<Locale, { name: string; flag: { viewBox: string; svg: string } }> = {
  ru: {
    name: 'Русский',
    flag: tricolor(['#fff', '#0039a6', '#d52b1e']),
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
    flag: tricolor(['#d90012', '#0033a0', '#f2a800']),
  },
  de: {
    name: 'Deutsch',
    flag: tricolor(['#000', '#dd0000', '#ffce00']),
  },
  fr: {
    name: 'Français',
    flag: tricolor(['#0055a4', '#fff', '#ef4135'], true),
  },
  es: {
    // Without the coat of arms.
    name: 'Español',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="6" fill="#aa151b"/><rect y="1.5" width="9" height="3" fill="#f1bf00"/>',
    },
  },
  it: {
    name: 'Italiano',
    flag: tricolor(['#009246', '#fff', '#ce2b37'], true),
  },
  pt: {
    // Brazilian Portuguese; Brazil's flag without the motto band and stars.
    name: 'Português',
    flag: {
      viewBox: '0 0 21 14',
      svg:
        '<rect width="21" height="14" fill="#009c3b"/>' +
        '<path d="M1.7 7L10.5 1.6 19.3 7 10.5 12.4z" fill="#ffdf00"/>' +
        '<circle cx="10.5" cy="7" r="3.5" fill="#002776"/>',
    },
  },
  nl: {
    name: 'Nederlands',
    flag: tricolor(['#ae1c28', '#fff', '#21468b']),
  },
  pl: {
    name: 'Polski',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="3" fill="#fff"/><rect y="3" width="9" height="3" fill="#dc143c"/>',
    },
  },
  cs: {
    name: 'Čeština',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="3" fill="#fff"/><rect y="3" width="9" height="3" fill="#d7141a"/><path d="M0 0L4.5 3 0 6z" fill="#11457e"/>',
    },
  },
  ro: {
    name: 'Română',
    flag: tricolor(['#002b7f', '#fcd116', '#ce1126'], true),
  },
  bg: {
    name: 'Български',
    flag: tricolor(['#fff', '#00966e', '#d62612']),
  },
  uk: {
    name: 'Українська',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="3" fill="#0057b7"/><rect y="3" width="9" height="3" fill="#ffd700"/>',
    },
  },
  el: {
    name: 'Ελληνικά',
    flag: {
      viewBox: '0 0 27 18',
      svg:
        '<rect width="27" height="18" fill="#0d5eaf"/>' +
        '<path d="M10 3h17M10 7h17M0 11h27M0 15h27" stroke="#fff" stroke-width="2"/>' +
        '<path d="M5 0v10M0 5h10" stroke="#fff" stroke-width="2"/>',
    },
  },
  hu: {
    name: 'Magyar',
    flag: tricolor(['#ce2939', '#fff', '#477050']),
  },
  tr: {
    name: 'Türkçe',
    flag: {
      viewBox: '0 0 30 20',
      svg:
        '<rect width="30" height="20" fill="#e30a17"/>' +
        '<circle cx="10" cy="10" r="5" fill="#fff"/><circle cx="11.25" cy="10" r="4" fill="#e30a17"/>' +
        star(18.6, 10, 2.5, '#fff', 180),
    },
  },
  hi: {
    name: 'हिन्दी',
    flag: {
      viewBox: '0 0 225 150',
      svg:
        '<rect width="225" height="50" fill="#ff9933"/><rect y="50" width="225" height="50" fill="#fff"/><rect y="100" width="225" height="50" fill="#138808"/>' +
        `<g fill="none" stroke="#000080"><circle cx="112.5" cy="75" r="18" stroke-width="3"/><path d="${chakraSpokes}" stroke-width="1.2"/></g>` +
        '<circle cx="112.5" cy="75" r="3.5" fill="#000080"/>',
    },
  },
  zh: {
    // Simplified Chinese.
    name: '简体中文',
    flag: {
      viewBox: '0 0 30 20',
      svg: `<rect width="30" height="20" fill="#ee1c25"/>${star(5, 5, 3, '#ffde00')}${chinaStars}`,
    },
  },
  ja: {
    name: '日本語',
    flag: {
      viewBox: '0 0 9 6',
      svg: '<rect width="9" height="6" fill="#fff"/><circle cx="4.5" cy="3" r="1.8" fill="#bc002d"/>',
    },
  },
  ko: {
    name: '한국어',
    flag: {
      viewBox: '0 0 36 24',
      svg:
        '<rect width="36" height="24" fill="#fff"/>' +
        '<g transform="rotate(33.69 18 12)">' +
        '<path d="M12 12a6 6 0 0 1 12 0z" fill="#cd2e3a"/><path d="M12 12a6 6 0 0 0 12 0z" fill="#0047a0"/>' +
        '<circle cx="15" cy="12" r="3" fill="#cd2e3a"/><circle cx="21" cy="12" r="3" fill="#0047a0"/>' +
        '</g>' +
        koreaTrigrams,
    },
  },
}
