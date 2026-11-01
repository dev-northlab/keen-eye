<script setup lang="ts">
import { useRouter } from 'vue-router'
import ModeSwitch from '../components/ModeSwitch.vue'
import { useProgressStore } from '../stores/progress.ts'

const router = useRouter()
const progress = useProgressStore()

function play() {
  const id = progress.continueLevelId
  router.push(id === undefined ? { name: 'levels' } : { name: 'level', params: { id } })
}
</script>

<template>
  <main class="home">
    <h1>Keen Eye</h1>
    <p class="stars">★ {{ $t('home.stars', { n: progress.totalStars }) }}</p>
    <button class="play" @click="play">
      {{ $t('home.play') }}
      <small>
        {{
          progress.continueLevelId === undefined
            ? $t('home.allDone')
            : progress.needsPurchase(progress.continueLevelId)
              ? $t('home.needsPurchase', { n: progress.continueLevelId })
              : $t('home.continueLevel', { n: progress.continueLevelId })
        }}
      </small>
    </button>
    <ModeSwitch class="mode" />
    <button class="secondary" @click="router.push({ name: 'levels' })">{{ $t('home.levels') }}</button>
    <button class="secondary" @click="router.push({ name: 'settings' })">{{ $t('home.settings') }}</button>
  </main>
</template>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px 16px;
}

h1 {
  font-size: 44px;
  margin: 0;
}

.stars {
  margin: 0 0 16px;
  color: #b58500;
  font-weight: 600;
}

button,
.mode {
  width: min(100%, 280px);
}

button {
  font-size: 18px;
}

.play {
  display: grid;
  gap: 2px;
  padding: 16px 20px;
  font-size: 22px;
  font-weight: 600;
}

.play small {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.85;
}
</style>
