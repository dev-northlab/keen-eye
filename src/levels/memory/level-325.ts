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
    winterSky(300) +
    `<path d="M0 290Q125 250 250 282T500 270V750H0Z" fill="#f4f8fb"/>` +
    pine(28, 300, 1.2) +
    pineSnow(28, 300, 1.2) +
    pine(190, 290, 1) +
    pineSnow(190, 290, 1) +
    pine(470, 300, 0.7) +
    pineSnow(470, 300, 0.7) +
    // Rink
    `<ellipse cx="250" cy="560" rx="220" ry="80" fill="#cfe9f7" stroke="#8fb3d9" stroke-width="6"/>` +
    `<path d="M110 575q60 -30 120 0M270 535q60 -24 120 6" stroke="#ffffff" stroke-width="3" fill="none"/>` +
    big(150, 600, 1.6, winterPerson(0, 0, diff(...around(126, 523, 174, 574), '#e63946', '#3a86ff'))) +
    diff(...around(236, 455, 284, 570), big(260, 570, 1.6, winterPerson(0, 0, '#3fa46f', false, '#ffd23f')), '') +
    big(370, 600, 1.6, winterPerson(0, 0, '#ffb703', true, '#3a86ff')) +
    big(70, 725, 1.3, snowman(0, 0, '#e63946')) +
    big(110, 440, 1.3, lampPost(0, 0) + lampHead(0, 0)) +
    diff(...around(92, 272, 128, 294, 30), '', big(110, 294, 1.6, bird(0, 0, '#e63946'))) +
    big(485, 480, 1.3, lampPost(0, 0) + lampHead(0, 0)) +
    diff(...around(182, 664, 278, 712), big(230, 712, 1.6, bench(0, 0)), '') +
    stand(400, 420) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(80, 50, 0.5) +
    cloud(300, 60, 0.6) +
    cloud(450, 40, 0.4) +
    birds(330, 170) +
    bird(485, 334, '#3a86ff') +
    rabbit(30, 335, false, '#f4f4f4') +
    bush(265, 305, 0.7) +
    snowCap(251, 289, 28) +
    pine(25, 445, 0.6) +
    pineSnow(25, 445, 0.6) +
    pine(480, 655, 0.6) +
    pineSnow(480, 655, 0.6) +
    small(330, 740, winterPerson(330, 740, '#ff6b8b')) +
    sled(410, 740, '#3a86ff') +
    snowballs(390, 690, 2) +
    logPile(150, 745) +
    snowCap(135, 713, 30) +
    small(470, 745, winterPerson(470, 745, '#3fa46f', true)) +
    diff(...around(325, 276, 475, 320), standRoof(400, 276, '#e63946'), standRoof(400, 276, '#3fa46f')),
})
