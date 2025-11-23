<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import StickerGridItem from '@/components/StickerGridItem.vue'
</script>

<template>
  <main>
    <CoreNavbar />
    <div class="container">
      <div class="row row-cols-auto gy-4">
        <div v-for="i in 10" :key="i">
          <StickerGridItem :text="`sample text ${i}`" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
