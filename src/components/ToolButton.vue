<script setup lang="ts">
// Toolbar button of the level and match screens, in the style of the back button: a raised
// pill with the icon (slot) in a colored circle over a short label. Attributes such as
// `disabled`, `aria-pressed` and listeners fall through to the button.
withDefaults(defineProps<{ label: string; tone?: 'accent' | 'hint' | 'danger' }>(), { tone: 'accent' })
</script>

<template>
  <button class="tool" :class="tone">
    <span class="badge" aria-hidden="true"><slot /></span>
    <span class="label">{{ label }}</span>
  </button>
</template>

<style scoped>
.tool {
  flex: 1 1 0;
  max-width: 128px;
  min-width: 0;
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 8px 6px 7px;
  border-radius: 18px;
  background: var(--panel);
  color: var(--fg);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  box-shadow:
    0 4px 12px rgb(35 48 43 / 0.14),
    inset 0 0 0 2px var(--soft);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    opacity 0.15s;
}

.tool:hover:not(:disabled) {
  box-shadow:
    0 6px 16px rgb(35 48 43 / 0.18),
    inset 0 0 0 2px var(--accent);
}

.tool:active:not(:disabled) {
  transform: scale(0.95);
}

.badge {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
}

.hint .badge {
  background: var(--hint);
}

.danger .badge {
  background: var(--danger);
}

.badge :slotted(svg) {
  width: 22px;
  height: 22px;
}

.label {
  max-width: 100%;
  text-align: center;
}

/* Narrow phones: up to five buttons in a row, so less padding and a smaller label. */
@media (max-width: 480px) {
  .tool {
    padding: 8px 2px 7px;
    border-radius: 16px;
    font-size: 11px;
  }
}

.tool:disabled {
  opacity: 0.5;
  cursor: default;
  box-shadow: inset 0 0 0 2px var(--soft);
}

.tool:disabled .badge {
  background: var(--faint);
}
</style>
