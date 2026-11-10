import type { LevelPictures } from '../../engine/types.ts'

// Level 119 ("railwayStation") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): a grey
// pigeon sits on a frame of the glass roof, the station clock's hands turn red, the rightmost lamp's shade red, the
// locomotive's headlight is off, one pane of the carriage door's window is filled with green, the curtain in the
// carriage window turns blue, the signal's light red, the small yellow suitcase purple and the left pigeon in front of
// the kiosk white. B is A with only these changes of Gemini's laid over it. Gemini also hung a blue curtain in the
// window left of that one and filled both panes of the door (left out: only the lower pane is filled).
export const level119Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-119-a.avif',
  imageB: 'levels/redesign/level-119-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // A grey pigeon on a frame of the glass roof at the upper left, only in B.
    { x: 483, y: 161, r: 74 },
    // The hands of the big station clock: black in A, red in B.
    { x: 1317, y: 477, r: 74 },
    // The shade of the rightmost hanging lamp: green in A, red in B.
    { x: 1967, y: 606, r: 74 },
    // The round headlight on the front of the locomotive: glowing in A, dark grey in B.
    { x: 170, y: 973, r: 74 },
    // The lower pane of the window in the right door of the green carriage: glass in A, green in B.
    { x: 1550, y: 1035, r: 74 },
    // The curtain in the window of the green carriage: white in A, blue in B.
    { x: 2405, y: 985, r: 76 },
    // The light of the signal post: green in A, red in B.
    { x: 2545, y: 1048, r: 74 },
    // The small suitcase on top of the luggage cart: yellow in A, purple in B.
    { x: 814, y: 1349, r: 91 },
    // The left pigeon of the two in front of the kiosk: grey in A, white in B.
    { x: 1720, y: 1509, r: 74 },
  ],
}
