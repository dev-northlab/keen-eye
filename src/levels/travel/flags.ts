// Simplified national flags of the "travel" countries: markup inside a 30×20 viewBox, keyed by
// ISO 3166-1 alpha-2 code (`TravelPlace.country`).

/** Five-pointed star centered at (x, y), outer radius r. */
function star(x: number, y: number, r: number, fill: string, extra = '') {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const k = i % 2 ? r * 0.4 : r
    return `${(x + Math.cos(a) * k).toFixed(2)},${(y + Math.sin(a) * k).toFixed(2)}`
  })
  return `<polygon points="${points.join(' ')}" fill="${fill}"${extra}/>`
}

const stripes = (colors: string[], vertical = false) =>
  colors
    .map((c, i) => {
      const size = (vertical ? 30 : 20) / colors.length
      return vertical
        ? `<rect x="${i * size}" width="${size}" height="20" fill="${c}"/>`
        : `<rect y="${i * size}" width="30" height="${size}" fill="${c}"/>`
    })
    .join('')

/** Union Jack in the 15×10 canton. */
const unionJack =
  `<rect width="15" height="10" fill="#012169"/>` +
  `<path d="M0 0L15 10M15 0L0 10" stroke="#ffffff" stroke-width="2"/><path d="M0 0L15 10M15 0L0 10" stroke="#c8102e" stroke-width="0.8"/>` +
  `<path d="M7.5 0V10M0 5H15" stroke="#ffffff" stroke-width="3"/><path d="M7.5 0V10M0 5H15" stroke="#c8102e" stroke-width="1.6"/>`

/** Full Union Jack over the whole flag. */
const unionJackFull =
  `<rect width="30" height="20" fill="#012169"/>` +
  `<path d="M0 0L30 20M30 0L0 20" stroke="#ffffff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.4"/>` +
  `<path d="M15 0V20M0 10H30" stroke="#ffffff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#c8102e" stroke-width="3.6"/>`

export const FLAGS: Record<string, string> = {
  fr: stripes(['#0055a4', '#ffffff', '#ef4135'], true),
  it: stripes(['#009246', '#ffffff', '#ce2b37'], true),
  nl: stripes(['#ae1c28', '#ffffff', '#21468b']),
  jp: `<rect width="30" height="20" fill="#ffffff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/>`,
  in: stripes(['#ff9933', '#ffffff', '#138808']) + `<circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width="0.8"/>`,
  cn:
    `<rect width="30" height="20" fill="#de2910"/>` +
    star(5, 5, 3, '#ffde00') +
    [[10, 2], [12, 4], [12, 7], [10, 9]].map(([x, y]) => star(x, y, 1, '#ffde00')).join(''),
  am: stripes(['#d90012', '#0033a0', '#f2a800']),
  az:
    stripes(['#00b5e2', '#ef3340', '#509e2f']) +
    `<circle cx="14" cy="10" r="3.2" fill="#ffffff"/><circle cx="14.9" cy="10" r="2.6" fill="#ef3340"/>` +
    `<rect x="17" y="8.6" width="2.8" height="2.8" fill="#ffffff"/><rect x="17" y="8.6" width="2.8" height="2.8" fill="#ffffff" transform="rotate(45 18.4 10)"/>`,
  ge:
    `<rect width="30" height="20" fill="#ffffff"/><path d="M15 0V20M0 10H30" stroke="#ff0000" stroke-width="4"/>` +
    [[7, 5], [23, 5], [7, 15], [23, 15]].map(([x, y]) => `<path d="M${x} ${y - 2.5}V${y + 2.5}M${x - 2.5} ${y}H${x + 2.5}" stroke="#ff0000" stroke-width="1.6"/>`).join(''),
  us:
    Array.from({ length: 7 }, (_, i) => `<rect y="${(i * 20) / 7}" width="30" height="${20 / 7}" fill="${i % 2 ? '#ffffff' : '#b22234'}"/>`).join('') +
    `<rect width="13" height="${(20 / 7) * 4}" fill="#3c3b6e"/>` +
    [2, 5, 8, 11].flatMap((x) => [2.5, 5.5, 8.5].map((y) => `<circle cx="${x}" cy="${y}" r="0.8" fill="#ffffff"/>`)).join(''),
  br:
    `<rect width="30" height="20" fill="#009c3b"/><path d="M15 2L28 10L15 18L2 10Z" fill="#ffdf00"/>` +
    `<circle cx="15" cy="10" r="4.6" fill="#002776"/><path d="M10.6 9Q15 8 19.4 11" fill="none" stroke="#ffffff" stroke-width="0.8"/>`,
  eg: stripes(['#ce1126', '#ffffff', '#000000']) + `<path d="M13 8.6h4l-0.6 2.6h-2.8Z" fill="#c09300"/><circle cx="15" cy="7.8" r="0.9" fill="#c09300"/>`,
  ke:
    stripes(['#000000', '#bb0000', '#006600']) +
    `<path d="M0 6.4H30M0 13.6H30" stroke="#ffffff" stroke-width="1.2"/>` +
    `<ellipse cx="15" cy="10" rx="3" ry="6" fill="#bb0000" stroke="#000000" stroke-width="0.8"/><path d="M15 5.5V14.5" stroke="#ffffff" stroke-width="0.8"/>`,
  au:
    `<rect width="30" height="20" fill="#012169"/>${unionJack}` +
    star(7.5, 15, 2.4, '#ffffff') +
    [[22.5, 15.5], [19, 8.5], [22.5, 4], [26, 7.5]].map(([x, y]) => star(x, y, 1.3, '#ffffff')).join(''),
  gb: unionJackFull,
  es: `<rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/>`,
  gr:
    [...Array(9).keys()].map((i) => `<rect y="${(i * 20) / 9}" width="30" height="${20 / 9}" fill="${i % 2 ? '#ffffff' : '#0d5eaf'}"/>`).join('') +
    `<rect width="11.1" height="11.1" fill="#0d5eaf"/><path d="M5.55 0V11.1M0 5.55H11.1" stroke="#ffffff" stroke-width="2.2"/>`,
  cz: `<rect width="30" height="10" fill="#ffffff"/><rect y="10" width="30" height="10" fill="#d7141a"/><path d="M0 0L15 10L0 20Z" fill="#11457e"/>`,
  tr:
    `<rect width="30" height="20" fill="#e30a17"/><circle cx="11" cy="10" r="5" fill="#ffffff"/><circle cx="12.3" cy="10" r="4" fill="#e30a17"/>` +
    star(17.5, 10, 2.2, '#ffffff'),
  ae: stripes(['#00732f', '#ffffff', '#000000']) + `<rect width="8" height="20" fill="#ff0000"/>`,
  th: stripes(['#a51931', '#f4f5f8', '#2d2a4a', '#2d2a4a', '#f4f5f8', '#a51931']),
  sg:
    `<rect width="30" height="10" fill="#ef3340"/><rect y="10" width="30" height="10" fill="#ffffff"/>` +
    `<circle cx="6" cy="5" r="3.4" fill="#ffffff"/><circle cx="7.2" cy="5" r="3.2" fill="#ef3340"/>` +
    [[10, 2.6], [12.2, 4.2], [11.4, 6.8], [8.6, 6.8], [7.8, 4.2]].map(([x, y]) => star(x, y, 0.8, '#ffffff')).join(''),
  kr:
    `<rect width="30" height="20" fill="#ffffff"/><path d="M10 10a5 5 0 0 1 10 0a2.5 2.5 0 0 1 -5 0a2.5 2.5 0 0 0 -5 0Z" fill="#cd2e3a"/>` +
    `<path d="M10 10a5 5 0 0 0 10 0a2.5 2.5 0 0 1 -5 0a2.5 2.5 0 0 0 -5 0Z" fill="#0047a0"/>` +
    [[5, 4, 35], [25, 4, -35], [5, 16, -35], [25, 16, 35]]
      .map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y})" fill="#000000">${[-1.6, 0, 1.6].map((dy) => `<rect x="${x - 2.5}" y="${y + dy - 0.5}" width="5" height="1"/>`).join('')}</g>`)
      .join(''),
  ma: `<rect width="30" height="20" fill="#c1272d"/>` + star(15, 10.4, 4.6, 'none', ' stroke="#006233" stroke-width="0.9" stroke-linejoin="round"'),
  za:
    `<rect width="30" height="10" fill="#e03c31"/><rect y="10" width="30" height="10" fill="#001489"/>` +
    `<path d="M0 0L13 10L0 20" fill="none" stroke="#ffffff" stroke-width="6"/><path d="M0 0L13 10L0 20M13 10H30" fill="none" stroke="#007749" stroke-width="3.6"/>` +
    `<path d="M13 10H30" stroke="#ffffff" stroke-width="1"/><path d="M0 3.6L8.4 10L0 16.4Z" fill="#ffb81c"/><path d="M0 5.4L6 10L0 14.6Z" fill="#000000"/>`,
  ca: `<rect width="30" height="20" fill="#ffffff"/><rect width="7.5" height="20" fill="#d52b1e"/><rect x="22.5" width="7.5" height="20" fill="#d52b1e"/><path d="M15 4L16.4 7L18.6 6.2L17.8 10L19.6 10L15 14.4L10.4 10L12.2 10L11.4 6.2L13.6 7Z" fill="#d52b1e"/><path d="M15 14V16.4" stroke="#d52b1e" stroke-width="0.8"/>`,
  mx: stripes(['#006847', '#ffffff', '#ce1126'], true) + `<circle cx="15" cy="10" r="3" fill="#8a5a33"/><path d="M12.4 12q2.6 2 5.2 0" fill="none" stroke="#006847" stroke-width="0.9"/>`,
  pe: stripes(['#d91023', '#ffffff', '#d91023'], true),
  ar: stripes(['#74acdf', '#ffffff', '#74acdf']) + `<circle cx="15" cy="10" r="2.2" fill="#f6b40e"/>`,
  ru: stripes(['#ffffff', '#0039a6', '#d52b1e']),
  kz:
    `<rect width="30" height="20" fill="#00afca"/><circle cx="15" cy="8.6" r="3.4" fill="#fec50c"/>` +
    [...Array(12).keys()].map((i) => `<path d="M15 8.6L${(15 + 5.4 * Math.cos((i * Math.PI) / 6)).toFixed(2)} ${(8.6 + 5.4 * Math.sin((i * Math.PI) / 6)).toFixed(2)}" stroke="#fec50c" stroke-width="0.7"/>`).join('') +
    `<path d="M9.5 13.8Q15 11.4 20.5 13.8Q15 13 9.5 13.8Z" fill="#fec50c"/><path d="M2.2 2V18" stroke="#fec50c" stroke-width="1.6" stroke-dasharray="1.6 1"/>`,
  nz:
    `<rect width="30" height="20" fill="#012169"/>${unionJack}` +
    [[22.5, 16], [19.5, 8.5], [22.5, 4], [25.5, 7.5]]
      .map(([x, y]) => star(x, y, 1.5, '#c8102e', ' stroke="#ffffff" stroke-width="0.5"'))
      .join(''),
}
