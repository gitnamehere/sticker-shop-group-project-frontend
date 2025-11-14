<script setup lang="ts">
defineProps<{
  image?: string
  text: string
}>()
</script>

<template>
  <div class="sticker-grid-item">
    <div class="sticker-image-container">
      <img src="https://picsum.photos/250/250" class="sticker-image" />
    </div>
    <div class="sticker-text">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.sticker-grid-item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px rgb(161, 157, 157) solid;
  border-radius: 12px;
  box-shadow: 2px 2px 4px rgb(116, 115, 115);
}
.sticker-image-container {
  margin-bottom: 8px;
}
.sticker-text {
  font-weight: bold;
}
.sticker-image {
  width: auto;
}
</style>
