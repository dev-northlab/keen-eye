// Stadium: a football match by day and under the floodlights, among the ten hardest of "time" (hidden until
// released, levels/upcoming.ts). Stands full of fans with a banner and a balloon, a scoreboard with its clock, the
// pitch with a goal, players, a referee with a card, a coach at the dugout, a mascot and a TV camera.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bin, bird, birds, bucket, clockFace, cone, crate, DUSK, moon, person, pigeon, shadow, sky, small, stars, sun } from './shapes.ts'

/** Floodlight panel on its mast at x, dark or lit. Bounds: x ±32, y from +31 to +95. */
const flood = (x: number, lit: boolean) =>
  (lit ? `<circle cx="${x}" cy="63" r="30" fill="#ffe08a" fill-opacity="0.35"/>` : '') +
  `<rect x="${x - 20}" y="50" width="40" height="26" rx="3" fill="${lit ? '#fff3b0' : '#d8dee4'}" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M${x - 20} 63H${x + 20}M${x - 7} 50V76M${x + 7} 50V76" stroke="#3d4a55" stroke-width="1.5"/>`

/** Shirt of a `person` at (x, y). Bounds: x ±14, y from −48 to −22. */
const shirt = (x: number, y: number, color: string) => `<path d="M${x - 11} ${y - 48}h22l3 26h-28Z" fill="${color}"/>`

export default svgLevel({
  id: 235,
  chapter: 'time',
  title: 'stadium',
  pair: 'day-night',
  parTimeSec: 165,
  scene: ({ diff, time, trap, rand, extra, anim }) => {
    let crowd = ''
    const colors = ['#e63946', '#3a86ff', '#ffd23f', '#f4f1e8', '#8ac926']
    for (let row = 0; row < 5; row++)
      for (let x = 12 + (row % 2) * 9; x < 800; x += 18) {
        const y = 170 + row * 22 - Math.round(Math.sin((x / 800) * Math.PI) * 18)
        crowd += `<circle cx="${x}" cy="${y}" r="6" fill="${colors[Math.floor(rand() * colors.length)]}"/>`
      }
    let stripes = ''
    for (let x = 0; x < 800; x += 100) stripes += `<rect x="${x}" y="280" width="50" height="220" fill="#5cb85c"/>`
    const beams = `<path d="M40 76L0 500H260ZM760 76L800 500H540Z" fill="#fff3b0" fill-opacity="0.12"/>`
    return (
      sky(time(false, true), 160) +
      // The stands: roof flag, banner, a fan's balloon
      `<path d="M0 280V150Q400 100 800 150V280Z" fill="#5c677d"/>` + crowd +
      `<path d="M0 142Q400 92 800 142V128Q400 78 0 128Z" fill="#3d4a55"/><path d="M290 112V86" stroke="#8d99ae" stroke-width="2"/>` +
      diff(...around(290, 86, 312, 98), `<rect x="290" y="86" width="22" height="12" fill="#e63946"/>`, `<rect x="290" y="86" width="22" height="12" fill="#8338ec"/>`) +
      diff(...around(180, 196, 220, 216), `<rect x="180" y="196" width="40" height="20" fill="#ffd23f"/><path d="M186 206h28" stroke="#e63946" stroke-width="4"/>`, `<rect x="180" y="196" width="40" height="20" fill="#3a86ff"/><path d="M186 206h28" stroke="#e63946" stroke-width="4"/>`) +
      `<path d="M520 182V194" stroke="#f4f1e8" stroke-width="1"/>` +
      diff(...around(511, 159, 529, 181), `<ellipse cx="520" cy="170" rx="9" ry="11" fill="#ff006e"/>`, '') +
      // Floodlight masts
      `<path d="M60 280V76M740 280V76" stroke="#8d99ae" stroke-width="6"/>` + flood(60, false) + flood(740, false) +
      // The scoreboard: the home team's color
      `<path d="M350 128V96M450 128V96" stroke="#5c677d" stroke-width="5"/><rect x="330" y="20" width="140" height="76" rx="4" fill="#2b2d42"/><rect x="428" y="32" width="30" height="20" fill="#3a86ff"/>` +
      diff(...around(342, 32, 372, 52), `<rect x="342" y="32" width="30" height="20" fill="#e63946"/>`, `<rect x="342" y="32" width="30" height="20" fill="#ffd23f"/>`) +
      // The pitch, the goal
      `<rect y="280" width="800" height="220" fill="#4caf6a"/>` + stripes +
      `<path d="M0 296H800M400 296V500" stroke="#ffffff" stroke-width="3"/><ellipse cx="400" cy="400" rx="70" ry="36" fill="none" stroke="#ffffff" stroke-width="3"/>` +
      `<path d="M30 380V300H70V380" stroke="#ffffff" stroke-width="5" fill="none"/><path d="M40 300V380M50 300V380M60 300V380M30 320H70M30 340H70M30 360H70" stroke="#ffffff" stroke-opacity="0.5" stroke-width="1"/>` +
      // Corner flag, the coach's cap at the dugout
      `<path d="M770 300V272" stroke="#f4f1e8" stroke-width="2"/>` +
      diff(...around(770, 272, 788, 284), `<path d="M770 272L788 278L770 284Z" fill="#ffd23f"/>`, `<path d="M770 272L788 278L770 284Z" fill="#e63946"/>`) +
      `<path d="M636 330V292H724V330" stroke="#8d99ae" stroke-width="4" fill="none"/><rect x="636" y="288" width="88" height="6" fill="#bde3f2" fill-opacity="0.7"/>` +
      person(683, 334, '#2b2d42') +
      diff(...around(671, 266, 695, 279), `<path d="M674 278q9 -12 18 0h5v3h-23Z" fill="#e63946"/>`, `<path d="M674 278q9 -12 18 0h5v3h-23Z" fill="#f4f1e8"/>`) +
      // Players, the referee's card, the ball
      person(220, 433, '#e63946') + diff(...around(206, 385, 234, 411), shirt(220, 433, '#e63946'), shirt(220, 433, '#ffffff')) +
      person(560, 430, '#3a86ff', true) +
      person(430, 410, '#2b2b2b') + `<path d="M441 386L446 378" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/>` +
      diff(...around(442, 366, 454, 382), `<rect x="443" y="366" width="10" height="14" rx="1" fill="#e63946"/>`, `<rect x="443" y="366" width="10" height="14" rx="1" fill="#ffd23f"/>`) +
      `<circle cx="300" cy="476" r="9" fill="#ffffff"/>` +
      diff(...around(291, 467, 309, 485), `<path d="M300 471l4 3l-1.5 5h-5l-1.5 -5Z" fill="#2b2b2b"/>`, `<path d="M300 471l4 3l-1.5 5h-5l-1.5 -5Z" fill="#e63946"/>`) +
      // The mascot's hat, the TV camera's light
      `<ellipse cx="620" cy="458" rx="18" ry="22" fill="#a0703f"/><circle cx="620" cy="424" r="14" fill="#a0703f"/><circle cx="608" cy="412" r="5" fill="#a0703f"/><circle cx="632" cy="412" r="5" fill="#a0703f"/>` +
      `<ellipse cx="620" cy="428" rx="7" ry="5" fill="#e9c46a"/><circle cx="615" cy="421" r="1.6" fill="#222"/><circle cx="625" cy="421" r="1.6" fill="#222"/><path d="M612 480v12M628 480v12" stroke="#a0703f" stroke-width="7"/>` +
      diff(...around(610, 396, 630, 412), `<path d="M610 412L620 396L630 412Z" fill="#3a86ff"/><circle cx="620" cy="396" r="3" fill="#ffd23f"/>`, `<path d="M610 412L620 396L630 412Z" fill="#e63946"/><circle cx="620" cy="396" r="3" fill="#ffd23f"/>`) +
      `<path d="M120 440L104 488M120 440L136 488M120 440V488" stroke="#3d4a55" stroke-width="3"/><rect x="104" y="418" width="32" height="22" rx="3" fill="#5c677d"/><rect x="92" y="424" width="12" height="10" fill="#3d4a55"/>` +
      diff(...around(128, 418, 136, 426), `<circle cx="132" cy="422" r="3.5" fill="#ff3b3b"/>`, '') +
      // Decor: the same at both moments, darkened by the evening with the rest
      pigeon(250, 488) +
      pigeon(700, 490, true) +
      cone(360, 490) +
      cone(470, 490) +
      bucket(160, 492) +
      crate(740, 488, 22) +
      bird(50, 298) +
      bin(780, 490) +
      small(84, 492, person(84, 492, '#ff9f43')) +
      `<rect x="372" y="306" width="30" height="14" rx="4" fill="#3a86ff"/><rect x="410" y="304" width="6" height="16" rx="2" fill="#8ecae6"/><rect x="420" y="304" width="6" height="16" rx="2" fill="#8ecae6"/>` +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 680, 150],
      ]) +
      time('', DUSK) +
      time('', beams) +
      trap(60, 63, 32, flood(60, false), flood(60, true), 'lights') +
      trap(740, 63, 32, flood(740, false), flood(740, true), 'lights') +
      trap(400, 72, 20, clockFace(400, 72, 16, 3, 0), clockFace(400, 72, 16, 8, 30), 'clock') +
      trap(540, 430, 31, shadow(560, 430, 50), '', 'shadow') +
      trap(440, 150, 35, birds(440, 150), '', 'birds') +
      trap(240, 52, 42, '', stars(240, 52), 'stars') +
      trap(560, 58, 54, sun(560, 58), moon(560, 58), 'moon')
    )
  },
})
