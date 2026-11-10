<script setup lang="ts">
// One empty circle per difference; a found one fills and gets a check drawn in.
// `colors`: fill of each found circle in order (a match: the finder's color); default green.
withDefaults(defineProps<{ total: number; found: number; colors?: string[] }>(), { colors: () => [] })
</script>

<template>
  <span class="found" :class="{ done: found === total }" role="img" :aria-label="$t('level.found', { found, total })">
    <svg
      v-for="i in total"
      :key="i"
      class="slot"
      :class="{ hit: i <= found }"
      :style="colors[i - 1] ? { '--hit': colors[i - 1], '--hit-line': colors[i - 1] } : undefined"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="disc" cx="12" cy="12" r="10" />
      <template v-if="i <= found">
        <ellipse class="shine" cx="8.4" cy="7.4" rx="3.2" ry="1.7" transform="rotate(-35 8.4 7.4)" />
        <path class="check" d="M7 12.5l3.2 3.2 6.8-7" />
      </template>
    </svg>
  </span>
</template>

<style scoped>
.found {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.slot {
  width: 28px;
  height: 28px;
  flex: none;
}

.slot .disc {
  fill: var(--soft-2);
  stroke: var(--line);
  stroke-width: 1.6;
  transition:
    fill 0.25s,
    stroke 0.25s;
}

.slot.hit {
  animation: pop 0.45s cubic-bezier(0.3, 1.6, 0.6, 1);
}

.slot.hit .disc {
  fill: var(--hit, #3cc47f);
  stroke: var(--hit-line, #239a5f);
}

.slot .shine {
  fill: #fff;
  fill-opacity: 0.4;
}

.slot .check {
  fill: none;
  stroke: #fff;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  animation: draw 0.4s ease-out;
}

.found.done {
  animation: pop 0.5s cubic-bezier(0.3, 1.6, 0.6, 1);
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes draw {
  from {
    stroke-dashoffset: 16;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
