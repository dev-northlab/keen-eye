import { alien, alienPlant, asteroid, astronaut, beacon, comet, crater, crystal, dome, flag, fuelCanister, moonPebbles, planet, probe, rocket, rover, satellite, solarPanel, star, starField, toolbox, ufo } from '../chapter-05/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { around, big } from './shapes.ts'

export default memoryLevel({
  id: 308,
  title: 'memorySpace',
  showSeconds: 4,
  scene: ({ diff, rand }) =>
    `<rect width="500" height="750" fill="#1b1f4b"/>` +
    starField(rand, 0, 460, 50, 500) +
    diff(...around(68, 70, 212, 150), planet(140, 110, 40, '#ff9f43'), planet(140, 110, 40, '#ff9f43', '#ffd23f')) +
    diff(...around(176, 228, 354, 274), big(230, 260, 1.6, ufo(0, 0)), big(300, 260, 1.6, ufo(0, 0))) +
    `<path d="M0 470Q125 440 250 460T500 450V750H0Z" fill="#8f89a8"/>` +
    crater(130, 680, 50) +
    crater(385, 612, 34) +
    dome(100, 560, 60) +
    rocket(400, 560, '#f1f1f1', '#e63946', 1.6) +
    diff(...around(216, 470, 263, 560), big(220, 560, 1.8, flag(0, 0, '#e63946')), big(220, 560, 1.8, flag(0, 0, '#3a86ff'))) +
    big(275, 700, 1.8, astronaut(0, 0)) +
    // Decor: small things that fill the scene, the same in both pictures
    planet(420, 90, 26, '#4dabf7', '#ffd23f') +
    planet(50, 300, 14, '#8ac926') +
    satellite(290, 50) +
    comet(380, 160) +
    asteroid(90, 225, 0.7) +
    star(30, 420, 10) +
    probe(120, 390) +
    beacon(25, 560) +
    moonPebbles(60, 620) +
    alienPlant(190, 620) +
    alien(200, 740) +
    solarPanel(450, 555) +
    fuelCanister(484, 560) +
    toolbox(330, 592) +
    crystal(470, 640) +
    diff(...around(352, 653, 448, 720), big(400, 720, 1.6, rover(0, 0)), ''),
})
