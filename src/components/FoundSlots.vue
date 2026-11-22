<script setup lang="ts">
// One numbered circle per difference. The next one to find breathes softly a few times, then rests (an accent ring
// fading in and out over it: only its opacity changes, which the compositor animates without redrawing the HUD, and
// it stops, so a still screen lets the phone idle); a found one fills from its center with a flash ring and its
// number pops up in white; when all are found a wave runs along the row.
// `colors`: fill of each found circle in order (a match: the finder's color); default green.
// `hideTotal` (the treasury) keeps the number of differences to itself until all are found: only the found circles
// and the next one, marked "?", show.
import { computed } from 'vue'

const props = withDefaults(defineProps<{ total: number; found: number; colors?: string[]; hideTotal?: boolean }>(), {
  colors: () => [],
})

const hidden = computed(() => props.hideTotal && props.found < props.total)
/** Circles shown: all, or with the total hidden the found ones and the next. */
const shown = computed(() => (hidden.value ? props.found + 1 : props.total))
</script>

<template>
  <span
    class="found"
    :class="{ done: found === total }"
    role="img"
    :aria-label="hidden ? $t('level.foundSoFar', { found }) : $t('level.found', { found, total })"
  >
    <span
      v-for="i in shown"
      :key="i"
      class="slot"
      :class="{ hit: i <= found, next: i === found + 1 }"
      :style="{ '--i': i - 1, ...(colors[i - 1] ? { '--hit': colors[i - 1] } : {}) }"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24">
        <circle class="disc" cx="12" cy="12" r="10" />
        <template v-if="i <= found">
          <circle class="burst" cx="12" cy="12" r="10" />
          <circle class="fill" cx="12" cy="12" r="10" />
          <ellipse class="shine" cx="8.4" cy="7.2" rx="3.6" ry="1.8" transform="rotate(-35 8.4 7.2)" />
        </template>
        <text class="num" :class="{ two: i > 9 && !(hidden && i > found) }" x="12" y="12.5">{{ hidden && i > found ? '?' : i }}</text>
      </svg>
      <svg v-if="i === found + 1" class="ring" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  </span>
</template>

<style scoped>
.found {
  --hit: #3cc47f;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  max-width: 100%;
}

/* 28 px each, down to 18 px when many do not fit the row (12–14 on a narrow phone). */
.slot {
  position: relative;
  flex: 0 1 auto;
  width: 28px;
  min-width: 18px;
  aspect-ratio: 1;
}

.slot svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.disc {
  fill: var(--soft-2);
  stroke: var(--line);
  stroke-width: 1.4;
}

.num {
  fill: var(--faint);
  font-size: 11px;
  font-weight: 800;
  text-anchor: middle;
  dominant-baseline: central;
  transform-box: fill-box;
  transform-origin: center;
}

.num.two {
  font-size: 9px;
  letter-spacing: -0.4px;
}

/* The next circle to find: its ring breathes in the accent colour three times after each find. */
.ring {
  position: absolute;
  inset: 0;
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.2;
  opacity: 0;
  animation: breathe 1.8s ease-in-out 3;
}

.next .num {
  fill: var(--muted);
}

/* Found: the colour grows from the center, a ring flashes out, the number pops up in white. */
.fill {
  fill: var(--hit);
  stroke: color-mix(in srgb, var(--hit) 70%, #000);
  stroke-width: 1.4;
  transform-box: fill-box;
  transform-origin: center;
  animation: grow 0.45s cubic-bezier(0.3, 1.5, 0.5, 1);
}

.burst {
  fill: none;
  stroke: var(--hit);
  stroke-width: 2;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: burst 0.6s ease-out;
}

.shine {
  fill: #fff;
  fill-opacity: 0.45;
  animation: fade-in 0.4s 0.2s backwards;
}

.hit .num {
  fill: #fff;
  paint-order: stroke;
  stroke: color-mix(in srgb, var(--hit) 60%, #000);
  stroke-width: 1.2px;
  stroke-opacity: 0.5;
  animation: num-pop 0.5s 0.1s cubic-bezier(0.3, 1.8, 0.5, 1) backwards;
}

/* All found: a wave runs along the row. */
.done .slot {
  animation: wave 0.5s calc(var(--i) * 70ms) ease-out;
}

@keyframes breathe {
  50% {
    opacity: 1;
  }
}

@keyframes grow {
  from {
    scale: 0;
  }
}

@keyframes burst {
  0% {
    scale: 0.9;
    opacity: 0.9;
  }
  100% {
    scale: 1.7;
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    fill-opacity: 0;
  }
}

@keyframes num-pop {
  0% {
    scale: 0.2;
    opacity: 0;
  }
  60% {
    scale: 1.35;
    opacity: 1;
  }
}

@keyframes wave {
  0%,
  100% {
    translate: 0 0;
  }
  40% {
    translate: 0 -6px;
  }
}
</style>
