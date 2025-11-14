<script setup lang="ts">
import CoreNavbar from '@/components/CoreNavbar.vue'
import StickerGridItem from '@/components/StickerGridItem.vue'
</script>

<template>
  <main>
    <CoreNavbar />
    <div class="more-grids">
      <StickerGridItem text="sample text" />
      <StickerGridItem text="sample text2" />
      <StickerGridItem text="sample text3" />
      <StickerGridItem text="sample text4" />
    </div>
  </main>
</template>

<style scoped>
.more-grids {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 50vw;
  gap: 32px;
}
</style>
