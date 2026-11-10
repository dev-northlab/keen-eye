import type { LevelPictures } from '../../engine/types.ts'

// Level 42 ("camp") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the dark bird in the
// sky turns white, the small fir on the left dry yellow-brown, the owl's eyes yellow, the lantern on the big tree is
// off, the red tent's entrance is closed, the ring of stones under the campfire is gone, one of the two marshmallows
// is gone and the backpack's top flap turns red. B is A with only these changes of Gemini's laid over it. Gemini drew
// the whole owl anew (unlit, other spots): the owl is A's with only its irises recoloured yellow by hand.
export const level042Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-042-a.avif',
  imageB: 'levels/redesign/level-042-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The bird flying in the sky: dark in A, white in B.
    { x: 986, y: 276, r: 75 },
    // The small fir on the left in front of the hill: green in A, dry yellow-brown in B.
    { x: 588, y: 822, r: 137 },
    // The eyes of the owl on the big tree: pale in A, yellow in B.
    { x: 1934, y: 700, r: 74 },
    // The lantern hanging on the big tree and its glow: lit in A, dark in B.
    { x: 1842, y: 865, r: 106 },
    // The entrance of the red tent: open and dark in A, closed in B.
    { x: 502, y: 1346, r: 124 },
    // The ring of grey stones under the campfire, only in A.
    { x: 1315, y: 1540, r: 122 },
    // One of the two marshmallows on the stick of the camper in yellow, only in A.
    { x: 1136, y: 1436, r: 73 },
    // The top flap of the teal backpack: teal in A, red in B.
    { x: 1837, y: 1474, r: 74 },
  ],
}
