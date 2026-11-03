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
      <div v-if="$slots.icon" class="icon"><slot name="icon" /></div>
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
  /* Tall dialogs scroll inside the card on short screens. */
  max-height: 100%;
  overflow-y: auto;
}

/* An optional round badge above the title. */
.icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--ok-bg);
  color: var(--accent);
}

.icon :slotted(svg) {
  width: 34px;
  height: 34px;
}

h2 {
  margin: 0 0 12px;
}

/* A list of points with round icons: <ul class="points"><li><span class="point-icon"><svg/></span>text</li></ul>. */
:slotted(.points) {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
}

:slotted(.points li) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: var(--soft-2);
  line-height: 1.35;
}

:slotted(.point-icon) {
  flex: none;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--ok-bg);
  color: var(--accent);
}

:slotted(.point-icon svg) {
  width: 20px;
  height: 20px;
}
</style>
