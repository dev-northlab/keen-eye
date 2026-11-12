<script setup lang="ts">
// The HUD of a "detective" scene: the clues found so far, never how many there are (docs/detective-difficulty.md) —
// a magnifying glass and a number that pops up with each find.
defineProps<{ found: number }>()
</script>

<template>
  <span class="clues" role="img" :aria-label="$t('detective.cluesFound', { n: found })">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" fill="#fffaf0" stroke="currentColor" stroke-width="2.6" />
      <path d="M7.6 8.2a3 3 0 0 1 2.6-1.8" fill="none" stroke="#c9a679" stroke-width="1.6" stroke-linecap="round" />
      <path d="M15 15l5.5 5.5" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" />
    </svg>
    <span :key="found" class="n" :class="{ pop: found > 0 }">{{ found }}</span>
  </span>
</template>

<style scoped>
.clues {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 5px;
  border-radius: 999px;
  background: var(--paper);
  color: #a8743f;
  box-shadow: inset 0 0 0 1px var(--paper-edge);
}

svg {
  width: 28px;
  height: 28px;
}

.n {
  min-width: 1ch;
  color: var(--paper-ink);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.pop {
  animation: pop 0.4s cubic-bezier(0.3, 1.6, 0.5, 1);
}

@keyframes pop {
  from {
    transform: scale(1.8);
  }
}
</style>
