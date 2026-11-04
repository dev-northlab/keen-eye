// Rasterizes level pictures in Node (no browser) for the validator and previews.
import { Resvg } from '@resvg/resvg-js'
import { pose } from '../src/engine/animation.ts'
import type { SceneSvg } from '../src/engine/types.ts'

/** Picture markup with every animated group posed at time t — what the game shows at that moment. */
export function posedSvg(scene: SceneSvg, t: number): string {
  const byKey = new Map(scene.animations.map((a) => [a.key, a]))
  return scene.svg.replace(/<g data-anim="([^"]+)">/g, (tag, key: string) => {
    const animation = byKey.get(key)
    if (!animation) return tag
    const { matrix, opacity, fill } = pose(animation, t)
    let attrs = ''
    if (matrix) attrs += ` transform="matrix(${matrix.join(' ')})"`
    // A blink that is off is left out: resvg panics on a fully transparent group inside a nested <svg> (previews).
    if (opacity === 0) attrs += ' display="none"'
    else if (opacity !== undefined) attrs += ` opacity="${opacity}"`
    if (fill) attrs += ` fill="${fill}"`
    return `<g data-anim="${key}"${attrs}>`
  })
}

/** Renders inner SVG markup of a w×h viewBox at 1 px per unit. System fonts load only when text is drawn. */
export function rasterize(markup: string, w: number, h: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${markup}</svg>`
  return new Resvg(svg, { font: { loadSystemFonts: markup.includes('<text') } }).render()
}
