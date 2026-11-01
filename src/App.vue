<template>
  <!-- Keyed by path so that switching levels remounts the level screen. -->
  <RouterView :key="$route.fullPath" />
</template>
