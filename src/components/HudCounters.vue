<script setup lang="ts">
// Time and mistakes chips of a level's HUD (normal mode). Two root elements, so that they are
// laid out as items of the HUD row.
defineProps<{ time: string; mistakes: number; locked: boolean }>()
</script>

<template>
  <span class="chip time" role="img" :aria-label="$t('level.time', { t: time })">
    <!-- Yellow stopwatch. -->
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="10" y="1" width="4" height="3.4" rx="1.2" fill="#e8a400" />
      <rect x="17.4" y="3.6" width="3.2" height="2.6" rx="1" fill="#e8a400" transform="rotate(45 19 4.9)" />
      <circle cx="12" cy="13.5" r="9" fill="#ffc933" stroke="#e8a400" stroke-width="1.4" />
      <circle cx="12" cy="13.5" r="6.4" fill="#fffaf0" />
      <ellipse cx="6.5" cy="8.3" rx="1.7" ry="0.9" fill="#fff" fill-opacity="0.75" transform="rotate(-45 6.5 8.3)" />
      <path d="M12 13.5V9.4M12 13.5l2.7 1.6" fill="none" stroke="#a86b00" stroke-width="1.9" stroke-linecap="round" />
      <circle cx="12" cy="13.5" r="1.2" fill="#a86b00" />
    </svg>
    <span class="value">{{ time }}</span>
  </span>
  <span
    :key="mistakes"
    class="chip miss"
    :class="{ shake: mistakes > 0, locked }"
    role="img"
    :aria-label="$t('level.mistakes', { n: mistakes })"
  >
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#ff5d5d" stroke="#de3b3b" stroke-width="1.4" />
      <ellipse cx="8.4" cy="7.4" rx="3.2" ry="1.7" fill="#fff" fill-opacity="0.4" transform="rotate(-35 8.4 7.4)" />
      <path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8" stroke="#fff" stroke-width="2.8" stroke-linecap="round" />
    </svg>
    <span class="value">{{ mistakes }}</span>
  </span>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 5px;
  border-radius: 999px;
  background: var(--soft-2);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.icon {
  width: 28px;
  height: 28px;
  flex: none;
}

.chip .value {
  display: inline-block;
}

/* Time: yellow chip with a stopwatch. */
.time {
  background: var(--gold-bg);
  color: var(--gold-fg);
}

/* Mistakes: red cross; the chip shakes and flashes on every miss. */
.miss.shake {
  background: var(--danger-bg);
  color: var(--danger-fg);
  animation:
    shake 0.45s ease-in-out,
    flash 0.8s ease-out;
}

.miss.locked .icon {
  animation: pulse 0.7s ease-in-out infinite alternate;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
}

@keyframes flash {
  from {
    background: #ffb4b4;
  }
}

@keyframes pulse {
  to {
    transform: scale(1.2);
  }
}
</style>
