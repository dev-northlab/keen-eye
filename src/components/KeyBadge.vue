<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import KeyIcon from './KeyIcon.vue'

// The hidden key of a chapter (docs/hidden-item-feature.md) as a button: a tap shows `text` in a bubble
// beside it for a moment. It sits over a banner or card as a sibling, not inside its button, so the tap
// never opens the chapter. The parent positions the root.
defineProps<{ found: boolean; text: string }>()

/** How long the bubble stays. */
const BUBBLE_MS = 3000

const shown = ref(false)
let timer = 0

function toggle() {
  clearTimeout(timer)
  shown.value = !shown.value
  if (shown.value) timer = window.setTimeout(() => (shown.value = false), BUBBLE_MS)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="key-badge">
    <button class="key-button" type="button" :aria-label="text" :aria-expanded="shown" @click="toggle">
      <KeyIcon :found="found" />
    </button>
    <span v-if="shown" class="bubble" role="status">{{ text }}</span>
  </span>
</template>

<style scoped>
.key-badge {
  display: inline-flex;
  align-items: center;
}

.key-button {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  min-height: 0;
  padding: 0;
  border-radius: 50%;
  background: var(--soft-2);
  box-shadow: none;
}

/* To the left of the badge, so it stays inside a scrolled list at its top and edges. */
.bubble {
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  translate: 0 -50%;
  z-index: 2;
  width: max-content;
  max-width: 220px;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--panel);
  color: var(--fg);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.2);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  white-space: normal;
  pointer-events: none;
  animation: pop 0.2s ease-out;
}

@keyframes pop {
  from {
    opacity: 0;
    scale: 0.9;
  }
}
</style>
