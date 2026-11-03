<script setup lang="ts">
// The treasury's reward (docs/hidden-item-feature.md): the chest opens, gold shines out and the
// player is congratulated. `still` (reduce motion) shows it open at once.
defineProps<{ still?: boolean }>()
</script>

<template>
  <div class="treasure" :class="{ still }">
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <ellipse class="glow" cx="80" cy="58" rx="62" ry="40" fill="#ffd166" fill-opacity="0.45" />
      <g class="rays" stroke="#ffd23f" stroke-width="4" stroke-linecap="round">
        <path d="M80 30V6M52 38L36 18M108 38l16-20M40 58H18M120 58h22" />
      </g>
      <!-- Body with the gold inside -->
      <path d="M36 66q44-26 88 0Z" fill="#f7c948" stroke="#c9952c" stroke-width="2" />
      <circle cx="64" cy="58" r="4" fill="#e63946" /><circle cx="90" cy="55" r="4" fill="#3a86ff" /><circle cx="104" cy="60" r="3" fill="#4caf50" />
      <rect x="32" y="64" width="96" height="46" rx="4" fill="#8a5a2b" stroke="#5e3b1a" stroke-width="3" />
      <path d="M32 80H128M48 64V110M112 64V110" stroke="#c9952c" stroke-width="4" />
      <rect x="72" y="74" width="16" height="14" rx="3" fill="#f7c948" stroke="#5e3b1a" stroke-width="2" />
      <!-- The lid pops up and tips back -->
      <g class="lid">
        <path d="M32 66q0-26 48-26t48 26Z" fill="#a8743f" stroke="#5e3b1a" stroke-width="3" stroke-linejoin="round" />
        <path d="M48 46V66M112 46V66" stroke="#c9952c" stroke-width="4" />
      </g>
    </svg>
    <p class="congrats">{{ $t('treasury.congrats') }}</p>
  </div>
</template>

<style scoped>
.treasure {
  display: grid;
  justify-items: center;
  gap: 4px;
  margin: 4px 0 12px;
}

svg {
  width: 180px;
  height: 135px;
  overflow: visible;
}

.lid {
  transform-box: view-box;
  transform-origin: 128px 66px;
  animation: open 1s 0.4s ease-out both;
}

.glow,
.rays {
  animation: shine 1s 0.9s ease-out both;
}

.rays {
  transform-box: fill-box;
  transform-origin: center bottom;
}

.congrats {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--gold-fg);
  animation: shine 0.6s 1.3s ease-out both;
}

@keyframes open {
  from {
    transform: rotate(0);
  }
  60% {
    transform: translateY(-30px) rotate(-22deg) scaleY(0.75);
  }
  to {
    transform: translateY(-26px) rotate(-16deg) scaleY(0.7);
  }
}

@keyframes shine {
  from {
    opacity: 0;
    scale: 0.6;
  }
}

.still .lid {
  animation: none;
  transform: translateY(-26px) rotate(-16deg) scaleY(0.7);
}

.still .glow,
.still .rays,
.still .congrats {
  animation: none;
}
</style>
