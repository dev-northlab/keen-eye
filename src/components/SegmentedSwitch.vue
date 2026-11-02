<script setup lang="ts" generic="T">
// Segmented radio switch: one button per option, the chosen one raised over the track.
defineProps<{ options: { value: T; label: string }[]; label: string }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="segmented" role="radiogroup" :aria-label="label" :style="{ '--n': options.length }">
    <button
      v-for="(o, i) in options"
      :key="i"
      role="radio"
      :aria-checked="model === o.value"
      :class="{ active: model === o.value }"
      @click="model = o.value"
    >
      {{ o.label }}
    </button>
  </div>
</template>

<style scoped>
.segmented {
  display: grid;
  grid-template-columns: repeat(var(--n), 1fr);
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: var(--soft);
}

button {
  padding: 10px 12px;
  background: transparent;
  color: var(--fg);
}

button.active {
  background: var(--raised);
  font-weight: 600;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
}
</style>
