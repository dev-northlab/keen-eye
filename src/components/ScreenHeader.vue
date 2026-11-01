<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ title: string }>()
const router = useRouter()
</script>

<template>
  <header class="screen-header">
    <button class="icon secondary" :aria-label="$t('common.back')" @click="router.push({ name: 'home' })">‹</button>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped>
.screen-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--panel);
}

h1 {
  margin: 0;
  font-size: 22px;
}

.icon {
  width: 44px;
  height: 44px;
  padding: 0;
  font-size: 28px;
  line-height: 1;
}
</style>
