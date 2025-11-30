<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { API_URL } from '@/config'
import { useRoute, useRouter } from 'vue-router'
import StickerImage from '@/components/StickerImage.vue'
import { addStickerToCart } from '@/utils/cart'

const route = useRoute()
const router = useRouter()

const stickerName = ref('')
const description = ref('')
const creator = ref('A Creator')
const stickerId = ref()
const stickerType = ref('')
const stickerData = ref('')
const stickerShape = ref('square')
const selectedMaterial = ref('')
const selectedColor = ref('')
const colors = ref([])
const materials = ref([])

const addToCart = () => {
  addStickerToCart(stickerId.value, selectedColor.value, selectedMaterial.value, 1);
  router.push("/cart")
}

const stickerBackgroundColor = computed(() => {
  if (stickerType.value === 'image') return selectedColor.value;

  return (selectedColor.value === 'white' ? '#EEE' : 'white');
})

onBeforeMount(async () => {
  const sticker_id = route.params.id
  const url = `${API_URL}stickers/${sticker_id}`

  try {
    const response = await fetch(url)

    if (response.status !== 200) return alert('Error fetching sticker data')

    const data = await response.json()

    stickerId.value = data.sticker_id;
    stickerName.value = data.name;
    description.value = data.description;
    stickerType.value = data.sticker.type;
    creator.value = data.creator;

    colors.value = data.sticker.colors;
    materials.value = data.sticker.materials;

    selectedColor.value = data.sticker.colors[0].color;
    selectedMaterial.value = data.sticker.materials[0].material;

    if (stickerType.value === 'polygonal') stickerShape.value = data.sticker.shape
    if (stickerType.value === 'image') stickerData.value = data.sticker.image_data;
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="container d-flex">
    <div
      class="sticker-container"
      :style="{ backgroundColor: stickerBackgroundColor }"
    >
      <StickerImage
        :sticker-type="stickerType"
        :image-data="stickerData"
        :shape="stickerShape"
        :color="selectedColor"
      />
    </div>
    <div class="card container-fluid p-3">
      <h2 class="mb-2">{{ stickerName }}</h2>
      <p>{{ description }}</p>
      <p class="fw-light">By: {{ creator }}</p>
      <div class="mb-3">
        <p class="mb-0">Material</p>
        <div>
          <button
            v-for="item in materials"
            :key="item.material_id"
            class="btn border me-2 mb-2"
            :class="selectedMaterial === item.material ? 'btn-secondary' : 'btn-light'"
            @click="selectedMaterial = item.material"
          >
            {{ item.material }}
          </button>
        </div>
      </div>
      <div class="mb-2">
        <p class="mb-0">Color</p>
        <div>
          <button
            v-for="item in colors"
            :key="item"
            class="color-swatch btn me-2 mb-2 col-2"
            :style="{
              backgroundColor: item.color,
              borderWidth: selectedColor === item.color ? '4px' : '2px',
              borderColor: selectedColor === item.color ? 'gray' : '#0002'
            }"
            @click="selectedColor = item.color"
          ></button>
        </div>
      </div>
      <div>
        <button class="btn btn-primary" @click="addToCart">
          Add to cart
        </button>
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

.color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #0002;
}
</style>
