<script setup lang="ts">
import { useRouter } from 'vue-router'
import BackButton from '../components/BackButton.vue'
import ScreenBackdrop from '../components/ScreenBackdrop.vue'
import type { Level } from '../engine/types.ts'
import { DETECTIVE_CHAPTER } from '../levels/chapters.ts'
import { CASES, type DetectiveCase } from '../levels/detective/cases.ts'
import { caseLevels } from '../levels/detective/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'

// "Detective" (docs/detective-mode.md): the cases, each on the cover of its first scene with its status.

const router = useRouter()
const progress = useProgressStore()

const toParent = () => router.push({ name: 'levels' })
useBackButton(toParent)

const cases = CASES.map((c) => {
  const scenes = caseLevels(c.id)
  return { c, scenes, cover: scenes[0].build!(0).svg }
})

/** The case's state on its card: solved, locked by the purchase, started or not. */
function status(c: DetectiveCase, scenes: Level[]) {
  if (progress.isCaseSolved(c.id)) return 'solved'
  if (progress.needsPurchase(scenes[0].id)) return 'locked'
  return scenes.some((l) => progress.isCompleted(l.id)) ? 'progress' : 'new'
}
</script>

<template>
  <div class="screen">
    <ScreenBackdrop :theme="DETECTIVE_CHAPTER.backdrop" />
    <main>
      <p class="rules">{{ $t(DETECTIVE_CHAPTER.rules!) }}</p>
      <ul class="cases">
        <li v-for="{ c, scenes, cover } in cases" :key="c.id">
          <button class="case" :class="status(c, scenes)" @click="router.push({ name: 'case', params: { case: c.id } })">
            <svg class="cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" v-html="cover" />
            <span class="text">
              <span class="name">{{ $t(`detective.cases.${c.id}.title`) }}</span>
              <span class="sub">
                <span class="chip">{{ $t(`detective.status.${status(c, scenes)}`) }}</span>
                {{ $t('map.progress', { done: scenes.filter((l) => progress.isCompleted(l.id)).length, total: scenes.length }) }}
              </span>
            </span>
          </button>
        </li>
      </ul>
    </main>
    <BackButton :on-back="toParent" />
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

.rules {
  margin: 0 0 14px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--panel);
  font-size: 15px;
  line-height: 1.4;
}

.cases {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

.case {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px;
  text-align: left;
  background: var(--panel);
  color: var(--fg);
  border: 2px solid var(--soft);
  border-radius: 18px;
}

.case.solved {
  border-color: var(--accent);
}

.case.locked {
  background: var(--gold-bg);
  border-color: #f5b301;
  color: var(--gold-fg);
}

.cover {
  flex: none;
  width: 112px;
  height: 70px;
  border-radius: 10px;
}

.locked .cover {
  filter: grayscale(0.7);
  opacity: 0.7;
}

.text {
  flex: 1;
  display: grid;
  gap: 6px;
  min-width: 0;
}

.name {
  font-size: 19px;
  font-weight: 700;
}

.sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--muted);
}

.locked .sub {
  color: inherit;
}

.chip {
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--soft);
  color: var(--fg);
  font-weight: 600;
}

.solved .chip {
  background: var(--accent);
  color: #fff;
}

.locked .chip {
  background: #f5b301;
  color: #3b2a00;
}
</style>
