import type { LevelPictures } from '../../engine/types.ts'

// Level 91 ("iceMoon") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the small moon at
// the ring's end turns reddish brown, the sparkle goes, the big geyser loses its top left puff, the small geyser its
// top puffs, the right ice spike goes, the middle crystal cluster turns pink, the dome's door yellow, the flag blue,
// the astronaut's suit orange, and the white alien gets two small eyes. B is A with only these changes of Gemini's laid
// over it. Fixed by hand: Gemini made the big plume bigger and left the small one as it was, so on A the big plume's
// top left shoulder is cut away along a bumpy round edge and the small one's top puffs are covered with the sky beside
// them (its low column fading out); its other changes (the big geyser's plume, the dome's frame) are left out.
export const level091Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-091-a.avif',
  imageB: 'levels/redesign/level-091-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The small moon at the left end of the purple planet's ring: grey in A, reddish brown in B.
    { x: 1546, y: 199, r: 60 },
    // The white four-pointed sparkle at the upper left, only in A.
    { x: 978, y: 258, r: 60 },
    // The top left puff of the big geyser's steam, only in A.
    { x: 518, y: 364, r: 200 },
    // The top puffs of the smaller geyser right of the middle, only in A.
    { x: 1709, y: 869, r: 160 },
    // The right one of the two tall ice spikes at the right edge, only in A.
    { x: 2509, y: 994, r: 130 },
    // The ice crystal cluster at the bottom middle: cyan in A, pink in B.
    { x: 1034, y: 1330, r: 130 },
    // The glass dome's door: blue in A, yellow in B.
    { x: 2162, y: 1226, r: 60 },
    // The flag: red in A, blue in B.
    { x: 1906, y: 1164, r: 60 },
    // The astronaut's suit: white in A, orange in B.
    { x: 1389, y: 1366, r: 85 },
    // The white alien at the bottom left: one big eye in A, two smaller ones in B.
    { x: 294, y: 1401, r: 60 },
  ],
}
