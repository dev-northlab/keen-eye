<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import LevelId from '../components/LevelId.vue'
import ModalDialog from '../components/ModalDialog.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import StarRating from '../components/StarRating.vue'
import type { Level } from '../engine/types.ts'
import { DETECTIVE_CHAPTER } from '../levels/chapters.ts'
import { caseById, CASES, misfit } from '../levels/detective/cases.ts'
import { caseLevels } from '../levels/detective/index.ts'
import { SUSPECT_ART } from '../levels/detective/suspects.ts'
import { playSfx } from '../services/audio.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'

// One "detective" case (docs/detective-mode.md): its story, the scenes, the notebook of the clues
// found so far and the suspects. Once every scene is done the player names the culprit: a wrong
// guess shows a clue that does not fit that suspect (only "it does not fit" in a hard case) and costs a star of the case (docs/detective-difficulty.md),
// the right one the ending. Until then the player may cross suspects out as a note (no effect on the stars).

const props = defineProps<{ case: string }>()
const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()
const { t } = useI18n()

// The router guard guarantees the case exists.
const c = caseById(props.case)!
const scenes = caseLevels(c.id)
/** Picture A of every scene: the story's cover and the thumbnails of the scene list (no ids in them to clash). */
const thumbs = scenes.map((l) => l.build!(0).svg)
const cover = thumbs[0]
const nextCase = CASES[CASES.indexOf(c) + 1]

const locked = computed(() => progress.needsPurchase(scenes[0].id))
const done = computed(() => scenes.filter((l) => progress.isCompleted(l.id)))
const found = computed(() => done.value.flatMap((l) => l.detective!.clues))
const total = scenes.reduce((n, l) => n + l.differences.length, 0)
const canAccuse = computed(() => done.value.length === scenes.length)
const solved = computed(() => progress.isCaseSolved(c.id))
const stars = computed(() => progress.caseStarsOf(c.id))
/** The scene to begin the case with, offered by the empty notebook (a paid one opens the full-game offer). */
const startScene = computed(() => scenes.find((_, i) => states.value[i] === 'next' || states.value[i] === 'paid'))
/** The state of the case over the suspects: clues still to collect, ready to name the culprit, or solved. */
const status = computed(() => (solved.value ? 'solved' : canAccuse.value ? 'ready' : 'collecting'))
/** The "?" by the suspects' title shows how crossing out works. */
const tipOpen = ref(false)
const isRuled = (suspect: string) => progress.wrongGuesses(c.id).includes(suspect)
/** Crossed out by the player in the notebook (a note only); not once ruled out by a wrong guess or solved. */
const isStruck = (suspect: string) => !solved.value && !isRuled(suspect) && progress.isStruck(c.id, suspect)

/** The gentle hint after a wrong accusation: who, and (not in a hard case) a clue that does not fit them. */
const wrong = ref<{ suspect: string; clue?: string } | null>(null)
/** The ending dialog, right after the case is solved. */
const ending = ref(false)
/** The suspect the player tapped, asked to confirm: a wrong guess costs a star, a slip of the finger should not. */
const confirming = ref<string | null>(null)

const toParent = () => router.push({ name: 'detective' })
useBackButton(() => {
  if (confirming.value) confirming.value = null
  else if (ending.value) ending.value = false
  else toParent()
})

function ask(suspect: string) {
  if (canAccuse.value && !solved.value && !isRuled(suspect)) confirming.value = suspect
}

function confirmAccuse() {
  const suspect = confirming.value
  confirming.value = null
  if (suspect) accuse(suspect)
}

async function accuse(suspect: string) {
  if (!canAccuse.value || solved.value || isRuled(suspect)) return
  if (suspect !== c.culprit) {
    wrong.value = { suspect, clue: c.hard ? undefined : misfit(c, suspect, found.value) }
    playSfx('hint')
    await progress.guessWrong(c.id, suspect)
    return
  }
  wrong.value = null
  await progress.solveCase(c.id)
  ending.value = true
  playSfx('star', 2)
}

function open(level: Level) {
  if (progress.needsPurchase(level.id)) purchase.dialogOpen = true
  else if (progress.isUnlocked(level.id)) router.push({ name: 'level', params: { id: level.id } })
  else progress.showLocked(level.id)
}

/** A scene's place on the case's trail: won, the one to play now, not reached yet, or waiting for the purchase. */
const states = computed(() =>
  scenes.map((l) =>
    progress.needsPurchase(l.id) ? 'paid' : !progress.isUnlocked(l.id) ? 'locked' : progress.isCompleted(l.id) ? 'done' : 'next',
  ),
)

/** Paid scenes open the full-game dialog; scenes not reached yet look disabled and say which scene opens them. */
function sceneLabel(level: Level, n: number) {
  const state = progress.needsPurchase(level.id) ? t('map.paid') : progress.isUnlocked(level.id) ? '' : t('map.locked')
  return [t('map.level', { n }), t(`levelTitles.${level.title}`), state].filter(Boolean).join(': ')
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop :theme="DETECTIVE_CHAPTER.backdrop" />
    <main>
      <section class="story">
        <svg class="cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" v-html="cover" />
        <h1>{{ $t(`detective.cases.${c.id}.title`) }}</h1>
        <p>{{ $t(`detective.cases.${c.id}.intro`) }}</p>
      </section>

      <button v-if="locked" class="offer" @click="purchase.dialogOpen = true">
        <span>{{ $t('detective.paid') }}</span>
        <strong>{{ $t('detective.unlock') }}</strong>
      </button>

      <h2>{{ $t('detective.scenes') }}</h2>
      <ol class="scenes">
        <li v-for="(level, i) in scenes" :key="level.id" :class="{ walked: states[i] === 'done' }">
          <button
            class="scene"
            :class="states[i]"
            :aria-disabled="states[i] === 'locked'"
            :aria-label="sceneLabel(level, i + 1)"
            @click="open(level)"
          >
            <LevelId :id="level.id" />
            <span class="num">
              <svg v-if="states[i] === 'done'" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 12.5l4 4L18 8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="thumb">
              <svg class="shot" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" v-html="thumbs[i]" />
              <span v-if="states[i] === 'locked' || states[i] === 'paid'" class="seal" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7.6 11V8.2a4.4 4.4 0 0 1 8.8 0V11" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" />
                  <rect x="4.6" y="10.2" width="14.8" height="11" rx="3.2" fill="#fff" />
                  <circle cx="12" cy="15.2" r="1.7" fill="currentColor" />
                </svg>
              </span>
            </span>
            <span class="text">
              <span class="title">{{ $t(`levelTitles.${level.title}`) }}</span>
              <StarRating v-if="states[i] === 'done'" :stars="progress.records[level.id]?.stars ?? 0" :size="15" />
              <span v-else class="state">
                {{ states[i] === 'next' ? $t('home.play') : states[i] === 'locked' ? $t('map.locked') : $t('map.paid') }}
              </span>
            </span>
            <span v-if="states[i] === 'next'" class="play" aria-hidden="true">
              <svg class="flip-rtl" viewBox="0 0 24 24"><path d="M9 6.5v11l9-5.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /></svg>
            </span>
          </button>
        </li>
      </ol>

      <h2>{{ $t('detective.notebook') }}</h2>
      <!-- A spiral notebook: progress of the clues, then a page section per scene — its clues once the scene is
           won, else blurred lines waiting for them. -->
      <div class="notebook">
        <span class="rings" aria-hidden="true" />
        <p v-if="found.length" class="progress">
          <svg class="glass" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.6" />
            <path d="M14.5 14.5L20 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
          <!-- No numbers on the page, to keep the mystery; screen readers still hear them. -->
          <span
            class="bar"
            role="progressbar"
            aria-valuemin="0"
            :aria-valuemax="total"
            :aria-valuenow="found.length"
            :aria-valuetext="$t('detective.clues', { n: found.length, total })"
            :aria-label="$t('detective.notebook')"
          >
            <span :style="{ width: `${(found.length / total) * 100}%` }" />
          </span>
        </p>
        <div v-if="done.length === 0" class="start">
          <svg class="big-glass" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="27" cy="27" r="17" fill="#fffaf0" fill-opacity="0.7" stroke="#a8743f" stroke-width="6" />
            <path d="M20 22a9 9 0 0 1 9-7" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
            <path d="M40 40l14 14" stroke="#7a4f24" stroke-width="9" stroke-linecap="round" />
          </svg>
          <p>{{ $t('detective.noClues') }}</p>
          <button v-if="startScene" @click="open(startScene)">
            <svg class="flip-rtl" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5v11l9-5.5Z" fill="currentColor" /></svg>
            {{ $t('detective.startWith', { title: $t(`levelTitles.${startScene.title}`) }) }}
          </button>
        </div>
        <section v-for="(level, i) in scenes" :key="level.id" class="page" :class="{ found: states[i] === 'done' }">
          <p class="page-title">
            <span>{{ i + 1 }}. {{ $t(`levelTitles.${level.title}`) }}</span>
            <svg v-if="states[i] === 'done'" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 12.5l4 4L18 8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </p>
          <ul v-if="states[i] === 'done'" class="clues">
            <li v-for="clue in level.detective!.clues" :key="clue">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.6" />
                <path d="M14.5 14.5L20 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
              {{ $t(`detective.clueTexts.${clue}`) }}
            </li>
          </ul>
          <template v-else>
            <p class="waiting">{{ $t('detective.cluesWaiting') }}</p>
            <span v-for="w in [86, 62]" :key="w" class="ghost" :style="{ width: `${w}%` }" aria-hidden="true" />
          </template>
        </section>
      </div>

      <h2>
        {{ $t('detective.suspectsTitle') }}
        <button v-if="!solved" class="help" :aria-expanded="tipOpen" :aria-label="$t('detective.crossOutHelp')" @click="tipOpen = !tipOpen">?</button>
      </h2>
      <p v-if="!solved && tipOpen" class="note">{{ $t('detective.crossOutHint') }}</p>
      <!-- Where the case stands: collecting clues (accusing waits), ready to name the culprit, or solved. -->
      <div class="status" :class="status" role="status">
        <span class="status-icon" aria-hidden="true">
          <svg v-if="status === 'collecting'" viewBox="0 0 24 24">
            <path d="M7.6 11V8.2a4.4 4.4 0 0 1 8.8 0V11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
            <rect x="4.6" y="10.2" width="14.8" height="11" rx="3.2" fill="currentColor" />
          </svg>
          <svg v-else-if="status === 'ready'" viewBox="0 0 24 24">
            <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2.6" />
            <path d="M14.5 14.5L20 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <path d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8Z" fill="currentColor" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="status-text">
          <strong>{{ solved ? $t('detective.solved') : canAccuse ? $t('detective.whoDidIt') : $t('detective.findAll') }}</strong>
        </span>
        <StarRating v-if="solved" :stars="stars" :size="18" />
      </div>
      <ul class="suspects">
        <li v-for="s in c.suspects" :key="s" :class="{ struck: isStruck(s) }">
          <button
            class="suspect"
            :class="{ culprit: solved && s === c.culprit, ruled: isRuled(s) }"
            :disabled="!canAccuse || solved || isRuled(s)"
            :aria-label="$t('detective.accuse', { suspect: $t(`detective.suspects.${s}`) })"
            @click="ask(s)"
          >
            <!-- A pushpin holds the poster on the board. -->
            <svg class="pin" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 16v6" stroke="#8d8d8d" stroke-width="2" stroke-linecap="round" />
              <circle cx="12" cy="10" r="7" />
              <circle cx="9.6" cy="7.6" r="2.3" fill="#fff" fill-opacity="0.55" />
            </svg>
            <span class="frame">
              <svg viewBox="0 0 64 64" aria-hidden="true" v-html="SUSPECT_ART[s]" />
            </span>
            <span class="name">{{ $t(`detective.suspects.${s}`) }}</span>
            <!-- Crossed out by the player: two strokes of a red marker over the photo. -->
            <svg v-if="isStruck(s)" class="marker" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M16 18Q48 50 84 84" />
              <path d="M84 16Q50 48 18 86" />
            </svg>
            <!-- A wrong guess cleared them: an "alibi" check stamp. -->
            <span v-if="isRuled(s)" class="alibi" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 12.5l4 4L18 8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <span v-if="solved && s === c.culprit" class="stamp" aria-hidden="true">{{ $t('detective.solvedTitle') }}</span>
          </button>
          <button
            v-if="!solved && !isRuled(s)"
            class="strike"
            :aria-pressed="isStruck(s)"
            :aria-label="$t('detective.crossOut', { suspect: $t(`detective.suspects.${s}`) })"
            @click="progress.toggleStruck(c.id, s)"
          >
            <span class="dot">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
            </span>
          </button>
        </li>
      </ul>
      <p v-if="wrong" class="wrong" role="status">
        <template v-if="wrong.clue">
          {{ $t('detective.wrong', { suspect: $t(`detective.suspects.${wrong.suspect}`), clue: $t(`detective.clueTexts.${wrong.clue}`) }) }}
        </template>
        <template v-else>{{ $t('detective.wrongHard', { suspect: $t(`detective.suspects.${wrong.suspect}`) }) }}</template>
      </p>
      <p v-if="solved" class="ending">{{ $t(`detective.cases.${c.id}.ending`) }}</p>
    </main>
    <BackButton :on-back="toParent" />

    <ModalDialog v-if="confirming" :title="$t('detective.accuse', { suspect: $t(`detective.suspects.${confirming}`) })">
      <svg class="portrait" viewBox="0 0 64 64" aria-hidden="true" v-html="SUSPECT_ART[confirming]" />
      <p>{{ $t('detective.accuseSure') }}</p>
      <!-- Cancel comes first: the dialog focuses its first button. -->
      <div class="confirm">
        <button class="secondary" @click="confirming = null">{{ $t('common.cancel') }}</button>
        <button @click="confirmAccuse">{{ $t('detective.accuseYes') }}</button>
      </div>
    </ModalDialog>

    <ModalDialog v-if="ending" :title="$t('detective.solvedTitle')">
      <svg class="portrait" viewBox="0 0 64 64" aria-hidden="true" v-html="SUSPECT_ART[c.culprit]" />
      <p>{{ $t(`detective.cases.${c.id}.ending`) }}</p>
      <StarRating class="reward-stars" :stars="stars" :size="32" animated />
      <p class="reward">{{ $t('detective.reward') }}</p>
      <div class="actions">
        <button v-if="nextCase" @click="router.push({ name: 'case', params: { case: nextCase.id } })">{{ $t('detective.nextCase') }}</button>
        <button class="secondary" @click="ending = false">{{ $t('common.close') }}</button>
      </div>
    </ModalDialog>
  </div>
</template>

<style scoped>
.screen {
  /* Own stacking context: the backdrop (z-index -1) stays behind the content. */
  position: relative;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  overflow-y: auto;
  /* A centered column on wide screens; the padding (not a margin) keeps the scrollbar at the window edge. */
  padding: 16px max(16px, (100% - var(--menu-width)) / 2) 24px;
}

.story,
.ending,
.wrong {
  border-radius: 16px;
  background: var(--panel);
}

.story {
  overflow: hidden;
}

.cover {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
}

.story h1 {
  margin: 12px 14px 4px;
  font-size: 22px;
}

.story p {
  margin: 0 14px 14px;
  line-height: 1.45;
}

/* Section titles lie over the backdrop picture: a glass strip keeps them readable on any part of it. */
h2 {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin: 20px 0 8px;
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--glass);
  font-size: 18px;
}

.offer {
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: start;
  background: var(--gold-bg);
  color: var(--gold-fg);
  border: 2px solid #f5b301;
}

.offer strong {
  flex: none;
  padding: 6px 12px;
  border-radius: 999px;
  background: #f5b301;
  color: #3b2a00;
}

.scenes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

/* The case's trail: a dotted path from each scene's number down to the next one, green where it is walked. */
.scenes li {
  position: relative;
}

.scenes li:not(:last-child)::after {
  content: '';
  position: absolute;
  inset-inline-start: 29px;
  bottom: -12px;
  width: 4px;
  height: 12px;
  background: radial-gradient(circle, var(--line) 1.6px, transparent 2px) 0 0 / 4px 6px repeat-y;
}

.scenes li.walked:not(:last-child)::after {
  background-image: radial-gradient(circle, var(--accent) 1.6px, transparent 2px);
}

.scene {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  text-align: start;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  border-radius: 18px;
  position: relative;
  box-shadow: 0 6px 14px -10px rgb(0 0 0 / 0.45);
  transition: transform 0.12s;
}

.scene:not([aria-disabled='true']):active {
  transform: scale(0.98);
}

.scene.done {
  border-color: var(--accent);
}

/* The scene to play now stands out: a green ring round the card. */
.scene.next {
  border-color: var(--accent);
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent),
    0 8px 18px -10px rgb(0 0 0 / 0.5);
}

.scene.paid {
  background: var(--gold-bg);
  border-color: #f5b301;
  color: var(--gold-fg);
}

.scene.locked {
  background: color-mix(in srgb, var(--panel) 82%, var(--disabled-bg));
  color: var(--muted);
  box-shadow: none;
  cursor: default;
}

.num {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--soft);
  color: var(--fg);
  font-weight: 800;
}

.done .num,
.next .num {
  background: var(--accent);
  color: #fff;
}

.num svg {
  width: 20px;
  height: 20px;
}

.thumb {
  flex: none;
  position: relative;
  width: 88px;
  height: 55px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--soft);
  box-shadow:
    0 0 0 2px #fff,
    0 4px 10px -4px rgb(0 0 0 / 0.5);
}

.shot {
  display: block;
  width: 100%;
  height: 100%;
}

/* A scene not reached yet: its picture faded behind frosted glass, sealed with a red padlock. */
.locked .shot,
.paid .shot {
  filter: grayscale(0.9) blur(1.5px);
  opacity: 0.6;
}

.seal {
  position: absolute;
  inset: 0;
  margin: auto;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffb3ad, #f0545a 45%, #b8262c);
  color: #d63a40;
  box-shadow:
    0 0 0 2px #fff,
    0 3px 8px -2px rgb(150 20 30 / 0.6);
}

.paid .seal {
  background: radial-gradient(circle at 35% 30%, #fff3b0, #ffc531 45%, #e09a00);
  color: #c98a00;
  box-shadow:
    0 0 0 2px #fff,
    0 3px 8px -2px rgb(160 100 0 / 0.6);
}

.seal svg {
  width: 20px;
  height: 20px;
}

.text {
  flex: 1;
  min-width: 0;
  display: grid;
  justify-items: start;
  gap: 2px;
}

.scene .title {
  font-size: 17px;
  font-weight: 700;
}

.state {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}

.next .state {
  color: var(--accent);
}

.paid .state {
  color: inherit;
}

.play {
  flex: none;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 0 color-mix(in srgb, var(--accent) 60%, #000);
}

.play svg {
  width: 22px;
  height: 22px;
}

/* The detective's notebook: paper with a red margin line, held by a spiral of rings along the top. */
.notebook {
  position: relative;
  display: grid;
  gap: 4px;
  margin-top: 14px;
  padding: 20px 16px 14px;
  padding-inline-start: 34px;
  border-radius: 10px;
  background:
    linear-gradient(to right, transparent 22px, rgb(229 72 77 / 0.45) 22px 24px, transparent 24px) no-repeat,
    var(--paper);
  color: var(--paper-ink);
  box-shadow:
    inset 0 0 0 1px var(--paper-edge),
    0 12px 20px -14px rgb(0 0 0 / 0.6);
}

[dir='rtl'] .notebook {
  background:
    linear-gradient(to left, transparent 22px, rgb(229 72 77 / 0.45) 22px 24px, transparent 24px) no-repeat,
    var(--paper);
}

.rings {
  position: absolute;
  top: -9px;
  left: 18px;
  right: 18px;
  height: 18px;
  background: radial-gradient(circle, transparent 3.5px, #8b8f96 4px 6px, transparent 6.5px) 0 0 / 22px 18px space no-repeat;
  filter: drop-shadow(0 1px 0 rgb(0 0 0 / 0.25));
}

.progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
}

.glass {
  flex: none;
  width: 20px;
  height: 20px;
  color: #a8743f;
}

.bar {
  flex: 1;
  height: 10px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--paper-ink) 14%, var(--paper));
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #f5b301, #e58a00);
  transition: width 0.6s ease-out;
}

/* No clues yet: a big magnifying glass and a button straight into the first scene. */
.start {
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 6px 0 12px;
  text-align: center;
}

.start p {
  margin: 0;
  line-height: 1.4;
}

.big-glass {
  width: 64px;
  height: 64px;
  animation: search 3s ease-in-out infinite;
}

.start button {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  box-shadow: 0 4px 0 color-mix(in srgb, var(--accent) 60%, #000);
}

.start button svg {
  width: 18px;
  height: 18px;
}

.page {
  padding: 8px 0 6px;
  border-top: 1px dashed var(--paper-edge);
}

.page-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--paper-ink) 65%, var(--paper));
}

.found .page-title {
  color: var(--paper-ink);
}

.page-title svg {
  width: 18px;
  height: 18px;
  color: var(--accent);
}

.clues {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
}

.clues li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 15px;
  line-height: 1.35;
}

.clues svg {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: #a8743f;
}

.waiting {
  margin: 0 0 4px;
  font-size: 13px;
  font-style: italic;
  color: color-mix(in srgb, var(--paper-ink) 55%, var(--paper));
}

/* Clues not found yet: blurred lines of writing. */
.ghost {
  display: block;
  height: 9px;
  margin: 7px 0;
  border-radius: 5px;
  background: color-mix(in srgb, var(--paper-ink) 13%, var(--paper));
  filter: blur(0.6px);
}

/* Where the case stands, over the suspects. */
.status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 14px;
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--panel);
  line-height: 1.35;
}

.status-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--soft);
  color: var(--muted);
}

.status-icon svg {
  width: 24px;
  height: 24px;
}

.status-text {
  flex: 1;
  display: grid;
  gap: 2px;
}

.status-text strong {
  font-weight: 600;
}

/* Every scene done: a bright banner breathing to call for the accusation. */
.status.ready {
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #0b4f8a));
  color: #fff;
  animation: breathe 2.2s ease-in-out infinite;
}

.ready .status-icon {
  background: rgb(255 255 255 / 0.22);
  color: #fff;
}

.status.solved {
  background: var(--gold-bg);
  color: var(--gold-fg);
}

.solved .status-icon {
  background: #ffc531;
  color: #fff;
}

.solved .status-text strong {
  font-weight: 800;
}

.help {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  background: var(--soft);
  color: var(--fg);
  font-weight: 800;
}

.help[aria-expanded='true'] {
  background: var(--accent);
  color: #fff;
}

@keyframes search {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(6px, -3px) rotate(8deg);
  }
}

@keyframes breathe {
  0%,
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 45%, transparent);
  }
  50% {
    box-shadow: 0 0 0 8px color-mix(in srgb, var(--accent) 0%, transparent);
  }
}

.ending,
.wrong {
  margin: 0 0 10px;
  padding: 10px 14px;
  line-height: 1.4;
}

.wrong {
  margin-top: 10px;
  background: var(--danger-bg);
  color: var(--danger-fg);
}

.ending {
  margin-top: 10px;
  border: 2px solid var(--accent);
}

.suspects {
  list-style: none;
  padding: 8px 0 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 12px;
}

@media (min-width: 560px) {
  .suspects {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Posters pinned a little askew, each its own way. */
.suspects li {
  position: relative;
  rotate: -1.6deg;
}

.suspects li:nth-child(4n + 2) {
  rotate: 1.4deg;
}

.suspects li:nth-child(4n + 3) {
  rotate: 1deg;
}

.suspects li:nth-child(4n) {
  rotate: -1.2deg;
}

.suspect {
  position: relative;
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 22px 10px 14px;
  border-radius: 6px;
  background: var(--paper);
  color: var(--paper-ink);
  box-shadow:
    inset 0 0 0 1px var(--paper-edge),
    0 2px 4px -2px rgb(0 0 0 / 0.3),
    0 12px 18px -12px rgb(0 0 0 / 0.6);
  font-weight: 700;
  transition: transform 0.12s;
}

.suspect:not(:disabled):active {
  transform: scale(0.97);
}

.suspect:disabled {
  cursor: default;
}

.pin {
  position: absolute;
  top: -9px;
  left: 50%;
  translate: -50% 0;
  width: 26px;
  height: 26px;
  fill: var(--danger);
  filter: drop-shadow(0 2px 1px rgb(0 0 0 / 0.35));
}

/* The photo: a white print with a thin border. */
.frame {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  padding: 4px;
  border-radius: 6px;
  background: #fffaf0;
  box-shadow:
    0 0 0 2px var(--paper-edge),
    0 3px 6px -3px rgb(0 0 0 / 0.4);
}

.frame svg {
  width: 100%;
  height: 100%;
}

.name {
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
}

.struck .frame svg {
  opacity: 0.45;
}

.struck .name {
  text-decoration: line-through 2px #e5484d;
}

.marker {
  position: absolute;
  top: 18px;
  left: 50%;
  translate: -50% 0;
  width: 96px;
  height: 96px;
  pointer-events: none;
}

.marker path {
  fill: none;
  stroke: #e5484d;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 140;
  animation: draw 0.3s ease-out both;
}

.marker path + path {
  animation-delay: 0.18s;
}

/* Cleared by a wrong guess: a faded poster with a round "alibi" stamp. */
.suspect.ruled {
  background: color-mix(in srgb, var(--paper) 50%, var(--panel));
  color: var(--muted);
}

.ruled .frame {
  filter: grayscale(1);
  opacity: 0.6;
}

.ruled .pin {
  fill: #9a9a9a;
}

.alibi {
  position: absolute;
  top: 70px;
  inset-inline-end: calc(50% - 50px);
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 3px solid var(--alibi);
  color: var(--alibi);
  background: color-mix(in srgb, var(--paper) 70%, transparent);
  rotate: 12deg;
}

.alibi svg {
  width: 20px;
  height: 20px;
}

.suspect.culprit {
  box-shadow:
    inset 0 0 0 1px var(--paper-edge),
    0 0 0 3px #e5484d,
    0 12px 18px -12px rgb(0 0 0 / 0.6);
}

/* The culprit, once named: a red rubber stamp lands over the photo. */
.stamp {
  position: absolute;
  top: 38px;
  left: 50%;
  max-width: 92%;
  padding: 3px 8px;
  border: 3px double #d63a40;
  border-radius: 6px;
  background: color-mix(in srgb, var(--paper) 55%, transparent);
  color: #d63a40;
  font-size: 13px;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  translate: -50% 0;
  rotate: -12deg;
  animation: stamp 0.45s cubic-bezier(0.3, 1.5, 0.5, 1) 0.2s both;
}

@keyframes draw {
  from {
    stroke-dashoffset: 140;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes stamp {
  from {
    scale: 2.2;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}

/* The player's own note: cross a suspect out, or bring them back. A finger-sized (48 px) touch area in the card's
   corner around a smaller drawn circle, so a tap meant for it never lands on the card (an accusation). */
.strike {
  position: absolute;
  top: 0;
  inset-inline-end: 0;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
  background: none;
}

.dot {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--paper-ink) 12%, var(--paper));
  color: var(--paper-ink);
}

.dot svg {
  width: 16px;
  height: 16px;
}

.strike[aria-pressed='true'] .dot {
  background: var(--danger);
  color: #fff;
}

.note {
  margin: 0 0 10px;
  padding: 8px 14px;
  border-radius: 16px;
  background: var(--panel);
  font-size: 14px;
  line-height: 1.4;
  color: var(--muted);
}

.portrait {
  width: 96px;
  height: 96px;
}

.reward {
  text-align: center;
  font-weight: 700;
}

.reward-stars {
  display: grid;
}

.confirm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
</style>
