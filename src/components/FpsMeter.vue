<script setup lang="ts">
// Developer mode's frame meter over a level's pictures, to compare phones: once a second, the frames the screen
// showed, how many times the scene redrew its pictures, and the longest frame. Technical labels, the same in every
// language. It runs its own frame loop, so a still level does not sleep while it is on.
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ poses: () => number }>()
const text = ref('')

let raf = 0
let since = 0
let frames = 0
let last = 0
let worst = 0
let posesBefore = 0

function tick(now: number) {
  if (last) worst = Math.max(worst, now - last)
  last = now
  frames++
  if (now - since >= 1000) {
    const seconds = (now - since) / 1000
    const poses = props.poses()
    text.value = `${Math.round(frames / seconds)} fps · ${Math.max(0, Math.round((poses - posesBefore) / seconds))} draws/s · max ${Math.round(worst)} ms`
    posesBefore = poses
    since = now
    frames = 0
    worst = 0
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  since = performance.now()
  posesBefore = props.poses()
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <span v-if="text" class="fps-meter" aria-hidden="true">{{ text }}</span>
</template>

<style scoped>
.fps-meter {
  position: absolute;
  inset-inline-start: 10px;
  bottom: 10px;
  z-index: 2;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.62);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
}
</style>
