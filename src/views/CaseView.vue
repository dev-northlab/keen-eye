<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import ClueList from '../components/ClueList.vue'
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
// guess shows a clue that does not fit that suspect (no penalty), the right one the ending.

const props = defineProps<{ case: string }>()
const router = useRouter()
const purchase = usePurchaseStore()
const progress = useProgressStore()
const { t } = useI18n()

// The router guard guarantees the case exists.
const c = caseById(props.case)!
const scenes = caseLevels(c.id)
const cover = scenes[0].build!(0).svg
const nextCase = CASES[CASES.indexOf(c) + 1]

const locked = computed(() => progress.needsPurchase(scenes[0].id))
const done = computed(() => scenes.filter((l) => progress.isCompleted(l.id)))
const found = computed(() => done.value.flatMap((l) => l.detective!.clues))
const total = scenes.reduce((n, l) => n + l.differences.length, 0)
const canAccuse = computed(() => done.value.length === scenes.length)
const solved = computed(() => progress.isCaseSolved(c.id))

/** The gentle hint after a wrong accusation: who, and a clue that does not fit them. */
const wrong = ref<{ suspect: string; clue: string } | null>(null)
/** The ending dialog, right after the case is solved. */
const ending = ref(false)

const toParent = () => router.push({ name: 'detective' })
useBackButton(() => (ending.value ? (ending.value = false) : toParent()))

async function accuse(suspect: string) {
  if (!canAccuse.value || solved.value) return
  if (suspect !== c.culprit) {
    wrong.value = { suspect, clue: misfit(c, suspect, found.value)! }
    playSfx('hint')
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
}

/** Paid scenes stay tappable (they open the full-game dialog); scenes not reached yet are disabled. */
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

      <button v-if="locked" class="paid" @click="purchase.dialogOpen = true">
        <span>{{ $t('detective.paid') }}</span>
        <strong>{{ $t('detective.unlock') }}</strong>
      </button>

      <h2>{{ $t('detective.scenes') }}</h2>
      <ol class="scenes">
        <li v-for="(level, i) in scenes" :key="level.id">
          <button
            class="scene"
            :class="{ done: progress.isCompleted(level.id), paid: progress.needsPurchase(level.id) }"
            :disabled="!progress.isUnlocked(level.id) && !progress.needsPurchase(level.id)"
            :aria-label="sceneLabel(level, i + 1)"
            @click="open(level)"
          >
            <LevelId :id="level.id" />
            <span class="num">{{ i + 1 }}</span>
            <span class="title">{{ $t(`levelTitles.${level.title}`) }}</span>
            <span v-if="!progress.isUnlocked(level.id)" class="lock" aria-hidden="true">🔒</span>
            <StarRating v-else :stars="progress.records[level.id]?.stars ?? 0" :hard="progress.hardStars(level.id)" :size="14" />
          </button>
        </li>
      </ol>

      <h2>
        {{ $t('detective.notebook') }}
        <span class="count">{{ $t('detective.clues', { n: found.length, total }) }}</span>
      </h2>
      <div class="notebook">
        <p v-if="done.length === 0" class="empty">{{ $t('detective.noClues') }}</p>
        <ClueList v-for="level in done" :key="level.id" :title="$t(`levelTitles.${level.title}`)" :clues="level.detective!.clues" />
      </div>

      <h2>{{ $t('detective.suspectsTitle') }}</h2>
      <p class="ask">{{ solved ? $t('detective.solved') : canAccuse ? $t('detective.whoDidIt') : $t('detective.findAll') }}</p>
      <ul class="suspects">
        <li v-for="s in c.suspects" :key="s">
          <button
            class="suspect"
            :class="{ culprit: solved && s === c.culprit, ruled: wrong?.suspect === s }"
            :disabled="!canAccuse || solved"
            :aria-label="$t('detective.accuse', { suspect: $t(`detective.suspects.${s}`) })"
            @click="accuse(s)"
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" v-html="SUSPECT_ART[s]" />
            <span>{{ $t(`detective.suspects.${s}`) }}</span>
          </button>
        </li>
      </ul>
      <p v-if="wrong" class="wrong" role="status">
        {{ $t('detective.wrong', { suspect: $t(`detective.suspects.${wrong.suspect}`), clue: $t(`detective.clueTexts.${wrong.clue}`) }) }}
      </p>
      <p v-if="solved" class="ending">{{ $t(`detective.cases.${c.id}.ending`) }}</p>
    </main>
    <BackButton :on-back="toParent" />

    <ModalDialog v-if="ending" :title="$t('detective.solvedTitle')">
      <svg class="portrait" viewBox="0 0 64 64" aria-hidden="true" v-html="SUSPECT_ART[c.culprit]" />
      <p>{{ $t(`detective.cases.${c.id}.ending`) }}</p>
      <p class="reward"><span class="star" aria-hidden="true">★</span> {{ $t('detective.reward') }}</p>
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
.notebook,
.ask,
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

h2 {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin: 20px 4px 8px;
  font-size: 18px;
}

.count {
  font-size: 14px;
  font-weight: 600;
  color: var(--muted);
}

.paid {
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

.paid strong {
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
  gap: 8px;
}

.scene {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  text-align: start;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  position: relative;
}

.scene.done {
  border-color: var(--accent);
}

.scene.paid {
  background: var(--gold-bg);
  border-color: #f5b301;
  color: var(--gold-fg);
}

.scene:disabled {
  background: var(--disabled-bg);
  color: var(--faint);
  cursor: default;
}

.num {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--soft);
  color: var(--fg);
  font-weight: 700;
}

.scene .title {
  flex: 1;
  font-weight: 600;
}

.notebook {
  display: grid;
  gap: 10px;
  padding: 10px;
}

.empty {
  margin: 4px;
  color: var(--muted);
}

.ask,
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
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (min-width: 560px) {
  .suspects {
    grid-template-columns: repeat(4, 1fr);
  }
}

.suspect {
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: 10px 6px;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  font-weight: 600;
}

.suspect svg {
  width: 64px;
  height: 64px;
}

.suspect:disabled {
  cursor: default;
}

.suspect:disabled:not(.culprit) svg {
  opacity: 0.6;
}

.suspect.ruled svg {
  filter: grayscale(1);
}

.suspect.culprit {
  border-color: var(--accent);
}

.portrait {
  width: 96px;
  height: 96px;
}

.reward {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
}

.star {
  color: #f5b301;
  font-size: 32px;
  line-height: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .star {
    animation: pop 0.45s 0.2s backwards cubic-bezier(0.3, 1.6, 0.6, 1);
  }
}

@keyframes pop {
  from {
    transform: scale(0);
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
</style>
