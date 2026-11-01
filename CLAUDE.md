# Keen Eye

Mobile "spot the difference" game for Android/iOS: two similar flat-cartoon SVG scenes, find all differences.
Fully offline, no ads, no analytics. Full spec: `docs/SPEC.md` (stages of development — section 16).

## Stack

Vue 3 (Composition API, `<script setup>`) + TypeScript + Vite, Vue Router (HTML5 history, no `#`), Pinia, vue-i18n
(Composition API, `legacy: false`), Capacitor (`capacitor.config.ts`; android/ios platforms not added yet).

## Commands

- `npm run dev` — dev server at http://localhost:3000 (develop and test in the browser)
- `npm run build` — type check (`vue-tsc -b`) + production build into `dist/`
- `npm run check-levels` — level validator (`scripts/check-levels.ts`, Node's built-in TS type stripping): renders A and B
  with resvg at several animation moments and checks that they differ only inside the zones and that every zone shows
  a difference; plus zone overlap/bounds over time, difference counts, motion difference counts, determinism
- `npm run preview-levels [-- <id> ...]` — `previews/level-NNN.png`: A | B with the zones outlined (gitignored)
- `npm run typecheck` — type check only

## Layout

- `src/engine/` — game scene, plain TS: `types.ts` (Level format), `rules.ts` (hit test, stars, anti-spam),
  `animation.ts` (poses of animated objects at time t; DOM-free, also used by the validator),
  `render.ts` (SVG pictures and marks), `zoom.ts` (`Viewport`: shared zoom/pan of both pictures via `viewBox`),
  `gestures.ts` (tap, double tap, pan, pinch, wheel), `scene.ts` (`GameScene`: wires it together, timer, events)
- `src/levels/` — `chapter-NN/level-NNN.ts`, registered in `levels/index.ts`; `helpers.ts` (`svgLevel`, `diff`, `rng`),
  `shapes.ts` (shared drawing helpers: animals, trees, buildings, props — reuse before drawing a new one)
- `src/views/` — screens: Home, LevelMap, Level, Settings; `src/components/` — dialogs (pause, result), stars, header
- `src/stores/` — Pinia: `progress` (best stars/time per level, sequential unlocking, hint pool), `settings`
  (mode normal/calm, music and sound volume 0–1, vibration, language, reduce motion; written directly, auto-saved, pushed to
  i18n and services by a `watchSyncEffect`); both are loaded in `main.ts` before the router starts
- `src/services/` — `storage.ts` (JSON over Capacitor Preferences; localStorage in the browser, key prefix
  `CapacitorStorage.`), `audio.ts` (music tracks from `assets/music/` per screen + Web Audio synthesized effects;
  starts on the first user gesture, silent in the background), `haptics.ts` (@capacitor/haptics)
- `src/router/` — routes; a global guard sends unknown levels home and locked levels to the map
- `src/i18n/` — `ru.json`, `en.json`, `hy.json` (keep the same keys in all three); default language = system
- `scripts/` — `check-levels.ts`, `preview-levels.ts`, `render.ts` (posed SVG → pixels, shared by both);
  `assets/` — music (`assets/music/`), later photo levels and icons

## Rules

- **The game scene lives in `src/engine` as plain TypeScript without Vue reactivity.** It owns the DOM inside its
  container, runs on `requestAnimationFrame` and reports to Vue only through `SceneHandlers` callbacks
  (`onFound`, `onMiss`, `onLock`, `onTick`, `onZoom`, `onHint`, `onComplete`); settings come in via
  `SceneOptions` (`animationSpeed`, `missLock`). Sounds and vibration are triggered by the Vue side from these
  callbacks, not by the engine. Never import Vue in `src/engine`, never pass refs/reactive
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
- `svgLevel` marks a difference `motion: true` when `a` and `b` draw the same markup and differ only in animation.
  Motion differences (spec, section 4): none on levels 1–10, exactly 1 on 11–15, 1–3 later.
- Chapter 1 "farm" = levels 1–15 (5 large differences each, zone r ≥ 24). Add a level: new `chapter-NN/level-NNN.ts`,
  register it in `levels/index.ts`, add `levelTitles.<title>` to all three locales, run `check-levels` and look at
  the preview.
- Difference count by level: 1–15 → 5, 16–50 → 6–8, 51–100 → 8–12. Zones must not overlap. Run
  `npm run check-levels` after touching levels.
- Stored data is untrusted: validate its shape when loading (see `parseLevels` in `stores/progress.ts`).
- Calm mode (spec, section 6): no timer/mistakes/lock/stars, unlimited hints, slower animation, soft sounds,
  "stop motion" button; completion is stored with `stars: 0`. The mode is read when a level starts.
- Hints: shared pool (start 5, +1 for the first 3-star finish of a level); `GameScene.hint()` returns false
  when nothing can be hinted, so a hint is only spent when it is shown.
- Development-only tools (Settings → "Unlock all levels", "Reset progress") are behind `import.meta.env.DEV`.
- `chapter` and `title` are i18n keys (`chapters.<chapter>`, `levelTitles.<title>`); all UI text goes through vue-i18n.
- Level modules and everything they import must stay free of browser/Vue APIs (the validator runs them in Node),
  and TS imports use explicit `.ts` extensions.
- Code, identifiers and commits in English.
