<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings.ts'

// Picture style of the levels (levels/picture-style.ts): one round icon button showing the current style — flat
// shapes for the drawn scenes, a shaded ball for the redesigned pictures; a tap switches to the other one.

const settings = useSettingsStore()
const redesign = computed(() => settings.pictureStyle === 'redesign')
const toggle = () => (settings.pictureStyle = redesign.value ? 'classic' : 'redesign')
</script>

<template>
  <button
    class="style-switch"
    :class="{ redesign }"
    role="switch"
    :aria-checked="redesign"
    :aria-label="`${$t('pictureStyle.label')}: ${$t(`pictureStyle.${settings.pictureStyle}`)}`"
    :title="`${$t('pictureStyle.label')}: ${$t(`pictureStyle.${settings.pictureStyle}`)}`"
    @click="toggle"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <!-- Redesign: a shaded ball with a highlight and a sparkle. -->
      <g v-if="redesign">
        <circle cx="11" cy="13" r="8" fill="currentColor" />
        <circle cx="8.5" cy="10.5" r="2.6" fill="#fff" fill-opacity="0.55" />
        <path d="M19.5 2.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" fill="currentColor" />
      </g>
      <!-- Classic: flat drawn shapes. -->
      <g v-else fill="currentColor">
        <path d="M3 20l5.5-9 5.5 9Z" />
        <circle cx="17" cy="7" r="4" />
        <rect x="14" y="14" width="7" height="6" rx="1" />
      </g>
    </svg>
  </button>
</template>

<style scoped>
.style-switch {
  display: grid;
  place-items: center;
  flex: none;
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
  background: var(--glass);
  color: #3a86ff;
  box-shadow: 0 2px 8px rgb(35 48 43 / 0.1);
  transition:
    color 0.15s ease,
    transform 0.15s ease;
}

.style-switch.redesign {
  color: #e0702a;
}

.style-switch:active {
  transform: scale(0.94);
}

svg {
  width: 26px;
  height: 26px;
}
</style>
