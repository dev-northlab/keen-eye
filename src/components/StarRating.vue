<script setup lang="ts">
withDefaults(defineProps<{ stars: number; size?: number; animated?: boolean }>(), { size: 16, animated: false })
</script>

<template>
  <span class="stars" :class="{ animated }" :style="{ fontSize: `${size}px` }" :aria-label="`${stars}/3`" role="img">
    <span v-for="i in 3" :key="i" :class="{ on: i <= stars }" :style="{ animationDelay: `${i * 0.25}s` }">★</span>
  </span>
</template>

<style scoped>
.stars {
  color: var(--star-empty);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.on {
  color: #f5b301;
}

.animated .on {
  display: inline-block;
  animation: pop 0.45s backwards cubic-bezier(0.3, 1.6, 0.6, 1);
}

@keyframes pop {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated .on {
    animation: none;
  }
}
</style>
