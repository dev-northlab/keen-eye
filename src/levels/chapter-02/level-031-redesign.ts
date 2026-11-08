import type { LevelPictures } from '../../engine/types.ts'

// Level 31 ("busStop") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the timetable board
// turns from blue to red, the shirt of the person on the bench from red to green, the black dog's collar from orange to
// blue, the bin by the street lamp from green to blue, the kiosk's flag from yellow to red, the right pigeon of the two
// near the tree from grey to white, and the yellow bus gets a red stripe below its windows. Touched up by hand: B is A
// with only Gemini's board, shirt, bin, flag, pigeon and stripe laid over it. The dog already wears an orange collar in
// A, and Gemini only made it a little redder: the collar is recolored blue by hand instead.
export const level031Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-031-a.webp',
  imageB: 'levels/redesign/level-031-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The flag on the kiosk roof: yellow in A, red in B.
    { x: 2280, y: 778, r: 60 },
    // The timetable board on the bus stop post: blue in A, red in B.
    { x: 1396, y: 926, r: 82 },
    // The shirt of the person on the bench: red in A, green in B.
    { x: 1246, y: 990, r: 68 },
    // The bin by the street lamp: green in A, blue in B.
    { x: 1964, y: 1064, r: 72 },
    // The black dog's collar: orange in A, blue in B.
    { x: 1706, y: 1056, r: 60 },
    // The right pigeon of the two on the sidewalk near the tree: grey in A, white in B.
    { x: 600, y: 1098, r: 66 },
    // A red stripe along the yellow bus below its windows, only in B.
    { x: 302, y: 1406, r: 300 },
  ],
}
