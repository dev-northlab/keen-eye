import type { LevelPictures } from '../../engine/types.ts'

// Level 71 ("dolphins") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the middle gull's wing
// tips turn black, the low gull on the left is gone, the middle dolphin's dorsal fin turns black, the right dolphin's tail
// dark navy, the left dolphin light grey, the splash at the bottom is gone, the purple shirt of the man on the boat turns
// green, a small yellow fish swims left of the beach ball, the red buoy at the bottom left turns green and the yellow buoy
// on the right is gone. B is A with only these changes laid over it. Fixed by hand: Gemini drew a new dolphin with a
// black fin instead of blackening the middle one's fin and redrew the middle gull twice as big, so both are painted on
// A's own dolphin and gull; the right dolphin's navy tail fades into its grey body instead of Gemini's hard edge;
// Gemini's redrawn boat wake and splash on the left are left out.
export const level071Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-071-a.webp',
  imageB: 'levels/redesign/level-071-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The wing tips of the gull in the middle of the sky: white in A, black in B.
    { x: 1638, y: 342, r: 64 },
    // The gull flying low on the left, under the big cloud, only in A.
    { x: 657, y: 481, r: 61 },
    // The dorsal fin of the middle dolphin: grey-blue in A, black in B.
    { x: 979, y: 1040, r: 60 },
    // The tail of the right dolphin near the yellow buoy: grey in A, dark navy in B.
    { x: 2228, y: 1040, r: 75 },
    // The left dolphin above the splash: grey-blue in A, light grey in B.
    { x: 530, y: 1272, r: 160 },
    // The white splash at the bottom, left of the bottom right dolphin, only in A.
    { x: 1659, y: 1369, r: 204 },
    // The shirt of the man on the right of the tour boat: purple in A, green in B.
    { x: 2104, y: 1204, r: 81 },
    // A small yellow fish left of the beach ball, only in B.
    { x: 1159, y: 1550, r: 72 },
    // The buoy at the bottom left: red in A, green in B.
    { x: 193, y: 1489, r: 83 },
    // The yellow buoy far on the right, near the horizon, only in A.
    { x: 2422, y: 862, r: 115 },
  ],
}
