<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import jotchua from '@/assets/jotchua.jpg'

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
  <img v-if="stickerType === 'image'" :src="jotchua" class="sticker-image" />
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
