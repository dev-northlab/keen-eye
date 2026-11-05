// "The missing chickens", scene 1 — the coop: the hens are gone from the perch, the coop door stands
// open, the eggs were left in the nest, the grain sack is knocked over, a tuft of white fur hangs on
// the fence and white feathers lead away over the grass.
import { eggNest, flower, hen } from '../shapes.ts'
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, fence, furTuft, grass, sky, sun, tree } from './shapes.ts'
import { coop, coopDoor, rooster, sack, sackSpilt, villageGirl, whiteDuck, whiteFeather } from './village.ts'

/** A hen drawn at `scale` around (x, y). */
const smallHen = (x: number, y: number, scale: number, color: string, flip = false) => `<g transform="translate(${x} ${y}) scale(${scale})">${hen(0, 0, flip, color)}</g>`

export default detectiveLevel({
  id: 531,
  case: 'chickens',
  title: 'chickensCoop',
  parTimeSec: 70,
  scene: ({ clue, anim, extra }) =>
    sky('#bfe6ff') +
    sun(690, 80) +
    cloud(420, 70) +
    cloud(600, 130, 0.7) +
    `<path d="M0 300Q200 260 400 290T800 280V340H0Z" fill="#9fd27a"/>` +
    grass(330) +
    tree(560, 330) +
    fence(300, 800, 330) +
    clue('whiteFur', 706, 288, 22, '', furTuft(706, 288)) +
    // The coop with its window, the perch and the door
    coop(60, 160) +
    `<rect x="74" y="166" width="112" height="84" fill="#e0b07a"/><rect x="80" y="172" width="100" height="72" fill="#3b2a1a"/>` +
    `<path d="M84 226H176" stroke="#a06a38" stroke-width="4" stroke-linecap="round"/>` +
    clue('chickensGone', 130, 210, 48, smallHen(104, 212, 0.55, '#ffffff') + smallHen(130, 212, 0.55, '#c9884a') + smallHen(156, 212, 0.55, '#e8d7b8'), '') +
    clue('coopDoorOpen', 223, 295, 46, coopDoor(60, 160, false), coopDoor(60, 160, true)) +
    rooster(160, 86) +
    // The nest box on the grass: the hen sat on it, now only the eggs are there
    `<ellipse cx="110" cy="368" rx="32" ry="8" fill="#e8c25a"/>` +
    clue('eggsLeft', 110, 358, 28, smallHen(110, 358, 0.6, '#ffffff'), eggNest(110, 368)) +
    `<rect x="78" y="370" width="64" height="22" rx="3" fill="#a06a38"/><path d="M78 378H142" stroke="#7a4a20" stroke-width="2"/>` +
    flower(40, 420, '#ff6b8b') +
    flower(180, 440, '#ffffff') +
    flower(260, 420, '#b38cff') +
    // The girl, the grain sack and the ducks on the pond
    villageGirl(480, 440, 'dress') +
    clue('grainSpilled', 620, 395, 57, sack(620, 420), sackSpilt(620, 420)) +
    clue('featherTrail', 368, 444, 48, '', whiteFeather(340, 446) + whiteFeather(368, 434, 10) + whiteFeather(396, 452, -30)) +
    `<ellipse cx="720" cy="466" rx="72" ry="20" fill="#7cc6e8"/><ellipse cx="720" cy="462" rx="60" ry="12" fill="#a8dcf2"/>` +
    whiteDuck(700, 462) +
    whiteDuck(748, 470, true) +
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
