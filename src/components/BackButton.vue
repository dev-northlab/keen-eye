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
  padding: 10px 16px 16px;
}

.back {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 160px;
  padding: 10px 24px 10px 12px;
  border-radius: 999px;
  background: var(--panel);
  color: var(--fg);
  font-size: 18px;
  font-weight: 600;
  box-shadow:
    0 6px 16px rgb(35 48 43 / 0.16),
    inset 0 0 0 2px var(--soft);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.back:hover {
  box-shadow:
    0 8px 20px rgb(35 48 43 / 0.2),
    inset 0 0 0 2px var(--accent);
}

.back:active {
  transform: scale(0.96);
  box-shadow:
    0 2px 8px rgb(35 48 43 / 0.16),
    inset 0 0 0 2px var(--accent);
}

.chevron {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
}

.chevron svg {
  width: 22px;
  height: 22px;
}
</style>
