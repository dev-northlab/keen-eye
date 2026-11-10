import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 93 ("solarSystem") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the solar
// flare goes, Mercury turns reddish orange, Venus light green, the Moon yellow, Mars's tiny moon goes, Jupiter loses
// its red spot, its small moon turns light blue, Saturn's ring purple, Uranus mint green, and the comet loses its
// tail. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini only tinted Uranus a little, so
// A's Uranus is turned to a clear mint; its other small changes (the saucer's stars, the satellite) are left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The orange-red solar flare arching from the Sun's edge, only in A.
  { x: 284, y: 566, r: 105 },
  // Mercury, the first planet right of the Sun: grey in A, reddish orange in B.
  { x: 544, y: 768, r: 60 },
  // Venus: pale yellow in A, light green in B.
  { x: 738, y: 945, r: 90 },
  // The Moon right of the Earth: grey in A, yellow in B.
  { x: 1100, y: 652, r: 60 },
  // The tiny grey moon above right of Mars, only in A.
  { x: 1336, y: 900, r: 60 },
  // Jupiter's red-brown spot, only in A.
  { x: 1649, y: 684, r: 60 },
  // The small moon right of Jupiter: yellow in A, light blue in B.
  { x: 1823, y: 648, r: 60 },
  // Saturn's ring: cream in A, purple in B.
  { x: 2096, y: 992, r: 215 },
  // Uranus at the top right: light blue in A, mint green in B.
  { x: 2370, y: 189, r: 65 },
  // The long tail of the comet at the bottom left, only in A.
  { x: 652, y: 1310, r: 215 },
]

export const level093Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-093-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-093-b-<n>.webp).
  imageB: 'levels/redesign/level-093-a.avif',
  patchesB: zonePatches('levels/redesign/level-093-b', differences, viewBox),
  viewBox,
  differences,
}
