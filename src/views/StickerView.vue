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
const creatorId = ref<string | number | null>(null)
const stickerId = ref()
const stickerType = ref('')
const stickerData = ref('')
const stickerShape = ref('square')
const selectedMaterial = ref('')
const selectedColor = ref('')
const colors = ref([])
const materials = ref([])
const isEditing = ref(false)
const nameEdit = ref('')
const descriptionEdit = ref('')

const addToCart = () => {
  addStickerToCart(stickerId.value, selectedColor.value, selectedMaterial.value, 1);
  router.push("/cart")
}

const isCreator = computed(() => {
  try {
    const stored = localStorage.getItem('account_id')
    if (!stored || !creatorId.value) return false
    return String(stored) === String(creatorId.value)
  } catch (e) {
    return false
  }
})

const startEdit = () => {
  isEditing.value = true
  nameEdit.value = stickerName.value
  descriptionEdit.value = description.value
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = async () => {
  const id = stickerId.value

  const payload: Record<string, string> = {}
  if (nameEdit.value && nameEdit.value !== stickerName.value) payload.name = nameEdit.value
  if (descriptionEdit.value && descriptionEdit.value !== description.value) payload.description = descriptionEdit.value

  if (!Object.keys(payload).length) {
    isEditing.value = false
    return
  }

  try {
    const res = await fetch(`${API_URL}stickers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) return alert('Failed to save sticker')

    if (payload.name) stickerName.value = payload.name
    if (payload.description) description.value = payload.description
    isEditing.value = false
  } catch (err) {
    console.error(err)
    alert('Error saving sticker')
  }
}

const deleteSticker = async () => {
  const id = stickerId.value
  if (!confirm('Are you sure you want to delete this sticker?')) return

  try {
    const res = await fetch(`${API_URL}stickers/${id}`, { method: 'DELETE' })
    if (!res.ok) return alert('Failed to delete sticker')
    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Error deleting sticker')
  }
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
    creatorId.value = data.account_id ?? null

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
      <div v-if="isCreator" class="mt-4">
        <!-- used <template> to control element toggling based on conditions -->
        <!-- https://vuejs.org/guide/essentials/conditional#v-if-on-template -->
        <template v-if="!isEditing">
          <button class="btn btn-secondary me-2" @click="startEdit">
            Edit Sticker
          </button>
          <button class="btn btn-danger" @click="deleteSticker">
            Delete Sticker
          </button>
        </template>
        <template v-else>
          <div class="mb-2">
            <input v-model="nameEdit" class="form-control mb-2" />
            <textarea v-model="descriptionEdit" class="form-control" rows="3"></textarea>
          </div>
          <div>
            <button v-if="isEditing" class="btn btn-success me-2" @click="saveEdit">
              Save
            </button>
            <button v-if="isEditing" class="btn btn-warning me-2" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </template>
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
