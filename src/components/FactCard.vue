<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

// Card over the bottom of the picture after an item of "find the odd one out" is found: its name
// and one fact. Closes on a tap or by itself after a while; a new find replaces it (keyed by the parent).

const AUTO_CLOSE_MS = 7000

defineProps<{ label: string; fact: string; still?: boolean }>()
const emit = defineEmits<{ close: [] }>()

let timer = 0
onMounted(() => (timer = window.setTimeout(() => emit('close'), AUTO_CLOSE_MS)))
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button class="fact" :class="{ still }" role="status" :aria-label="`${label}. ${fact} ${$t('common.close')}`" @click="emit('close')">
    <svg class="check" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#3cc47f" stroke="#239a5f" stroke-width="1.4" />
      <path d="M7 12.5l3.2 3.2 6.8-7" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="text">
      <strong>{{ label }}</strong>
      <span>{{ fact }}</span>
    </span>
  </button>
</template>

<style scoped>
.fact {
  position: absolute;
  left: 50%;
  bottom: 12px;
  z-index: 2;
  width: min(calc(100% - 24px), 420px);
  transform: translateX(-50%);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--panel);
  color: var(--fg);
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.35;
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.18);
  animation: rise 0.3s cubic-bezier(0.3, 1.4, 0.6, 1);
}

.check {
  flex: none;
  width: 28px;
  height: 28px;
}

.text {
  display: grid;
  gap: 2px;
}

strong {
  font-size: 17px;
}

.fact.still {
  animation: none;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translate(-50%, 16px);
  }
}
</style>
