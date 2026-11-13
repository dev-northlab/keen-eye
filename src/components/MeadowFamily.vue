<script setup lang="ts">
import { computed, useId } from 'vue'

// The family of the home meadow (MeadowScene), drawn around the front centre of their picnic blanket (0, 0):
// dad blue, mom teal, the boy orange, the girl purple. Dad nods and flies a kite, mom waves, the boy peers through
// a magnifier and the girl holds up a picture book with two pictures that differ in one flower, like the game.

const props = withDefaults(
  defineProps<{
    /** Draw only the night lights: two camping lanterns at the ends of the blanket (an unfiltered layer). */
    lights?: boolean
    /** Where the kite's string ends, relative to the blanket; high up for the big family of a portrait window. */
    kite?: { x: number; y: number }
  }>(),
  { kite: () => ({ x: 40, y: -102 }) },
)

const BLANKET = '#ff9ec4'
/** The blanket's checks: two stripes along it and five across (top edge −66…62, front edge −80…75). */
const BLANKET_CHECKS = [
  'M-71-11H66M-76-4H71',
  ...[-44, -22, 0, 22, 44].map((t) => `M${t - 2}-16L${t * 1.2 - 2.5} 2`),
].join('')
/** From dad's raised hand to the kite, sagging a little. */
const kiteString = computed(() => {
  const { x, y } = props.kite
  return `M-26-57Q${(x - 26) * 0.55} ${-57 + (y + 57) * 0.25} ${x} ${y}`
})
/** Night: camping lanterns on the ground at both ends of the blanket. */
const LANTERNS = [-88, 86]
/** The lanterns' soft glow (a gradient: ids must be unique on the page). */
const lanternGlow = useId()
</script>

<template>
  <g v-if="lights">
    <radialGradient :id="lanternGlow">
      <stop offset="0" stop-color="#ffcf5a" stop-opacity="0.5" />
      <stop offset="0.35" stop-color="#ffcf5a" stop-opacity="0.22" />
      <stop offset="1" stop-color="#ffcf5a" stop-opacity="0" />
    </radialGradient>
    <g v-for="(x, k) in LANTERNS" :key="x" :transform="`translate(${x} 0)`">
      <g class="lamp-glow" :style="{ animationDelay: `${-k * 1.1}s` }">
        <ellipse cy="-1" rx="40" ry="9" :fill="`url(#${lanternGlow})`" />
        <circle cy="-10" r="40" :fill="`url(#${lanternGlow})`" />
      </g>
      <rect x="-5" y="-3" width="10" height="3" rx="1" fill="#3d3a36" />
      <rect x="-4" y="-15" width="8" height="12" rx="1.5" fill="#ffe08a" />
      <ellipse cy="-9" rx="1.6" ry="3" fill="#fff7d6" />
      <path d="M-4-15V-3M4-15V-3" stroke="#3d3a36" stroke-width="1.2" />
      <path d="M-6-15H6L3-19H-3Z" fill="#3d3a36" />
      <path d="M-3-19Q0-25 3-19" fill="none" stroke="#3d3a36" stroke-width="1.2" />
    </g>
  </g>
  <g v-else>
    <ellipse cy="3" rx="84" ry="6" fill="#000" fill-opacity="0.08" />
    <path d="M-80 2L75 2L62-16L-66-16Z" :fill="BLANKET" />
    <path :d="BLANKET_CHECKS" stroke="#fff" stroke-opacity="0.5" stroke-width="3.5" />

    <!-- Dad's kite on its string, swaying around his hand. -->
    <g class="kite">
      <path :d="kiteString" fill="none" stroke="#fff" stroke-opacity="0.8" stroke-width="0.8" />
      <g :transform="`translate(${kite.x - 40} ${kite.y + 102})`">
        <path d="M40-102q-5 6 0 11q5 6 0 11" fill="none" stroke="#3d3d3d" stroke-width="0.8" />
        <path d="M37-92l6 2-6 2ZM37-82l6 2-6 2Z" fill="#ffd23f" />
        <path d="M40-134L51-118L40-102L29-118Z" fill="#ff6b8a" />
        <path d="M40-134L51-118L40-118ZM40-118L29-118L40-102Z" fill="#ffd23f" />
      </g>
    </g>

    <!-- Dad, sitting cross-legged. -->
    <g transform="translate(-48 -6)">
      <ellipse rx="21" ry="7" fill="#3d4f6e" />
      <ellipse cx="-15" cy="2" rx="5" ry="3" fill="#5a3a2a" />
      <ellipse cx="15" cy="2" rx="5" ry="3" fill="#5a3a2a" />
      <path d="M-13-2V-26Q-13-36 0-36Q13-36 13-26V-2Z" fill="#5b8def" />
      <path
        d="M-11-30Q-19-16-8-8M11-30Q21-36 22-48"
        fill="none"
        stroke="#4a7bd8"
        stroke-width="6"
        stroke-linecap="round"
      />
      <circle cx="-8" cy="-8" r="3" fill="#e0a77c" />
      <circle cx="22" cy="-50" r="3" fill="#e0a77c" />
      <rect x="-3" y="-40" width="6" height="6" fill="#c98f66" />
      <g class="tilt">
        <circle cx="-10" cy="-48" r="2.6" fill="#e0a77c" />
        <circle cx="10" cy="-48" r="2.6" fill="#e0a77c" />
        <circle cy="-48" r="10" fill="#e0a77c" />
        <path d="M-10.5-48Q-11-60 0-60Q11-60 10.5-48Q7-54 0-54Q-6-54-10.5-48Z" fill="#3a2a20" />
        <circle cx="-3.6" cy="-48" r="1.3" fill="#23302b" />
        <circle cx="3.6" cy="-48" r="1.3" fill="#23302b" />
        <path d="M-3.5-43.5Q0-40.5 3.5-43.5" fill="none" stroke="#7a3b2a" stroke-width="1.3" stroke-linecap="round" />
      </g>
    </g>

    <!-- Mom, sitting, waving with her right hand. -->
    <g transform="translate(48 -6)">
      <ellipse rx="21" ry="7" fill="#1f8a80" />
      <ellipse cx="-15" cy="2" rx="5" ry="3" fill="#c8553d" />
      <ellipse cx="15" cy="2" rx="5" ry="3" fill="#c8553d" />
      <path d="M-12-2V-26Q-12-36 0-36Q12-36 12-26V-2Z" fill="#2fa39a" />
      <path d="M-10-30Q-18-16-7-8" fill="none" stroke="#26948b" stroke-width="5.5" stroke-linecap="round" />
      <circle cx="-7" cy="-8" r="2.8" fill="#f2c39b" />
      <g class="wave">
        <path d="M10-30Q20-38 18-52" fill="none" stroke="#26948b" stroke-width="5.5" stroke-linecap="round" />
        <circle cx="18" cy="-54" r="3" fill="#f2c39b" />
      </g>
      <rect x="-3" y="-40" width="6" height="6" fill="#e0a77c" />
      <path d="M-11.5-46Q-13-62 0-62Q13-62 11.5-46L13-33Q8-34 6-39H-6Q-8-34-13-33Z" fill="#6b3420" />
      <circle cy="-48" r="9.5" fill="#f2c39b" />
      <path d="M-10-47Q-10-59 0-59Q10-59 10-47Q6-53-2-53Q-7-52-10-47Z" fill="#6b3420" />
      <circle cx="-3.4" cy="-48" r="1.3" fill="#23302b" />
      <circle cx="3.4" cy="-48" r="1.3" fill="#23302b" />
      <ellipse cx="-6" cy="-44.5" rx="2" ry="1.2" fill="#ff8fa8" fill-opacity="0.6" />
      <ellipse cx="6" cy="-44.5" rx="2" ry="1.2" fill="#ff8fa8" fill-opacity="0.6" />
      <path d="M-3.2-43.5Q0-40.5 3.2-43.5" fill="none" stroke="#a8433a" stroke-width="1.3" stroke-linecap="round" />
    </g>

    <!-- Boy, standing, with a magnifier at his eye (it moves a little as he searches). -->
    <g transform="translate(-14 -10)">
      <path d="M-5 0V-10M5 0V-10" stroke="#e0a77c" stroke-width="3.6" stroke-linecap="round" />
      <path d="M-8-9V-15H8V-9Z" fill="#3d4f6e" />
      <path d="M-8-14V-27Q-8-33 0-33Q8-33 8-27V-14Z" fill="#ffb02e" />
      <path d="M-7-28Q-12-20-6-15" fill="none" stroke="#f09a18" stroke-width="4.4" stroke-linecap="round" />
      <circle cx="-6" cy="-15" r="2.4" fill="#e0a77c" />
      <circle cy="-41" r="8.5" fill="#e0a77c" />
      <path d="M-8.8-41Q-9-51 0-51Q9-51 8.8-41Q6-46 1-46Q-5-46-8.8-41Z" fill="#3a2a20" />
      <circle cx="-3.2" cy="-41" r="1.2" fill="#23302b" />
      <path d="M-3-36.5Q0-34 3-36.5" fill="none" stroke="#7a3b2a" stroke-width="1.2" stroke-linecap="round" />
      <g class="peer">
        <path d="M7-28Q13-30 9-36" fill="none" stroke="#f09a18" stroke-width="4.4" stroke-linecap="round" />
        <path d="M8-37L5.6-41" stroke="#7a4e33" stroke-width="2.6" stroke-linecap="round" />
        <circle cx="3.4" cy="-43.4" r="5.6" fill="#fff" fill-opacity="0.45" stroke="#7a4e33" stroke-width="1.8" />
        <circle cx="3.4" cy="-43" r="2.4" fill="#23302b" />
        <circle cx="4.2" cy="-43.8" r="0.8" fill="#fff" />
        <circle cx="9" cy="-36" r="2.4" fill="#e0a77c" />
      </g>
    </g>

    <!-- Girl, standing, holding up the open book. -->
    <g transform="translate(16 -10)">
      <path d="M-4 0V-10M4 0V-10" stroke="#f2c39b" stroke-width="3.4" stroke-linecap="round" />
      <path d="M-9-8L-7-30Q0-34 7-30L9-8Z" fill="#b07cff" />
      <g class="tilt">
        <circle cx="-9" cy="-44" r="3.6" fill="#6b3420" />
        <circle cx="9" cy="-44" r="3.6" fill="#6b3420" />
        <circle cy="-41" r="8.2" fill="#f2c39b" />
        <path d="M-8.6-41Q-9-50 0-50Q9-50 8.6-41Q5-46-1-45.5Q-6-45-8.6-41Z" fill="#6b3420" />
        <circle cx="-3" cy="-41" r="1.2" fill="#23302b" />
        <circle cx="3" cy="-41" r="1.2" fill="#23302b" />
        <path d="M-2.8-37Q0-34.5 2.8-37" fill="none" stroke="#a8433a" stroke-width="1.2" stroke-linecap="round" />
      </g>
      <path d="M-15-30H-1V-18H-15ZM1-30H15V-18H1Z" fill="#fff" stroke="#8a5a3a" stroke-width="1.4" stroke-linejoin="round" />
      <path d="M-14.3-22H-1.7V-18.7H-14.3ZM1.7-22H14.3V-18.7H1.7Z" fill="#7cc46a" />
      <circle cx="-11" cy="-27" r="1.8" fill="#ffc933" />
      <circle cx="5" cy="-27" r="1.8" fill="#ffc933" />
      <circle cx="-5" cy="-23.4" r="1.6" fill="#e5484d" />
      <circle cx="-15" cy="-22" r="2.4" fill="#f2c39b" />
      <circle cx="15" cy="-22" r="2.4" fill="#f2c39b" />
    </g>

    <!-- On the blanket: a slice of watermelon. -->
    <g>
      <path d="M-8 0A8 8 0 0 1 8 0Z" fill="#e5484d" stroke="#4caf6a" stroke-width="2" />
      <circle cx="-2.5" cy="-3" r="0.8" fill="#23302b" />
      <circle cx="2.5" cy="-3" r="0.8" fill="#23302b" />
    </g>
  </g>
</template>

<style scoped>
/* The family: heads tilt a little, mom's arm waves from the shoulder now and then, the boy's magnifier
   wanders around his eye. */
.tilt,
.wave,
.peer {
  transform-box: fill-box;
}

.tilt {
  transform-origin: 50% 100%;
  animation: tilt 4.2s ease-in-out infinite alternate;
}

@keyframes tilt {
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(5deg);
  }
}

.wave {
  transform-origin: 0% 100%;
  animation: wave 5s ease-in-out infinite;
}

@keyframes wave {
  0%,
  40%,
  100% {
    transform: rotate(0deg);
  }
  50%,
  70% {
    transform: rotate(18deg);
  }
  60%,
  80% {
    transform: rotate(-6deg);
  }
}

.peer {
  transform-origin: 30% 100%;
  animation: peer 3.6s ease-in-out infinite alternate;
}

@keyframes peer {
  from {
    transform: rotate(-7deg);
  }
  to {
    transform: rotate(6deg);
  }
}

/* Spring kite: swings around dad's hand (the lower left corner of its box). */
.kite {
  transform-box: fill-box;
  transform-origin: 0% 100%;
  animation: kite 3.8s ease-in-out infinite alternate;
}

@keyframes kite {
  from {
    transform: rotate(-4deg);
  }
  to {
    transform: rotate(3deg);
  }
}

.lamp-glow {
  animation: lamp-glow 3.2s ease-in-out infinite alternate;
}

@keyframes lamp-glow {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}
</style>
