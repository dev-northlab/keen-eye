<script setup lang="ts">
import { PICTURE_STYLES, type PictureStyle } from '../levels/picture-style.ts'
import { useSettingsStore } from '../stores/settings.ts'

// Picture style of the levels (levels/picture-style.ts): drawn scenes or the redesigned pictures. Two icon
// buttons on a pill like the season switch; a level reads the style as it opens.

const settings = useSettingsStore()

const COLORS: Record<PictureStyle, string> = { classic: '#3a86ff', redesign: '#e0702a' }
</script>

<template>
  <div class="styles" role="radiogroup" :aria-label="$t('pictureStyle.label')">
    <button
      v-for="s in PICTURE_STYLES"
      :key="s"
      role="radio"
      :aria-checked="settings.pictureStyle === s"
      :aria-label="$t(`pictureStyle.${s}`)"
      :title="$t(`pictureStyle.${s}`)"
      :class="{ active: settings.pictureStyle === s }"
      :style="{ '--tone': COLORS[s] }"
      @click="settings.pictureStyle = s"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <!-- Classic: flat drawn shapes. -->
        <g v-if="s === 'classic'" fill="currentColor">
          <path d="M3 20l5.5-9 5.5 9Z" />
          <circle cx="17" cy="7" r="4" />
          <rect x="14" y="14" width="7" height="6" rx="1" />
        </g>
        <!-- Redesign: a shaded ball with a highlight and a sparkle. -->
        <g v-else>
          <circle cx="11" cy="13" r="8" fill="currentColor" />
          <circle cx="8.5" cy="10.5" r="2.6" fill="#fff" fill-opacity="0.55" />
          <path d="M19.5 2.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" fill="currentColor" />
        </g>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.styles {
  display: flex;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: var(--glass);
  box-shadow: 0 2px 8px rgb(35 48 43 / 0.1);
}

button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--faint);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;
}

button:hover {
  color: var(--tone);
}

button.active {
  background: var(--raised);
  color: var(--tone);
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.18);
  transform: scale(1.06);
}

svg {
  width: 24px;
  height: 24px;
}
</style>
