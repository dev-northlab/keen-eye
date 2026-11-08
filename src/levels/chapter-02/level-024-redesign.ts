import type { LevelPictures } from '../../engine/types.ts'

// Level 24 ("station") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the clock's hands
// turn red, the bench's backrest turns blue, the red suitcase turns yellow, the blue shirt by the signal turns green,
// the signal's red light turns green, the locomotive's smoke turns dark grey, the red carriage's roof gets a yellow
// stripe. Touched up by hand: B is A with only Gemini's clock face, backrest, suitcase, shirt, light and roof laid
// over it. Gemini kept the smoke, which hides the lower half of the woman in purple, the tiles and a flower pot:
// instead of removing it (that would mean drawing all of it anew), its puffs and haze are recolored dark grey by hand.
export const level024Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-024-a.webp',
  imageB: 'levels/redesign/level-024-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The clock's hands on the station roof: black in A, red in B.
    { x: 1310, y: 486, r: 82 },
    // The signal's light: red in A, green in B.
    { x: 2370, y: 1022, r: 60 },
    // The shirt of the man by the signal: blue in A, green in B.
    { x: 2108, y: 1094, r: 82 },
    // The smoke above the locomotive's chimney: white in A, dark grey in B.
    { x: 1850, y: 1184, r: 105 },
    // The bench's backrest: wooden in A, blue in B.
    { x: 528, y: 1128, r: 105 },
    // The suitcase next to the man in the yellow shirt: red in A, yellow in B.
    { x: 924, y: 1162, r: 75 },
    // The roof of the red carriage: all red in A, a yellow stripe along it in B.
    { x: 1444, y: 1292, r: 200 },
  ],
}
