<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container navbar navbar-expand-lg">
    <h2 class="navbar__title">Sticker Shop</h2>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.navbar__title {
  margin-right: 32px;
}
</style>
