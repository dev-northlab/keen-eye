import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
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
  scene: ({ diff, extra, anim }) =>
    daySky(340) +
    big(300, 70, 0.9, cloud(0, 0)) +
    big(520, 100, 0.7, cloud(0, 0)) +
    // Wall with battlements
    `<rect y="170" width="800" height="160" fill="#b9b3a6"/>` +
    Array.from({ length: 20 }, (_, i) => `<rect x="${i * 40 + 8}" y="150" width="24" height="22" fill="#b9b3a6"/>`).join('') +
    `<path d="M0 210H800M0 250H800M0 290H800" stroke="#9c968a" stroke-width="2"/>` +
    tower(60, 180, 110, '#5b4bd6') +
    diff(...around(118, 18, 158, 48, 30), pennant(120, 20, '#e63946'), pennant(120, 20, '#ffd23f')) +
    tower(620, 740, 110, '#5b4bd6') +
    pennant(680, 20, '#e63946') +
    // Gate with a shield over it
    `<path d="M340 330V250Q400 190 460 250V330Z" fill="#6b4226"/><path d="M360 230V330M380 216V330M400 212V330M420 216V330M440 230V330M340 270H460M340 300H460" stroke="#3d2a20" stroke-width="4"/>` +
    diff(...around(376, 166, 424, 222), shield(400, 166, '#3a86ff'), shield(400, 166, '#e63946')) +
    banner(250, '#8338ec') +
    diff(...around(525, 190, 575, 280), banner(550, '#8338ec'), '') +
    torch(300, 220) +
    torch(480, 220) +
    // Courtyard
    `<rect y="330" width="800" height="170" fill="#d9c9a3"/><path d="M0 380H800M0 440H800M120 330V380M300 330V380M520 330V380M700 330V380M60 380V440M250 380V440M460 380V440M650 380V440" stroke="#c4b48d" stroke-width="3"/>` +
    // Well
    `<path d="M160 400V350M240 400V350" stroke="#6b4226" stroke-width="8"/><path d="M140 347L200 315L260 347Z" fill="#a0703f"/><path d="M160 350H240" stroke="#6b4226" stroke-width="5"/>` +
    `<rect x="150" y="400" width="100" height="60" fill="#8d99ae"/><path d="M150 420h100M150 440h100M180 400v20M220 420v20M190 440v20" stroke="#6b7685" stroke-width="2.5"/><ellipse cx="200" cy="400" rx="52" ry="10" fill="#6b7685"/>` +
    diff(...around(186, 350, 214, 410, 30), '', `<path d="M200 352V386" stroke="#6b766f" stroke-width="2"/><path d="M190 386h20l-3 20h-14Z" fill="#5c677d"/>`) +
    diff(...around(325, 384, 465, 450), cart(370, 450), cart(420, 450)) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(740, 80, 0.4) +
    birds(450, 60) +
    birds(760, 120) +
    bird(260, 150, '#3a86ff') +
    bird(580, 150, '#e63946') +
    torch(200, 220) +
    shield(300, 262, '#3fa46f') +
    banner(770, '#3a86ff') +
    crate(30, 420, 30) +
    pot(110, 400) +
    sack(30, 480) +
    hen(100, 470) +
    bucket(275, 490) +
    crate(700, 360, 30) +
    hayBale(740, 440) +
    big(560, 470, 1.6, barrel(0, 0)) +
    big(605, 470, 1.6, barrel(0, 0)) +
    diff(...around(537, 362, 628, 470), big(582, 416, 1.6, barrel(0, 0)), '') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['chick', 85, 419],
      ['eggNest', 703, 399],
      ['horseshoe', 286, 375],
      ['cloud', 403, 92],
      ['birds', 608, 56],
    ]),
})
