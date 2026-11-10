import type { LevelPictures } from '../../engine/types.ts'

// Level 88 ("observatory") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the last
// star of the constellation goes, the crescent moon is full, the comet's tail turns peach orange, the meteor streak
// below the comet goes, the telescope tube turns dark red, the observatory's window goes dark and its door blue, the
// tent turns green, the boy's sweater yellow and the fireflies blue. B is A with only these changes of Gemini's laid
// over it. Fixed by hand: Gemini kept the constellation's last star, so it is painted out with a seamless clone of the
// line further down (the line runs on into empty sky); it left the tent's edges orange, recoloured green; its other
// changes (the yellow star and the falling star near the moon taken away) are left out.
export const level088Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-088-a.webp',
  imageB: 'levels/redesign/level-088-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The star at the upper right end of the constellation, only in A.
    { x: 983, y: 225, r: 60 },
    // The moon at the top right: a crescent in A, full in B.
    { x: 2248, y: 239, r: 140 },
    // The comet's tail: pale blue in A, peach orange in B.
    { x: 1540, y: 420, r: 200 },
    // The short meteor streak below the comet, only in A.
    { x: 980, y: 710, r: 125 },
    // The telescope tube out of the dome: grey in A, dark red in B.
    { x: 1780, y: 695, r: 115 },
    // The observatory's window: lit in A, dark in B.
    { x: 1726, y: 950, r: 60 },
    // The observatory's door: brown in A, blue in B.
    { x: 1940, y: 1034, r: 85 },
    // The tent: orange in A, green in B.
    { x: 1310, y: 1251, r: 195 },
    // The boy's sweater: red in A, yellow in B.
    { x: 720, y: 1201, r: 65 },
    // The four fireflies at the bottom left: yellow in A, blue in B.
    { x: 388, y: 1436, r: 70 },
  ],
}
