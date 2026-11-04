// Motion differences: a second lightning bolt flashes only on picture B; smoke drifts from the keeper's chimney only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bottleMessage, bucket, buoy, crab, gullStanding, rock, starfish } from './shapes.ts'

/** Lightning bolt from (x, y) down. Bounds: x from −10 to +14, y from 0 to +50. */
const bolt = (x: number, y: number) => `<path d="M${x + 4} ${y}l-14 26h10l-8 24l22 -32h-10l8 -18Z" fill="#fff6a8"/>`

/** Gallery railing around the lantern room with `posts` posts; (x, y) = rail middle. Bounds: x ±24, y from −2 to +12. */
const railing = (x: number, y: number, posts: number) => {
  let s = `<path d="M${x - 24} ${y}h48" stroke="#2b2b2b" stroke-width="3"/>`
  for (let i = 0; i < posts; i++) s += `<path d="M${x - 22 + (44 * i) / (posts - 1)} ${y}v12" stroke="#2b2b2b" stroke-width="2"/>`
  return s
}

/** Gull battling the wind, wings up; (x, y) = body. Bounds: x ±16, y from −10 to +6. */
const gull = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -8q8 4 16 6q8 -2 16 -8" stroke="#f4f4f4" stroke-width="3" fill="none"/><ellipse rx="7" ry="4" fill="#f4f4f4"/><path d="M7 -1l5 1l-5 2Z" fill="#f4a261"/></g>`

/** Rooster weathervane; (x, y) = pivot. Bounds: x ±16, y from −18 to +4. */
const vane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#2b2b2b"><path d="M-14 0h28" stroke="#2b2b2b" stroke-width="2"/><path d="M16 0l-6 -3v6Z"/><path d="M-6 -2q-5 -12 3 -15q7 -1 7 7l-2 10Z"/></g>`

const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="6" fill="#9aa5b1" fill-opacity="0.8"/><circle cx="${x - 7}" cy="${y - 9}" r="7" fill="#9aa5b1" fill-opacity="0.6"/><circle cx="${x - 15}" cy="${y - 16}" r="6" fill="#9aa5b1" fill-opacity="0.45"/>`

export default svgLevel({
  id: 135,
  chapter: 'sea',
  title: 'stormLighthouse',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    let rain = ''
    for (let i = 0; i < 60; i++) rain += `<path d="M${(rand() * 820).toFixed(1)} ${(rand() * 480).toFixed(1)}l-8 18" stroke="#c9d6e6" stroke-opacity="0.35" stroke-width="1.5"/>`
    let bands = ''
    for (let k = 0; k < 5; k++) {
      const y = 110 + k * 50
      const half = 22 + k * 3
      bands += `<path d="M${550 - half} ${y}h${2 * half}l3 50h${-2 * half - 6}Z" fill="${k % 2 ? '#f4f4f4' : '#d62828'}"/>`
    }
    let crests = ''
    for (let x = -20; x < 820; x += 70) crests += `<path d="M${x} ${400 + (x % 140 ? 10 : 0)}q20 -26 44 -10q-10 -2 -14 10Z" fill="#f4f8fb"/>`
    const flash = anim({ type: 'blink', duty: 0.15, period: 3.4 }, bolt(150, 70))

    return (
      `<rect width="800" height="500" fill="#3a4a66"/>` +
      `<path d="M0 0H800V90Q700 130 600 100T400 110T200 90T0 110Z" fill="#2b3650"/>` +
      `<ellipse cx="200" cy="60" rx="140" ry="40" fill="#252e45"/><ellipse cx="520" cy="40" rx="160" ry="36" fill="#252e45"/>` +
      flash + diff(322, 92, 30, bolt(320, 70), anim({ type: 'blink', duty: 0.3, period: 1.8 }, bolt(320, 70))) +
      // Light beam
      anim({ type: 'sway', angle: 16, pivot: [550, 82], period: 5 }, `<path d="M550 82L180 30V150Z" fill="#fff3a8" fill-opacity="0.18"/>`) +
      // Cliff, lighthouse and the keeper's house
      `<path d="M440 420Q470 340 520 350L600 352L760 350Q800 360 800 420Z" fill="#4a4f5a"/>` +
      bands +
      `<rect x="534" y="62" width="32" height="40" rx="3" fill="#ffe08a" stroke="#2b2b2b" stroke-width="3"/><path d="M528 62l22 -18l22 18Z" fill="#2b2b2b"/>` +
      diff(550, 104, 26, railing(550, 104, 4), railing(550, 104, 5)) +
      diff(550, 214, 22, `<rect x="545" y="207" width="10" height="14" rx="2" fill="#ffe08a"/>`, `<rect x="543" y="204" width="14" height="19" rx="2" fill="#ffe08a"/>`) +
      diff(550, 340, 22, `<path d="M541 360v-22a9 9 0 0 1 18 0v22Z" fill="#3a86ff"/>`, `<path d="M541 360v-22a9 9 0 0 1 18 0v22Z" fill="#4a6fd6"/>`) +
      `<rect x="600" y="300" width="140" height="56" fill="#c9b79c"/><path d="M592 304l78 -36l78 36Z" fill="#6b3a2a"/>` +
      `<rect x="716" y="270" width="14" height="26" fill="#5a4a3a"/>` +
      diff(716, 258, 28, smoke(724, 266), anim({ type: 'bob', dx: -4, dy: -4, period: 1.6 }, smoke(724, 266))) +
      `<path d="M620 288V272" stroke="#2b2b2b" stroke-width="2"/>` +
      diff(620, 268, 22, vane(620, 272), `<g transform="rotate(-28 620 272)">${vane(620, 272)}</g>`) +
      `<rect x="614" y="318" width="22" height="20" fill="#ffd98a" stroke="#6b3a2a" stroke-width="2"/>` +
      diff(682, 328, 22, `<rect x="671" y="318" width="22" height="20" fill="#ffd98a" stroke="#6b3a2a" stroke-width="2"/>`, `<rect x="671" y="318" width="22" height="20" fill="#f2b65a" stroke="#6b3a2a" stroke-width="2"/>`) +
      `<rect x="704" y="322" width="18" height="34" fill="#6b3a2a"/>` +
      // Sea
      `<path d="M0 380Q100 350 200 380T400 380T600 390T800 384V500H0Z" fill="#2a5f7a"/>` +
      anim({ type: 'bob', dx: 10, dy: 4, period: 3 }, crests) +
      `<path d="M0 440Q120 410 240 440T480 440T720 440T960 440V500H0Z" fill="#234f66"/>` +
      // Boat in the waves
      anim(
        { type: 'sway', angle: 8, pivot: [180, 360], period: 2.6 },
        `<g transform="rotate(-14 180 360)"><path d="M140 350h80l-12 18h-56Z" fill="#c0573f"/><path d="M178 350V300" stroke="#3d3d3d" stroke-width="3"/><path d="M182 304l26 40h-26Z" fill="#f4f4f4"/></g>`,
      ) +
      diff(260, 160, 22, '', gull(260, 160)) + gull(420, 200) +
      diff(380, 400, 26, buoy(374, 404, '#ffb703'), buoy(388, 404, '#ffb703')) +
      rock(470, 430, 1.2, '#5c6470') + diff(520, 418, 24, rock(520, 430, 0.9, '#6b7480'), '') + rock(760, 430, 1.4, '#5c6470') +
      gullStanding(770, 354) +
      bucket(490, 372) +
      bottleMessage(300, 462) +
      starfish(605, 376) +
      crab(462, 412) +
      rain +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['lifeRing', 436, 462],
        ['fish', 665, 468, '#ff9f43'],
        ['bottle', 64, 474],
        ['gull', 664, 78],
        ['gull', 438, 153],
      ])
    )
  },
})
