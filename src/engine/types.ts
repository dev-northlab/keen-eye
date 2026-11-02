/** A picture: SVG markup (contents of <svg>) and the animations of its `data-anim` groups. */
export interface SceneSvg {
  svg: string
  animations: Animation[]
}

interface AnimationBase {
  /** Matches `data-anim="<key>"` of the animated <g> in the markup. */
  key: string
  /** Name referenced by Difference.animatedId. */
  id: string
  /** Seconds per cycle (speed). */
  period: number
  /** Cycle offset, 0–1. */
  phase?: number
  /** Runs the cycle backwards: other direction of travel/rotation/swing. */
  reverse?: boolean
}

/** Motion types (spec, section 4). Offsets, angles and pivots are in viewBox units / degrees. */
export type AnimationMotion =
  /** Constant-speed travel along a closed polyline of offsets from the rest position (2 points = back and forth).
   * With `flipX` the object is mirrored around the vertical line x = flipX while moving left. */
  | { type: 'path'; points: [number, number][]; flipX?: number }
  /** Bobbing: offset (dx, dy)·sin. */
  | { type: 'bob'; dx: number; dy: number }
  /** Swinging around `pivot` by ±angle (pendulum, tail, clock hand). */
  | { type: 'sway'; angle: number; pivot: [number, number] }
  /** Full rotation around `pivot` once per period. */
  | { type: 'rotate'; pivot: [number, number] }
  /** Visible for the first `duty` fraction of the cycle (default 0.5). */
  | { type: 'blink'; duty?: number }
  /** Fill cycles through '#rrggbb' colors; children to recolor must not set their own fill. */
  | { type: 'color'; colors: string[] }

export type Animation = AnimationBase & AnimationMotion

export interface Difference {
  /** Zone center (at rest, time 0 of the object's motion) and radius in viewBox coordinates. */
  x: number
  y: number
  r: number
  /** Id of the animation the zone moves with, in each picture where that animation exists. */
  animatedId?: string
  /** Motion difference: A and B draw the same thing and differ only in how it moves (set by svgLevel). */
  motion?: boolean
}

export interface Level {
  id: number
  /** Chapter theme key (i18n: chapters.<chapter>). */
  chapter: string
  /** Title key (i18n: levelTitles.<title>). */
  title: string
  kind: 'svg' | 'image'
  /** kind = 'svg': builds the scene; variant 0 = A, 1 = B. */
  build?: (variant: 0 | 1) => SceneSvg
  /** kind = 'image': asset URLs. */
  imageA?: string
  imageB?: string
  viewBox: { w: number; h: number }
  differences: Difference[]
  /** Time limit for three stars. */
  parTimeSec: number
  /** Suits a two-player match (enough differences for a long race); preferred by "random level". */
  multiplayerReady: boolean
}

export type Stars = 1 | 2 | 3

export interface LevelResult {
  timeSec: number
  mistakes: number
  hintsUsed: number
  stars: Stars
}

/** Text of level content in several languages ({ ru, en, … }); `en` is required and is the fallback. */
export type LocalizedText = Record<string, string>

/**
 * Hitbox in percent of the image: x and w of its width, y and h of its height; a circle's r is
 * in percent of the width, so it stays round on a picture that is not square.
 */
export type HitShape =
  | { shape: 'circle'; x: number; y: number; r: number }
  /** (x, y) = top-left corner. */
  | { shape: 'rect'; x: number; y: number; w: number; h: number }

/** An object that could not exist in the level's era (docs/anachronism-mode.md). */
export type AnachronismItem = HitShape & {
  id: string
  /** Short name. */
  label: LocalizedText
  /** One sentence: what it is and when it appeared. */
  fact: LocalizedText
}

/** "Find the odd one out": one picture of a historical era with out-of-place items to tap. */
export interface AnachronismLevel {
  id: string
  mode: 'anachronism'
  world: string
  era: LocalizedText
  /** Image path relative to the app base (public/). */
  image: string
  /** Image size in pixels: its aspect ratio maps percent hitboxes onto the picture. */
  width: number
  height: number
  difficulty: number
  /** Time limit for three stars. */
  parTimeSec: number
  items: AnachronismItem[]
  /** Living background: animations of the image's `data-anim` groups (id = key). Odd items never move. */
  animations: Animation[]
}
