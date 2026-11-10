<script setup lang="ts" generic="T">
// Segmented radio switch: one button per option, the chosen one raised over the track (filled with the
// option's `tone` colour, white text, when it has one). The `icon` slot draws an option's icon before its label.
defineProps<{ options: { value: T; label: string; tone?: string }[]; label: string }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="segmented" role="radiogroup" :aria-label="label" :style="{ '--n': options.length }">
    <button
      v-for="(o, i) in options"
      :key="i"
      role="radio"
      :aria-checked="model === o.value"
      :class="{ active: model === o.value, toned: !!o.tone }"
      :style="o.tone ? { '--tone': o.tone } : undefined"
      @click="model = o.value"
    >
      <slot name="icon" :value="o.value" :active="model === o.value" />
      {{ o.label }}
    </button>
  </div>
</template>

<style scoped>
/* A sunken track; the chosen option a candy button over it — its colour (`--tone`, else the raised panel) with a
   light top and a darker depth under it — that pops up when chosen, the others sink in when pressed. */
.segmented {
  display: grid;
  grid-template-columns: repeat(var(--n), 1fr);
  gap: 6px;
  padding: 6px 6px 9px;
  border-radius: 18px;
  background: var(--soft);
  box-shadow: inset 0 2px 5px rgb(0 0 0 / 0.16);
}

button {
  --tone: var(--raised);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 13px;
  background: transparent;
  color: var(--fg);
  font-weight: 600;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background 0.15s ease;
}

button:not(.active):active {
  transform: translateY(2px);
  background: color-mix(in srgb, var(--fg) 7%, transparent);
}

button.active {
  background: linear-gradient(180deg, color-mix(in srgb, var(--tone) 72%, #fff), var(--tone) 60%);
  font-weight: 800;
  box-shadow:
    inset 0 2px 0 rgb(255 255 255 / 0.45),
    0 4px 0 color-mix(in srgb, var(--tone) 62%, #000),
    0 8px 12px -6px rgb(0 0 0 / 0.4);
  animation: pop 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}

button.active.toned {
  color: #fff;
  text-shadow: 0 1px 0 color-mix(in srgb, var(--tone) 60%, #000);
}

button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--tone) 45%, transparent);
  outline-offset: 2px;
}

@keyframes pop {
  from {
    transform: scale(0.92);
  }
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  button.active {
    animation: none;
  }
}
</style>
