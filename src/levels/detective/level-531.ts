// "The missing chickens", scene 1 — the coop: the hens are gone from the perch, the coop door stands
// open, the eggs were left in the nest, the grain sack is knocked over, a tuft of white fur hangs on
// the fence and white feathers lead away over the grass.
import { eggNest, flower, hen } from '../shapes.ts'
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, fence, furTuft, grass, sky, sun, tree } from './shapes.ts'
import { coop, coopDoor, flutter, flyingBirds, pecking, ripples, rooster, sack, sackSpilt, sunRays, swimmingDuck, villageGirl, whiteFeather } from './village.ts'

/** A hen drawn at `scale` around (x, y). */
const smallHen = (x: number, y: number, scale: number, color: string, flip = false) => `<g transform="translate(${x} ${y}) scale(${scale})">${hen(0, 0, flip, color)}</g>`

export default detectiveLevel({
  id: 531,
  case: 'chickens',
  title: 'chickensCoop',
  parTimeSec: 70,
  scene: ({ clue, anim, extra }) =>
    sky('#bfe6ff') +
    anim({ type: 'rotate', pivot: [690, 80], period: 40 }, sunRays(690, 80)) +
    sun(690, 80) +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 40 }, cloud(420, 70)) +
    anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 34 }, cloud(600, 130, 0.7)) +
    flyingBirds(anim, 260, 40, 220, 26) +
    `<path d="M0 300Q200 260 400 290T800 280V340H0Z" fill="#9fd27a"/>` +
    grass(330) +
    anim({ type: 'sway', angle: 1.5, pivot: [560, 330], period: 5 }, tree(560, 330)) +
    fence(300, 800, 330) +
    clue('whiteFur', 706, 288, 22, '', furTuft(706, 288)) +
    // The coop with its window, the perch and the door
    coop(60, 160) +
    `<rect x="74" y="166" width="112" height="84" fill="#e0b07a"/><rect x="80" y="172" width="100" height="72" fill="#3b2a1a"/>` +
    `<path d="M84 226H176" stroke="#a06a38" stroke-width="4" stroke-linecap="round"/>` +
    clue('chickensGone', 130, 210, 48, pecking(anim, 104, 226, smallHen(104, 212, 0.55, '#ffffff'), 8, 1.8) + pecking(anim, 130, 226, smallHen(130, 212, 0.55, '#c9884a'), 8, 2.1, 0.4) + pecking(anim, 156, 226, smallHen(156, 212, 0.55, '#e8d7b8'), 8, 1.9, 0.7), '') +
    clue('coopDoorOpen', 223, 295, 46, coopDoor(60, 160, false), coopDoor(60, 160, true)) +
    pecking(anim, 160, 112, rooster(160, 86), 10, 2.4) +
    // The nest box on the grass: the hen sat on it, now only the eggs are there
    `<ellipse cx="110" cy="368" rx="32" ry="8" fill="#e8c25a"/>` +
    clue('eggsLeft', 110, 358, 28, smallHen(110, 358, 0.6, '#ffffff'), eggNest(110, 368)) +
    `<rect x="78" y="370" width="64" height="22" rx="3" fill="#a06a38"/><path d="M78 378H142" stroke="#7a4a20" stroke-width="2"/>` +
    anim({ type: 'sway', angle: 7, pivot: [40, 420], period: 2.8 }, flower(40, 420, '#ff6b8b')) +
    anim({ type: 'sway', angle: 7, pivot: [180, 440], period: 3.2 }, flower(180, 440, '#ffffff')) +
    anim({ type: 'sway', angle: 7, pivot: [260, 420], period: 3 }, flower(260, 420, '#b38cff')) +
    // The girl, the grain sack and the ducks on the pond
    villageGirl(480, 440, 'dress', anim) +
    clue('grainSpilled', 620, 395, 57, sack(620, 420), sackSpilt(620, 420)) +
    clue('featherTrail', 368, 444, 48, '', whiteFeather(340, 446) + whiteFeather(368, 434, 10) + whiteFeather(396, 452, -30)) +
    `<ellipse cx="720" cy="466" rx="72" ry="20" fill="#7cc6e8"/><ellipse cx="720" cy="462" rx="60" ry="12" fill="#a8dcf2"/>` +
    ripples(anim, 712, 474) +
    swimmingDuck(anim, 672, 462, 30, 12) +
    swimmingDuck(anim, 744, 470, 20, 12) +
    flutter(anim, 300, 300, '#ffd23f') +
    flutter(anim, 560, 420, '#b38cff', true, 11) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['bucket', 38, 356],
      ['tent', 247, 453],
      ['beehive', 386, 363],
      ['haybale', 488, 470],
      ['mailbox', 733, 418],
    ]) +
    extras({ extra, anim }, [
      ['crow', 43, 485],
      ['kite', 64, 47, '#7cc25a'],
      ['flowerPot', 136, 442],
      ['wateringCan', 188, 482, '#e5484d'],
      ['tortoise', 191, 393],
      ['molehill', 303, 384],
      ['hotAirBalloon', 315, 183],
      ['owl', 525, 365],
      ['dragonfly', 560, 100],
      ['paperPlane', 757, 171],
    ]),
})
