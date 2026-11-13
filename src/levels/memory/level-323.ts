import { memoryLevel } from '../helpers.ts'
import { level323Redesign } from './level-323-redesign.ts'
import { cloud, hayBale, hen } from '../shapes.ts'
import { barrel, bird, birds, bucket, crate, pot, sack } from '../time/shapes.ts'
import { around, big, daySky } from './shapes.ts'

/** Tower from x0 to x1 standing on y = 330 with a cone roof (apex 60 above its top at y0). */
const tower = (x0: number, x1: number, y0: number, roof: string) =>
  `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${330 - y0}" fill="#a8a194"/>` +
  `<rect x="${(x0 + x1) / 2 - 6}" y="${y0 + 50}" width="12" height="30" rx="6" fill="#3d3d3d"/><rect x="${(x0 + x1) / 2 - 6}" y="${y0 + 130}" width="12" height="30" rx="6" fill="#3d3d3d"/>` +
  `<path d="M${x0 - 10} ${y0 + 2}L${(x0 + x1) / 2} ${y0 - 60}L${x1 + 10} ${y0 + 2}Z" fill="${roof}"/>` +
  `<rect x="${(x0 + x1) / 2 - 2}" y="${y0 - 90}" width="4" height="32" fill="#5c677d"/>`

/** Pennant on a tower pole whose top is (x, y). Bounds: x … x + 36, y … y + 24. */
const pennant = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y + 2}h34l-8 11l8 11h-34Z" fill="${color}"/>`

/** Hanging banner; (x, 190) = middle of its top. Bounds: x ±25, y from 190 to 280. */
const banner = (x: number, color: string) =>
  `<path d="M${x - 25} 190h50v90l-25 -16l-25 16Z" fill="${color}"/><circle cx="${x}" cy="225" r="11" fill="#ffd23f"/>`

/** Wall torch; (x, y) = bracket. Bounds: x ±8, y from −30 to +20. */
const torch = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 6}" width="6" height="26" fill="#6b4226"/><path d="M${x} ${y - 30}q10 12 0 22q-10 -10 0 -22Z" fill="#ff9f1c"/>`

/** Hay cart; (x, y) = ground under the middle. Bounds: x ±45, y from −66 to 0. */
const cart = (x: number, y: number) =>
  `<g fill="#f2c14e"><ellipse cx="${x - 22}" cy="${y - 54}" rx="22" ry="12"/><ellipse cx="${x + 4}" cy="${y - 56}" rx="24" ry="10"/><ellipse cx="${x + 26}" cy="${y - 52}" rx="19" ry="10"/></g>` +
  `<rect x="${x - 45}" y="${y - 52}" width="90" height="32" rx="4" fill="#a0703f"/><path d="M${x - 45} ${y - 36}h90" stroke="#6b4226" stroke-width="3"/>` +
  `<circle cx="${x - 22}" cy="${y - 16}" r="16" fill="#6b4226"/><circle cx="${x - 22}" cy="${y - 16}" r="5" fill="#d9c9a3"/>` +
  `<circle cx="${x + 24}" cy="${y - 16}" r="16" fill="#6b4226"/><circle cx="${x + 24}" cy="${y - 16}" r="5" fill="#d9c9a3"/>`

/** Shield with a cross; (x, y) = top center. Bounds: x ±24, y from 0 to +56. */
const shield = (x: number, y: number, color: string) =>
  `<path d="M${x - 24} ${y}h48v24q0 22 -24 32q-24 -10 -24 -32Z" fill="${color}"/><path d="M${x} ${y + 6}v42M${x - 16} ${y + 22}h32" stroke="#ffffff" stroke-width="6"/>`

export default memoryLevel({
  id: 323,
  title: 'memoryCastle',
  showSeconds: 4,
  redesign: level323Redesign,
  scene: ({ diff }) =>
    daySky(340) +
    big(250, 55, 0.9, cloud(0, 0)) +
    big(330, 128, 0.5, cloud(0, 0)) +
    // Wall with battlements
    `<rect y="170" width="500" height="160" fill="#b9b3a6"/>` +
    Array.from({ length: 13 }, (_, i) => `<rect x="${i * 40 + 8}" y="150" width="24" height="22" fill="#b9b3a6"/>`).join('') +
    `<path d="M0 210H500M0 250H500M0 290H500" stroke="#9c968a" stroke-width="2"/>` +
    tower(10, 130, 110, '#5b4bd6') +
    pennant(70, 20, '#e63946') +
    tower(370, 490, 110, '#5b4bd6') +
    pennant(430, 20, '#e63946') +
    // Gate with a shield over it
    `<path d="M190 330V250Q250 190 310 250V330Z" fill="#6b4226"/><path d="M210 230V330M230 216V330M250 212V330M270 216V330M290 230V330M190 270H310M190 300H310" stroke="#3d2a20" stroke-width="4"/>` +
    diff(...around(226, 166, 274, 222), shield(250, 166, '#3a86ff'), shield(250, 166, '#e63946')) +
    banner(160, '#8338ec') +
    diff(...around(315, 190, 365, 280), banner(340, '#8338ec'), '') +
    torch(30, 230) +
    torch(110, 230) +
    // Courtyard
    `<rect y="330" width="500" height="420" fill="#d9c9a3"/>` +
    `<path d="M0 390H500M0 450H500M0 510H500M0 570H500M0 630H500M0 690H500` +
    `M60 330V390M260 330V390M440 330V390M160 390V450M360 390V450M60 450V510M260 450V510M440 450V510M160 510V570M360 510V570` +
    `M60 570V630M260 570V630M440 570V630M160 630V690M360 630V690M60 690V750M260 690V750M440 690V750" stroke="#c4b48d" stroke-width="3"/>` +
    // Well
    `<path d="M100 440V390M180 440V390" stroke="#6b4226" stroke-width="8"/><path d="M80 387L140 355L200 387Z" fill="#a0703f"/><path d="M100 390H180" stroke="#6b4226" stroke-width="5"/>` +
    `<rect x="90" y="440" width="100" height="60" fill="#8d99ae"/><path d="M90 460h100M90 480h100M120 440v20M160 460v20M130 480v20" stroke="#6b7685" stroke-width="2.5"/><ellipse cx="140" cy="440" rx="52" ry="10" fill="#6b7685"/>` +
    diff(...around(126, 390, 154, 450, 30), '', `<path d="M140 392V426" stroke="#6b766f" stroke-width="2"/><path d="M130 426h20l-3 20h-14Z" fill="#5c677d"/>`) +
    diff(...around(205, 454, 345, 520), cart(250, 520), cart(300, 520)) +
    // Decor: small things that fill the scene, the same in both pictures
    big(160, 30, 0.4, cloud(0, 0)) +
    birds(255, 120) +
    bird(180, 150, '#3a86ff') +
    bird(320, 150, '#e63946') +
    torch(450, 230) +
    shield(160, 286, '#3fa46f') +
    banner(430, '#3a86ff') +
    crate(30, 525, 30) +
    pot(40, 400) +
    sack(30, 605) +
    hen(100, 640) +
    bucket(230, 740) +
    crate(470, 380, 30) +
    hayBale(450, 470) +
    big(390, 720, 1.6, barrel(0, 0)) +
    big(435, 720, 1.6, barrel(0, 0)) +
    diff(...around(367, 612, 458, 720), big(412, 666, 1.6, barrel(0, 0)), ''),
})
