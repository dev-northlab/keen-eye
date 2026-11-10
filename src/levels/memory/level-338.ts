// Dinosaur museum: a hall of fossils among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). A
// pterosaur hanging from the ceiling, a volcano poster, a big skeleton, a stegosaurus model, an info sign, a display case
// with an ammonite, a nest of eggs and a velvet rope.
import { person } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { around, big, pottedPlant, room, wallClock } from './shapes.ts'

/** Pterosaur model with spread wings in `color`; (x, y) = body center. Bounds: x ±60, y from −20 to +20. */
const pterosaur = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}L${x - 60} ${y - 10}L${x - 30} ${y + 10}ZM${x} ${y}L${x + 60} ${y - 10}L${x + 30} ${y + 10}Z" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="${color}"/><path d="M${x + 10} ${y - 4}L${x + 36} ${y - 18}L${x + 16} ${y - 2}Z" fill="${color}"/><circle cx="${x + 14}" cy="${y - 6}" r="1.6" fill="#222"/>`

/** Ammonite fossil; (x, y) = center. Bounds: radius 18. */
const ammonite = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="18" fill="#c9b48e"/><path d="M${x} ${y}m-3 0a3 3 0 1 1 6 0a6 6 0 1 1 -12 0a9 9 0 1 1 18 0a12 12 0 1 1 -24 0" stroke="#8a6a44" stroke-width="2" fill="none"/>`

export default memoryLevel({
  id: 338,
  title: 'memoryDinoMuseum',
  showSeconds: 5,
  scene: ({ diff }) => {
    let ribs = ''
    for (let x = 150; x <= 250; x += 20) ribs += `<path d="M${x} 300q-6 30 4 56" stroke="#f4f1e8" stroke-width="5" fill="none"/>`
    return (
      room(560, '#9fb3c8', '#b8a58f') +
      // The hanging pterosaur
      `<path d="M330 0V80M390 0V80" stroke="#8d99ae" stroke-width="1.5"/>` +
      diff(...around(300, 70, 420, 110, 30), pterosaur(360, 90, '#e07a5f'), pterosaur(360, 90, '#3fa46f')) +
      // The volcano poster's lava
      `<rect x="40" y="60" width="110" height="120" fill="#ffd8a8" stroke="#6b4226" stroke-width="5"/><path d="M50 172L95 104L140 172Z" fill="#6b4226"/>` +
      diff(...around(84, 92, 106, 124, 30), `<path d="M85 112L95 94L105 112L100 124L90 124Z" fill="#ff7b00"/>`, `<path d="M85 112L95 94L105 112L100 124L90 124Z" fill="#3ae0ff"/>`) +
      // The skeleton on its platform and its tail
      `<rect x="30" y="470" width="310" height="30" fill="#8d99ae"/>` +
      `<path d="M80 372Q120 300 200 296Q260 292 300 250" stroke="#f4f1e8" stroke-width="10" fill="none" stroke-linecap="round"/>` + ribs +
      `<path d="M210 352L190 420L200 470M240 340L250 420L236 470M180 470h30M226 470h30M270 300l14 20" stroke="#f4f1e8" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      `<path d="M286 236Q300 200 330 214L346 236L326 246L300 248Z" fill="#f4f1e8"/><circle cx="318" cy="222" r="4" fill="#3d3d3d"/><path d="M308 246l2 6M318 246l2 6M328 244l2 6" stroke="#f4f1e8" stroke-width="2"/>` +
      diff(...around(36, 356, 84, 396, 30), `<path d="M80 372Q62 382 40 392" stroke="#f4f1e8" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="60" cy="383" r="4" fill="#f4f1e8"/>`, '') +
      // The info sign, the stegosaurus' plates
      diff(...around(400, 190, 450, 220, 30), `<rect x="400" y="190" width="50" height="30" rx="3" fill="#3a86ff"/><path d="M408 200h34M408 210h24" stroke="#ffffff" stroke-width="3"/>`, `<rect x="400" y="190" width="50" height="30" rx="3" fill="#e63946"/><path d="M408 200h34M408 210h24" stroke="#ffffff" stroke-width="3"/>`) +
      `<rect x="360" y="420" width="120" height="50" fill="#8d99ae"/>` +
      `<path d="M380 410V420M400 412V420M440 412V420M460 410V420" stroke="#6a994e" stroke-width="7"/><ellipse cx="420" cy="398" rx="50" ry="18" fill="#6a994e"/><path d="M370 398q-18 6 -10 -10" stroke="#6a994e" stroke-width="7" fill="none"/><circle cx="472" cy="396" r="9" fill="#6a994e"/>` +
      diff(...around(380, 360, 460, 388, 30),
        `<path d="M384 386L392 366L400 386ZM402 384L412 360L422 384ZM424 384L434 362L444 384ZM444 386L452 368L460 386Z" fill="#e9c46a"/>`,
        `<path d="M384 386L392 366L400 386ZM402 384L412 360L422 384ZM424 384L434 362L444 384ZM444 386L452 368L460 386Z" fill="#e63946"/>`) +
      // The display case and its ammonite, moved
      `<rect x="40" y="560" width="160" height="70" fill="#bde3f2" fill-opacity="0.6" stroke="#adb5bd" stroke-width="4"/><path d="M50 630V670M190 630V670" stroke="#5c677d" stroke-width="5"/><ellipse cx="120" cy="616" rx="70" ry="6" fill="#c9b48e"/>` +
      diff(...around(62, 582, 178, 618, 30), ammonite(80, 600), ammonite(160, 600)) +
      // The nest's eggs, the velvet rope
      `<ellipse cx="380" cy="664" rx="50" ry="14" fill="#a0703f"/><ellipse cx="360" cy="646" rx="10" ry="13" fill="#f4f1e8"/><ellipse cx="382" cy="642" rx="10" ry="13" fill="#e9c46a"/>` +
      diff(...around(394, 631, 414, 657, 30), `<ellipse cx="404" cy="644" rx="10" ry="13" fill="#f4f1e8"/>`, '') +
      `<path d="M342 664H418" stroke="#8a5a33" stroke-width="5"/>` +
      `<path d="M220 720V662M320 720V662" stroke="#c9953f" stroke-width="6"/><circle cx="220" cy="660" r="6" fill="#c9953f"/><circle cx="320" cy="660" r="6" fill="#c9953f"/>` +
      diff(...around(220, 664, 320, 690, 30), `<path d="M220 664Q270 696 320 664" stroke="#e63946" stroke-width="6" fill="none"/>`, `<path d="M220 664Q270 696 320 664" stroke="#3a86ff" stroke-width="6" fill="none"/>`) +
      // Decor: the same in both pictures
      wallClock(250, 100, 24, '#6b4226') +
      big(470, 560, 0.5, pottedPlant(0, 0, '#e07a5f')) +
      person(460, 730, '#ffd23f', true) +
      `<path d="M60 700l10 -6l10 6M100 716l10 -6l10 6M140 700l10 -6l10 6" stroke="#8a7a66" stroke-width="3" fill="none"/>` +
      `<rect x="180" y="150" width="40" height="60" rx="4" fill="#e9c46a"/><path d="M188 166h24M188 178h24M188 190h16" stroke="#8a6a44" stroke-width="3"/>`
    )
  },
})
