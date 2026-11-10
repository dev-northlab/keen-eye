import type { LevelPictures } from '../../engine/types.ts'

// Level 81 ("launchPad") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a crater of the moon
// goes, the warning light on the tower turns green, the rocket's porthole glass yellow, the top puff of the left steam
// cloud goes, the right fuel tank turns yellow, the middle window of the control building goes dark, the flag turns
// green, the dish antenna loses its rod with the red tip, the astronaut's visor turns blue and a grey rock reddish
// brown. B is A with only Gemini's light, porthole, steam, tank, window, flag and visor laid over it. Fixed by hand:
// Gemini kept the moon's crater, so it is painted out with the moon's surface; it kept the dish's rod and only made the
// tip smaller, so the rod is painted out with the sky and the dish on both sides; it drew a new, bigger red rock, so
// A's own rock is tinted its colour instead. Its redrawn chest panel on the astronaut and its redrawn crystal are left out.
export const level081Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-081-a.avif',
  imageB: 'levels/redesign/level-081-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The upper right crater of the moon, only in A.
    { x: 387, y: 225, r: 60 },
    // The warning light on top of the launch tower: red in A, green in B.
    { x: 1598, y: 395, r: 90 },
    // The glass of the rocket's porthole: light blue in A, yellow in B.
    { x: 1313, y: 719, r: 70 },
    // The top puff of the left steam cloud at the foot of the rocket, only in A.
    { x: 1120, y: 1090, r: 85 },
    // The right fuel tank: grey in A, yellow in B.
    { x: 840, y: 1048, r: 85 },
    // The middle window of the control building: lit in A, dark in B.
    { x: 2215, y: 987, r: 60 },
    // The flag on the control building: blue in A, green in B.
    { x: 2073, y: 774, r: 60 },
    // The thin rod with the red tip in the dish antenna, only in A.
    { x: 2411, y: 752, r: 60 },
    // The visor of the astronaut on the left: yellow in A, blue in B.
    { x: 467, y: 1303, r: 60 },
    // The rock at the bottom, right of the middle: grey in A, reddish brown in B.
    { x: 1836, y: 1512, r: 85 },
  ],
}
