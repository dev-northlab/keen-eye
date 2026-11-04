import { bench, lampHead, lampPost } from '../chapter-02/shapes.ts'
import { bird, bush, pine, rabbit } from '../chapter-03/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { birds, logPile, pineSnow, sled, small, snowCap, snowman, winterPerson, winterSky } from '../time/shapes.ts'
import { around, big, snowballs } from './shapes.ts'
import { cloud } from '../shapes.ts'

/** Hot chocolate stand; (x, y) = ground center. The roof is `standRoof`. Bounds: x ±65, y from −100 to 0. */
const stand = (x: number, y: number) =>
  `<rect x="${x - 65}" y="${y - 100}" width="130" height="100" fill="#a0703f"/><rect x="${x - 50}" y="${y - 86}" width="100" height="36" rx="4" fill="#3d2a20"/>` +
  `<rect x="${x - 70}" y="${y - 50}" width="140" height="10" fill="#6b4226"/>` +
  `<g fill="#ffffff"><rect x="${x - 40}" y="${y - 64}" width="14" height="14" rx="2"/><rect x="${x - 14}" y="${y - 64}" width="14" height="14" rx="2"/><rect x="${x + 12}" y="${y - 64}" width="14" height="14" rx="2"/></g>`

/** Striped roof of the stand, its ridge at (x, y). Bounds: x ±75, y from 0 to +44. */
const standRoof = (x: number, y: number, color: string) =>
  `<path d="M${x - 75} ${y + 44}L${x} ${y}L${x + 75} ${y + 44}Z" fill="${color}"/>` +
  `<path d="M${x - 40} ${y + 44}L${x - 12} ${y + 7}M${x + 40} ${y + 44}L${x + 12} ${y + 7}" stroke="#ffffff" stroke-width="8"/>`

export default memoryLevel({
  id: 325,
  title: 'memoryIceRink',
  showSeconds: 4,
  scene: ({ diff }) =>
    winterSky(280) +
    `<path d="M0 270Q200 230 400 262T800 250V500H0Z" fill="#f4f8fb"/>` +
    pine(40, 280, 1.2) +
    pineSnow(40, 280, 1.2) +
    pine(130, 270, 1) +
    pineSnow(130, 270, 1) +
    pine(690, 260, 1.1) +
    pineSnow(690, 260, 1.1) +
    pine(770, 270, 1.3) +
    pineSnow(770, 270, 1.3) +
    // Rink
    `<ellipse cx="400" cy="385" rx="240" ry="65" fill="#cfe9f7" stroke="#8fb3d9" stroke-width="6"/>` +
    `<path d="M260 400q60 -30 120 0M420 360q60 -24 120 6" stroke="#ffffff" stroke-width="3" fill="none"/>` +
    big(300, 430, 1.6, winterPerson(0, 0, diff(...around(276, 353, 324, 404), '#e63946', '#3a86ff'))) +
    diff(...around(396, 285, 444, 400), big(420, 400, 1.6, winterPerson(0, 0, '#3fa46f', false, '#ffd23f')), '') +
    big(540, 430, 1.6, winterPerson(0, 0, '#ffb703', true, '#3a86ff')) +
    diff(...around(36, 361, 104, 470), big(70, 470, 1.3, snowman(0, 0, '#e63946')), big(70, 470, 1.3, snowman(0, 0, '#8338ec'))) +
    big(190, 330, 1.3, lampPost(0, 0) + lampHead(0, 0)) +
    diff(...around(172, 162, 208, 184, 30), '', big(190, 184, 1.6, bird(0, 0, '#e63946'))) +
    big(610, 330, 1.3, lampPost(0, 0) + lampHead(0, 0)) +
    diff(...around(152, 418, 248, 466), big(200, 466, 1.6, bench(0, 0)), '') +
    stand(715, 400) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(80, 50, 0.5) +
    cloud(400, 60, 0.6) +
    cloud(560, 40, 0.4) +
    birds(500, 150) +
    bird(610, 155, '#3a86ff') +
    rabbit(30, 300, false, '#f4f4f4') +
    bush(240, 260, 0.7) +
    snowCap(226, 244, 28) +
    pine(280, 290, 0.6) +
    pineSnow(280, 290, 0.6) +
    pine(560, 280, 0.7) +
    pineSnow(560, 280, 0.7) +
    small(360, 495, winterPerson(360, 495, '#ff6b8b')) +
    sled(450, 490, '#3a86ff') +
    snowballs(540, 495, 2) +
    logPile(620, 490) +
    snowCap(605, 458, 30) +
    small(680, 490, winterPerson(680, 490, '#3fa46f', true)) +
    pine(770, 480, 0.6) +
    pineSnow(770, 480, 0.6) +
    diff(...around(640, 256, 790, 300), standRoof(715, 256, '#e63946'), standRoof(715, 256, '#3fa46f')),
})
