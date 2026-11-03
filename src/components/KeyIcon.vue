<script setup lang="ts">
/** A chapter's hidden key (docs/hidden-item-feature.md): golden once found, grey until then. */
defineProps<{ found: boolean }>()
</script>

<template>
  <svg class="key" :class="{ found }" viewBox="0 0 24 24" role="img" :aria-label="found ? $t('secret.keyFound') : $t('secret.keyHidden')">
    <circle cx="7" cy="12" r="5" class="metal" />
    <circle cx="7" cy="12" r="1.8" class="hole" />
    <path d="M11.5 10.4H22v3.2h-1.6v3.4h-2.4v-3.4h-1.6v2.4h-2.2v-2.4h-2.7Z" class="metal" />
  </svg>
</template>

<style scoped>
.key {
  width: 24px;
  height: 24px;
  flex: none;
}

.metal {
  fill: var(--star-empty);
  stroke: var(--faint);
  stroke-width: 1.2;
  stroke-linejoin: round;
}

.hole {
  fill: var(--faint);
}

.found .metal {
  fill: #f7c948;
  stroke: #8a5a00;
}

.found .hole {
  fill: #8a5a00;
}
</style>
