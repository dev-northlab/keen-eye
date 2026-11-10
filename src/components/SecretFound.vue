<script setup lang="ts">
import KeyIcon from './KeyIcon.vue'

// "Secret key found!" over the pictures (docs/hidden-item-feature.md): the key pops up with a shine
// and flies off to the top while the line stays. Shown by the level for a moment (v-if).
</script>

<template>
  <div class="secret" role="status">
    <span class="flyer" aria-hidden="true"><KeyIcon found /></span>
    <span class="text">{{ $t('secret.found') }}</span>
  </div>
</template>

<style scoped>
.secret {
  position: absolute;
  top: 12px;
  left: 50%;
  translate: -50% 0;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: min(90%, 420px);
  padding: 8px 16px;
  border-radius: 14px;
  background: var(--gold-bg);
  color: var(--gold-fg);
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.18);
  font-size: 16px;
  font-weight: 700;
  pointer-events: none;
  animation: pop 0.35s ease-out;
}

.flyer :deep(.key) {
  width: 30px;
  height: 30px;
  filter: drop-shadow(0 0 6px #ffd23f);
  animation: fly 2.4s ease-in-out forwards;
}

@keyframes pop {
  from {
    scale: 0.6;
    opacity: 0;
  }
}

/* Grows with a shine, wobbles, then flies up and away. */
@keyframes fly {
  0% {
    transform: scale(0.4) rotate(-30deg);
  }
  20% {
    transform: scale(1.5) rotate(10deg);
  }
  35%,
  70% {
    transform: scale(1) rotate(0);
  }
  100% {
    transform: translate(40px, -60px) scale(0.6) rotate(25deg);
    opacity: 0;
  }
}

</style>
