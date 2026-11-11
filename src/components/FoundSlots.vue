<script setup lang="ts">
// One numbered circle per difference. The next one to find breathes softly; a found one fills from its
// center with a flash ring and its number pops up in white; when all are found a wave runs along the row.
// `colors`: fill of each found circle in order (a match: the finder's color); default green.
withDefaults(defineProps<{ total: number; found: number; colors?: string[] }>(), { colors: () => [] })
</script>

<template>
  <span class="found" :class="{ done: found === total }" role="img" :aria-label="$t('level.found', { found, total })">
    <svg
      v-for="i in total"
      :key="i"
      class="slot"
      :class="{ hit: i <= found, next: i === found + 1 }"
      :style="{ '--i': i - 1, ...(colors[i - 1] ? { '--hit': colors[i - 1] } : {}) }"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="disc" cx="12" cy="12" r="10" />
      <template v-if="i <= found">
        <circle class="burst" cx="12" cy="12" r="10" />
        <circle class="fill" cx="12" cy="12" r="10" />
        <ellipse class="shine" cx="8.4" cy="7.2" rx="3.6" ry="1.8" transform="rotate(-35 8.4 7.2)" />
      </template>
      <text class="num" :class="{ two: i > 9 }" x="12" y="12.5">{{ i }}</text>
    </svg>
  </span>
</template>

<style scoped>
.found {
  --hit: #3cc47f;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.slot {
  width: 28px;
  height: 28px;
  flex: none;
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

/* The next circle to find: its ring breathes in the accent colour. */
.next .disc {
  animation: breathe 1.8s ease-in-out infinite;
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
  0%,
  100% {
    stroke: var(--line);
    stroke-width: 1.4;
  }
  50% {
    stroke: var(--accent);
    stroke-width: 2.2;
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
