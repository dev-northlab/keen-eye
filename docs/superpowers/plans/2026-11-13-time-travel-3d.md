# Time travel 3D pictures — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every "find the odd one out" era (601–610) gets an optional 3D picture with its own, longer list of odd items, played when the picture style is "redesign"; the drawn version stays as it is.

**Architecture:** An era's JSON gains an optional `redesign` block (picture, size, par time, items; an item may borrow its texts from the drawn item with the same id). `parseAnachronismLevel` checks and resolves it; `styledEra(level, style)` (next to `styledLevel`) returns the era to play. `AnachronismScene` shows a raster picture when given no SVG source; `AnachronismLevelView` gets the style switch and restarts on change; the router preloads the picture.

**Tech Stack:** Vue 3 + TS, `node:test`, existing engine (`engine/render.ts`, `engine/anachronism*.ts`).

**Spec:** `docs/redesign-time-travel.md`

## Global Constraints

- Engine (`src/engine`) stays plain TS: no Vue imports, no refs passed in.
- Level/data modules stay free of browser APIs (tests run them in Node); TS imports use explicit `.ts` extensions.
- All UI text through vue-i18n, same keys in all 32 locales; era texts (`label`, `fact`) in every interface language (`npm test`).
- The drawn eras (SVG, items, animations) do not change.
- 3D items: 10 on 601–603, 12 on 604–606, 14 on 607–610; only undisputed anachronisms; no stray modern objects on the picture.
- Never `git commit`/`push` unless the user asks in that message (user rule). Run `npm run typecheck` and `npm test` instead of commit steps.

## Review Focus

- Style switched during an attempt: the attempt restarts with the other picture **and** the other item count (`FoundSlots` total, result list). Task 3 makes `total` come from the attempt's era.
- 3D style on, era without `redesign`: plays the drawn SVG exactly as before (fetch + animations) — `styledEra` returns the same object; test in Task 1.
- A `redesign` item reusing an id the drawn era does not have, or a new id without texts: rejected when loaded — tests in Task 1.
- 3D item texts missing in some locale: caught by the extended "every text exists in every interface language" test — Task 1.
- Picture still downloading when the attempt starts: spinner shown over it (shared with `createPicture`), as on picture levels — Task 2.

---

### Task 1: Era data — `redesign` block, parser, `styledEra`

**Files:**
- Modify: `src/engine/types.ts` (next to `AnachronismLevel`)
- Modify: `src/engine/anachronism.ts` (`parseAnachronismLevel`)
- Modify: `src/levels/picture-style.ts`
- Test: `tests/anachronism.test.ts`, `tests/picture-style.test.ts`

**Interfaces:**
- Produces:
  - `interface AnachronismPictures { image: string; width: number; height: number; parTimeSec: number; items: AnachronismItem[] }`
  - `AnachronismLevel.redesign?: AnachronismPictures` — after parsing, every item has `label` and `fact`, and `parTimeSec` is set.
  - `styledEra(level: AnachronismLevel, style: PictureStyle): AnachronismLevel` in `levels/picture-style.ts` — returns `level` itself (same object) for `'classic'` or when there is no `redesign`; otherwise `{ ...level, image, width, height, parTimeSec, items } ` from `redesign`, `animations: []`, `redesign: undefined`.

- [ ] **Step 1: Write the failing tests** in `tests/anachronism.test.ts` (use `base()`; add `redesign` to it in a helper `withRedesign(l)`: `{ image: 'r.avif', width: 2624, height: 1632, items: [{ id: 'a', shape: 'circle', x: 30, y: 30, r: 3 }, { id: 'c', shape: 'circle', x: 70, y: 70, r: 3, label: { en: 'C' }, fact: { en: 'C fact.' } }] }`):
  - `'a redesign item without texts takes the drawn item's'` → `parsed.redesign.items[0].label` deep-equals `{ en: 'A' }`, `.fact` `{ en: 'A fact.' }`.
  - `'redesign par time defaults to the drawn one scaled by the item count'` → no `parTimeSec` in redesign, drawn 60 s and 2 items, redesign 2 items → `60`; with 3 items (add a third valid item) → `90` (rounded to 10 s).
  - `'an explicit redesign par time wins'` → `parTimeSec: 120` → `120`.
  - rejects (via existing `rejects` helper): new id without texts → `/redesign item "c".*texts/`; duplicate id in redesign → `/redesign.*duplicate/`; circle leaving the picture → `/redesign.*leaves/`; overlap → `/redesign.*overlap/`; empty items → `/redesign.*items/`; missing image → `/redesign.*image/`.
  - extend `'every text exists in every interface language'` (line 69) to also walk `level.redesign?.items`.
  - extend `'every level completes once every item is found'` to run an `AnachronismRound` on `styledEra(level, 'redesign')` too.
- [ ] **Step 2: Write the failing tests** in `tests/picture-style.test.ts`:
  - `'an era without 3D or in the classic style plays as drawn'` → `styledEra(era, 'classic') === era` and `styledEra(eraWithout, 'redesign') === eraWithout` (`assert.equal`).
  - `'an era in 3D plays its picture and items, without animations'` → image, width, height, parTimeSec, items from `redesign`; `animations` deep-equals `[]`; `redesign` undefined; `id`, `number`, `era` unchanged.
- [ ] **Step 3: Run** `npm test` — Expected: the new tests FAIL (`styledEra` not exported, `redesign` not parsed).
- [ ] **Step 4: Implement.** Factor the item loop + overlap check of `parseAnachronismLevel` into one local `checkItems(items, size, fail, where)` used for both lists (`where` = `''` or `'redesign '` so messages read `redesign item "c": …`, `redesign items "a" and "c" overlap`). Redesign items with neither `label` nor `fact` copy both from the drawn item of that id; one without the other is an error. Default par time: `Math.round(level.parTimeSec * redesignItems / drawnItems / 10) * 10`.
- [ ] **Step 5: Run** `npm run typecheck && npm test` — Expected: all pass.

### Task 2: Engine — raster picture for the era scene

**Files:**
- Modify: `src/engine/render.ts`
- Modify: `src/engine/anachronism-scene.ts:79-98` (constructor)

**Interfaces:**
- Consumes: nothing from Task 1 at the type level (`AnachronismLevel` fields `image`, `width`, `height`).
- Produces:
  - `createImagePicture(href: string, w: number, h: number): Picture` in `render.ts` — `<svg class="ke-picture" viewBox="0 0 w h">`, one `<image>` at the full size, the same `loadingSpinner` until it loads (or errors), `marks` group, no animations. `href` relative to the app base (same `imageUrl` as `createPicture`).
  - `AnachronismScene` constructor: `source: string | undefined` — the SVG text of a drawn era; `undefined` → `createImagePicture(level.image, level.width, level.height)`.

- [ ] **Step 1: Implement `createImagePicture`.** Extract the image-layer + spinner code of `createPicture`'s pixel branch into one local helper both call (`imageLayers(scene, layers, w, h): SVGGElement | undefined` returning the loader) — do not copy it.
- [ ] **Step 2: Change the scene constructor** to pick `createSvgPicture` or `createImagePicture` by `source`.
- [ ] **Step 3: Run** `npm run typecheck && npm test` — Expected: all pass (no behaviour change for drawn eras or picture levels).

### Task 3: Era screen, preload, note

**Files:**
- Modify: `src/views/AnachronismLevelView.vue`
- Modify: `src/router/index.ts` (`beforeResolve`)
- Modify: `src/services/images.ts`
- Modify: `src/views/TimeTravelView.vue`

**Interfaces:**
- Consumes: `styledEra` (Task 1), scene `source: string | undefined` (Task 2), `PictureStyleSwitch`, `preloadImage`.
- Produces: `preloadEra(era: AnachronismLevel): Promise<void>` in `services/images.ts` — preloads `BASE_URL + era.image` when it is a raster picture (`!era.image.endsWith('.svg')`; drawn eras are always `.svg`); resolves at once otherwise. Takes the era as it will be played (`styledEra`).

- [ ] **Step 1: View.** Each attempt (`start()`) takes `era = styledEra(level, settings.pictureStyle)`; `total`, hint/fact lookups and the result's fact list read `era.items` (make `total` a ref/computed of the attempt, not `level.items.length`). The drawn SVG is fetched once on mount only if the level has a drawn picture (always) and passed as `source` only when `era === level`. `PictureStyleSwitch` in the toolbar when `level.redesign`; `watch(() => settings.pictureStyle, start)` as in `LevelView`. Par time / stars use `era.parTimeSec` (check where the scene or view reads `parTimeSec`).
- [ ] **Step 2: Note.** When the style is `'redesign'` and the era has no `redesign`, show `pictureStyle.drawnOnly` once a session (module-level flag in a plain `<script lang="ts">` block, as `LevelView`) — through the view's existing card/notice slot or a small timed note like `LevelView`'s; no new i18n key.
- [ ] **Step 3: Preload.** `router.beforeResolve`: for `to.name === 'time-travel'` await `waitAtMost(preloadEra(styledEra(era, style)))`. `TimeTravelView`: on an era card's `pointerdown`, `preloadEra(styledEra(era, settings.pictureStyle))`.
- [ ] **Step 4: Run** `npm run typecheck && npm test` — Expected: all pass.
- [ ] **Step 5: Browser check** (`npm run dev`, Playwright as in the session's `check.mjs`, or by hand): with a temporary `redesign` on `egypt-01` pointing at any existing 3D AVIF (e.g. `levels/redesign/level-001-a.avif`, real size) and two items, 3D shows the picture, the switch, 2 slots; switching to 2D restarts with 5 slots and the moving SVG; another era in 3D shows the drawn-only note once. Remove the temporary block afterwards.

### Task 4: Docs

**Files:**
- Modify: `CLAUDE.md` (the `time-travel/` sentence in Layout): eras may carry `redesign` (own picture and items, texts borrowed by id), played by `styledEra`; plan in `docs/redesign-time-travel.md`.
- Modify: `docs/anachronism-mode.md`: the `redesign` block in "Формат данных".
- Modify: `docs/redesign-time-travel.md`: status table, batch 0 done (date).

- [ ] **Step 1: Edit the three files.**
- [ ] **Step 2: Report to the user** what changed; ask whether to commit.

### Task 5: Pilot — Egypt (601)

Content work, per `docs/redesign-time-travel.md` ("Картинки"), interactive with the user and Gemini.

- [ ] **Step 1: Item list.** 10 items for Egypt (2 funny, the rest tricky/learning), each with kind and a one-line fact; keep only undisputed ones; show the user, wait for "ok".
- [ ] **Step 2: Kit.** Reference render of the drawn era (1600×1000) and `PROMPTS-601.md` in `~/Downloads/keen-eye-redesign-kit/` (3D-depth paragraph of `PROMPTS-211-213.md`, nature of the era, the drawn items to drop, each new item with its place, the "everything else strictly of the era" sentence, no text).
- [ ] **Step 3: Check the picture** the user puts in `assets/test/`: every item there and visible, no stray anachronism (fix by clone or a follow-up prompt), measure hitboxes in percent.
- [ ] **Step 4: Wire it.** WebP source → `~/Pictures/keen-eye/levels/time-travel/redesign/egypt-01.webp`, `npm run encode-pictures -- ~/Pictures/keen-eye`; `redesign` block in `egypt-01.json` with new items' `label`/`fact` in all 32 locales; `npm test`; look at it in the browser; update the status table.

### Tasks 6–8: Batches 602–604, 605–607, 608–610

Same as Task 5 per era (12 items on 604–606, 14 on 607–610), one batch at a time, each list approved by the user first.
