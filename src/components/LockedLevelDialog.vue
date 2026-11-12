<script setup lang="ts">
// A tap on a level not reached yet: which level opens it, and a way straight there. Mounted once in App.vue,
// opened from any level list by `progress.showLocked`.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ModalDialog from './ModalDialog.vue'
import type { Level } from '../engine/types.ts'
import { levelNumber } from '../levels/chapters.ts'
import { caseLevels } from '../levels/detective/index.ts'
import { useBackButton } from '../services/backButton.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'

const router = useRouter()
const progress = useProgressStore()
const purchase = usePurchaseStore()

const first = computed(() => (progress.lockedLevelId === null ? undefined : progress.firstToComplete(progress.lockedLevelId)))

/** The number the player sees on the level's tile: a "detective" scene's place in its case, else its number. */
const shownNumber = (level: Level) => (level.detective ? caseLevels(level.detective.case).indexOf(level) + 1 : levelNumber(level))

const close = () => (progress.lockedLevelId = null)
useBackButton(close)

/** Opens the level to complete first (the router sends a "memory" level to its own screen), or the offer if it is paid. */
function play() {
  const level = first.value
  close()
  if (!level) return
  if (progress.needsPurchase(level.id)) purchase.dialogOpen = true
  else router.push({ name: 'level', params: { id: level.id } })
}
</script>

<template>
  <ModalDialog :title="$t('map.lockedTitle')">
    <!-- A red glossy coin with a white padlock that pops in and rattles, red rings spreading behind it. -->
    <template #icon>
      <span class="badge">
        <span class="wave" />
        <span class="wave late" />
        <span class="coin">
          <svg class="padlock" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.6 11V8.2a4.4 4.4 0 0 1 8.8 0V11" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" />
            <rect x="4.6" y="10.2" width="14.8" height="11" rx="3.2" fill="#fff" />
            <circle cx="12" cy="14.6" r="1.8" fill="#d63a40" />
            <path d="M11.1 15.4h1.8l.4 3h-2.6Z" fill="#d63a40" />
          </svg>
        </span>
      </span>
    </template>
    <p v-if="first">{{ $t('map.lockedText', { n: shownNumber(first), title: $t(`levelTitles.${first.title}`) }) }}</p>
    <div class="actions">
      <button class="secondary" @click="close">{{ $t('common.close') }}</button>
      <button v-if="first" @click="play">{{ $t('map.lockedPlay') }}</button>
    </div>
  </ModalDialog>
</template>

<style scoped>
:deep(.card > .icon) {
  width: 96px;
  height: 96px;
  margin-bottom: 8px;
  background: none;
  overflow: visible;
}

:deep(.card > h2) {
  color: var(--danger-fg);
}

.badge {
  position: relative;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
}

/* Rings spreading from the coin, one after another. */
.wave {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  border: 3px solid var(--danger);
  animation: wave 2.4s ease-out infinite;
}

.wave.late {
  animation-delay: 1.2s;
}

.coin {
  position: relative;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffb3ad, #f0545a 45%, #b8262c);
  box-shadow:
    inset 0 -4px 0 rgb(0 0 0 / 0.14),
    inset 0 3px 0 rgb(255 255 255 / 0.45),
    0 0 0 4px #fff,
    0 0 0 7px #f0545a,
    0 10px 20px -6px rgb(150 20 30 / 0.6);
  animation: pop 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

/* `.badge` in front: ModalDialog sizes every svg of its icon place, the padlock keeps its own size. */
.badge .coin .padlock {
  width: 52px;
  height: 52px;
  filter: drop-shadow(0 2px 0 rgb(120 10 20 / 0.55));
  transform-origin: 50% 20%;
  animation: rattle 2.4s ease-in-out 0.5s infinite;
}

@keyframes pop {
  from {
    transform: scale(0.4);
  }
  to {
    transform: scale(1);
  }
}

@keyframes wave {
  from {
    transform: scale(0.9);
    opacity: 0.55;
  }
  to {
    transform: scale(1.45);
    opacity: 0;
  }
}

/* A short shake, as if someone tried the lock, then a rest. */
@keyframes rattle {
  0%,
  30%,
  100% {
    transform: rotate(0deg);
  }
  6% {
    transform: rotate(-12deg);
  }
  12% {
    transform: rotate(10deg);
  }
  18% {
    transform: rotate(-6deg);
  }
  24% {
    transform: rotate(3deg);
  }
}

p {
  margin: 0 0 18px;
  line-height: 1.45;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
</style>
