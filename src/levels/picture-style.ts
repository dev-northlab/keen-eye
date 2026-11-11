// Picture style: the levels as drawn (SVG scenes, "classic") or their redesigned pictures (`Level.redesign`,
// "redesign"). A level without redesigned pictures is always played as drawn. Read as an attempt starts; switching
// inside a level starts it over (LevelView), a duel keeps the style it opened with (MatchView).
import type { Difference, ImagePatch, Level } from '../engine/types.ts'

const PICTURE_STYLES = ['classic', 'redesign'] as const
export type PictureStyle = (typeof PICTURE_STYLES)[number]
export const isPictureStyle = (v: unknown): v is PictureStyle => PICTURE_STYLES.includes(v as PictureStyle)

/**
 * The level to play in `style`: the redesigned one is a picture level with its own zones, key and traps. The drawn
 * scene's animations, normal-mode extra objects and key position belong to the SVG and are left out (pictures
 * carry their decor; a key they do not draw is not there).
 */
export function styledLevel(level: Level, style: PictureStyle): Level {
  if (style === 'classic' || !level.redesign) return level
  const { redesign, build: _build, extras: _extras, secret: _secret, traps: _traps, ...rest } = level
  return { ...rest, kind: 'image', ...redesign }
}

/** How far a cut-out of B may reach past its zone's circle: a changed object drawn a little bigger than the zone. */
export const PATCH_MARGIN = 40

/**
 * The cut-outs that make picture B out of picture A (`LevelPictures.patchesB`): one per zone, the square box of its
 * circle grown by `PATCH_MARGIN` and clipped to the picture, in files `<base>-<n>.webp` (n from 1) that
 * `npm run encode-pictures` cuts from the WebP sources — B where it differs from A, fading out around it, and
 * transparent outside that grown circle.
 */
export function zonePatches(base: string, differences: Difference[], viewBox: { w: number; h: number }): ImagePatch[] {
  return differences.map((d, i) => {
    const x = Math.max(0, Math.floor(d.x - d.r - PATCH_MARGIN))
    const y = Math.max(0, Math.floor(d.y - d.r - PATCH_MARGIN))
    const w = Math.min(viewBox.w, Math.ceil(d.x + d.r + PATCH_MARGIN)) - x
    const h = Math.min(viewBox.h, Math.ceil(d.y + d.r + PATCH_MARGIN)) - y
    return { href: `${base}-${i + 1}.webp`, x, y, w, h }
  })
}
