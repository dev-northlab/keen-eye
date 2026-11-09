import type { LevelPictures } from '../../engine/types.ts'

// Level 54 ("creekBridge") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the big
// water wheel loses a spoke, the dragonfly turns red, the lowest stone at the left gets moss on top, the top rope of
// the bridge's right span a gap in the middle, the cap of the right end post turns blue, the lantern goes out, the
// man's shirt turns purple and the frog at the bottom brown. B is A with only these changes of Gemini's laid over it
// (the dragonfly, the cap, the lantern with its bulb dimmed by hand); it also turned two more caps blue, put a mossy
// stone in place of the frog on the lily pad, added a brown frog and made the man a purple vest without the rope in
// front of him (all left out), so five are done by hand on A's picture: the spoke painted out with the planks
// behind it, the moss of Gemini's stone laid on the stone, the rope painted out with the water, the shirt and the
// frog recoloured with their shading kept.
export const level054Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-054-a.webp',
  imageB: 'levels/redesign/level-054-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The up-right spoke of the big water wheel, only in A.
    { x: 2524, y: 1022, r: 77 },
    // The dragonfly by the mill: blue in A, red in B.
    { x: 2175, y: 910, r: 73 },
    // Moss on the top of the lowest stone in the water at the left, only in B.
    { x: 464, y: 1516, r: 60 },
    // The middle of the top rope of the bridge's right span, only in A.
    { x: 1501, y: 1017, r: 60 },
    // The cap of the right end post of the bridge: red in A, blue in B.
    { x: 1680, y: 954, r: 60 },
    // The lantern on the pole at the left of the bridge: lit in A, dark in B.
    { x: 981, y: 908, r: 60 },
    // The shirt of the man on the bridge: yellow in A, purple in B.
    { x: 1246, y: 1058, r: 72 },
    // The frog in the water at the bottom: green in A, brown in B.
    { x: 2033, y: 1574, r: 60 },
  ],
}
