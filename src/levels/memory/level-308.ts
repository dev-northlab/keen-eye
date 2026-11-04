import { alien, alienPlant, asteroid, astronaut, beacon, comet, crater, crystal, dome, flag, fuelCanister, moonPebbles, planet, probe, rocket, rover, satellite, solarPanel, star, starField, toolbox, ufo } from '../chapter-05/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { around, big } from './shapes.ts'

export default memoryLevel({
  id: 308,
  title: 'memorySpace',
  showSeconds: 4,
  scene: ({ diff, rand }) =>
    `<rect width="800" height="500" fill="#1b1f4b"/>` +
    starField(rand, 0, 340, 50) +
    diff(...around(68, 70, 212, 150), planet(140, 110, 40, '#ff9f43'), planet(140, 110, 40, '#ff9f43', '#ffd23f')) +
    diff(...around(376, 88, 554, 134), big(430, 120, 1.6, ufo(0, 0)), big(500, 120, 1.6, ufo(0, 0))) +
    `<path d="M0 360Q200 330 400 350T800 340V500H0Z" fill="#8f89a8"/>` +
    crater(560, 450, 50) +
    crater(330, 470, 34) +
    dome(110, 420, 60) +
    rocket(620, 380, '#f1f1f1', '#e63946', 1.6) +
    diff(...around(246, 310, 293, 400), big(250, 400, 1.8, flag(0, 0, '#e63946')), big(250, 400, 1.8, flag(0, 0, '#3a86ff'))) +
    big(420, 420, 1.8, astronaut(0, 0)) +
    // Decor: small things that fill the scene, the same in both pictures
    planet(720, 90, 26, '#4dabf7', '#ffd23f') +
    planet(60, 270, 14, '#8ac926') +
    satellite(300, 60) +
    comet(620, 200) +
    asteroid(290, 200, 0.7) +
    star(760, 250, 10) +
    probe(170, 260) +
    beacon(25, 440) +
    moonPebbles(100, 470) +
    alienPlant(160, 470) +
    alien(200, 490) +
    solarPanel(500, 410) +
    fuelCanister(545, 405) +
    toolbox(420, 470) +
    crystal(470, 480) +
    diff(...around(652, 393, 748, 460), big(700, 460, 1.6, rover(0, 0)), ''),
})
