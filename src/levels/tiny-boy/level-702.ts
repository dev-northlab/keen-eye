import type { Level } from '../../engine/types.ts'

// "Tiny boy" 2: the boy in the snowy yard at night by his snowman (public/levels/tiny-boy/, Gemini, 2752×1536). B is
// A with only the listed parts taken from Gemini's B (feathered masks); it changed nothing else but a few specks.
// Zones measured on the pixel difference. The string lights run along the top edge right up to the pompom, so their
// circle sits on that edge and leaves out the last two bulbs, next to the pompom's zone.
const level: Level = {
  id: 702,
  chapter: 'tinyBoy',
  title: 'snowmanNight',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-702-a.webp',
  imageB: 'levels/tiny-boy/level-702-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The snowman's carrot nose, only in A.
    { x: 905, y: 712, r: 60 },
    // The pompom on his hat: grey in A, red in B.
    { x: 1660, y: 72, r: 130 },
    // The snowman's left twig arm, only in A.
    { x: 680, y: 940, r: 130 },
    // The string lights on the fence: many colours in A, all blue in B.
    { x: 950, y: 20, r: 430 },
    // The car's tail light: on in A, off in B.
    { x: 2106, y: 195, r: 75 },
  ],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
