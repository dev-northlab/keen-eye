import type { Locale } from './index.ts'

// What the language picker shows for each locale. Adding a locale without an entry here fails the type check.

/**
 * Star with `n` points (five by default) centred at (cx, cy) with outer radius r and inner radius `inner`·r;
 * one point aims at angle `deg` (−90 = up).
 */
function star(cx: number, cy: number, r: number, fill: string, deg = -90, n = 5, inner = 0.382): string {
  const points = Array.from({ length: 2 * n }, (_, i) => {
    const a = ((deg + (i * 180) / n) * Math.PI) / 180
    const k = i % 2 ? r * inner : r
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

/** A Nordic cross: `cross` (x, y, thickness) on `bg` in a w×h flag, optionally inside a wider `border` cross. */
function nordic(w: number, h: number, bg: string, x: number, y: number, t: number, cross: string, border?: [number, string]) {
  const bar = (t: number, fill: string) =>
    `<rect x="${x - t / 2}" width="${t}" height="${h}" fill="${fill}"/><rect y="${y - t / 2}" width="${w}" height="${t}" fill="${fill}"/>`
  return {
    viewBox: `0 0 ${w} ${h}`,
    svg: `<rect width="${w}" height="${h}" fill="${bg}"/>` + (border ? bar(border[0], border[1]) : '') + bar(t, cross),
  }
}

/** Fourteen red and white stripes of the Malaysian flag (28×14). */
const malaysiaStripes = Array.from({ length: 7 }, (_, i) => `<rect y="${i * 2 + 1}" width="28" height="1" fill="#fff"/>`).join('')

/** Eight rays of the Philippine sun at (3.46, 6). */
const philippineRays = Array.from({ length: 8 }, (_, i) => {
  const a = ((i * 45 + 22.5) * Math.PI) / 180
  const p = (k: number) => `${(3.46 + k * Math.cos(a)).toFixed(2)} ${(6 + k * Math.sin(a)).toFixed(2)}`
  return `M${p(1.6)}L${p(2.6)}`
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
  sv: {
    name: 'Svenska',
    flag: nordic(16, 10, '#006aa7', 6, 5, 2, '#fecc02'),
  },
  da: {
    name: 'Dansk',
    flag: nordic(37, 28, '#c8102e', 14, 14, 4, '#fff'),
  },
  nb: {
    // Norwegian Bokmål.
    name: 'Norsk',
    flag: nordic(22, 16, '#ba0c2f', 8, 8, 2, '#00205b', [4, '#fff']),
  },
  fi: {
    name: 'Suomi',
    flag: nordic(18, 11, '#fff', 6.5, 5.5, 3, '#002f6c'),
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
  ar: {
    // The flag of the United Arab Emirates: Arabic has no single country.
    name: 'العربية',
    flag: {
      viewBox: '0 0 12 6',
      svg:
        '<rect width="12" height="2" fill="#009639"/><rect y="2" width="12" height="2" fill="#fff"/><rect y="4" width="12" height="2" fill="#000"/>' +
        '<rect width="3" height="6" fill="#ef3340"/>',
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
  id: {
    name: 'Bahasa Indonesia',
    flag: {
      viewBox: '0 0 3 2',
      svg: '<rect width="3" height="1" fill="#ce1126"/><rect y="1" width="3" height="1" fill="#fff"/>',
    },
  },
  ms: {
    name: 'Bahasa Melayu',
    flag: {
      viewBox: '0 0 28 14',
      svg:
        `<rect width="28" height="14" fill="#cc0001"/>${malaysiaStripes}<rect width="14" height="8" fill="#010066"/>` +
        '<circle cx="5.6" cy="4" r="3" fill="#fc0"/><circle cx="6.5" cy="4" r="2.55" fill="#010066"/>' +
        star(10.6, 4, 2.4, '#fc0', -90, 14, 0.45),
    },
  },
  fil: {
    name: 'Filipino',
    flag: {
      viewBox: '0 0 24 12',
      svg:
        '<rect width="24" height="6" fill="#0038a8"/><rect y="6" width="24" height="6" fill="#ce1126"/>' +
        '<path d="M0 0L10.39 6 0 12z" fill="#fff"/>' +
        `<circle cx="3.46" cy="6" r="1.3" fill="#fcd116"/><path d="${philippineRays}" stroke="#fcd116" stroke-width="0.5"/>` +
        star(0.95, 1.3, 0.6, '#fcd116') + star(0.95, 10.7, 0.6, '#fcd116') + star(8.7, 6, 0.6, '#fcd116'),
    },
  },
  vi: {
    name: 'Tiếng Việt',
    flag: {
      viewBox: '0 0 30 20',
      svg: `<rect width="30" height="20" fill="#da251d"/>${star(15, 10, 6, '#ffcd00')}`,
    },
  },
  th: {
    name: 'ไทย',
    flag: {
      viewBox: '0 0 9 6',
      svg:
        '<rect width="9" height="6" fill="#a51931"/><rect y="1" width="9" height="4" fill="#f4f5f8"/>' +
        '<rect y="2" width="9" height="2" fill="#2d2a4a"/>',
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
  'zh-Hant': {
    // Traditional Chinese: its own name in a badge rather than one region's flag.
    name: '繁體中文',
    flag: {
      viewBox: '0 0 30 20',
      svg:
        '<rect width="30" height="20" fill="#f4e9d8"/>' +
        '<text x="15" y="10.5" font-size="13" font-weight="700" fill="#a3122a" text-anchor="middle" dominant-baseline="central">繁</text>',
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
