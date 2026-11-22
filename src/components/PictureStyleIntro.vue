<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from './ModalDialog.vue'
import { levelById } from '../levels/index.ts'
import type { PictureStyle } from '../levels/picture-style.ts'
import { useBackButton } from '../services/backButton.ts'
import { useSettingsStore } from '../stores/settings.ts'

// Three steps about the two picture styles (levels/picture-style.ts), shown by the home screen once per app launch
// until "Don't show this again" (`settings.hideStyleIntro`, written at once) is ticked.
// 1. The same scene drawn (2D) and as a 3D picture, a divider sweeping between them; 2. the round 2D / 3D button
// switching a small picture; 3. the player picks a style. Pictures: level 1, whose 3D picture follows the drawing.

const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const settings = useSettingsStore()

const level = levelById(1)!
const { w, h } = level.viewBox
const drawn = level.build!(0).svg
const shot = import.meta.env.BASE_URL + level.redesign!.imageA

const STEPS = ['Compare', 'Switch', 'Choose'] as const
const step = ref(0)
const last = computed(() => step.value === STEPS.length - 1)
const title = computed(() => t(`pictureStyle.intro${STEPS[step.value]}Title`))
const text = computed(() => t(`pictureStyle.intro${STEPS[step.value]}Text`))

const next = () => (last.value ? emit('close') : step.value++)
// Android back: a step back, or closing from the first one.
useBackButton(() => (step.value > 0 ? step.value-- : emit('close')))

/** Step 2: the demo button taps itself now and then, turning the small picture 2D ↔ 3D. */
const demo3d = ref(false)
let demoTimer = 0
watch(
  step,
  (s) => {
    clearInterval(demoTimer)
    demo3d.value = false
    if (s === 1) demoTimer = window.setInterval(() => (demo3d.value = !demo3d.value), 1600)
  },
  { immediate: true },
)
onBeforeUnmount(() => clearInterval(demoTimer))

const choose = (style: PictureStyle) => (settings.pictureStyle = style)
</script>

<template>
  <ModalDialog class="style-intro" :title="title">
    <div :key="step" class="stage">
      <!-- 1. One scene in both styles: 3D laid over 2D and cut at a divider that sweeps across. -->
      <div v-if="step === 0" class="picture compare">
        <svg class="drawn" :viewBox="`0 0 ${w} ${h}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true" v-html="drawn" />
        <img class="shot" :src="shot" alt="" />
        <span class="divider" aria-hidden="true" />
        <span class="tag start">2D</span>
        <span class="tag end">3D</span>
      </div>

      <!-- 2. The round button of the home screen and the levels, tapping itself. -->
      <div v-else-if="step === 1" class="picture switch-demo">
        <svg v-show="!demo3d" class="drawn" :viewBox="`0 0 ${w} ${h}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true" v-html="drawn" />
        <img v-show="demo3d" class="shot" :src="shot" alt="" />
        <span :key="String(demo3d)" class="demo-button" :class="{ redesign: demo3d }" aria-hidden="true">
          {{ demo3d ? '3D' : '2D' }}
          <span class="ripple" />
        </span>
      </div>

      <!-- 3. The choice, written to the setting at once. -->
      <div v-else class="choices" role="radiogroup" :aria-label="$t('pictureStyle.label')">
        <button
          v-for="style in ['classic', 'redesign'] as const"
          :key="style"
          class="choice"
          :class="{ on: settings.pictureStyle === style }"
          role="radio"
          :aria-checked="settings.pictureStyle === style"
          @click="choose(style)"
        >
          <span class="picture thumb">
            <svg v-if="style === 'classic'" class="drawn" :viewBox="`0 0 ${w} ${h}`" preserveAspectRatio="xMidYMid slice" aria-hidden="true" v-html="drawn" />
            <img v-else class="shot" :src="shot" alt="" />
            <span class="check" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6.5 12.5l3.6 3.6 7.4-7.6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </span>
          <strong class="mark" :class="style">{{ style === 'classic' ? '2D' : '3D' }}</strong>
          <span class="name">{{ $t(`pictureStyle.${style}`) }}</span>
        </button>
      </div>

      <p>{{ text }}</p>
    </div>

    <div class="dots" aria-hidden="true">
      <span v-for="(_, i) in STEPS" :key="i" :class="{ on: i === step }" />
    </div>
    <div class="actions">
      <button v-if="step > 0" class="secondary" @click="step--">{{ $t('common.back') }}</button>
      <button class="go" @click="next">{{ last ? $t('home.play') : $t('pictureStyle.introNext') }}</button>
    </div>
    <label class="dont-show">
      <input v-model="settings.hideStyleIntro" type="checkbox" />
      {{ $t('pictureStyle.introDontShow') }}
    </label>
  </ModalDialog>
</template>

<style scoped>
.style-intro {
  animation: shade 0.2s ease-out both;
}

.style-intro :deep(.card) {
  width: min(100%, 380px);
  background:
    radial-gradient(120% 50% at 50% 0%, color-mix(in srgb, var(--ok-bg) 85%, transparent), transparent 70%),
    var(--panel);
  box-shadow: 0 24px 48px -16px rgb(0 0 0 / 0.4);
  animation: rise 0.42s cubic-bezier(0.2, 1.3, 0.4, 1) both;
}

.stage {
  animation: slide 0.3s ease-out both;
}

p {
  margin: 14px 0 0;
  min-height: 2.9em;
  line-height: 1.45;
  color: var(--muted);
}

/* A level picture: the drawn scene and its 3D picture fill the same frame. */
.picture {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  background: #bfe3f5;
  /* The pictures and the divider stay left to right in every language. */
  direction: ltr;
}

.picture .drawn,
.picture .shot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
}

.compare {
  box-shadow: 0 8px 20px -10px rgb(0 0 0 / 0.45);
}

.compare .shot {
  clip-path: inset(0 0 0 var(--cut));
  animation: sweep 4.2s ease-in-out infinite alternate;
}

.divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--cut);
  width: 3px;
  margin-left: -1.5px;
  background: #fff;
  box-shadow: 0 0 8px rgb(0 0 0 / 0.35);
  animation: sweep 4.2s ease-in-out infinite alternate;
}

.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 22px;
  margin: -11px 0 0 -11px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.3);
}

@property --cut {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}

.tag {
  position: absolute;
  top: 8px;
  padding: 3px 10px;
  border-radius: 999px;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.25);
}

/* The colours of the round switch: blue 2D, orange 3D. */
.tag.start {
  left: 8px;
  background: #3a86ff;
}

.tag.end {
  right: 8px;
  background: #e0702a;
}

/* The round button as on the home screen, in the picture's corner. */
.demo-button {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--glass);
  color: #3a86ff;
  font-size: 17px;
  font-weight: 800;
  box-shadow: 0 2px 8px rgb(35 48 43 / 0.25);
  animation: press 0.35s ease-out;
}

.demo-button.redesign {
  color: #e0702a;
}

/* A finger's tap: a ring spreading from the button. */
.ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid currentColor;
  animation: ripple 0.6s ease-out both;
}

.choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.choice {
  display: grid;
  justify-items: center;
  gap: 2px;
  padding: 6px 6px 10px;
  border-radius: 18px;
  background: var(--soft-2);
  color: var(--fg);
  box-shadow: inset 0 0 0 2px transparent;
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease;
}

.choice.on {
  background: var(--ok-bg);
  box-shadow: inset 0 0 0 3px var(--accent);
}

.choice:active {
  transform: scale(0.97);
}

.thumb {
  width: 100%;
  margin-bottom: 6px;
  border-radius: 12px;
}

.check {
  position: absolute;
  top: 6px;
  right: 6px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.3);
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity 0.15s ease,
    transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.on .check {
  opacity: 1;
  transform: none;
}

.check svg {
  width: 16px;
  height: 16px;
}

.mark {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.1;
}

.mark.classic {
  color: #3a86ff;
}

.mark.redesign {
  color: #e0702a;
}

.name {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 16px 0 14px;
}

.dots span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--line);
  transition:
    width 0.25s ease,
    background 0.25s ease;
}

.dots span.on {
  width: 22px;
  background: var(--accent);
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  flex: 1;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 700;
}

.go {
  flex: 2;
}

.dont-show {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 4px 8px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.dont-show input {
  width: 20px;
  height: 20px;
  margin: 0;
  accent-color: var(--accent);
}

@keyframes sweep {
  from {
    --cut: 85%;
  }
  to {
    --cut: 15%;
  }
}

@keyframes press {
  40% {
    transform: scale(0.86);
  }
}

@keyframes ripple {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
}

@keyframes shade {
  from {
    background: rgb(0 0 0 / 0);
  }
}

@keyframes rise {
  from {
    transform: translateY(28px) scale(0.9);
    opacity: 0;
  }
}
</style>
