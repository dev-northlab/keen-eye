# "Cartoons" category

Two pictures play the same short funny story that loops, like a cartoon, and the player finds the differences in them.
Most differences stay all the story long (some ride on moving characters); a few are **events** of the story — shown
only for a while (`Difference.during`), a tap on their place at other times is a miss.

- Chapter `cartoon` (`CARTOON_CHAPTER`, levels/chapters.ts), levels `levels/cartoon/level-8NN.ts` from 801,
  registered in `levels/cartoon/index.ts`; its `ranges` grow with every new cartoon (a wider range would announce
  cartoons not drawn yet). A category: open like "time", only its first level is free (`free: [[801, 801]]`), no key
  yet (left out of `KEY_CHAPTERS`), not in duels (they play the worlds).
- Game modes screen: a live banner, second after "spot the difference" — `PhotoBanner` with its `picture` slot filled
  by `CartoonBannerScene` (a 6 s cartoon of its own, CSS animations) and the icon `public/icons/cartoon.webp`
  (source in `~/Pictures/keen-eye/icons/`). The banner opens the category grid (`ChapterView`), rules
  `cartoonMode.rules`.
- Levels are written with `svgLevel({ …, cartoon: { period, frame, camera }, scene })`; `LevelView` plays them, and
  `GameScene` takes the cartoon board, `CartoonBoard` (engine/cartoon.ts).

## Engine

- `keys` motion (`AnimationMotion`, engine/keyframes.ts): keyframes at seconds of the loop — offset, turn, scale
  (−1 mirrors), opacity — with easing (`in`, `out`, `inOut`, `back`, `step`); nested inside each other, e.g. legs
  that swing only while their owner walks (`swingKeys` in levels/cartoon/shapes.ts).
- Event windows: `diff(x, y, r, a, b, follow, during)`; `tapZonesAt` gives an event off screen radius 0, which
  `hitTest` skips.
- The camera (`Level.cartoon.camera`, `cameraAt`): the shown part of the world at each second; a `step` key cuts (with
  a short dip to black, `cutDip`). `fitCamera` grows the shot to the picture's shape on screen (a tall phone sees more
  of the world, not an empty margin) and the world is clipped to it.
- The player's zoom (`CameraZoom`): pinch, pan, wheel and double tap as on other levels; zoomed in, the view holds the
  shot the camera had (cuts no longer move it) while the story plays on; back at scale 1 it eases to the camera.
- Pace: a cartoon poses its story and camera ~60 times a second (`PoseRate`, engine/pace.ts), other levels ~30. It
  falls back to ~30 only after two slow measures in a row (not in the first 3 s, when the browser draws every
  gradient for the first time) and tries 60 again 8 s later, longer after every further fall.
- The rules stay `GameScene`'s (timer, mistakes, hints, stars); only the board differs.
- `check-levels` compares a story every 0.25 s of its loop, checks zones only while their event is on, lets an event's
  zone come in across the frame's edge, and reports an event that shows outside its window.

## How a cartoon is made (812 "The stolen pie" is the model)

- **Story**: a short funny loop (16–20 s) with a gag — a theft, a chase, a reaction — told by the camera: wide shots,
  close-ups, a pan after the hero, cuts.
- **Scene**: a world full of life — trees of several kinds with fruit, grass tufts, flowers, animals and insects, dust,
  steam, crumbs — and real things of the place (fence, barrel, bench, woodpile, garden bed, mailbox, wheelbarrow).
- **Look**: ink outlines with sunlight from one side — gradients on every object (`NATURE_DEFS` of shapes.ts), soft
  ground shadows (a moving character's shadow follows it), textures (tiles, bricks, wood grain, bark), haze on the far
  hills, warm sunlight over all.
- **Levels so far**: 801 "Gone fishing" (free: grandpa, a heron and a boot by a lake), 802 "The snowman's nose"
  (winter: a hare steals the carrot, the dog crashes into the snowman) and 803 "The hedgehog's apple" (autumn: the
  apple on its spines, an acorn, a heap of leaves) and 804 "The sandcastle" (a beach: a seagull steals the crab's flag,
  a wave flattens the castle; `palmTree`, `BEACH_DEFS`) and 805 "The banana peel" (a jungle: a monkey's peel
  sends an elephant into the river; `bananaPlant`, `bambooClump`, `JUNGLE_DEFS`), 10 differences each; 811 "Cat at the pond", 812 "The stolen pie",
  813 "The bear and the honey" (spring: a bear steals honey from a hive, the swarm chases him into the pond; the
  spring trees `oakTree`, `blossomTree`, `willowTree`, `lilacBush` of shapes.ts, gradients `SPRING_DEFS`), 12 each.
  Every new cartoon brings trees and animals not drawn in the earlier ones.
- **The owl**: the game's owl (the app icon's, `keenOwl` of shapes.ts) sits in every cartoon — on a branch, a lamp,
  a pole, in a hollow — blinking and tilting its head (dozing on a calm one), clear of the zones; it may also be a
  difference.
- **While the category is being drawn**, a new cartoon waits in `levels/upcoming.ts` (developer mode only, at its
  place in the grid, e.g. 803 between the released 802 and 811; its tile numbers count released levels only, so the
  players see no gap — `check-levels` keeps hidden ids free in the order)
  with its title in English in every locale. When the category is finished they are all released at once: moved
  into `cartoon/index.ts`, the store texts of every language updated, the titles translated.
- **Order**: the first ten cartoons have 10 differences (ids 801–810), the ones with 12 come after them (811 on);
  a new cartoon of 10 goes into the next free id of 804–810, one of 12 after the last of 811 on. `ranges` of the
  chapter list only the ids drawn so far (`[[801, 805], [811, 813]]`), so the count on its card stays true.
- **Differences**: 12 (difficulty.ts; the first ten 10), two of them hard (one missing picket in a long row, the stripes of a sleeping
  cat, a missing cattail, a chimney's cap), some of them events of the story; small ones stay tappable through the
  player's zoom.

## How it was chosen

Two test levels tried two ways: a still camera on the usual board (the first "Cat at the pond") and a camera over a
larger world (`CartoonBoard`, "The stolen pie"). On a phone the camera won; the first was remade that way. Drawing was
compared too (developer mode, Settings → Development → "Animation benchmark", /dev/bench): SVG and Canvas 2D (the scene
taken apart into bitmaps, bench/layers.ts) play the same cartoon. On a Xiaomi 14T Pro Canvas 2D (and PixiJS, tried and
removed: a big library for the same speed) kept 120 fps where SVG kept ~110 — but Canvas needs ~1.5 s and ~97 MB to
prepare, so the game stays SVG unless a weak phone shows otherwise. Developer mode also shows a frame meter on every
level (`FpsMeter`: frames shown, the scene's redraws per second, the longest frame).
