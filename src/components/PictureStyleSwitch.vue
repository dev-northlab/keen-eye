<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings.ts'

// Picture style of the levels (levels/picture-style.ts): one round icon button showing the current style — a vector
// curve with its anchor points for the drawn scenes, a photo for the redesigned pictures; a tap switches to the other.

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
      <!-- Redesign: a photo — a frame with a sun and mountains. -->
      <g v-if="redesign">
        <rect x="2" y="4" width="20" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" />
        <circle cx="16" cy="9" r="2" fill="currentColor" />
        <path d="M3 19l6-7 4 4.5 2.5-2.5L21 19Z" fill="currentColor" />
      </g>
      <!-- Classic: a vector curve with its two anchor points and handles. -->
      <g v-else>
        <path d="M5 18C6 9 18 15 19 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <path d="M5 18L10 13M19 6L14 11" stroke="currentColor" stroke-width="1.2" stroke-opacity="0.6" />
        <rect x="2.5" y="15.5" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="16.5" y="3.5" width="5" height="5" rx="1" fill="currentColor" />
        <circle cx="10" cy="13" r="1.5" fill="currentColor" />
        <circle cx="14" cy="11" r="1.5" fill="currentColor" />
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
