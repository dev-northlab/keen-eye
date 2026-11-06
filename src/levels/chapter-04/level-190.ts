// Pearl farm: a lagoon under a green island, the sea's hardest scene (hidden until released, levels/upcoming.ts).
// New in the sea: a floating workshop hut on a raft, a sorting table of oysters with a pearl, a pearl farmer, a
// dog, rows of farm buoys, a pearl diver with a snorkel, a longtail boat with its boatman, an oyster basket and an
// outboard, a frigatebird with its throat pouch, a waterfall and a reef shark's fin. Motion differences: the hut's
// flag flies only on picture B; the dog wags and the shark circles only on A.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, sun } from './shapes.ts'

/** Dog standing on the raft without its tail, faces right; (x, y) = feet. Bounds: x from −14 to +37, y from −31 to 0. */
const dog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#e9c46a"><path d="M-6 -10V0M2 -10V0M14 -10V0M22 -10V0" stroke="#e9c46a" stroke-width="4"/><rect x="-10" y="-22" width="36" height="13" rx="6"/>` +
  `<circle cx="30" cy="-24" r="7"/><path d="M26 -30l-2 -6l7 3Z" fill="#c9a03f"/><circle cx="33" cy="-25" r="1.4" fill="#222"/><circle cx="37" cy="-22" r="1.6" fill="#2b2b2b"/></g>`

/** Oyster lying on the table; (x, y) = center, open shows its pearly inside. Bounds: x ±10, y ±6. */
const oyster = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="10" ry="6" fill="#8d99ae"/><ellipse cx="${x}" cy="${y - 1}" rx="6" ry="3.5" fill="#f4f1e8"/>`

export default svgLevel({
  id: 190,
  chapter: 'sea',
  title: 'pearlFarm',
  parTimeSec: 112,
  scene: ({ diff, anim, extra }) => {
    const flag = `<path d="M105 174H127L121 181L127 188H105Z" fill="#e63946"/>`
    const tail = `<path d="M176 314L164 302" stroke="#e9c46a" stroke-width="4" stroke-linecap="round"/>`
    const fin = `<path d="M712 332L724 310L730 332Z" fill="#5c677d"/>`
    let buoys = ''
    for (let x = 360; x <= 780; x += 40) if (x !== 520) buoys += `<circle cx="${x}" cy="262" r="7" fill="#ff9f43"/>`
    for (let x = 380; x <= 780; x += 40) buoys += `<circle cx="${x}" cy="292" r="7" fill="#ff9f43"/>`
    return (
      `<rect width="800" height="500" fill="#cdeffa"/>` + sun(220, 80) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(560, 60, 0.6)) +
      // The island and its waterfall
      `<path d="M380 212Q470 110 560 150Q640 92 760 160Q790 180 800 190V212Z" fill="#3f9a5a"/><path d="M560 150Q600 170 620 210M700 128Q690 170 720 210" stroke="#2f7d55" stroke-width="6" fill="none"/>` +
      diff(640, 171, 22, `<path d="M636 152Q640 170 637 190H645Q646 170 644 152Z" fill="#e9f7fb"/>`, '') +
      // The lagoon and the rows of farm buoys
      `<rect y="208" width="800" height="292" fill="#39b5c4"/><rect y="380" width="800" height="120" fill="#4cc3c7"/>` +
      anim({ type: 'path', points: [[0, 0], [24, 0]], period: 6 }, `<path d="M40 380h40M300 470h40M600 480h50M480 350h40" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>`) +
      `<path d="M340 262H800M340 292H800" stroke="#f4f1e8" stroke-width="1.5"/>` + buoys +
      diff(520, 262, 22, `<circle cx="520" cy="262" r="7" fill="#ff9f43"/>`, `<circle cx="520" cy="262" r="7" fill="#e63946"/>`) +
      // Frigatebird and its pouch
      `<path d="M340 84L372 92L380 86L388 92L420 84L392 98L380 104L368 98Z" fill="#2b2b2b"/><circle cx="382" cy="90" r="4" fill="#2b2b2b"/><path d="M385 90l8 2l-8 1Z" fill="#8d99ae"/>` +
      diff(386, 100, 22, `<ellipse cx="386" cy="100" rx="5" ry="4" fill="#e63946"/>`, '') +
      // Pearl diver and his snorkel
      `<ellipse cx="420" cy="338" rx="16" ry="4" fill="#ffffff" fill-opacity="0.6"/><circle cx="420" cy="330" r="9" fill="#c68c53"/><rect x="412" y="324" width="16" height="7" rx="3" fill="#8ecae6" stroke="#2b2b2b" stroke-width="1.5"/>` +
      diff(430, 314, 22, `<path d="M429 330H432V304Q432 300 436 300" stroke="#ffd23f" stroke-width="3" fill="none"/>`, `<path d="M429 330H432V304Q432 300 436 300" stroke="#3a86ff" stroke-width="3" fill="none"/>`) +
      // Reef shark's fin
      `<ellipse cx="721" cy="334" rx="14" ry="3" fill="#ffffff" fill-opacity="0.5"/>` +
      diff(721, 322, 26, anim({ type: 'bob', dx: 10, dy: 0, period: 3 }, fin), fin) +
      // The raft: hut with its flag and lamp, the dog, the sorting table, the farmer
      `<rect x="20" y="330" width="300" height="16" fill="#c9a26b"/><path d="M60 330v16M100 330v16M140 330v16M180 330v16M220 330v16M260 330v16M300 330v16" stroke="#a0703f" stroke-width="2"/>` +
      `<rect x="36" y="346" width="28" height="10" rx="5" fill="#3a86ff"/><rect x="136" y="346" width="28" height="10" rx="5" fill="#3a86ff"/><rect x="246" y="346" width="28" height="10" rx="5" fill="#3a86ff"/>` +
      `<rect x="40" y="236" width="130" height="94" fill="#d9b98a"/><path d="M28 240L105 196L182 240Z" fill="#b5833f"/><path d="M105 196V172" stroke="#5c4033" stroke-width="2"/>` +
      diff(116, 181, 22, flag, anim({ type: 'sway', angle: 12, pivot: [105, 181], period: 1.3 }, flag)) +
      `<rect x="54" y="256" width="32" height="32" fill="#5c4033"/><rect x="120" y="262" width="36" height="68" fill="#7a4e2d"/><path d="M70 256v8" stroke="#2b2b2b" stroke-width="1"/>` +
      diff(70, 272, 22, `<circle cx="70" cy="272" r="8" fill="#ffd166"/><circle cx="70" cy="272" r="4" fill="#fff3b0"/>`, `<circle cx="70" cy="272" r="8" fill="#8d99ae"/><circle cx="70" cy="272" r="4" fill="#adb5bd"/>`) +
      dog(186, 332) + diff(172, 309, 22, anim({ type: 'sway', angle: 25, pivot: [176, 314], period: 0.5 }, tail), tail) +
      `<path d="M220 306V330M290 306V330" stroke="#6b4a2b" stroke-width="4"/><rect x="214" y="300" width="80" height="6" fill="#8a5a33"/>` +
      oyster(226, 294) + oyster(266, 294) + oyster(284, 294) + oyster(246, 294) +
      diff(246, 294, 22, `<circle cx="246" cy="293" r="3.5" fill="#ffffff"/><circle cx="245" cy="292" r="1.2" fill="#ffd6e0"/>`, '') +
      person(306, 330, '#e76f51', true, '#c68c53', '#2b2b2b') +
      diff(306, 272, 22, `<path d="M290 278H322L318 274Q306 262 294 274Z" fill="#e9c46a"/>`, `<path d="M290 278H322L318 274Q306 262 294 274Z" fill="#2a9d8f"/>`) +
      // Longtail boat: the oyster basket, the outboard's cover
      person(668, 420, '#3a86ff', true, '#c68c53', '#2b2b2b') +
      `<path d="M440 420Q438 402 430 398Q450 408 470 412H700L692 440H470Q446 436 440 420Z" fill="#a0703f"/><path d="M466 420H696" stroke="#e9c46a" stroke-width="3"/>` +
      `<path d="M706 412L764 446" stroke="#3d4a55" stroke-width="3"/><path d="M760 440l8 10M768 440l-8 10" stroke="#3d4a55" stroke-width="3"/>` +
      diff(706, 404, 22, `<rect x="696" y="396" width="20" height="16" rx="3" fill="#e63946"/>`, `<rect x="696" y="396" width="20" height="16" rx="3" fill="#2b2b2b"/>`) +
      diff(560, 402, 22, `<path d="M544 412L548 396H572L576 412Z" fill="#c9a26b"/><path d="M548 404H574" stroke="#8a6a44" stroke-width="2"/><circle cx="554" cy="395" r="4" fill="#8d99ae"/><circle cx="564" cy="394" r="4" fill="#8d99ae"/>`, '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 520, 120],
        ['fish', 360, 460],
        ['jellyfish', 160, 420],
        ['buoy', 770, 470],
        ['seahorse', 500, 470],
      ])
    )
  },
})
