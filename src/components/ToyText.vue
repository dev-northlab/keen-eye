<script setup lang="ts">
import { computed } from 'vue'

/**
 * A line in bright toy letters ("tiny boy": the level's call to find the differences, the cheer of a win): each word
 * its own colour (`--c`) over a darker depth (`--d`), a white rim round both and a soft shadow, the words bobbing one
 * after another. Coloured by word, not by letter, so joined scripts (Arabic) and combining marks
 * (Thai, Hindi) stay whole. The parent sets the size with `font-size`.
 */
const props = defineProps<{ text: string }>()

const COLORS = [
  ['#ff5a5f', '#b8323a'],
  ['#ff9f1c', '#b86a00'],
  ['#ffd23f', '#b88a00'],
  ['#3ec46d', '#1f7f43'],
  ['#2fa8ff', '#1665a8'],
  ['#9b6bff', '#5b37b8'],
  ['#ff6bb5', '#b8336f'],
]
const words = computed(() =>
  props.text.split(/\s+/).map((word, i) => ({ word, style: { '--c': COLORS[i % COLORS.length][0], '--d': COLORS[i % COLORS.length][1], '--i': i } })),
)
</script>

<template>
  <span class="toy-text">
    <span v-for="(w, i) in words" :key="i" class="toy-word" :style="w.style">{{ w.word }}</span>
  </span>
</template>

<style scoped>
.toy-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.3em;
  row-gap: 2px;
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: 0.01em;
  text-align: center;
}

.toy-word {
  display: inline-block;
  color: var(--c);
  /* Earlier shadows lie on top: the darker depth right under the letter, then a white rim round letter and depth
     together, then a soft drop shadow. */
  text-shadow:
    0 1px 0 var(--d),
    0 2px 0 var(--d),
    0 3px 0 var(--d),
    -2px -2px 0 #fff,
    0 -2px 0 #fff,
    2px -2px 0 #fff,
    -2px 0 0 #fff,
    2px 0 0 #fff,
    -2px 3px 0 #fff,
    2px 3px 0 #fff,
    -2px 5px 0 #fff,
    0 5px 0 #fff,
    2px 5px 0 #fff,
    0 8px 6px rgb(0 0 0 / 0.25);
  animation: toy-bob 2.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.15s);
}

@keyframes toy-bob {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(-2deg);
  }
  75% {
    transform: translateY(1px) rotate(2deg);
  }
}
</style>
