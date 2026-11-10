import type { LevelPictures } from '../../engine/types.ts'

// Level 129 ("forestFalls") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the bare
// twig on the left cliff gets two leaves, the right pink flower on the ledge turns yellow, the kingfisher's back green,
// a rock sticks out of the foam, the right striped fish turns dark brown, the salmon's tail fin black, a stone in the
// water gets moss, the log's cut end turns dark brown and a yellow butterfly flies by the ferns. B is A with only these
// changes of Gemini's laid over it; A's right fish is spotted, not striped, and Gemini turned it dark brown and striped,
// which stays as the fish change; it redrew the whole log, so only its cut end is recoloured by hand on A's log.
export const level129Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-129-a.avif',
  imageB: 'levels/redesign/level-129-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The two leaves on the bare twig of the left cliff, only in B.
    { x: 750, y: 621, r: 85 },
    // The right flower on the stone ledge: pink in A, yellow in B.
    { x: 431, y: 892, r: 73 },
    // The kingfisher's back: blue in A, green in B.
    { x: 1956, y: 581, r: 73 },
    // The rock in the foam at the foot of the falls, only in B.
    { x: 1211, y: 1228, r: 81 },
    // A fish in the water: olive in A, dark brown in B.
    { x: 979, y: 1339, r: 73 },
    // The salmon's tail fin: orange in A, black in B.
    { x: 1689, y: 1260, r: 74 },
    // The middle stone of three in the water: grey in A, mossy in B.
    { x: 2004, y: 1430, r: 73 },
    // The log's cut end: light in A, dark brown in B.
    { x: 689, y: 1549, r: 73 },
    // The yellow butterfly by the ferns, only in B.
    { x: 2422, y: 1307, r: 73 },
  ],
}
