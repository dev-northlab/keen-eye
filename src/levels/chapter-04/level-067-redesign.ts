import type { LevelPictures } from '../../engine/types.ts'

// Level 67 ("surfers") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the gull flying on the
// left of the sky turns grey, the kite yellow, the surfboard under the surfer in pink blue, the kitesurfer's shirt blue,
// the flag on the lifeguard tower yellow, the pink surfboard in the sand green, the blue parasol gets white stripes, the
// shirt of the man at the bottom left turns red and a grey rock lies on the sand left of the purple towel. B is A with
// only these changes of Gemini's laid over it; it left the gull white, so the gull is greyed by hand on A's picture.
export const level067Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-067-a.webp',
  imageB: 'levels/redesign/level-067-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The gull flying on the left of the sky: white in A, grey in B.
    { x: 1072, y: 595, r: 72 },
    // The kitesurfer's kite: purple in A, yellow in B.
    { x: 2082, y: 536, r: 83 },
    // The surfboard under the surfer in pink: yellow in A, blue in B.
    { x: 742, y: 948, r: 105 },
    // The kitesurfer's shirt: green in A, blue in B.
    { x: 1832, y: 890, r: 67 },
    // The small flag on the lifeguard tower: red in A, yellow in B.
    { x: 1655, y: 1053, r: 60 },
    // The surfboard stuck in the sand on the left: pink in A, green in B.
    { x: 499, y: 1262, r: 170 },
    // The parasol on the right: blue in A, blue and white stripes in B.
    { x: 2168, y: 1218, r: 177 },
    // The shirt of the man at the bottom left: teal in A, red in B.
    { x: 951, y: 1294, r: 85 },
    // A grey rock on the sand left of the purple towel, only in B.
    { x: 1838, y: 1549, r: 99 },
  ],
}
