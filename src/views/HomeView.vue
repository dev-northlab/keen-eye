<script setup lang="ts">
import { useRouter } from 'vue-router'
import { levels } from '../levels/index.ts'

const router = useRouter()
</script>

<template>
  <main class="home">
    <h1>Keen Eye</h1>
    <button @click="router.push({ name: 'level', params: { id: levels[0].id } })">
      {{ $t('home.play') }}
    </button>
    <h2>{{ $t('home.levels') }}</h2>
    <ul>
      <li v-for="level in levels" :key="level.id">
        <RouterLink :to="{ name: 'level', params: { id: level.id } }">
          {{ level.id }}. {{ $t(`levelTitles.${level.title}`) }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 16px;
}

h1 {
  font-size: 40px;
  margin: 0 0 12px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

a {
  color: var(--fg);
  font-size: 18px;
}
</style>
