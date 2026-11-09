import type { LevelPictures } from '../../engine/types.ts'

// Level 140 ("pierSunset") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the far
// sailboat's sail turns white, the brass ring on a pier post goes, so does a railing bar, the left street lamp turns
// gold, the middle one goes out, a seagull sits on the right one, the bucket turns red, the fishing rod red, the float's
// top green and the shirt of the person next to the one in blue green. B is A with only Gemini's sail, ring, middle
// lamp, bucket, rod, float, shirt and the seagull laid over it. Fixed by hand: Gemini gilded the right lamp and added a
// new gold lamp at the far left instead, so A's left lamp is recoloured and the right one stays black under the
// seagull; it took a whole stretch of railing away, so one bar of A's is painted out (the water carried across); its
// second green float lower in the water is left out.
export const level140Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-140-a.webp',
  imageB: 'levels/redesign/level-140-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The sail of the small far sailboat: dark in A, white in B.
    { x: 2240, y: 800, r: 73 },
    // The brass mooring ring on the second pier post from the left, only in A.
    { x: 660, y: 1316, r: 73 },
    // One bar of the railing between the straw hat and the middle lamp, only in A.
    { x: 1624, y: 1144, r: 73 },
    // The left street lamp: black in A, gold in B.
    { x: 984, y: 930, r: 110 },
    // The light of the middle street lamp: lit in A, dark in B.
    { x: 1704, y: 912, r: 73 },
    // The seagull on top of the right street lamp, only in B.
    { x: 2428, y: 832, r: 73 },
    // The bucket at the feet of the person in the yellow shirt: blue in A, red in B.
    { x: 872, y: 1144, r: 73 },
    // The fishing rod of the fisherman in the teal shirt: black in A, red in B.
    { x: 1292, y: 1028, r: 73 },
    // The top of the fishing float in the water: red in A, green in B.
    { x: 1156, y: 1384, r: 73 },
    // The shirt of the person next to the one in blue: red in A, green in B.
    { x: 2020, y: 1052, r: 73 },
  ],
}
