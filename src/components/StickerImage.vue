<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface Props {
  stickerType: string
  imageData?: string
  shape?: string
  color?: string
}

const props = defineProps<Props>()

const getStickerIcon = () => {
  switch (props.shape) {
    case 'square':
      return 'fa-square'
    case 'circle':
      return 'fa-circle'
    case 'triangle':
      return 'fa-play' // triangle is a pro icon, but we can use the play icon and rotate it
    case 'heart':
      return 'fa-heart'
    default:
      return `fa-${props.shape}`
  }
}
</script>

<template>
  <!-- default rotation is undefined because the component doesn't support "0" rotation -->
  <FontAwesomeIcon
    v-if="stickerType === 'polygonal'"
    :icon="getStickerIcon()"
    :rotation="shape === 'triangle' ? 270 : undefined"
    class="sticker-icon"
  />
  <!-- display image with base64 string https://www.geeksforgeeks.org/html/how-to-display-base64-images-in-html/
  conveniently, it still works without specifying the MIME type/file type 
  (we should probably still store the MIME type in the db in image_sticker) -->
  <img v-if="stickerType === 'image'" :src="`data:;base64, ${imageData}`" class="sticker-image" />
</template>

<style scoped>
.sticker-image {
  width: 100%;
}

.sticker-icon {
  width: 100%;
  height: 100%;
  /* https://vuejs.org/api/sfc-css-features.html#v-bind-in-css */
  color: v-bind(color);
}
</style>
