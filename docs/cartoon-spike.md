# Cartoon spike: two ways to a "cartoon" category

A planned paid category: two pictures play the same short looping story, like a cartoon, and the player finds the
differences in them. Most differences stay all the story long (some ride on moving characters); a few are **events**
of the story — shown only for a while (`Difference.during`), a tap on their place at other times is a miss.

Two test levels (chapter `test`, developer mode only) try the two ways to build it, to compare them in the game:

| | 1001 "Cat at the pond" — approach A | 1002 "The stolen pie" — approach B |
|---|---|---|
| Engine | the usual `Board` | `CartoonBoard` (`engine/cartoon.ts`) |
| Screen | still camera on an 800×500 scene, zoom as on every level | a 1440×900 world; a camera (`Level.cartoon`) cuts between shots, pushes in and pans after the dog; no zoom |
| Story | 16 s loop | 20 s loop |

Shared by both:

- `keys` motion (`AnimationMotion`, `engine/keyframes.ts`): keyframes at seconds of the loop — offset, turn, scale
  (−1 mirrors), opacity — with easing (`in`, `out`, `inOut`, `back`, `step`); nested inside each other, e.g. legs
  that swing only while their owner walks (`swingKeys` in `levels/test/cartoon-shapes.ts`).
- Event windows: `diff(x, y, r, a, b, follow, during)`; `tapZonesAt` gives an event off screen radius 0, which
  `hitTest` skips.
- The rules stay `GameScene`'s (timer, mistakes, hints, stars); only the board differs.
- `check-levels` compares a story every 0.25 s of its loop, checks zones only while their event is on, lets an event's
  zone come in across the frame's edge, and reports an event that shows outside its window.

Open questions after the comparison: which approach the category takes, how many differences and events a level
has, whether the camera may move away from a difference while the player looks for it, and where the category sits
(banner, price, number of free levels).
