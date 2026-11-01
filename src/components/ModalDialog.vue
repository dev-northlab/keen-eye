<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{ title: string }>()

const card = ref<HTMLElement>()
// Move focus into the dialog so keyboard and screen reader users land on its actions.
onMounted(() => card.value?.querySelector<HTMLElement>('button')?.focus())
</script>

<template>
  <div class="overlay">
    <section ref="card" class="card" role="dialog" aria-modal="true" :aria-label="title">
      <h2>{{ title }}</h2>
      <slot />
    </section>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgb(0 0 0 / 0.35);
}

.card {
  background: var(--panel);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  width: min(100%, 340px);
}

h2 {
  margin: 0 0 12px;
}
</style>
