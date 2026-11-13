<script setup lang="ts">
// A blossoming tree reaching in from the left edge of its box (viewBox 0 0 200 280): the trunk comes in at the
// bottom left, branches spread up and to the right under clusters of blossom. White apple blossom, or pink cherry
// blossom with `pink`; mirror the box for the right edge. The crown sways a little around the trunk's foot.

defineProps<{ pink?: boolean }>()

/** Trunk, then boughs and twigs, each with its stroke width. */
const BRANCHES: [string, number][] = [
  ['M-14 290C4 240 22 200 34 160', 16],
  ['M34 160C56 128 98 108 152 98', 8],
  ['M34 160C28 118 40 76 66 44', 7],
  ['M24 206C58 196 112 196 172 176', 7],
  ['M96 112C114 84 134 66 164 56', 4],
  ['M124 188C144 204 168 216 192 216', 4],
  ['M58 72C84 60 104 40 116 22', 3.5],
  ['M140 101C162 112 180 126 194 142', 3.5],
]

/** Blossom clusters: centre and size. */
const CLUSTERS = [
  [152, 96, 1.2], [176, 86, 0.9], [128, 104, 1], [66, 42, 1.1], [86, 30, 0.9], [52, 62, 0.9],
  [116, 22, 1], [164, 54, 1.1], [186, 46, 0.8], [172, 176, 1.2], [192, 162, 0.9], [148, 184, 1],
  [192, 214, 1], [170, 222, 0.9], [194, 140, 1], [104, 112, 0.9], [100, 194, 0.9], [44, 118, 0.8],
  [138, 70, 0.8], [76, 196, 0.8],
] as const

/** The blossoms of one cluster around its centre (offsets, radius and colour index), the same in every cluster. */
const PETALS = [
  [0, 0, 9, 0], [-11, -5, 8, 1], [10, -7, 8, 2], [-8, 9, 7, 2], [11, 7, 7.5, 1], [0, -13, 7, 0], [-16, 6, 6, 0],
  [17, -2, 6, 0], [3, 12, 6.5, 1],
] as const
const LEAVES = [
  [-15, -10, -30], [16, 9, 25], [-4, 16, 70],
] as const

const APPLE = { petals: ['#ffffff', '#fdeef3', '#ffd9e6'], dot: '#f7c948' }
const CHERRY = { petals: ['#ffb3cb', '#ff9ec4', '#ffd1e0'], dot: '#e5577a' }
</script>

<template>
  <svg class="blossom" viewBox="0 0 200 280" preserveAspectRatio="xMinYMid meet" overflow="visible">
    <g class="crown">
      <path
        v-for="([d, w], i) in BRANCHES"
        :key="i"
        :d="d"
        fill="none"
        stroke="#7a5236"
        :stroke-width="w"
        stroke-linecap="round"
      />
      <g v-for="([x, y, s], i) in CLUSTERS" :key="`c${i}`" :transform="`translate(${x} ${y}) scale(${s})`">
        <ellipse
          v-for="([lx, ly, a], k) in LEAVES"
          :key="`l${k}`"
          :cx="lx"
          :cy="ly"
          rx="7"
          ry="3.5"
          fill="#7cc46a"
          :transform="`rotate(${a} ${lx} ${ly})`"
        />
        <circle
          v-for="([px, py, r, c], k) in PETALS"
          :key="k"
          :cx="px"
          :cy="py"
          :r="r"
          :fill="(pink ? CHERRY : APPLE).petals[(c + i) % 3]"
        />
        <circle v-for="([px, py], k) in PETALS.slice(0, 4)" :key="`d${k}`" :cx="px" :cy="py" r="1.8" :fill="(pink ? CHERRY : APPLE).dot" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.crown {
  transform-box: view-box;
  transform-origin: 0 280px;
  animation: crown-sway 5s ease-in-out infinite alternate;
}

@keyframes crown-sway {
  from {
    transform: rotate(-1deg);
  }
  to {
    transform: rotate(1.2deg);
  }
}
</style>
