import type { LevelPictures } from '../../engine/types.ts'

// Level 145 ("marsColony") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the tiny moon turns
// light blue, the rocket's tip light green, the habitat's door yellow, an antenna mast stands on the habitat, the dome's
// light goes out, the greenhouse's front frame turns orange, the right solar panel black, the dust devil loses its top
// ring, the robot's visor turns red and the boulder at the bottom left grey. B is A with only these changes of
// Gemini's laid over it. Fixed by hand: Gemini drew A without the reddish rocks, and on B laid a big grey boulder at the
// bottom left, so the boulder is on both pictures, recoloured Mars red on A; it kept the dust devil's top ring, so on
// A it is cloned away with the ground beside it, the swirl below fading into the ground.
export const level145Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-145-a.webp',
  imageB: 'levels/redesign/level-145-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The tiny moon right of the bigger moon: pale in A, light blue in B.
    { x: 950, y: 280, r: 73 },
    // The light on the rocket's nose tip: red in A, green in B.
    { x: 349, y: 540, r: 73 },
    // The door of the long white habitat: blue in A, yellow in B.
    { x: 974, y: 1030, r: 73 },
    // The antenna mast with two cross bars on the habitat's roof at its right end, only in B.
    { x: 1208, y: 854, r: 73 },
    // The light inside the glass dome: lit yellow in A, dark in B.
    { x: 1616, y: 1005, r: 210 },
    // The frame of the window grid on the front of the greenhouse: white in A, orange in B.
    { x: 2232, y: 970, r: 209 },
    // The right one of the two solar panels at the bottom left: blue in A, black in B.
    { x: 590, y: 1320, r: 130 },
    // The top ring of the dust devil, only in A.
    { x: 1012, y: 1215, r: 115 },
    // The eye visor of the small robot: light blue in A, red in B.
    { x: 1462, y: 1310, r: 73 },
    // The boulder at the bottom left: reddish in A, grey in B.
    { x: 558, y: 1550, r: 90 },
  ],
}
