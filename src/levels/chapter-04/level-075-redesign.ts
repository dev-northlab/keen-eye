import type { LevelPictures } from '../../engine/types.ts'

// Level 75 ("sunset bay") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the setting sun turns
// deep red, the low gull on the right gets black wing tips, the right palm on the hill dry brown leaves, the sailboat's
// left sail turns pink, the lantern on the pier goes dark, the ice cream scoop turns green, the teal shirt of the man on
// the right yellow, the gull on the pier grey, the red shirt in the rowboat green and the purple rock at the bottom left
// dark grey. B is A with only these changes laid over it. Fixed by hand: Gemini left the gull on the pier white, so A's
// gull is tinted grey; its sun is taken above the horizon only (its red path on the water would be a change outside the
// zone), the lantern's glow on the water stays too; its redrawn left palm is left out.
export const level075Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-075-a.webp',
  imageB: 'levels/redesign/level-075-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The setting sun: orange in A, deep red in B.
    { x: 1311, y: 775, r: 198 },
    // The wing tips of the low gull on the right, in the pink band of the sky: white in A, black in B.
    { x: 1838, y: 542, r: 73 },
    // The leaves of the right palm on the hill: green in A, dry brown in B.
    { x: 495, y: 658, r: 153 },
    // The left sail of the sailboat: yellow in A, pink in B.
    { x: 1590, y: 912, r: 105 },
    // The lantern on the pier: lit in A, dark in B.
    { x: 2052, y: 1122, r: 90 },
    // The ice cream scoop of the man in purple: pink in A, green in B.
    { x: 2289, y: 1042, r: 60 },
    // The shirt of the man on the right of the pier: teal in A, yellow in B.
    { x: 2426, y: 999, r: 82 },
    // The gull standing on the pier: white in A, grey in B.
    { x: 1896, y: 1076, r: 60 },
    // The shirt of the person on the right in the rowboat: red in A, green in B.
    { x: 718, y: 1358, r: 71 },
    // The rock at the bottom left: purple in A, dark grey in B.
    { x: 258, y: 1505, r: 97 },
  ],
}
