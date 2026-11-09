<script setup lang="ts">
/**
 * A sky-blue banner with a picture at its end side, faded into the blue under the text: "tiny boy" on the game
 * modes screen and each of its levels (TinyBoyView). The `icon` slot fills the square at the start (an <img> or a
 * number), the default slot the line under the name. Mirrored right to left, so what the picture shows on its
 * right stays at the outer edge.
 */
defineProps<{ photo: string; name: string; tag?: string; disabled?: boolean }>()
</script>

<template>
  <button class="banner" type="button" :disabled="disabled">
    <img class="photo flip-rtl" :src="photo" alt="" />
    <span class="icon"><slot name="icon" /></span>
    <span class="text">
      <span v-if="tag" class="tag">{{ tag }}</span>
      <span class="name">{{ name }}</span>
      <span class="sub"><slot /></span>
    </span>
  </button>
</template>

<style scoped>
/* Like the game mode banners of LevelMapView, in their own colour. */
.banner {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px;
  text-align: start;
  border-radius: 20px;
  background: linear-gradient(120deg, #5aa9ff, #3a86ff 60%, #2563eb);
  color: #fff;
  box-shadow: 0 8px 18px -8px rgb(30 80 200 / 0.6);
}

.banner:disabled {
  cursor: default;
}

.photo {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  height: 100%;
  /* Full height at the end side; the picture's subject stands in its last third, so a narrow banner cuts its start. */
  width: auto;
  max-width: none;
  mask-image: linear-gradient(to right, transparent 12%, #000 62%);
  pointer-events: none;
}

.icon {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 16px;
  border: 3px solid rgb(255 255 255 / 0.9);
  background: #e3edff;
  color: #2563eb;
  font-size: 26px;
  font-weight: 700;
}

.icon :slotted(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon :slotted(svg) {
  width: 28px;
  height: 28px;
}

.text {
  position: relative;
  flex: 1;
  display: grid;
  gap: 2px;
  min-width: 0;
}

.tag {
  justify-self: start;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background: rgb(255 255 255 / 0.25);
}

.name {
  font-size: 22px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
}

.sub {
  font-size: 14px;
  opacity: 0.95;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.45);
}
</style>
