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
- `npm run store-screenshots [-- <locale> ...]` — build + `scripts/store-screenshots.ts`: plays the build in the
  installed Chrome (`playwright-core`, `/usr/bin/google-chrome`) with a seeded mid-game progress, taps some
  differences and frames each screen under its caption (`assets/store/listing/<locale>/screenshots.txt`, one line per
  shot of `SHOTS`) at the store sizes — Play phone 1080×1920, iPhone 6.9" 1290×2796, iPad 13" 2048×2732 — plus the
  Play feature graphic 1024×500, into `store-screenshots/` (gitignored); all languages take about half an hour
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
  `transform.ts` (`PictureTransform`, `docs/mirror-rotate-feature.md`: picture B of `Level.transformB` shown mirrored or
  turned inside the svg — zones stay in scene coordinates, taps go back through `inverseTransformPoint`, the shared zoom
  shows the same scene part on both; single player only (`GameScene`), not in calm mode (`MODE_RULES.<mode>.transformB`), set by `transformBOf` in `difficulty.ts` for the last
  five levels of every world and "travel" and the hardest "detective" case (526–530), alternating mirror-x / rotate-180; the HUD shows `TransformChip`
  and, until such a level is completed, a warning note),
  `loop.ts` (pausable rAF loop), `scene.ts` (`GameScene`: single player — board, timer, score, events),
  `hit-test.ts`, `anachronism.ts`, `anachronism-scene.ts` ("find the odd one out", `docs/anachronism-mode.md`: screen →
  percent of the image and hitboxes; level JSON checks and the DOM-free round; `AnachronismScene`, one picture with the
  same zoom, gestures, marks and miss lock), `match.ts` (two-player match engine, DOM-free: state + `dispatch(event) → effects`; tap events
  `{ playerId, picture, x, y, t }` are hit-tested by the engine itself), `match-scene.ts` (`MatchScene`: clock,
  1 shared or 2 face-to-face boards, `Match`; duels have no zoom and count a tap when the finger touches),
  `memory-scene.ts` (`MemoryScene`: a "memory" round, `docs/memory-mode.md` — phases show A → curtain → search B alone
  (`Board.show`, no zoom, taps on B only) → reveal A|B with the missed zones in red; peeks, miss limit, `memoryStars` in `rules.ts`)
- `src/levels/` — `chapter-NN/level-NNN.ts`, registered in `levels/index.ts`; `time-travel/` — "find the odd one out"
  levels as JSON (`mode: "anachronism"`, string ids plus a numeric `number` from 601 for display, percent hitboxes, texts as `{ <locale>: … }` in every interface language — `npm test` checks it), checked by
  `parseAnachronismLevel` in `time-travel/index.ts`, images in `public/levels/time-travel/`; kept out of `levels`
  (no unlock order; only the first era, 601, is free — `FREE_TIME_TRAVEL_NUMBER`, the rest need the purchase; own `progress.timeTravel` records; a world map card opens the eras, `/time-travel`, a level is `/time-travel/:id`;
  one era per level: Egypt, Rome, Vikings, castle, pirates, Wild West, Stone Age, samurai Japan, Aztecs, ancient China so far, difficulty growing; the picture is inlined
  (`createSvgPicture`) and its background moves: `data-anim` groups in the SVG + `animations` in the JSON, same
  motion types as `anim()`; odd items never move — `npm test` checks it — and neither do characters holding one); `helpers.ts` (`svgLevel`, `diff`, `rng`),
  `shapes.ts` (farm drawing helpers), `chapter-02/shapes.ts` (city helpers: buildings, cars, people, street),
  `chapters.ts` (the chapters/"worlds": id, level id ranges, card colors, icon, backdrop — one entry per world; plus
  the categories `TIME_CHAPTER` and `MEMORY_CHAPTER`, `CATEGORIES`, with their `rules` text), `time/` — "spot the difference in time" (`docs/time-differences-mode.md`): levels 201–230 of chapter
  `time`, the same scene at two moments (`pair`: morning/evening, summer/winter); `svgLevel` gets `pair`, `time(a, b)`
  draws by the picture's moment and `trap(x, y, r, a, b, hint)` marks a natural change (light, snow, leaves) whose tap is
  a miss that shows `timeMode.traps.<hint>` once (`GameScene` → `onTrap`); played by `LevelView`, grid by `ChapterView`
  (`/levels/time`, a banner on the modes screen, not a world), numbered 1–30 (`levelNumber`; 216–230 are the busier
  scenes with 8–10 differences, `difficulty.ts`; 231–240 the ten hardest, 11 then 12 differences among 6–8 traps, still
  static and never turned, hidden until released in `upcoming.ts`), open from the start, the
  first `FREE_CATEGORY_LEVELS` (3) free; `memory/` — "memory" (`docs/memory-mode.md`): levels 301–330 of chapter `memory`
  written with `memoryLevel({ id, title, showSeconds, scene })` (`Level.memory`: seconds A is shown, peeks) in portrait
  pictures 500×750 (`MEMORY_VIEWBOX`; the reveal puts A and B side by side), 6–10 big
  objects among 15 small decor ones (`memory/shapes.ts`), 3 → 4 → 5–6 changes shown 5 → 4 → 3 s, then 316–330 busier scenes (12–18 objects) with
  5 changes for 5 s and 6 for 4 s (`difficulty.ts` `showSeconds`), and 331–340 the ten hardest, 7 then 8 changes
  for 5 s, never turned, hidden until released in `upcoming.ts`; a move's zone
  covers both places, a count's the whole group; played by `MemoryLevelView` (`/memory/:id`; the guard sends `/level/:id`
  there and keeps other levels out), grid by `ChapterView`, open and paid like "time" (first 3 free);
  `travel/` — "travel" (`docs/world-travel-mode.md`): levels 401–432 of chapter `travel` written with
  `travelLevel({ id, title, parTimeSec, place, scene })` (`Level.travel`: region, ISO country code, lat/lon on the world map),
  one recognizable place each (title = place name, `worldTravel.facts.<title>` its fact — only well-known, checked facts),
  one city per country (`npm test` checks it), flags in `travel/flags.ts`, regions `TRAVEL_REGIONS`; 5 → 6 → 7 differences,
  then 416–432 busier cities with 8 → 9 → 10, one in motion from 411;
  played by `LevelView` (the fact card `TravelFact` in the result dialog, a passport stamp on the first win), listed on the
  world map `TravelView` (`/travel`, `?region=`; `levelsScreen(level)` is where a level's menu leads) with the passport
  `/travel/passport`; open and paid like "time" (first 3 free);
  `detective/` — "detective story" (`docs/detective-mode.md`): levels 501–535 of chapter `detective` in 7 cases of 5 scenes
  (`cases.ts`: suspects, culprit and `fits` — the suspects each clue fits; only the culprit fits all, `npm test` checks it;
  portraits in `suspects.ts`), written with `detectiveLevel({ id, case, title, parTimeSec, scene })` whose `clue(key, x, y, r, a, b)`
  is `diff` plus the clue text key (`Level.detective`: case, clue per difference, i18n `detective.clueTexts.<key>`); A = before,
  B = after; 5 → 6 → 7 clues, then the three harder cases (516–530) 8 → 9 → 10; 531–535 "The missing chickens" (case `chickens`,
  6 clues, listed first in `CASES`): a village girl's chickens are gone — she is in every scene, each time in another outfit
  (`Outfit`), drawn with her animals and her village yard by `detective/village.ts` (`villageGirl`, alive through `anim` like the home meadow: she sways, tilts her head, blinks, swings her arms; ducks swim across and turn, rabbits hop, birds peck, the goat grazes, butterflies and flocks fly, ripples, clouds, sun rays, trees and flowers move — `swimmingDuck`, `hopping`, `pecking`, `flutter`, `flyingBirds`, `ripples`, `sunRays`); played by `LevelView` (a found clue
  pops up, the result dialog lists the scene's clues), listed
  by `DetectiveView` (`/detective`) and `CaseView` (`/detective/:case`: story, scenes, notebook, naming the culprit; solved
  cases in `progress.solvedCases`); the first case and "The missing chickens" are free (`Chapter.free` ranges; a free case opens
  without the case before it, `progress.isReached`), the rest need the purchase;
  `allLevels` = worlds + time + memory + travel + detective (`levels` stays the worlds),
  `difficulty.ts` (difference and motion counts, min zone radius and gap, kinds by level range; read by `check-levels`)
- `src/views/` — screens: Home, LevelMap (game mode banners, `/levels`), Worlds (chapter cards, `/worlds`), Chapter (level grid of one chapter, `/levels/:chapter`),
  TimeTravel (eras of "find the odd one out"), AnachronismLevel (one of its levels), Travel (world map of "travel"), Passport (its stamps),
  Detective (cases), Case (one case),
  Level, MemoryLevel (a "memory" level; its result sits under the revealed pictures, not in a dialog), Settings, Duo (two players: mode → players/rules → level, `/duo`), Match (`/duo/:id`); `src/components/` — dialogs (pause, result, the full-game offer `PurchaseDialog`: mounted once in `App.vue`, opened from any screen by `purchase.dialogOpen`; `ModalDialog` has an `icon` slot and the `points` icon list), level HUD time and mistakes chips (`HudCounters`), fact card of "find the odd one out" (`FactCard`), clues of a detective scene (`ClueList`), "travel" world map (`WorldMap`) and place fact (`TravelFact`), settings panel (Settings screen and pause menu), screen backdrops (`ScreenBackdrop`, one world per screen; the home meadow is `MeadowScene`, drawn per season chosen with `SeasonSwitch`), day/night theme switch (`ThemeSwitch`), stars, bottom back button (`BackButton`), the small level id in a corner of level tiles and the board, id ranges on world, mode and case cards (`LevelId`)
- `src/config/links.ts` — store links (`getStoreLink()`: iOS once it has one, else Google Play) and share targets (Facebook, X, LinkedIn, … share pages that post the store link from the player's own account; logos from `simple-icons` as inline SVG, LinkedIn drawn by hand), shown by `ShareLinks`; `src/composables/useShare.ts` — `shareApp` (@capacitor/share; a browser without a share sheet copies the link), `openLink` (@capacitor/browser); About screen `/about` (`AboutView`), `ShareButton` also in the level result dialog
- `src/stores/` — Pinia: `duo` (two-player setup and match history), `progress` (best stars/time per level, red stars of hard mode, sequential unlocking, hidden keys found), `settings`
  (mode calm/normal/hard, music and sound volume 0–1, vibration, language, reduce motion, home meadow season, light/dark theme; written directly, auto-saved, pushed to
  i18n and services by a `watchSyncEffect`), `purchase` (full game flag cached locally, price; `sync()` refreshes it
  from the store in the background); all are loaded in `main.ts` before the router starts
- `src/services/` — `theme.ts` (applies the theme: `html[data-theme]` + system bar icons), `backButton.ts` (Android back: level → pause → menu, other screens → home, home → exit; `canExitApp` — only Android shows the home screen's "Exit", iOS forbids quitting),
  `storage.ts` (JSON over Capacitor Preferences; localStorage in the browser, key prefix
  `CapacitorStorage.`), `audio.ts` (music tracks from `assets/music/` per screen + Web Audio synthesized effects;
  starts on the first user gesture, silent in the background), `haptics.ts` (@capacitor/haptics), `review.ts`
  (the store's in-app review sheet via @capacitor-community/in-app-review: asked once, on device only, after a
  three-star or calm finish in `LevelView` once 8 levels are completed; never gated by a question or rewarded), `purchases.ts`
  (the only code that talks to the app store: price, purchase, restore, ownership of the product `full_game`, and the
  "support us" tips `tip_small`/`tip_medium`/`tip_large` (consumables, unlock nothing; `SupportCard` on the About screen,
  shown only while the store offers them); Google Play
  Billing / StoreKit straight through `capacitor-plugin-cdv-purchase`, no receipt server; in `npm run dev` in the
  browser a stub store, a production web build sells nothing)
- `src/router/` — routes; a global guard sends unknown levels home, paid levels not bought open the full-game dialog (a direct link lands home), and
  levels not reached yet to the map
- `src/i18n/` — one `<locale>.json` per language, named by its BCP 47 tag (ru, en, hy, de, fr, es, it, pt, nl, pl,
  cs, ro, bg, uk, el, hu, sv, da, nb, fi, tr, ar, hi, id, ms, fil, vi, th, zh, zh-Hant, ja, ko), registered in
  `index.ts` and in `CFBundleLocalizations` of `ios/App/App/Info.plist` (`zh` as `zh-Hans`; iOS WebView reports only
  the declared languages) — keep the same keys in all of them, `npm test` checks both; `en` is the fallback; default language =
  system, picked by `resolve.ts` from the language part of the system tags (fil ≠ fi, no/nn → nb, zh-TW/HK → zh-Hant);
  `ar` is right to left: `setLocale` sets `html[dir]`, so UI CSS uses logical sides (`margin-inline-start`,
  `text-align: start`), arrows along the reading direction carry `flip-rtl`, and `Board` keeps A|B left to right;
  `languages.ts` — name (in its own language) and SVG flag per locale for the language picker
- `scripts/` — `check-levels.ts`, `preview-levels.ts`, `render.ts` (posed SVG → pixels, shared by both);
  `assets/` — music (`assets/music/`), store icon and the store page texts (`assets/store/listing/<locale>/`: Google
  Play title, short and full description, App Store subtitle and keywords; one folder per interface language, field
  limits, store language codes and the numbers of levels, languages and countries in the texts checked by `npm test` —
  update every description when levels, modes or languages are added)
- `public/privacy.html` — the privacy policy (English + Russian) the store listings link to,
  https://dev-northlab.github.io/keen-eye/privacy.html; a static page, not a route, so GitHub Pages answers 200
  (routes are served by `404.html`). The Pages web build is only for the developer's own testing, not a product, so the
  policy covers the Android and iOS apps only. Keep it true when adding anything that touches data, network or permissions

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
  first level follows id − 1); "next" in the result dialog goes through the chapter (`nextLevel`). After the harder
  ten come the ten hardest (151–160 farm, 161–170 city, 171–180 forest, 181–190 sea, 191–200 space; `hardest()` in
  `difficulty.ts`: 11 then 12 differences, 3 moving, picture B always turned), new animals, tools, houses and vehicles.
- Hidden levels (`levels/upcoming.ts`): levels drawn ahead of a release live in `upcomingLevels`, not in their
  chapter's list; their ids are already in the chapter's `ranges` (`chapterSize` leaves them out). Players never see
  them (no tile, no count, no "next", the router sends a direct link home); developer mode shows them at their
  place in the grid with a crossed-out eye (`chapterLevelsWithHidden`, `ChapterView`) and plays them free.
  `check-levels`/`preview-levels` take them too. To release one, move it into its chapter's list and update the
  store texts. The "test" chapter (`TEST_CHAPTER`, ids 1001–1100, `levels/test/`) lives there for good:
  picture pairs tried out in developer mode (a banner at the end of the game modes screen), `kind: 'image'` levels
  with their pictures in `public/levels/test/` (paths relative to the app base, viewBox = image pixels). Drawing helpers per chapter: `shapes.ts` (farm), `chapter-02/shapes.ts` (city),
  `chapter-03/shapes.ts` (forest), `chapter-04/shapes.ts` (sea), `chapter-05/shapes.ts` (space). Every
  level is a unique hand-drawn scene — no generator; scenes within a chapter must look different from each other.
- Difficulty by level range, `levels/difficulty.ts`: 1–15 → 5 differences (r ≥ 24), 16–20 → 6, 21–40 → 7,
  41–60 → 8, 61–100 → 9–10 (r ≥ 18 after 15); motion differences 0 → 1 → 1–2 → 2–3. The harder ten of each
  chapter (`harder()`): 7, 8, 9 differences in steps of three levels and 10 on the last, never fewer than the
  chapter's first 20 have; 2–3 motion differences, r ≥ 22 (a finger) and zone centers ≥ 64 apart (`minGap`); their
  `parTimeSec` is the chapter's last par time −10/−20/−30/−35%. `check-levels` enforces it and that each level's `chapter` matches the chapter covering its id.
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
- "Time" and "memory" scenes also carry about 15 decor objects each (the decor sections of `time/shapes.ts` and
  `memory/shapes.ts`, plus the chapters' shapes), drawn the same in both pictures and kept 20+ units clear of every zone; in
  "time" levels decor that changes with the moment (snow on it in winter, summer-only grass and butterflies) goes through
  `time()`, never `diff`.
- Hidden keys (`docs/hidden-item-feature.md`): one level of every world and category (`KEY_CHAPTERS`) draws a golden
  key with the scene's `secret(x, y, angle?)` → `Level.secret` (both pictures; "memory": B only). `Board` takes a tap on
  it before hit/miss (never a miss, never hinted), `GameScene`/`MemoryScene` report `onSecret`, `progress.keys` stores the
  chapter ids. `check-levels` checks the key is visible but at least 25% covered, and clear of zones and traps; `npm test` one key per chapter, the
  farm's in the free levels. All keys open the bonus level 900, chapter `treasury` (`treasury/level-900.ts`, banner on
  the game modes screen, `TreasureChest` in its result dialog).
- Settings → "Reset progress" (`ResetProgressDialog`, asks first): `progress.reset()` and the duel history (`duo.clearHistory()`); the purchase and the settings stay.
- Stored data is untrusted: validate its shape when loading (the parsers of `stores/progress-data.ts`, unit-tested).
- Calm mode (spec, section 6): no timer/mistakes/lock/stars, 3 free hints per attempt (`MODE_RULES.calm.hints`), slower animation, soft sounds,
  "stop motion" button; completion is stored with `stars: 0`. The mode is read when a level starts.
- Hard mode (`docs/difficulty-modes.md`): the same levels under stricter rules — no hints, the 3rd mistake loses the level
  (`onFail`; so no miss lock), no trap notes; "memory" shows A a second less, no peeks, 2 misses. Every mode's
  numbers live in `MODE_RULES` (`engine/rules.ts`); scenes take them through their options, screens read them there
  instead of checking the mode. Red stars (`hardStars`, `memoryHardStars`: 3 = no mistake within par time, 2 = one
  mistake, 1 = passed) are kept in `progress.hard`, apart from the yellow ones of normal mode, shown under them on tiles;
  a pass also completes the level like calm mode. A normal finish with fewer than 3 red stars offers "Play on hard":
  that level in hard mode until the screen is left (`hardChallenge`), the setting unchanged; the level HUD shows the
  attempt's mode (`ModeChip`). Not in duels.
- Extra objects of hard mode (`docs/hard-mode-extra-objects.md`, all five worlds, "memory" (3–5), "time" (1–3 flocks of birds in the sky, before `DUSK`/snowfall) and "travel" (5, plus 7 decor objects of
  every mode drawn with `decor` from the same module), "detective" (10, plus 5 decor objects of every mode; their own
  animals, tools, little houses and things of `detective/props.ts`, 15 different kinds per scene)): the scene's
  `extra(x, y, r, markup)` draws decor only in the hard pictures, the same in A and B (`Level.extras`,
  `build(variant, moment, true)`); levels list them with `extras({ extra, anim }, [[kind, x, y, color?], …])` from
  `levels/extras.ts` (chapter shapes with their boxes; animals and things on water bob or sway on the spot, the circle
  grown by the motion's reach). `check-levels` keeps them 20+ units clear of zones, key and
  traps and inside their circles; `npm run preview-levels -- --hard <id>` shows them.
- Hints: no pool to collect — every attempt of a level gets the mode's hints again (`MODE_RULES.<mode>.hints`: calm 3,
  normal 1, hard none); `GameScene.hint()` returns false when nothing can be hinted, so a hint is only spent when it is
  shown. Duels have their own hints (`duo`).
- Monetization (spec, section 10): levels 1–`FREE_LEVELS` (15, `stores/purchase.ts`) are free, the rest need the one
  "full game" purchase. Lock checks go through `progress.isUnlocked` / `progress.needsPurchase` only.
- App id `com.northlab.keeneye` — Google Play package name and iOS bundle id (`appId` in `capacitor.config.ts`,
  `namespace`/`applicationId` in `android/app/build.gradle`, the Java package of `MainActivity`, `strings.xml`,
  `PRODUCT_BUNDLE_IDENTIFIER` in the Xcode project, `codemagic.yaml`, store links in `src/config/links.ts` and README).
  The stores never let it change after the first upload: updates, saved progress and purchases are tied to it.
- Native: Preferences live in SharedPreferences on Android (not localStorage). Edge-to-edge: Capacitor `SystemBars`
  passes insets as `env(safe-area-inset-*)`, which the CSS already pads; keep `viewport-fit=cover`. The bundle needs
  Android System WebView 111+ (Vite's default target chrome111 / ios16.4, `color-mix()`): `android.minWebViewVersion` in `capacitor.config.ts` shows
  `public/webview-update.html` (plain HTML + ES5, own texts per locale; on Android 7–9 Chrome is the WebView, so it asks
  to update Chrome there) on older ones — raise it when the build uses newer
  features; its `server.errorPath` is left out of `cap sync ios`, since iOS loads it after any failed navigation. On iOS
  the WebView is the system's, so `IPHONEOS_DEPLOYMENT_TARGET` is 16.4 (the CLI copies its major into `CapApp-SPM/Package.swift`). Use SVG icons,
  not emoji, for UI symbols (Android draws ⏸ ⏹ ▶ as colored emoji).
- Board taps: `Gestures` cancels the touch's synthetic click, otherwise the last find's tap would also press a button
  of the result dialog that opens under the finger.
- Developer tools ("Open all levels", "Complete all levels", "Forget purchase", "Reset progress", "Reset found keys") sit in the `DevToolsDialog`, opened by the "Development" entry in Settings. It shows only in developer mode (`settings.developer`), turned on by the temporary testing code (`DEVELOPER_CODE` in `stores/settings.ts`) typed into the "Developer" code field; "Open all levels" and "Show places in levels" (the levels' red outline of all zones) work only while developer mode is on.
- `chapter` and `title` are i18n keys (`chapters.<chapter>`, `levelTitles.<title>`); all UI text goes through vue-i18n.
- Level modules and everything they import must stay free of browser/Vue APIs (the validator runs them in Node),
  and TS imports use explicit `.ts` extensions.
- Code, identifiers and commits in English.
