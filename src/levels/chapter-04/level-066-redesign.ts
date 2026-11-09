import type { LevelPictures } from '../../engine/types.ts'

// Level 66 ("fishingVillage") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the big gull
// flying at the top gets black wing tips, the dark teal roof of the small blue house turns red, the drying line loses its
// middle fish, the shirt of the man in blue turns yellow, the grey bucket loses one of its two fish tails, the red parts
// of the life ring on the pier turn blue, the beak of the gull by the pink house black, the float in the middle of the
// rope red and the red buoy on the left green. Gemini's B came back at another size (2752×1536) with the whole scene
// redrawn and shifted, so none of it is used: all nine are done by hand on A's picture (the wing tips, the roof, the
// shirt, the ring, the beak, the float and the buoy recoloured; the fish painted out with the bushes under it, the
// tail with the grass above it).
export const level066Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-066-a.webp',
  imageB: 'levels/redesign/level-066-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The wing tips of the big gull flying at the top: small grey tips in A, black in B.
    { x: 1442, y: 122, r: 62 },
    // The roof of the small blue house: dark teal in A, red in B.
    { x: 732, y: 872, r: 150 },
    // The middle fish of the three on the drying line, only in A.
    { x: 1078, y: 867, r: 60 },
    // The shirt of the man on the left: blue in A, yellow in B.
    { x: 198, y: 997, r: 66 },
    // The right fish tail sticking out of the grey bucket, only in A.
    { x: 1096, y: 1033, r: 60 },
    // The life ring on the pier by the pink house: red and white in A, blue and white in B.
    { x: 1707, y: 1062, r: 60 },
    // The beak of the gull standing by the pink house: orange in A, black in B.
    { x: 2079, y: 1064, r: 60 },
    // The float in the middle of the rope in the water: orange in A, red in B.
    { x: 1970, y: 1440, r: 60 },
    // The buoy in the water on the left: red in A, green in B.
    { x: 657, y: 1470, r: 60 },
  ],
}
