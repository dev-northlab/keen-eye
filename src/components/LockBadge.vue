<script setup lang="ts">
// Pulsing padlock over a locked player's pictures (after a miss); decorative, taps pass through.
defineProps<{ label?: string; still?: boolean }>()
</script>

<template>
  <div class="lock-badge" :class="{ still }">
    <span class="disc">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="2.4" />
        <rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor" />
        <circle cx="12" cy="15.5" r="1.7" fill="var(--danger-bg)" />
      </svg>
    </span>
    <span v-if="label" class="label">{{ label }}</span>
  </div>
</template>

<style scoped>
.lock-badge {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  pointer-events: none;
}

.disc {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--danger-bg);
  color: var(--danger-fg);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.2);
  animation:
    pop-in 0.3s cubic-bezier(0.3, 1.6, 0.6, 1),
    pulse 0.6s ease-in-out 0.3s infinite alternate;
}

.disc svg {
  width: 40px;
  height: 40px;
}

.label {
  padding: 4px 14px;
  border-radius: 999px;
  background: var(--panel);
  font-size: 20px;
  font-weight: 600;
}

.still .disc {
  animation: none;
}

@keyframes pop-in {
  from {
    transform: scale(0.4);
    opacity: 0;
  }
}

@keyframes pulse {
  to {
    transform: scale(1.15);
  }
}
</style>
