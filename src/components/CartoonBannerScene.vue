<script setup lang="ts">
// The "Cartoons" banner's live picture (LevelMapView, in PhotoBanner's `picture` slot): a 6 s cartoon of its own drawn
// with the cartoons' characters (levels/cartoon/shapes.ts) — the cat sneaks to the pond, a fish jumps, the cat leaps,
// splashes in and climbs back out. Moved by CSS animations (no frame loop on the menu screen); the interface always
// moves.
import { appleTree, apple, cat, fish, grassTuft, groundShadow, lilyPad, NATURE_DEFS, O, Ow, puffCloud } from '../levels/cartoon/shapes.ts'

/** The cat stands on the bank at (CAT_X, CAT_Y), drawn at CAT_SCALE of its level size. */
const CAT_X = 178
const CAT_Y = 92
const CAT_SCALE = 0.68
const POND = { cx: 240, cy: 100, rx: 40, ry: 11 }

const markup =
  `<defs>${NATURE_DEFS}` +
  `<linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb4ec"/><stop offset="1" stop-color="#e3f5ff"/></linearGradient>` +
  `<linearGradient id="cb-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ad874"/><stop offset="1" stop-color="#4f9a3c"/></linearGradient>` +
  `<radialGradient id="cb-water" cx="0.62" cy="0.3" r="0.8"><stop offset="0" stop-color="#9fe0f5"/><stop offset="0.5" stop-color="#58b8e0"/><stop offset="1" stop-color="#2b7fb0"/></radialGradient>` +
  `<radialGradient id="cb-glow"><stop offset="0" stop-color="#fff6c9" stop-opacity="0.9"/><stop offset="1" stop-color="#fff2b0" stop-opacity="0"/></radialGradient></defs>` +
  `<rect width="280" height="112" fill="url(#cb-sky)"/>` +
  `<circle cx="252" cy="20" r="44" fill="url(#cb-glow)"/>` +
  `<g class="rays"><path d="M252 3v-4M252 41v-4M235 20h-4M273 20h-4M240 8l-3-3M267 35l-3-3M240 32l-3 3M267 5l-3 3" stroke="#ffd23f" stroke-width="2.4" stroke-linecap="round"/></g>` +
  `<circle cx="252" cy="20" r="11" fill="#ffd23f" stroke="#f2a93b" stroke-width="1.4"/>` +
  `<path d="M247 18.5v2M257 18.5v2" stroke="#3d2b1f" stroke-width="1.6" stroke-linecap="round"/><path d="M247.5 24q4.5 3.5 9 0" fill="none" stroke="#3d2b1f" stroke-width="1.3" stroke-linecap="round"/>` +
  `<g class="cloud c1">${puffCloud(150, 22, 0.32)}</g><g class="cloud c2">${puffCloud(205, 40, 0.22)}</g>` +
  `<path d="M0 74q50-22 110-8t100-6t70 2V112H0z" fill="#b5e09a"/>` +
  `<rect y="78" width="280" height="34" fill="url(#cb-grass)"/>` +
  `<g class="tree">${appleTree(128, 94, 0.3, (_p, m) => m)}</g>` +
  apple(112, 93, 2.6) +
  grassTuft(160, 106) +
  grassTuft(272, 108) +
  // The pond, its far half behind the cat.
  `<ellipse cx="${POND.cx}" cy="${POND.cy + 1}" rx="${POND.rx + 4}" ry="${POND.ry + 3}" fill="#4f8f3c"/>` +
  `<ellipse cx="${POND.cx}" cy="${POND.cy}" rx="${POND.rx}" ry="${POND.ry}" fill="url(#cb-water)" ${Ow(1.4)}/>` +
  `<g class="fish">${fish(246, 101, 0.75)}</g>` +
  `<g class="alert"><path d="M${CAT_X + 16} 30h6l-1.8 13h-2.4z" fill="#e63946" ${Ow(1.2)}/><circle cx="${CAT_X + 19}" cy="47" r="2.4" fill="#e63946" ${Ow(1)}/></g>` +
  `<g class="shadow">${groundShadow(CAT_X + 1, CAT_Y + 0.5, 32, 5)}</g>` +
  `<g class="cat"><g class="pose"><g transform="translate(${CAT_X} ${CAT_Y}) scale(${CAT_SCALE})">` +
  cat(0, 0, null, (_k, _p, m) => m, '', (m) => `<g class="blink">${m}</g>`, (m) => `<g class="tail">${m}</g>`) +
  `</g></g></g>` +
  // The near half of the water, in front of the cat: in the pond only its head shows.
  `<path d="M${POND.cx - POND.rx} ${POND.cy}a${POND.rx} ${POND.ry} 0 0 0 ${2 * POND.rx} 0z" fill="url(#cb-water)"/>` +
  `<path d="M${POND.cx - POND.rx} ${POND.cy}a${POND.rx} ${POND.ry} 0 0 0 ${2 * POND.rx} 0" fill="none" stroke="#3d2b1f" stroke-width="1.4"/>` +
  `<path d="M222 104q8 2 16 0M248 107q8 2 14 0" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="1.2" stroke-linecap="round"/>` +
  lilyPad(266, 103, 0.45) +
  `<g class="splash"><path d="M214 101q5-14 10-2q4-18 10-1q6-16 10 1q5-12 10 2z" fill="#bfeaff" ${Ow(1)}/></g>` +
  `<g class="ring"><ellipse cx="230" cy="102" rx="10" ry="2.6" fill="none" stroke="#fff" stroke-width="1.2"/></g>` +
  // Cattails at the pond's near end.
  `<g class="reeds"><path d="M276 102q-1-12 1-22M272 104q0-10 3-18" fill="none" stroke="#4f7a2a" stroke-width="1.3" stroke-linecap="round"/>` +
  `<rect x="275.6" y="77" width="3" height="8" rx="1.5" fill="#7a4a22" ${Ow(0.6)}/><rect x="273.6" y="83" width="3" height="7" rx="1.5" fill="#7a4a22" ${Ow(0.6)}/></g>` +
  `<path d="M0 112h280" ${O}/>`
</script>

<template>
  <svg class="cartoon-scene" viewBox="0 0 280 112" aria-hidden="true" v-html="markup" />
</template>

<style scoped>
/* One 6 s story; every part keyed to the same clock. Transforms are in the scene's units (transform-box: view-box). */
.cartoon-scene :deep(g) {
  transform-box: view-box;
}

.cartoon-scene :deep(.cat) {
  transform-origin: 178px 75px;
  animation: cat-story 6s ease-in-out infinite;
}

.cartoon-scene :deep(.pose) {
  transform-origin: 178px 92px;
  animation: cat-crouch 6s ease-in-out infinite;
}

.cartoon-scene :deep(.tail) {
  transform-origin: -26px -25px;
  animation: tail 1.4s ease-in-out infinite alternate;
}

.cartoon-scene :deep(.blink) {
  animation: blink 3.2s steps(1) infinite;
}

.cartoon-scene :deep(.shadow) {
  transform-origin: 179px 92px;
  animation: cat-shadow 6s ease-in-out infinite;
}

.cartoon-scene :deep(.fish) {
  transform-origin: 246px 101px;
  animation: fish-jump 6s ease-in-out infinite;
}

.cartoon-scene :deep(.alert) {
  transform-origin: 197px 45px;
  animation: alert 6s ease-out infinite;
}

.cartoon-scene :deep(.splash) {
  transform-origin: 230px 101px;
  animation: splash 6s ease-out infinite;
}

.cartoon-scene :deep(.ring) {
  transform-origin: 230px 102px;
  animation: ring 6s ease-out infinite;
}

.cartoon-scene :deep(.rays) {
  transform-origin: 252px 20px;
  animation: spin 24s linear infinite;
}

.cartoon-scene :deep(.reeds) {
  transform-origin: 275px 102px;
  animation: sway 2.6s ease-in-out infinite alternate;
}

.cartoon-scene :deep(.tree) {
  transform-origin: 128px 60px;
  animation: sway-small 4s ease-in-out infinite alternate;
}

.cartoon-scene :deep(.c1) {
  animation: drift 14s ease-in-out infinite alternate;
}

.cartoon-scene :deep(.c2) {
  animation: drift 10s ease-in-out infinite alternate-reverse;
}

/* Sits, creeps, leaps (too short), splashes in, bobs, climbs back out. */
@keyframes cat-story {
  0%,
  26% {
    transform: translate(0, 0) rotate(0);
  }
  40% {
    transform: translate(6px, 0) rotate(0);
  }
  47% {
    transform: translate(26px, -26px) rotate(-12deg);
  }
  55% {
    transform: translate(52px, 16px) rotate(8deg);
  }
  59% {
    transform: translate(52px, 16px) rotate(0);
  }
  66% {
    transform: translate(52px, 13px) rotate(0);
  }
  73% {
    transform: translate(52px, 17px) rotate(0);
  }
  80% {
    transform: translate(52px, 14px) rotate(0);
  }
  90% {
    transform: translate(8px, 0) rotate(0);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes cat-crouch {
  0%,
  28% {
    transform: scale(1, 1);
  }
  38% {
    transform: scale(1, 0.84);
  }
  42% {
    transform: scale(1, 1.1);
  }
  48%,
  100% {
    transform: scale(1, 1);
  }
}

/* The shadow stays on the grass: it fades as the cat leaves the bank and comes back with it. */
@keyframes cat-shadow {
  0%,
  40% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  47% {
    transform: translate(28px, 0) scale(0.6);
    opacity: 0.5;
  }
  52%,
  84% {
    transform: translate(40px, 0) scale(0.4);
    opacity: 0;
  }
  90% {
    transform: translate(8px, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}

@keyframes fish-jump {
  0%,
  39% {
    transform: translate(0, 0) rotate(-50deg);
    opacity: 0;
  }
  40% {
    transform: translate(0, 0) rotate(-50deg);
    opacity: 1;
  }
  48% {
    transform: translate(10px, -34px) rotate(0);
    opacity: 1;
  }
  56% {
    transform: translate(22px, 0) rotate(50deg);
    opacity: 1;
  }
  57%,
  100% {
    transform: translate(22px, 0) rotate(50deg);
    opacity: 0;
  }
}

@keyframes alert {
  0%,
  31% {
    transform: scale(0.1);
    opacity: 0;
  }
  34% {
    transform: scale(1.2);
    opacity: 1;
  }
  36%,
  40% {
    transform: scale(1);
    opacity: 1;
  }
  43%,
  100% {
    transform: scale(0.1);
    opacity: 0;
  }
}

@keyframes splash {
  0%,
  54% {
    transform: scale(0.3);
    opacity: 0;
  }
  57% {
    transform: scale(1);
    opacity: 1;
  }
  67%,
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes ring {
  0%,
  56% {
    transform: scale(0.3);
    opacity: 0;
  }
  58% {
    transform: scale(0.5);
    opacity: 0.9;
  }
  78%,
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

@keyframes tail {
  to {
    transform: rotate(12deg);
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  94% {
    opacity: 1;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes sway {
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(5deg);
  }
}

@keyframes sway-small {
  from {
    transform: rotate(-1.5deg);
  }
  to {
    transform: rotate(1.5deg);
  }
}

@keyframes drift {
  to {
    transform: translateX(26px);
  }
}
</style>
