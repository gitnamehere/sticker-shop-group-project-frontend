<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import { onBeforeMount, ref } from 'vue'
import { API_URL } from '@/config'
import { useRoute } from 'vue-router'
import StickerImage from '@/components/StickerImage.vue'

const route = useRoute()

const stickerName = ref('')
const description = ref('')
const stickerType = ref('')
const stickerData = ref('')
const stickerShape = ref('square')
const color = ref('red')

onBeforeMount(async () => {
  const sticker_id = route.params.id
  const url = `${API_URL}stickers/${sticker_id}`

  try {
    const response = await fetch(url)

    if (response.status !== 200) return alert('Error fetching sticker data')

    const data = await response.json()

    stickerName.value = data.name
    description.value = data.description
    stickerType.value = data.sticker.type

    if (stickerType.value === 'polygonal') stickerShape.value = data.sticker.shape
    if (stickerType.value === 'image') stickerData.value = data.sticker.image_data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <CoreNavbar />
  <div class="container">
    <div class="sticker-container">
      <StickerImage
        :sticker-type="stickerType"
        :image-data="stickerData"
        :shape="stickerShape"
        :color="color"
      />
    </div>
    <div>
      <h2 class="mb-10">{{ stickerName }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
}

.sticker-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin-right: 16px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 16px;
}
</style>
