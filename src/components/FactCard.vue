<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

// Card over the bottom of the picture after an item of "find the odd one out" is found: its name
// and one fact. Closes on a tap or by itself after a while; a new find replaces it (keyed by the parent).

const AUTO_CLOSE_MS = 7000

defineProps<{ label: string; fact: string }>()
const emit = defineEmits<{ close: [] }>()

let timer = 0
onMounted(() => (timer = window.setTimeout(() => emit('close'), AUTO_CLOSE_MS)))
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button
    class="fact"
    role="status"
    :style="{ '--life': `${AUTO_CLOSE_MS}ms` }" :aria-label="`${label}. ${fact} ${$t('common.close')}`" @click="emit('close')">
    <span class="badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M6.5 12.5l3.6 3.6 7.4-7.6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <span class="text">
      <strong>{{ label }}</strong>
      <span class="body">{{ fact }}</span>
    </span>
    <span class="life" aria-hidden="true" />
  </button>
</template>

<style scoped>
.fact {
  position: absolute;
  left: 50%;
  bottom: 12px;
  z-index: 2;
  width: min(calc(100% - 24px), 440px);
  transform: translateX(-50%);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px 16px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  border-radius: 18px;
  background: linear-gradient(135deg, var(--ok-bg), var(--panel) 65%);
  color: var(--fg);
  text-align: start;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.4;
  box-shadow:
    0 10px 28px rgb(0 0 0 / 0.22),
    0 2px 6px rgb(0 0 0 / 0.08);
  animation: rise 0.35s cubic-bezier(0.3, 1.4, 0.6, 1);
}

.badge {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(160deg, #4fd38f, var(--accent));
  box-shadow:
    0 0 0 5px color-mix(in srgb, var(--accent) 18%, transparent),
    0 3px 8px color-mix(in srgb, var(--accent) 45%, transparent);
  animation: pop 0.45s 0.1s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

.badge svg {
  width: 22px;
  height: 22px;
}

.text {
  display: grid;
  gap: 3px;
  min-width: 0;
  padding-top: 1px;
}

strong {
  font-size: 17px;
  font-weight: 800;
  color: var(--accent);
}

.body {
  color: var(--fg);
}

/* How long the card stays: a thin bar along the bottom that runs out as it closes by itself. */
.life {
  position: absolute;
  inset-inline-start: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: var(--accent);
  opacity: 0.55;
  animation: life var(--life) linear forwards;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translate(-50%, 16px);
  }
}

@keyframes pop {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
}

@keyframes life {
  to {
    width: 0;
  }
}
</style>
