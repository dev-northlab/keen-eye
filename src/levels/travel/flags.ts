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
  nz:
    `<rect width="30" height="20" fill="#012169"/>${unionJack}` +
    [[22.5, 16], [19.5, 8.5], [22.5, 4], [25.5, 7.5]]
      .map(([x, y]) => star(x, y, 1.5, '#c8102e', ' stroke="#ffffff" stroke-width="0.5"'))
      .join(''),
}
