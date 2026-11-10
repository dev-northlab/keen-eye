import type { LevelPictures } from '../../engine/types.ts'

// Level 137 ("jellyDeep") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the bell
// of the cyan jellyfish at the top left turns lime green, the big purple one's bell orange, the yellow jellyfish loses
// its leftmost tentacle, the pink one's tentacles turn white, the anglerfish's lure glows green, the squid loses its
// side fins, the lanternfish its green spot, the hatchetfish's tail turns blue, the upper small grey fish above the
// anchor goes and a red-brown starfish lies right of the rock at the bottom left. B is A with only these changes of
// Gemini's laid over it; it also turned the hatchetfish's back fin blue, which is left out.
export const level137Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-137-a.avif',
  imageB: 'levels/redesign/level-137-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The bell of the cyan jellyfish at the top left (and its glow): cyan in A, lime green in B.
    { x: 492, y: 400, r: 160 },
    // The bell of the big purple jellyfish in the upper middle: purple in A, orange in B.
    { x: 1080, y: 568, r: 116 },
    // The leftmost tentacle of the yellow jellyfish at the top, only in A.
    { x: 1704, y: 396, r: 73 },
    // The tentacles of the pink jellyfish on the right: pink in A, white in B.
    { x: 2260, y: 624, r: 73 },
    // The light at the end of the anglerfish's lure: yellow in A, green in B.
    { x: 920, y: 1048, r: 84 },
    // The two side fins at the top of the pink squid, only in A.
    { x: 1464, y: 992, r: 84 },
    // The green glowing spot of the small grey lanternfish, only in A.
    { x: 1960, y: 1092, r: 73 },
    // The tail fin of the silver hatchetfish: silver in A, blue in B.
    { x: 2236, y: 1364, r: 73 },
    // The upper one of the two small grey fish above the anchor, only in A.
    { x: 1260, y: 1368, r: 73 },
    // The red-brown starfish right of the rock at the bottom left, only in B.
    { x: 460, y: 1572, r: 80 },
  ],
}
