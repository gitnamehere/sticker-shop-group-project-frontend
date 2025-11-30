<script setup lang="ts">
import StickerGridItem from '@/components/StickerGridItem.vue'
import { API_URL } from '@/config';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const stickers = ref([]);

const router = useRouter();

onBeforeMount(async () => {
  const url = `${API_URL}stickers/browse`

  try {
    const response = await fetch(url)

    if (response.status !== 200) return alert('Error fetching stickers')

    const data = await response.json()
    stickers.value = data;

    console.log(stickers.value);

  } catch (error) {
    console.log(error)
  }
});
</script>

<template>
  <main>
    <div class="container">
      <div class="row gy-4">
        <div v-for="sticker in stickers" :key="sticker" class="col-6 col-md-4 col-lg-3">
          <!-- we should probably should flatten the object out -->
          <StickerGridItem 
            @click="router.push(`/sticker/${sticker.sticker_id}`)"
            :name="sticker.name"
            :sticker-type="sticker.sticker.type"
            :image-data="sticker.sticker.image_data"
            :shape="sticker.sticker.shape"
            color="red"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
