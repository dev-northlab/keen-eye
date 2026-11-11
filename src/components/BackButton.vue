<script setup lang="ts">
import { useRouter } from 'vue-router'

// Floating "back" pill at the bottom of a screen (replaces the old top header).
/** `onBack` replaces the default "back to home" (e.g. settings opened over a level). */
const props = defineProps<{ onBack?: () => void }>()
const router = useRouter()
const back = () => (props.onBack ? props.onBack() : router.push({ name: 'home' }))
</script>

<template>
  <footer class="back-bar">
    <button class="back" @click="back">
      <span class="chevron" aria-hidden="true">
        <svg class="flip-rtl" viewBox="0 0 24 24">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span>{{ $t('common.back') }}</span>
    </button>
  </footer>
</template>

<style scoped>
.back-bar {
  flex: none;
  display: flex;
  justify-content: center;
  padding: 8px 16px 14px;
}

/* A small glass pill: the green chevron disc and the word, 44 px tall (a finger). */
.back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 18px 5px 5px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--panel) 60%, transparent);
  background: var(--glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--fg);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow:
    0 4px 14px rgb(35 48 43 / 0.16),
    0 1px 2px rgb(35 48 43 / 0.1);
  animation: back-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.back:hover {
  box-shadow:
    0 6px 18px rgb(35 48 43 / 0.22),
    0 1px 2px rgb(35 48 43 / 0.1);
}

.back:active {
  transform: scale(0.94);
}

.chevron {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 70%, #fff), var(--accent) 55%);
  color: #fff;
  box-shadow:
    0 2px 6px color-mix(in srgb, var(--accent) 45%, transparent),
    inset 0 1px 0 rgb(255 255 255 / 0.35);
}

.chevron svg {
  width: 18px;
  height: 18px;
  transition: translate 0.2s ease;
}

/* The chevron steps back as the finger or pointer comes. */
.back:hover .chevron svg,
.back:active .chevron svg {
  translate: -2px 0;
}

[dir='rtl'] .back:hover .chevron svg,
[dir='rtl'] .back:active .chevron svg {
  translate: 2px 0;
}

@keyframes back-in {
  from {
    opacity: 0;
    translate: 0 10px;
    scale: 0.9;
  }
}
</style>
