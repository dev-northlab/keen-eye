// Space elevator: a tether from a ground station up to an orbital ring among the space world's ten hardest (hidden
// until released, levels/upcoming.ts). New in space: the elevator tether with its climber cabin, solar wings and
// a passenger, the top station's docking light, a ground station with its dome, a wind turbine, a maglev tram, a
// worker with a hand truck and a stack of crates. Motion differences: the docking light flashes and the little
// moon drifts only on picture B; the turbine turns only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, dome, planet, satellite, starField } from './shapes.ts'

export default svgLevel({
  id: 195,
  chapter: 'space',
  title: 'spaceElevator',
  parTimeSec: 104,
  scene: ({ diff, anim, rand, extra }) => {
    const dockLight = `<circle cx="430" cy="30" r="5" fill="#3ae0ff"/><circle cx="430" cy="30" r="10" fill="#3ae0ff" fill-opacity="0.35"/>`
    const moon = `<circle cx="230" cy="70" r="8" fill="#bfc7d5"/><circle cx="228" cy="68" r="2" fill="#000" fill-opacity="0.2"/>`
    const blades = `<path d="M120 300V274M120 300L142 313M120 300L98 313" stroke="#f1f1f1" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="300" r="4" fill="#bfc7d5"/>`
    return (
      `<rect width="800" height="500" fill="#101030"/><rect y="200" width="800" height="140" fill="#26305a"/><rect y="270" width="800" height="70" fill="#3d5a80" fill-opacity="0.6"/>` +
      starField(rand, 0, 220, 50) + planet(160, 110, 40, '#ff9f43', '#ffd23f') +
      diff(230, 70, 22, moon, anim({ type: 'bob', dx: 4, dy: 2, period: 4 }, moon)) +
      satellite(620, 120) + diff(647, 120, 22, `<rect x="634" y="112" width="26" height="16" fill="#3a86ff"/><path d="M647 112v16M634 120h26" stroke="#fff" stroke-opacity="0.4" stroke-width="1.5"/>`, `<rect x="634" y="112" width="26" height="16" fill="#e63946"/><path d="M647 112v16M634 120h26" stroke="#fff" stroke-opacity="0.4" stroke-width="1.5"/>`) +
      // The tether, the top station and its docking light
      `<path d="M396 40V350M404 40V350" stroke="#e6e6f0" stroke-width="2"/><ellipse cx="400" cy="36" rx="60" ry="12" fill="#8d99ae"/><circle cx="400" cy="36" r="14" fill="#bfc7d5"/>` +
      diff(430, 30, 22, dockLight, anim({ type: 'blink', duty: 0.5, period: 1.2 }, dockLight)) +
      // The climber: a solar wing, a passenger at the window
      `<rect x="392" y="144" width="16" height="6" fill="#5c677d"/><rect x="392" y="210" width="16" height="6" fill="#5c677d"/><rect x="370" y="150" width="60" height="60" rx="8" fill="#f1f1f1"/>` +
      `<path d="M366 186H370M430 186H434" stroke="#8d99ae" stroke-width="3"/><rect x="434" y="182" width="46" height="8" fill="#3a86ff"/><path d="M370 196H430" stroke="#e63946" stroke-width="4"/>` +
      `<circle cx="384" cy="172" r="6" fill="#8ecae6"/><circle cx="402" cy="172" r="6" fill="#8ecae6"/><circle cx="420" cy="172" r="6" fill="#8ecae6"/>` +
      diff(420, 172, 22, `<circle cx="420" cy="174" r="4" fill="#e0b48a"/>`, '') +
      diff(343, 186, 24, `<rect x="320" y="182" width="46" height="8" fill="#3a86ff"/>`, `<rect x="320" y="182" width="46" height="8" fill="#ffb703"/>`) +
      // The ground, the wind turbine
      `<path d="M0 330Q150 280 300 330T600 330T800 320V500H0Z" fill="#6d597a"/><rect y="440" width="800" height="60" fill="#4b3d60"/>` +
      `<path d="M120 384V300" stroke="#bfc7d5" stroke-width="4"/>` +
      diff(120, 300, 30, anim({ type: 'rotate', pivot: [120, 300], period: 2 }, blades), blades) +
      // The ground station: dome, a window, the flag
      `<rect x="300" y="350" width="200" height="90" fill="#e6e6f0"/>` + dome(350, 350, 40) + `<rect x="384" y="340" width="32" height="12" fill="#5c677d"/>` +
      `<rect x="322" y="396" width="16" height="10" fill="#ffd166"/><rect x="362" y="396" width="16" height="10" fill="#3d4a55"/><rect x="402" y="396" width="16" height="10" fill="#ffd166"/><rect x="474" y="396" width="16" height="10" fill="#ffd166"/>` +
      diff(460, 401, 22, `<rect x="452" y="396" width="16" height="10" fill="#ffd166"/>`, `<rect x="452" y="396" width="16" height="10" fill="#3d4a55"/>`) +
      `<rect x="420" y="414" width="30" height="26" fill="#8d99ae"/>` +
      `<rect x="288.5" y="300" width="3" height="50" fill="#d0d4de"/>` +
      diff(302, 307, 22, `<path d="M291.5 300h22v14h-22Z" fill="#8ac926"/>`, `<path d="M291.5 300h22v14h-22Z" fill="#ff006e"/>`) +
      // Crates, the worker's hand truck, the maglev tram
      `<rect x="190" y="448" width="30" height="28" fill="#c97b3a"/><rect x="220" y="448" width="30" height="28" fill="#a0632b"/><path d="M190 462h60" stroke="#7a4e2d" stroke-width="2"/>` +
      diff(220, 434, 22, `<rect x="205" y="420" width="30" height="28" fill="#3a86ff"/><path d="M205 434h30" stroke="#1d5e8c" stroke-width="2"/>`, `<rect x="205" y="420" width="30" height="28" fill="#ffd23f"/><path d="M205 434h30" stroke="#c9a03f" stroke-width="2"/>`) +
      astronaut(520, 480, '#f1f1f1', '#ffb703') + `<path d="M536 450L540 476H568" stroke="#5c677d" stroke-width="3" fill="none"/><circle cx="562" cy="478" r="4" fill="#3d4a55"/>` +
      diff(552, 452, 22, `<rect x="540" y="440" width="24" height="24" fill="#c97b3a"/><path d="M540 452h24" stroke="#7a4e2d" stroke-width="2"/>`, '') +
      `<rect x="540" y="462" width="260" height="6" fill="#8d99ae"/><path d="M580 458V430Q580 420 592 420H760Q782 424 784 448V458Z" fill="#f1f1f1"/><path d="M580 446H782" stroke="#3a86ff" stroke-width="4"/>` +
      `<rect x="600" y="428" width="22" height="12" rx="2" fill="#8ecae6"/><rect x="632" y="428" width="22" height="12" rx="2" fill="#8ecae6"/><rect x="664" y="428" width="22" height="12" rx="2" fill="#8ecae6"/><rect x="696" y="428" width="22" height="12" rx="2" fill="#8ecae6"/>` +
      diff(764, 436, 22, `<path d="M752 428H766Q776 432 778 440H752Z" fill="#8ecae6"/>`, `<path d="M752 428H766Q776 432 778 440H752Z" fill="#2b2d42"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 560, 40],
        ['sparkle', 260, 200],
        ['probe', 560, 300],
        ['crystal', 40, 480],
        ['fuelCanister', 470, 488],
      ])
    )
  },
})
