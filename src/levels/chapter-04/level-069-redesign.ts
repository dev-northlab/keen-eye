import type { LevelPictures } from '../../engine/types.ts'

// Level 69 ("shipwreck") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the tail of the orange
// fish on the mast turns blue, the small green fish on the right purple, the eel looking out of the hole in the sail
// brown, the anchor on the wreck golden, the bubbles above the diver in black are gone, the suit of the diver in front
// turns yellow, the three gold coins on the sand lose one, the pink starfish turns yellow and the right branch of the
// pink coral green. B is A with only these changes of Gemini's laid over it (the fish, the eel, the anchor, the bubbles,
// the diver, the starfish); it also browned the two other eels in the hull, redrew the wreck and the urchin (all left
// out) and got three wrong, so they are done by hand on A's picture: the tail recoloured (Gemini turned the whole fish
// round), the top coin painted out with the sand beside it and the tops it hid of the two in front filled in (Gemini
// took two), and the coral branch recoloured (Gemini added a green coral instead).
export const level069Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-069-a.avif',
  imageB: 'levels/redesign/level-069-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The tail of the orange fish on top of the mast: orange in A, blue in B.
    { x: 1510, y: 668, r: 60 },
    // The small fish on the right: green in A, purple in B.
    { x: 2286, y: 746, r: 60 },
    // The eel looking out of the hole in the sail: green in A, brown in B.
    { x: 1614, y: 971, r: 83 },
    // The anchor on the wreck: grey in A, golden in B.
    { x: 1182, y: 1240, r: 65 },
    // The air bubbles above the diver in black, only in A.
    { x: 656, y: 1005, r: 136 },
    // The suit of the diver in front: red in A, yellow in B.
    { x: 851, y: 1346, r: 102 },
    // The top coin of the three on the sand at the right, only in A.
    { x: 2294, y: 1480, r: 60 },
    // The starfish on the sand at the left: pink in A, yellow in B.
    { x: 394, y: 1517, r: 64 },
    // The right branch of the pink coral at the right: pink in A, green in B.
    { x: 2560, y: 1448, r: 69 },
  ],
}
