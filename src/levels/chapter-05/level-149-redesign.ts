import type { LevelPictures } from '../../engine/types.ts'

// Level 149 ("gasGiantRings") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a tiny
// satellite flies at the top left, the buoy's light goes out, the blue moon turns green, the pink moon gets a crater,
// the tiny moon on the ring turns yellow, a small rock goes, the planet's oval spot turns purple, the beige moon loses
// its upper stripe, the ship's window turns red and the sparkle light blue. B is A with only these changes of Gemini's
// laid over it. Fixed by hand: Gemini took both stripes of the beige moon away and repainted it, so on A only the upper
// stripe is cloned over with the light band below it; it made the ship's fins red and gave it a row of red windows, so
// A's window is recoloured red; its other removed rock below the planet is left out.
export const level149Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-149-a.avif',
  imageB: 'levels/redesign/level-149-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A tiny yellow satellite with blue panels at the top left, left of the big satellite, only in B.
    { x: 304, y: 268, r: 103 },
    // The light on top of the red marker buoy: lit yellow in A, dark in B.
    { x: 1522, y: 394, r: 73 },
    // The moon at the top right: blue in A, green in B.
    { x: 2024, y: 310, r: 86 },
    // A small grey crater on the pink moon at the right, only in B.
    { x: 2284, y: 627, r: 73 },
    // The tiny moon on the ring right of the planet: grey in A, yellow in B.
    { x: 1833, y: 783, r: 73 },
    // The small grey rock below the ring, right of the planet, only in A.
    { x: 2024, y: 1044, r: 73 },
    // The oval spot on the big planet: dark red in A, purple in B.
    { x: 1249, y: 1274, r: 90 },
    // The upper dark stripe of the beige moon at the bottom right, only in A.
    { x: 2348, y: 1283, r: 73 },
    // The window of the white ship at the bottom: blue in A, red in B.
    { x: 1862, y: 1472, r: 73 },
    // The sparkle at the bottom left: yellow in A, light blue in B.
    { x: 196, y: 1510, r: 123 },
  ],
}
