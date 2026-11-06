// Picture style: the levels as drawn (SVG scenes, "classic") or their redesigned pictures (`Level.redesign`,
// "redesign"). A level without redesigned pictures is always played as drawn. Read as an attempt starts; switching
// inside a level starts it over (LevelView), a duel keeps the style it opened with (MatchView).
import type { Level } from '../engine/types.ts'

export const PICTURE_STYLES = ['classic', 'redesign'] as const
export type PictureStyle = (typeof PICTURE_STYLES)[number]
export const isPictureStyle = (v: unknown): v is PictureStyle => PICTURE_STYLES.includes(v as PictureStyle)

/**
 * The level to play in `style`: the redesigned one is a picture level with its own zones. The drawn scene's
 * animations and hard-mode extra objects belong to the SVG and are left out (pictures carry their decor).
 */
export function styledLevel(level: Level, style: PictureStyle): Level {
  if (style === 'classic' || !level.redesign) return level
  const { redesign, build: _build, extras: _extras, ...rest } = level
  return { ...rest, kind: 'image', ...redesign }
}
