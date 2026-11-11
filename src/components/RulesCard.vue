<script setup lang="ts">
import type { Chapter } from '../levels/chapters.ts'

// The rules of a game mode over its levels ("time", "memory", "travel", "detective"): the mode's 3D icon
// (public/icons/<id>.webp) floating beside the text on a glass card tinted in the mode's colour. It slides in
// with a shine sweeping across once.
defineProps<{ chapter: Chapter }>()
const base = import.meta.env.BASE_URL
</script>

<template>
  <p class="rules" :style="{ '--c': chapter.color }">
    <img class="icon" :src="`${base}icons/${chapter.id}.webp`" alt="" />
    <span class="text">{{ $t(chapter.rules!) }}</span>
  </p>
</template>

<style scoped>
.rules {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 14px;
  padding: 12px 16px 12px 10px;
  border-radius: 20px;
  border: 1.5px solid color-mix(in srgb, var(--c) 30%, transparent);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, color-mix(in srgb, var(--c) 16%, var(--panel)) 92%, transparent),
    color-mix(in srgb, color-mix(in srgb, var(--c) 4%, var(--panel)) 85%, transparent) 60%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow:
    0 8px 20px color-mix(in srgb, var(--c) 18%, transparent),
    0 1px 3px rgb(0 0 0 / 0.08);
  animation: card-in 0.5s cubic-bezier(0.25, 1.3, 0.5, 1);
}

/* A shine sweeping across once as the card comes in. */
.rules::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.45) 50%, transparent 65%);
  translate: -100% 0;
  animation: sweep 1.1s 0.35s ease-in-out;
  pointer-events: none;
}

/* The icon on a soft halo of the mode's colour, bobbing gently. */
.icon {
  flex: none;
  width: 58px;
  height: 58px;
  padding: 4px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--c) 22%, transparent) 0 50%, transparent 70%);
  filter: drop-shadow(0 3px 4px rgb(0 0 0 / 0.18));
  animation:
    icon-in 0.7s 0.1s cubic-bezier(0.3, 1.6, 0.5, 1) backwards,
    bob 3.2s 0.8s ease-in-out infinite;
}

.text {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
  text-wrap: pretty;
}

@keyframes card-in {
  from {
    opacity: 0;
    translate: 0 12px;
  }
}

@keyframes sweep {
  to {
    translate: 100% 0;
  }
}

@keyframes icon-in {
  from {
    scale: 0.4;
    rotate: -20deg;
    opacity: 0;
  }
}

@keyframes bob {
  0%,
  100% {
    translate: 0 0;
    rotate: 0deg;
  }
  50% {
    translate: 0 -3px;
    rotate: 4deg;
  }
}
</style>
