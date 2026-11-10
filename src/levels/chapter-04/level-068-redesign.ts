import type { LevelPictures } from '../../engine/types.ts'

// Level 68 ("regatta") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the right gull of the
// lower two flying at the top left turns grey, the blue pennant on the committee boat purple, the front sail of the
// green boat yellow, the red circle on the yellow boat's sail blue, the cabin of the white motorboat red, a small red flag
// flies on top of the red boat's mast, the yellow circle on the purple boat's sail turns green, the red buoy at the bottom
// left yellow and the green buoy at the bottom red. B is A with only these changes of Gemini's laid over it (it did all
// nine); the red flag sat a little above the mast, so the mast is drawn on a little higher to hold it.
export const level068Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-068-a.avif',
  imageB: 'levels/redesign/level-068-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The right gull of the lower two flying at the top left: white in A, grey in B.
    { x: 1183, y: 352, r: 60 },
    // The pennant on the committee boat's string: blue in A, purple in B.
    { x: 1960, y: 412, r: 60 },
    // The front sail of the green boat: white in A, yellow in B.
    { x: 906, y: 760, r: 182 },
    // The circle on the sail of the yellow boat: red in A, blue in B.
    { x: 2133, y: 816, r: 60 },
    // The cabin of the white motorboat: blue in A, red in B.
    { x: 369, y: 1034, r: 61 },
    // A small red flag on top of the red boat's mast, only in B.
    { x: 1344, y: 1084, r: 60 },
    // The circle on the sail of the purple boat: yellow in A, green in B.
    { x: 2299, y: 1308, r: 60 },
    // The buoy at the bottom left: red in A, yellow in B.
    { x: 202, y: 1469, r: 93 },
    // The buoy at the bottom: green in A, red in B.
    { x: 791, y: 1549, r: 84 },
  ],
}
