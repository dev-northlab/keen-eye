# Keen Eye

Mobile "spot the difference" game for Android/iOS: two similar flat-cartoon SVG scenes, find all differences.
Fully offline, no ads, no analytics. Full spec: `docs/SPEC.md` (stages of development — section 16).

## Stack

Vue 3 (Composition API, `<script setup>`) + TypeScript + Vite, Vue Router (HTML5 history, no `#`), Pinia, vue-i18n
(Composition API, `legacy: false`), Capacitor 8 (`capacitor.config.ts`; `android/` and `ios/` — iOS project uses
Swift Package Manager and is built in the cloud by Codemagic, `codemagic.yaml`).

## Commands

- `npm run dev` — dev server at http://localhost:3000 (develop and test in the browser)
- `npm run build` — type check (`vue-tsc -b`) + production build into `dist/`
- `npm run check-levels [-- <id> ...]` — level validator (`scripts/check-levels.ts`, Node's built-in TS type stripping): renders A and B
  with resvg at several animation moments and checks that they differ only inside the zones and that every zone shows
  a difference; plus zone overlap/bounds over time, difference counts, motion difference counts, determinism; "time"
  levels compare A's differences drawn at B's moment with B, and check that every trap shows a natural change. All levels
  in one run may exceed the memory of a busy machine (killed with code 137) — then check by id in batches
- `npm run preview-levels [-- <id> ...]` — `previews/level-NNN.png`: A | B with the zones outlined (gitignored)
- `npm run typecheck` — type check only
- `npm test` — unit tests (`tests/*.test.ts`, Node's built-in `node:test`, no extra dependencies)
- `npm run icons` — renders the app icon, splash and store icon (Android, iOS, Play, favicon) from the SVG in
  `scripts/make-icons.ts`; the iOS 1024 px icon is written without an alpha channel (App Store requirement)
- `npm run og` — renders `public/og-image.png` (1200×630 link preview of the web version, Open Graph/Twitter tags in
  `index.html`) from the home screen's own meadow (`MeadowScene.vue` via Vite SSR) with the title and play button;
  needs the Roboto font installed
- `npm run ios:sync` — web build + `cap sync ios`. iOS is built and sent to TestFlight by the Codemagic workflow
  `ios-testflight` (manual start; setup steps are at the top of `codemagic.yaml`)
- `npm run android:sync` — web build + `cap sync android`; `npm run android:apk` — also builds the debug APK
  (`android/app/build/outputs/apk/debug/app-debug.apk`). Gradle needs **JDK 21** in `JAVA_HOME` (here:
  `~/.local/share/jdks/jdk-21.0.13+9`; Studio's JDK 25 is too new for Gradle 8.14) and the SDK in `ANDROID_HOME`
  (`~/Android/Sdk`); install with `adb install -r <apk>`. Debug builds allow WebView DevTools (chrome://inspect).

## Layout

- `src/engine/` — game scene, plain TS: `types.ts` (Level format), `rules.ts` (hit test, stars, anti-spam),
  `animation.ts` (poses of animated objects at time t; DOM-free, also used by the validator),
  `render.ts` (SVG pictures and marks), `zoom.ts` (`Viewport`: shared zoom/pan of both pictures via `viewBox`),
  `gestures.ts` (tap, double tap, pan, pinch, wheel; without zoom every finger taps), `board.ts` (`Board`: one pair A|B —
  rendering, poses, zoom, taps → hit/miss, marks; no rules; `flipped` = face-to-face copy turned 180° inside the svg),
  `loop.ts` (pausable rAF loop), `scene.ts` (`GameScene`: single player — board, timer, score, events),
  `hit-test.ts`, `anachronism.ts`, `anachronism-scene.ts` ("find the odd one out", `docs/anachronism-mode.md`: screen →
  percent of the image and hitboxes; level JSON checks and the DOM-free round; `AnachronismScene`, one picture with the
  same zoom, gestures, marks and miss lock), `match.ts` (two-player match engine, DOM-free: state + `dispatch(event) → effects`; tap events
  `{ playerId, picture, x, y, t }` are hit-tested by the engine itself), `match-scene.ts` (`MatchScene`: clock,
  1 shared or 2 face-to-face boards, `Match`; duels have no zoom and count a tap when the finger touches)
- `src/levels/` — `chapter-NN/level-NNN.ts`, registered in `levels/index.ts`; `time-travel/` — "find the odd one out"
  levels as JSON (`mode: "anachronism"`, string ids, percent hitboxes, texts as `{ <locale>: … }` in every interface language — `npm test` checks it), checked by
  `parseAnachronismLevel` in `time-travel/index.ts`, images in `public/levels/time-travel/`; kept out of `levels`
  (no unlock order, no purchase, own `progress.timeTravel` records; a world map card opens the eras, `/time-travel`, a level is `/time-travel/:id`;
  one era per level: Egypt, Rome, Vikings, castle, pirates, Wild West, Stone Age so far, difficulty growing; the picture is inlined
  (`createSvgPicture`) and its background moves: `data-anim` groups in the SVG + `animations` in the JSON, same
  motion types as `anim()`; odd items never move — `npm test` checks it — and neither do characters holding one); `helpers.ts` (`svgLevel`, `diff`, `rng`),
  `shapes.ts` (farm drawing helpers), `chapter-02/shapes.ts` (city helpers: buildings, cars, people, street),
  `chapters.ts` (the chapters/"worlds": id, level id ranges, card colors, icon, backdrop — one entry per world; plus
  `TIME_CHAPTER`), `time/` — "spot the difference in time" (`docs/time-differences-mode.md`): levels 201–215 of chapter
  `time`, the same scene at two moments (`pair`: morning/evening, summer/winter); `svgLevel` gets `pair`, `time(a, b)`
  draws by the picture's moment and `trap(x, y, r, a, b, hint)` marks a natural change (light, snow, leaves) whose tap is
  a miss that shows `timeMode.traps.<hint>` once (`GameScene` → `onTrap`); played by `LevelView`, grid by `ChapterView`
  (`/levels/time`, a banner on the modes screen, not a world), numbered 1–15 (`levelNumber`), open from the start, the
  first `FREE_TIME_LEVELS` (3) free; `allLevels` = worlds + time (`levels` stays the worlds),
  `difficulty.ts` (difference and motion counts, min zone radius and gap, kinds by level range; read by `check-levels`)
- `src/views/` — screens: Home, LevelMap (game mode banners, `/levels`), Worlds (chapter cards, `/worlds`), Chapter (level grid of one chapter, `/levels/:chapter`),
  TimeTravel (eras of "find the odd one out"), AnachronismLevel (one of its levels),
  Level, Settings, Purchase, Duo (two players: mode → players/rules → level, `/duo`), Match (`/duo/:id`); `src/components/` — dialogs (pause, result), level HUD time and mistakes chips (`HudCounters`), fact card of "find the odd one out" (`FactCard`), settings panel (Settings screen and pause menu), screen backdrops (`ScreenBackdrop`, one world per screen; the home meadow is `MeadowScene`, drawn per season chosen with `SeasonSwitch`), day/night theme switch (`ThemeSwitch`), stars, bottom back button (`BackButton`)
- `src/config/links.ts` — store links (`getStoreLink()`: iOS once it has one, else Google Play) and share targets (Facebook, X, LinkedIn, … share pages that post the store link from the player's own account; logos from `simple-icons` as inline SVG, LinkedIn drawn by hand), shown by `ShareLinks`; `src/composables/useShare.ts` — `shareApp` (@capacitor/share; a browser without a share sheet copies the link), `openLink` (@capacitor/browser); About screen `/about` (`AboutView`), `ShareButton` also in the level result dialog
- `src/stores/` — Pinia: `duo` (two-player setup and match history), `progress` (best stars/time per level, sequential unlocking, hint pool), `settings`
  (mode normal/calm, music and sound volume 0–1, vibration, language, reduce motion, home meadow season, light/dark theme; written directly, auto-saved, pushed to
  i18n and services by a `watchSyncEffect`), `purchase` (full game flag cached locally, price; `sync()` refreshes it
  from the store in the background); all are loaded in `main.ts` before the router starts
- `src/services/` — `theme.ts` (applies the theme: `html[data-theme]` + system bar icons), `backButton.ts` (Android back: level → pause → menu, other screens → home, home → exit),
  `storage.ts` (JSON over Capacitor Preferences; localStorage in the browser, key prefix
  `CapacitorStorage.`), `audio.ts` (music tracks from `assets/music/` per screen + Web Audio synthesized effects;
  starts on the first user gesture, silent in the background), `haptics.ts` (@capacitor/haptics), `purchases.ts`
  (the only code that talks to the app store: price, purchase, ownership; currently a dev-only stub — RevenueCat goes
  here; in production builds the stub sells nothing)
- `src/router/` — routes; a global guard sends unknown levels home, paid levels not bought to the purchase screen and
  levels not reached yet to the map
- `src/i18n/` — one `<locale>.json` per language (ru, en, hy, de, fr, es, it, pt, nl, pl, cs, ro, bg, uk, el, hu,
  tr, hi, zh, ja, ko), registered in `index.ts` (keep the same keys in all of them; `en` is the fallback); default
  language = system;
  `languages.ts` — name (in its own language) and SVG flag per locale for the language picker
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
  `viewBox` (default 800×500), `differences: { x, y, r, animatedId? }[]` in viewBox coordinates, `parTimeSec`,
  `multiplayerReady` (preferred by the two-player "random level"; `svgLevel` sets it for 7+ differences unless the
  level passes it).
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
- Chapters ("worlds") of 30 levels, `levels/chapters.ts` (`ranges`): 1 "farm" 1–20 + 101–110, 2 "city" 21–40 +
  111–120, 3 "forest" 41–60 + 121–130, 4 "sea" 61–80 + 131–140, 5 "space" 81–100 + 141–150; the harder ten of a
  chapter (ids after 100, files in its own `chapter-NN/`) open after its 20th level, one after another, and never
  hold back the next chapter (`progress.isReached`: a level follows the previous level of its chapter, a chapter's
  first level follows id − 1); "next" in the result dialog goes through the chapter (`nextLevel`). Drawing helpers per chapter: `shapes.ts` (farm), `chapter-02/shapes.ts` (city),
  `chapter-03/shapes.ts` (forest), `chapter-04/shapes.ts` (sea), `chapter-05/shapes.ts` (space). Every
  level is a unique hand-drawn scene — no generator; scenes within a chapter must look different from each other.
- Difficulty by level range, `levels/difficulty.ts`: 1–15 → 5 differences (r ≥ 24), 16–20 → 6, 21–40 → 7,
  41–60 → 8, 61–100 → 9–10 (r ≥ 18 after 15); motion differences 0 → 1 → 1–2 → 2–3. The harder ten of each
  chapter (`harder()`): 7, 8, 9 differences in steps of three levels and 10 on the last, never fewer than the
  chapter's first 20 have; 2–3 motion differences, r ≥ 22 (a finger) and zone centers ≥ 64 apart (`minGap`); their
  `parTimeSec` is the chapter's last par time −10/−20/−30/−35%, levels 7–9 allow 2 hints and the 10th 1
  (`hintLimit`). `check-levels` enforces it and that each level's `chapter` matches the chapter covering its id.
- Every zone must contain everything its `a`/`b` draw (over the whole motion for moving objects: use the rest
  position as the zone center and pass the animation id as `diff`'s 6th argument). Draw only the differing part
  inside `diff` (a hat, a canopy, a roof stripe) so zones stay small and never overlap.
- UI colours come from the tokens in `src/style.css` (`--bg`, `--fg`, `--panel`, `--muted`, `--soft`, …), which the dark
  theme overrides; don't hard-code UI colours in components. Backdrops turn to night in the dark theme; level
  pictures stay as drawn.
- Colors: no CSS `rgb(r g b / a)` in level markup (resvg draws it black); use `fill-opacity` / `stroke-opacity`.
- Add a level: new `chapter-NN/level-NNN.ts`, register it in `levels/index.ts`, add `levelTitles.<title>` (and
  `chapters.<chapter>` for a new chapter) to all locales, run `check-levels` and look at the preview.
- Zones must not overlap. Run `npm run check-levels` after touching levels and look at `npm run preview-levels`.
- Stored data is untrusted: validate its shape when loading (see `parseLevels` in `stores/progress.ts`).
- Calm mode (spec, section 6): no timer/mistakes/lock/stars, unlimited hints, slower animation, soft sounds,
  "stop motion" button; completion is stored with `stars: 0`. The mode is read when a level starts.
- Hints: shared pool (start 5, +1 for the first 3-star finish of a level), capped per attempt in normal mode by
  `Level.hintLimit` where a level sets one; `GameScene.hint()` returns false
  when nothing can be hinted, so a hint is only spent when it is shown.
- Monetization (spec, section 10): levels 1–`FREE_LEVELS` (15, `stores/purchase.ts`) are free, the rest need the one
  "full game" purchase. Lock checks go through `progress.isUnlocked` / `progress.needsPurchase` only.
- Native: Preferences live in SharedPreferences on Android (not localStorage). Edge-to-edge: Capacitor `SystemBars`
  passes insets as `env(safe-area-inset-*)`, which the CSS already pads; keep `viewport-fit=cover`. Use SVG icons,
  not emoji, for UI symbols (Android draws ⏸ ⏹ ▶ as colored emoji).
- Board taps: `Gestures` cancels the touch's synthetic click, otherwise the last find's tap would also press a button
  of the result dialog that opens under the finger.
- Development-only tools (Settings → "Complete all levels", "Reset progress", "Forget purchase") are behind `import.meta.env.DEV`.
- `chapter` and `title` are i18n keys (`chapters.<chapter>`, `levelTitles.<title>`); all UI text goes through vue-i18n.
- Level modules and everything they import must stay free of browser/Vue APIs (the validator runs them in Node),
  and TS imports use explicit `.ts` extensions.
- Code, identifiers and commits in English.
