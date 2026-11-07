import type { LevelPictures } from '../../engine/types.ts'

// Level 101 ("coopMorning") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the weathervane,
// which turns the other way in the drawn scene, gets a golden rooster; the right window lights up; the bird on the
// roof, which moves in the drawn scene, turns red; the middle egg is gone (with the egg half-hidden behind it); the
// chick by the trough, which bobs faster in the drawn scene, turns white, and the butterfly, which flutters only in
// B, turns blue (pictures do not move); the wheelbarrow's tray turns green. Touched up by hand: Gemini redrew the
// grass, the tree and the fence, so B is A with only Gemini's seven changes laid over it.
export const level101Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-101-a.webp',
  imageB: 'levels/redesign/level-101-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The weathervane's rooster: black in A, golden in B.
    { x: 974, y: 324, r: 73 },
    // The coop's right window: dark in A, lit yellow in B.
    { x: 1246, y: 833, r: 73 },
    // The bird on the coop roof: blue in A, red in B.
    { x: 1248, y: 581, r: 73 },
    // The middle egg in the nest hatch, only in A.
    { x: 703, y: 1066, r: 80 },
    // The second chick right of the trough: yellow in A, white in B.
    { x: 2103, y: 1492, r: 73 },
    // The butterfly above the far farmhouse: pink in A, blue in B.
    { x: 1935, y: 830, r: 73 },
    // The wheelbarrow's tray: red in A, green in B.
    { x: 821, y: 1439, r: 80 },
  ],
}
