<script setup lang="ts">
// A level's numeric id, small in the top right corner of its (positioned) parent: names the level when reporting it.
// Several ids (a world, a mode, a case) show as ranges: "#1–20, 101–110". `boxed` puts it on a panel, for use over a picture.
import { computed } from 'vue'

const props = defineProps<{ id: number | number[]; boxed?: boolean }>()

const text = computed(() => {
  const ids = [...new Set(([] as number[]).concat(props.id))].sort((a, b) => a - b)
  const runs: [number, number][] = []
  for (const id of ids) {
    const last = runs.at(-1)
    if (last && id === last[1] + 1) last[1] = id
    else runs.push([id, id])
  }
  return '#' + runs.map(([from, to]) => (from === to ? from : `${from}–${to}`)).join(', ')
})
</script>

<template>
  <span v-if="text !== '#'" class="level-id" :class="{ boxed }" aria-hidden="true">{{ text }}</span>
</template>

<style scoped>
.level-id {
  position: absolute;
  top: 3px;
  right: 5px;
  z-index: 1;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  opacity: 0.55;
  pointer-events: none;
}

.level-id.boxed {
  top: 8px;
  right: 8px;
  padding: 2px 4px;
  border-radius: 4px;
  background: var(--panel);
  color: var(--fg);
  opacity: 0.7;
}
</style>
