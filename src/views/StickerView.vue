<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import { onBeforeMount, ref } from 'vue'
import { API_URL } from '@/config'
import { useRoute } from 'vue-router'
import StickerImage from '@/components/StickerImage.vue'

const route = useRoute()

const stickerName = ref('')
const description = ref('')
const creator = ref('A Creator')
const stickerType = ref('')
const stickerData = ref('')
const stickerShape = ref('square')
const selectedMaterial = ref('');
const color = ref('red')

// colors and materials that are currently in the db
// TODO: replace these with an api call
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white']
const materials = [
  {
    name: "vinyl-glossy",
    price: 1
  },
  {
    name: "vinyl-matte",
    price: 0.75
  },
  {
    name: "vinyl-holographic",
    price: 1.25
  },
]

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
  <div class="container d-flex">
    <div class="sticker-container">
      <StickerImage
        :sticker-type="stickerType"
        :image-data="stickerData"
        :shape="stickerShape"
        :color="color"
      />
    </div>
    <div class="card container-fluid">
      <h2 class="mb-2">{{ stickerName }}</h2>
      <p>{{ description }}</p>
      <p class="fw-light">By: {{ creator }}</p>
      <div class="mb-2">
        <p class="mb-0">Material</p>
        <div>
          <button
            v-for="material in materials"
            :key="material.name"
            class="btn border me-2"
            :class="selectedMaterial === material.name ? 'btn-secondary' : 'btn-light'"
            @click="selectedMaterial = material.name"
          >
            {{ material.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sticker-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40%;
  width: 40%;
  margin-right: 16px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 16px;
}
</style>
