<script setup lang="ts">
import { useShare } from '../composables/useShare.ts'

// "Share" pill: the store link through the system share sheet (copied to the clipboard in a browser without one).
// The default slot replaces the label.
const props = defineProps<{ text?: string }>()
const { shareApp, copied } = useShare()
</script>

<template>
  <span class="share">
    <button @click="shareApp(props.text)">
      <span class="icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="17.5" cy="5.5" r="2.6" fill="currentColor" />
          <circle cx="6.5" cy="12" r="2.6" fill="currentColor" />
          <circle cx="17.5" cy="18.5" r="2.6" fill="currentColor" />
          <path d="M15.3 6.8 8.7 10.7M8.7 13.3l6.6 3.9" stroke="currentColor" stroke-width="2" />
        </svg>
      </span>
      <span><slot>{{ $t('share.button') }}</slot></span>
    </button>
    <span v-if="copied" class="toast" role="status">{{ $t('share.copied') }}</span>
  </span>
</template>

<style scoped>
.share {
  position: relative;
  display: inline-grid;
}

/* A raised pill like the back button: an icon circle on the left. */
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 6px 20px 6px 8px;
  border-radius: 999px;
  background: var(--panel);
  color: var(--fg);
  font-weight: 600;
  box-shadow:
    0 4px 12px rgb(35 48 43 / 0.14),
    inset 0 0 0 2px var(--soft);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

button:hover {
  box-shadow:
    0 6px 16px rgb(35 48 43 / 0.18),
    inset 0 0 0 2px var(--accent);
}

button:active {
  transform: scale(0.96);
}

.icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
}

.icon svg {
  width: 20px;
  height: 20px;
}

/* "Link copied": a bubble over the button, so nothing around it moves. */
.toast {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--fg);
  color: var(--bg);
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
