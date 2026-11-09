<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings.ts'

// Picture style of the levels (levels/picture-style.ts): one round button showing the current style — "2D" for the
// drawn scenes, "3D" for the redesigned pictures; a tap switches to the other.

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
    <!-- "2D" for the drawn scenes, "3D" for the redesigned pictures: read the same in every language. -->
    <span class="mark" aria-hidden="true">{{ redesign ? '3D' : '2D' }}</span>
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

.mark {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
}
</style>
