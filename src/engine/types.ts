import type { PictureTransform } from './transform.ts'

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

/** The two moments of a "time" level (docs/time-differences-mode.md): picture A is the first, B the second. */
export type TimePair = 'day-night' | 'summer-winter'

/**
 * A natural change between the two moments of a "time" level (light, snow, leaves…): not a
 * difference, so a tap on it is a miss that explains itself once.
 */
export interface Trap {
  /** Zone center and radius in viewBox coordinates (traps never move). */
  x: number
  y: number
  r: number
  /** Hint text key (i18n: timeMode.traps.<hint>). */
  hint: string
}

/** "Memory" levels (docs/memory-mode.md): how long picture A is shown and how many extra looks a round allows. */
export interface MemoryRules {
  showSeconds: number
  peeks: number
}

/** "Travel" regions (docs/world-travel-mode.md), in the order of the world map; i18n worldTravel.regions.<region>. */
export type TravelRegion = 'europe' | 'asia' | 'caucasus' | 'americas' | 'africa' | 'oceania'

/** "Travel" levels: the place the scene shows. Its fact is i18n worldTravel.facts.<title>. */
export interface TravelPlace {
  region: TravelRegion
  /** ISO 3166-1 alpha-2 code: the flag (levels/travel/flags.ts) and i18n worldTravel.countries.<country>. */
  country: string
  /** Pin on the world map, degrees. */
  lat: number
  lon: number
}

/** "Detective" levels (docs/detective-mode.md): the case the scene belongs to and the clue each difference reveals. */
export interface DetectiveScene {
  /** Case id (levels/detective/cases.ts; i18n detective.cases.<case>). */
  case: string
  /** Clue key of each difference, in the order of `differences` (i18n detective.clueTexts.<key>). */
  clues: string[]
}

/**
 * The hidden golden key of a chapter (docs/hidden-item-feature.md): drawn by `secret()` in one level of
 * each chapter, not a difference; a tap on it collects the chapter's key and is never a miss.
 */
export interface SecretKey {
  /** Tap zone in viewBox coordinates, a little larger than the key; the key never moves. */
  x: number
  y: number
  r: number
  /** Pictures the key is drawn on: both in the same place, or only B ("memory" levels search B alone). */
  on: 'both' | 'b'
}

export interface Level {
  id: number
  /** Chapter theme key (i18n: chapters.<chapter>). */
  chapter: string
  /** Title key (i18n: levelTitles.<title>). */
  title: string
  kind: 'svg' | 'image'
  /**
   * kind = 'svg': builds the scene; variant 0 = A, 1 = B. A "time" level draws the moment of its
   * `pair` from `moment` (default: the variant's own); the validator mixes them to tell the
   * differences from the natural changes. `extras`: with the extra objects of hard mode (`Level.extras`).
   */
  build?: (variant: 0 | 1, moment?: 0 | 1, extras?: boolean) => SceneSvg
  /** kind = 'image': asset URLs. */
  imageA?: string
  imageB?: string
  viewBox: { w: number; h: number }
  differences: Difference[]
  /**
   * Extra objects of hard mode (docs/hard-mode-extra-objects.md): circles that contain them, drawn the same in A
   * and B by `build(…, true)`; not differences, they only make the picture busier.
   */
  extras?: { x: number; y: number; r: number }[]
  /** Time limit for three stars. */
  parTimeSec: number
  /** Suits a two-player match (enough differences for a long race); preferred by "random level". */
  multiplayerReady: boolean
  /** "Time" levels only: the moments of A and B and the natural changes between them. */
  pair?: TimePair
  traps?: Trap[]
  /** "Memory" levels only: A is shown first, then B alone (the stars ignore `parTimeSec`). */
  memory?: MemoryRules
  /** "Travel" levels only: the place, shown on the world map and with its fact after the level. */
  travel?: TravelPlace
  /** "Detective" levels only: a scene of a case, each difference a clue. */
  detective?: DetectiveScene
  /** The chapter's hidden key, on exactly one level of the chapter. */
  secret?: SecretKey
  /**
   * Picture B is shown mirrored or turned (docs/mirror-rotate-feature.md) when played alone (`GameScene`; not
   * in calm mode, `ModeRules.transformB`, nor in two-player matches); everything above stays in the scene's own coordinates. Default 'none'.
   */
  transformB?: PictureTransform
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
  /** Numeric id shown on screen (601+), outside the range of the numbered levels. */
  number: number
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
