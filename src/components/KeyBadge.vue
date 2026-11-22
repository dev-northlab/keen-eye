<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import KeyIcon from './KeyIcon.vue'

// The hidden key of a chapter (docs/hidden-item-feature.md) as a button: a tap shows `text` in a bubble
// beside it for a moment. It sits over a banner or card as a sibling, not inside its button, so the tap
// never opens the chapter. The parent positions the root. The default slot replaces the key on the button
// (the closed treasury's lock); `show()` opens the bubble from outside (a tap on the closed treasury banner).
defineProps<{ found?: boolean; text: string }>()

/** How long the bubble stays. */
const BUBBLE_MS = 3000

const shown = ref(false)
let timer = 0

function toggle(open = !shown.value) {
  clearTimeout(timer)
  shown.value = open
  if (open) timer = window.setTimeout(() => (shown.value = false), BUBBLE_MS)
}

defineExpose({ show: () => toggle(true) })

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="key-badge">
    <button class="key-button" type="button" :aria-label="text" :aria-expanded="shown" @click="toggle()">
      <slot><KeyIcon :found="found" /></slot>
    </button>
    <span v-if="shown" class="bubble" role="status">
      <span class="tail" aria-hidden="true" />
      <span class="card">
        <span class="medal" aria-hidden="true"><KeyIcon found /></span>
        <span class="text">{{ text }}</span>
      </span>
    </span>
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

.key-button[aria-expanded='true'] {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--star) 70%, transparent);
}

/* Before the badge (to its left; to its right in Arabic), so it stays inside a scrolled list at its top
   and edges. A golden note: the key in a round medal, the text, and a tail pointing at the badge — the
   tail is drawn under the card, which hides its inner half. */
.bubble {
  position: absolute;
  inset-inline-end: calc(100% + 12px);
  top: 50%;
  translate: 0 -50%;
  z-index: 2;
  width: max-content;
  max-width: 270px;
  pointer-events: none;
  transform-origin: right center;
  animation: pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

[dir='rtl'] .bubble {
  transform-origin: left center;
}

.card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  padding-inline-end: 14px;
  border: 1.5px solid color-mix(in srgb, var(--star) 60%, transparent);
  border-radius: 16px;
  background: var(--gold-bg);
  color: var(--fg);
  box-shadow:
    0 8px 22px rgb(0 0 0 / 0.18),
    0 0 0 4px color-mix(in srgb, var(--star) 14%, transparent);
}

.tail {
  position: absolute;
  inset-inline-end: -6px;
  top: 50%;
  width: 13px;
  height: 13px;
  margin-top: -6.5px;
  rotate: 45deg;
  border: 1.5px solid color-mix(in srgb, var(--star) 60%, transparent);
  border-radius: 2px;
  background: var(--gold-bg);
}

.medal {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff8dc, #fde7a0 70%);
  box-shadow:
    inset 0 0 0 1.5px rgb(201 140 0 / 0.45),
    0 2px 6px rgb(160 110 0 / 0.25);
}

.medal :deep(.key) {
  width: 22px;
  height: 22px;
  rotate: -30deg;
}

.text {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  text-align: start;
  white-space: normal;
}

@keyframes pop {
  from {
    opacity: 0;
    scale: 0.8;
  }
}

</style>
