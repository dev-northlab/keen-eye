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
  sends an elephant into the river; `bananaPlant`, `bambooClump`, `JUNGLE_DEFS`), then 806–810 drawn from the plan
  below (savanna, night farm, alpine meadow, coral reef, Arctic; their trees and animals written in their own level
  files), 10 differences each; 811 "Cat at the pond", 812 "The stolen pie",
  813 "The bear and the honey" (spring: a bear steals honey from a hive, the swarm chases him into the pond; the
  spring trees `oakTree`, `blossomTree`, `willowTree`, `lilacBush` of shapes.ts, gradients `SPRING_DEFS`), 12 each.
  Every new cartoon brings trees and animals not drawn in the earlier ones.
- **The owl**: the game's owl (the app icon's, `keenOwl` of shapes.ts) sits in every cartoon — on a branch, a lamp,
  a pole, in a hollow — blinking and tilting its head (dozing on a calm one), clear of the zones; it may also be a
  difference.
- **Released**: the category is complete with 30 cartoons (801–830), released on 2026-11-23; every title is translated
  in every locale and the store texts name 30 cartoons. A cartoon drawn later may wait in `levels/upcoming.ts`
  (developer mode only, at its place in the grid; players' tile numbers count released levels only, developer mode
  counts the hidden ones too — `check-levels` keeps hidden ids free in the order) with an English title, until it is
  released with its translations and the store texts' counts.
- **Order**: the first ten cartoons have 10 differences (ids 801–810), the ones with 12 come after them (811 on);
  801–810 are all drawn, so a new cartoon (12 differences) takes the id after the last one, 831 on (difficulty.ts has its row up to 830). `ranges` of
  the chapter list only the ids drawn so far (`[[801, 830]]`), so the count on its card stays true.
- **Differences**: 12 (difficulty.ts; the first ten 10), two of them hard (one missing picket in a long row, the stripes of a sleeping
  cat, a missing cattail, a chimney's cap), some of them events of the story; small ones stay tappable through the
  player's zoom.

## The plan of 806–810 (all drawn on 2026-11-23)

Agreed with the developer on 2026-11-23; drawn in parallel, one level file each (build, look at the frames, try on the phone, commit).
Each: a 20 s story with one clear gag; 10 differences — 2 hard, 3 events of B, 5 others, one recolour at most, the
rest small changes of a part; every difference in a shot for 1.5–2 s or more (the camera pans over the parts the
story does not visit); the game's owl; new trees, plants and animals, their helpers in shapes.ts; hidden in
upcoming.ts with an English title.

- **806 "The runaway egg"** (savanna): an ostrich hides its head in the sand at a rustle, its egg rolls away; meerkats
  pass it like a ball, it bounces off a hippo's back in the waterhole, a giraffe catches it with its neck and brings
  it back — it cracks, a chick peeps out, the ostrich finally pulls its head out. Acacia, baobab, tall dry grass;
  ostrich, meerkats, giraffe, hippo, zebras, hornbills; the owl in the baobab's hollow. Events of B: a lion cub peeks
  out of the grass, an oxpecker on the hippo's back, the giraffe's tongue.
- **807 "The night watch"** (a farm under the moon, the owl the hero): a fox creeps to the henhouse, the owl hoots,
  the dog wakes and runs into a bucket, the fox is at the door — out steps the rooster in a nightcap; the fox flees
  through the corn, the owl blinks, pleased. Sunflowers, a cornfield, a haystack; fox, bats, fireflies, moths, a cow
  and a horse in the stable, a scarecrow, lanterns. A bright night (a big moon, warm windows) so small differences
  show. Events of B: a bat on a beam, a firefly on the fox's nose, a mouse out of the haystack.
- **808 "The runaway cheese"** (an alpine meadow): a goat butts a cheese wheel by the chalet, it rolls down the slope,
  chased by a cow with a bell and a marmot, bounces over a brook — an eagle catches it and drops it into the marmots'
  burrow. Larch, a spruce with cones, edelweiss, gentians; mountain goat, marmots, eagle, cow; the chalet with window
  boxes, snowy peaks; the owl under the chalet's roof. Events of B: a second marmot whistling at its burrow, a
  butterfly on the goat's horn, a pebble rolling from under its hooves.
- **809 "The pearl"** (a coral reef): an octopus finds a pearl and hides it in a shell, clownfish tease it, a shark
  swims up — a cloud of ink, and when it clears the shark wears shell "glasses"; meanwhile a crab has made off with
  the pearl. Corals, kelp, sea anemones in place of trees; octopus, clownfish, seahorse, shark, ray, jellyfish,
  bubbles and sunlight through the water; the owl on the mast of a sunken ship (in a diving mask). Events of B: a
  seahorse hiding in the kelp, a jellyfish drifting by, a fish peeking out of a chest.
- **810 "The penguin slide"** (the Arctic): penguins slide down an ice slope into the water one by one; the smallest
  is scared, runs up and gets stuck on the edge; a seal nudges it with its nose — it flies the farthest and lands on
  a sleeping polar bear's belly; the bear only smiles in its sleep. Ice floes, icebergs, hummocks, the northern
  lights; penguins, seal, polar bear, walrus, arctic foxes, a whale far off; a snowy owl drawn like the icon. Events
  of B: an arctic fox peeking from behind a hummock, a fish jumping out of an ice hole, the whale's spout.

## The plan of cartoons 14–20 (814–820), 12 differences each (all drawn on 2026-11-23)

Proposed and drawn on 2026-11-23, in parallel, one level file each, their trees and animals in their own files. Each: a 20 s story with one clear gag; 12 differences — 2 hard, 3 events of
B, 7 others (one recolour at most, the rest small changes of a part); every difference in a shot for 1.5–2 s or more;
the game's owl; places, plants and animals not used in 801–813; `ranges` grows to `[[801, 820]]` as they come.

- **814 "The mirage"** (a desert oasis): a thirsty camel plods to the oasis, drinks the pond dry in one long slurp —
  a fish left flapping, a frog sitting on the bare mud; it lies down happy, its humps swelling, then a sneeze
  sprays it all back. Date palms, saguaro and prickly-pear cacti, dunes; camel, fennec fox, lizard, tortoise,
  scorpion, vultures; the owl in a hole of the saguaro (an elf owl lives there). Events of B: a fennec's ears over a
  dune, the lizard licking its eye, a vulture landing on the palm.
- **815 "The bamboo catapult"** (a garden with a pagoda): a panda bends a bamboo stalk to reach the leaves at its top
  — lets go — the stalk flings it over the koi pond into a pile of leaves; a red panda takes the leaves, the panda
  chews the bamboo it is still holding. Bamboo grove, red maple, lotus, stone lanterns, a curved bridge; panda, red
  panda, koi, crane, mandarin ducks; the owl on the pagoda's roof. Events of B: a koi jumping, the crane on one leg,
  a dragonfly on the lantern.
- **816 "The flamingo's balance"** (a mangrove swamp): flamingos stand on one leg; the young one wobbles, hops, tips
  over the others like dominoes into the water; an alligator's eyes rise — and it only yawns; they get back up all
  on the other leg. Mangroves on their roots, water lilies, Spanish moss, reeds; flamingos, alligator, spoonbill,
  manatee, frogs, mosquitoes; the owl on a mossy branch. Events of B: a
  manatee's nose, a snake on a root, a crab under the roots.
- **817 "The joey's pouch"** (the Australian outback): a kangaroo hops along; from its pouch the joey throws out
  things it collected (a ball, a boomerang, a sock) — the boomerang comes back and knocks a koala's leaf off a
  eucalyptus; the koala, cross, drops a nut on the kangaroo; the joey pops it into the pouch, pleased. Eucalyptus,
  red rocks (an Uluru-like hill), spinifex grass, bottle tree; kangaroo, joey, koala, emu, wombat, cockatoos,
  platypus in a creek; the owl in a hollow eucalyptus. Events of B: a wombat out of its burrow, a frill-necked
  lizard spreading its frill, the platypus diving.
- **818 "The chimney sweep"** (rooftops of an old town): a cat stalks a pigeon along the ridge, pounces — the pigeon
  flies off and the cat drops down a chimney; out of the next chimney it comes black with soot, sneezes a cloud;
  the pigeons laugh on the TV aerial. Tiled roofs, chimneys, dormers, window boxes, an aerial, a weathervane, laundry
  between houses, a tower clock far off; cat, pigeons, sparrows, a crow; the owl by the clock face. Events of B: a
  mouse in a gutter, a sparrow on the aerial, a face in a dormer window (a cat's).
- **819 "The snail race"** (a meadow seen up close, tiny animals among giant flowers): a snail and a beetle race
  along a grass stalk; a ladybird is the starter; the beetle zooms off — and gets stuck in a dewdrop; the snail
  slides past on its slime and wins, a caterpillar cheering; it turns into a butterfly at the end. Giant daisies,
  clover, dandelion clocks, mushrooms, a dewy spider web, a pebble path; snail, beetle, ladybird, ants carrying a
  leaf, caterpillar, bee, grasshopper; a tiny owl figure: a moth with owl eyes on its wings (the icon's look). Events
  of B: a grasshopper leaping, an ant with a crumb, a spider coming down its thread.
- **820 "The beaver's dam"** (a northern river): a beaver finishes its dam with one last log; a moose comes to drink,
  steps on the dam — it gives way, the moose's antlers end up full of sticks; the beaver surfs on a log down the
  rapids and a salmon jumps over it; it starts building again in the moose's antlers. Paper birches and firs by the river,
  cattails, lily pads, a waterfall; beaver, moose, salmon, otter, loon, red squirrel; the owl (a great grey) on a dead tree. Events of B: an otter on its back cracking a shell, a loon
  diving, a salmon jumping the falls.

## The plan of cartoons 21–25 (821–825), 12 differences each (all drawn on 2026-11-23)

Proposed and drawn on 2026-11-23, in parallel, one level file each. Same rules as 814–820: a 20 s story with one clear gag; 12 differences — 2
hard, 3 events of B, 7 others (one recolour at most, the rest small changes of a part or a small object in A only);
every difference in a close shot for 1.5–2 s or more — let the story itself happen where the differences are (as
815's panda falling into the pond), rather than showing them only in the wide shot or a quick pan; the game's owl;
places, plants and animals not used in 801–820; `ranges` grows to `[[801, 825]]`.

- **821 "The windmill ride"** (tulip fields and a canal): a cat chases a butterfly up onto a windmill's sail — the
  sail turns and carries it round and round; dizzy, it lets go at the top, flies over the canal into the storks'
  nest on the roof (the stork glares), slides down the roof into a cart of tulips and comes out with a tulip on
  its head. Tulip rows in stripes of colour, the windmill, a canal with a little drawbridge and a barge, willows by
  the water; cat, storks, butterfly, cows in a meadow, ducks, coots; the owl in the windmill's cap
  window. Events of B: a duckling following the barge, a fish snapping at a fly, a stork chick peeping out.
- **822 "The rainy day"** (a forest in the rain): drops start falling; the animals run for the one big mushroom —
  a badger, a fox cub, a mole, a frog holding a leaf; they squeeze under it one after the other until the last, a
  plump wild-boar piglet, squeezes in and pops them all out into the puddles; the rain stops, a rainbow, and they all laugh.
  Rain streaks, puddles with rings, giant toadstools, ferns, an oak stump, moss, a woodpecker hole; badger, fox
  cub, mole, frog, boar piglet, dormouse, slugs, a woodpecker; the owl in a hollow, dry and smug. Events of B:
  a worm out of the wet ground, a beetle sheltering under a leaf, a bird shaking itself.
- **823 "The dragon's sneeze"** (a little castle with a moat at dusk, a festival): a baby dragon tries to light the
  lanterns along the wall for the feast — only smoke and sparks; a dandelion's fluff tickles its nose — a giant
  sneeze, and the fire goes up as fireworks over the castle; everyone below cheers, the dragon bows. Castle with
  towers, banners and a drawbridge, the moat with swans, torches, bunting, a market stall; baby dragon, swans,
  ravens on the battlements, a goat, castle cat, hens; the owl on a turret with a lantern. Events of B: a raven
  stealing a bun from the stall, a frog on the moat's lily pad, a firework shaped like a heart.
- **824 "The short arms"** (a prehistoric valley with a volcano): a young T-rex can't reach an apple-like fruit on
  a tree with its short arms — it jumps, stretches, wobbles; a long-necked dinosaur kindly lowers its head to help
  — and eats the fruit itself; the volcano puffs, a shake drops another fruit — right into the T-rex's open mouth.
  Tree ferns, cycads, horsetails, giant dragonflies, a smoking volcano, steaming springs; T-rex, brachiosaur,
  triceratops, pterosaurs, a small raptor-like dino, an armoured ankylosaur; the owl perched on a tree
  fern. Events of B: a baby triceratops peeking from the ferns, a pterosaur landing on a rock, an egg cracking in a
  nest.
- **825 "The circus seal"** (inside a big top): a seal balances a ball on its nose to a drumroll; a poodle on a
  unicycle wobbles past and bumps it; the ball bounces round the ring — off a sleeping lion's head, a drum, the
  trapeze — into a popcorn bucket, which flips and rains popcorn; the seal catches popcorn in its mouth and takes
  a bow. Striped tent, spotlights, a ring with stars, a trapeze, ladders, a drum, a popcorn stand; seal, poodle,
  lion, horse with a plume, parrot, mice in the stands; the owl on the ringmaster's top hat on its stand. Events
  of B: a mouse peeking from the drum, the parrot swinging on the trapeze, the lion opening one eye.

## The plan of cartoons 26–30 (826–830), 12 differences each (all drawn on 2026-11-23)

Proposed and drawn on 2026-11-23, in parallel, one level file each. Same rules as 821–825: a 20 s story with one clear gag; 12 differences — 2
hard, 3 events of B, 7 others (one recolour at most, the rest small changes of a part or a small object in A only);
the differences where the story happens, so the camera holds them close for 1.5–2 s or more; the game's owl; places,
plants and animals not used in 801–825; `ranges` grows to `[[801, 830]]`.

- **826 "The balloon goat"** (a hot-air balloon over patchwork fields): a goat stowed away in a balloon's basket
  nibbles the ropes of the sandbags one by one — each bag drops, the balloon jumps higher; geese in a V fly past
  and honk, a kestrel hovers; the last bag falls onto a haystack below, the balloon shoots up into a cloud and comes
  out with the goat chewing the cloud like candyfloss. Patchwork fields, hedgerows, a village with a church spire, a
  river with a stone bridge, sheep and cows like dots below; goat, geese, kestrel, swallows, sheep; the owl riding on
  the basket's rim. Events of B: a swallow perching on a rope, a sheep looking up below, a kite's string caught.
- **827 "The carrot tug"** (a meadow cut open: above the ground and the burrows below): a rabbit pulls at a carrot
  top; under the ground a mole has the root and pulls back — a tug of war, the rabbit's ears stretch, the mole's
  claws dig in; the carrot snaps, the rabbit flies back into a bush with the leaves, the mole tumbles down its
  tunnel with the root — and both munch happily. Grass and flowers above, soil layers, roots, stones, a buried bone,
  burrows and tunnels below; rabbit and kits, mole, earthworms, ants with eggs, a beetle larva, a field mouse's
  nest; the owl on a fence post above. Events of B: a worm poking out of the tunnel wall, an ant carrying a seed, a
  baby rabbit peeking from the burrow.
- **828 "The last carriage"** (a country station with a little steam train): the conductor — a dog — whistles,
  the train puffs off; a pig with a suitcase runs out of the waiting room too late, chases it along the platform,
  the suitcase bursts open, socks fly; a goose in the last carriage grabs the pig's collar and hauls it aboard; the
  socks land on the passengers. Station with a clock and a bench, signals, a water tower, a viaduct and a tunnel in
  the hills; dog, pig, goose, sheep passengers, a station cat, pigeons; the owl on the station clock. Events of B:
  a pigeon on the signal arm, a mouse in the mailbag, a lamb waving from a window.
- **829 "The moon picnic"** (on the Moon): a cat astronaut lands its little rocket, spreads a picnic, opens a can of
  fish — in the low gravity the fish floats up out of the can; it leaps after it in great slow bounces, a little
  alien in a crater catches the fish and offers it back — they share it, the Earth rising behind them. Craters, grey
  dust, rocks, the rocket with a ladder, a flag, stars, the Earth, a ringed planet; cat astronaut, little aliens,
  a moon-rover; the owl in a tiny space helmet on the rocket's nose. Events of B: a satellite passing, an alien's
  antenna popping out of a crater, a shooting star.
- **830 "The cake heist"** (a kitchen at night, seen at mouse height): mice build a ladder of spoons and a
  matchbox to climb to a cake on the table; the cat on the chair sleeps; the topmost mouse reaches the cherry — the
  ladder sways, topples; the mice land on the sleeping cat's back, it only purrs; they drag the cherry off to their
  hole. Table legs, a tablecloth hanging down, jars, a cookie tin, a teapot, a window with the moon, a clock; mice,
  the cat, a spider, a moth at the lamp; the owl outside on the window sill. Events of B: a mouse peeking from the
  cookie tin, the moth landing on the clock, the cat's whiskers twitching.

## How it was chosen

Two test levels tried two ways: a still camera on the usual board (the first "Cat at the pond") and a camera over a
larger world (`CartoonBoard`, "The stolen pie"). On a phone the camera won; the first was remade that way. Drawing was
compared too (developer mode, Settings → Development → "Animation benchmark", /dev/bench): SVG and Canvas 2D (the scene
taken apart into bitmaps, bench/layers.ts) play the same cartoon. On a Xiaomi 14T Pro Canvas 2D (and PixiJS, tried and
removed: a big library for the same speed) kept 120 fps where SVG kept ~110 — but Canvas needs ~1.5 s and ~97 MB to
prepare, so the game stays SVG unless a weak phone shows otherwise. Developer mode also shows a frame meter on every
level (`FpsMeter`: frames shown, the scene's redraws per second, the longest frame).
