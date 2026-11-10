<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings.ts'

// Day/night switch for the light and dark theme: a sky pill with a cloud and the sun on the right
// (light), or stars and the moon on the left (dark). The knob slides, the skies cross-fade.

const settings = useSettingsStore()
const dark = computed(() => settings.theme === 'dark')
const toggle = () => (settings.theme = dark.value ? 'light' : 'dark')

/** Night sky right of the moon (x 38–72): two twinkling four-point stars and small dots around them. */
const SPARKLES = [
  [48, 13, 4],
  [62, 25, 3.2],
]
const DOTS = [
  [59, 9, 1],
  [68, 15, 0.8],
  [43, 24, 0.9],
  [52, 31, 0.7],
  [54, 20, 0.6],
]
/** A four-point star of radius r at (x, y). */
const sparkle = (x: number, y: number, r: number) => {
  const w = r * 0.28
  return `M${x} ${y - r}L${x + w} ${y - w}L${x + r} ${y}L${x + w} ${y + w}L${x} ${y + r}L${x - w} ${y + w}L${x - r} ${y}L${x - w} ${y - w}Z`
}
</script>

<template>
  <button
    class="theme-switch"
    :class="{ dark }"
    role="switch"
    :aria-checked="dark"
    :aria-label="$t('theme.dark')"
    :title="$t('theme.dark')"
    @click="toggle"
  >
    <span class="sky night" aria-hidden="true" />
    <svg class="stars" viewBox="0 0 76 38" aria-hidden="true">
      <path v-for="(s, i) in SPARKLES" :key="`s${i}`" :d="sparkle(s[0], s[1], s[2])" fill="#fff6c8" />
      <circle v-for="(s, i) in DOTS" :key="`d${i}`" :cx="s[0]" :cy="s[1]" :r="s[2]" fill="#fff" />
    </svg>
    <svg class="clouds" viewBox="0 0 76 38" aria-hidden="true">
      <!-- One cloud in the middle of the sky left of the sun (x 4–38). -->
      <g fill="#fff">
        <circle cx="15" cy="21" r="5" />
        <circle cx="21" cy="17.5" r="6.5" />
        <circle cx="28" cy="21" r="4.5" />
        <rect x="10" y="20" width="23" height="6" rx="3" />
      </g>
    </svg>
    <span class="knob" aria-hidden="true">
      <svg viewBox="0 0 30 30">
        <circle class="sun" cx="15" cy="15" r="15" />
        <g class="moon">
          <circle cx="15" cy="15" r="15" fill="#f2f2f2" />
          <!-- Shaded crescent on the left edge. -->
          <path d="M15 0A15 15 0 0 0 15 30A19 19 0 0 1 15 0Z" fill="#d9dbe4" />
          <circle cx="11" cy="9" r="2.6" fill="#dcdfe6" />
          <circle cx="7.5" cy="16" r="1.7" fill="#dcdfe6" />
          <circle cx="12" cy="21" r="3" fill="#dcdfe6" />
          <circle cx="21" cy="17" r="2.1" fill="#dcdfe6" />
        </g>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.theme-switch {
  position: relative;
  flex: none;
  width: 76px;
  height: 38px;
  padding: 0;
  border-radius: 999px;
  overflow: hidden;
  /* Day sky; the night sky fades in over it. */
  background: linear-gradient(90deg, #2ec4e6, #8fe6f2);
  box-shadow:
    0 2px 8px rgb(35 48 43 / 0.18),
    inset 0 1px 3px rgb(0 0 0 / 0.15);
}

.sky.night {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #262a63, #15173d);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.stars,
.clouds {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.stars {
  opacity: 0;
  transform: translateY(6px);
}

.knob {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* Day: the sun on the right. */
  transform: translateX(38px);
  transition: transform 0.35s cubic-bezier(0.4, 1.3, 0.5, 1);
  filter: drop-shadow(0 0 5px rgb(255 224 102 / 0.8));
}

.knob svg {
  display: block;
  width: 100%;
  height: 100%;
}

.sun {
  fill: #ffe066;
}

.moon {
  opacity: 0;
  transition: opacity 0.35s ease;
}

/* Night: the moon on the left, stars instead of clouds. */
.dark .sky.night,
.dark .stars,
.dark .moon {
  opacity: 1;
}

.dark .stars {
  transform: none;
}

.dark .clouds {
  opacity: 0;
  transform: translateX(-10px);
}

.dark .knob {
  transform: none;
  filter: drop-shadow(0 0 5px rgb(255 255 255 / 0.45));
}
</style>
