<script setup lang="ts">
import StickerImage from './StickerImage.vue'

defineProps<{
  name: string
  stickerType: string
  imageData?: string
  shape?: string
}>()
</script>

<template>
  <div class="sticker-grid-item">
    <div class="sticker-image-container d-flex">
      <StickerImage
        :sticker-type="stickerType"
        :image-data="imageData"
        :shape="shape"
        color="red"
      />
    </div>
    <div class="sticker-name">
      {{ name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.sticker-grid-item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px rgb(161, 157, 157) solid;
  border-radius: 12px;
  box-shadow: 2px 2px 4px rgb(116, 115, 115);

  transition: box-shadow 0.15s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 8px black;
  }
}

.sticker-image-container {
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
}
.sticker-name {
  font-weight: bold;
}

.sticker-image {
  width: auto;
}
</style>
