import type { LevelPictures } from '../../engine/types.ts'

// Level 83 ("spacewalk") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the comet loses its
// tail, the Earth a small island and its right cloud, the low satellite's left panel turns blue, the station's lower
// left wing green and its upper right wing yellow, the antenna's light green, the third window of the module goes,
// the stripe on the nose cone turns blue and the astronaut's visor blue. B is A with only Gemini's comet head, satellite
// panel, wings, light, stripe and visor laid over it. Fixed by hand: Gemini kept the island and the cloud, so both are
// painted out with the ocean round them; it left thin streaks of the tail and a faint outline of the window, so the tail
// is painted out with the star field and the window with the wall on both sides; it turned both of the satellite's
// panels blue, so the right one stays yellow. Its redrawn asteroids and truss are left out.
export const level083Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-083-a.webp',
  imageB: 'levels/redesign/level-083-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The long tail of the comet at the top right, only in A.
    { x: 2045, y: 152, r: 155 },
    // The small green island on the Earth, right of the middle continent, only in A.
    { x: 1984, y: 1355, r: 60 },
    // The right white cloud on the Earth, only in A.
    { x: 1440, y: 1515, r: 120 },
    // The left solar panel of the satellite flying low over the Earth: yellow in A, blue in B.
    { x: 305, y: 1405, r: 60 },
    // The lower left solar panel wing of the station: blue in A, green in B.
    { x: 575, y: 800, r: 120 },
    // The upper right solar panel wing of the station: blue in A, yellow in B.
    { x: 2048, y: 507, r: 120 },
    // The light on top of the station's antenna: red in A, green in B.
    { x: 1310, y: 456, r: 70 },
    // The third round window of the station module, only in A.
    { x: 1376, y: 641, r: 60 },
    // The stripe on the station's nose cone: red in A, blue in B.
    { x: 1675, y: 650, r: 66 },
    // The visor of the floating astronaut: yellow in A, blue in B.
    { x: 1190, y: 908, r: 60 },
  ],
}
