# Keen Eye

Mobile "spot the difference" game for Android/iOS: two similar flat-cartoon SVG scenes, find all differences.
Fully offline, no ads, no analytics. Full spec: `docs/SPEC.md` (stages of development — section 16).

## Stack

Vue 3 (Composition API, `<script setup>`) + TypeScript + Vite, Vue Router (HTML5 history, no `#`), Pinia, vue-i18n
(Composition API, `legacy: false`), Capacitor (`capacitor.config.ts`; android/ios platforms not added yet).

## Commands

- `npm run dev` — dev server at http://localhost:3000 (develop and test in the browser)
- `npm run build` — type check (`vue-tsc -b`) + production build into `dist/`
- `npm run check-levels` — level validator (`scripts/check-levels.ts`, runs on Node's built-in TS type stripping)
- `npm run typecheck` — type check only

## Layout

- `src/engine/` — game scene, plain TS: `types.ts` (Level format), `rules.ts` (hit test, stars, anti-spam),
  `animation.ts` (poses of animated objects at time t; DOM-free, also used by the validator),
  `render.ts` (SVG pictures and marks), `zoom.ts` (`Viewport`: shared zoom/pan of both pictures via `viewBox`),
  `gestures.ts` (tap, double tap, pan, pinch, wheel), `scene.ts` (`GameScene`: wires it together, timer, events)
- `src/levels/` — `chapter-NN/level-NNN.ts`, registered in `levels/index.ts`; `helpers.ts` (`svgLevel`, `diff`, `rng`),
  `shapes.ts` (shared drawing helpers)
- `src/views/` — screens; `src/router/`, `src/stores/` (Pinia), `src/i18n/` (`ru.json`, `en.json`, `hy.json`),
  `src/services/` (storage, purchases, haptics, audio)
- `scripts/` — tooling; `assets/` — photo levels, icons, sounds

## Rules

- **The game scene lives in `src/engine` as plain TypeScript without Vue reactivity.** It owns the DOM inside its
  container, runs on `requestAnimationFrame` and reports to Vue only through `SceneHandlers` callbacks
  (`onFound`, `onMiss`, `onLock`, `onTick`, `onZoom`, `onComplete`); settings come in via `SceneOptions`
  (e.g. `animationSpeed`). Never import Vue in `src/engine`, never pass refs/reactive
  objects into it, and never let Vue render children into the engine container.
- **Level format** — `Level` / `Difference` in `src/engine/types.ts` (spec, section 8): `id`, `chapter`, `title`,
  `kind: 'svg' | 'image'`, `build(variant)` (0 = A, 1 = B) → `{ svg, animations }` or `imageA`/`imageB`,
  `viewBox` (default 800×500), `differences: { x, y, r, animatedId? }[]` in viewBox coordinates, `parTimeSec`.
- SVG levels are written with `svgLevel({ ..., scene: ({ diff, anim, rand }) => markup })`. `diff(x, y, r, a, b)`
  returns `a` for picture A and `b` for B and registers the zone — never list zones by hand. Everything `a`/`b` draw
  must fit inside the zone circle. Use only the provided `rand` (seeded by level id) for randomness, so A and B match
  everywhere except the differences.
- Living scenes: `anim(spec, markup)` animates markup drawn at its rest position (types `path`, `bob`, `sway`,
  `rotate`, `blink`, `color`; `period`, `phase`, `reverse` — see `AnimationMotion` in `engine/types.ts`). Both
  pictures share one clock, so identical specs stay in sync. A motion difference passes different specs as `a`/`b`;
  when the object moves, give it an `id` and pass that id as `diff`'s 6th argument so the zone follows the object
  separately in each picture. The scene is static at animation time 0 = rest position of the zones.
- Motion differences appear from about level 11 (spec, section 4); level 4 is a temporary demo of all types.
- Difference count by level: 1–15 → 5, 16–50 → 6–8, 51–100 → 8–12. Zones must not overlap. Run
  `npm run check-levels` after touching levels.
- `chapter` and `title` are i18n keys (`chapters.<chapter>`, `levelTitles.<title>`); all UI text goes through vue-i18n.
- Level modules and everything they import must stay free of browser/Vue APIs (the validator runs them in Node),
  and TS imports use explicit `.ts` extensions.
- Code, identifiers and commits in English.
