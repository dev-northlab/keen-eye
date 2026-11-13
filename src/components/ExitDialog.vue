<script setup lang="ts">
// Asks before closing the app (Android back on the home screen; iOS never quits an app and a browser tab stays).
// The owl of the app icon waves goodbye; "keep playing" comes first, so the dialog focuses it.
import MenuIcon from './MenuIcon.vue'
import ModalDialog from './ModalDialog.vue'
import { exitApp, useBackButton } from '../services/backButton.ts'

const emit = defineEmits<{ close: [] }>()
const baseUrl = import.meta.env.BASE_URL

// Android back again: stay.
useBackButton(() => emit('close'))
</script>

<template>
  <ModalDialog class="exit-dialog" :title="$t('exitDialog.title')">
    <template #icon>
      <span class="owl" aria-hidden="true">
        <img :src="`${baseUrl}favicon.svg`" alt="" />
        <svg class="spark one" viewBox="0 0 24 24"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z" /></svg>
        <svg class="spark two" viewBox="0 0 24 24"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z" /></svg>
      </span>
    </template>
    <p>{{ $t('exitDialog.text') }}</p>
    <div class="actions">
      <button class="stay" @click="emit('close')">
        <span class="play-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M9 6.5v11l9-5.5Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" /></svg>
        </span>
        {{ $t('exitDialog.stay') }}
      </button>
      <button class="secondary leave" @click="exitApp">
        <MenuIcon name="exit" />
        {{ $t('home.exit') }}
      </button>
    </div>
  </ModalDialog>
</template>

<style scoped>
/* The shade fades in and the card springs up. */
.exit-dialog {
  animation: shade 0.2s ease-out both;
}

.exit-dialog :deep(.card) {
  position: relative;
  overflow: visible;
  padding-top: 64px;
  margin-top: 48px;
  background:
    radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--ok-bg) 85%, transparent), transparent 70%),
    var(--panel);
  box-shadow: 0 24px 48px -16px rgb(0 0 0 / 0.4);
  animation: rise 0.42s cubic-bezier(0.2, 1.3, 0.4, 1) both;
}

/* The owl sits on the card's top edge, half out of it. */
.exit-dialog :deep(.icon) {
  position: absolute;
  top: -52px;
  left: 50%;
  width: 104px;
  height: 104px;
  margin: 0 0 0 -52px;
  background: var(--panel);
  box-shadow: 0 8px 18px -6px rgb(0 0 0 / 0.35);
}

.owl {
  position: relative;
  display: grid;
  place-items: center;
}

.owl img {
  width: 84px;
  height: 84px;
  border-radius: 22px;
  /* A goodbye: the owl tilts one way and the other, then rests. */
  transform-origin: 50% 90%;
  animation: wave 2.6s ease-in-out 0.35s infinite;
}

.spark {
  position: absolute;
  fill: #ffc933;
  filter: drop-shadow(0 0 3px rgb(255 201 51 / 0.8));
  animation: twinkle 1.8s ease-in-out infinite;
}

.spark.one {
  width: 18px;
  height: 18px;
  top: -6px;
  right: -10px;
}

.spark.two {
  width: 12px;
  height: 12px;
  bottom: 2px;
  left: -10px;
  animation-delay: 0.9s;
}

p {
  margin: 0 0 20px;
  line-height: 1.45;
  color: var(--muted);
}

.actions {
  display: grid;
  gap: 10px;
}

.actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.actions button:active {
  transform: scale(0.97);
}

/* Keep playing: the home screen's candy Play button, smaller. */
.stay {
  padding: 10px 18px;
  border-radius: 16px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 70%, #fff), var(--accent) 55%);
  text-shadow: 0 1px 0 color-mix(in srgb, var(--accent) 55%, #000);
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.4),
    0 5px 0 color-mix(in srgb, var(--accent) 62%, #000),
    0 12px 18px -8px rgb(0 0 0 / 0.45);
}

.stay:active {
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.4),
    0 2px 0 color-mix(in srgb, var(--accent) 62%, #000),
    0 6px 10px -6px rgb(0 0 0 / 0.4);
}

.play-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 55%, #e3f3ea);
  color: var(--accent);
  box-shadow: 0 2px 0 color-mix(in srgb, var(--accent) 55%, #000);
}

.play-icon svg {
  width: 20px;
  height: 20px;
  margin-inline-start: 2px;
}

/* Exit: quieter, with the red power ball. */
.leave {
  padding: 8px 18px;
  border-radius: 16px;
  font-size: 16px;
}

.leave .menu-icon {
  width: 28px;
  height: 28px;
}

@keyframes shade {
  from {
    background: rgb(0 0 0 / 0);
  }
}

@keyframes rise {
  from {
    transform: translateY(28px) scale(0.9);
    opacity: 0;
  }
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: rotate(0);
  }
  15% {
    transform: rotate(-9deg);
  }
  30% {
    transform: rotate(8deg);
  }
  45% {
    transform: rotate(-5deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    transform: scale(0.6) rotate(0);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.1) rotate(45deg);
    opacity: 1;
  }
}
</style>
