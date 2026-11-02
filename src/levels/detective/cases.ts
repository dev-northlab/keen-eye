// "Detective" cases (docs/detective-mode.md): suspects, the culprit and which suspects each clue fits.
// Texts: detective.cases.<id>.{title,intro,ending}, detective.suspects.<suspect>, detective.clueTexts.<clue>.

export interface DetectiveCase {
  id: string
  /** Suspect ids (i18n detective.suspects.<id>, portraits in suspects.ts). */
  suspects: string[]
  culprit: string
  /** Every clue of the case's scenes → the suspects it fits. Only the culprit fits all of them. */
  fits: Record<string, string[]>
}

function detectiveCase(id: string, suspects: string[], culprit: string, fits: Record<string, string[] | 'all'>): DetectiveCase {
  return { id, suspects, culprit, fits: Object.fromEntries(Object.entries(fits).map(([clue, who]) => [clue, who === 'all' ? suspects : who])) }
}

export const CASES: DetectiveCase[] = [
  // Paw prints and fur rule out the people; big muddy tracks rule out the cat.
  detectiveCase('cake', ['cat', 'cook', 'neighbour', 'dog'], 'dog', {
    cakeGone: 'all',
    pawPrints: ['cat', 'dog'],
    windowOpen: 'all',
    stoolTipped: 'all',
    creamDrops: 'all',
    holeDug: ['cat', 'dog'],
    gateOpen: 'all',
    bigTracks: ['neighbour', 'dog'],
    tulipsTrampled: 'all',
    doily: 'all',
    furOnSofa: ['cat', 'dog'],
    lowScratches: ['cat', 'dog'],
    rugFolded: 'all',
    lampCrooked: 'all',
    creamOnCushion: 'all',
    crumbs: 'all',
    boxOpen: 'all',
    chewedSlipper: ['dog'],
    cobwebTorn: 'all',
    bowlFull: ['dog'],
    candleByDoghouse: ['cat', 'dog'],
    neighbourBoots: ['cat', 'cook', 'dog'],
    fenceGap: ['cat', 'dog'],
    creamOnDoghouse: ['dog'],
  }),
  // The way in was from above and shiny things vanished too: neither the mouse nor the shopkeeper
  // (he slept all night); the paperboy's bike stayed chained up, so he had not come yet.
  detectiveCase('cheese', ['mouse', 'shopkeeper', 'crow', 'paperboy'], 'crow', {
    cheeseGone: 'all',
    skylightOpen: ['crow', 'paperboy'],
    doorPadlock: 'all',
    coinsGone: ['crow', 'paperboy'],
    scalesTipped: 'all',
    crumbsTopShelf: 'all',
    peckMarks: ['crow'],
    feather: ['crow'],
    barrelTipped: 'all',
    windowOpen: 'all',
    trapUntouched: ['shopkeeper', 'crow', 'paperboy'],
    sackSpilled: 'all',
    bikeChained: ['mouse', 'shopkeeper', 'crow'],
    roofCrumbs: ['crow', 'paperboy'],
    birdTracks: ['crow'],
    awningTorn: 'all',
    curtainsDrawn: ['mouse', 'crow', 'paperboy'],
    potTipped: 'all',
    corkedHole: ['shopkeeper', 'crow', 'paperboy'],
    spoonGone: ['crow', 'paperboy'],
    bottleFallen: 'all',
    candleOut: 'all',
    cobwebTorn: 'all',
    shinyNest: ['crow'],
    cheeseRind: ['crow', 'paperboy'],
    antennaBent: ['crow', 'paperboy'],
    weatherVane: 'all',
    brickFallen: 'all',
    coinInGutter: ['crow', 'paperboy'],
  }),
  // Sneaker prints rule out the keeper and the parrot (the window was shut); the cleaner's bucket
  // gathered cobwebs all day; the strap, the selfie stick and the backpack belong to the tourist.
  detectiveCase('vase', ['keeper', 'tourist', 'parrot', 'cleaner'], 'tourist', {
    vaseGone: 'all',
    shards: 'all',
    ropeDown: 'all',
    sneakerPrints: ['tourist', 'cleaner'],
    paintingCrooked: 'all',
    mapDropped: ['keeper', 'tourist'],
    spotlightOff: 'all',
    lensCap: ['keeper', 'tourist'],
    windowShut: ['keeper', 'tourist', 'cleaner'],
    cameraTurned: 'all',
    plantTipped: 'all',
    gumWrapper: ['keeper', 'tourist', 'cleaner'],
    keyGone: ['keeper', 'tourist', 'cleaner'],
    brochuresGone: 'all',
    bucketCobweb: ['keeper', 'tourist', 'parrot'],
    glueGone: ['keeper', 'tourist', 'cleaner'],
    boxOpen: 'all',
    strapOnNail: ['tourist'],
    tapeUnrolled: 'all',
    bulbOff: 'all',
    selfieStick: ['tourist'],
    ticketStub: ['keeper', 'tourist'],
    fountainOff: 'all',
    pigeonsGone: 'all',
    shardsUnderBench: 'all',
    lunchBox: ['tourist', 'parrot', 'cleaner'],
    balloonInTree: 'all',
    postcardsSold: 'all',
    glueReceipt: ['keeper', 'tourist', 'cleaner'],
    glueSmear: ['keeper', 'tourist', 'cleaner'],
    backpack: ['tourist'],
    miniVaseGone: 'all',
    umbrellaGone: 'all',
    cashOpen: ['keeper', 'tourist', 'cleaner'],
  }),
]

export const caseById = (id: string) => CASES.find((c) => c.id === id)

/** The first of `clues` that does not fit `suspect` (the gentle hint after a wrong accusation). */
export const misfit = (c: DetectiveCase, suspect: string, clues: string[]) => clues.find((clue) => !c.fits[clue]?.includes(suspect))
